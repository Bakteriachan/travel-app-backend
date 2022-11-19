const jwt = require('json-web-token');
const config = require('../config');

const { error } = require('../network');

module.exports = {
    errors: function (err, req, res, next) {
        console.error(err);
        let message = "Internal Server Error";
        let code = 500;
        if(err.message) message = err.message;
        if(err.code) code = err.code;
        error(res, message, code);
    },
    logged: function (req, res, next) {
        if (!req.headers.authorization) {
            error(res, "User must log in first", 400);
        } else {
            let auth = req.headers.authorization;
            if (!auth.startsWith('Bearer ')) {
                error(res, "Wrong auth format", 400);
            } else {
                auth = auth.substring("Bearer ".length);
                let decoded = jwt.decode(config.secure.jwt_token, auth);
                if (decoded.error) {
                    error(res, "Wrong auth format", 400);
                } else {
                    req.body.username = decoded.value;
                    next();
                }
            }
        }
    },
};
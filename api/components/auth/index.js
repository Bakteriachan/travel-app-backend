const express = require("express")

const controller = require('./controller');
const network = require('../../../network');

const router = express.Router();

router.post('/login', (req, res, next) => {
    console.log(req.body);
    if ( validData(req.body, res) ) {
        controller.login({password: req.body.password, username: req.body.username})
            .then(data => {
                network.success(res, data);
            })
            .catch(next);
    }
})

function validData(data, res) {
    let keys = ['username','password'];
    for(let i = 0; i < keys.length; i++) {
        if (!data[keys[i]]) {
            network.error(res, `No ${keys[i]} specified`, 400);
            return false;
        }
    }
    return true;
}

module.exports = router;
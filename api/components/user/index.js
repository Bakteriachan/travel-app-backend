const express = require('express');

const network = require('../../../network');
const controller = require('./controller');
const validate = require('../../../validators');


const router = express.Router();

//Return User Data
router.get('/:username', (req, res, next) => {
    controller.get(req.params.username)
        .then((data) => {
            console.log(data);
            network.success(res, data || {});
        })
        .catch(next)
});

//Create New User
router.post('/', async (req, res, next) => {
    if (validate.user(req.body)) {
        let user_data = await controller.get(req.body.username);
        if (user_data) {
            network.error(res, "Username already exists", 400);
            return;
        }
        controller.insert(req.body)
            .then(() => {
                network.success(res, null, 201);
            })
            .catch(next);
    } else {
        network.error(res, "Invalid data", 400);
    }
});

module.exports = router;
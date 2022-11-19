const express = require('express');

const config = require('../config');
const middlewares = require('../middlewares');
const user = require('./components/user');
const auth = require('./components/auth');
const network = require('../network');

const redirect = express.Router();

const app = express();

app.use(express.json());

app.use('/user', user);
app.use('/auth', auth);

app.use('*', (req, res) => {
    network.error(res, 'No such endpoint', 404);
});

app.use(middlewares.errors);

app.listen(config.api.PORT, () => {
    console.log(`API running on port ${config.api.PORT}`);
});
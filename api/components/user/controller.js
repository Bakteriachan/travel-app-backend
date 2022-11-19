const req = require('express/lib/request');
const mongo = require('../../../data/mongo');
const auth = require('../auth/controller');
const table = 'user';

async function get(username) {
    return mongo.get(table, {username: username});
}

async function insert (user) {
    auth.insert(user)
        .catch(err => {
            throw err;
        })
    return mongo.insert(table, {name: user.name, username: user.username, role: user.role});
}
module.exports = {
    get,
    insert,
};
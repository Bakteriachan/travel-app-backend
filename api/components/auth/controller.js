const bcrypt = require('bcrypt');
const jwt = require('json-web-token');
const mongo = require('../../../data/mongo');

const config = require('../../../config');

const table = 'auth';

async function insert(data) {    
    return mongo.insert(table, {username: data.username, password: await bcrypt.hash(data.password, 3)});
}

function get (username) {
    return mongo.get(table, {username: username});
}

async function login(data) {
    let user = await get(data.username);
    return new Promise(async (resolve, reject) => {
        if (user && await bcrypt.compare(data.password, user.password))
            resolve(jwt.encode(config.secure.jwt_token, user.username).value);
        else reject({message:"Incorrect password", code: 400});
    }); 
}

module.exports = {
    insert,
    get,
    login,
};
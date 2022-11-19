const mongo = require('../data/mongo');

const table = 'travel';

async function list(limit=15, page = 0) {
    return mongo.list(table, {}, limit, page = page);
}

async function get(id) {
    return mongo.get(table, {_id: id});
}

async function remove (id) {
    return mongo.remove(table, {id: id});
}

async function insert(data) {
    return mongo.insert(table, {username: data.username, day: data.day, seats: data.seats, cost: data.cost});
}

async function query( data ) {
    let query = {};
    if (data.cost && !isNaN(Number(data.cost))) {
        query.cost = {
            $lte: Number(data.cost),
        };
    }
    if (data.day && !isNaN(Number(data.day))) {
        query.day = {
            $gte: Number(data.day) * 86400,
            $lte: (Number(data.day) + 1) * 86400,
        };
    }
    if (data.seats && !isNaN(Number(data.seats))) {
        query.seats = {
            $gte: Number(data.seats),
        };
    }
    return mongo.list(table, query);
}

module.exports = {
    list,
    get,
    remove,
    insert,
    query,
};
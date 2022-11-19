const { MongoClient, ServerApiVersion } = require('mongodb-legacy');

const config = require('../config');

async function query(table, condition, one = true, limit = 0, page = 0) {
    const uri = `mongodb://localhost:27017`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    let collection = client.db('travel-app').collection(table);
    if (one) {
        return collection.find(condition).limit(1).project({_id: 0}).next();
    } else {
        return collection.find(condition).skip(page * limit).limit(limit).project({_id: 0}).toArray();
    }
}
async function insert (table, data) {
    const uri = `mongodb://localhost:27017`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    let collection = client.db("travel-app").collection(table);
    return collection.insertOne(data);
}

async function remove (table, condition) {
    const uri = `mongodb://localhost:27017`;
    const client = new MongoClient(uri);
    let collection = client.db('travel-app').collection(table);
    return collection.deleteOne(condition);
}
async function list (table, condition = {}, limit = 15, page = 0) {
    return query(table, condition, false, limit = limit, page = page);
}

async function get(table, condition) {
    return query(table, condition, true);
}

module.exports = {
    list,
    get,
    insert,
    remove,
};
/**
 * Created by matan on 01/09/16.
 */
'use strict';

const User = require('./entities/User');
const mongo = require('./mongodb');
const md5 = require('../utils/md5');
const ObjectId = require('mongodb').ObjectId;


function insert(user) {
    if(user.constructor != User) return Promise.reject();
    return mongo.getClient().then(client => client.collection('User').insertOne(user));
}

function getByParams(username, password) {
    return mongo.getClient().then(client => client.collection('User').find({Username: username, PassHash: md5.md5Hash(password)}).limit(1).next());
}
function getSafe(_id) {
    if(_id.constructor != ObjectId) _id = new ObjectId(_id);
    return mongo.getClient().then(client => client.collection('User').find({_id}).limit(1).next());
}

module.exports = {
    User,
    insert,
    getByParams,
    getSafe
};
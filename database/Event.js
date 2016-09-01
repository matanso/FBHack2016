/**
 * Created by matan on 01/09/16.
 */
'use strict';

const mongo = require('./mongodb');
const Event = require('./entities/Event');
const Image = require('./entities/Image');
const ObjectId = require('mongodb').ObjectId;
const day = 1000 * 60 * 60 * 24;

function getNear(location, distance = 2000) {
    let yesterday = new Date(Date.now() - day);
    return mongo.getClient().then(client => client.collection('Event').aggregate().geoNear({
        near: location,
        distanceField: "distance",
        maxDistance: distance,
        spherical: true,
        query: { Start: {$gt: yesterday} }
    }).toArray());
}

function insert(event) {
    if(event.constructor != Event) return Promise.reject();
    return mongo.getClient().then(client => client.collection('Event').insertOne(event));
}

function getById(_id) {
    if(_id.constructor != ObjectId) _id = new ObjectId(_id);
    return mongo.getClient().then(client => client.collection('Event').find({_id}).limit(1).next());
}

module.exports = {
    Event,
    getNear,
    insert,
    getById
};
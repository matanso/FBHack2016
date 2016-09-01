/**
 * Created by matan on 01/09/16.
 */
'use strict';

const ObjectId = require('mongodb').ObjectId;
const mongo = require('./mongodb');
const Image = require('./entities/Image');
const day = 1000 * 60 * 60 * 24;

function insert(image) {
    if(image.constructor != Image) return Promise.reject('not an image object');
    return mongo.getClient().then(client => client.collection('Image').insertOne(image));
}


function getNear(location, distance = 20000) {
    let yesterday = new Date(Date.now() - day);
    return mongo.getClient().then(client => client.collection('Image').aggregate().geoNear({
        near: location,
        distanceField: "distance",
        maxDistance: distance,
        spherical: true
    }).toArray());
}

function buyImage(_id) {
    if(_id.constructor != ObjectId) _id = new ObjectId(_id);
    

}

module.exports = {
    Image,
    insert,
    getNear
};
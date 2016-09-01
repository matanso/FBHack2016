/**
 * Created by matan on 01/09/16.
 */
'use strict';

const mongo = require('./mongodb');
const Image = require('./entities/Image');

function insert(image) {
    if(image.constructor != Image) return Promise.reject('not an image object');
    return mongo.getClient().then(client => client.collection('Image').insertOne(image));
}


function getNear(location, distance = 2000) {
    let yesterday = new Date(Date.now() - day);
    return mongo.getClient().then(client => client.collection('Image').aggregate().geoNear({
        near: location,
        distanceField: "distance",
        maxDistance: distance,
        spherical: true,
        query: { Start: {$gt: yesterday} }
    }).toArray());
}

module.exports = {
    Image,
    insert
};
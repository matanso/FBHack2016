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

module.exports = {
    Image,
    insert
}
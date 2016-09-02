/**
 * Created by matan on 01/09/16.
 */
'use strict';

const ObjectId = require('mongodb').ObjectId;
const mongo = require('./mongodb');
const logger = require('../utils/logger');
const Image = require('./entities/Image');
const day = 1000 * 60 * 60 * 24;

function insert(image) {
    if(image.constructor != Image) return Promise.reject('not an image object');
    return mongo.getClient().then(client => client.collection('Image').insertOne(image));
}


function getNear(location, distance = 20000) {
    return mongo.getClient().then(client => client.collection('Image').aggregate().geoNear({
        near: location,
        distanceField: "distance",
        maxDistance: distance,
        spherical: true
    }).toArray());
}

function buyImage(_id, buyerId) {
    if(_id.constructor != ObjectId) _id = new ObjectId(_id);
    if(buyerId.constructor != ObjectId) buyerId = new ObjectId(buyerId);
    logger.info(`${_id}, ${buyerId}`);
    return mongo.getClient().then(client => {
        return client.collection('Image').findOneAndUpdate({_id}, {$inc: {Purchased: 1}}).then(imageResult => {
            if(!imageResult.value) return Promise.reject();
            let image = imageResult.value;
            return Promise.all([
                client.collection('User').updateOne({_id: image.OwnerId}, {$inc: {Balance: image.Price}}),
                client.collection('User').updateOne({_id: buyerId}, {$inc: {Balance: -image.Price}})
            ]).then(() => image);
        });
    });
}

function getByUser(_id) {
    if(_id.constructor != ObjectId) _id = new ObjectId(_id);
    return mongo.getClient().then(client => client.collection('Image').find({OwnerId: _id}).toArray());
}


module.exports = {
    Image,
    insert,
    getNear,
    buyImage,
    getByUser
};
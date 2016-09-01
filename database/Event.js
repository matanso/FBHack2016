/**
 * Created by matan on 01/09/16.
 */
'use strict';

const mongo = require('./mongodb');
const Event = require('./entities/Event');
const Image = require('./entities/Image');
const day = 1000 * 60 * 60 * 24;

function getNear(location) {
    if(location.constructor == Event) {
        location = location.Location;
    }
    let yesterday = new Date(Date.now() - day);
    mongo.getClient().then(client => client.collection('Event').aggregate([{
        $geoNear: {
            near: {
                type: "Point",
                coordinates: location.coordinates
            },
            distanceField: "distance",
            maxDistance: 200,
            spherical: true,
            query: { Start: {$lt: } }
        }
    }])).then()
}
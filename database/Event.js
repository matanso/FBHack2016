/**
 * Created by matan on 01/09/16.
 */
'use strict';

const mongo = require('./mongodb');
const Event = require('./entities/Event');
const Image = require('./entities/Image');

function getNear(location) {
    if(location.constructor == Event) {
        location = location.Location;
    }
    mongo.getClient().then(client => client.collection('Event'))
}
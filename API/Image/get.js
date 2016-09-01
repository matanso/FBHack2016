/**
 * Created by matan on 01/09/16.
 */

'use strict';

const express = require('express');
const router  = express.Router();
const imageDB = require('../../database/Image');
const eventDB = require('../../database/Event');
const Point = require('../../database/entities/Point');

router.get('/nearby', (req, res) => {
    imageDB.getNear(new Point(req.query.Longitude, req.query.Latitude).toGeoJson()).then(result => {
        res.status(200).send({
            success: true,
            Images: result
        });
    });
});

router.get('/near/:eventId', (req, res) => {
    eventDB.getById(req.params.eventId).then(event => imageDB.getNear(event.Location).then(result => {
        res.status(200).send({
            success: true,
            Images: result
        });
    }));

});

module.exports = router;
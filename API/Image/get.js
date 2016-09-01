/**
 * Created by matan on 01/09/16.
 */

'use strict';

const express = require('express');
const router = express.Router();
const imageDB = require('../../database/Image');
const eventDB = require('../../database/Event');
const Point = require('../../database/entities/Point');
const logger = require('../../utils/logger');

router.get('/nearby', (req, res) => {
    let distance = parseFloat(req.query.distance || '2000');
    imageDB.getNear(new Point(req.query.Longitude, req.query.Latitude).toGeoJson(), distance).then(result => {
        res.status(200).send({
            success: true,
            Images: result
        });
    });
});

router.get('/near/:eventId', (req, res) => {
    let distance = parseFloat(req.query.distance || '2000');
    eventDB.getById(req.params.eventId).then(event => {
        if(!event) return res.status(404).send({success: false, err: 'No such event'});
        logger.info(`Getting images near ${JSON.stringify(event.Location)}`);
        imageDB.getNear(event.Location, distance).then(result => {
            res.status(200).send({
                success: true,
                Images: result
            });
        })
    });

});

module.exports = router;
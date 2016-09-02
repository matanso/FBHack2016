/**
 * Created by matan on 01/09/16.
 */

'use strict';

const express = require('express');
const router  = express.Router();
const eventDB = require('../../database/Event');
const Point = require('../../database/entities/Point');
const logger = require('../../utils/logger');

router.get('/nearby', (req, res) => {
    let distance = parseFloat(req.query.distance || '2000');
    eventDB.getNear(new Point(req.query.Longitude, req.query.Latitude).toGeoJson(), distance).then(result => {
        res.status(200).send({
            success: true,
            Events: result
        });
    }).catch(err => {
        logger.error(err);
        res.status(500).send('something went wrong');
    });
});

module.exports = router;
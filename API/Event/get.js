/**
 * Created by matan on 01/09/16.
 */

'use strict';

const express = require('express');
const router  = express.Router();
const eventDB = require('../../database/Event');
const Point = require('../../database/entities/Point');

router.get('/nearby', (req, res) => {
    eventDB.getNear(new Point(req.query.Longitude, req.query.Latitude).toGeoJson()).then(result => {
        res.status(200).send({
            success: true,
            Events: result
        });
    });
});

module.exports = router;
/**
 * Created by matan on 01/09/16.
 */

'use strict';

const express = require('express');
const router  = express.Router();
const Event = require('../../database/Event').Event;
const eventDB = require('../../database/Event');
const Point = require('../../database/entities/Point');
const logger = require('../../utils/logger');

//noinspection JSUnresolvedFunction
router.post('/', (req, res) => {
    let name = req.body.Name,
        start = new Date(req.body.Start),
        end = new Date(req.body.End),
        location = new Point(req.body.Longitude, req.body.Latitude);
    if(!name || !req.body.Start || !req.body.End || !req.body.Longitude || !req.body.Latitude) return res.status(400).send({success: false, err: "Bad parameters"});
    eventDB.insert(new Event(req.session.userId, name, start, end, location.toGeoJson())).then(writeResult => res.status(200).send({success: true, Event: {_id: writeResult.insertedId}})).catch(err => {
        logger.error(err);
        res.status(500).send({success: false, err: "Something went wrong"})
    });
});

module.exports = router;
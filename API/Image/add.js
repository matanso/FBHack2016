/**
 * Created by matan on 01/09/16.
 */

'use strict';

const path = require('path');
const fs = require('fs');
const express = require('express');
const router  = express.Router();
const logger = require('../../utils/logger');
const Image = require('../../database/Image').Image;
const img = require('../../database/Image');
const rand_str = require("randomstring");
const Point = require('../../database/entities/Point');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

function getRandomPath() {
    return `${rand_str.generate(20)}.jpg`;
}

//noinspection JSUnresolvedFunction
router.post('/', upload.single('image'), (req, res) => {
    let location = new Point(req.body.Longitude, req.body.Latitude),
        time = req.body.Time ? new Date(req.body.Time) : new Date(),
        price = req.body.Price || 1,
        events = req.body.Events || [];
    logger.info(JSON.stringify(req.file));
    let file = req.file;
    if(!req.body.Longitude || !req.body.Latitude || !file) return res.status(400).send({success: false, err: "Some arguments are missing"});
    let filePath = getRandomPath();
    fs.readFile(path.join(__dirname, '..', '..', file.path), (err, data) => {
        if(err) {
            logger.error(err);
            res.status(500).send({success: false, err: "Something failed"});
            return;
        }
        fs.writeFile(path.join(__dirname, '..', '..', 'static', 'imgs', filePath), data, err => {
            if(err) {
                logger.error(err);
                res.status(500).send({success: false, err: "Something failed"});
                return;
            }
            let image = new Image(req.session.userId, `/imgs/${filePath}`, location.toGeoJson(), time, price, events);
            img.insert(image).then(writeResult => res.status(200).send({success: true, Image: {path: image.Link, _id: writeResult.insertedId}})).catch(err => {
                logger.error(err);
                res.status(500).send({success: false, err: "Something failed"});
            });
        });
    });
});

module.exports = router;
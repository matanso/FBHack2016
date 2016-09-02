/**
 * Created by matan on 01/09/16.
 */

'use strict';

const path = require('path');
const fs = require('fs');
const express = require('express');
const router  = express.Router();
const logger = require('../../utils/logger');
const img = require('../../database/Image');

//noinspection JSUnresolvedFunction
router.post('/', (req, res) => {
    logger.info(JSON.stringify(req.body));
    let buyerId = req.session.userId,
        imageId = req.body.imageId;
    if(!imageId || !buyerId) return res.status(400).send({success: false, err: 'Bad parameters'});
    img.buyImage(imageId, buyerId).then(image => res.download(path.join(__dirname, '..', '..', 'static', image.Link)))
});

module.exports = router;
/**
 * Created by matan on 01/09/16.
 */
'use strict';

const express = require('express');
const router = express.Router();


router.use('/User', require('./User'));
router.use('/', (req, res, next) => {
    if(req.session.loggedIn && req.session.userId) next();
    else res.status(401).send({success: false, err: "You are not logged in"});
});
router.use('/Image', require('./Image'));
router.use('/Event', require('./Event'));

module.exports = router;
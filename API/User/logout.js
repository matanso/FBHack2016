/**
 * Created by matan on 01/09/16.
 */

'use strict';

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
    req.session.loggedIn = false;
    res.status(200).send({success: true});
});

module.exports = router;
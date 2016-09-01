/**
 * Created by matan on 01/09/16.
 */

'use strict';

const express = require('express');
const router  = express.Router();

router.use('/add', require('./add'));
router.use('/get', require('./get'));

module.exports = router;

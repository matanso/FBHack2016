/**
 * Created by matan on 01/09/16.
 */

'use strict';

const express = require('express');
const router  = express.Router();

router.use('/logout', require('./logout'));
router.use('/add', require('./add'));
router.use('/login', require('./login'));
router.use('/get', require('./get'));

module.exports = router;

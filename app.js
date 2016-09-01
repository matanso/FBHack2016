/**
 * Created by matan on 01/09/16.
 */
'use strict';


const express = require('express');
const morgan = require('morgan');
const logger = require('./utils/logger');
const app = express();

app.use(morgan('dev', {stream: logger.stream('info')}));

app.get('/:param', (req, res) => {
    res.status(200).send(`${req.params.param}, you are a fucking faggot. Also this is such a stupid idea. Let's build some fucking amazing live chatrooms with cool animations instead!!!!!! `);
});

module.exports = app;
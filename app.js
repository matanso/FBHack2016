/**
 * Created by matan on 01/09/16.
 */
'use strict';


const express = require('express');
const morgan = require('morgan');
const logger = require('./utils/logger');
const app = express();

app.use(morgan('dev', {stream: logger.stream('info')}));

app.get('/', (req, res) => {
    res.status(200).send('שיניתי');
});

module.exports = app;
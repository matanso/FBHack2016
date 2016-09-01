/**
 * Created by matan on 01/09/16.
 */
'use strict';


const express = require('express');
const morgan = require('morgan');
const logger = require('./utils/logger');
const app = express();
const api = require('./API');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, 'static')));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(morgan('dev', {stream: logger.stream('info')}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/api', api);

module.exports = app;
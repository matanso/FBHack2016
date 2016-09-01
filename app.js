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
const MongoStore = require('connect-mongo')(session);
const mongo = require('./database/mongodb');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Allow");
    next();
});

app.use(express.static(path.join(__dirname, 'static')));

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: false, domain: ""},
    store: new MongoStore({dbPromise: mongo.getClient()})
}));

app.use(morgan('dev', {stream: logger.stream('info')}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

app.use('/api', api);

module.exports = app;
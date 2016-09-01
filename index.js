/**
 * Created by matan on 01/09/16.
 */
'use strict';
global.Promise = require('bluebird');

const http = require('http');
const app = require('./app');
const config = require('config').get('server');

http.createServer(app).listen(config.port);
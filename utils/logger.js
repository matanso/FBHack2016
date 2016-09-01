/**
 * Created by matan on 01/09/16.
 */

'use strict';

const winston = require('winston');
const config = require('config').get('logs');

const logger = new winston.Logger({
    transports: [
        new winston.transports.File(config),
        new winston.transports.Console({colorize: true})
    ],
    level: config.level
});

logger.stream = level => ({
    write(message, encoding)
    {
        logger[level](message);
    }
});

module.exports = logger;
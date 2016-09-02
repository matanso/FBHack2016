/**
 * Created by matan on 01/09/16.
 */

'use strict';

const express = require('express');
const router  = express.Router();
const userDB = require('../../database/User');
const logger = require('../../utils/logger');

//noinspection JSUnresolvedFunction
router.get('/', (req, res) => {
    logger.info(JSON.stringify(req.session));
    if(!req.session.loggedIn) return res.status(401).send({success: false, err: "Not logged in"});
    userDB.getSafe(req.session.userId).then(user => {
        if(user) {
            return res.status(200).send({success: true, User: {_id: user._id, Username: user.Username, Email: user.Email, Balance: user.Balance}});
        }
        return res.status(404).send({success: false, err: "No such user"});
    }).catch(err => {
        logger.error(err);
        res.status(500).send({success: false, err: "Something went wrong"});
    });
});

router.get('/:userId', (req, res) => {
    logger.info(JSON.stringify(req.session));
    if(!req.session.loggedIn) return res.status(401).send({success: false, err: "Not logged in"});
    userDB.getSafe(req.params.userId).then(user => {
        if(user) {
            return res.status(200).send({success: true, User: {_id: user._id, Username: user.Username, Email: user.Email}});
        }
        return res.status(404).send({success: false, err: "No such user"});
    }).catch(err => {
        logger.error(err);
        res.status(500).send({success: false, err: "Something went wrong"});
    });
});

module.exports = router;
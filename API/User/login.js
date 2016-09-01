/**
 * Created by matan on 01/09/16.
 */

'use strict';

const express = require('express');
const router  = express.Router();

const User = require('../../database/User').User;
const userDB = require('../../database/User');
const logger = require('../../utils/logger');

//noinspection JSUnresolvedFunction
router.post('/', (req, res) => {
    let username = req.body.Username,
        password = req.body.Password;
    if(!username || !password) {
        return res.status(400).send('Bad parameters');
    }
    userDB.getByParams(username, password).then(user => {
        if(user) {
            req.session.loggedIn = true;
            req.session.userId = user._id;
            return res.status(200).send({success: true, Username: username, Email: user.Email});
        }
        return res.status(403).send({success: false, err: "No such user"});
    }).catch(err => {
        logger.error(err);
        res.status(500).send({success: false, err: "Something went wrong"});
    });
});

module.exports = router;
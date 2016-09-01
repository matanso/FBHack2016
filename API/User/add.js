/**
 * Created by matan on 01/09/16.
 */

'use strict';

const express = require('express');
const router  = express.Router();

const User = require('../../database/User').User;
const userDB = require('../../database/User');

//noinspection JSUnresolvedFunction
router.post('/', (req, res) => {
    let username = req.body.Username;
    let password = req.body.Password;
    let email = req.body.Email;
    if(!email || !username || !password) return res.status(400).send({success: false, err: "Bad parameters"});
    userDB.insert(new User(username, password, email)).then(writeResult => {
        req.session.loggedIn = true;
        req.session.userId = writeResult.insertedId;
        res.status(200).send({success: true, User: {_id: writeResult.insertedId, Username: username, Email: email}});
    }).catch(err => {
        res.status(400).send({success: false, err: "Username taken"})
    });
});

module.exports = router;
/**
 * Created by matan on 01/09/16.
 */

'use strict';

const express = require('express');
const router  = express.Router();

//noinspection JSUnresolvedFunction
router.post('/', (req, res) => {
    let username = req.body.Username;
    let password = req.body.Password;
    let email = req.body.Email;
    if(!email || !username || !password) return res.status(400).send({success: false, err: "Bad parameters"});
    
});

module.exports = router;
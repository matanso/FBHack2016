/**
 * Created by matan on 01/09/16.
 */

const md5 = require('../../utils/md5');

class User {
    constructor(username, password, email, balance = 0) {
        this.Username = username;
        this.PassHash = md5.md5Hash(password);
        this.Email = email;
        this.Balance = balance;
    }
}

module.exports = User;
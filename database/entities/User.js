/**
 * Created by matan on 01/09/16.
 */

const md5 = require('../../utils/md5');

class User {
    constructor(username, password, email) {
        this.Username = username;
        this.PassHash = md5.md5Hash(password);
        this.Email = email;
    }
}

module.exports = User;
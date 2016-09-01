/**
 * Created by matan on 01/09/16.
 */

const crypto = require('crypto');

module.exports.md5Hash = function (data) {
    let hash = crypto.createHash('md5');
    hash.update(data);
    return hash.digest('hex');
};

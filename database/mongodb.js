/**
 * Created by matan on 01/09/16.
 */

const config = require('config').get('mongodb');
const mongoClient = require('mongodb').MongoClient;
const url = `mongodb://${config.host}:${config.port}/${config.database}`;
let db;

module.exports.getClient = () => db? Promise.resolve(db): mongoClient.connect(url).then(cl => db = cl);
/**
 * Created by matan on 01/09/16.
 */

const ObjectId = require('mongodb').ObjectId;

class Image {
    constructor(ownerId, url, location, time=Date.now(), price=1, events=[]) {
        this.OwnerId = ownerId.constructor == ObjectId ? ownerId : new ObjectId(ownerId);
        this.Link = url;
        this.Location = location;
        this.Time = time;
        this.Price = price;
        this.Suggested = events;
        this.Purchases = 0;
    }
}

module.exports = Image;
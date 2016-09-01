/**
 * Created by matan on 01/09/16.
 */

const ObjectId = require('mongodb').ObjectId;
    
class Event {
    constructor(ownerId, name, startTime, endTime, location) {
        this.OwnerId = ownerId.constructor == ObjectId ? ownerId : new ObjectId(ownerId);
        this.Name = name;
        this.Start = startTime;
        this.End = endTime;
        this.Location = location;
    }
}

module.exports = Event;
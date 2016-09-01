/**
 * Created by matan on 01/09/16.
 */

class Event {
    constructor(ownerId, name, startTime, endTime, location) {
        this.OwnerId = ownerId;
        this.Name = name;
        this.Start = startTime;
        this.End = endTime;
        this.Location = location;
    }
}

module.exports = Event;
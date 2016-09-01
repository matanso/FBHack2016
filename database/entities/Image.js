/**
 * Created by matan on 01/09/16.
 */

class Image {
    constructor(ownerId, url, location, time=Date.now(), price=1, events=[]) {
        this.OwnerId = ownerId;
        this.Link = url;
        this.Location = location;
        this.Time = time;
        this.Price = price;
        this.Suggested = events;
    }
}

module.exports = Image;
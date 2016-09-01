/**
 * Created by matan on 01/09/16.
 */

class Point {
    constructor(lon, lat) {
        if (lon && lon.type === "Point" && lon.coordinates) {
            this.Longitude = lon.coordinates[0];
            this.Latitude = lon.coordinates[1];
        }
        else if (Array.isArray(lon)) {
            this.Longitude = lon[0];
            this.Latitude = lon[1];
        }
        else {
            this.Longitude = lon;
            this.Latitude = lat;
        }
    }

    toGeoJson() {
        return {
            type: "Point",
            coordinates: [this.Longitude, this.Latitude]
        };
    }
}

module.exports = Point;
/**
 * Created by matan on 01/09/16.
 */

class Point {
    constructor(lon, lat) {
        if (lon && lon.type === "Point" && lon.coordinates) {
            this.Longitude = parseFloat(lon.coordinates[0]);
            this.Latitude = parseFloat(lon.coordinates[1]);
        }
        else if (Array.isArray(lon)) {
            this.Longitude = parseFloat(lon[0]);
            this.Latitude = parseFloat(lon[1]);
        }
        else {
            this.Longitude = parseFloat(lon);
            this.Latitude = parseFloat(lat);
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
/**
 * Created by matan on 01/09/16.
 */

class StreetLight {
    var Period;
    var Location;
    var StartTime;
    constructor(PeriodMS, StartTimeMS, Location=[0,0], Latitude) {
        if(!Array.isArray(Location)) Location = [Location, Latitude];
        this.Period = PeriodMS;
        this.StartTime = StartTimeMS;
        this.Location = {type: "Point", coordinates: Location};
    }
}

module.exports = StreetLight;
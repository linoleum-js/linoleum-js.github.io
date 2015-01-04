
define(function () {
  'use strict';
  
  return {
    /**
     * @param {object} location {lat, lon}
     * @param {function} callback
     */
    getOffset: function (location, callback) {
      var tz = new TimeZoneDB();
      
      tz.getJSON({
        key: "SDTZPFEA2DIF",
        lat: location.lat,
        lng: location.lon
      }, function (data) {
        var time = (data.timestamp + (new Date()).getTimezoneOffset() * 60) * 1000,
          offset = time - (new Date()).getTime();
        
        callback(offset);
      });
    }
  };
});
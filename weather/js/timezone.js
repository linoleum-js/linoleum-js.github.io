
/**
 * used only if city is set manually 
 */
define(function () {
  'use strict';
  
  return {
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
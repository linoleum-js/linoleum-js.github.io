define(function () {
  'use strict';
  
  return {
    /**
     * @param {object} location { coords: { latitude, longitude } }
     * @param {function} callback
     */
    getOffset: function (position, callback) {
      if (!position.coords) {
        return;
      }
      
      var
        tz = new TimeZoneDB();
      
      tz.getJSON({
        key: "SDTZPFEA2DIF",
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }, function (data) {
        var
          time = (data.timestamp + (new Date()).getTimezoneOffset() * 60) * 1000,
          offset = time - (new Date()).getTime();
        
        callback(offset);
      });
    }
  };
});
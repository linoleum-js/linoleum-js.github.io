require([
  './clock',
  './date',
  './weather',
  './geolocation',
  './timezone',
  './city'
], function (clock, date, weather, geo, timezone, city) {
  'use strict';
  
  $('.ww-wrap').draggable({
    scroll: false,
    cancel: '.ww-city'
  });
  
  
  /**
   * locate automaticly
   */
  var automaticly = function () {
      // by default show local time and weather
      clock.show();
      date.show();
      // depending on the location (city)
      geo.getCity(function (cityName) {
        // cityName === undefined means that geolocation failed
        if (!cityName) {
          city.inviteUserEntry();
          return;
        }
        
        weather.show(cityName);
        city.show(cityName);
      });
    },
      
    /**
     * locate manually
     */
    manually = function (cityName) {
      weather.show(cityName);
      
      geo.getLocation(cityName, function (location) {
        // data is {lat, lon} object
        timezone.getOffset(location, function (offset) {
          clock.show(offset);
          date.show(offset);
        });
      });
    };
  
  automaticly();
  city.onchange(manually);
  
  
});
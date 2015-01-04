define([
  './app',
  './clock',
  './date',
  './weather',
  './geolocation',
  './timezone',
  './city',
  './translate'
], function (app, clock, date, weather, geo, timezone, city, translate) {
  'use strict';
  
  $('.ww-wrap').draggable({
    scroll: false,
    cancel: '.ww-city'
  });
  
  /**
   * callback pyramids of doom ><
   * upd. not anymore!:) $.Deferred FTW!!1
   */
  
  /**
   * locate automaticly
   */
  var automaticly = function () {
      var cityLoaded = $.Deferred(),
        translated   = $.Deferred(),
        located      = $.Deferred(),
        offsetLoaded = $.Deferred();

      // depending on the location (city)
      geo.getCity(function (cityName) {
        cityLoaded.resolve(cityName);
      });

      cityLoaded.then(function (cityName) {
        // undefined means that geolocation failed
        if (!cityName) {
          return city.inviteUserEntry();
        }

        weather.show(cityName);
        city.show(cityName);

        translate(cityName, function (enCity, lang) {
          translated.resolve(enCity, lang);
        });
      });

      // by default show local time and weather
      geo.getLocationLocaly(function (location) {
        located.resolve(location);
      });

      located.then(function (location) {
        // data is {lat, lon} object
        timezone.getOffset(location, function (offset) {
          offsetLoaded.resolve(offset);
        });
      });

      $.when(offsetLoaded, translated).then(function (offset, lang) {
        clock.show(offset);
        date.show(offset, lang[1]);
      });
    },

    /**
     * locate manually
     */
    manually = function (cityName) {
      var translated = $.Deferred(),
        located      = $.Deferred(),
        offsetLoaded = $.Deferred();
      
      city.show(cityName);

      translate(cityName, function (enCityName, lang) {
        translated.resolve(enCityName, lang);
      });
      
      translated.then(function (enCityName) {
        weather.show(enCityName);
        
        geo.getLocation(enCityName, function (location) {
          located.resolve(location);
        });
      });
      
      located.then(function (location) {
        // data is {lat, lon} object
        timezone.getOffset(location, function (offset) {
          offsetLoaded.resolve(offset);
        });
      });
      
      $.when(offsetLoaded, translated).then(function (offset, lang) {
        clock.show(offset);
        date.show(offset, lang[1]);
      });
    };
  
  return function (args) {
    args = args || {};
    
    app.build(args.wrap);
    
    if (args.city) {
      manually(args.city);
    } else {
      automaticly();
    }
    
    city.onchange(manually);
  };
});
define([
  './clock',
  './date',
  './weather',
  './city',
  './util/geolocation',
  './util/timezone',
  './util/translate'
], function (Clock, DateElement, Weather, City, geo, timezone, translate) {
  'use strict';
  
  /**
   * @constructor
   * @param {jQuery} $root
   * @param {string=} cityName - name of the city
   */
  var Initializer = function ($root, cityName) {
    
    this.clock   = new Clock($root);
    this.date    = new DateElement($root);
    this.weather = new Weather($root);
    this.city    = new City($root);
    
    if (cityName) {
      this.initManually(cityName);
    } else {
      this.initAutomaticly();
    }
    
    this.city.onchange($.proxy(this.initManually, this));
    
    $root.find('.ww-reload').on('click', $.proxy(function () {
      this.initAutomaticly();
    }, this));
  };
  
  /**
   * init by geolocation api
   */
  Initializer.prototype.initAutomaticly = function () {
    var cityLoaded = $.Deferred(),
      translated   = $.Deferred(),
      located      = $.Deferred(),
      offsetLoaded = $.Deferred(),
        
      self = this;

    geo.getCity(function (cityName) {
      cityLoaded.resolve(cityName);
    });

    cityLoaded.then(function (cityName) {
      // undefined means that geolocation failed
      if (!cityName) {
        return self.city.inviteUserEntry();
      }

      self.weather.show(cityName);
      self.city.show(cityName);

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
      self.clock.show(offset);
      self.date.show(offset, lang[1]);
    });
  };

  /**
   * init by the user entry
   * @param {string} cityName
   */
  Initializer.prototype.initManually = function (cityName) {
    var translated = $.Deferred(),
      located      = $.Deferred(),
      offsetLoaded = $.Deferred(),
        
      self = this;

    self.city.show(cityName);

    translate(cityName, function (enCityName, lang) {
      translated.resolve(enCityName, lang);
    });

    translated.then(function (enCityName) {
      self.weather.show(enCityName);

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
      self.clock.show(offset);
      self.date.show(offset, lang[1]);
    });
  };
  
  return Initializer;
});
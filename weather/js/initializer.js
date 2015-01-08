define([
  './clock',
  './date/date',
  './weather/weather',
  './city',
  './util/geolocation',
  './util/timezone',
  './util/translate'
], function (Clock, DateElement, Weather, City, geo, timezone, translate) {
  'use strict';
  
  var
    /**
     * @constructor
     * @param {jQuery} $root
     * @param {string=} cityName - name of the city
     */
    Initializer = function ($root, cityName) {

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
   * init by current use position
   */
  Initializer.prototype.initAutomaticly = function () {
    var
      translated   = $.Deferred(),
      located      = $.Deferred(),
      offsetLoaded = $.Deferred(),
        
      self = this;

    geo.getCity(function (cityName, position) {
      located.resolve(cityName, position);
    });

    located.then(function (cityName, position) {
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

    this.initDataAndClock({
      located: located,
      offsetLoaded: offsetLoaded,
      translated: translated
    });
  };

  /**
   * init by the user entry
   * @param {string} cityName
   */
  Initializer.prototype.initManually = function (cityName) {
    var
      translated   = $.Deferred(),
      located      = $.Deferred(),
      offsetLoaded = $.Deferred(),
        
      self = this;

    self.city.show(cityName);

    translate(cityName, function (enCityName, lang) {
      translated.resolve(enCityName, lang);
    });

    translated.then(function (enCityName) {
      self.weather.show(enCityName);

      geo.getPositionByCity(enCityName, function (cityName, position) {
        located.resolve(cityName, position);
      });
    });
    
    this.initDataAndClock({
      located: located,
      offsetLoaded: offsetLoaded,
      translated: translated
    });
  };
  
  /**
   * @param {$.Deferred} param.located
   * @param {$.Deferred} param.offsetLoaded
   * @param {$.Deferred} param.translated
   */
  Initializer.prototype.initDataAndClock = function (param) {
    var
      self = this;
    
    param.located.then(function (cityName, position) {
      // data is { coords: {latitude, longitude} } object
      timezone.getOffset(position, function (offset) {
        param.offsetLoaded.resolve(offset);
      });
    });
    
    param.offsetLoaded.then(function (offset) {
      self.clock.show(offset);
    });

    $.when(
      param.offsetLoaded,
      param.translated
    ).then(function (offset, lang) {
      self.date.show(offset, lang[1]);
    });
  };
  
  
  return Initializer;
});
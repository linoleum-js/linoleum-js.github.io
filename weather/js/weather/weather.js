define([
  './weather-iconmap',
  '../util/services'
], function (iconMap, services) {
  'use strict';
  
  var
    /**
     * @constructor
     * @param {jQuery} $root
     */
    Weather = function ($root) {
      this.$root = $root;
      this.defaultIconClass = 'ww-icon';

      this.$weather = $root.find('.ww-weather');
      this.$icon = $root.find('.ww-icon');
      this.currentUnits = 'cel';

      this.initListeners();
    };
  
  /**
   * bind all the events
   */
  Weather.prototype.initListeners = function () {
    var
      self = this;
    
    this.$weather.on('click', function () {
      if ($(this).hasClass('error')) {
        return;
      }
      
      if (self.currentUnits === 'cel') {
        self.currentUnits = 'far';
        self.celToFar();
        self.renderTemp(self.temp - 2, self.temp + 2, '°F');
      } else {
        self.currentUnits = 'cel';
        self.farToCel();
        self.renderTemp(self.temp - 1, self.temp + 1, '°C');
      }
    });
  };
    
  /**
   * @param {string} iconName
   */
  Weather.prototype.showIcon = function (iconName) {
    var
      cssClass = iconMap[iconName];

    this.$icon
      .removeClass()
      .addClass(cssClass)
      .addClass(this.defaultIconClass);
  };
      
  /**
   * @param {number} k
   */
  Weather.prototype.kelToCel = function (k) {
    return k - 273.15;
  };
      
  /**
   * convert temperature to farenheit
   */
  Weather.prototype.celToFar = function () {
    this.temp = this.temp * 9 / 5 + 32;
  };
      
  /**
   * convert temperature to celsius
   */
  Weather.prototype.farToCel = function () {
    this.temp = (this.temp - 32) * 5 / 9;
  };
  
  /**
   * @param {string|number} min
   * @param {string|number} max
   * @param {string} symbol
   */
  Weather.prototype.renderTemp = function (min, max, symbol) {
    var
      template = '<% min %>..<% max %> ' + symbol,
      html,

      tempHelper = function (temp) {
        temp = Math.round(temp);
        
        if (temp > 0) {
          temp = '+' + temp;
        }

        return temp;
      };

    html = template
      .replace('<% min %>', tempHelper(min))
      .replace('<% max %>', tempHelper(max));

    this.$weather
      .html(html)
      .removeClass('error');
  };
    
  /**
   * show temperature
   */
  Weather.prototype.showTemp = function (temp) {
    this.renderTemp(temp - 1, temp + 1, '°C');
    
    // save
    this.temp = temp;
  };
    
  /**
   * load json and show
   */
  Weather.prototype.show = function (city) {
    var
      self = this;
    
    services.weather(city, function (data) {
      // city not found
      if (data.cod === '404') {
        // allow user input
        self.$weather
          .addClass('error')
          .html('City not found');
        
        self.$icon
          .removeClass()
          .addClass(self.defaultIconClass);
      } else {
        // success
        self.showIcon(data.weather[0].icon);
        self.showTemp(self.kelToCel(data.main.temp));
      }
    });
  };
  
  return Weather;
});


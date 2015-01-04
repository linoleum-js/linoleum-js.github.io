define(function () {
  'use strict';
  
  /**
   * @constructor
   * @param {jQuery} $root
   */
  var Weather = function ($root) {
    this.$root = $root;
    this.defaultIconClass = 'ww-icon';
    
    this.$weather = $root.find('.ww-weather');
    this.$icon = $root.find('.ww-icon');
    this.currentUnits = 'cel';
    
    this.initListeners();
  };
  
  /**
   * bind all events
   */
  Weather.prototype.initListeners = function () {
    var self = this;
    
    this.$weather.on('click', function () {
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
   * load json response for specified city
   * @param {string} city - city
   * @param {function} callback
   */
  Weather.prototype.getJson = function (city, callback) {
    var baseUrl = 'http://api.openweathermap.org/data/2.5/weather',
      url = baseUrl + '?q=' + city;

    $.getJSON(url, callback);
  };
    
  /**
   * @param {string} iconName
   */
  Weather.prototype.showIcon = function (iconName) {
    /** contains pairs (iconName: cssClass) */
    var iconsMap = {
        '01d': 'wi-day-sunny',
        '02d': 'wi-day-sunny-overcast',
        '03d': 'wi-cloud',
        '04d': 'wi-cloudy',
        '10d': 'wi-day-showers',
        '11d': 'wi-day-lightning',
        '13d': 'wi-day-snow',

        '01n': 'wi-night-clear',
        '02n': 'wi-night-alt-sunny-overcast',
        '03n': 'wi-night-partly-cloudy',
        '04n': 'wi-night-alt-cloudy',
        '10n': 'wi-night-alt-showers',
        '11n': 'wi-night-alt-lightning',
        '13n': 'wi-night-alt-snow'
      },

      cssClass = iconsMap[iconName];

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
    this.temp = this.temp * 5 / 9 + 32;
  };
      
  /**
   * convert temperature to celsius
   */
  Weather.prototype.farToCel = function () {
    this.temp = (this.temp - 32) * 9 / 5;
  };
  
  /**
   * @param {string|number} min
   * @param {string|number} max
   * @param {string} symbol
   */
  Weather.prototype.renderTemp = function (min, max, symbol) {
    var template = '<% min %>..<% max %> ' + symbol,
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
    var self = this;
    
    this.getJson(city, function (data) {
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


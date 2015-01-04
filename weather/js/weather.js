define([
  './app'
], function (app) {
  'use strict';
  
  var $root = app.$root,
    defaultIconClass = 'ww-icon',
      
    /**
     * load json response for specified city
     * @param {string} city - city
     * @param {function} callback
     */
    getJson = function (city, callback) {
      var baseUrl = 'http://api.openweathermap.org/data/2.5/weather',
        url = baseUrl + '?q=' + city;

      $.getJSON(url, callback);
    },
    
    /**
     * @param {string} iconName
     */
    showIcon = function (iconName) {
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
      
      $root.find('.ww-icon')
        .removeClass()
        .addClass(cssClass)
        .addClass(defaultIconClass);
    },
      
    /** @param {number} k */
    kelvinToCelsius = function (k) {
      return k - 273.15;
    },
    
    /**
     * show temperature
     */
    showTemp = function (temp) {
      var template = '<% min %>..<% max %> °C',
        html,
          
        tempHelper = function (temp) {
          if (temp > 0) {
            temp = '+' + temp;
          }
          
          return temp;
        };
      
      temp = Math.round(kelvinToCelsius(temp));
      
      html = template
        .replace('<% min %>', tempHelper(temp - 1))
        .replace('<% max %>', tempHelper(temp + 1));
      
      $root.find('.ww-weather')
        .html(html)
        .removeClass('error');
    },
    
    /**
     * load json and show
     */
    loadAndShow = function (city) {
      getJson(city, function (data) {
        // city not found
        if (data.cod === '404') {
          // allow user input
          $root
            .find('.ww-weather')
              .addClass('error')
              .html('City not found')
              .end()
            .find('.ww-icon')
              .removeClass()
              .addClass(defaultIconClass);
        } else {
          // success
          showIcon(data.weather[0].icon);
          showTemp(data.main.temp);
        }
      });
    };
  
  return {
    show: function (city) {
      loadAndShow(city);
    }
  };
});


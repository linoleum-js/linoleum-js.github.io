define(function () {
  'use strict';
  
  var
    /**
     * load json response for specified city
     *
     * @param {string} city - city
     * @param {function} callback
     */
    weather = function (city, callback) {
      var
        url = [
          'http://api.openweathermap.org/data/2.5/weather',
          '?q=',
          city
        ].join('');

      $.getJSON(url, callback);
    },
      
    /**
     * get city by position
     *
     * @param {object} position
     * @param {function} callback
     */
    city = function (position, callback) {
      var
        url = [
          'http://maps.googleapis.com/maps/api/geocode/json?',
          'latlng=',
          position.coords.latitude,
          ',',
          position.coords.longitude,
          '&sensor=false'
        ].join(''),
          
        // exctract the city name from the data
        getCityName = function (data) {
          var
            city;

          $.each(data.results, function () {
            if (this.types[0] === 'locality') {
              city = this.address_components[0].long_name;
              return false;
            }
          });

          return city;
        };
      
      $.getJSON(url, function (data) {
        callback(getCityName(data));
      });
    },
    
    /**
     * http://www.geoplugin.com/webservices/json
     *
     * @param {function} callback
     */
    position = function (callback) {
      var url = 'http://www.geoplugin.net/json.gp?jsoncallback=?';
      
      $.getJSON(url, function (data) {
        callback({
          coords: {
            latitude: parseFloat(data.geoplugin_latitude, 10),
            longitude: parseFloat(data.geoplugin_longitude, 10)
          }
        });
      });
    },
      
    /**
     * wise-versa - get location by the name of the city
     *
     * @param {string} city
     * @param {function} callback
     */
    positionByCity = function (city, callback) {
      var
        url = [
          'http://api.openweathermap.org/data/2.5/weather',
          '?q=',
          city
        ].join('');
      
      $.getJSON(url, function (data) {
        if (data.cod === '404') {
          callback(city, data);
          return;
        }
        
        callback(city, {
          coords: {
            latitude: data.coord.lat,
            longitude: data.coord.lon
          }
        });
      });
    };
  
  return {
    weather: weather,
    city: city,
    position: position,
    positionByCity: positionByCity
  };
});
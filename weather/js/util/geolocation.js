define(function () {
  'use strict';
  /**
   * exctract the city name from the data
   *
   * @param {object} data
   * @returns {string} name of the city
  */
  var getCityName = function (data) {
      var city;

      $.each(data.results, function () {
        if (this.types[0] === 'locality') {
          city = this.address_components[0].long_name;
          return false;
        }
      });
    
      return city;
    },
    
    /**
     * build the url for google maps
     *
     * @param {number} lat
     * @param {number} lon
     * @returns url of json containing data for lat&lon
     */
    getUrlCity = function (lat, lon) {
      var template = [
          'http://maps.googleapis.com/maps/api/geocode/json?',
          'latlng=<% lat %>,<% lon %>',
          '&sensor=false'
        ].join('');

      return template
        .replace('<% lat %>', lat)
        .replace('<% lon %>', lon);
    },
      
    /**
     * get json and exctract city name
     *
     * @param {string} url
     * @param {function} callback
     */
    decode = function (url, callback) {
      $.getJSON(url, function (data) {
        callback(getCityName(data));
      });
    },
    
    /**
     * get city by current location
     *
     * @param {function} callback
     */
    getCity = function (callback) {
      if (!navigator.geolocation) {
        callback();
        return;
      }
      
      // get location
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude,
          lon = position.coords.longitude,
          url = getUrlCity(lat, lon);
        
        decode(url, callback);
      }, function () {
        // Error callback not working in mozilla
        // (https://bugzilla.mozilla.org/show_bug.cgi?id=675533)
        callback();
      });
      
    },
      
    /**
     * @param {string} city
     * @return {string} url of json containing data for specified city
     */
    getUrlLocation = function (city) {
      var baseUrl = 'http://api.openweathermap.org/data/2.5/weather',
        url = baseUrl + '?q=' + city;
      
      return url;
    },
      
    /**
     * wise-versa - get location by cityname
     * @param {string} city
     * @param {function} callback
     */
    getLocation = function (city, callback) {
      var url = getUrlLocation(city);
      
      $.getJSON(url, function (data) {
        if (!data.coord) {
          return;
        }
        
        callback({
          lat: data.coord.lat,
          lon: data.coord.lon
        });
      });
    },
    
    /**
     * get current latitude and longitude
     *
     * @param {function} callback
     */
    getLocationLocaly = function (callback) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude,
          lon = position.coords.longitude;
        
        callback({
          lat: lat,
          lon: lon
        });
      });
    };
  
  return {
    getCity: getCity,
    getLocation: getLocation,
    getLocationLocaly: getLocationLocaly
  };
});
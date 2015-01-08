define([
  './services'
], function (services, Cache) {
  'use strict';
  
  var
    /**
     * locate user using native geolocation or geoplugin api
     *
     * @param {function} callback
     * @param {boolean=} native - if true - using native geolocation
     */
    getCurrentPosition = function (callback, native) {
      if (native) {
        navigator.geolocation.getCurrentPosition(callback);
      } else {
        services.position(function (data) {
          callback(data);
        });
      }
    },
      
    /**
     * wise-versa - get location by the name of the city
     * @param {string} city
     * @param {function} callback
     */
    getPositionByCity = services.positionByCity,
    
    /**
     * get city by current location
     *
     * @param {function} callback
     */
    getCity = function (callback) {
      // get the location
      getCurrentPosition(function (position) {
        // get the city
        services.city(position, function (city) {
          callback(city, position);
        });
      });
      
    };
  
  return {
    getCity: getCity,
    getPositionByCity: getPositionByCity,
    getCurrentPosition: getCurrentPosition
  };
});
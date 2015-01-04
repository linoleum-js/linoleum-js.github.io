define(function () {
  'use strict';
  
  return {
    appId: function () {
      var random = Math.floor(Math.random() * Math.pow(10, 10));
      
      return 'id' + random;
    }
  };
});
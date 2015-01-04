define(function () {
  'use strict';
  
  var random = Math.floor(Math.random() * Math.pow(10, 10));
  
  return {
    appId: 'id' + random
  };
});
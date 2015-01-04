define([
  './app',
  './initializer'
], function (App, Initializer) {
  'use strict';
  
  return function (args) {
    args = args || {};
    
    var app = new App(),
      ini;
    
    app.build(args.wrap, args.position);
    ini = new Initializer(app.$root);
    
    if (args.city) {
      ini.initManually(args.city);
    } else {
      ini.initAutomaticly();
    }
    
    ini.city.onchange($.proxy(ini.initManually, ini));
  };
});
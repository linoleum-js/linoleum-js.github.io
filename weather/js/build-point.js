require([
  './weather-widget',
  './util/loader'
], function (WeatherWidget, loader) {
  'use strict';
  
  window.WeatherWidget = WeatherWidget;
});
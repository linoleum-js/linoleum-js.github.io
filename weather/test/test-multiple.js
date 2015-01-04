require([
  '../js/weather-widget'
], function (WeatherWidget) {
  'use strict';
  
  var tests = [{
      city: 'москва',
      position: [40, 40]
    }, {
      city: 'moscow',
      position: [220, 40]
    }, {
      city: 'new york',
      position: [400, 40]
    }, {
      city: 'сочи',
      position: [580, 40]
    }, {
      city: '東京',
      position: [760, 40]
    }, {
      city: 'Aßlar',
      position: [940, 40]
    }, {
      city: 'Águeda',
      position: [1120, 40]
    }, {
      city: 'Málaga',
      position: [40, 280]
    }, {
      city: 'Stockholm',
      position: [220, 280]
    }, {
      city: '北京',
      position: [400, 280]
    }, {
      city: 'Zürich',
      position: [580, 280]
    }, {
      city: 'Київ',
      position: [760, 280]
    }, {
      city: 'Երևան',
      position: [940, 280]
    }, {
      city: 'Saint-Étienne',
      position: [1120, 280]
    }],

    widgets = [];
  
  tests.forEach(function (item) {
    widgets.push(new WeatherWidget(item));
  });
});
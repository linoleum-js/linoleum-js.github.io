define(function () {
  'use strict';
  
  var cssString = '<### css ###>',
    $style = $('.ww-style'),
    $link,
    $link1;
  
  // style element is already created
  if ($style.length) {
    return;
  }
  
  $style = $('<style/>');
  $style.text(cssString);
  $style.addClass('ww-style');
  $('head').append($style);
  
  $link = $('<link/>');
  $link
    .attr('rel', 'stylesheet')
    .attr('href', 'https://cdnjs.cloudflare.com/ajax/libs/weather-icons/1.3.2/css/weather-icons.min.css');
  $('head').append($link);
  
  $link1 = $('<link/>');
  $link1
    .attr('rel', 'stylesheet')
    .attr('href', 'http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&subset=latin,cyrillic-ext');
  $('head').append($link1);
  
  
  
});
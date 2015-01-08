define(function () {
  'use strict';
  
  var
    // <### css* ###> will be perlaced by real css code (by grunt)
    cssStrings = [
      '<### css1 ###>'
    ],
      
    links = [
      'https://cdnjs.cloudflare.com/ajax/libs/weather-icons/1.3.2/css/weather-icons.min.css',
      'http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&subset=latin,cyrillic-ext'
    ],
    
    // add this class to the all added style and link elements
    addedClass = 'ww-loaded',
      
    $head = $('head'),
    
    /**
     * add <style> element with specified css to the head element
     *
     * @param {string} css
     */
    addCss = function (css) {
      var
        $style = $('<style/>');

      $style
        .text(css)
        .addClass('ww-loaded')
        .appendTo($head);
    },
    
    /**
     * add <link rel=stylesheet> element with specified href to th e head element
     *
     * @param {string} href
     */
    addLink = function (href) {
      var
        $link = $('<link/>');

      $link
        .attr('rel', 'stylesheet')
        .attr('href', href)
        .addClass('ww-loaded')
        .appendTo($head);
    };
  
  // style element is already created
  if ($('.' + addedClass).length) {
    // avoid a multiple creating
    return;
  }
  
  cssStrings.forEach(addCss);
  
  links.forEach(addLink);
  
});
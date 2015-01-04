define([
  './config'
], function (config) {
  'use strict';
  
  /**
   * @param {string} wrap - selector of wrap element
   */
  var html = [
      '<div class="ww-time">',
      '  <span class="ww-hours"></span>',
      '  <span class="ww-colon">:</span>',
      '  <span class="ww-minutes"></span>',
      '</div>',
      '<div class="ww-date">',
      '  <span class="ww-date-inner"></span>',
      '</div>',
      '<div class="ww-icon"></div>',
      '<div class="ww-weather"></div>',
      '<div>',
      '  <input type="text" class="ww-city" value="" size="0">',
      '</div>'
    ].join('\n'),
  
    $root = $('<div class="ww-wrap ' + config.appId + '"></div>'),
      
    builded = false,
      
    build = function (wrap) {
      var $wrap = $(document.body);

      if (wrap) {
        $wrap = $(wrap);
      }

      $root.html(html);
      $wrap.append($root);
      
      builded = true;
    };
  
  return {
    build: build,
    
    $root: $root
  };
});
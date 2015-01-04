define([
  './util/config'
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
      '<div class="ww-weather nondrag"></div>',
      '<div>',
      '  <input type="text" class="ww-city nondrag" value="" size="0">',
      '</div>'
    ].join('\n'),
      
    App = function () {
      this.id = config.appId();
      this.$root = $('<div class="ww-wrap ' + this.id + '"></div>');
    };
  
  /**
   * generate html for app and init all the necessary fields
   * @param {string?} wrap
   * @param {array?} position - [left, top]
   */
  App.prototype.build = function (wrap, position) {
    var $wrap = $(document.body);

    if (wrap) {
      $wrap = $(wrap);
    }

    this.$root.html(html);
    $wrap.append(this.$root);

    this.$root.draggable({
      scroll: false,
      cancel: '.nondrag'
    });
    
    this.$root
      .on('mousedown', function () {
        $(this).css('z-index', 1000);
      })
      .on('mouseup', function () {
        $(this).css('z-index', 1);
      });

    if (position) {
      this.$root
        .css('left', position[0])
        .css('top', position[1]);
    }
  };
  
  return App;
});
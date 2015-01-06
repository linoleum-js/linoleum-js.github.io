define([
  './initializer',
  './lib/google-maps',
  './lib/timezone-db'
], function (Initializer) {
  'use strict';

  var template = [
      '<button class="ww-reload nondrag" title="reload">⟲</button>',
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
    
    /**
     * @constructor
     * @param {object=} args
     *   @param {string=} args.wrap - selector of wrpper element
     *   @param {string=} args.city - name of the city
     *   @param {array=} args.position - array [left, top]
     */
    WeatherWidget = function (args) {
      args = args || {};
      
      this.build(args.wrap, args.position);
      
      this.ini = new Initializer(this.$root, args.city);
      
    };
  
  /**
   * generate html for app and init all the necessary fields
   * @param {string=} wrap
   * @param {array=} position - [left, top]
   */
  WeatherWidget.prototype.build = function (wrap, position) {
    var $wrap = $(document.body);
    
    this.$root = $('<div class="ww-wrap"></div>');

    if (wrap) {
      $wrap = $(wrap);
    }

    this.$root.html(template);
    $wrap.append(this.$root);

    this.$root.draggable({
      scroll: false,
      cancel: '.nondrag'
    });
    
    // on the top of document while dragging
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
  
  return WeatherWidget;
});
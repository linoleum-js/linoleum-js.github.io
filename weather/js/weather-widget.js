define([
  './initializer',
  './util/template',
  './lib/google-maps',
  './lib/timezone-db'
], function (Initializer, template) {
  'use strict';

  var
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
    var
      $wrap = $(document.body);

    if (wrap) {
      $wrap = $(wrap);
    }
    
    this.$root = $('<div class="ww-wrap"></div>');
    this.$root.html(template);
    $wrap.append(this.$root);

    this.$root.draggable({
      scroll: false,
      cancel: '.ww-nondrag'
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
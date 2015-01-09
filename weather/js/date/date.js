define([
  '../util/translate/translate',
  './date-helpers'
], function (translate, helpers) {
  'use strict';
  
  var
    /**
     * @constructor
     * @param {jQuery} $root
     */
    DateElement = function ($root) {
      this.$root = $root;
      // offset from UTC
      this.offset = 0;

      this.lang = 'ru';

      this.$container = $root.find('.ww-date-inner');
      this.$wrap = $root.find('.ww-date');
    };
  
  /**
   * resize text if necessery
   */
  DateElement.prototype.checkFit = function () {
    var
      maxWidth = 140,
      currentWidth = this.$container.width(),
      fontSize = 12;
    
    if (currentWidth > maxWidth) {
      fontSize = 10;
    }
    
    this.$container.css('font-size', fontSize);
  };
  
  /**
   * update html
   */
  DateElement.prototype.updateDate = function () {
    var
      date = new Date(),
      self = this,
      value;

    if (this.offset !== undefined) {
      date.setTime(new Date().getTime() + this.offset);
    }

    value = [
      helpers.dayOfWeek(date.getDay()),
      ',',
      date.getDate(),
      helpers.month(date.getMonth()),
      helpers.year(date.getYear())
    ].join(' ');

    translate(value, function (newValue) {
      self.$container.html(newValue);
      self.$wrap.show(); // show only when loaded
      
      self.checkFit();
    }, this.lang);
    
  };

  /**
   * render html and init setInterval
   * @param {number} offset - ms
   * @param {string} lang
   */
  DateElement.prototype.show = function (offset, lang) {
    if (offset !== undefined) {
      this.offset = offset;
    }
    this.lang = lang;


    this.updateDate();
    setInterval($.proxy(this.updateDate, this), 1000 * 60);
  };
  
  return DateElement;
});

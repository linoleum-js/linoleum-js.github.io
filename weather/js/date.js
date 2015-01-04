define([
  './util/translate'
], function (translate) {
  'use strict';
  
  /**
   * @constructor
   * @param {jQuery} $root
   */
  var DateElement = function ($root) {
    this.$root = $root;
    // offset from UTC
    //this.offset;
    
    //this.lang;
    
    this.$container = $root.find('.ww-date-inner');
    this.$wrap = $root.find('.ww-date');
    
    /** couple of functions for date formating */
    this.helpers = {
      /** @returns {string} name of the day of week */
      dayOfWeek: function (dayOfWeek) {
        return [
          'sunday',
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday'
        ][dayOfWeek];
      },

      /** @returns {string} name of the month */
      month: function (month) {
        return [
          'january',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ][month];
      },

      /** @returns {number} year in YYYY format */
      year: function (year) {
        return year + 1900;
      }
    };
  };
  
  /**
   * resize text if necessery
   */
  DateElement.prototype.checkFit = function () {
    var maxWidth = 140,
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
    var date = new Date(),
      self = this,
      value;

    if (this.offset !== undefined) {
      date.setTime(new Date().getTime() + this.offset);
    }

    value = [
      this.helpers.dayOfWeek(date.getDay()),
      ',',
      date.getDate(),
      this.helpers.month(date.getMonth()),
      this.helpers.year(date.getYear())
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

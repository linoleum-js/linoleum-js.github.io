define([
  './translate',
  './app'
], function (translate, app) {
  'use strict';
  
  /**
   * date
   */
  var $root = app.$root,
    // offset from UTC. If undefined - using local time
    offset,
      
    lang,

    /** couple of functions for data formating */
    helpers = {
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
    },

    updateDate = function () {
      var date = new Date(),
        value;
      
      if (offset !== undefined) {
        date.setTime(new Date().getTime() + offset);
      }

      value = [
        helpers.dayOfWeek(date.getDay()),
        ',',
        date.getDate(),
        helpers.month(date.getMonth()),
        helpers.year(date.getYear())
      ].join(' ');
      
      translate(value, function (newValue) {
        $root
          .find('.ww-date-inner')
            .html(newValue)
            .end()
          .find('.ww-date') // show only when loaded
            .show();
      }, lang);
    };

  return {
    show: function (offsetUtc, sourceLang) {
      if (offsetUtc !== undefined) {
        offset = offsetUtc;
      }
      lang = sourceLang;
      
      
      updateDate();
      setInterval(updateDate, 1000 * 60);
    }
  };
});

define(function () {
  'use strict';
  
  /**
   * date
   */
  var $dayOfWeek = $('.ww-day-of-week'),
    $day = $('.ww-day'),
    $month = $('.ww-month'),
    $year = $('.ww-year'),
      
    $wrap = $('.ww-date'),
    
    // offset from UTC. If undefined - using local time
    offset,

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
      var date = new Date();
      
      if (offset !== undefined) {
        date.setTime(new Date().getTime() + offset);
      }

      $dayOfWeek.html(helpers.dayOfWeek(date.getDay()));
      $day.html(date.getDate());
      $month.html(helpers.month(date.getMonth()));
      $year.html(helpers.year(date.getYear()));
      // show only when loaded
      $wrap.show();
    };

  return {
    show: function (offsetUtc) {
      if (offsetUtc !== undefined) {
        offset = offsetUtc;
      }
      
      updateDate();
      setInterval(updateDate, 1000 * 60);
    }
  };
});

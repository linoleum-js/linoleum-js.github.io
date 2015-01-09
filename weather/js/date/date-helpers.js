define(function () {
  'use strict';
  
  /** couple of functions for date formating */
  return {
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
});
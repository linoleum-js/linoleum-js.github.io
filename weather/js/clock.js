define(function () {
  'use strict';
  
  var $hours = $('.ww-hours'),
    $minutes = $('.ww-minutes'),
    $wrap = $('.ww-time'),

    // offset from UTC. If undefined - using local time
    offset,

    /** @returns {string|number} minutes in MM format */
    minutesHelper = function (minutes) {
      if (minutes < 10) {
        minutes = '0' + minutes;
      }

      return minutes;
    },

    updateTime = function () {
      var date = new Date();
      
      if (offset !== undefined) {
        date.setTime(new Date().getTime() + offset);
      }

      $hours.html(date.getHours());
      $minutes.html(minutesHelper(date.getMinutes()));
      // show only when loaded
      $wrap.show();
    };
  
  return {
    show: function (offsetUtc) {
      if (offsetUtc !== undefined) {
        offset = offsetUtc;
      }
      
      updateTime();
      setInterval(updateTime, 1000 * 60);
    }
  };
});
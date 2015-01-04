define([
  './app'
], function (app) {
  'use strict';
  
  var $root = app.$root,

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

      $root
        .find('.ww-hours')
          .html(date.getHours())
          .end()
        .find('.ww-minutes')
          .html(minutesHelper(date.getMinutes()))
          .end()
        .find('.ww-time') // show only when loaded
          .show();
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
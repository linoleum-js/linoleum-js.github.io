define(function () {
  'use strict';
  
  /**
   * @constructor
   * @param {jQuery} $root
   */
  var Clock = function ($root) {
    this.$root = $root;
    // offset from UTC
    // this.offset;
    
    this.$hours = $root.find('.ww-hours');
    this.$minutes = $root.find('.ww-minutes');
    this.$wrap = $root.find('.ww-time');
  };

  /**
   * @returns {string|number} minutes in MM format
   */
  Clock.prototype.minutesHelper = function (minutes) {
    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    return minutes;
  };
  
  /**
   * update html
   */
  Clock.prototype.updateTime = function () {
    var date = new Date();

    if (this.offset !== undefined) {
      date.setTime(new Date().getTime() + this.offset);
    }

    this.$hours.html(date.getHours());
    this.$minutes.html(this.minutesHelper(date.getMinutes()));
    this.$wrap.show(); // show only when loaded
  };
  
  /**
   * render html and init setInterval
   * @param {number} offset - ms
   */
  Clock.prototype.show = function (offset) {
    if (offset !== undefined) {
      this.offset = offset;
    }

    this.updateTime();
    setInterval($.proxy(this.updateTime, this), 1000 * 60);
  };
  
  return Clock;
});
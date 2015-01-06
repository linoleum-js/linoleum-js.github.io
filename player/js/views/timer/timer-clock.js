define([
  'backbone',
  'underscore',
  'jquery'
], function (Backbone, _, $) {
  'use strict';
  
  /**
   * Displays time in 0:00 format
   * @constructor
   */
  var TimerClock = Backbone.View.extend({
    el: $('.player-time'),
    
    template: _.template([
      '<span><%= minutes %></span>',
      ':',
      '<span><%= seconds %></span>'
    ].join('')),
    
    render: function () {
      var time = this.model.get('time'),
        minutes = Math.floor(time / 60),
        seconds = Math.floor(time % 60);
      
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
  
      this.$el.html(this.template({
        seconds: seconds,
        minutes: minutes
      }));
      
      return this;
    }
  });
  
  return TimerClock;
});
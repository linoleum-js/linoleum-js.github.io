define([
  'backbone',
  './timer-input',
  './timer-clock'
], function (Backbone, Input, Clock) {
  'use strict';
  
  var TimerView = Backbone.View.extend({
    initialize: function () {
      var input = new Input({ model: this.model }),
        clock = new Clock({ model: this.model });
      
      input.render();
      clock.render();
      
      this.listenTo(this.model, 'change:time', function () {
        input.render();
        clock.render();
      });
    }
  });
  
  return TimerView;
});
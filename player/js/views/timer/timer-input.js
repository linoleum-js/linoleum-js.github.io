define([
  'backbone',
  'underscore',
  'jquery'
], function (Backbone, _, $) {
  'use strict';
  
  var TimerInput = Backbone.View.extend({
    events: {
      'change': 'onchange'
    },
    
    el: $('.time-range'),
    
    template: _.template([
      '<input type="range" min="0"',
      'max="<%= duration %>"',
      'step="<%= step %>"',
      'value="<%= time %>">'
    ].join(' ')),
    
    render: function () {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },
    
    onchange: function (e) {
      var time = e.target.value;
      
      this.model.setCurrentTime(time);
    }
  });
  
  return TimerInput;
});
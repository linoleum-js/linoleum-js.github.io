define([
  'backbone',
  'underscore',
  'jquery'
], function (Backbone, _, $) {
  'use strict';
  
  var VolumeView = Backbone.View.extend({
    events: {
      'change input': 'onchange',
      'click span': 'onmute'
    },
    
    el: $('.volume-wrap'),
    
    template: _.template([
      '<span class="mute-1"></span>',
      '<input class="nondrag" type="range"',
      'value="<%= value %>"',
      'max="<%= max %>"',
      'min="<%= min %>"',
      'step="<%= step %>">'
    ].join(' ')),
    
    initialize: function () {
      this.model.on('change:value', function () {
        this.render();
      }, this);
    },
    
    render: function () {
      var value = this.model.get('value'), n;

      this.$el.html(this.template(this.model.attributes));
      
      // set correct icon
      n = (function () {
        // ceil, not floor, because of 0
        var value10 = Math.ceil(value * 10);
        return [0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3][value10];
      }());
      
      this.$el.find('span').removeClass();
      this.$el.find('span').addClass('mute-' + n);
      
      return this;
    },
    
    onchange: function (e) {
      var value = e.target.value;
      
      this.model.set({ value: value });
      this.model.get('node').gain.value = value;
    },
    
    onmute: function () {
      this.model.mute();
    }
  });
  
  return VolumeView;
});
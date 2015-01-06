define([
  'backbone',
  'underscore',
  'jquery'
], function (Backbone, _, $) {
  'use strict';
  
  var PlayerControls = Backbone.View.extend({
    events: {
      'click button': 'onclick'
    },
    
    el: $('.ctrl-buttons'),
    
    template: _.template([
      '<button type="button"',
      'id="<%= id %>"></button>'
    ].join(' ')),
    
    render: function () {
      var ids = ['prev', 'pause', 'play', 'stop', 'next'];
      
      _.each(ids, function (id) {
        this.$el.append(this.template({ id: id }));
      }, this);
      
      return this;
    },
    
    onclick: function (e) {
      var actionName = e.target.id;
      
      // buttons id is the name of the method
      this.model[actionName]();
    }
  });
  
  return PlayerControls;
});
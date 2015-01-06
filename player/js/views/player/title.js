define([
  'backbone',
  'underscore',
  'jquery',
  'js/util/title.js'
], function (Backbone, _, $, movableTitle) {
  'use strict';
  
  var Title = Backbone.View.extend({
    el: $('.title'),
    
    template: _.template('<span class="nondrag"><%= title %></span>'),
    
    initialize: function () {
      this.listenTo(this.model, 'change:title', this.render);
    },
    
    render: function () {
      this.$el.html(this.template({
        title: this.model.get('title')
      }));
      
      movableTitle(this.$el);
      return this;
    }
  });
  
  return Title;
});
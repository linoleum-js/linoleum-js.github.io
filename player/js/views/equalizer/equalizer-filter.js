define([
  'backbone',
  'underscore'
], function (Backbone, _) {
  'use strict';
  
  /**
   * @constructor
   */
  var EqualizerFilterView = Backbone.View.extend({
    events: {
      'change': 'onchange'
    },
    
    className: 'eq-input',
    
    template: _.template([
      '<input class="nondrag" type="range"',
      'value="<%= value %>"',
      'max="<%= max %>"',
      'min="<%= min %>"',
      'step="<%= step %>">',
      '<span><%= formateFrequency %></span>'
    ].join(' ')),
    
    initialize: function () {
      this.listenTo(this.model, 'change:value', this.render);
    },
    
    render: function () {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },
    
    onchange: function (e) {
      var value = e.target.value;
  
      this.model.setValue(value);
    }
  });
  
  return EqualizerFilterView;
});
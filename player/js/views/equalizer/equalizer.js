define([
  'backbone',
  'jquery',
  'underscore',
  './equalizer-filter',
  './equalizer-controls',
  'lib/interface'
], function (Backbone, $, _, EqualizerFilter, EqualizerControls, inter) {
  'use strict';
  
  var EqualizerView = Backbone.View.extend({
    el: $('.equalizer'),
    
    render: function () {
      var filters = this.model.get('filters'),
        controls = new EqualizerControls({ model: this.model });
      
      // add presets list
      this.$el.append(controls.render().el);
      
      this.$el.append('<div class="eq-mark"></div>');
      
      filters.each(function (filter) {
        var view = new EqualizerFilter({ model: filter });
        
        this.$el.append(view.render().el);
      }, this);
      
      inter();
      
      console.log('render');
      
      return this;
    }
  });
  
  return EqualizerView;
});
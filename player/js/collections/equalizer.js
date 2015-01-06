define([
  'backbone',
  'underscore',
  'models/equalizer/equalizer-filter'
], function (Backbone, _, Filter) {
  'use strict';
  
  /**
   * used to track changes
   * @constructor
   */
  var EqualizerCollection = Backbone.Collection.extend({
    model: Filter
  });
  
  return EqualizerCollection;
});
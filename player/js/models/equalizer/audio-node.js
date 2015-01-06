define([
  'backbone'
], function (Backbone) {
  'use strict';
  
  var AudioNode = Backbone.Model.extend({
    /**
     * Connects this input to the destination
     * @param destination {EqualizerFilter}
     */
    connect: function (destination) {
      this.get('node').connect(destination.get('node'));
      return destination;
    }
  });
  
  return AudioNode;
});
define([
  './audio-node',
  'util/audio-context'
], function (AudioNode, context) {
  'use strict';
  
  /**
   * @constructor
   * @param frequency {number}
   */
  var EqualizerFilter = AudioNode.extend({
    defaults: {
      value: 0,
      min: -16,
      max: 16,
      step: 0.1
    },
    
    initialize: function () {
      var filter = this.createFilter(this.get('frequency'));
      
      this.set({ node: filter });
      this.set({ formateFrequency: this.formateFrequency() });
    },
    
    createFilter: function (frequency) {
      var filter = context.createBiquadFilter();
     
      filter.type = 'peaking';
      filter.frequency.value = frequency;
      filter.gain.value = 0;
      filter.Q.value = 2;

      return filter;
    },
    
    formateFrequency: function () {
      var frequency = this.get('frequency');
      
      if (frequency < 1000) {
        return frequency.toString();
      } else {
        return (frequency / 1000) + 'K';
      }
    },
    
    setValue: function (value, options) {
      this.set({ value: value }, options);
      this.get('node').gain.value = value;
    }
  });
  
  return EqualizerFilter;
});
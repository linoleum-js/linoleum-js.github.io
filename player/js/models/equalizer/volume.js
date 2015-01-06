define([
  './audio-node',
  'util/audio-context',
  'views/equalizer/volume'
], function (AudioNode, context, View) {
  'use strict';
  
  var Volume = AudioNode.extend({
    defaults: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.01,
      isMuted: false,
      memValue: 0.5 // same as default
    },
    
    initialize: function () {
      this.createNode();
      this.show();
    },
    
    /**
     * creates and init a gain node
     */
    createNode: function () {
      var node = context.createGain();
      
      node.gain.value = this.get('value');
      this.set({ node: node });
      
      this.on('change:value', function () {
        node.gain.value = this.get('value');
      });
    },
    
    /**
     * do all the view stuff
     */
    show: function () {
      var view = new View({ model: this });
      
      view.render();
    },
    
    mute: function () {
      if (!this.get('value')) {
        // if already muted - restore previous value
        this.set({ value: this.get('memValue') });
      } else {
        this.set({ memValue: this.get('value') });
        this.set({ value: 0 });
      }
    }
  });
  
  // singleton
  return new Volume();
});
define([
  'backbone',
  'jquery',
  'underscore',
  'util/audio-context',
  './equalizer-filter',
  './volume',
  'views/equalizer/equalizer',
  'collections/equalizer',
  './spectrogram'
], function (Backbone, $, _, context, EqualizerFilter, volume, View, Collection, spectrogram) {
  'use strict';
  
  /**
   * @constructor
   */
  var Equalizer = Backbone.Model.extend({
    defaults: {
      presets: {
        flat:       [   0,    0,    0,    0,    0,    0,     0,     0,     0,     0],
        classic:    [   0,    0,    0,    0,    0,    0,  -7.2,  -7.2,  -7.2,  -9.6],
        club:       [   0,    0,    8,  5.6,  5.6,  5.6,   3.2,     0,     0,     0],
        dance:      [ 9.6,  7.2,  2.4,    0,    0,  5.6,   7.2,   7.2,     0,     0],
        bass:       [  -8,  9.6,  9.6,  5.6,  1.6,   -4,    -8, -10.4, -11.2, -11.2],
        treble:     [-9.6, -9.6, -9.6,   -4,  2.4, 11.2,    16,    16,    16,    16],
        headphones: [ 4.8, 11.2,  5.6, -3.2, -2.4,  1.6,   4.8,   9.6,  12.8,  14.4],
        hall:       [10.4, 10.4,  5.6,  5.6,    0, -4.8,  -4.8,  -4.8,     0,     0],
        live:       [-4.8,    0,    4,  5.6,  5.6,  5.6,     4,   2.4,   2.4,   2.4],
        pop:        [-1.6,  4.8,  7.2,    8,  5.6,    0,  -2.4,  -2.4,  -1.6,  -1.6],
        reggae:     [   0,    0,    0, -5.6,    0,  6.4,   6.4,     0,     0,     0],
        rock:       [   8,  4.8, -5.6,   -8, -3.2,    4,   8.8,  11.2,  11.2,  11.2],
        soft:       [ 4.8,  1.6,    0, -2.4,    0,    4,     8,   9.6,  11.2,    12]
      }
    },
    
    initialize: function () {
      this.initAutosave();
      this.initFilters();
      this.show();
      
      if (window.DEBUG) {
        console.log('Equalizer created');
      }
    },
    
    initFilters: function () {
      var frequencies = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000],
        filters = new Collection();
      
      this.addCustomPreset();

      // create filter for each frequency
      frequencies.forEach(function (frequency) {
        filters.add({ frequency: frequency });
      });
      
      // connect each filter to the next one (except the last)
      filters.reduce(function (chain, filter) {
        return chain.connect(filter);
      });
      
      filters.on('change', function () {
        this.trigger('change');
      }, this);
      
      filters.last().connect(spectrogram);
      spectrogram.connect(volume);
      spectrogram.start();
      this.set({ filters: filters });
      this.set({ first: filters.first().get('node') });
      this.set({ last: volume.get('node') });
    },
    
    /**
     * @param audioElement {HTMLMediaElement}
     */
    equalize: function (audioElement) {
      var source = context.createMediaElementSource(audioElement);
      
      source.connect(this.get('first'));
      this.get('last').connect(context.destination);
      
      if (window.DEBUG) {
        console.log('Equalizer connected');
      }
    },
    
    /**
     * @param name {string} name of preset
     */
    usePreset: function (name) {
      var preset = this.get('presets')[name],
        // need to backup custom, because after changing it updates,
        // but this should be avoided
        copyCustom = this.get('presets').custom.slice(0);
      
      
      this.get('filters').forEach(function (filter, i) {
        filter.setValue(preset[i]);
      });
      
      this.get('presets').custom = copyCustom;
        
      if (window.DEBUG) {
        console.log('Equalier.filters has been changed');
      }
    },
    
    /**
     * save custom preset to the localStorage
     */
    initAutosave: function () {
      var self = this;
      
      window.addEventListener('unload', function () {
        var str = self.get('presets').custom.join(',');
        
        window.localStorage['custom-preset'] = str;
        
        if (window.DEBUG) {
          console.log('Custom preset saved');
        }
      }, false);
    },
    
    addCustomPreset: function () {
      // extract from local storage
      var str = window.localStorage['custom-preset'],
        // default values
        preset = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      
      if (str) {
        preset = str.split(',');
      }
      
      this.get('presets').custom = preset;
        
      if (window.DEBUG) {
        console.log('Custom preset loaded from localStorage');
      }
    },
    
    updateCustomPreset: function () {
      var newCustom = this.get('filters').map(function (item) {
        return item.get('value');
      });
      
      this.get('presets').custom = newCustom;
    },
      
    show: function () {
      var view = new View({ model: this });
      
      view = new View({ model: this });
      view.render();
    }
  });
  
  return new Equalizer();
});
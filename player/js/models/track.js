define([
  'backbone',
  'jquery',
  'equalizer',
  'timer'
], function (Backbone, $, equalizer, timer) {
  'use strict';
  
  /**
   * @constructor
   */
  var Track = Backbone.Model.extend({
    defaults: {
      onPause: false,
      title: 'Unknown artist - No title'
    },
    
    /**
     * @param param {string} url or objectURL
     */
    initialize: function (param) {
      var url = param.url,
        file = param.file;
      
      if (typeof url !== 'string') {
        throw new TypeError('Track: invalid url ' + url);
      }
      
      // check if it's objectURL
      if (url.indexOf('blob:') === 0) {
        this.extractMetaData(file);
      }
      
      this.set({ url: param.url });
    },
    
    extractMetaData: function (file) {
      
    },
    
    /**
     * @param time {number} start time
     */
    play: function () {
      var self = this,
        audio,
        source;
      
      // lazy creating
      if (!this.get('audio')) {
        audio = new Audio();
        audio.src = this.get('url');
        audio.addEventListener('canplay', function () {
          console.log('CANPLAY');
          audio.play();
        }, false);
        
        equalizer.equalize(audio);
        
        this.set({ audio: audio });
      } else {
        audio = this.get('audio');
      }
      
      timer.bind(audio);
      timer.start();
      this.get('audio').play(timer.getCurrentTime());
    },
    
    pause: function () {
      this.get('audio').pause();
      timer.pause();
    },
    
    stop: function () {
      this.get('audio').pause();
      timer.stop();
    },
    
    setCurrentTime: function (time) {
      timer.setCurrentTime(time);
    },
    
    onended: function (callback) {
      timer.onended(callback);
    }
  });
  
  return Track;
});
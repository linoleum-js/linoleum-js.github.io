define([
  'backbone',
  'views/timer/timer'
], function (Backbone, View) {
  'use strict';
  
  /**
   * @constructor
   */
  var STOPPED = 0,
    PAUSED = 1,
    RUNNING = 2,
      
    Timer = Backbone.Model.extend({
      defaults: {
        /**
         * Time in seconds (used as input value)
         * @type {number}
         */
        time: 0,
        /**
         * setInterval id
         * @type {number}
         */
        cycle: null,
        /** @type {number} */
        duration: 0,
        step: 1,
        state: STOPPED,
        // no-op by default
        onendedCallback: function () {}
      },

      initialize: function () {
        this.show();
      },

      show: function () {
        var view = new View({ model: this });

        view.render();
      },

      /**
       * bind timer to the audio element
       * @param audio {HTMLMediaElement}
       */
      bind: function (audio) {
        var self = this;

        this.set({ audio: audio });

        audio.addEventListener('canplay', function () {
          // before this event has fired - duration has wornd value
          self.set({ duration: audio.duration });
        }, false);
      },
      
      /**
       * is called in setInterval
       */
      update: function () {
        // update value
        this.set({
          time: this.get('audio').currentTime
        });
        
        if (this.ended()) {
          this.stop();
          this.get('onendedCallback')();
        }
      },

      /**
       */
      start: function () {
        if (!this.get('audio')) {
          throw new TypeError('Timer: bind audio before start');
        }
        // already running
        if (this.get('state') === RUNNING) {
          return;
        }
        
        // if its stopped or just created - start from 0sec
        if (this.get('state') === STOPPED) {
          this.set({ time: 0 });
        }
        // but if its just paused - use current time

        this.set({
          cycle: setInterval(this.update.bind(this), 1000)
        });
        
        this.set({ state: RUNNING });
      },

      stop: function () {
        this.pause();
        this.set({ time: 0 });
        if (this.get('audio').readyState) {
          this.get('audio').currentTime = 0;
        }
        // necessry to do it after pause() (to ovewrite)
        this.set({ state: STOPPED });
      },

      pause: function () {
        clearInterval(this.get('cycle'));
        this.set({ cycle: null });
        this.set({ state: PAUSED });
      },

      setCurrentTime: function (time) {
        this.set({ time: time });
        this.get('audio').currentTime = time;
      },

      getCurrentTime: function () {
        return this.get('time');
      },

      /**
       * @returns true if song is ended, false otherwise
       */
      ended: function () {
        return this.get('time') >= this.get('duration');
      },
      
      /**
       * set callback to be called on the end
       * @param callback {function}
       */
      onended: function (callback) {
        this.set({ onendedCallback: callback });
      }
    });
  
  return new Timer();
});
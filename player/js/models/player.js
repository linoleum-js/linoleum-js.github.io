define([
  'backbone',
  'collections/playlist',
  'views/player/player',
  'timer',
  'models/soundcloud/soundcloud'
], function (Backbone, Playlist, View, timer, soundcloud) {
  'use strict';
  
  /**
   * @constructor
   */
  var Player = Backbone.Model.extend({
    defaults: function () {
      return {
        isPlaying: false,
        title: '—'
      };
    },
    
    initialize: function (attributes, options) {
      var self = this;
      
      this.show();
      this.set({ playlist: new Playlist() });
      
      this.get('playlist').onchangecurrent(function () {
        self.stop();
        self.play();
      }).onpause(function () {
        // click on the same track in playlist
        self.togglePause();
      }).onremove(function (url) {
        soundcloud.unadd(url);
      });
      
      soundcloud.onadd(function (url, title) {
        if (window.DEBUG) {
          console.log('onselect');
        }
        
        self.get('playlist').addByUrl(url, title);
      }).onplay(function (track) {
        self.stop();
        self.set({ current: track });
        
        self.get('current').play();
        self.set({ title: self.get('current').get('title') });

        self.get('current').onended(function () {
          self.stop();
        });

        self.set({ isPlaying: true });
      }).onpause(function () {
        self.togglePause();
      });
    },
    
    show: function () {
      var view = new View({ model: this });
      view.render();
    },
  
    play: function () {
      if (window.DEBUG) {
        console.log('play');
      }
      
      // if already playing - pause
      if (this.get('isPlaying')) {
        this.pause();
        return;
      }

      if (this.get('playlist').isEmpty()) {
        return;
      }
      
      var self = this;
      
      this.set({ current: this.get('playlist').getCurrent() });
      this.set({ title: this.get('current').get('title') });
      this.get('current').play();
      
      this.get('current').onended(function () {
        self.next();
      });
      
      this.set({ isPlaying: true });
    },
    
    pause: function () {
      this.get('current').pause();
      this.set({ isPlaying: false });
    },
    
    togglePause: function () {
      if (this.get('isPlaying')) {
        this.pause();
      } else {
        this.get('current').play();
        this.set({ isPlaying: true });
      }
    },
    
    stop: function () {
      if (!this.get('isPlaying')) {
        return;
      }
      
      this.get('current').stop();
      this.set({ isPlaying: false });
      this.set({ title: '-' });
    },
    
    next: function () {
      this.stop();
      this.get('playlist').next();
      this.play();
    },
    
    prev: function () {
      this.stop();
      this.get('playlist').prev();
      this.play();
    }
  });
  
  return Player;
});
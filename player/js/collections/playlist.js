define([
  'backbone',
  'underscore',
  '../models/track',
  'views/playlist/playlist',
  'lib/soundcloud-sdk',
  'util/config'
], function (Backbone, _, Track, View, SC, config) {
  'use strict';
  
  var Playlist = Backbone.Collection.extend({
    model: Track,
    
    initialize: function () {
      /**
       * number of current track
       * @type {number}
       */
      this.current = -1;
      // no op by default
      this.changeCurrentCallback = function () {};
      this.pauseCallback = function () {};
      this.removeCallback = function () {};
  
      SC.initialize({
        client_id: '39d080319e12c3ec2d1a857ba6ca6cae'
      });
  
      this.on('add', function () {
        if (this.current === -1) {
          this.current = 0;
        }
      });
      
      this.on('remove', function (param) {
        if (this.current > param.index) {
          this.current--;
        }
        
        // chech bounds
        if (this.current === -1 && !this.isEmpty()) {
          this.current = 0;
        }
        
        this.removeCallback();
        
        console.log('size ' + this.size);
      });
      
      this.show();
    },
    
    show: function () {
      var view = new View({ model: this });
      
      view.render();
    },
    
    /**
     * add song(s) from soundcloud by its ids
     * @param ids {number|[number]}
     */
    addById: function (ids) {
      // single track
      if (typeof ids === 'number') {
        this.addSingleById(ids);
        return;
      }
      
      // array of ids
      _.each(ids, function (id) {
        this.addSingleById(id);
      }, this);
    },
    
    /**
     * add single song
     * @param id {number}
     */
    addSingleById: function (id) {
      var self = this;

      // to play song only a url required,
      // but we need to get title, so..
      SC.get('/tracks/' + id, function (track) {
        self.add({
          url: track.stream_url + '?client_id=' + config.client_id,
          title: track.title
        });
      });
    },
    
    addByUrl: function (url, title) {
      this.add({
        url: url,
        title: title
      });
    },
    
    /**
     * @param newCurrent {Track|number}
     */
    setCurrent: function (newCurrent) {
      if (typeof Track === 'object') {
        this.current = this.indexOf(newCurrent);
      } else {
        this.current = newCurrent;
        this.changeCurrentCallback();
      }
    },
    
    getCurrent: function () {
      this.upd();
      return this.at(this.current);
    },
    
    isCurrent: function (track) {
      return this.getCurrent().url === track.url;
    },
    
    isEmpty: function () {
      return this.size() === 0;
    },
    
    next: function () {
      this.current = (this.current + 1) % this.size();
      this.upd();
    },
    
    prev: function () {
      this.current--;
      if (this.current < 0) {
        this.current = this.size() - 1;
      }
      this.upd();
    },
    
    upd: function () {
      $('.playlist-item').removeClass('current');
      $('#list .playlist-item').eq(this.current).addClass('current');
    },
    
    pause: function () {
      this.pauseCallback();
    },
    
    onchangecurrent: function (callback) {
      this.changeCurrentCallback = callback;
      
      return this;
    },
    
    onpause: function (callback) {
      this.pauseCallback = callback;
      
      return this;
    },
    
    onremove: function (callback) {
      this.removeCallback = callback;
      
      return this;
    }
    
  });
  
  return Playlist;
});
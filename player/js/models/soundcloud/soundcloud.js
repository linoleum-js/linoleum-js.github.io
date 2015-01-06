define([
  'backbone',
  'soundcloud-sdk',
  'views/soundcloud/soundcloud-search',
  'views/soundcloud/soundcloud',
  'models/track',
  'util/config'
], function (Backbone, SC, SearchView, View, Track, config) {
  'use strict';
  
  var SoundCloud = Backbone.Collection.extend({
    model: Track,
    
    initialize: function () {
      this.searchView = new SearchView({ model: this });
      this.view = new View({ model: this });
      
      // no op by default
      this.onAddCallback = function () {};
      this.onPlayCallback = function () {};
      this.onPauseCallback = function () {};
    },
    
    onadd: function (callback) {
      this.onAddCallback = callback;
      
      return this;
    },
    
    onplay: function (callback) {
      this.onPlayCallback = callback;
      
      return this;
    },
    
    onpause: function (callback) {
      this.onPauseCallback = callback;
      
      return this;
    },
    
    runSearch: function (query) {
      if (window.DEBUG) {
        console.log('search query: ' + query);
      }
      
      var self = this;
      
      this.reset();
      
      SC.get('/tracks', { q: query, limit: 100 }, function (tracks) {
        tracks.forEach(function (track) {
          // some track can't be stream
          if (!track.stream_url) {
            return;
          }
          
          console.log(track);
        
          self.add({
            url: track.stream_url + '?client_id=' + config.client_id,
            title: track.title
          });
        });
      });
      
      this.view.render();
    },
    
    unadd: function (url) {
      this.each(function (item) {
        
      }, this);
    }
  });
  
  return new SoundCloud();
});
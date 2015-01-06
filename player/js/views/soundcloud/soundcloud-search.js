define([
  'backbone',
  'jquery'
], function (Backbone, $) {
  'use strict';
  
  var SoundCloudSearch = Backbone.View.extend({
    events: {
      'click #sc-button': 'onclick',
      'keypress': 'onkeypress'
    },
    
    el: $('.playlist-top-2'),
    
    initialize: function () {
      this.input = $('#sc-input');
    },
    
    
    onclick: function () {
      this.model.runSearch(this.input.html());
    },
    
    onkeypress: function (e) {
      if (e.keyCode === 13) {
        this.model.runSearch(this.input.html());
        return false;
      }
    }
  });
  
  return SoundCloudSearch;
});
define([
  'backbone',
  'jquery',
  'underscore',
  '../playlist/playlist'
], function (Backbone, $, _, PlaylistView) {
  'use strict';
  
  var View = PlaylistView.extend({
    events: {
      'click span': 'onclick',
      'click em': 'onadd'
    },
    
    el: $('#sc'),
    
    /**
     * @override
     */
    initialize: function () {
      this.listenTo(this.model, 'add', this.append);
      this.listenTo(this.model, 'remove', this.remove);
    },
    
    onclick: function (e) {
      var index = $(e.target.parentNode).index();
      
      if ($(e.target.parentNode).hasClass('current')) {
        this.model.onPauseCallback();
        return;
      }
      
      this.model.onPlayCallback(this.model.at(index));
      
      $('.playlist-item').removeClass('current');
      $('#sc .playlist-item').eq(index).addClass('current');
    },
    
    onadd: function (e) {
      var li = $(e.target.parentNode),
        index = li.index(),
        item = this.model.at(index);
      
      this.model.onAddCallback(item.get('url'), item.get('title'));
      
      li.addClass('sc-added');
    }
  });
  
  return View;
});
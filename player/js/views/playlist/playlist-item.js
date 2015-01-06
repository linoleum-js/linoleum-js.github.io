define([
  'backbone',
  'underscore'
], function (Backbone, _) {
  'use strict';
  
  var PlaylistItemView = Backbone.View.extend({
    events: {
      'click': 'onclick'
    },
    
    tagName: 'li',
    className: 'playlist-item',
    
    template: _.template([
      '<span><%= title %></span>',
      '<em class="playlist-action">×</em>'
    ].join(' ')),
    
    initialize: function () {
      if (window.DEBUG) {
        console.log('Playlist item rendered');
      }
    },
    
    render: function () {
      this.$el.html(this.template(this.model.attributes));
      
      return this;
    }
  });
  
  return PlaylistItemView;
});
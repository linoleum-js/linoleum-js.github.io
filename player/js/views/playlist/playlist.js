define([
  'backbone',
  'jquery',
  './playlist-item'
], function (Backbone, $, ItemView) {
  'use strict';
  
  /**
   * View for playlist collection
   */
  var PlaylistView = Backbone.View.extend({
    events: {
      'click .playlist-action': 'onremove',
      'click span': 'onclick'
    },
    
    el: $('#list'),
    
    initialize: function () {
      var self = this;
      
      this.listenTo(this.model, 'add', this.append);
      this.listenTo(this.model, 'remove', this.remove);
      
      $('.file-input').on('change', function (e) {
        var files = [].slice.call(e.target.files, 0);
        
        files.forEach(function (file) {
          var url = URL.createObjectURL(file);
          
          self.model.add({
            url: url,
            title: file.name
          });
        });
      });
    },
    
    append: function (e) {
      var itemView = new ItemView({ model: e });
      this.$el.append(itemView.render().el);
    },
    
    remove: function (e) {
      
    },

    render: function (e) {
      this.$el.html('');

      this.model.each(function (item) {
        var itemView = new ItemView({ model: item });
        
        this.$el.append(itemView.render().el);
      }, this);
      
      if (window.DEBUG) {
        console.log('Playlist rendered. ' + this.model.size() + ' elements.');
      }
    },
    
    /**
     * play target track
     */
    onclick: function (e) {
      if (window.DEBUG) {
        console.log('Playlist click');
      }
      
      if ($(e.target.parentNode).hasClass('current')) {
        this.model.pause();
        return;
      }
      
      var index = $(e.target.parentNode).index();
      
      this.model.setCurrent(index);
      $('.playlist-item').removeClass('current');
      $('#list .playlist-item').eq(index).addClass('current');
    },
    
    /**
     * remove target track
     */
    onremove: function (e) {
      if (window.DEBUG) {
        console.log('Playlist remove');
      }
      
      var index = $(e.target.parentNode).index();
      this.model.remove(this.model.at(index));
      
      $(e.target.parentNode).remove();
      
      // cancel event
      event.preventDefault();
      event.stopPropagation();
      event.cancelBubble = true;
      return false;
    }
  });
  
  return PlaylistView;
});
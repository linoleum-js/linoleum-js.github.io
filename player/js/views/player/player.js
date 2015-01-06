define([
  'backbone',
  'jquery',
  './player-controls',
  './title'
], function (Backbone, $, PlayerControls, Title) {
  'use strict';
  
  var PlayerView = Backbone.View.extend({
    el: $('.player-wrap'),
    
    initialize: function () {
      var controls = new PlayerControls({ model: this.model }),
        title = new Title({ model: this.model });
      
      controls.render();
      title.render();
    }
  });
  
  return PlayerView;
});
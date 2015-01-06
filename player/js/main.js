require.config({
  paths: {
    'jquery': 'lib/jquery',
    'underscore': 'lib/underscore',
    'backbone': 'lib/backbone',
    
    'soundcloud-sdk': './lib/soundcloud-sdk'
  },
  
  packages: [{
    name: 'equalizer',
    main: 'equalizer',
    location: './models/equalizer'
  }, {
    name: 'timer',
    main: 'timer',
    location: './models'
  }]
});

// app name - linoleum-player-js
// client_id 39d080319e12c3ec2d1a857ba6ca6cae
// client secret 1665b0f456eb1ed5fceb89246b71e72b

require([
  'backbone',
  'jquery',
  'soundcloud-sdk',
  'models/player'
], function (Backbone, $, SC, Player) {
  'use strict';
  
  var id = '39d080319e12c3ec2d1a857ba6ca6cae',
    player = new Player();
  
  
//  SC.get("/tracks", {limit: 1}, function (tracks) {
//    var track = tracks[0],
//      url = track.stream_url + '?client_id=' + id;
//    
//    $('#audio').attr('src', url);
//  });
  
  player.get('playlist').addById([
    3183538,
    57645202,
    84613545
  ]);
  
//  player.get('playlist').add({ url: 'http://localhost/new-player/src/asset/sound/track.mp3'});
});
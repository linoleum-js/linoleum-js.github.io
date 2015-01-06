define([
  'jquery',
  'lib/jquery-ui.min'
], function ($) {
  'use strict';
  
  var width = window.innerWidth,
    height = window.innerHeight;
  
  // tabs
  (function () {
    var tabs = $('.playlist-tab'),
      tops = $('.playlist-top'),
      ins = $('.playlist-inner');

    tabs.on('click', function () {
      var $this = $(this),
        index = $this.index();

      if (!$this.hasClass('active')) {
        tabs.removeClass('active')
          .eq(index).addClass('active');

        tops.removeClass('active')
          .eq(index).addClass('active');

        ins.removeClass('active')
          .eq(index).addClass('active');
      }
    });
  }());
  
  // blocks
  (function () {
    var eqBtn = $('#eq'),
      plBtn = $('#pl'),
      
      eq = $('.equalizer'),
      pl = $('.playlist');
    
    eqBtn.on('click', function () {
      eqBtn.toggleClass('on');
      eq.fadeToggle(0);
    });
    
    plBtn.on('click', function () {
      plBtn.toggleClass('on');
      pl.fadeToggle(0);
    });
  }());
  
  return function () {
    var wrap = $('.player-wrap');
    
    wrap.draggable({
      scroll: false,
      cancel: '.nondrag'
    });
  };
});
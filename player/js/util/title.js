define([
  'jquery'
], function ($) {
  'use strict';
  
  var movableTitle = function (element) {
    var child = element.children().eq(0),
      outerWidth = element.width(),
      innerWidth = child.width(),
      diff = outerWidth - innerWidth,
      duration = 2000,
      pause = 6000,
      totalDuration = duration * 2 + pause,
        
      animate = function () {
        child.animate({
          left: diff
        }, duration, 'linear');

        setTimeout(function () {
          child.animate({
            left: 0
          }, duration);
        }, duration, 'linear');
      };
    
    if (diff >= 0) {
      return;
    }
    
    animate();
    setInterval(animate, totalDuration);
  };
  
  return movableTitle;
});
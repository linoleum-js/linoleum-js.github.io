define([
  './translate',
  './app'
], function (translate, app) {
  'use strict';

  var $root = app.$root,

    // for pub/sub
    onchangeCallbacks = [],
      
    previousValue = '';
  
  // blur on 'missclick'
  $root.on('click', '.ww-wrap', function () {
    $root.find('.ww-city').blur();
  });
  
  $root
    .on('focus', '.ww-city', function () {
      // stretch element for convenience
      $(this).attr('size', 0);
      previousValue = $(this).val();
    })
  
    // avoid blur on click on city field
    .on('click', '.ww-city', function (e) {
      e.stopPropagation();
    })
  
    // avoid blur on empty city field
    .on('blur', '.ww-city', function () {
      var value = $(this).val();
    
      // empty field
      if (!value) {
        // mozilla hack
        // http://stackoverflow.com/a/7046837
        setTimeout(function () {
          $(this).focus();
        }, 0);
      }
      // keep correct length (restore after stretch)
      $(this).attr('size', value.length);
    })
  
    .on('keypress', '.ww-city', function (e) {
      if (e.keyCode === 13) {
        $(this).blur();
      }
    })
  
    .on('change', '.ww-city', function () {
      var value = $(this).val();
    
      // blur on empty field
      if (!value) {
        // try to restore
        if (previousValue) {
          $(this).val(previousValue);
        }
        return;
      }
      
      onchangeCallbacks.forEach(function (item) {
        item(value);
      });
      
      // keep correct length 
      $(this).attr('size', value.length);
    });
  
  return {
    show: function (city) {
      $root.find('.ww-city')
        .val(city)
        // keep correct length 
        .attr('size', city.length);
    },
    
    // simple pub/sub
    onchange: function (callback) {
      onchangeCallbacks.push(callback);
    },
    
    inviteUserEntry: function () {
      $root
        .find('.ww-weather')
          .html('Geolocation failed.')
          .addClass('error')
          .end()
        .find('.ww-city')
          .focus()
          .attr('placeholder', 'enter your city');
    }
  };
});
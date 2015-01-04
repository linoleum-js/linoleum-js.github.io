define(function () {
  'use strict';

  var $city = $('.ww-city'),
    $wrap = $('.ww-wrap'),
    // used as error log
    $weather = $('.ww-weather'),
      
    // for pub/sub
    onchangeCallbacks = [],
      
    previousValue = '';
  
  // blur on 'missclick'
  $wrap.on('click', function () {
    $city.blur();
  });
  
  $city
    .on('focus', function () {
      // stretch element for convenience
      $city.attr('size', 0);
      previousValue = $city.val();
    })
    // avoid blur on click on city field
    .on('click', function (e) {
      e.stopPropagation();
    })
    // avoid blur on empty city field
    .on('blur', function () {
      var value = $city.val();
    
      // empty field
      if (!value) {
        // mozilla hack
        // http://stackoverflow.com/a/7046837
        setTimeout(function () {
          $city.focus();
        }, 0);
      }
      // keep correct length (restore after stretch)
      $city.attr('size', value.length);
    })
    .on('keypress', function (e) {
      if (e.keyCode === 13) {
        $city.blur();
      }
    })
    .on('change', function () {
      var value = $city.val();
    
      // blur on empty field
      if (!value) {
        // try to restore
        if (previousValue) {
          $city.val(previousValue);
        }
        return;
      }
    
      onchangeCallbacks.forEach(function (item) {
        item(value);
      });
      
      // keep correct length 
      $city.attr('size', value.length);
    });
  
  return {
    show: function (city) {
      $city.val(city);
      // keep correct length 
      $city.attr('size', city.length);
    },
    
    // simple pub/sub
    onchange: function (callback) {
      onchangeCallbacks.push(callback);
    },
    
    inviteUserEntry: function () {
      $weather
        .html('Geolocation failed.')
        .addClass('error');
      
      $city
        .focus()
        .attr('placeholder', 'enter your city');
    }
  };
});
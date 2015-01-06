define(function () {
  'use strict';

  /**
   * @constructor
   * @param {jQuery} $root
   */
  var City = function ($root) {
    this.$root = $root;
    // for pub/sub
    this.onchangeCallbacks = [];

    this.previousValue = '';
    
    this.$city = $root.find('.ww-city');
    this.$weather = $root.find('.ww-weather');
    
    this.initListners();
  };
  
  /**
   * bind all the events
   */
  City.prototype.initListners = function () {
    var self = this;
    
    // blur on 'missclick'
    self.$root.on('click', function () {
      self.$city.blur();
    });

    self.$city
      .on('focus', function () {
        // stretch element for convenience
        $(this).attr('size', 0);
        self.previousValue = $(this).val();
      })

      // avoid blur on click on city field
      .on('click', function (e) {
        e.stopPropagation();
      })

      // avoid blur on empty city field
      .on('blur', function () {
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

      .on('keypress', function (e) {
        if (e.keyCode === 13) {
          $(this).blur();
        }
      })

      .on('change', function () {
        var value = $(this).val();

        // blur on empty field
        if (!value) {
          // try to restore
          if (self.previousValue) {
            $(this).val(self.previousValue);
          }
          return;
        }

        self.onchangeCallbacks.forEach(function (item) {
          item(value);
        });

        // keep correct length 
        $(this).attr('size', value.length);
      });
  };
  
  /**
   * render html
   * @param {string} city
   */
  City.prototype.show = function (city) {
    this.$city
      .val(city)
      // keep correct length 
      .attr('size', city.length);
  };
    
  /**
   * simple pub/sub
   * @param {function} callback
   */
  City.prototype.onchange = function (callback) {
    this.onchangeCallbacks.push(callback);
  };
  
  /**
   * show error message and invite user
   */
  City.prototype.inviteUserEntry = function () {
    this.$weather
      .html('Geolocation failed.')
      .addClass('error');
    
    this.$city
      .focus()
      .attr('placeholder', 'enter your city');
  };
  
  return City;
});
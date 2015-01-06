define([
  'backbone',
  'underscore'
], function (Backbone, _) {
  'use strict';
  
  var EqualizerControls = Backbone.View.extend({
    className: 'equalizer-controls',
    
    events: {
      'click .eq-reset': 'onreset',
      'change select': 'onchange'
    },
    
    template: _.template([
      '<button class="eq-reset">reset</button>',
      '<select class="nondrag" name="selects">',
      '<% _.each(_.keys(presets), function (name) { %>',
      '<option data-name=<%= name %>>',
      '<%= name %> </option>',
      '<% }) %>',
      '</select>',
      '<label for="selects">▼</label>'
    ].join(' ')),
    
    initialize: function () {
      // if we change values by javascript (i.e. using usePreset)
      // we need to update view
      // also, if user change single filter value - change to custom preset
      this.listenTo(this.model.get('filters'), 'change', function () {
        this.model.updateCustomPreset();
        this.usePreset('custom');
      });
    },
    
    render: function () {
      this.$el.html(this.template(this.model.attributes));
      
      return this;
    },
    
    usePreset: function (name) {
      this.model.usePreset(name);
      this.setSelected(name);
    },
    
    /**
     * mark option in select tag as current active
     * @param name {string} data-name attribute
     */
    setSelected: function (name) {
      this.optionsList = this.optionsList || this.$el.find('option');
      
      this.optionsList.removeAttr('selected')
        .filter('[data-name="' + name + '"]').attr('selected', 'selected');
    },
    
    onreset: function () {
      this.usePreset('flat');
    },
    
    onchange: function (e) {
      // inner text of option tag is exactly name of preset
      var name = e.target.value;
      
      this.usePreset(name);
      
      if (window.DEBUG) {
        console.log('preset changed to "' + name + '"');
      }
    }
  });
  
  return EqualizerControls;
});
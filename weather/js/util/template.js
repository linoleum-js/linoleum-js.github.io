define(function () {
  'use strict';
  
  return [
    '<button class="ww-reload nondrag" title="reload">⟲</button>',
    '<div class="ww-time">',
    '  <span class="ww-hours"></span>',
    '  <span class="ww-colon">:</span>',
    '  <span class="ww-minutes"></span>',
    '</div>',
    '<div class="ww-date">',
    '  <span class="ww-date-inner"></span>',
    '</div>',
    '<div class="ww-icon"></div>',
    '<div class="ww-weather ww-nondrag"></div>',
    '<div>',
    '  <input type="text" class="ww-city ww-nondrag" value="" size="0">',
    '</div>'
  ].join('\n');
});
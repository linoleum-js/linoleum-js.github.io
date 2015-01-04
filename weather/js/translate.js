define(function () {
  'use strict';
  
  return function (text, callback, lang) {
    lang = lang || 'en';
    
    var url = [
      'https://translate.yandex.net/api/v1.5/tr.json/translate?',
      'key=trnsl.1.1.20150104T044957Z.fd5552e3a68cb11e.639faacb4dd0d0fdcf3ef4bc50501b950e23d1f8',
      '&text=' + text,
      '&lang=' + lang
    ].join('');
    
    $.getJSON(url, function (data) {
      var sourceLang = data.lang.split('-')[0];
      
      callback(data.text[0], sourceLang);
    });
  };
});
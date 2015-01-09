define([
  './lang-data'
], function (langData) {
  'use strict';
  
  var
    /** @returns true, if text is a date-string */
    isDate = function (text) {
      var
        dateFormat = /^\s*\w+\s*,\s+\d{1,2}\s+\w+\s+\d{4}\s*$/g;
      
      return text.match(dateFormat);
    },
    
    /** @returns {array} */
    getChunks = function (date) {
      return date.split(/ /g).filter(function (chunk) {
        return chunk;
      });
    },
      
    /** @returns true, if we can translate specified date */
    canTranslateDate = function (date, lang) {
      var chunks = getChunks(date);
      
      if (!langData[lang]) {
        return false;
      }
      
      return chunks.every(function (chunk) {
        return !isNaN(chunk) || langData[lang][chunk];
      });
    },
    
    translateDate = function (date, lang) {
      var
        chunks = getChunks(date);
      
      return chunks.map(function (chunk) {
        var
          result;
        
        if (!isNaN(chunk)) {
          result = chunk;
        } else {
          result = langData[lang][chunk];
        }
        
        return result;
      }, '').join(' ');
    };
  
  /**
   * translate a chunk of text
   * @param {string} text
   * @param {function} callback
   * @param {string=} [en] lang - target language
   */
  return function (text, callback, lang) {
    lang = lang || 'en';
    
    var
      url = [
        'https://translate.yandex.net/api/v1.5/tr.json/translate?',
        'key=trnsl.1.1.20150104T044957Z.fd5552e3a68cb11e.639faacb4dd0d0fdcf3ef4bc50501b950e23d1f8',
        '&text=',
        text,
        '&lang=',
        lang
      ].join('');
    
    $.getJSON(url, function (data) {
      var
        sourceLang = data.lang.split('-')[0],
        result = data.text[0];
      
      if (isDate(text) && canTranslateDate(text, lang)) {
        result = translateDate(text, lang);
      }
      
      callback(result, sourceLang);
    });
  };
});
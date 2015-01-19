define([
  './audio-node',
  'util/audio-context'
], function (AudioNode, context) {
  'use strict';
  var analyser = context.createAnalyser(),
    Spectrogram = AudioNode.extend({
      initialize: function () {
        analyser.fftSize = 1024;
        
        this.set({ node: analyser });
      },

      start: function () {
        var frequencyData = new Uint8Array(analyser.frequencyBinCount),
          canvas = document.getElementById('spectr'),
          ctx = canvas.getContext('2d'),
          width = window.innerWidth,
          height = window.innerHeight,
          
          barWidth = (width / frequencyData.length) * 1.5,
          gradient = ctx.createLinearGradient(0, 0, 0, height);
        
        window.addEventListener('resize', function () {
          width = window.innerWidth;
          height = window.innerHeight;
          canvas.width = width;
          canvas.height = height;
        });
        
        gradient.addColorStop(1, '#5c6976');
        gradient.addColorStop(0, '#ddd');
        
        canvas.width = width;
        canvas.height = height;

        setInterval(function renderFrame() {
          var n = frequencyData.length,
            i,
            h;
          
          analyser.getByteFrequencyData(frequencyData);
          ctx.fillStyle = '#ddd';
          ctx.fillRect(0, 0, width, height);
          ctx.fillStyle = gradient;
          
          for (i = 0; i < n; i++) {
            h = frequencyData[i] / 300 * height;
            ctx.fillRect(i * barWidth, height - h, barWidth + 1, h);
          }
        }, 50);
      }


    });
  
  return new Spectrogram();
});
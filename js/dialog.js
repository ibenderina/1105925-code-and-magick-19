'use strict';

(function () {
  var dialog = document.querySelector('.upload');
  var setupEl = document.querySelector('.setup');
  var mouseTrigger = false;

  dialog.addEventListener('mousedown', function (evt) {
    mouseTrigger = true;
  });

  setupEl.addEventListener('mousemove', function (evt) {
    if (mouseTrigger) {
      setupEl.style.left = evt.x + 360 + 'px';
      setupEl.style.top = evt.y - 30 + 'px';
    }
  });

  window.addEventListener('mouseup', function (evt) {
    mouseTrigger = false;
  });
})();

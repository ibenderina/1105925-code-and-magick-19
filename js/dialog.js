'use strict';

(function () {
  var dialog = document.querySelector('.upload');

  dialog.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseTrigger = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      mouseTrigger = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.setupEl.style.top = (window.setupEl.offsetTop - shift.y) + 'px';
      window.setupEl.style.left = (window.setupEl.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (mouseTrigger) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialog.removeEventListener('click', onClickPreventDefault);
        };
        dialog.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

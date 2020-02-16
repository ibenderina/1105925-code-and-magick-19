'use strict';

(function () {
  var MAX_HEIGHT = 150;
  var WIDTH_OF_BLOCK = 40;
  var SPACING = 50;
  var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
  var FIELD_COLOR = '#fff';
  var FONT_STYLE = '16px PT Mono';
  var FONT_COLOR = '#444444';
  var WIN_TEXT = 'Ура вы победили!';
  var RESULT_TEXT = 'Список результатов:';
  var MAIN_NAME = 'Вы';
  var MAIN_BLOCK_COLOR = 'rgba(255, 0, 0, 1)';

  window.renderStatistics = function (ctx, names, times) {
    var maxCount = getMaxNumber(times);

    ctx.fillStyle = SHADOW_COLOR;
    ctx.fillRect(110, 20, 420, 270);
    ctx.fillStyle = FIELD_COLOR;
    ctx.fillRect(100, 10, 420, 270);
    ctx.strokeText = FONT_STYLE;
    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(WIN_TEXT, 130, 40);
    ctx.fillText(RESULT_TEXT, 130, 60);

    for (var j = 0; j < names.length; j++) {
      var theirColor = randomColor();
      var ratio = times[j] / maxCount;
      var currentName = names[j];
      var currentTime = times[j];
      var y = MAX_HEIGHT - ratio * MAX_HEIGHT;
      var x = 150 + (WIDTH_OF_BLOCK + SPACING) * j;

      if (currentName === MAIN_NAME) {
        ctx.fillStyle = MAIN_BLOCK_COLOR;
      } else {
        ctx.fillStyle = theirColor;
      }

      ctx.fillRect(x, y + 95, WIDTH_OF_BLOCK, ratio * MAX_HEIGHT);
      ctx.fillStyle = FONT_COLOR;
      ctx.fillText(currentName, x, 265);
      ctx.fillText(Math.floor(currentTime).toString(), x, y + 85);
    }
  };

  function getMaxNumber(numbersArray) {
    var maxCount = numbersArray[0];
    for (var i = 0; i < numbersArray.length; i++) {
      if (maxCount < numbersArray[i]) {
        maxCount = numbersArray[i];
      }
    }
    return maxCount;
  }

  function randomColor() {
    var saturation = Math.random() * 100;
    return 'hsl(220, ' + saturation + '%, 60%)';
  }
}());



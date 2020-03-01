'use strict';

(function () {
  var FONT_STYLE = '16px PT Mono';
  var MAIN_NAME = 'Вы';

  var Size = {
    MAX_HEIGHT: 150,
    WIDTH_OF_BLOCK: 40,
    SPACING: 50
  };

  var Color = {
    SHADOW: 'rgba(0, 0, 0, 0.7)',
    FIELD: '#fff',
    FONT: '#444444',
    MAIN_BLOCK: 'rgba(255, 0, 0, 1)'
  };

  var Text = {
    WIN: 'Ура вы победили!',
    RESULT: 'Список результатов:'
  };

  window.renderStatistics = function (ctx, names, times) {
    var maxCount = getMaxNumber(times);

    ctx.fillStyle = Color.SHADOW;
    ctx.fillRect(110, 20, 420, 270);
    ctx.fillStyle = Color.FIELD;
    ctx.fillRect(100, 10, 420, 270);
    ctx.strokeText = FONT_STYLE;
    ctx.fillStyle = Color.FONT;
    ctx.fillText(Text.WIN, 130, 40);
    ctx.fillText(Text.RESULT, 130, 60);

    for (var j = 0; j < names.length; j++) {
      var theirColor = randomColor();
      var ratio = times[j] / maxCount;
      var currentName = names[j];
      var currentTime = times[j];
      var y = Size.MAX_HEIGHT - ratio * Size.MAX_HEIGHT;
      var x = 150 + (Size.WIDTH_OF_BLOCK + Size.SPACING) * j;

      if (currentName === MAIN_NAME) {
        ctx.fillStyle = Color.MAIN_BLOCK;
      } else {
        ctx.fillStyle = theirColor;
      }

      ctx.fillRect(x, y + 95, Size.WIDTH_OF_BLOCK, ratio * Size.MAX_HEIGHT);
      ctx.fillStyle = Color.FONT;
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



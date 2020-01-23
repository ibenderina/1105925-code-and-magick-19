'use strict';

window.renderStatistics = function (ctx, names, times) {
  var maxCount = 0;
  var MAX_HEIGHT = 150;
  var WIDTH_OF_BLOCK = 40;
  var SPACING = 50;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = '#fff';
  ctx.fillRect(100, 10, 420, 270);
  ctx.strokeText = '16px PT Mono';
  ctx.fillStyle = '#444444';
  ctx.fillText('Ура вы победили!', 130, 40);
  ctx.fillText('Список результатов:', 130, 60);

  for (var i = 0; i < times.length; i++) {
    if (maxCount < times[i]) {
      maxCount = times[i];
    }
  }

  for (var j = 0; j < names.length; j++) {
    var saturation = Math.random() * 100;
    var myColor = 'rgba(255, 0, 0, 1)';
    var theirColor = 'hsl(220, ' + saturation + '%, 60%)';
    var ratio = times[j] / maxCount;
    var currentName = names[j];
    var currentTime = times[j];
    var y = MAX_HEIGHT - ratio * MAX_HEIGHT;
    var x = 150 + (WIDTH_OF_BLOCK + SPACING) * j;

    if (currentName === 'Вы') {
      ctx.fillStyle = myColor;
    } else {
      ctx.fillStyle = theirColor;
    }

    ctx.fillRect(x, y + 95, WIDTH_OF_BLOCK, ratio * MAX_HEIGHT);
    ctx.fillStyle = '#444444';
    ctx.fillText(currentName, x, 265);
    ctx.fillText(Math.floor(currentTime).toString(), x, y + 85);
  }
};

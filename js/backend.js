'use strict';

(function () {
  var Error = {
    CONNECT: 'Произошла ошибка соединения',
    TIME_LIMIT: 'Запрос не успел выполниться за '
  };

  var Url = {
    LOAD: 'https://js.dump.academy/code-and-magick/data',
    SAVE: 'https://js.dump.academy/code-and-magick'
  };

  var TIMEOUT = 10000;
  var TIME_LIMIT = 'мс';
  var STATUS_ANSWER = 'Статус ответа: ';

  var request = function (URL, method, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(STATUS_ANSWER + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(Error.CONNECT);
    });
    xhr.addEventListener('timeout', function () {
      onError(Error.TIME_LIMIT + xhr.timeout + TIME_LIMIT);
    });

    xhr.timeout = TIMEOUT; // 10s

    xhr.open(method, URL);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    request(Url.LOAD, 'GET', null, onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    request(Url.SAVE, 'POST', data, onLoad, onError);
  };

  window.backend = {
    load: load,
    save: save
  };
})();

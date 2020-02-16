'use strict';

(function () {
  var NAMES_LIST = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var SURNAME_LIST = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var WIZARD_COUNT = 4;
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var randomChoose = function (dataList) {
    var random = Math.floor(Math.random() * dataList.length);
    return dataList[random];
  };

  var createWizards = function (wizardsCount) {
    var wizardsArray = [];
    for (var i = 0; i < wizardsCount; i++) {
      wizardsArray.push({
        name: randomChoose(NAMES_LIST) + ' ' + randomChoose(SURNAME_LIST),
        coatColor: randomChoose(COAT_COLORS),
        eyesColor: randomChoose(EYES_COLORS),
      });
    }
    return wizardsArray;
  };

  var createSimilarWizardEl = function (wizard, wizardTemplateItem) {
    var wizardEl = wizardTemplateItem.cloneNode(true);
    var wizardNameEl = wizardEl.querySelector('.setup-similar-label');
    wizardNameEl.textContent = wizard.name;
    var wizardCoatEl = wizardEl.querySelector('.wizard-coat');
    wizardCoatEl.style.fill = wizard.coatColor;
    var wizardEyesEl = wizardEl.querySelector('.wizard-eyes');
    wizardEyesEl.style.fill = wizard.eyesColor;
    return wizardEl;
  };

  var createSimilarWizardsEl = function (wizardTemplateItem) {
    var similarList = new DocumentFragment();
    var wizardsArray = createWizards(WIZARD_COUNT);
    for (var j = 0; j < WIZARD_COUNT; j++) {
      similarList.appendChild(createSimilarWizardEl(wizardsArray[j], wizardTemplateItem));
    }
    return similarList;
  };

  var openPopup = function (element) {
    element.classList.remove('hidden');
  };

  var closePopup = function (element) {
    element.classList.add('hidden');
  };

  var onPopupEnterKeydown = function (evt, element) {
    if (evt.key === ENTER_KEY) {
      openPopup(element);
    }
  };

  var onSetupCloseEnterKeydown = function (evt, element) {
    if (evt.key === ENTER_KEY) {
      closePopup(element);
    }
  };

  var onPopupEscKeydown = function (evt, element) {
    if (evt.key === ESC_KEY && evt.target.tagName !== 'INPUT') {
      closePopup(element);
    }
  };

  var onSetupSubmitClick = function (evt, form) {
    form.submit();
  };

  var onSetupSubmitEnterKeydown = function (evt, form) {
    if (evt.key === ENTER_KEY) {
      onSetupSubmitClick(evt, form);
    }
  };

  var changeColor = function (input, element, color, property) {
    input.value = color;
    element.style[property] = color;
  };

  var setupEl = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupEl.querySelector('.setup-close');
  var setupIcon = document.querySelector('.setup-open-icon');
  var setupSubmit = document.querySelector('.setup-submit');
  var setupForm = document.querySelector('.setup-wizard-form');
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireballWrap = document.querySelector('.setup-fireball-wrap');
  var wizardFireball = wizardFireballWrap.querySelector('input');
  var wizardCoatInput = document.querySelector('[name="coat-color"]');
  var wizardEyesInput = document.querySelector('[name="eyes-color"]');

  wizardCoat.addEventListener('click', function (evt) {
    var color = randomChoose(COAT_COLORS);
    changeColor(wizardCoatInput, evt.target, color, 'fill');
  });

  wizardEyes.addEventListener('click', function (evt) {
    var color = randomChoose(EYES_COLORS);
    changeColor(wizardEyesInput, evt.target, color, 'fill');
  });

  wizardFireballWrap.addEventListener('click', function () {
    var color = randomChoose(FIREBALL_COLORS);
    changeColor(wizardFireball, wizardFireballWrap, color, 'background');
  });

  setupOpen.addEventListener('click', function () {
    openPopup(setupEl);
  });

  setupClose.addEventListener('click', function () {
    closePopup(setupEl);
  });

  document.addEventListener('keydown', function (evt) {
    onPopupEscKeydown(evt, setupEl);
  });

  setupIcon.addEventListener('keydown', function (evt) {
    onPopupEnterKeydown(evt, setupEl);
  });

  setupClose.addEventListener('keydown', function (evt) {
    onSetupCloseEnterKeydown(evt, setupEl);
  });

  setupSubmit.addEventListener('click', function (evt) {
    if (setupForm.checkValidity()) {
      onSetupSubmitClick(evt, setupForm);
    }
  });

  setupSubmit.addEventListener('keydown', function (evt) {
    if (setupForm.checkValidity()) {
      onSetupSubmitEnterKeydown(evt, setupForm);
    }
  });

  var wizardTemplateEl = document.querySelector('#similar-wizard-template').content;
  var wizardTemplateItem = wizardTemplateEl.children[0];

  var setupSimilarListEl = document.querySelector('.setup-similar-list');
  setupSimilarListEl.appendChild(createSimilarWizardsEl(wizardTemplateItem));
  var setupSimilar = document.querySelector('.setup-similar');
  setupSimilar.classList.remove('hidden');
}());

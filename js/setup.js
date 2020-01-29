'use strict';

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

var WIZARD_COUNT = 4;

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

var setupEl = document.querySelector('.setup');
setupEl.classList.remove('hidden');

var wizardTemplateEl = document.querySelector('#similar-wizard-template').content;
var wizardTemplateItem = wizardTemplateEl.children[0];

var setupSimilarListEl = document.querySelector('.setup-similar-list');
setupSimilarListEl.appendChild(createSimilarWizardsEl(wizardTemplateItem));
var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

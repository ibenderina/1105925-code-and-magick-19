'use strict';

(function () {
  var Colors = {
    COAT: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ],

    EYES: [
      'black',
      'red',
      'blue',
      'yellow',
      'green'
    ],

    FIREBALL: [
      '#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848'
    ]
  };

  var Keys = {
    ESC_KEY: 'Escape',
    ENTER_KEY: 'Enter'
  };

  var WIZARD_COUNT = 4;

  var randomChoose = function (dataList) {
    var random = Math.floor(Math.random() * dataList.length);
    return dataList[random];
  };

  var createSimilarWizardEl = function (wizard, wizardTemplateItem) {
    var wizardEl = wizardTemplateItem.cloneNode(true);
    var wizardNameEl = wizardEl.querySelector('.setup-similar-label');
    wizardNameEl.textContent = wizard.name;
    var wizardCoatEl = wizardEl.querySelector('.wizard-coat');
    wizardCoatEl.style.fill = wizard.colorCoat;
    var wizardEyesEl = wizardEl.querySelector('.wizard-eyes');
    wizardEyesEl.style.fill = wizard.colorEyes;
    return wizardEl;
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === wizardCoatInput.value) {
      rank += 2;
    }
    if (wizard.colorEyes === wizardEyesInput.value) {
      rank += 1;
    }

    return rank;
  };

  var createSimilarWizardsEl = function (wizardTemplateItem, wizardsArray) {
    var similarList = new DocumentFragment();
    var sortedWizards = wizardsArray.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizardsArray.indexOf(left) - wizardsArray.indexOf(right);
      }
      return rankDiff;
    });
    sortedWizards.slice(0, WIZARD_COUNT).forEach(function (wizard) {
      similarList.appendChild(createSimilarWizardEl(wizard, wizardTemplateItem));
    });
    return similarList;
  };

  var openPopup = function (element) {
    element.classList.remove('hidden');
  };

  var closePopup = function (element) {
    element.classList.add('hidden');
  };

  var onPopupEnterKeydown = function (evt, element) {
    if (evt.key === Keys.ENTER_KEY) {
      openPopup(element);
    }
  };

  var onSetupCloseEnterKeydown = function (evt, element) {
    if (evt.key === Keys.ENTER_KEY) {
      closePopup(element);
    }
  };

  var onPopupEscKeydown = function (evt, element) {
    if (evt.key === Keys.ESC_KEY && evt.target.tagName !== 'INPUT') {
      closePopup(element);
    }
  };

  var onSetupSubmitClick = function (evt, form) {
    evt.preventDefault();
    var data = new FormData(form);
    window.backend.save(data, function () {
      closePopup(setupEl);
      window.changeOpenIcon();
    }, onWizardLoadError);
  };

  var onSetupSubmitEnterKeydown = function (evt, form) {
    if (evt.key === Keys.ENTER_KEY) {
      onSetupSubmitClick(evt, form);
    }
  };

  var changeColor = function (input, element, color, property) {
    input.value = color;
    element.style[property] = color;
  };

  var onWizardLoadError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var renderSortedWizards = function () {
    window.backend.load(function (userWizard) {
      setupSimilarListEl.innerHTML = '';
      setupSimilarListEl.appendChild(createSimilarWizardsEl(wizardTemplateItem, userWizard));
    },
    onWizardLoadError
    );
  };

  var debounceRenderSortedWizards = window.debounce(renderSortedWizards);

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
    var color = randomChoose(Colors.COAT);
    changeColor(wizardCoatInput, evt.target, color, 'fill');
    debounceRenderSortedWizards();
  });

  wizardEyes.addEventListener('click', function (evt) {
    var color = randomChoose(Colors.EYES);
    changeColor(wizardEyesInput, evt.target, color, 'fill');
    debounceRenderSortedWizards();
  });

  wizardFireballWrap.addEventListener('click', function () {
    var color = randomChoose(Colors.FIREBALL);
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

  renderSortedWizards();

  var setupSimilar = document.querySelector('.setup-similar');
  setupSimilar.classList.remove('hidden');

  window.setupEl = setupEl;
}());

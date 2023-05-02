export default class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._errorSelector = config.errorSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
  }

  _showInputError(input, errorElement) {
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(input, errorElement) {
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _hasInvalidInput() {
    return Array.from(this._inputList).some((input) => !input.validity.valid);
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }


  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    }
    else {
      this._enableButton();
    }
  }

  //проверка валидации
  _checkInputValidity(input) {
    const errorElement = this._form.querySelector(`${this._errorSelector}${input.name}`)

    if (!input.validity.valid) {
      this._showInputError(input, errorElement);
    } else {
      this._hideInputError(input, errorElement);
    }
  }
  //слушатели
  _setEventListener() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      })
    })
  }

  enableValidation() {
    this._inputList = this._form.querySelectorAll(this._inputSelector); //берем каждый инпут
    this._submitButton = this._form.querySelector(this._submitButtonSelector); //берем кнопку сабмит
    this._setEventListener();

  }
}

//обхект валидации
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__save-button',
  errorSelector: '.form__span-',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__span_visible'
};
//создаем функцию для валидации
function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector)); //взяли массив форм
  forms.forEach((formElement) => {
    const inputList = formElement.querySelectorAll(config.inputSelector); //берем каждый инпут
    const submitButton = formElement.querySelector(config.submitButtonSelector); // берем кнопку сабмит
    //вызываем функцию с аргументами
    setEventListeners(inputList, submitButton, config.errorSelector, config.inactiveButtonClass, config.inputErrorClass, config.errorClass);
  });
}
//вешаем слушатели
const setEventListeners = (inputList, submitButton, errorSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, errorSelector, inputErrorClass, errorClass);
      toggleButtonState(inputList, submitButton, inactiveButtonClass);
    });
  });
}

//проверяем валидацию
function checkInputValidity(input, errorSelector, inputErrorClass, errorClass) {
  const errorElement = document.querySelector(`${errorSelector}${input.name}`)


  if (!input.validity.valid) {
    showInputError(input, errorElement, inputErrorClass, errorClass);
  } else {
    hideInputError(input, errorElement, inputErrorClass, errorClass);
  }
}

const showInputError = (input, errorElement, inputErrorClass, errorClass) => {
  input.classList.add(inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(errorClass);

};

const hideInputError = (input, errorElement, inputErrorClass, errorClass) => {
  input.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
};


function hasInvalidInput(inputList) {
  return Array.from(inputList).some((input) => !input.validity.valid)
}

//меняет кнопку сабмит взависимости от валидации инпута
function toggleButtonState(inputList, submitButton, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(inactiveButtonClass)
    submitButton.disabled = true
  }
  else {
    submitButton.classList.remove(inactiveButtonClass)
    submitButton.disabled = false
  }
}


enableValidation(validationConfig);


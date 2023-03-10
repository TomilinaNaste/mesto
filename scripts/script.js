const popupElement = document.querySelector('.popup');
const popupElementOpen = document.querySelector('.profile__edit-button');
const popupElementClose = popupElement.querySelector('.popup__close-button');

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__item');
let jobInput = formElement.querySelector('.form__item_job');
let addNameInputInProfileTitle = document.querySelector('.profile__title');
let addNameInputInProfileSubTitle = document.querySelector('.profile__subtitle');

function handleFormSubmit(evt) {
  evt.preventDefault();
  addNameInputInProfileTitle.textContent = nameInput.value;
  addNameInputInProfileSubTitle.textContent = jobInput.value;

  itsPopupClose();
}
formElement.addEventListener('submit', handleFormSubmit);
// функция открытия поп-апа
const itsPopupOpen = function () {
  popupElement.classList.add('popup_open');
  nameInput.value = addNameInputInProfileTitle.textContent;
  jobInput.value = addNameInputInProfileSubTitle.textContent;
}
popupElementOpen.addEventListener('click', itsPopupOpen); // обработчик по клику для открытытия поп-апа
//функция закрытия поп-апа
const itsPopupClose = function () {
  popupElement.classList.remove('popup_open');
}
popupElementClose.addEventListener('click', itsPopupClose); //обработчик по клику для закрытия поп-апа

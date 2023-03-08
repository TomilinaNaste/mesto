const PopupElement = document.querySelector('.popup');
const PopupElementOpen = document.querySelector('.profile__edit-button');
const PopupElementClose = PopupElement.querySelector('.popup__close-button');

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__item');
let jobInput = formElement.querySelector('.form__item-job');
let addNameInputInProfileTitle = document.querySelector('.profile__title');
let addNameInputInProfileSubTitle = document.querySelector('.profile__subtitle');



function handleFormSubmit (evt) {
    evt.preventDefault();

  addNameInputInProfileTitle.textContent = nameInput.value;
  addNameInputInProfileSubTitle.textContent = jobInput.value;

  ItsPopupClose ();
}
PopupElement.addEventListener('submit', handleFormSubmit);

// функция открытия поп-апа
const ItsPopupOpen = function () {
  PopupElement.classList.add('popup_open');
  nameInput.value = addNameInputInProfileTitle.textContent;
  jobInput.value = addNameInputInProfileSubTitle.textContent;
}
PopupElementOpen.addEventListener('click', ItsPopupOpen); // обработчик по клику для открытытия поп-апа


//функция закрытия поп-апа
const ItsPopupClose = function () {
  PopupElement.classList.remove('popup_open');
}
PopupElementClose.addEventListener('click', ItsPopupClose); //обработчик по клику для закрытия поп-апа

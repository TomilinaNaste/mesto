import initialCards from "./constants.js";

const popupEditProfile = document.querySelector('.popup-profileEdit');
const popupAddElement = document.querySelector('.popup-addElement');
const popupImageElement = document.querySelector('.popup-image');//попап карточек
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
//кнопка закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close-button');

const formEditProfile = popupEditProfile.querySelector('.form');
const nameInput = formEditProfile.querySelector('.form__item');
const jobInput = formEditProfile.querySelector('.form__item_type_job');
const addNameInputInProfileTitle = document.querySelector('.profile__title');
const addNameInputInProfileSubTitle = document.querySelector('.profile__subtitle');
//для открытия поп-апа имж
const popupImage = document.querySelector('.popup__image');//изображение попапа
const popupDescription = document.querySelector('.popup__description');
const popupAddElementOpen = document.querySelector('.profile__add-button');

const elementsGroupCard = document.querySelector('.elements__group'); //разметка ul
//переменные второй формы
const formAddCard = popupAddElement.querySelector('.form_add');
const namedInput = formAddCard.querySelector('.form__item_type_named');
const urlInput = formAddCard.querySelector('.form__item_type_url');

const inputListProfileForm = formEditProfile.querySelectorAll('.form__item');
const inputListCardForm = formAddCard.querySelectorAll('.form__item');
const submitButtonProfileForm = formEditProfile.querySelector('.form__save-button');
const submitButtonCardForm = formAddCard.querySelector('.form__save-button');




// функция открытия любого поп-апа
const openPopup = function (popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closePopupEsc);
}
//открытие поп-апа профиля обработчиком событий клик
popupProfileOpenButton.addEventListener('click', () => {
  nameInput.value = addNameInputInProfileTitle.textContent;
  jobInput.value = addNameInputInProfileSubTitle.textContent;
  //toggleButtonState(inputListProfileForm, submitButtonProfileForm, validationConfig.inactiveButtonClass);
  openPopup(popupEditProfile); // вызов функции
});
//событие сабмит
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  addNameInputInProfileTitle.textContent = nameInput.value;
  addNameInputInProfileSubTitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//открытие поп-апа добавления карточек
popupAddElementOpen.addEventListener('click', () => {
  formAddCard.reset();
  //toggleButtonState(inputListCardForm, submitButtonCardForm, validationConfig.inactiveButtonClass);
  openPopup(popupAddElement);
});
// закрытие popup
const closePopup = function (popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', closePopupEsc);
}
//закрытие поп-апа по esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_open');
    closePopup(popupOpen);
  }
}
//закрытие по оверлей
function closePopupOnClickOverlay(e) {
  if (e.target === e.currentTarget) {
    closePopup(e.target)
  }
};
popupEditProfile.addEventListener("click", closePopupOnClickOverlay);
popupAddElement.addEventListener("click", closePopupOnClickOverlay);
popupImageElement.addEventListener("click", closePopupOnClickOverlay);


// находим все крестики проекта по универсальному селектору
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');// находим 1 раз ближайший к крестику попап
  button.addEventListener('click', () => { // устанавливаем обработчик закрытия на крестик
    closePopup(popup);
  });
});



function openImagePopup(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  document.querySelector('.popup__description').textContent = data.name;
  openPopup(popupImageElement);
}
//!----------------------
const templateSelector = '#element-template';
class Card {
  constructor(data, templateSelector, openImagePopup) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
  }
  _getClone() {
    return document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);
  }
  createCard() {
    this._templateElementItem = this._getClone();
    this._imageElement = this._templateElementItem.querySelector('.element__image');
    this._imageCaption = this._templateElementItem.querySelector('.element__image-name');
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._imageCaption.textContent = this._name;
    this._likeButton = this._templateElementItem.querySelector('.element__button');
    this._removeButton = this._templateElementItem.querySelector('.element__button-delete');
    return this._templateElementItem;
  }

}




//фукнция добавления карточки
// const templateElement = document.querySelector('#element-template').content;
// function createCard(data) {
//   //клонируем содержимое тега template
//   const elementItem = templateElement.cloneNode(true);
//   const imageElement = elementItem.querySelector('.element__image');
//   const imageCaption = elementItem.querySelector('.element__image-name');
//   imageElement.src = data.link;
//   imageElement.alt = data.name;
//   imageCaption.textContent = data.name;
//  //открытие поп-апа картинки
// imageElement.addEventListener('click', () => {
//   popupImage.src = data.link;
//   popupImage.alt = data.name;
//   popupDescription.textContent = data.name;
//   openPopup(popupImageElement);
// });


// //вешаем слушатель на корзинку
// const removeButton = elementItem.querySelector('.element__button-delete');
// removeButton.addEventListener('click', function (evt) {
//   evt.target.closest('.elements__item').remove();
// });

// //делаем лайки
// const likeButton = elementItem.querySelector('.element__button');
// likeButton.addEventListener('click', function (evt) {
//   evt.target.classList.toggle('element__button_active');
// });

//возвращаем заполненную карточку
//   return elementItem;
// };
//фукнция открытия поп-апа картинки


//фукнция, которая добавит карточки в контейнер
function addCardInContainer(container, card) {
  container.append(card);
}
// добавление карточек на страницу
initialCards.forEach(function (element) {
  const cards = new Card(element, templateSelector, openImagePopup);
  //console.log(cards);
  addCardInContainer(elementsGroupCard, cards.createCard());
});

//добавление новой карточки на страницу
function handleFormCardSubmit(evt) {
  evt.preventDefault();
  const cardData = { name: namedInput.value, link: urlInput.value };
  elementsGroupCard.prepend(createCard(cardData));
  event.target.reset(); //обнуление значений формы
  closePopup(popupAddElement);
}
formAddCard.addEventListener('submit', handleFormCardSubmit);


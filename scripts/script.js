import initialCards from "./constants.js";
import Card from "./card.js";
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
const popupAddElementOpen = document.querySelector('.profile__add-button');

const elementsGroupCard = document.querySelector('.elements__group'); //разметка ul
//переменные второй формы
const formAddCard = popupAddElement.querySelector('.form_add');
const namedInput = formAddCard.querySelector('.form__item_type_named');
const urlInput = formAddCard.querySelector('.form__item_type_url');
const templateSelector = '#element-template';




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

function openImagePopup(data) { //открытие поп-апа картинки
  popupImage.src = data.link;
  popupImage.alt = data.name;
  document.querySelector('.popup__description').textContent = data.name;
  openPopup(popupImageElement);
}

function createNewCard(element) {
  const cards = new Card(element, templateSelector, openImagePopup);
  const cardElement = cards.createCard();
  return cardElement
}

//фукнция, которая добавит карточки в контейнер
function addCardInContainer(container, card) {
  container.append(card);
}
// добавление карточек на страницу
initialCards.forEach(function (element) {
  addCardInContainer(elementsGroupCard, createNewCard(element));
});

//добавление новой карточки на страницу
function handleFormCardSubmit(evt) {
  evt.preventDefault();
  const cardData = { name: namedInput.value, link: urlInput.value };
  elementsGroupCard.prepend(createNewCard(cardData));
  event.target.reset(); //обнуление значений формы
  closePopup(popupAddElement);
}
formAddCard.addEventListener('submit', handleFormCardSubmit);


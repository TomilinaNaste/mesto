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
//const popupDescription = document.querySelector('.popup__description');
const popupAddElementOpen = document.querySelector('.profile__add-button');

const elementsGroupCard = document.querySelector('.elements__group'); //разметка ul
//переменные второй формы
const formAddCard = popupAddElement.querySelector('.form_add');
const namedInput = formAddCard.querySelector('.form__item_type_named');
const urlInput = formAddCard.querySelector('.form__item_type_url');


// функция открытия любого поп-апа
const openPopup = function (popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closePopupEsc);
}


//функция открытия поп-апа картинки
function (data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  document.querySelector('.popup__description').textContent = data.name;
  openPopup(popupImageElement);
}
const imageElement = document.querySelector('.element__image');
imageElement.addEventListener('click', openImagePopup);

//фукнция добавления hfpvtnrb карточки
function createCard(data) {
    //клонируем содержимое тега template
    const elementItem = templateElement.cloneNode(true);
    const imageElement = elementItem.querySelector('.element__image');
    const imageCaption = elementItem.querySelector('.element__image-name');
    imageElement.src = data.link;
    imageElement.alt = data.name;
    imageCaption.textContent = data.name;
    return elementItem;
}


import Card from "./components/Сard.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";


import {
  initialCards,
  templateSelector,
  popupEditProfileSelector,
  popupImageElementSelector,
  elementsGroupCardSelector,
  popupAddCardSelector,
  configInfo,
  popupProfileOpenButton,
  popupAddElementOpen,
      validationConfig,
//   formEditProfileSelector,
} from './utils/constants.js';

import '../pages/index.css';

const popupEditProfile = document.querySelector(".popup-profileEdit");
const popupAddElement = document.querySelector(".popup-addElement");
// const popupImageElement = document.querySelector(".popup-image"); //попап карточек
//const popupProfileOpenButton = document.querySelector(".profile__edit-button");
//кнопка закрытия попапов
// const closeButtons = document.querySelectorAll(".popup__close-button");
const formEditProfile = popupEditProfile.querySelector(".form");
// const nameInput = formEditProfile.querySelector(".form__item");
// const jobInput = formEditProfile.querySelector(".form__item_type_job");
// const addNameInputInProfileTitle = document.querySelector(".profile__title");
// const addNameInputInProfileSubTitle =
//   document.querySelector(".profile__subtitle");
//для открытия поп-апа имж
// const popupImage = document.querySelector(".popup__image"); //изображение попапа
// const popupDescription = document.querySelector(".popup__description");
//const popupAddElementOpen = document.querySelector(".profile__add-button");

// const elementsGroupCard = document.querySelector(".elements__group"); //разметка ul
//переменные второй формы
const formAddCard = popupAddElement.querySelector(".form_add");
// const namedInput = formAddCard.querySelector(".form__item_type_named");
// const urlInput = formAddCard.querySelector(".form__item_type_url");
// const templateSelector = "#element-template";
// const popupEditProfileSelector = ".popup-profileEdit";
// const popupImageElementSelector = ".popup-image";
// const elementsGroupCardSelector = ".elements__group"; //разметка ul
// const popupAddCardSelector = ".popup-addElement";
// const formEditProfileSelector = ".form";


const imagePopup = new PopupWithImage(popupImageElementSelector);
imagePopup.setEventListener();


function createCard(element) {
  const card = new Card(element, templateSelector, imagePopup.open);
  return card.createCard();
}
const section = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      section.addItem(createCard(element))
    },
  }, elementsGroupCardSelector );
section.addCardFromArray() //добавление карточек при загр страницы

const userInfo = new UserInfo(configInfo);

//Экземплял класса для поп-ап редактирования профиля
const editProfilePopup = new PopupWithForm(popupEditProfileSelector, (data)  => {
  userInfo.setUserInfo(data)
  })
  editProfilePopup.setEventListener();
  //открытие попап профиля
  popupProfileOpenButton.addEventListener('click', () => {
    editProfilePopup.setInputValue(userInfo.gerUserInfo());
    editProfilePopup.open();
  })

//экземплыяр класса для поп-апа добавления карточек
const addCardPopup = new PopupWithForm(popupAddCardSelector, (data) => {
  section.addItem(createCard(data));


})
addCardPopup.setEventListener();
//открытие поп-апа карточек
popupAddElementOpen.addEventListener('click', () => {
  addCardPopup.open();
})

//валидация
const formEditProfileValidator = new FormValidator(
  validationConfig,
  formEditProfile
);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(validationConfig, formAddCard);
formAddCardValidator.enableValidation();



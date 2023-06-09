import Card from "./components/Сard.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import PopupRemoveCard from "./components/PopupRemoveCard.js";
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
  popupEditProfileAvatar,
  popupProfileAvatarOpen,
  popupRemoveCardSelector,
} from "./utils/constants.js";
import "../pages/index.css";

const popupEditProfile = document.querySelector(".popup-profileEdit");
const popupAddElement = document.querySelector(".popup-addElement");
const popupRemoveElement = document.querySelector(".popup-removeElement");
const popupAvatarProfile = document.querySelector(".popup-avatar");
const formEditProfile = popupEditProfile.querySelector(".form");
const formAddCard = popupAddElement.querySelector(".form_add");
const formRemoveCard = popupRemoveElement.querySelector(".form-remove");
const formProfileAvatar = popupAvatarProfile.querySelector(".form_avatar");


const removeCardPopup = new PopupRemoveCard(popupRemoveCardSelector, (element) => {
element.removeCard();
removeCardPopup.close();
});

const imagePopup = new PopupWithImage(popupImageElementSelector);


//валидация //*Редактирование профиля
const formEditProfileValidator = new FormValidator(validationConfig,formEditProfile);
formEditProfileValidator.enableValidation();
//валидация //*Добавления карточки
const formAddCardValidator = new FormValidator(validationConfig, formAddCard);
formAddCardValidator.enableValidation();
//валидация //*Удаление карточки
const formRemoveCardValidator = new FormValidator(validationConfig, formRemoveCard);
formRemoveCardValidator.enableValidation();
//валидация //*Редактирование аватара
const formProfileAvatarValidator = new FormValidator(validationConfig, formProfileAvatar);
formProfileAvatarValidator.enableValidation();

function createCard(element) {
  const card = new Card(element, templateSelector, imagePopup.open, removeCardPopup.open);
  return card.createCard();
}
const section = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      section.addItem(createCard(element));
    },
  },
  elementsGroupCardSelector
);
section.renderItems(); //добавление карточек при загр страницы

const userInfo = new UserInfo(configInfo);

//Экземплял класса для поп-ап редактирования профиля
const editProfilePopup = new PopupWithForm(popupEditProfileSelector, (data) => {
  userInfo.setUserInfo(data);
});

//открытие попап профиля
popupProfileOpenButton.addEventListener("click", () => {
  editProfilePopup.setInputValue(userInfo.gerUserInfo());
  editProfilePopup.open();
});
//экземплыяр класса для поп-апа добавления карточек
const addCardPopup = new PopupWithForm(popupAddCardSelector, (data) => {
  section.addItem(createCard(data));
});
//открытие поп-апа карточек
popupAddElementOpen.addEventListener("click", () => {
  formAddCardValidator.resetFormError();
  addCardPopup.open();
});

//экземпляр класса для поп-апа аватара
const editProfileAvatarPopup = new PopupWithForm(popupEditProfileAvatar, (data) => {
  document.querySelector(".profile__avatar").src = data.avatar;
});
//открытие попапа аватара
popupProfileAvatarOpen.addEventListener("click", () => {
  formProfileAvatarValidator.resetFormError();
  editProfileAvatarPopup.open();
});
//!cоберем seteventlistener
imagePopup.setEventListener();
editProfilePopup.setEventListener();
addCardPopup.setEventListener();
editProfileAvatarPopup.setEventListener();
removeCardPopup.setEventListener();

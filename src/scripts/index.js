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
} from "./utils/constants.js";
import "../pages/index.css";

const popupEditProfile = document.querySelector(".popup-profileEdit");
const popupAddElement = document.querySelector(".popup-addElement");
const formEditProfile = popupEditProfile.querySelector(".form");
const formAddCard = popupAddElement.querySelector(".form_add");
const imagePopup = new PopupWithImage(popupImageElementSelector);

//валидация
const formEditProfileValidator = new FormValidator(
  validationConfig,
  formEditProfile
);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(validationConfig, formAddCard);
formAddCardValidator.enableValidation();

imagePopup.setEventListener();

function createCard(element) {
  const card = new Card(element, templateSelector, imagePopup.open);
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
editProfilePopup.setEventListener();
//открытие попап профиля
popupProfileOpenButton.addEventListener("click", () => {
  editProfilePopup.setInputValue(userInfo.gerUserInfo());
  editProfilePopup.open();
});

//экземплыяр класса для поп-апа добавления карточек
const addCardPopup = new PopupWithForm(popupAddCardSelector, (data) => {
  section.addItem(createCard(data));
});
addCardPopup.setEventListener();
//открытие поп-апа карточек
popupAddElementOpen.addEventListener("click", () => {
  formAddCardValidator.resetFormError();
  addCardPopup.open();
});

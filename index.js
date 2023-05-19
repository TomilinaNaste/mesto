import initialCards from "./scripts/utils/constants.js";
import Card from "./scripts/components/Сard.js";
import FormValidator from "./scripts/components/FormValidator.js";
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import Section from "./scripts/components/Section.js";

const popupEditProfile = document.querySelector(".popup-profileEdit");
const popupAddElement = document.querySelector(".popup-addElement");
const popupImageElement = document.querySelector(".popup-image"); //попап карточек
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
//кнопка закрытия попапов
const closeButtons = document.querySelectorAll(".popup__close-button");
const formEditProfile = popupEditProfile.querySelector(".form");
const nameInput = formEditProfile.querySelector(".form__item");
const jobInput = formEditProfile.querySelector(".form__item_type_job");
const addNameInputInProfileTitle = document.querySelector(".profile__title");
const addNameInputInProfileSubTitle =
  document.querySelector(".profile__subtitle");
//для открытия поп-апа имж
const popupImage = document.querySelector(".popup__image"); //изображение попапа
const popupDescription = document.querySelector(".popup__description");
const popupAddElementOpen = document.querySelector(".profile__add-button");

const elementsGroupCard = document.querySelector(".elements__group"); //разметка ul
//переменные второй формы
const formAddCard = popupAddElement.querySelector(".form_add");
const namedInput = formAddCard.querySelector(".form__item_type_named");
const urlInput = formAddCard.querySelector(".form__item_type_url");
//!--
const templateSelector = "#element-template";
const popupEditProfileSelector = ".popup-profileEdit";
const popupImageElementSelector = ".popup-image";
const elementsGroupCardSelector = ".elements__group"; //разметка ul

//объект валидации
const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__save-button",
  errorSelector: ".form__span-",
  inactiveButtonClass: "form__save-button_inactive",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__span_visible",
};

const imagePopup = new PopupWithImage(popupImageElementSelector);
imagePopup.setEventListener();

//событие сабмит
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  addNameInputInProfileTitle.textContent = nameInput.value;
  addNameInputInProfileSubTitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}
formEditProfile.addEventListener("submit", handleProfileFormSubmit);


const section = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const card = new Card(element, templateSelector, imagePopup.open);
      return card.createCard();
    },
  },
  elementsGroupCardSelector
);
section.addCardFromArray()

const formEditProfileValidator = new FormValidator(
  validationConfig,
  formEditProfile
);
formEditProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(validationConfig, formAddCard);
formAddCardValidator.enableValidation();


const templateSelector = "#element-template";
const popupEditProfileSelector = ".popup-profileEdit";
const popupImageElementSelector = ".popup-image";
const elementsGroupCardSelector = ".elements__group"; //разметка ul
const popupAddCardSelector = ".popup-addElement";
const formEditProfileSelector = ".form";
const popupEditProfileAvatar = ".popup-avatar";
const popupRemoveCardSelector = ".popup-removeElement";
const popupProfileOpenButton = document.querySelector(".profile__edit-button"); //кпнока профиля
const popupAddElementOpen = document.querySelector(".profile__add-button"); //кнопка карточек
const popupProfileAvatarOpen = document.querySelector(".profile__avatar-edit")//кнопка аватара

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
//for UsetInfo
const configInfo = {
  profileTitleSelector: ".profile__title",
  profileSubtitleSelector: ".profile__subtitle",
  profileAvatar: ".profile__avatar"
};

  export {
  templateSelector,
  popupEditProfileSelector,
  popupImageElementSelector,
  elementsGroupCardSelector,
  popupAddCardSelector,
  configInfo,
  popupProfileOpenButton,
  popupAddElementOpen,
  validationConfig,
  formEditProfileSelector,
  popupEditProfileAvatar,
  popupProfileAvatarOpen,
  popupRemoveCardSelector,
};

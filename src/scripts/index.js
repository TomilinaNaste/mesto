import Card from "./components/Сard.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import PopupRemoveCard from "./components/PopupRemoveCard.js";
import Api from "./components/Api.js";
import {
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

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "9a65c1db-3916-4ea1-8885-d37ee5dc2bde",
    "Content-Type": "application/json",
  },
});

//удаление карточки
const removeCardPopup = new PopupRemoveCard(
  popupRemoveCardSelector,
  ({ element, cardId }) => {
    api
      .deleteCard(cardId)
      .then((res) => {
        element.removeCard();
        removeCardPopup.close();
      })
      .catch((error) => console.log(`Ошибка при удалении ${error}`))
      .finally();
  }
);

const imagePopup = new PopupWithImage(popupImageElementSelector);

//валидация //*Редактирование профиля
const formEditProfileValidator = new FormValidator(
  validationConfig,
  formEditProfile
);
formEditProfileValidator.enableValidation();
//валидация //*Добавления карточки
const formAddCardValidator = new FormValidator(validationConfig, formAddCard);
formAddCardValidator.enableValidation();
//валидация //*Удаление карточки
const formRemoveCardValidator = new FormValidator(
  validationConfig,
  formRemoveCard
);
formRemoveCardValidator.enableValidation();
//валидация //*Редактирование аватара
const formProfileAvatarValidator = new FormValidator(
  validationConfig,
  formProfileAvatar
);
formProfileAvatarValidator.enableValidation();

function createCard(element) {
  const card = new Card(
    element,
    templateSelector,
    imagePopup.open,
    removeCardPopup.open,
    (likeButton, cardId) => {
      if (likeButton.classList.contains("element__button_active")) {
        api
          .deleteLikes(cardId)
          .then((res) => {
            card.isLike(res.likes);
          })
          .catch((error) => console.log(`Ошибка при удалении лайка ${error}`))
          .finally();
      } else {
        api
          .addLikes(cardId)
          .then((res) => {
            card.isLike(res.likes);
          })
          .catch((error) => console.log(`Ошибка при лайке ${error}`))
          .finally();
      }
    }
  );
  return card.createCard();
}

//экземпляр с объектом карточек
const section = new Section((element) => {
  section.addItemAppend(createCard(element));
}, elementsGroupCardSelector);

const userInfo = new UserInfo(configInfo);

//Экземплял класса для поп-ап редактирования профиля
const editProfilePopup = new PopupWithForm(popupEditProfileSelector, (data) => {
  editProfilePopup.downloadStatusbutton(true);
  api
    .setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        job: res.about,
        avatar: res.avatar,
      });
      editProfilePopup.close();
    })
    .catch((error) => console.log(`Ошибка ${error}`))
    .finally(() => editProfilePopup.downloadStatusbutton(false));
});

//открытие попап профиля
popupProfileOpenButton.addEventListener("click", () => {
  editProfilePopup.setInputValue(userInfo.gerUserInfo());
  editProfilePopup.open();
});
//!-----------------
//экземплыяр класса для поп-апа добавления карточек
const addCardPopup = new PopupWithForm(popupAddCardSelector, (data) => {
  addCardPopup.downloadStatusbutton(true);
  api
    .addCard(data)
    .then((dataCard) => {
      dataCard.myId = userInfo.getId();
      section.addItem(createCard(dataCard));
      addCardPopup.close(userInfo.getId());
    })
    .catch((error) => console.log(`Ошибка при создании карточки ${error}`))
    .finally(() => addCardPopup.downloadStatusbutton(false));
});

//!--------------------------------

//открытие поп-апа карточек
popupAddElementOpen.addEventListener("click", () => {
  formAddCardValidator.resetFormError();
  addCardPopup.open();
});

//экземпляр класса для поп-апа аватара
const editProfileAvatarPopup = new PopupWithForm(
  popupEditProfileAvatar,
  (data) => {
    editProfileAvatarPopup.downloadStatusbutton(true);
    api
      .editProfileAvatar(data)
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          job: res.about,
          avatar: res.avatar,
        });
        editProfileAvatarPopup.close();
      })
      .catch((error) => console.log(`Ошибка при обновлении аватара ${error}`))
      .finally(() => editProfileAvatarPopup.downloadStatusbutton(false));
  }
);
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

//загрузка карточек
Promise.all([api.getInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach((element) => (element.myId = dataUser._id));
    userInfo.setUserInfo({
      name: dataUser.name,
      job: dataUser.about,
      avatar: dataUser.avatar,
    });
    userInfo.setId(dataUser._id);
    section.renderItems(dataCard);
  })
  .catch((error) => console.log(`Ошибка ${error}`));


const popupEditProfile = document.querySelector('.popup-profileEdit');
const popupAddElement = document.querySelector('.popup-addElement');
const popupImageElement = document.querySelector('.popup-image');//попап карточек
const popupElementOpenPopupProfile = document.querySelector('.profile__edit-button');
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
//массив с карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// функция открытия любого поп-апа
const openPopup = function (popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closePopupEsc);
}
//открытие поп-апа профиля обработчиком событий клик
popupElementOpenPopupProfile.addEventListener('click', () => {
  nameInput.value = addNameInputInProfileTitle.textContent;
  jobInput.value = addNameInputInProfileSubTitle.textContent;
  toggleButtonState(inputListProfileForm, submitButtonProfileForm, validationConfig.inactiveButtonClass);
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
  toggleButtonState(inputListCardForm, submitButtonCardForm, validationConfig.inactiveButtonClass);
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
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => {
    closePopup(popup);
  });
});

//фукнция добавления карточки
const templateElement = document.querySelector('#element-template').content;
function createCard(data) {
  //клонируем содержимое тега template
  const elementItem = templateElement.cloneNode(true);
  const imageElement = elementItem.querySelector('.element__image');
  const imageCaption = elementItem.querySelector('.element__image-name');
  imageElement.src = data.link;
  imageElement.alt = data.name;
  imageCaption.textContent = data.name;

  //открытие поп-апа картинки

  imageElement.addEventListener('click', () => {
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupDescription.textContent = data.name;
    openPopup(popupImageElement);
  });


  //вешаем слушатель на корзинку
  const removeButton = elementItem.querySelector('.element__button-delete');
  removeButton.addEventListener('click', function (evt) {
    evt.target.closest('.elements__item').remove();
  });

  //делаем лайки
  const likeButton = elementItem.querySelector('.element__button');
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_active');
  });

  //возвращаем заполненную карточку
  return elementItem;
};

//добавление карточек на страницу
initialCards.forEach(function (element) {
  const cards = createCard(element);
  elementsGroupCard.append(cards);
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


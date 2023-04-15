const popupElement = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup-profileEdit');
const popupAddElement = document.querySelector('.popup-addElement');
const popupImageElement = document.querySelector('.popup-image');//попап карточек
const popupElementOpen = document.querySelector('.profile__edit-button');
//кнопка закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close-button');

const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__item');
const jobInput = formElement.querySelector('.form__item_type_job');
const addNameInputInProfileTitle = document.querySelector('.profile__title');
const addNameInputInProfileSubTitle = document.querySelector('.profile__subtitle');
//для открытия поп-апа имж
const popupImage = document.querySelector('.popup__image');//изображение попапа
const popupDescription = document.querySelector('.popup__description');
const popupAddElementOpen = document.querySelector('.profile__add-button');

const elementsGroupCard = document.querySelector('.elements__group'); //разметка ul
//переменные второй формы
const formAddCard = document.querySelector('.form2');
const namedInput = formAddCard.querySelector('.form__item_type_named');
const urlInput = formAddCard.querySelector('.form__item_type_url');

const inputListForm = formElement.querySelectorAll('.form__item');
const submitButtonForm = formElement.querySelector('.form__save-button');
const submitButtonForm2 = formAddCard.querySelector('.form__save-button');
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
}
//открытие поп-апа профиля обработчиком событий клик
popupElementOpen.addEventListener('click', () => {
  nameInput.value = addNameInputInProfileTitle.textContent;
  jobInput.value = addNameInputInProfileSubTitle.textContent;
  toggleButtonState(inputListForm, submitButtonForm, validationConfig.inactiveButtonClass);
  openPopup(popupEditProfile); // вызов функции
});

//событие сабмит
function handleFormSubmit(evt) {
  evt.preventDefault();
  addNameInputInProfileTitle.textContent = nameInput.value;
  addNameInputInProfileSubTitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}
formElement.addEventListener('submit', handleFormSubmit);

//открытие поп-апа добавления карточек
popupAddElementOpen.addEventListener('click', () => {
  formAddCard.reset();
  toggleButtonState(inputListForm, submitButtonForm2, validationConfig.inactiveButtonClass);
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
function handleForm2Submit(evt) {
  evt.preventDefault();
  const namedUrl = { name: namedInput.value, link: urlInput.value };
  elementsGroupCard.prepend(createCard(namedUrl));
  event.target.reset(); //обнуление значений формы
  closePopup(popupAddElement);
}
formAddCard.addEventListener('submit', handleForm2Submit);


const popupElement = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup-profileEdit');
const popupAddElement = document.querySelector('.popup-addElement');
const popupImageElement = document.querySelector('.popup-image');


const popupElementOpen = document.querySelector('.profile__edit-button');

//кнопки закрытия попапов
const popupElementCloseProfile = popupElement.querySelector('.popup__close-button-profile');
const popupElementCloseCard = document.querySelector('.popup__close-button-card');
const popupElementCloseImage = document.querySelector('.popup__close-button-image');

const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__item');
const jobInput = formElement.querySelector('.form__item_type_job');
const addNameInputInProfileTitle = document.querySelector('.profile__title');
const addNameInputInProfileSubTitle = document.querySelector('.profile__subtitle');



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
const itsPopupOpen = function (popup) {
  popup.classList.add('popup_open');
}
//открытие поп-апа профиля обработчиком событий клик
popupElementOpen.addEventListener('click', () => {
  nameInput.value = addNameInputInProfileTitle.textContent;
  jobInput.value = addNameInputInProfileSubTitle.textContent;
  itsPopupOpen(popupEditProfile); // вызов функции
});
//событие сабмит
function handleFormSubmit(evt) {
  evt.preventDefault();
  addNameInputInProfileTitle.textContent = nameInput.value;
  addNameInputInProfileSubTitle.textContent = jobInput.value;
  itsPopupClose(popupEditProfile);
}
formElement.addEventListener('submit', handleFormSubmit);
//открытие поп-апа добавления карточек
const popupAddElementOpen = document.querySelector('.profile__add-button');
popupAddElementOpen.addEventListener('click', () => itsPopupOpen(popupAddElement));

// закрытие popup
const itsPopupClose = function (popup) {
  popup.classList.remove('popup_open');
}
popupElementCloseProfile.addEventListener('click', () => itsPopupClose(popupEditProfile));
popupElementCloseCard.addEventListener('click', () => itsPopupClose(popupAddElement));
popupElementCloseImage.addEventListener('click', () => itsPopupClose(popupImageElement));


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
    const popupImage = document.querySelector('.popup__image');
    const popupDescription = document.querySelector('.popup__description');
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupDescription.textContent = data.name;
    itsPopupOpen(popupImageElement);
  });


  //вешаем слушатель на корзинку
  const removeButton = elementItem.querySelector('.element__button-delete');
  removeButton.addEventListener('click', function (evt) {
    evt.target.closest('.elements__item').remove();
  });

  //делаем лайки
  const likeButton = elementItem.querySelector('.element__button')
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_active');
  });

  //возвращаем заполненную карточку
  return elementItem;
};

//добавление карточек на страницу
const elementsGroupCard = document.querySelector('.elements__group'); //куда будем их добавлять
initialCards.forEach(function (element) {
  const cards = createCard(element);
  elementsGroupCard.append(cards);
});

//добавление новой карточки на страницу
const formAddCard = document.querySelector('.form2');
const namedInput = formAddCard.querySelector('.form__item_type_named');
const urlInput = formAddCard.querySelector('.form__item_type_url');

function handleForm2Submit(evt) {
  evt.preventDefault();
  const namedUrl = { name: namedInput.value, link: urlInput.value };
  elementsGroupCard.prepend(createCard(namedUrl));
  event.target.reset(); //обнуление значений формы
  itsPopupClose(popupAddElement);
}
formAddCard.addEventListener('submit', handleForm2Submit);




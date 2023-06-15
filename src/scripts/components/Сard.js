export default class Card {
  constructor(
    data,
    templateSelector,
    openImagePopup,
    openRemoveCardPopup,
    changeLike
  ) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._myId = data.myId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._likesLength = data.likes.length;
    this._changeLike = changeLike;
    this._cardId = data._id;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
    this._openRemoveCardPopup = openRemoveCardPopup;
    this._templateElementItem = this._getClone();
    this._imageElement =
      this._templateElementItem.querySelector(".element__image");
    this._imageCaption = this._templateElementItem.querySelector(
      ".element__image-name"
    );
    this._likeButton =
      this._templateElementItem.querySelector(".element__button");
    this._removeButton = this._templateElementItem.querySelector(
      ".element__button-delete"
    );
    this._likeNumber = this._templateElementItem.querySelector(
      ".element__button-number"
    );
  }
  _getClone() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);
  }

  _evtForRemoveButton = () => {
    this._openRemoveCardPopup({ element: this, cardId: this._cardId });
  };

  _forOpenImagePopup = () => {
    this._openImagePopup(this._data);
  };

  //проверяем айдишник владельца карточки и скрываем мусору
  _availabilityRemoveButton() {
    if (this._myId !== this._ownerId) {
      this._removeButton.remove();
    }
  }

  //проверяем чей лайки
  _checkLikeCards() {
    this._likes.forEach((element) => {
      if (element._id === this._myId) {
        this._likeButton.classList.add("element__button_active");
        return;
      }
    });
    this._likeNumber.textContent = this._likesLength; //счетчик лайков
  }

  _toggleLike = () => {
    this._changeLike(this._likeButton, this._cardId);
  };

  //меняет цвет сердечка + счетчик лайков
  isLike(likes) {
    this._likeButton.classList.toggle("element__button_active");
    this._likeNumber.textContent = likes.length;
  }

  removeCard() {
    this._templateElementItem.remove();
    this._templateElementItem = null;
  }

  createCard() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._imageCaption.textContent = this._name;
    this._checkLikeCards();
    this._availabilityRemoveButton();
    this._addEventListeners();
    return this._templateElementItem;
  }

  _addEventListeners() {
    this._likeButton.addEventListener("click", this._toggleLike);
    this._removeButton.addEventListener("click", this._evtForRemoveButton);
    this._imageElement.addEventListener("click", this._forOpenImagePopup);
  }
}

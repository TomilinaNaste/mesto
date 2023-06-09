export default class Card {
  constructor(data, templateSelector, openImagePopup, openRemoveCardPopup) {
    this._data = data;
    this._link = data.link;
    this._name = data.named;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
    this._openRemoveCardPopup = openRemoveCardPopup;

  }
  _getClone() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);
  }

  _evtForLike(evt) {
    evt.target.classList.toggle("element__button_active");
  }

  _evtForRemoveButton = () => {
    this._openRemoveCardPopup(this);
  }

  _forOpenImagePopup = () => {
    this._openImagePopup(this._data);

  };

  _addEventListeners() {
    this._likeButton.addEventListener("click", this._evtForLike);
    this._removeButton.addEventListener("click", this._evtForRemoveButton);
    this._imageElement.addEventListener("click", this._forOpenImagePopup);
  }

  removeCard() {
    this._templateElementItem.remove();
    this._templateElementItem = null;
  }

  createCard() {
    this._templateElementItem = this._getClone();
    this._imageElement =
      this._templateElementItem.querySelector(".element__image");
    this._imageCaption = this._templateElementItem.querySelector(
      ".element__image-name"
    );
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._imageCaption.textContent = this._name;
    this._likeButton =
      this._templateElementItem.querySelector(".element__button");
    this._removeButton = this._templateElementItem.querySelector(
      ".element__button-delete"
    );
    this._addEventListeners();
    return this._templateElementItem;
  }
}



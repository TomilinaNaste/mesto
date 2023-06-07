export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-button")
  }

_handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    this.close();
  }
}

_handleButtonClose = () => {
  this.close();
}

_handleOverlayClose = (e) => {
  if (e.target === e.currentTarget) {
    this.close();
}
}

setEventListener() {
  this._closeButton.addEventListener('click', this._handleButtonClose);
  this._popup.addEventListener('click', this._handleOverlayClose);
}


  open() {
    this._popup.classList.add("popup_open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}

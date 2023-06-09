import Popup from "./Popup.js";

export default class PopupRemoveCard extends Popup {
constructor(popupSelector, submitFunction) {
  super(popupSelector);
  this._submitFunction = submitFunction;
  this._form = this._popup.querySelector(".form");
}

setEventListener() {
  super.setEventListener();
  this._form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    this._submitFunction(this._element);
  })
}

open = (element) => {
  super.open();
  this._element = element;
}
}

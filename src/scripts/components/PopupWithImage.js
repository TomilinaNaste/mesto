import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");//изображение попапа
    this._popupDescription = this._popup.querySelector(".popup__description");
  }

  open = (data) => {
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    console.log(data.name);

    this._popupDescription.textContent = data.name;
    super.open()
  }
}

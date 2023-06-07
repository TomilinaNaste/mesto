export default class Section {
  constructor({ items, renderer }, selectorContainer) {
    this._container = document.querySelector(selectorContainer);
    this._initialCards = items;
    this.renderer = renderer;
  }

  addCardFromArray() {
    this._initialCards.forEach(element => {
      this.renderer(element);
    })
  }


addItem(elementDom) {
  this._container.prepend(elementDom);
}
}

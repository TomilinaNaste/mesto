export default class Section {
  constructor({ items, renderer }, selectorContainer) {
    this._container = document.querySelector(selectorContainer);
    this._initialCards = items;
    this.renderer = renderer;
  }

  renderItems() {
    this._initialCards.forEach(element => {
      this.renderer(element);
    })
  }

addItem(elementDom) {
  this._container.prepend(elementDom);
}
}



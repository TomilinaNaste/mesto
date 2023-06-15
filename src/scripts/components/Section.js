export default class Section {
  constructor(renderer, selectorContainer) {
    this._container = document.querySelector(selectorContainer);
    //this._initialCards = items;
    this.renderer = renderer;
  }

  renderItems(dataCard) {
      dataCard.forEach(element => {
      this.renderer(element);
    })
  }

addItem(elementDom) {
  this._container.prepend(elementDom);
}
addItemAppend(elementDom) {
  this._container.append(elementDom);
}
}



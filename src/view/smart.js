import Abstract from "./abstract.js";

export default class Smart extends Abstract {
  constructor() {
    super();
    this._point = {};
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  updateData(update, justDataUpdate) {
    if (!update) {
      return;
    }

    this._point = Object.assign(
        {},
        this._point,
        update
    );

    if (justDataUpdate) {
      return;
    }

    this.updateElement();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }
}

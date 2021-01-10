import AbstractView from "./abstract.js";
import {HeaderItem} from "../const.js";

const createTripViewTemplate = () => {
  return `<header class="page-header">
            <div class="page-body__container  page-header__container">
              <img class="page-header__logo" src="img/logo.png" width="42" height="42" alt="Trip logo">
              <div class="trip-main">
                <div class="trip-main__trip-controls  trip-controls">
                  <div>
                    <h2 class="visually-hidden">Switch trip view</h2>
                    <nav class="trip-controls__trip-tabs  trip-tabs">
                      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-header-type="${HeaderItem.TABLE}">Table</a>
                      <a class="trip-tabs__btn" href="#" data-header-type="${HeaderItem.STATS}">Stats</a>
                    </nav>
                  </div>
                </div>
                <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" data-header-type="${HeaderItem.ADD_NEW_POINT}">New event</button>
              </div>
            </div>
          </header>`;
};

export default class TripViews extends AbstractView {
  constructor() {
    super();
    this._headerClickHandler = this._headerClickHandler.bind(this);
  }

  getTemplate() {
    return createTripViewTemplate();
  }

  _headerClickHandler(evt) {
    if (evt.target.dataset.headerType) {
      evt.preventDefault();
      this._callback.headerClick(evt.target.dataset.headerType);
    }
  }

  setHeaderClickHandler(callback) {
    this._callback.headerClick = callback;
    this.getElement().addEventListener(`click`, this._headerClickHandler);
  }

  setHeaderItem(menuItem) {
    const item = this.getElement().querySelector(`[dataset=${menuItem}]`);

    if (item !== null) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  }
}

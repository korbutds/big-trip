import AbstractView from "./abstract.js";

const createTripViewTemplate = () => {
  return `<header class="page-header">
            <div class="page-body__container  page-header__container">
              <img class="page-header__logo" src="img/logo.png" width="42" height="42" alt="Trip logo">
              <div class="trip-main">
                <div class="trip-main__trip-controls  trip-controls">
                  <div>
                    <h2 class="visually-hidden">Switch trip view</h2>
                    <nav class="trip-controls__trip-tabs  trip-tabs">
                      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
                      <a class="trip-tabs__btn" href="#">Stats</a>
                    </nav>
                  </div>
                </div>
                <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
              </div>
            </div>
          </header>`;
};

export default class TripViews extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createTripViewTemplate();
  }
}

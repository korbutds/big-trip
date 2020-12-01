import dayjs from "dayjs";
import {getDateDiff, createElement, getRandomInt} from "../utils.js";

const generateOffersList = (offersList) => {
  let str = ``;
  if (offersList.length > 0) {
    offersList.forEach((element) => {
      element.isChecked = Boolean(getRandomInt());
      str += element.isChecked ? `<li class="event__offer">
                <span class="event__offer-title">${element.name} &plus;&euro;&nbsp;</span>
                <span class="event__offer-price">${element.price}</span>
              </li>`
        : ``;
    });
  }
  return str;
};

const createTripPointTemplate = (point) => {
  const {times, type, destination, offers, isFavorite} = point;
  const offersCopy = Object.assign([], offers);
  const {iconSrc, name, price} = type;
  const {start, finish} = times;
  const favorite = isFavorite ? `event__favorite-btn--active` : ``;
  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${dayjs(start).format(`YYYY-MM-DD`)}">${dayjs(start).format(`MMM DD`)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="${iconSrc}" alt="Event type icon">
    </div>
    <h3 class="event__title">${name} ${destination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dayjs(start)}">${dayjs(start).format(`HH:mm`)}</time>
        &mdash;
        <time class="event__end-time" datetime="${dayjs(finish).format()}">${dayjs(finish).format(`HH:mm`)}</time>
      </p>
      <p class="event__duration">${getDateDiff(dayjs(start), dayjs(finish))}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${generateOffersList(offersCopy)}
    </ul>
    <button class="event__favorite-btn ${favorite}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

export default class TripPoint {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createTripPointTemplate(this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

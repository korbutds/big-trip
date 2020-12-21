import {nanoid} from "nanoid";
import dayjs from "dayjs";
import Smart from "../view/smart.js";
import {ROUTE_POINT_TYPES, OFFERS_LIST, DESTINATIONS_ARRAY} from "../const.js";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const generateDistDatalist = (arr) => {
  let str = ``;
  for (let i = 0; i < arr.length; i++) {
    str += `<option value='${arr[i]}'></option>`;
  }
  return str;
};

const generatePhoto = (photosList) => {
  let str = ``;
  if (photosList.length > 0) {
    photosList.forEach((element) => {
      str += `<img class="event__photo" src=${element} alt="Event photo"></img>`;
    });
  }
  return str;
};

const generateData = (start, finish, id) => {
  return `<div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${dayjs(start).format(`DD/MM/YY HH:mm`)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${dayjs(finish).format(`DD/MM/YY HH:mm`)}">
          </div>`;
};

const generateEventTypeList = (eventsObject, iconSrc, id, eventType) => {
  const eventsList = Object.keys(eventsObject);
  let events = ``;
  for (let i = 0; i < eventsList.length; i++) {
    events += `<div class="event__type-item">
                <input id="event-type-${eventsObject[eventsList[i]].name.toLowerCase()}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventsList[i]}" ${(eventType === eventsObject[eventsList[i]].name) ? `checked` : ``}>
                <label class="event__type-label  event__type-label--${eventsObject[eventsList[i]].name.toLowerCase()}" for="event-type-${eventsObject[eventsList[i]].name.toLowerCase()}-${id}">${eventsObject[eventsList[i]].name}</label>
              </div>`;
  }
  return `<div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src=${iconSrc} alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${events}
              </fieldset>
            </div>
          </div>`;
};

const generateOffersList = (arr, checkedArr) => {
  let str = ``;
  if (arr.length > 0) {
    str += `<section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">`;
    for (let i = 0; i < arr.length; i++) {
      let id = nanoid();
      str += `<div class="event__offer-selector">
                  <input class="event__offer-checkbox  visually-hidden" data-feature-name="${arr[i].offerKey}" id="event-offer-${arr[i][`id`]}-${id}" type="checkbox" name="event-offer-${arr[i][`id`]}" ${checkedArr.includes(arr[i]) ? `checked` : ``}>
                  <label class="event__offer-label" for="event-offer-${arr[i][`id`]}-${id}">
                    <span class="event__offer-title">${arr[i][`name`]}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${arr[i][`price`]}</span>
                  </label>
              </div>`;
    }
    str += `</div></section>`;
  }
  return str;
};

const createEditPointTemplate = (point = {}) => {
  const {times, type, destination, offers, description, photos, pointType: typeId} = point;
  const {iconSrc, name, price} = type;
  const offersList = ROUTE_POINT_TYPES[typeId].offers;
  const {start, finish} = times;
  let id = nanoid();
  const newPointList = DESTINATIONS_ARRAY.reduce((prev, curr) => {
    return [...prev, curr.name];
  }, []);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      ${generateEventTypeList(ROUTE_POINT_TYPES, iconSrc, id, name)}

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${id}">
          ${name}
        </label>
        <input class="event__input  event__input--destination" type="text" id="event-destination-${id}" name="event-destination" value="${destination}" list="destination-list-${id}" required>
        <datalist id="destination-list-${id}">
          ${generateDistDatalist(newPointList)}
        </datalist>
      </div>

      ${generateData(start, finish, id)}

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${generateOffersList(offersList, offers)}
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${generatePhoto(photos)}
          </div>
        </div>
      </section>
    </section>
  </form>
</li>`;
};

export default class EditPoint extends Smart {
  constructor(point = {}) {
    super();
    this._point = point;
    this._clickHandler = this._clickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._pointTypeChangeHandle = this._pointTypeChangeHandle.bind(this);
    this._pointDestinationHandle = this._pointDestinationHandle.bind(this);
    this._offersListChangeHandle = this._offersListChangeHandle.bind(this);

    this._setTypeChangeHandlers();
    this._setDestinationHandlers();
    this._setOffersChangeHandlers();
  }

  _clickHandler() {
    this._callback.click();
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submit(this._point);
  }

  getTemplate() {
    return createEditPointTemplate(this._point);
  }

  setEditClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickHandler);
  }

  setEditSubmitHandler(callback) {
    this._callback.submit = callback;
    this.getElement().querySelector(`.event--edit`).addEventListener(`submit`, this._submitHandler);
  }

  _pointTypeChangeHandle(evt) {
    evt.preventDefault();
    this.updateData({
      pointType: evt.target.value,
      type: ROUTE_POINT_TYPES[evt.target.value],
      offers: []
    });
  }

  _setTypeChangeHandlers() {
    this.getElement()
      .querySelectorAll(`.event__type-input`)
      .forEach((element) => element.addEventListener(`change`, this._pointTypeChangeHandle));
  }

  _pointDestinationHandle(evt) {
    evt.preventDefault();
    const destinationList = DESTINATIONS_ARRAY.reduce((acc, current) => {
      return [...acc, current.name];
    }, []);
    if (!destinationList.includes(evt.target.value)) {
      evt.target.setCustomValidity(`Данной точки маршрута не существует. Попробуйте выбрать из предложенного списка`);
    } else {
      evt.target.setCustomValidity(``);
      const destinationObject = DESTINATIONS_ARRAY.find((elem) => elem.name === evt.target.value);
      this.updateData({
        destination: destinationObject.name,
        description: destinationObject.description,
        photos: destinationObject.photos
      });
    }
    evt.target.reportValidity();
  }

  _setDestinationHandlers() {
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._pointDestinationHandle);
  }

  _offersListChangeHandle(evt) {
    const offers = this._point.offers.slice();
    if (evt.target.checked) {
      offers.push(OFFERS_LIST[evt.target.dataset.featureName]);
      this.updateData({
        offers
      }, true);
    } else {
      const featuresFiltred = offers.filter((feature) => feature.offerKey !== evt.target.dataset.featureName);
      this.updateData({
        offers: featuresFiltred
      }, true);
    }
  }

  _setOffersChangeHandlers() {
    this.getElement()
      .querySelectorAll(`.event__offer-checkbox`)
      .forEach((element) => element.addEventListener(`change`, this._offersListChangeHandle));
  }

  restoreHandlers() {
    this.setEditClickHandler(this._callback.click);
    this.setEditSubmitHandler(this._callback.submit);
    this._setTypeChangeHandlers();
    this._setOffersChangeHandlers();
    this._setDestinationHandlers();
  }

  reset(point) {
    this.updateData(point);
  }
}

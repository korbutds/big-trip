import {nanoid} from "nanoid";
import dayjs from "dayjs";
import {DESTINATIONS_ARRAY} from "../mock/point.js";
import {createElement} from "../utils.js";
import {ROUTE_POINT_TYPES} from "../const.js";

const generateDistDatalist = (arr) => {
  let str = ``;
  for (let i = 0; i < arr.length; i++) {
    str += `<option value='${arr[i]}'></option>`;
  }
  return str;
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
                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${arr[i][`id`]}-${id}" type="checkbox" name="event-offer-${arr[i][`id`]}" ${checkedArr.includes(arr[i]) ? `checked` : ``}>
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

const generatePhoto = (photosList) => {
  let str = ``;
  if (photosList.length > 0) {
    photosList.forEach((element) => {
      str += `<img class="event__photo" src=${element} alt="Event photo"></img>`;
    });
  }
  return str;
};

const createEditPointTemplate = (point = {}) => {
  const {times, type, destination, offers, description, photos, id: typeId} = point;
  const {iconSrc, name, price} = type;
  const offersList = ROUTE_POINT_TYPES[typeId].offers;
  const {start, finish} = times;
  let id = nanoid();
  const newPointList = DESTINATIONS_ARRAY.reduce((prev, curr) => {
    return [...prev, curr.name];
  }, [])
  .filter((element) => element !== destination);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src=${iconSrc} alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${destination}">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${id}">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-${id}">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-${id}">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-${id}">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-${id}">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-${id}">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-${id}">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${id}">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${id}">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${id}">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${name}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${generateDistDatalist(newPointList)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(start).format(`DD/MM/YY HH:mm`)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(finish).format(`DD/MM/YY HH:mm`)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
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

export default class EditPoint {
  constructor(point = {}) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createEditPointTemplate(this._point);
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

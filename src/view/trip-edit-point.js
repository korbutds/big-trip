import dayjs from "dayjs";
import Smart from "../view/smart.js";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";
import {getOffersListFromObject} from "./utils/offers.js";

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
    let images = ``;
    photosList.forEach((element) => {
      images += `<img class="event__photo" src="${element.src}" alt="${element.description}"></img>`;
    });
    str += `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${images};
    </div>
  </div>`;
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
  const checkedOffersKeys = checkedArr.reduce((acc, curr) => [...acc, curr.offerKey], []);
  let str = ``;
  if (arr.length > 0) {
    str += `<section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">`;
    for (let i = 0; i < arr.length; i++) {
      const isChecked = checkedOffersKeys.includes(arr[i].offerKey) ? true : false;
      str += `<div class="event__offer-selector">
                  <input class="event__offer-checkbox  visually-hidden" data-feature-name="${arr[i].offerKey}" id="event-offer-${arr[i][`id`]}" type="checkbox" name="event-offer-${arr[i][`id`]}" ${isChecked ? `checked` : ``}>
                  <label class="event__offer-label" for="event-offer-${arr[i][`id`]}">
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

const createEditPointTemplate = (point, destinationsArray, routePointTypes) => {
  const {id, times, type, destination, offers, description, photos, pointType: typeId, price} = point;
  const {iconSrc, name} = type;
  const offersList = routePointTypes[typeId].offers;
  const {start, finish} = times;
  const newPointList = destinationsArray.reduce((prev, curr) => {
    return [...prev, curr.name];
  }, []);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      ${generateEventTypeList(routePointTypes, iconSrc, id, name)}

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${id}">
          ${name}
        </label>
        <input class="event__input  event__input--destination" type="text" id="event-destination-${id}" name="event-destination" value="${destination ? destination : ``}" list="destination-list-${id}" required>
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
        <input class="event__input  event__input--price" id="event-price-${id}" type="number" min="0" name="event-price" value="${price}" required>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${generateOffersList(offersList, offers)}
      ${(description || photos) ?
    `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        ${generatePhoto(photos)}
      </section>` : ``}
    </section>
  </form>
</li>`;
};

export default class EditPoint extends Smart {
  constructor(point = [], offers, destinations) {
    super();
    this._point = point;
    this._destinations = destinations;
    this._offers = offers;

    this._datepickerStart = null;
    this._datepickerFinish = null;

    this._clickHandler = this._clickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._resetHandler = this._resetHandler.bind(this);
    this._pointTypeChangeHandle = this._pointTypeChangeHandle.bind(this);
    this._pointDestinationHandle = this._pointDestinationHandle.bind(this);
    this._offersListChangeHandle = this._offersListChangeHandle.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._costChangeHandle = this._costChangeHandle.bind(this);
    this._updateDate = this._updateDate.bind(this);

    this._setInnerHandlers();
    this._setDatePicker();
  }

  removeElement() {
    super.removeElement();

    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    if (this._datepickerFinish) {
      this._datepickerFinish.destroy();
      this._datepickerFinish = null;
    }
  }

  _clickHandler() {
    this._callback.click();
  }

  _resetHandler() {
    this._callback.reset(this._point);
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submit(this._point);
  }

  getTemplate() {
    return createEditPointTemplate(this._point, this._destinations, this._offers);
  }

  setEditClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickHandler);
  }

  setEditSubmitHandler(callback) {
    this._callback.submit = callback;
    this.getElement().querySelector(`.event--edit`).addEventListener(`submit`, this._submitHandler);
  }

  setResetClickHandler(callback) {
    this._callback.reset = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._resetHandler);
  }

  _pointTypeChangeHandle(evt) {
    evt.preventDefault();
    this.updateData({
      price: ``,
      pointType: evt.target.value,
      type: this._offers[evt.target.value],
      offers: []
    });
  }

  _setDatePicker() {
    if (this._datepicker) {
      this._datepickerStart.destroy();
      this._datepickerFinish.destroy();
      this._datepickerStart = null;
      this._datepickerFinish = null;
    }
    this._datepickerStart = flatpickr(
        this.getElement().querySelector(`[name="event-start-time"]`),
        {
          dateFormat: `d/m/y H:i`,
          enableTime: true,
          minDate: `today`,
          defaultDate: this._point.times.start,
          onChange: this._startDateChangeHandler
        }
    );

    this._datepickerFinish = flatpickr(
        this.getElement().querySelector(`[name="event-end-time"]`),
        {
          dateFormat: `d/m/y H:i`,
          enableTime: true,
          minDate: `today`,
          defaultDate: this._point.times.finish,
          onChange: this._endDateChangeHandler
        }
    );
  }

  _startDateChangeHandler([userTime]) {
    const startDate = Date.parse(userTime);

    if (startDate < this._point.times.finish) {
      this.updateData({
        times: {
          start: startDate,
          finish: this._point.times.finish
        }
      }, true);
    } else {
      this.updateData({
        times: {
          start: startDate,
          finish: startDate + 60000
        }
      }, true);
    }

    this.getElement()
        .removeEventListener(`click`, this._updateDate);
    this.getElement()
        .addEventListener(`click`, this._updateDate);
  }

  _endDateChangeHandler([userTime]) {
    const endDate = Date.parse(userTime);

    if (endDate < this._point.times.start) {
      this.updateData({
        times: {
          start: endDate - 60000,
          finish: endDate
        }
      }, true);
    } else {
      this.updateData({
        times: {
          start: this._point.times.start,
          finish: endDate
        }
      }, true);
    }

    this.getElement()
    .removeEventListener(`click`, this._updateDate);
    this.getElement()
    .addEventListener(`click`, this._updateDate);
  }

  _updateDate(evt) {
    if (evt.target.classList.contains(`flatpickr-calendar`)) {
      return;
    }
    this.updateElement();
  }

  _pointDestinationHandle(evt) {
    evt.preventDefault();
    const destinationList = this._destinations.reduce((acc, current) => {
      return [...acc, current.name];
    }, []);
    if (!destinationList.includes(evt.target.value)) {
      evt.target.setCustomValidity(`Данной точки маршрута не существует. Попробуйте выбрать из предложенного списка`);
    } else {
      evt.target.setCustomValidity(``);
      const destinationObject = this._destinations.find((elem) => elem.name === evt.target.value);
      this.updateData({
        destination: destinationObject.name,
        description: destinationObject.description,
        photos: destinationObject.photos
      });
    }
    evt.target.reportValidity();
  }

  _costChangeHandle(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value,
    }, true);
  }

  _offersListChangeHandle(evt) {
    const pointOffers = this._point.offers.slice();
    const availableOffers = this._offers[this._point.pointType].offers;
    if (evt.target.checked) {
      pointOffers.push(getOffersListFromObject(availableOffers)[evt.target.dataset.featureName]);
      this.updateData({
        offers: pointOffers
      }, true);
    } else {
      const featuresFiltred = pointOffers.filter((feature) => feature.offerKey !== evt.target.dataset.featureName);
      this.updateData({
        offers: featuresFiltred
      }, true);
    }
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelectorAll(`.event__type-input`)
      .forEach((element) => element.addEventListener(`change`, this._pointTypeChangeHandle));
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._pointDestinationHandle);
    this.getElement()
      .querySelectorAll(`.event__offer-checkbox`)
      .forEach((element) => element.addEventListener(`change`, this._offersListChangeHandle));
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`change`, this._costChangeHandle);
  }

  restoreHandlers() {
    this.setEditClickHandler(this._callback.click);
    this.setEditSubmitHandler(this._callback.submit);
    this.setResetClickHandler(this._callback.reset);
    this._setInnerHandlers();
    this._setDatePicker();
  }

  reset(point) {
    this.updateData(point);
  }
}

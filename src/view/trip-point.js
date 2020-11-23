import dayjs from "dayjs";

const addZeroToNumber = (number) => {
  return (number < 10) ? `0${number}` : number;
};

const getRandomInt = (min = 0, max = 1) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (arr) => {
  return arr[getRandomInt(0, arr.length - 1)];
};

const getDateDiff = (start, finish) => {
  const diffTimeInMs = finish.diff(start);
  const timeDuration = dayjs.duration(diffTimeInMs);
  const days = timeDuration.days();
  const hours = timeDuration.hours();
  const minutes = timeDuration.minutes();
  const time = `${(days > 0) ? addZeroToNumber(days) + `D ` : ``}${(hours > 0) ? addZeroToNumber(hours) + `H ` : ``}${(minutes > 0) ? addZeroToNumber(minutes) + `M` : ``}`;
  return time;
};

export const createTripPointTemplate = (point) => {
  const {times, type, pointDestination, offers} = point;
  const {iconSrc, name} = type;
  const {start, finish} = times;
  const randomOffer = (offers.length > 0) ? getRandomArrayElement(offers) : ``;
  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${dayjs(start).format(`YYYY-MM-DD`)}">${dayjs(start).format(`MMM DD`)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="${iconSrc}" alt="Event type icon">
    </div>
    <h3 class="event__title">${name} ${pointDestination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dayjs(start)}">${dayjs(start).format(`HH:mm`)}</time>
        &mdash;
        <time class="event__end-time" datetime="${dayjs(finish).format()}">${dayjs(finish).format(`HH:mm`)}</time>
      </p>
      <p class="event__duration">${getDateDiff(dayjs(start), dayjs(finish))}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">20</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      <li class="event__offer">
        <span class="event__offer-title">${(offers.length > 0) ? randomOffer.name + ` &plus;&euro;&nbsp; ` : ``}</span>
        <span class="event__offer-price">${(offers.length > 0) ? randomOffer.price : ``}</span>
      </li>
    </ul>
    <button class="event__favorite-btn event__favorite-btn--active" type="button">
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

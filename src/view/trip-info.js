import dayjs from "dayjs";
import AbstractView from "../view/abstract.js";

const getDestinationString = (destinations) => {
  let str = ``;
  if (destinations.length > 3) {
    str = `${destinations[0]} &mdash; . . . &mdash; ${destinations[destinations.length - 1]}`;
  } else if (destinations.length === 3) {
    str = `${destinations[0]} &mdash; ${destinations[1]} &mdash; ${destinations[2]}`;
  } else if (destinations.length === 2) {
    str = `${destinations[0]} &mdash; ${destinations[1]}`;
  } else if (destinations.length === 1) {
    str = `${destinations[0]}`;
  }
  return str;
};

const dateString = (start, finish) => {
  return (dayjs(start).format(`MMM`) === dayjs(finish).format(`MMM`)) ? `${dayjs(start).format(`MMM DD`)} &mdash; ${dayjs(finish).format(`DD`)}` : `${dayjs(start).format(`MMM DD`)} &mdash; ${dayjs(finish).format(`MMM DD`)}`;
};

const createTripInfoTemplate = (points) => {
  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];
  const start = firstPoint[`times`][`start`];
  const finish = lastPoint[`times`][`start`];
  const destinations = points.reduce((prev, current) => {
    return [...prev, current.destination];
  }, []);
  const pointsCost = points.reduce((prev, current) => prev + current.price, 0);
  const offersPrice = points.reduce((prev, current) => {
    const currentOffersPrice = current.offers.reduce((acc, offerPrice) => acc + offerPrice.price, 0);
    return prev + currentOffersPrice;
  }, 0);
  const fullTripCost = pointsCost + offersPrice;
  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getDestinationString(destinations)}</h1>

      <p class="trip-info__dates">${dateString(start, finish)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${fullTripCost}</span>
    </p>
  </section>`;
};

export default class TripInfo extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
  }
}

import dayjs from "dayjs";

const getDestinationString = (destinations) => {
  let str = ``;
  destinations = [...new Set(destinations)];
  if (destinations.length - 1 > 3) {
    str = `${destinations[0]} &mdash; . . . &mdash; ${destinations[destinations.length - 1]}`;
  } else if (destinations.length - 1 === 3) {
    str = `${destinations[0]} &mdash; ${destinations[1]} &mdash; ${destinations[2]}`;
  } else if (destinations.length - 1 === 2) {
    str = `${destinations[0]} &mdash; ${destinations[1]}`;
  } else if (destinations.length - 1 === 1) {
    str = `${destinations[0]}`;
  }
  return str;
};

const dateString = (start, finish) => {
  return (dayjs(start).format(`MMM`) === dayjs(finish).format(`MMM`)) ? `${dayjs(start).format(`MMM DD`)} &mdash; ${dayjs(finish).format(`DD`)}` : `${dayjs(start).format(`MMM DD`)} &mdash; ${dayjs(finish).format(`MMM DD`)}`;
};

export const createAboutTripTemplate = (points) => {
  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];
  const start = firstPoint[`times`][`start`];
  const finish = lastPoint[`times`][`start`];
  const destinations = points.reduce((prev, current) => {
    return [...prev, current.destination];
  }, []);
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${getDestinationString(destinations)}</h1>

    <p class="trip-info__dates">${dateString(start, finish)}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
  </p>
</section>`;
};

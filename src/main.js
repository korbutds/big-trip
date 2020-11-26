import {createAboutTripTemplate} from "./view/trip-info.js";
import {createTripFiltersTemplate} from "./view/trip-filters.js";
import {createTripSortTemplate} from "./view/trip-sort.js";
import {createTripListTemplate} from "./view/trip-list.js";
import {creatNewPointTemplate} from "./view/trip-new-point.js";
import {createEditPointTemplate} from "./view/trip-edit-point.js";
import {createTripPointTemplate} from "./view/trip-point.js";
import {generatePoint} from "./mock/point.js";

const POINT_COUNT = 20;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const render = (container, content, position) => {
  container.insertAdjacentHTML(position, content);
};

const pageHeader = document.querySelector(`.page-header`);
const tripMainElement = pageHeader.querySelector(`.trip-main`);
const tripControlsElement = pageHeader.querySelector(`.trip-main__trip-controls`);
const pageMain = document.querySelector(`.page-body__page-main`);
const tripEventsSection = pageMain.querySelector(`.trip-events`);

render(tripMainElement, createAboutTripTemplate(points), `afterbegin`);
render(tripControlsElement, createTripFiltersTemplate(), `afterbegin`);
render(tripEventsSection, createTripSortTemplate(), `beforeend`);
render(tripEventsSection, createTripListTemplate(), `beforeend`);

const tripList = tripEventsSection.querySelector(`.trip-events__list`);
render(tripList, creatNewPointTemplate(points[points.length - 1]), `beforeend`);
render(tripList, createEditPointTemplate(points[0]), `beforeend`);

for (let i = 1; i < POINT_COUNT - 1; i++) {
  render(tripList, createTripPointTemplate(points[i]), `beforeend`);
}

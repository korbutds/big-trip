import {createAboutTripTemplate} from "./view/trip-info.js";
import {createTripFiltersTemplate} from "./view/trip-filters.js";
import {createTripSortTemplate} from "./view/trip-sort.js";
import {createTripListTemplate} from "./view/trip-list.js";
import {creatNewPointTemplate} from "./view/trip-new-point.js";
import {createEditPointTemplate} from "./view/trip-edit-point.js";
import {createTripPointTemplate} from "./view/trip-point.js";
import {generatePoint} from "./mock/point.js";
import {renderTemplate} from "./utils.js";

const POINT_COUNT = 20;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const pageHeader = document.querySelector(`.page-header`);
const tripMainElement = pageHeader.querySelector(`.trip-main`);
const tripControlsElement = pageHeader.querySelector(`.trip-main__trip-controls`);
const pageMain = document.querySelector(`.page-body__page-main`);
const tripEventsSection = pageMain.querySelector(`.trip-events`);

renderTemplate(tripMainElement, createAboutTripTemplate(points), `afterbegin`);
renderTemplate(tripControlsElement, createTripFiltersTemplate(), `afterbegin`);
renderTemplate(tripEventsSection, createTripSortTemplate(), `beforeend`);
renderTemplate(tripEventsSection, createTripListTemplate(), `beforeend`);

const tripList = tripEventsSection.querySelector(`.trip-events__list`);
renderTemplate(tripList, creatNewPointTemplate(points[points.length - 1]), `beforeend`);
renderTemplate(tripList, createEditPointTemplate(points[0]), `beforeend`);

for (let i = 1; i < POINT_COUNT - 1; i++) {
  renderTemplate(tripList, createTripPointTemplate(points[i]), `beforeend`);
}

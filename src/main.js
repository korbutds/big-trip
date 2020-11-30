import TripInfo from "./view/trip-info.js";
import FilterMenu from "./view/trip-filters.js";
import TripSort from "./view/trip-sort.js";
import TripList from "./view/trip-list.js";
import TripPointEdit from "./view/trip-edit-point.js";
// import {creatNewPointTemplate} from "./view/trip-new-point.js";
import TripPoint from "./view/trip-point.js";
import {generatePoint} from "./mock/point.js";
import {RenderPosition, render} from "./utils.js";

const POINT_COUNT = 20;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const pageHeader = document.querySelector(`.page-header`);
const tripMainElement = pageHeader.querySelector(`.trip-main`);
const tripControlsElement = pageHeader.querySelector(`.trip-main__trip-controls`);
const pageMain = document.querySelector(`.page-body__page-main`);
const tripEventsSection = pageMain.querySelector(`.trip-events`);

render(tripMainElement, new TripInfo(points).getElement(), RenderPosition.AFTERBEGIN);
render(tripControlsElement, new FilterMenu().getElement(), RenderPosition.AFTERBEGIN);
render(tripEventsSection, new TripSort().getElement(), RenderPosition.BEFOREBEGIN);
const tripBoard = new TripList();
render(tripEventsSection, tripBoard.getElement(), RenderPosition.BEFOREBEGIN);
render(tripBoard.getElement(), new TripPointEdit(points[0]).getElement(), RenderPosition.BEFOREBEGIN);
for (let i = 1; i < POINT_COUNT - 1; i++) {
  render(tripBoard.getElement(), new TripPoint(points[i]).getElement(), RenderPosition.BEFOREBEGIN);
}


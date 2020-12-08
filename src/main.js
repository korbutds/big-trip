import TripInfo from "./view/trip-info.js";
import TripEmpty from "./view/trip-empty.js";
import FilterMenu from "./view/trip-filters.js";
import TripSort from "./view/trip-sort.js";
import TripBoard from "./view/trip-board.js";
import TripPointEdit from "./view/trip-edit-point.js";
import TripPoint from "./view/trip-point.js";
import {generatePoint} from "./mock/point.js";
import {render, replace, RenderPosition} from "./view/utils/render.js";
import {Keys} from "./const.js";

const POINT_COUNT = 20;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const pageHeader = document.querySelector(`.page-header`);
const tripMainElement = pageHeader.querySelector(`.trip-main`);
const tripControlsElement = pageHeader.querySelector(`.trip-main__trip-controls`);
const pageMain = document.querySelector(`.page-body__page-main`);
const tripEventsSection = pageMain.querySelector(`.trip-events`);

const renderPoint = (pointContainer, point) => {
  const pointComponent = new TripPoint(point);
  const pointEditComponent = new TripPointEdit(point);

  pointComponent.setEditClickHandler(() => {
    replace(pointEditComponent, pointComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  pointEditComponent.setEditClickHandler(() => {
    replace(pointComponent, pointEditComponent);
  });

  pointEditComponent.setEditSubmitHandler(() => {
    replace(pointComponent, pointEditComponent);
  });

  const onEscKeyDown = (evt) => {
    if (evt.key === Keys.ESCAPE[0] || evt.key === Keys.ESCAPE[1]) {
      evt.preventDefault();
      replace(pointComponent, pointEditComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  render(pointContainer, pointComponent, RenderPosition.BEFOREBEGIN);
};

render(tripControlsElement, new FilterMenu(), RenderPosition.AFTERBEGIN);

if (points.length === 0) {
  render(tripEventsSection, new TripEmpty(), RenderPosition.AFTERBEGIN);
  document.querySelectorAll(`.trip-filters__filter-input`).forEach((element) => {
    element.disabled = true;
  });
} else {
  render(tripMainElement, new TripInfo(points), RenderPosition.AFTERBEGIN);
  render(tripEventsSection, new TripSort(), RenderPosition.BEFOREBEGIN);
  const tripBoard = new TripBoard();
  render(tripEventsSection, tripBoard, RenderPosition.BEFOREBEGIN);
  for (let i = 0; i < POINT_COUNT; i++) {
    renderPoint(tripBoard, points[i]);
  }
}

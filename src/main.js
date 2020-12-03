import TripInfo from "./view/trip-info.js";
import TripEmpty from "./view/trip-empty.js";
import FilterMenu from "./view/trip-filters.js";
import TripSort from "./view/trip-sort.js";
import TripList from "./view/trip-list.js";
import TripPointEdit from "./view/trip-edit-point.js";
import TripPoint from "./view/trip-point.js";
import {generatePoint} from "./mock/point.js";
import {RenderPosition} from "./view/utils/points.js";
import {render} from "./view/utils/render.js";
import {Keys} from "./const.js";
import Abstract from "./view/abstract.js";

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

  if (pointContainer instanceof Abstract) {
    pointContainer = pointContainer.getElement();
  }

  const replaceCardToForm = () => {
    pointContainer.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const replaceFormToCard = () => {
    pointContainer.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  pointComponent.setEditClickHandler(replaceCardToForm);

  pointEditComponent.setEditClickHandler(replaceFormToCard);

  pointEditComponent.setEditSubmitHandler(replaceFormToCard);

  const onEscKeyDown = (evt) => {
    if (evt.key === Keys.ESCAPE[0] || evt.key === Keys.ESCAPE[1]) {
      evt.preventDefault();
      replaceFormToCard();
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
  const tripBoard = new TripList();
  render(tripEventsSection, tripBoard, RenderPosition.BEFOREBEGIN);
  for (let i = 0; i < POINT_COUNT; i++) {
    renderPoint(tripBoard, points[i]);
  }
}

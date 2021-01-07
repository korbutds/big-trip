import {generatePoint} from "./mock/point.js";
import Trip from "./presenter/trip.js";
import Filter from "./presenter/filter.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition} from "./view/utils/render.js";
import TripView from "./view/trip-view.js";
import {FilterType, HeaderItem, UpdateType} from "./const.js";

const POINT_COUNT = 22;

const pageBody = document.querySelector(`.page-body`);
const pageMain = pageBody.querySelector(`.page-body__page-main`);
const tripEventsSection = pageMain.querySelector(`.trip-events`);

const points = new Array(POINT_COUNT).fill().map(generatePoint);
const pointsModel = new PointsModel();
pointsModel.setPoints(points);
const headerComponent = new TripView();

render(pageBody, headerComponent, RenderPosition.AFTERBEGIN);

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-main__trip-controls`);

const filterModel = new FilterModel();
const tripPresenter = new Trip(tripEventsSection, pointsModel, filterModel);
const filterPresenter = new Filter(tripControls, filterModel);

const handlePointNewFormClose = () => {
  headerComponent.getElement().querySelector(`[data-header-type=${HeaderItem.TABLE}]`)
                 .classList.add(`trip-tabs__btn--active`);
};

const handleHeaderMenuClick = (headerItem) => {
  switch (headerItem) {
    case HeaderItem.ADD_NEW_POINT:
      // Скрыть статистику
      // Показать доску
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPresenter.init();
      tripPresenter.createPoint(handlePointNewFormClose);
      headerComponent.getElement().querySelector(`[data-header-type=${HeaderItem.TABLE}]`)
                     .classList.remove(`trip-tabs__btn--active`);
      break;
    case HeaderItem.TABLE:
      tripPresenter.destroy();
      tripPresenter.init();
      headerComponent.getElement().querySelector(`[data-header-type=${HeaderItem.TABLE}]`)
                     .classList.add(`trip-tabs__btn--active`);
      headerComponent.getElement().querySelector(`[data-header-type=${HeaderItem.STATS}]`)
                     .classList.remove(`trip-tabs__btn--active`);

      break;
    case HeaderItem.STATS:
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPresenter.renderTripInfo();
      headerComponent.getElement().querySelector(`[data-header-type=${HeaderItem.TABLE}]`)
                     .classList.remove(`trip-tabs__btn--active`);
      headerComponent.getElement().querySelector(`[data-header-type=${HeaderItem.STATS}]`)
                     .classList.add(`trip-tabs__btn--active`);
      break;
  }
};

headerComponent.setHeaderClickHandler(handleHeaderMenuClick);

filterPresenter.init();
tripPresenter.init();


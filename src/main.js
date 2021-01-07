import {generatePoint} from "./mock/point.js";
import Trip from "./presenter/trip.js";
import Filter from "./presenter/filter.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition} from "./view/utils/render.js";
import TripView from "./view/trip-view.js";
import {HeaderItem} from "./const.js";

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
      tripPresenter.createPoint(handlePointNewFormClose);
      headerComponent.getElement().querySelector(`[data-header-type=${HeaderItem.TABLE}]`)
                     .classList.remove(`trip-tabs__btn--active`);
      // Показать форму добавления новой задачи
      // Убрать выделение с ADD NEW TASK после сохранения
      break;
    case HeaderItem.TABLE:
      // Показать доску
      // Скрыть статистику
      break;
    case HeaderItem.STATS:
      // Скрыть доску
      // Показать статистику
      break;
  }
};

headerComponent.setHeaderClickHandler(handleHeaderMenuClick);

filterPresenter.init();
tripPresenter.init();


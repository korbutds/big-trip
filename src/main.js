import Trip from "./presenter/trip.js";
import Filter from "./presenter/filter.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import {remove, render, RenderPosition} from "./view/utils/render.js";
import TripView from "./view/trip-view.js";
import {FilterType, HeaderItem, UpdateType} from "./const.js";
import StatisticView from "./view/trip-statistic.js";
import Api from "./api.js";

const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;
const AUTHORIZATION = `Basic j4VEMYWTVT-1dxQ9p5W88`;

const pageBody = document.querySelector(`.page-body`);
const pageMain = pageBody.querySelector(`.page-body__page-main`);
const pageContainer = pageMain.querySelector(`.page-body__container`);
const tripEventsSection = pageMain.querySelector(`.trip-events`);

const api = new Api(END_POINT, AUTHORIZATION);

const headerComponent = new TripView();

render(pageBody, headerComponent, RenderPosition.AFTERBEGIN);

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-main__trip-controls`);
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const pointsModel = new PointsModel(offersModel);
const filterModel = new FilterModel();
const tripPresenter = new Trip(tripEventsSection, pointsModel, destinationsModel, offersModel, filterModel, api);
const filterPresenter = new Filter(tripControls, filterModel);

const handlePointNewFormClose = () => {
  headerComponent.getElement().querySelector(`[data-header-type=${HeaderItem.TABLE}]`)
                 .classList.add(`trip-tabs__btn--active`);
};

let statisticComponent = null;

const handleHeaderMenuClick = (headerItem) => {
  switch (headerItem) {
    case HeaderItem.ADD_NEW_POINT:
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPresenter.init();
      remove(statisticComponent);
      tripPresenter.createPoint(handlePointNewFormClose);
      headerComponent.getElement().querySelector(`[data-header-type=${HeaderItem.TABLE}]`)
                     .classList.remove(`trip-tabs__btn--active`);
      headerComponent.getElement().querySelector(`[data-header-type=${HeaderItem.STATS}]`)
                     .classList.remove(`trip-tabs__btn--active`);
      break;
    case HeaderItem.TABLE:
      tripPresenter.destroy();
      tripPresenter.init();
      remove(statisticComponent);
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
      statisticComponent = new StatisticView(pointsModel.getPoints());
      render(pageContainer, statisticComponent, RenderPosition.BEFOREBEGIN);
      break;
  }
};


filterPresenter.init();
tripPresenter.init();


Promise.all([
  api.getOffers(),
  api.getDestinations(),
  api.getPoints(),
])
  .then(([offersArray, destinationsArray, pointsArray]) => {
    offersModel.setOffers(offersArray);
    destinationsModel.setDestinations(destinationsArray);
    pointsModel.setPoints(UpdateType.INIT, pointsArray);
    headerComponent.setHeaderClickHandler(handleHeaderMenuClick);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    headerComponent.setHeaderClickHandler(handleHeaderMenuClick);
  });

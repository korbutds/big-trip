import Trip from "./presenter/trip.js";
import Filter from "./presenter/filter.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import {remove, render, RenderPosition} from "./view/utils/render.js";
import TripView from "./view/trip-view.js";
import {FilterType, HeaderItem, UpdateType} from "./const.js";
import StatisticView from "./view/trip-statistic.js";
import Api from "./api.js";
import {toCamelCase} from "./view/utils/points.js";

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

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const tripPresenter = new Trip(tripEventsSection, pointsModel, filterModel);
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

headerComponent.setHeaderClickHandler(handleHeaderMenuClick);

filterPresenter.init();
tripPresenter.init();


Promise.all([
  api.getPoints(),
  api.getOffers(),
  api.getDestinations()
])
  .then(([pointsArray, offersArray, destinationsArray]) => {
    const localDestinations = destinationsArray.map((destination) => {
      return pointsModel.adaptDestinationToClient(destination);
    });
    const localOffers = {};
    offersArray.forEach((offer) => {
      localOffers[toCamelCase(offer.type)] = pointsModel.adaptOfferToClient(offer);
    }, {});

    pointsModel.setOffers(localOffers);
    pointsModel.setDestinations(localDestinations);

    const localPoints = pointsArray.map((point) => {
      return pointsModel.adaptPointsToClient(point);
    });

    pointsModel.setPoints(UpdateType.INIT, localPoints);
  })
  .catch((reject) => {
    console.log(reject)
    pointsModel.setPoints(UpdateType.INIT, []);
  });

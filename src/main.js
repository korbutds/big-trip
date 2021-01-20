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
import Api from "./api/api.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";
import {isOnline} from "./view/utils/common.js";
import {toast} from "./view/utils/toast/toast.js";

const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;
const AUTHORIZATION = `Basic j4VEMY12TVT-1dreQ9p9W4s8`;
const STORAGE_TYPE = window.localStorage;
const STORE_KEY_TYPE = {
  POINTS: `points`,
  OFFERS: `offers`,
  DESTINATIONS: `destinations`
};
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v1`;
const POINTS_STORE_NAME = `${STORE_PREFIX}-${STORE_KEY_TYPE.POINTS}-${STORE_VER}`;
const OFFERS_STORE_NAME = `${STORE_PREFIX}-${STORE_KEY_TYPE.OFFERS}-${STORE_VER}`;
const DESTINATIONS_STORE_NAME = `${STORE_PREFIX}-${STORE_KEY_TYPE.DESTINATIONS}-${STORE_VER}`;

const pageBody = document.querySelector(`.page-body`);
const pageMain = pageBody.querySelector(`.page-body__page-main`);
const pageContainer = pageMain.querySelector(`.page-body__container`);
const tripEventsSection = pageMain.querySelector(`.trip-events`);

const pointsStore = new Store(POINTS_STORE_NAME, STORAGE_TYPE);
const offersStore = new Store(OFFERS_STORE_NAME, STORAGE_TYPE);
const destinationsStore = new Store(DESTINATIONS_STORE_NAME, STORAGE_TYPE);

const api = new Api(END_POINT, AUTHORIZATION);
const apiWithProvider = new Provider(api, pointsStore, offersStore, destinationsStore);

const headerComponent = new TripView();

render(pageBody, headerComponent, RenderPosition.AFTERBEGIN);

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-main__trip-controls`);
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const pointsModel = new PointsModel(offersModel);
const filterModel = new FilterModel();
const tripPresenter = new Trip(tripEventsSection, pointsModel, destinationsModel, offersModel, filterModel, apiWithProvider);
const filterPresenter = new Filter(tripControls, filterModel, pointsModel);

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
      if (!isOnline()) {
        toast(`You can't create new point offline`);
        break;
      }
      tripPresenter.createPoint(handlePointNewFormClose);
      headerComponent.getElement().querySelector(`[data-header-type=${HeaderItem.TABLE}]`)
                     .classList.remove(`trip-tabs__btn--active`);
      headerComponent.getElement().querySelector(`[data-header-type=${HeaderItem.STATS}]`)
                     .classList.remove(`trip-tabs__btn--active`);
      // headerComponent.getElement().querySelector(`[data-header-type=${HeaderItem.ADD_NEW_POINT}]`).disabled = true;
      break;
    case HeaderItem.TABLE:
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
      tripPresenter.init();
      remove(statisticComponent);
      headerComponent.getElement().querySelector(`[data-header-type=${HeaderItem.TABLE}]`)
                     .classList.add(`trip-tabs__btn--active`);
      headerComponent.getElement().querySelector(`[data-header-type=${HeaderItem.STATS}]`)
                     .classList.remove(`trip-tabs__btn--active`);
      headerComponent.getElement().querySelector(`[data-header-type=${HeaderItem.ADD_NEW_POINT}]`).disabled = false;

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


// filterPresenter.init();
tripPresenter.init();


Promise.all([
  apiWithProvider.getOffers(),
  apiWithProvider.getDestinations(),
  apiWithProvider.getPoints(),
])
  .then(([offersArray, destinationsArray, pointsArray]) => {
    offersModel.setOffers(offersArray);
    destinationsModel.setDestinations(destinationsArray);
    pointsModel.setPoints(UpdateType.INIT, pointsArray);
    headerComponent.setHeaderClickHandler(handleHeaderMenuClick);
    filterPresenter.init();

  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    headerComponent.setHeaderClickHandler(handleHeaderMenuClick);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});

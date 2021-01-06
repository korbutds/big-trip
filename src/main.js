import {generatePoint} from "./mock/point.js";
import Trip from "./presenter/trip.js";
import Filter from "./presenter/filter.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition} from "./view/utils/render.js";
import TripView from "./view/trip-view.js";

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
filterPresenter.init();
tripPresenter.init();

tripMain.querySelector(`.trip-main__event-add-btn`)
        .addEventListener(`click`, (evt) => {
          evt.preventDefault();
          tripPresenter.createTask();
        });

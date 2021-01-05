import {generatePoint} from "./mock/point.js";
import Trip from "./presenter/trip.js";
import Filter from "./presenter/filter.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition} from "./view/utils/render.js";
import TripViews from "./view/trip-view.js";

const POINT_COUNT = 22;

const pageMain = document.querySelector(`.page-body__page-main`);
const tripEventsSection = pageMain.querySelector(`.trip-events`);
const tripControls = document.querySelector(`.trip-main__trip-controls`);

const points = new Array(POINT_COUNT).fill().map(generatePoint);
const pointsModel = new PointsModel();
pointsModel.setPoints(points);

render(tripControls, new TripViews(), RenderPosition.BEFOREBEGIN);

const filterModel = new FilterModel();
const filterPresenter = new Filter(tripControls, filterModel);
const tripPresenter = new Trip(tripEventsSection, pointsModel);
filterPresenter.init();
tripPresenter.init();

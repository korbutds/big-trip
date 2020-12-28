import {generatePoint} from "./mock/point.js";
import Trip from "./presenter/trip.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";

const POINT_COUNT = 3;

const pageMain = document.querySelector(`.page-body__page-main`);
const tripEventsSection = pageMain.querySelector(`.trip-events`);

const points = new Array(POINT_COUNT).fill().map(generatePoint);
const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const tripPresenter = new Trip(tripEventsSection, pointsModel);
tripPresenter.init();

// import TripPoint from "../view/trip-point.js";
// import TripPointEdit from "../view/trip-edit-point.js";
import FilterMenu from "../view/trip-filters.js";
import TripEmpty from "../view/trip-empty.js";
import TripInfo from "../view/trip-info.js";
import TripSort from "../view/trip-sort.js";
import TripBoard from "../view/trip-board.js";
import {render, RenderPosition} from "../view/utils/render.js";
import Point from "./point.js";

export default class Trip {
  constructor(tripListContainer) {
    this._tripListContainer = tripListContainer;

    this._header = document.querySelector(`.page-header`);
    this._tripControlsContainer = this._header.querySelector(`.trip-main__trip-controls`);
    this._tripInfoContainer = this._header.querySelector(`.trip-main`);
    this._filterComponent = new FilterMenu();
    this._emptyComponent = new TripEmpty();
    this._sortComponent = new TripSort();
    this._boardComponent = new TripBoard();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._renderFilters();
    this._renderTrip();
  }

  _renderPoint(point) {
    const pointPresenter = new Point(this._boardComponent);
    pointPresenter.init(point);
  }

  _renderPoints() {
    for (let i = 0; i < this._tripPoints.length; i++) {
      this._renderPoint(this._tripPoints[i]);
    }
  }

  _renderFilters() {
    render(this._tripControlsContainer, this._filterComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEmptyTrip() {
    render(this._tripListContainer, this._emptyComponent, RenderPosition.AFTERBEGIN);
  }

  _renderInfo() {
    render(this._tripInfoContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._tripListContainer, this._sortComponent, RenderPosition.BEFOREBEGIN);
  }

  _renderTripBoard() {
    render(this._tripListContainer, this._boardComponent, RenderPosition.BEFOREBEGIN);
    this._renderPoints();

  }

  _renderTrip() {
    this._infoComponent = new TripInfo(this._tripPoints);
    if (this._tripPoints.length === 0) {
      this._renderEmptyTrip();
      document.querySelectorAll(`.trip-filters__filter-input`).forEach((element) => {
        element.disabled = true;
      });
    } else {
      this._renderInfo();
      this._renderSort();
      this._renderTripBoard();
    }
  }
}

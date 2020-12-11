// import TripPoint from "../view/trip-point.js";
// import TripPointEdit from "../view/trip-edit-point.js";
import FilterMenu from "../view/trip-filters.js";
import TripEmpty from "../view/trip-empty.js";
import TripInfo from "../view/trip-info.js";
import TripSort from "../view/trip-sort.js";
import TripBoard from "../view/trip-board.js";
import {render, RenderPosition} from "../view/utils/render.js";
import Point from "./point.js";
import {updateItem} from "../view/utils/common.js";
import {sortPointPriceToUp, sortPointTimeToUp} from "../view/utils/points.js";
import {SortType} from "../const.js";

export default class Trip {
  constructor(tripListContainer) {
    this._tripListContainer = tripListContainer;

    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._header = document.querySelector(`.page-header`);
    this._tripControlsContainer = this._header.querySelector(`.trip-main__trip-controls`);
    this._tripInfoContainer = this._header.querySelector(`.trip-main`);

    this._filterComponent = new FilterMenu();
    this._emptyComponent = new TripEmpty();
    this._sortComponent = new TripSort();
    this._boardComponent = new TripBoard();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    console.log(tripPoints, `Исходный`)
    console.log(this._tripPoints, `Исходный слайс`)
    this._sourcedTripPoints = tripPoints.slice();

    this._renderFilters();
    this._renderTrip();
  }

  _sortPoint(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        console.log(this._tripPoints);
        this._tripPoints.sort(sortPointPriceToUp);
        console.log(this._tripPoints);
        break;
      case SortType.TIME:
        console.log(this._tripPoints);
        this._tripPoints.sort(sortPointTimeToUp);
        console.log(this._tripPoints);
        break;
      case SortType.DAY:
        console.log(this._tripPoints);
        this._tripPoints = this._sourcedTripPoints.slice();
        console.log(this._tripPoints);
        break;
    }
    this._currentSortType = sortType;
  }

  _renderPoint(point) {
    const pointPresenter = new Point(this._boardComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _clearTrip() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortPoint(sortType);
    this._clearTrip();
    this._renderPoints();
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
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTripBoard() {
    render(this._tripListContainer, this._boardComponent, RenderPosition.BEFOREBEGIN);
    this._renderPoints();

  }

  _renderTrip() {
    this._infoComponent = new TripInfo(this._tripPoints);
    if (this._tripPoints.length === 0) {
      this._renderEmptyTrip();
      this._filterComponent.disableElement();
    } else {
      this._renderInfo();
      this._renderSort();
      this._renderTripBoard();
    }
  }
}

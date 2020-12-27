// import TripPoint from "../view/trip-point.js";
// import TripPointEdit from "../view/trip-edit-point.js";
import FilterMenu from "../view/trip-filters.js";
import TripEmpty from "../view/trip-empty.js";
import TripInfo from "../view/trip-info.js";
import TripSort from "../view/trip-sort.js";
import TripBoard from "../view/trip-board.js";
import {remove, render, RenderPosition} from "../view/utils/render.js";
import Point from "./point.js";
import {sortPointPriceToUp, sortPointTimeToUp} from "../view/utils/points.js";
import {SortType, UpdateType, UserAction} from "../const.js";

export default class Trip {
  constructor(tripListContainer, pointsModel) {
    this._tripListContainer = tripListContainer;
    this._pointsModel = pointsModel;

    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._header = document.querySelector(`.page-header`);
    this._tripControlsContainer = this._header.querySelector(`.trip-main__trip-controls`);
    this._tripInfoContainer = this._header.querySelector(`.trip-main`);

    this._sortComponent = null;
    this._filterComponent = new FilterMenu();
    this._emptyComponent = new TripEmpty();
    this._boardComponent = new TripBoard();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObservers(this._handleModelEvent);
  }

  init() {
    this._renderFilters();
    this._renderTrip();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortPointPriceToUp);
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort(sortPointTimeToUp);
    }

    return this._pointsModel.getPoints();
  }

  _renderPoint(point) {
    const pointPresenter = new Point(this._boardComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  _handleModelEvent(updateType, data) {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
    }
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
    this._currentSortType = sortType;

    this._clearTrip();
    this._renderTrip();
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderPointsList() {
    const points = this._getPoints().slice();
    this._renderPoints(points);
  }

  _renderFilters() {
    render(this._tripControlsContainer, this._filterComponent, RenderPosition.AFTERBEGIN);

  }

  _renderEmptyTrip() {
    render(this._tripListContainer, this._emptyComponent, RenderPosition.AFTERBEGIN);
  }

  _renderInfo() {
    this._infoComponent = new TripInfo(this._getPoints());
    render(this._tripInfoContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new TripSort(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripListContainer, this._sortComponent, RenderPosition.BEFOREBEGIN);
  }

  _renderTripBoard() {
    render(this._tripListContainer, this._boardComponent, RenderPosition.BEFOREBEGIN);
    this._renderPointsList();

  }

  _renderTrip() {
    const points = this._getPoints();
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this._renderEmptyTrip();
      this._filterComponent.disableElement();
      return;
    }

    this._renderInfo();
    this._renderSort();
    this._renderTripBoard();
  }

  _clearTrip({resetSortType = false} = {}) {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());

    this._pointPresenter = {};
    remove(this._sortComponent);
    remove(this._emptyComponent);
    remove(this._infoComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }
}

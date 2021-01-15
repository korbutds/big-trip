import TripEmpty from "../view/trip-empty.js";
import TripInfo from "../view/trip-info.js";
import TripSort from "../view/trip-sort.js";
import TripBoard from "../view/trip-board.js";
import TripLoading from "../view/trip-loading.js";
import {remove, render, RenderPosition} from "../view/utils/render.js";
import PointPresenter, {State as PointPresentrViewState} from "./point.js";
import NewPointPresenter from "./point-new.js";
import {sortPointPriceToMin, sortPointTimeToUp, sortPointDate} from "../view/utils/points.js";
import {SortType, UpdateType, UserAction} from "../const.js";
import {filter} from "../view/utils/filters.js";


export default class Trip {
  constructor(tripListContainer, pointsModel, destinationsModel, offersModel, filterModel, api) {
    this._tripListContainer = tripListContainer;
    this._pointsModel = pointsModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._filterModel = filterModel;
    this._api = api;

    this._isLoading = true;

    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._header = document.querySelector(`.page-header`);
    this._tripControlsContainer = this._header.querySelector(`.trip-main__trip-controls`);
    this._tripInfoContainer = this._header.querySelector(`.trip-main`);

    this._sortComponent = null;
    this._emptyComponent = new TripEmpty();
    this._boardComponent = new TripBoard();
    this._loadingComponent = new TripLoading();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._pointsModel.addObservers(this._handleModelEvent);
    this._filterModel.addObservers(this._handleModelEvent);
    this._renderTrip();
  }

  destroy() {
    this._clearTrip({resetSortType: true});

    remove(this._boardComponent);
    this._pointsModel.removeObservers(this._handleModelEvent);
    this._filterModel.removeObservers(this._handleModelEvent);
  }

  createPoint(callback) {
    this._pointNewPresenter.init(callback);
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.PRICE:
        return filtredPoints.sort(sortPointPriceToMin);
      case SortType.TIME:
        return filtredPoints.sort(sortPointTimeToUp);
      case SortType.DAY:
        return filtredPoints.sort(sortPointDate);
    }
    return filtredPoints;
  }

  _getOffers() {
    return this._offersModel.getOffers();
  }

  _getDestinations() {
    return this._destinationsModel.getDestinations();
  }

  _renderPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter(this._boardComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point, offers, destinations);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresentrViewState.SAVING);
        this._api.updatePoint(update).then((response) => {
          this._pointsModel.updatePoint(updateType, response);
        });
        break;
      case UserAction.ADD_POINT:
        this._api.addPoint(update).then((response) => {
          this._pointsModel.addPoint(updateType, response);
        });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresentrViewState.DELETING);
        this._api.deletePoint(update).then(() => {
          this._pointsModel.deletePoint(updateType, update);
        });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data, this._getOffers(), this._getDestinations());
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
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

  _renderPoints(points, offers, destinations) {
    points.forEach((point) => this._renderPoint(point, offers, destinations));
  }

  _renderPointsList() {
    this._pointNewPresenter = new NewPointPresenter(this._boardComponent, this._handleViewAction, this._getOffers(), this._getDestinations());

    const points = this._getPoints().slice();
    const offers = Object.assign({}, this._getOffers());
    const destinations = this._getDestinations();
    this._renderPoints(points, offers, destinations);
  }

  _renderEmptyTrip() {
    render(this._tripListContainer, this._emptyComponent, RenderPosition.AFTERBEGIN);
  }

  _renderLoadnig() {
    render(this._tripListContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderInfo() {
    this._infoComponent = new TripInfo(this._getPoints());
    render(this._tripInfoContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  renderTripInfo() {
    this._renderInfo();
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
    if (this._isLoading) {
      this._renderLoadnig();
      return;
    }

    const points = this._getPoints();
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this._renderEmptyTrip();
      return;
    }

    this._renderInfo();
    this._renderSort();
    this._renderTripBoard();
  }

  _clearTrip({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());

    this._pointPresenter = {};
    remove(this._emptyComponent);
    remove(this._sortComponent);
    remove(this._loadingComponent);
    remove(this._infoComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }
}

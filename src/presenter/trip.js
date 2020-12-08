import TripPointEdit from "./view/trip-edit-point.js";
import TripPoint from "./view/trip-point.js";
import FilterMenu from "./view/trip-filters.js";
import TripEmpty from "./view/trip-empty.js";
import TripInfo from "./view/trip-info.js";
import TripSort from "./view/trip-sort.js";
import TripBoard from "./view/trip-board.js";
import {render, replace, RenderPosition} from "./view/utils/render.js";

export default class Trip {
  constructor(tripListContainer) {
    this._tripListContainer = tripListContainer;

    this._filterComponent = new FilterMenu();
    this._emptyComponent = new TripEmpty();
    this._infoComponent = new TripInfo();
    this._sortComponent = new TripSort();
    this._boardComponent = new TripBoard();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
  }

  _renderPoints() {
    // Метод создания точек путешествия
  }

  _renderFilters() {
    // Метода ренндиринга контролов
  }

  _renderEmptyTrip() {
    // Метод рендеринга заглушки
  }

  _renderInfo() {
    // Метод отрисовки информации о путешествии
  }

  _renderSort() {
    // Метод отрисовки сортировки точек
  }

  _renderTripBoard() {
    // Метод отрисовки поля отоброжения точек
  }
}

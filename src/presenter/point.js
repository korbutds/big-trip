import TripPoint from "../view/trip-point.js";
import TripPointEdit from "../view/trip-edit-point.js";
import {render, replace, RenderPosition} from "../view/utils/render";
import {Keys} from "../const.js";

export default class Point {
  constructor(pointContainer) {
    this._pointContainer = pointContainer;
    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandle = this._escKeyDownHandle.bind(this);
  }

  init(point) {
    this._point = point;

    this._pointComponent = new TripPoint(point);
    this._pointEditComponent = new TripPointEdit(point);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointEditComponent.setEditClickHandler(this._handleFormSubmit);

    render(this._pointContainer, this._pointComponent, RenderPosition.BEFOREBEGIN);
  }

  _replaceCardToForm() {
    replace(this._pointComponent, this._pointEditComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandle);
  }

  _replaceFormToCard() {
    replace(this._pointEditComponent, this._pointComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandle);
  }

  _escKeyDownHandle(evt) {
    if (evt.key === Keys.ESCAPE[0] || evt.key === Keys.ESCAPE[1]) {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToCard();
  }
}

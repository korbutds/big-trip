import TripPoint from "../view/trip-point.js";
import TripPointEdit from "../view/trip-edit-point.js";
import {render, replace, RenderPosition, remove} from "../view/utils/render.js";
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
    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;
    this._pointComponent = new TripPoint(point);
    this._pointEditComponent = new TripPointEdit(point);
    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointEditComponent.setEditClickHandler(this._handleFormSubmit);

    if (prevPointComponent === null && prevPointEditComponent === null) {
      render(this._pointContainer, this._pointComponent, RenderPosition.BEFOREBEGIN);
      return;
    }

    if (this._pointContainer.getElement().contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._pointEditComponent.getElement().contains(prevPointEditComponent.getElement())) {
      replace(this._pointComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  _replaceCardToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandle);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  _replaceFormToCard() {
    replace(this._pointComponent, this._pointEditComponent);
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

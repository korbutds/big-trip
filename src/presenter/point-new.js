import {nanoid} from "nanoid";
import {Keys, UpdateType, UserAction} from "../const.js";
import PointEdit from "../view/trip-edit-point.js";
import {remove, render, RenderPosition} from "../view/utils/render.js";

export default class PointNew {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;

    this._pointEditComponent = null;
    this._destroyCallback = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleResetClick = this._handleResetClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;

    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new PointEdit();
    this._pointEditComponent.setEditSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setResetClickHandler(this._handleResetClick);

    render(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        Object.assign({id: nanoid()}, point)
    );
  }

  _handleResetClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (Keys.ESCAPE.indexOf(evt.key) > -1) {
      evt.preventDefault();
      this.destroy();
    }
  }
}

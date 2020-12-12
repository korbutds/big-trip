import TripPoint from "../view/trip-point.js";
import TripPointEdit from "../view/trip-edit-point.js";
import {render, replace, RenderPosition, remove} from "../view/utils/render.js";
import {Keys} from "../const.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Point {
  constructor(pointContainer, changeData, changeMode) {
    this._pointContainer = pointContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleBackClick = this._handleBackClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandle = this._escKeyDownHandle.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new TripPoint(point);
    this._pointEditComponent = new TripPointEdit(point);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointEditComponent.setEditClickHandler(this._handleBackClick);
    this._pointEditComponent.setEditSubmitHandler(this._handleFormSubmit);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._pointContainer, this._pointComponent, RenderPosition.BEFOREBEGIN);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandle);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  _replaceFormToCard() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandle);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandle(evt) {
    if (Keys.ESCAPE.indexOf(evt.key) > -1) {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleBackClick() {
    this._replaceFormToCard();
  }

  _handleFormSubmit(point) {
    this._changeData(point);
    this._replaceFormToCard();
  }

  _handleFavoriteClick() {
    this._changeData(Object.assign({}, this._point, {isFavorite: !this._point.isFavorite}));
  }
}

import TripPoint from "../view/trip-point.js";
import TripPointEdit from "../view/trip-edit-point.js";
import {render, replace, RenderPosition, remove} from "../view/utils/render.js";
import {Keys, UpdateType, UserAction} from "../const.js";
import {isDatesEqual, isCostEqual, isOffersSumEqual} from "../view/utils/points.js";
import {isOnline} from "../view/utils/common.js";
import {toast} from "../view/utils/toast/toast.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
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
    this._handleResetClick = this._handleResetClick.bind(this);
    this._escKeyDownHandle = this._escKeyDownHandle.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(point, offers, destinations) {
    this._point = point;
    this._offers = offers;
    this._destinations = destinations;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new TripPoint(point);
    this._pointEditComponent = new TripPointEdit(point, offers, destinations);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointEditComponent.setEditClickHandler(this._handleBackClick);
    this._pointEditComponent.setEditSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setResetClickHandler(this._handleResetClick);
    this._pointEditComponent.setEditClickHandler(this._handleBackClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._pointContainer, this._pointComponent, RenderPosition.BEFOREBEGIN);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointComponent, prevPointEditComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  setViewState(state) {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isSaving: false,
        isDisabled: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._pointEditComponent.updateData({isDisabled: true, isSaving: true});
        break;
      case State.DELETING:
        this._pointEditComponent.updateData({isDisabled: true, isDeleting: true});
        break;
      case State.ABORTING:
        this._pointComponent.shake(resetFormState);
        this._pointEditComponent.shake(resetFormState);
    }
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._pointEditComponent.reset(this._point);
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
      this._pointEditComponent.reset(this._point);
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    if (!isOnline()) {
      toast(`You can't edit task offline`);
      return;
    }

    this._replaceCardToForm();
  }

  _handleBackClick() {
    this._pointEditComponent.reset(this._point);
    this._replaceFormToCard();
  }

  _handleFormSubmit(update) {
    if (!isOnline()) {
      toast(`You can't edit task offline`);
      return;
    }
    const isMajorUpdate = !isDatesEqual(this._point.times.finish, update.times.finish) || !isCostEqual(this._point.price, update.price) || !isOffersSumEqual(this._point, update);
    this._changeData(
        UserAction.UPDATE_POINT,
        isMajorUpdate ? UpdateType.MAJOR : UpdateType.PATCH,
        update
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        Object.assign({}, this._point, {isFavorite: !this._point.isFavorite})
    );
  }

  _handleResetClick(point) {
    if (!isOnline()) {
      toast(`You can't edit task offline`);
      return;
    }

    this._changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        point
    );
  }
}

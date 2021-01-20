import {HeaderItem, Keys, UpdateType, UserAction} from "../const.js";
import PointEdit from "../view/trip-edit-point.js";
import {remove, render, RenderPosition} from "../view/utils/render.js";

const blankPoint = (offers) => {
  const now = new Date();
  const copiedOffers = Object.assign({}, offers);
  return {
    isFavorite: false,
    offers: [],
    pointType: `sightseeing`,
    price: 0,
    times: {
      start: now.getTime(),
      finish: now.getTime() + 60000
    },
    type: {
      iconSrc: `./img/icons/sightseeing.png`,
      name: `Sightseeing`,
      offers: copiedOffers
    }
  };
};

export default class PointNew {
  constructor(pointListContainer, changeData, offers, destinations) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._offers = offers;
    this._destinations = destinations;

    this._pointEditComponent = null;
    this._destroyCallback = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleResetClick = this._handleResetClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleBackClick = this._handleBackClick.bind(this);

  }

  init(callback) {
    this._destroyCallback = callback;

    if (this._pointEditComponent !== null) {
      return;
    }
    const newPoint = blankPoint(this._offers);
    this._pointEditComponent = new PointEdit(newPoint, this._offers, this._destinations, true);
    this._pointEditComponent.setEditSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setResetClickHandler(this._handleResetClick);
    this._pointEditComponent.setEditClickHandler(this._handleBackClick);


    render(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
    document.querySelector(`[data-header-type=${HeaderItem.ADD_NEW_POINT}]`).disabled = true;

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
    document.querySelector(`[data-header-type=${HeaderItem.ADD_NEW_POINT}]`).disabled = false;
  }

  _handleFormSubmit(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        point
    );
    document.querySelector(`[data-header-type=${HeaderItem.ADD_NEW_POINT}]`).disabled = false;
  }

  _handleBackClick() {
    this.destroy();
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

  setSaving() {
    this._pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._pointEditComponent.shake(resetFormState);
  }
}

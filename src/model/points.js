import Observer from "../view/utils/observer.js";
import {offersArrayToClientView, toCamelCase, ucFirstLetter} from "../view/utils/points.js";

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
    this._destinations = [];
    this._offers = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();

    this._notify(updateType);
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }

  setOffers(offers) {
    this._offers = Object.assign(
        {},
        offers
    );
  }

  getPoints() {
    return this._points;
  }

  getDestinations() {
    return this._destinations;
  }

  getOffers() {
    return this._offers;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  adaptPointsToClient(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          price: point.base_price,
          times: {
            start: new Date(point.date_from).valueOf(),
            finish: new Date(point.date_to).valueOf()
          },
          destination: point.destination.name,
          description: point.destination.description,
          photos: point.destination.pictures,
          isFavorite: point.is_favorite,
          pointType: toCamelCase(point.type),
          offers: offersArrayToClientView(point.offers),
          type: {
            iconSrc: `./img/icons/${point.type}.png`,
            name: ucFirstLetter(point.type),
            offers: this._offers[toCamelCase(point.type)].offers
          }
        }
    );

    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.destination.name;
    delete adaptedPoint.destination.description;
    delete adaptedPoint.destination.pictures;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }

  adaptPointsToServer(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          base_price: point.price,
          date_from: point.times.start,
          date_to: point.times.finish,
          destination: {
            description: point.description,
            name: point.destination,
            pictures: point.photos,
          },
          is_favorite: point.isFavorite,
          type: point.type.name.toLowerCase()
        }
    );

    delete adaptedPoint.price;
    delete adaptedPoint.times;
    delete adaptedPoint.description;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }

  adaptDestinationToClient(destination) {
    const adaptedDestination = Object.assign(
        {},
        destination,
        {
          photos: destination.pictures
        }
    );

    delete adaptedDestination.pictures;

    return adaptedDestination;
  }

  adaptOfferToClient(offer) {
    return {
      name: ucFirstLetter(offer.type),
      offers: offersArrayToClientView(offer.offers),
      iconSrc: `./img/icons/${offer.type}.png`
    };
  }
}

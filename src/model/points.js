import Observer from "../view/utils/observer.js";
import {getOffersList, toCamelCase, toHtmlView, ucFirstLetter} from "../view/utils/points.js";

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
    this._destinations = [];
    this._offers = [];
  }

  setPoints(points) {
    this._points = points.slice();
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }

  setOffers(offers) {
    this._offers = offers.slice();
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

  adaptToClient(point) {
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
          offers: point.offers.map((el) => {
            const newOfferObjectsList = Object.assign(
                {},
                el,
                {
                  name: el.title,
                  offerKey: toCamelCase(el.title),
                  id: toHtmlView(el.title)
                }
            );
            delete newOfferObjectsList.title;
            return newOfferObjectsList;
          }),
          type: {
            iconSrc: `./img/icons/${point.type}.png`,
            name: ucFirstLetter(point.type),
            offers: getOffersList(this._offers, point.type).map((el) => {
              const newOfferObjectsList = Object.assign(
                  {},
                  el,
                  {
                    name: el.title,
                    offerKey: toCamelCase(el.title),
                    id: toHtmlView(el.title)
                  }
              );
              delete newOfferObjectsList.title;
              return newOfferObjectsList;
            })
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

  static adaptToServer(point) {
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
}

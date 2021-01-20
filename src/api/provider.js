import {isOnline} from "../view/utils/common.js";
import PointsModel from "../model/points.js";
const getSyncedPoints = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};

const createPointsStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

const createStoreStructure = (items) => {
  return items.reduce((acc, offer, index) => {
    return Object.assign({}, acc, {[index]: offer});
  }, {});
};

export default class Provider {
  constructor(api, pointsStore, offersStore, destinationsStore) {
    this._api = api;
    this._offersStore = offersStore;
    this._pointsStore = pointsStore;
    this._destinationsStore = destinationsStore;
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createPointsStoreStructure(points);
          this._pointsStore.setItems(items);
          return points;
        });
    }

    const pointsStore = Object.values(this._pointsStore.getItems());

    return Promise.resolve(pointsStore);
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const items = createStoreStructure(offers);
          this._offersStore.setItems(items);
          return offers;
        });
    }

    const offersStore = Object.values(this._offersStore.getItems());

    return Promise.resolve(offersStore);
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          const items = createStoreStructure(destinations);
          this._destinationsStore.setItems(items);
          return destinations;
        });
    }

    const destinationsStore = Object.values(this._destinationsStore.getItems());

    return Promise.resolve(destinationsStore);
  }

  updatePoint(point) {
    if (isOnline()) {
      return this._api.updatePoint(point)
        .then((updatedPoint) => {
          this._pointsStore.setItem(updatedPoint.id, updatedPoint);
          return updatedPoint;
        });
    }
    this._pointsStore.setItem(point.id, PointsModel.adaptPointsToServer(point));

    return Promise.resolve(PointsModel.adaptPointsToServer(point));
  }

  addPoint(point) {
    if (isOnline()) {
      return this._api.addPoint(point)
        .then((newPoint) => {
          this._pointsStore.setItem(newPoint.id, newPoint);
          return newPoint;
        });
    }

    return Promise.reject(new Error(`Add point failed`));
  }

  deletePoint(point) {
    if (isOnline()) {
      return this._api.deletePoint(point)
        .then(() => this._pointsStore.removeItem(point.id));
    }

    return Promise.reject(new Error(`Delete point failed`));
  }

  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._pointsStore.getItems());

      return this._api.sync(storePoints)
        .then((response) => {
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          const items = createStoreStructure([...createdPoints, ...updatedPoints]);
          this._pointsStore.setItems(items);
        });

    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}

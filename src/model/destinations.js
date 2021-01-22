import Observer from "../view/utils/observer.js";

export default class Destination extends Observer {
  constructor() {
    super();
    this._destinations = [];
  }

  setDestinations(destinations) {
    this._destinations = destinations.map((destination) => {
      return this.adaptDestinationToClient(destination);
    });
  }

  getDestinations() {
    return this._destinations;
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
}

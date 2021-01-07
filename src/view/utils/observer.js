export default class Observer {
  constructor() {
    this._observers = new Set();
  }

  addObservers(callback) {
    this._observers.add(callback);
  }

  removeObservers(callback) {
    this._observers.delete(callback);
  }

  _notify(event, payload) {
    this._observers.forEach((observer) => observer(event, payload));
  }
}

import Observer from "../view/utils/observer.js";
import {offersArrayToClientView, toCamelCase, ucFirstLetter} from "../view/utils/points.js";

export default class Offers extends Observer {
  constructor() {
    super();
    this._offers = [];
  }

  setOffers(offersArray) {
    offersArray.forEach((offer) => {
      this._offers[toCamelCase(offer.type)] = this.adaptOfferToClient(offer);
    }, {});
  }

  getOffers() {
    return this._offers;
  }

  adaptOfferToClient(offer) {
    return {
      name: ucFirstLetter(offer.type),
      offers: offersArrayToClientView(offer.offers),
      iconSrc: `./img/icons/${offer.type}.png`
    };
  }
}

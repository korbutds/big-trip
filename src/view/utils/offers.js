import {toCamelCase, toHtmlView} from "./points";

export const getOfferToClient = (offer) => {
  const offerObject = Object.assign(
      {},
      offer,
      {
        name: offer.title,
        id: toHtmlView(offer.title),
        offerKey: toCamelCase(offer.title)
      }
  );
  delete offerObject.title;
  return offerObject;
};

export const offersArrayToClientView = (offersArray) => {
  const clientOffers = [];
  if (offersArray && offersArray.length > 0) {
    offersArray.forEach((offer) => {
      clientOffers.push(getOfferToClient(offer));
    });
  }

  return clientOffers;
};

export const offersArrayToServerView = (offersArray) => {
  const array = offersArray.slice();
  return array.map((offer) => {
    const adaptedOffer = Object.assign(
        {},
        offer,
        {title: offer.name}
    );
    offer.title = offer.name;
    delete adaptedOffer.name;
    delete adaptedOffer.id;
    delete adaptedOffer.offerKey;

    return adaptedOffer;
  });
};

export const getOffersListFromObject = (offersArray) => {
  const offerObject = {};
  offersArray.forEach((offer) => {
    offerObject[offer.offerKey] = {
      name: offer.name,
      price: offer.price,
      id: offer.id,
      offerKey: offer.offerKey
    };
  });
  return offerObject;
};

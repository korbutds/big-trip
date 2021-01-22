import {toCamelCase, toHtmlView} from "./points";

export const getOfferToClient = (offer) => {
  const clientOffers = Object.assign(
      {},
      offer,
      {
        name: offer.title,
        id: toHtmlView(offer.title),
        offerKey: toCamelCase(offer.title)
      }
  );
  delete clientOffers.title;
  return clientOffers;
};

export const offersToClientView = (offers) => {
  const clientOffers = [];
  if (offers && offers.length > 0) {
    offers.forEach((offer) => {
      clientOffers.push(getOfferToClient(offer));
    });
  }

  return clientOffers;
};

export const offersToServerView = (offers) => {
  const offersClientView = offers.slice();
  return offersClientView.map((offer) => {
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

export const getOffersList = (offers) => {
  const offersList = {};
  offers.forEach((offer) => {
    offersList[offer.offerKey] = {
      name: offer.name,
      price: offer.price,
      id: offer.id,
      offerKey: offer.offerKey
    };
  });
  return offersList;
};

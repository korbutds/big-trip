import {getRandomInt, getRandomArray, getRandomFishText, createPhotosArr} from "./utils.js";
import dayjs from "dayjs";

const OFFERS_LIST = {
  orderUber: {
    id: `order-uber`,
    name: `Order uber`,
    price: getRandomInt(20, 95)
  },
  addLuggage: {
    id: `add-luggage`,
    name: `Add luggage`,
    price: getRandomInt(20, 95)
  },
  switchToComfort: {
    id: `switch-to-comfort`,
    name: `Switch to comfort`,
    price: getRandomInt(20, 95)
  },
  rentACar: {
    id: `rent-a-car`,
    name: `Rent a car`,
    price: getRandomInt(20, 95)
  },
  addBreakfast: {
    id: `add-breakfast`,
    name: `Add breakfast`,
    price: getRandomInt(20, 95)
  },
  bookTickets: {
    id: `book-tickets`,
    name: `Book tickets`,
    price: getRandomInt(20, 95)
  },
  lunchInCity: {
    id: `lunch-in-city`,
    name: `Lunch in city`,
    price: getRandomInt(20, 95)
  },
};

const getRandomOfferList = () => {
  const offersNames = getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST));
  return offersNames.map((elem) => {
    return {
      name: OFFERS_LIST[elem].name,
      price: OFFERS_LIST[elem].price,
      isChecked: Boolean(getRandomInt()),
    };
  });
};

const ROUTE_POINT_TYPES = {
  taxi: {
    name: `Taxi`,
    offers: getRandomOfferList(),
    iconSrc: `../img/icons/taxi.png`,
    price: getRandomInt(2, 20) * 20,
  },
  bus: {
    name: `Bus`,
    offers: getRandomOfferList(),
    iconSrc: `../img/icons/bus.png`,
    price: getRandomInt(2, 20) * 20,
  },
  train: {
    name: `Train`,
    offers: getRandomOfferList(),
    iconSrc: `../img/icons/train.png`,
    price: getRandomInt(2, 20) * 20,
  },
  ship: {
    name: `Ship`,
    offers: getRandomOfferList(),
    iconSrc: `../img/icons/ship.png`,
    price: getRandomInt(2, 20) * 20,
  },
  transport: {
    name: `Transport`,
    offers: getRandomOfferList(),
    iconSrc: `../img/icons/transport.png`,
    price: getRandomInt(2, 20) * 20,
  },
  drive: {
    name: `Drive`,
    offers: getRandomOfferList(),
    iconSrc: `../img/icons/drive.png`,
    price: getRandomInt(2, 20) * 20,
  },
  flight: {
    name: `Flight`,
    offers: getRandomOfferList(),
    iconSrc: `../img/icons/flight.png`,
    price: getRandomInt(2, 20) * 20,
  },
  checkIn: {
    name: `Check-in`,
    offers: getRandomOfferList(),
    iconSrc: `../img/icons/check-in.png`,
    price: getRandomInt(2, 20) * 20,
  },
  sightseeng: {
    name: `Sightseeng`,
    offers: getRandomOfferList(),
    iconSrc: `../img/icons/sightseeing.png`,
    price: getRandomInt(2, 20) * 20,
  },
  restaurant: {
    name: `Restaurant`,
    offers: getRandomOfferList(),
    iconSrc: `../img/icons/restaurant.png`,
    price: getRandomInt(2, 20) * 20,
  },
};

// const ROUTE_POINT_TYPES = {
//   taxi: {
//     name: `Taxi`,
//     offers: getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST)),
//     iconSrc: `../img/icons/taxi.png`,
//     price: getRandomInt(2, 20) * 20,
//   },
//   bus: {
//     name: `Bus`,
//     offers: getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST)),
//     iconSrc: `../img/icons/bus.png`,
//     price: getRandomInt(2, 20) * 20,
//   },
//   train: {
//     name: `Train`,
//     offers: getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST)),
//     iconSrc: `../img/icons/train.png`,
//     price: getRandomInt(2, 20) * 20,
//   },
//   ship: {
//     name: `Ship`,
//     offers: getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST)),
//     iconSrc: `../img/icons/ship.png`,
//     price: getRandomInt(2, 20) * 20,
//   },
//   transport: {
//     name: `Transport`,
//     offers: getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST)),
//     iconSrc: `../img/icons/transport.png`,
//     price: getRandomInt(2, 20) * 20,
//   },
//   drive: {
//     name: `Drive`,
//     offers: getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST)),
//     iconSrc: `../img/icons/drive.png`,
//     price: getRandomInt(2, 20) * 20,
//   },
//   flight: {
//     name: `Flight`,
//     offers: getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST)),
//     iconSrc: `../img/icons/flight.png`,
//     price: getRandomInt(2, 20) * 20,
//   },
//   checkIn: {
//     name: `Check-in`,
//     offers: getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST)),
//     iconSrc: `../img/icons/check-in.png`,
//     price: getRandomInt(2, 20) * 20,
//   },
//   sightseeng: {
//     name: `Sightseeng`,
//     offers: getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST)),
//     iconSrc: `../img/icons/sightseeing.png`,
//     price: getRandomInt(2, 20) * 20,
//   },
//   restaurant: {
//     name: `Restaurant`,
//     offers: getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST)),
//     iconSrc: `../img/icons/restaurant.png`,
//     price: getRandomInt(2, 20) * 20,
//   },
// };

const DESTINATIONS_ARRAY = [
  {
    name: `San-Francisco`,
    description: getRandomFishText(getRandomInt(1, 5)),
    photos: createPhotosArr(),
  },
  {
    name: `Los-Angeles`,
    description: getRandomFishText(getRandomInt(1, 5)),
    photos: createPhotosArr(),
  },
  {
    name: `New-York`,
    description: getRandomFishText(getRandomInt(1, 5)),
    photos: createPhotosArr(),
  },
  {
    name: `Kokkari restaurant`,
    description: getRandomFishText(getRandomInt(1, 5)),
    photos: createPhotosArr(),
  },
  {
    name: `Hollywood Hills`,
    description: getRandomFishText(getRandomInt(1, 5)),
    photos: createPhotosArr(),
  },
];

const BLANK_POINT = {
  times: dayjs(),
  type: ROUTE_POINT_TYPES.checkIn.name,
  destination: DESTINATIONS_ARRAY[0].name,
  offers: ROUTE_POINT_TYPES.checkIn.offers,
  description: getRandomFishText(getRandomInt(1, 5)),
  photos: DESTINATIONS_ARRAY[0].photos,
  isFavorite: false,
};

const Keys = {
  ESCAPE: [`Esc`, `Escape`]
};

export {OFFERS_LIST, ROUTE_POINT_TYPES, DESTINATIONS_ARRAY, BLANK_POINT, Keys};

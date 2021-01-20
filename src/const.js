import {getRandomInt} from "./view/utils/common.js";
import {createPhotosArr, getRandomFishText} from "./view/utils/points.js";

export const OFFERS_LIST = {
  orderUber: {
    id: `order-uber`,
    offerKey: `orderUber`,
    name: `Order uber`,
    price: 20
  },
  addLuggage: {
    id: `add-luggage`,
    offerKey: `addLuggage`,
    name: `Add luggage`,
    price: 15
  },
  switchToComfort: {
    id: `switch-to-comfort`,
    offerKey: `switchToComfort`,
    name: `Switch to comfort`,
    price: 100
  },
  rentACar: {
    id: `rent-a-car`,
    offerKey: `rentACar`,
    name: `Rent a car`,
    price: 150
  },
  addBreakfast: {
    id: `add-breakfast`,
    offerKey: `addBreakfast`,
    name: `Add breakfast`,
    price: 25
  },
  bookTickets: {
    id: `book-tickets`,
    offerKey: `bookTickets`,
    name: `Book tickets`,
    price: 12
  },
  lunchInCity: {
    id: `lunch-in-city`,
    offerKey: `lunchInCity`,
    name: `Lunch in city`,
    price: 45
  },
};

export const ROUTE_POINT_TYPES = {
  taxi: {
    name: `Taxi`,
    offers: [OFFERS_LIST.orderUber, OFFERS_LIST.switchToComfort],
    iconSrc: `./img/icons/taxi.png`,
    price: getRandomInt(2, 20) * 20,
  },
  bus: {
    name: `Bus`,
    offers: [OFFERS_LIST.bookTickets],
    iconSrc: `./img/icons/bus.png`,
    price: getRandomInt(2, 20) * 20,
  },
  train: {
    name: `Train`,
    offers: [OFFERS_LIST.bookTickets, OFFERS_LIST.switchToComfort],
    iconSrc: `./img/icons/train.png`,
    price: getRandomInt(2, 20) * 20,
  },
  ship: {
    name: `Ship`,
    offers: [OFFERS_LIST.bookTickets, OFFERS_LIST.switchToComfort],
    iconSrc: `./img/icons/ship.png`,
    price: getRandomInt(2, 20) * 20,
  },
  transport: {
    name: `Transport`,
    offers: [OFFERS_LIST.bookTickets],
    iconSrc: `./img/icons/transport.png`,
    price: getRandomInt(2, 20) * 20,
  },
  drive: {
    name: `Drive`,
    offers: [OFFERS_LIST.rentACar],
    iconSrc: `./img/icons/drive.png`,
    price: getRandomInt(2, 20) * 20,
  },
  flight: {
    name: `Flight`,
    offers: [OFFERS_LIST.bookTickets, OFFERS_LIST.switchToComfort, OFFERS_LIST.addLuggage],
    iconSrc: `./img/icons/flight.png`,
    price: getRandomInt(2, 20) * 20,
  },
  checkIn: {
    name: `Check-in`,
    offers: [OFFERS_LIST.lunchInCity],
    iconSrc: `./img/icons/check-in.png`,
    price: getRandomInt(2, 20) * 20,
  },
  sightseeing: {
    name: `Sightseeing`,
    offers: [OFFERS_LIST.bookTickets, OFFERS_LIST.lunchInCity, OFFERS_LIST.addBreakfast],
    iconSrc: `./img/icons/sightseeing.png`,
    price: getRandomInt(2, 20) * 20,
  },
  restaurant: {
    name: `Restaurant`,
    offers: [OFFERS_LIST.lunchInCity, OFFERS_LIST.switchToComfort],
    iconSrc: `./img/icons/restaurant.png`,
    price: getRandomInt(2, 20) * 20,
  },
};

export const DESTINATIONS_ARRAY = [
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

export const SortType = {
  DAY: `day-up`,
  TIME: `time-up`,
  PRICE: `price-up`
};

export const Keys = {
  ESCAPE: [`Esc`, `Escape`]
};

export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
  DISABLED: `disabled`
};

export const HeaderItem = {
  ADD_NEW_POINT: `ADD_NEW_POINT`,
  TABLE: `TABLE`,
  STATS: `STATS`
};

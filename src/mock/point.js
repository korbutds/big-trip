import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const FISH_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const getRandomInt = (min = 0, max = 1) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFishText = (sentenseCount) => {
  const fishTextArr = FISH_TEXT.split(`. `);
  const fishTextLength = fishTextArr.length;
  let sentenseArr = [];

  for (let i = 0; i < sentenseCount; i++) {
    sentenseArr.push(fishTextArr[getRandomInt(0, fishTextLength - 1)]);
  }
  return sentenseArr.join(`. `).concat(`.`);
};

const getRandomArrayElement = (arr) => {
  return arr[getRandomInt(0, arr.length - 1)];
};

const getRandomArray = (count, arr) => {
  let pointArr = [];
  const arrLength = arr.length;
  for (let i = 0; i < count; i++) {
    pointArr.push(arr[getRandomInt(0, arrLength - 1)]);
  }
  const newSet = new Set(pointArr);
  return [...newSet];
};

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

const ROUTE_POINT_TYPES = {
  taxi: {
    name: `Taxi`,
    offers: getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST)),
    iconSrc: `../img/icons/taxi.png`
  },
  bus: {
    name: `Bus`,
    offers: getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST)),
    iconSrc: `../img/icons/bus.png`
  },
  train: {
    name: `Train`,
    offers: getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST)),
    iconSrc: `../img/icons/train.png`
  },
  ship: {
    name: `Ship`,
    offers: getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST)),
    iconSrc: `../img/icons/ship.png`
  },
  transport: {
    name: `Transport`,
    offers: getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST)),
    iconSrc: `../img/icons/transport.png`
  },
  drive: {
    name: `Drive`,
    offers: getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST)),
    iconSrc: `../img/icons/drive.png`
  },
  flight: {
    name: `Flight`,
    offers: getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST)),
    iconSrc: `../img/icons/flight.png`
  },
  checkIn: {
    name: `Check-in`,
    offers: getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST)),
    iconSrc: `../img/icons/check-in.png`
  },
  sightseeng: {
    name: `Sightseeng`,
    offers: getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST)),
    iconSrc: `../img/icons/sightseeing.png`
  },
  restaurant: {
    name: `Restaurant`,
    offers: getRandomArray(getRandomInt(0, 5), Object.keys(OFFERS_LIST)),
    iconSrc: `../img/icons/restaurant.png`
  },
};

const DESTINATIONS_ARRAY = [
  `San-Francisco`,
  `Los-Angeles`,
  `New-York`,
  `Kokkari restaurant`,
  `Hollywood Hills`
];

const createPhotosArr = () => {
  const count = getRandomInt(1, 9);
  const src = [];
  for (let i = 0; i < count; i++) {
    src.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return src;
};

const getObjectsArray = (obj, keysArr) => {
  let arr = [];
  if (keysArr.length > 0) {
    for (let i = 0; i < keysArr.length; i++) {
      let element = keysArr[i];
      arr.push(obj[element]);
    }
  }
  return arr;
};

let startDate = dayjs().add(1, `day`).startOf(`date`);

const generateDate = () => {
  const MAX_TRIP_TIME = 6;
  const tripTime = getRandomInt(1, MAX_TRIP_TIME) * 30;
  const start = startDate;
  const tripEndTime = startDate.add(tripTime, `minutes`);
  const finish = tripEndTime;
  startDate = finish;
  return {
    start: Date.parse(start),
    finish: Date.parse(finish)
  };
};

export const generatePoint = () => {
  const pointDestination = getRandomArrayElement(DESTINATIONS_ARRAY);

  const pointType = getRandomArrayElement(Object.keys(ROUTE_POINT_TYPES));
  const type = ROUTE_POINT_TYPES[pointType];
  const offersList = type[`offers`];
  const offersObjectList = getObjectsArray(OFFERS_LIST, offersList);
  return {
    times: generateDate(),
    type,
    destinations: DESTINATIONS_ARRAY,
    pointDestination,
    offers: offersObjectList,
    description: getRandomFishText(getRandomInt(1, 5)),
    photos: createPhotosArr(),
  };
};

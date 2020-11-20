const FISH_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const getRandomFishText = (sentenseCount) => {
  const fishTextArr = FISH_TEXT.split(`. `);
  const fishTextLength = fishTextArr.length;
  let sentenseArr = [];

  for (let i = 0; i < sentenseCount; i++) {
    sentenseArr.push(fishTextArr[getRandomInt(0, fishTextLength - 1)]);
  }

  return sentenseArr;
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
  return pointArr;
};

const ROUTE_POINT_TYPES = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeng`,
  `Restaurant`
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const SENTENSE_COUNT = 5;

const DESTINATIONS = [
  `San_Francisco`,
  `Los-Angeles`,
  `New-York`,
  `Kokkari restaurante`,
  `Hollywood Hills`
];

const OFFERS_LIST = {
  'Order Uber': {
    'destination list': Array.from(new Set(getRandomArray(getRandomInt(0, 5), DESTINATIONS))),
    'price': getRandomInt(20, 95)},
  'Add luggage': {
    'destination list': Array.from(new Set(getRandomArray(getRandomInt(0, 5), DESTINATIONS))),
    'price': getRandomInt(20, 95)},
  'Switch to comfort': {
    'destination list': Array.from(new Set(getRandomArray(getRandomInt(0, 5), DESTINATIONS))),
    'price': getRandomInt(20, 95)},
  'Rent a car': {
    'destination list': Array.from(new Set(getRandomArray(getRandomInt(0, 5), DESTINATIONS))),
    'price': getRandomInt(20, 95)},
  'Add breakfast': {
    'destination list': Array.from(new Set(getRandomArray(getRandomInt(0, 5), DESTINATIONS))),
    'price': getRandomInt(20, 95)},
  'Book tickets': {
    'destination list': Array.from(new Set(getRandomArray(getRandomInt(0, 5), DESTINATIONS))),
    'price': getRandomInt(20, 95)},
  'Lunch in city': {
    'destination list': Array.from(new Set(getRandomArray(getRandomInt(0, 5), DESTINATIONS))),
    'price': getRandomInt(20, 95)},
};

const generateTask = () => {
  return {
    pointType: getRandomArrayElement(ROUTE_POINT_TYPES),
    pointDestination: getRandomArrayElement(DESTINATIONS),
    pointOffers: Object.keys(OFFERS_LIST).filter((value) => {
      return OFFERS_LIST[value][`destination list`].includes(getRandomArrayElement(DESTINATIONS));
    }),
    newfid: OFFERS_LIST[`Lunch in city`][`destination list`],
  };
};

console.log(generateTask());

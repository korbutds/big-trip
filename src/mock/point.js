import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {getRandomInt, getRandomFishText, getRandomArrayElement} from "../utils.js";
import {ROUTE_POINT_TYPES, DESTINATIONS_ARRAY} from "../const.js";
dayjs.extend(duration);

const createPhotosArr = () => {
  const count = getRandomInt(1, 9);
  const src = [];
  for (let i = 0; i < count; i++) {
    src.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return src;
};

// const getObjectsArray = (obj, keysArr) => {
//   let arr = [];
//   if (keysArr.length > 0) {
//     for (let i = 0; i < keysArr.length; i++) {
//       let element = keysArr[i];
//       arr.push(obj[element]);
//     }
//   }
//   return arr;
// };

let startDate = dayjs().add(2, `day`).startOf(`date`);

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

const generatePoint = () => {
  const destination = getRandomArrayElement(DESTINATIONS_ARRAY).name;

  const pointType = getRandomArrayElement(Object.keys(ROUTE_POINT_TYPES));
  const type = ROUTE_POINT_TYPES[pointType];
  const offersList = type[`offers`];
  return {
    times: generateDate(),
    type,
    destination,
    offers: offersList,
    description: getRandomFishText(getRandomInt(1, 5)),
    photos: createPhotosArr(),
    isFavorite: Boolean(getRandomInt()),
  };
};

export {generatePoint, DESTINATIONS_ARRAY};

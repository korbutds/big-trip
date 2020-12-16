import {getRandomInt, getRandomArrayElement, getRandomArray} from "../view/utils/common.js";
import {createPhotosArr, generateDate, getRandomFishText} from "../view/utils/points.js";
import {ROUTE_POINT_TYPES, DESTINATIONS_ARRAY} from "../const.js";
import {nanoid} from "nanoid";


const generatePoint = () => {
  const destination = getRandomArrayElement(DESTINATIONS_ARRAY).name;

  const pointType = getRandomArrayElement(Object.keys(ROUTE_POINT_TYPES));
  const type = ROUTE_POINT_TYPES[pointType];
  const offersList = getRandomArray(getRandomInt(0, type[`offers`].length), type[`offers`]);
  return {
    id: nanoid(),
    pointType,
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

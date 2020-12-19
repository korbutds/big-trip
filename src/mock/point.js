import {getRandomInt, getRandomArrayElement, getRandomArray} from "../view/utils/common.js";
import {generateDate} from "../view/utils/points.js";
import {ROUTE_POINT_TYPES, DESTINATIONS_ARRAY} from "../const.js";
import {nanoid} from "nanoid";


export const generatePoint = () => {
  const destinationObject = getRandomArrayElement(DESTINATIONS_ARRAY);
  const destinationName = destinationObject.name;
  const destinationPhotos = destinationObject.photos;
  const destinationDescription = destinationObject.description;

  const pointType = getRandomArrayElement(Object.keys(ROUTE_POINT_TYPES));
  const type = ROUTE_POINT_TYPES[pointType];
  const offersList = getRandomArray(getRandomInt(0, type[`offers`].length), type[`offers`]);
  return {
    id: nanoid(),
    pointType,
    times: generateDate(),
    type,
    destination: destinationName,
    offers: offersList,
    description: destinationDescription,
    photos: destinationPhotos,
    isFavorite: Boolean(getRandomInt()),
  };
};

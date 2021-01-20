import {FilterType} from "../../const.js";
import {isDateExpired} from "./points.js";

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.PAST]: (points) => points.filter((point) => isDateExpired(point.times.finish)),
  [FilterType.FUTURE]: (points) => points.filter((point) => !isDateExpired(point.times.start)),
};

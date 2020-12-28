import {FilterType} from "../../const.js";
import {isDateExpired} from "./points.js";

export const filter = {
  [FilterType.EVERYTHING]: (tasks) => tasks,
  [FilterType.PAST]: (tasks) => tasks.filter((task) => isDateExpired(task.times.finish)),
  [FilterType.FUTURE]: (tasks) => tasks.filter((task) => !isDateExpired(task.times.start)),
};

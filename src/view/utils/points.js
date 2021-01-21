import {getRandomInt} from "./common.js";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);


export const createPhotosArr = () => {
  const count = getRandomInt(1, 9);
  const description = `some photo description`;
  const src = [];
  for (let i = 0; i < count; i++) {
    src.push({
      src: `http://picsum.photos/248/152?r=${Math.random()}`,
      description
    });
  }

  return src;
};

export const ucFirstLetter = (str) => {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
};

const addZeroToNumber = (number) => {
  return (number < 10) ? `0${number}` : number;
};

export const getDateDiff = (start, finish) => {
  const diffTimeInMs = finish.diff(start);
  const timeDuration = dayjs.duration(diffTimeInMs);
  const days = timeDuration.days();
  const hours = timeDuration.hours();
  const minutes = timeDuration.minutes();
  const time = `${(days > 0) ? addZeroToNumber(days) + `D ` : ``}${(hours > 0) ? addZeroToNumber(hours) + `H ` : ``}${(minutes > 0) ? addZeroToNumber(minutes) + `M` : ``}`;
  return time;
};

export const getDateInDays = (dateDiff) => {
  const timeDuration = dayjs.duration(dateDiff);
  const days = timeDuration.days();
  const hours = timeDuration.hours();
  const minutes = timeDuration.minutes();
  const time = `${(days > 0) ? addZeroToNumber(days) + `D ` : ``}${(hours > 0) ? addZeroToNumber(hours) + `H ` : ``}${(minutes > 0) ? addZeroToNumber(minutes) + `M` : ``}`;
  return time;
};

let startDate = dayjs().add(getRandomInt(-1, 1), `day`).startOf(`date`);

export const generateDate = () => {
  const MAX_TRIP_TIME = 12;
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

export const getRandomFishText = (sentenseCount) => {
  const FISH_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const fishTextArr = FISH_TEXT.split(`. `);
  const fishTextLength = fishTextArr.length;
  let sentenseArr = [];

  for (let i = 0; i < sentenseCount; i++) {
    sentenseArr.push(fishTextArr[getRandomInt(0, fishTextLength - 1)]);
  }
  return sentenseArr.join(`. `).concat(`.`);
};

export const sortPointPriceToMin = (priceA, priceB) => {
  return priceB.price - priceA.price;
};

export const sortPointTimeToUp = (timeA, timeB) => {
  const timeADuration = dayjs(timeA.times.finish).diff(dayjs(timeA.times.start));
  const timeBDuration = dayjs(timeB.times.finish).diff(dayjs(timeB.times.start));
  return timeADuration - timeBDuration;
};

export const sortPointDate = (dateA, dateB) => {
  return dayjs(dateA.times.start) - dayjs(dateB.times.start);
};

export const isDatesEqual = (dateA, dateB) => {
  return (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, `s`);
};

export const isDateExpired = (dueData) => {
  return dueData === null ? false : dayjs(dueData).isBefore(dayjs(), `s`);
};

export const isCostEqual = (oldCost, newCost) => {
  return (oldCost === Number(newCost)) ? true : false;
};
export const isOffersSumEqual = (oldPoint, newPoint) => {
  const oldOffersCost = oldPoint.offers.reduce((acc, curr) => acc + curr.price, 0);
  const newOffersCost = newPoint.offers.reduce((acc, curr) => acc + curr.price, 0);
  return oldOffersCost === newOffersCost ? true : false;
};

export const getOffersList = (offers, pointType) => {
  return offers[pointType];
};

export const toCamelCase = (str) => {
  return [...str].map((element, index, arr) => {
    if (index > 0 && arr[index - 1] === ` ` || arr[index - 1] === `-`) {
      return element.toUpperCase();
    }
    return element.toLowerCase();
  }).filter((element) => element !== ` ` && element !== `-`).join(``);
};

export const toHtmlView = (str) => {
  return [...str].map((element) => {
    if (element === ` `) {
      return `-`;
    }
    return element.toLowerCase();
  }).join(``);
};

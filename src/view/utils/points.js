import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

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

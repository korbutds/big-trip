import dayjs from "dayjs";

const getRandomInt = (min = 0, max = 1) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const addZeroToNumber = (number) => {
  return (number < 10) ? `0${number}` : number;
};
const getRandomFishText = (sentenseCount) => {
  const FISH_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
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

const getDateDiff = (start, finish) => {
  const diffTimeInMs = finish.diff(start);
  const timeDuration = dayjs.duration(diffTimeInMs);
  const days = timeDuration.days();
  const hours = timeDuration.hours();
  const minutes = timeDuration.minutes();
  const time = `${(days > 0) ? addZeroToNumber(days) + `D ` : ``}${(hours > 0) ? addZeroToNumber(hours) + `H ` : ``}${(minutes > 0) ? addZeroToNumber(minutes) + `M` : ``}`;
  return time;
};

export {getRandomInt, getRandomFishText, getRandomArrayElement, getRandomArray, addZeroToNumber, getDateDiff};

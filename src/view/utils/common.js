export const getRandomInt = (min = 0, max = 1) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArrayElement = (arr) => {
  return arr[getRandomInt(0, arr.length - 1)];
};

export const getRandomArray = (count, arr) => {
  let pointArr = [];
  if (arr.length > 0) {
    const arrLength = arr.length;
    for (let i = 0; i < count; i++) {
      pointArr.push(arr[getRandomInt(0, arrLength - 1)]);
    }
  }
  const newSet = new Set(pointArr);
  return [...newSet];
};

export const updateItem = (points, update) => {
  const index = points.findIndex((item) => item.id === update.id);
  if (index === -1) {
    return points;
  }

  return [
    ...points.slice(0, index),
    update,
    ...points.slice(index + 1)
  ];
};

export const deepClone = (obj) => {
  const clone = {};
  for (const i in obj) {
    if (Array.isArray(obj[i])) {
      clone[i] = obj[i].slice();
      clone[i].forEach((el) => deepClone(el));
    } else if (obj[i] instanceof Object) {
      clone[i] = deepClone(obj[i]);
    } else {
      clone[i] = obj[i];
    }
  }
  return clone;
};

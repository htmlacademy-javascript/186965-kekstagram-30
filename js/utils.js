// функция получения целого числа из переданного диапазона
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// функция генератор для получения случайных id из указанного диапазона, без повторения
const createRandomId = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= max - min + 1) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

//функ-я для генерации случайного элемента массива
const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

export { createRandomId, getRandomArrayElement, getRandomInteger };

// функция получения целого числа из переданного диапазона
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// функция генератор для получения случайных id из указанного диапазона, без повторения
const createId = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

//функ-я для генерации случайного элемента массива
const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export { createId, getRandomArrayElement, getRandomInteger, isEscapeKey };

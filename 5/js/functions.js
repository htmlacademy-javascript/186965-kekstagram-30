const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('проверяемая строка', 10);

const isPallindrom = (string) => {
  const normalisedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';

  for (let i = normalisedString.length - 1; i >= 0; i--) {
    reversedString += normalisedString.at(i);
  }

  return reversedString === normalisedString ? 'Паллиндром' : 'Не палиндром';
};

isPallindrom('Лёша на полке клопа нашёл ');

const positiveNumber = (string) => {
  let resultNumber = '';
  const totalString = string.toString();

  for (let i = 0; i < totalString.length; i++) {
    if (!isNaN(parseInt(totalString.at(i), 10))) {
      resultNumber += totalString.at(i);
    }
  }

  return parseInt(resultNumber, 10);
};

positiveNumber(-2023);

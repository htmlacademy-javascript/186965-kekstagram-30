import { photoPreviewElement } from './photo-upload.js';

const SCALE_STEP = 25;

const photoScaleElement = document.querySelector('.scale');
const scaleControlSmallerElement = photoScaleElement.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = photoScaleElement.querySelector('.scale__control--bigger');
const scaleValueElement = photoScaleElement.querySelector('.scale__control--value');


const changeScaleValue = () => {
  let inputValue = parseInt(scaleValueElement.value, 10);

  const changeValue = (step) => {
    inputValue += step;
  };

  return {
    decrease: () => {
      if (inputValue > SCALE_STEP) {
        changeValue(-SCALE_STEP);
      }
    },
    increase: () => {
      if (inputValue < 100) {
        changeValue(SCALE_STEP);
      }
    },
    value: () => inputValue
  };
};


const changeValueInput = changeScaleValue();

scaleControlSmallerElement.addEventListener('click', () => {

  changeValueInput.decrease();
  scaleValueElement.value = `${changeValueInput.value()}%`;
  photoPreviewElement.style.scale = parseFloat(`0.${changeValueInput.value()}`);

});

scaleControlBiggerElement.addEventListener('click', () => {
  changeValueInput.increase();
  scaleValueElement.value = `${changeValueInput.value()}%`;

  if (scaleValueElement.value === '100%') {
    photoPreviewElement.style.scale = '1';
  } else {
    photoPreviewElement.style.scale = parseFloat(`0.${changeValueInput.value()}`);
  }

});


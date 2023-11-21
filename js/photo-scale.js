import { photoPreviewElement } from './photo-upload.js';


const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;


const photoScaleElement = document.querySelector('.scale');
const scaleControlSmallerElement = photoScaleElement.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = photoScaleElement.querySelector('.scale__control--bigger');
const scaleValueElement = photoScaleElement.querySelector('.scale__control--value');


const scaleImage = (value) => {
  photoPreviewElement.style.transform = `scale(${value / 100})`;
  scaleValueElement.value = `${value}%`;
};

const onSmallerScalerButtonClick = () => {
  scaleImage(Math.max(parseInt(scaleValueElement.value, 10) - SCALE_STEP, MIN_SCALE));
};

const onBiggerScaleButtonClick = () => {
  scaleImage(Math.min(parseInt(scaleValueElement.value, 10) + SCALE_STEP, MAX_SCALE));
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

scaleControlSmallerElement.addEventListener('click', onSmallerScalerButtonClick);
scaleControlBiggerElement.addEventListener('click', onBiggerScaleButtonClick);


export {resetScale};

import { photoPreviewElement } from './photo-upload.js';

const Effect = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
  DEFAULT: 'none'
};

const effectToFilter = {
  [Effect.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [Effect.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [Effect.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [Effect.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [Effect.HEAT]: {
    style: 'brightness',
    unit: '',
  },
  [Effect.DEFAULT]: {
    style: 'none',
    unit: '%'
  }
};

const effectToSliderOptions = {
  [Effect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1
  },
  [Effect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [Effect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [Effect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1
  },
  [Effect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1
  },
  [Effect.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1
  },

};

const modalElement = document.querySelector('.img-upload');
const effectsElement = modalElement.querySelector('.effects');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const sliderEffectValueElement = modalElement.querySelector('.effect-level__value');
const effectSliderElement = modalElement.querySelector('.img-upload__effect-level');

let chosenEffect = Effect.DEFAULT;

const isDefault = () => chosenEffect === Effect.DEFAULT;

const setImageStyle = () => {
  if (isDefault()) {
    photoPreviewElement.style.filter = null;
    return;
  }

  const { value } = sliderEffectValueElement;
  const { style, unit } = effectToFilter[chosenEffect];
  photoPreviewElement.style.filter = `${style}(${value}${unit})`;
};

const showSlider = () => {
  effectSliderElement.classList.remove('hidden');
};

const hideSlider = () => {
  effectSliderElement.classList.add('hidden');
};

const onSliderUpdate = () => {
  sliderEffectValueElement.value = sliderElement.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(sliderElement, {
    range: {
      min,
      max
    },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    }
  });

  sliderElement.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

const updateSlider = ({ min, max, step }) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min,
      max
    },
    step,
    start: max
  });
};

const setSlider = () => {
  if (isDefault()) {
    hideSlider();
  } else {
    updateSlider(effectToSliderOptions[chosenEffect]);
    showSlider();
  }
};

const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
  setImageStyle();
};

const reset = () => {
  setEffect(Effect.DEFAULT);
};

const onEffectChange = (evt) => {
  setEffect(evt.target.value);
};

const init = () => {
  createSlider(effectToSliderOptions[chosenEffect]);
  effectsElement.addEventListener('change', onEffectChange);
};

export { init, reset };

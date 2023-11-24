import { photoUploadFormElement, pristine } from './upload-form-validation.js';
import { sendPhotos } from './api.js';
import { resetScale } from './photo-scale.js';
import { reset as resetEffect } from './photo-effect.js';
import { photoUploadInputElement, hidePhotoUpload } from './photo-upload.js';

const formSubmitButtonElement = photoUploadFormElement.querySelector('.img-upload__submit');

const blockSubmitButton = () => {
  formSubmitButtonElement.disabled = true;
  formSubmitButtonElement.textContent = 'Опубликовываю...';
};

const unblockSubmitButton = () => {
  formSubmitButtonElement.disabled = false;
  formSubmitButtonElement.textContent = 'Опубликовать';
};


const resetForm = () => {
  photoUploadFormElement.reset();
  resetScale();
  resetEffect();
  photoUploadInputElement.value = '';
  hidePhotoUpload();
};

const sendFormData = (onSuccess, onFail) => {
  photoUploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendPhotos(
        () => {
          unblockSubmitButton();
          onSuccess();
          resetForm();

        },
        () => {
          unblockSubmitButton();
          onFail();
        },
        new FormData(evt.target)
      );
    }
  });
};

export { sendFormData };

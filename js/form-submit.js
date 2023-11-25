import { photoUploadFormElement, pristine } from './upload-form-validation.js';
import { sendPhotos } from './api.js';
import { resetScale } from './photo-scale.js';
import { reset as resetEffect } from './photo-effect.js';
import { photoUploadInputElement, hidePhotoUpload } from './photo-upload.js';
import { showErrorMessage, showSuccessMessage } from './service-messages.js';

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


const sendFormData = (onSuccess, onFail, evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    sendPhotos(
      () => {
        unblockSubmitButton();
        resetForm();
        onSuccess();
      },
      () => {
        unblockSubmitButton();
        onFail();
      },
      new FormData(evt.target)
    );
  }
};

const onFormSubmit = (evt) => {
  sendFormData(
    () => {
      showSuccessMessage();
      photoUploadFormElement.removeEventListener('submit', onFormSubmit);
    },
    () => showErrorMessage(),
    evt
  );


};

export { sendFormData, onFormSubmit };

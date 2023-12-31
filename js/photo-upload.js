
import { init as initEffect, reset as resetEffect } from './photo-effect.js';
import { resetScale, initScale } from './photo-scale.js';
import { isEscapeKey } from './utils.js';
import { pristine } from './upload-form-validation.js';

import { onFormSubmit } from './form-submit.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp'];

const photoFormUploadElement = document.querySelector('#upload-select-image');
const photoUploadInputElement = photoFormUploadElement.querySelector('.img-upload__input');
const photoUploadOverlayElement = photoFormUploadElement.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const photoPreviewElement = photoUploadOverlayElement.querySelector('.img-upload__preview img');

const closePhotoUploadButtonElement = photoFormUploadElement.querySelector('.img-upload__cancel');

const photoUploadFormElement = document.querySelector('#upload-select-image');
const effectsPreviewElement = photoUploadFormElement.querySelectorAll('.effects__preview');
const photoHashtagInputElement = photoUploadFormElement.querySelector('.text__hashtags');
const photoTextInputElement = photoUploadFormElement.querySelector('.text__description');

const isInputFieldOnFocus = () => document.activeElement === photoHashtagInputElement || document.activeElement === photoTextInputElement;


const isErrorMessageExists = () => Boolean(document.querySelector('.error'));

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isInputFieldOnFocus() && !isErrorMessageExists()) {
    evt.preventDefault();
    hidePhotoUpload();

  }
};

function hidePhotoUpload() {
  photoFormUploadElement.reset();
  pristine.reset();
  resetEffect();
  resetScale();
  photoUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  photoUploadInputElement.value = '';

  document.removeEventListener('keydown', onDocumentKeydown);
}

const onClosePhotoUpload = () => {
  hidePhotoUpload();
};

const changePhotoPreview = () => {
  const photoFile = photoUploadInputElement.files[0];
  const photoFileName = photoFile.name.toLowerCase();

  const matches = FILE_TYPES.some((end) => photoFileName.endsWith(end));

  if (matches) {
    photoPreviewElement.src = URL.createObjectURL(photoFile);
    effectsPreviewElement.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreviewElement.src}')`;
    });
  }
};


const showUploadForm = () => {
  changePhotoPreview();
  photoUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  photoUploadFormElement.addEventListener('submit', onFormSubmit);
};


photoUploadInputElement.addEventListener('change', () => {
  showUploadForm();
});

closePhotoUploadButtonElement.addEventListener('click', () => {
  onClosePhotoUpload();
});
initEffect();
initScale();

export { photoPreviewElement, photoUploadInputElement, photoUploadOverlayElement, hidePhotoUpload };

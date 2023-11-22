
import { init as initEffect, reset as resetEffect } from './photo-effect.js';
import { resetScale, initScale } from './photo-scale.js';
import { isEscapeKey } from './utils.js';
import { pristine } from './upload-form-validation.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const photoFormUploadElement = document.querySelector('#upload-select-image');
const photoUploadInputElement = photoFormUploadElement.querySelector('.img-upload__input');
const photoUploadOverlayElement = photoFormUploadElement.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const photoPreviewElement = photoUploadOverlayElement.querySelector('.img-upload__preview img');
const closePhotoUploadButtonElement = photoFormUploadElement.querySelector('.img-upload__cancel');

const photoUploadFormElement = document.querySelector('#upload-select-image');
const photoHashtagInputElement = photoUploadFormElement.querySelector('.text__hashtags');
const photoTextInputElement = photoUploadFormElement.querySelector('.text__description');

const isInputFieldOnFocus = () => document.activeElement === photoHashtagInputElement || document.activeElement === photoTextInputElement;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isInputFieldOnFocus()) {
    evt.preventDefault();
    hidePhotoUpload();

  }
};

function hidePhotoUpload() {
  photoUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  photoUploadInputElement.value = '';


  document.removeEventListener('keydown', onDocumentKeydown);
}

const onClosePhotoUpload = () => {
  photoFormUploadElement.reset();
  pristine.reset();
  hidePhotoUpload();
  resetEffect();
  resetScale();
};

const showUploadForm = () => {
  photoUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);

};

const changePhotoPreview = () => {
  const photoFile = photoUploadInputElement.files[0];
  const photoFileName = photoFile.name.toLowerCase();

  const matches = FILE_TYPES.some((end) => photoFileName.endsWith(end));

  if (matches) {
    photoPreviewElement.scr = URL.createObjectURL(photoFile);
  }
};


photoUploadInputElement.addEventListener('change', () => {
  showUploadForm();
  changePhotoPreview();
  initEffect();
  initScale();
});

closePhotoUploadButtonElement.addEventListener('click', () => {
  onClosePhotoUpload();
});


export { photoPreviewElement };

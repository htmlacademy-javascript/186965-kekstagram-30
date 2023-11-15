import { photoUploadFormElement, pristine } from './upload-form-validation.js';


const sendFormData = () => {
  photoUploadFormElement.addEventListener('submit', (evt) => {
    // evt.preventDefault();

    const isValid = pristine.validate();

    if (!isValid) {
      evt.preventDefault();
    }
  });
};

export { sendFormData };

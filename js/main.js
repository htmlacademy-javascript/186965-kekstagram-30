import { renderGallery } from './gallery.js';
import './photo-upload.js';
import './upload-form-validation.js';
import { showErrorAlert, showErrorMessage, showSuccessMessage } from './service-messages.js';

import { loadPhotos } from './api.js';
import { sendFormData } from './form-submit.js';

loadPhotos(renderGallery, showErrorAlert);

sendFormData(
  () => showSuccessMessage(),
  () => showErrorMessage()
);

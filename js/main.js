import { renderGallery } from './gallery.js';
// import './upload-form-validation.js';
// import { sendFormData } from './form-submit.js';
import { loadPhotos } from './api.js';
import { showErrorMessage } from './service-messages.js';


const bootstrap = async () => {
  try {
    const photos = await loadPhotos();
    renderGallery(photos);
  } catch (error) {
    showErrorMessage();
  }

};


bootstrap();

// sendFormData();

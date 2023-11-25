import { renderGallery } from './gallery.js';
import './photo-upload.js';
import './upload-form-validation.js';
import { showErrorAlert} from './service-messages.js';

import { loadPhotos } from './api.js';

import { initFilter } from './photo-filter.js';


loadPhotos(
  (photos) => {
    renderGallery(photos);
    initFilter(photos);
  },
  () => showErrorAlert()
);



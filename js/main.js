import { photos } from './data.js';
import { renderGallery } from './gallery.js';
import './photo-upload.js';
import './upload-form-validation.js';
import { sendFormData } from './form-submit.js';


renderGallery(photos());
sendFormData();

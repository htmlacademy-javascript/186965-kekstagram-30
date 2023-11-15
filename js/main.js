import { photos } from './data.js';
import { renderGallery } from './gallery.js';
import './photo-upload.js';
import './upload-form-validation.js';
import { sendFormData } from './form-submit.js';
import './photo-editing-slider.js';


renderGallery(photos());
sendFormData();

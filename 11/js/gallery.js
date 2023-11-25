
import { showFullPhoto } from './photo.js';
import { renderThumbnails } from './thumbnail.js';


const photosBlockElement = document.querySelector('.pictures');

const findPhotoElementInArrayById = (photoId, photosArray) => photosArray.find((photo) => photo.id === Number(photoId));


const onPhotoClick = (photos) => {
  photosBlockElement.addEventListener('click', (evt) => {
    const currentEventTarget = evt.target.closest('.picture');

    if (currentEventTarget) {
      const targetPhotoId = currentEventTarget.dataset.photoId;
      const targetPhotoObject = findPhotoElementInArrayById(targetPhotoId, photos);

      showFullPhoto(targetPhotoObject);

    }
  });

};


const renderGallery = (photos) => {
  renderThumbnails(photos, photosBlockElement);
  onPhotoClick(photos);
};


export { renderGallery };



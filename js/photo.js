import { isEscapeKey } from './utils.js';
import {emptyCommentList, updateCommentsList} from './comment.js';


const fullPhotoOverlayElement = document.querySelector('.big-picture');
const fullPhotoImageElement = fullPhotoOverlayElement.querySelector('.big-picture__img img');
const fullPhotoLikesCountElement = fullPhotoOverlayElement.querySelector('.likes-count');
const fullPhotoCommentsElement = fullPhotoOverlayElement.querySelector('.social__comment-total-count');
const fullPhotoDescriptionElement = fullPhotoOverlayElement.querySelector('.social__caption');


const fullPhotoCloseElement = fullPhotoOverlayElement.querySelector('.big-picture__cancel');
const bodyElement = document.querySelector('body');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideFullPhoto();
  }
};

function hideFullPhoto () {
  fullPhotoOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('model');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onClosePhotoButton = () => {
  hideFullPhoto();
};


const renderFullPhoto = ({ url, likes, comments, description }) => {
  fullPhotoImageElement.src = url;
  fullPhotoLikesCountElement.textContent = likes;
  fullPhotoCommentsElement.textContent = comments.length;
  fullPhotoDescriptionElement.textContent = description;


  if (comments.length) {
    updateCommentsList(comments);
  } else {
    emptyCommentList();
  }

};


const showFullPhoto = (photoData) => {
  fullPhotoOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');


  renderFullPhoto(photoData);

  document.addEventListener('keydown', onDocumentKeydown);
};

fullPhotoCloseElement.addEventListener('click', () => {
  onClosePhotoButton();
});

export { showFullPhoto };

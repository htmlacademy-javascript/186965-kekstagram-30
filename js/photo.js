import { isEscapeKey } from './utils.js';
import {emptyCommentList, renderComments} from './comment.js';

const START_COMMENT_COUNT = 5;

const fullPhotoOverlayElement = document.querySelector('.big-picture');
const fullPhotoImageElement = fullPhotoOverlayElement.querySelector('.big-picture__img img');
const fullPhotoLikesCountElement = fullPhotoOverlayElement.querySelector('.likes-count');
const fullPhotoCommentsElement = fullPhotoOverlayElement.querySelector('.social__comment-total-count');
const fullPhotoDescriptionElement = fullPhotoOverlayElement.querySelector('.social__caption');
const fullPhotoCommentCountElement = fullPhotoOverlayElement.querySelector('.social__comment-count');
const fullPhotoCommentLoaderElement = fullPhotoOverlayElement.querySelector('.comments-loader');

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


  let showedCommentsAmount = 0;

  const updateCommentsList = () => {

    const commentsCount = comments.length;

    showedCommentsAmount += START_COMMENT_COUNT;

    if (showedCommentsAmount >= commentsCount) {
      showedCommentsAmount = commentsCount;
      fullPhotoCommentLoaderElement.classList.add('hidden');
      fullPhotoCommentLoaderElement.removeEventListener('click', updateCommentsList);
    } else {
      fullPhotoCommentLoaderElement.classList.remove('hidden');
      fullPhotoCommentLoaderElement.addEventListener('click', updateCommentsList);
    }

    renderComments(comments.slice(0, showedCommentsAmount));
    fullPhotoCommentCountElement.innerHTML = `<span class='social__comment-shown-count'>${showedCommentsAmount}</span> из <span class="social__comment-total-count">${commentsCount}</span> комментариев`;

  };


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

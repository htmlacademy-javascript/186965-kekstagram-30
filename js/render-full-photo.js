import { isEscapeKey } from './utils.js';

const bigPhotoOverlayElement = document.querySelector('.big-picture');
const bigPhotoImageElement = bigPhotoOverlayElement.querySelector('.big-picture__img img');
const bigPhotoLikesCountElement = bigPhotoOverlayElement.querySelector('.likes-count');
const bigPhotoCommentsShownElement = bigPhotoOverlayElement.querySelector('.social__comment-shown-count');
const bigPhotoCommentsElement = bigPhotoOverlayElement.querySelector('.social__comment-total-count');
const bigPhotoDescriptionElement = bigPhotoOverlayElement.querySelector('.social__caption');
const bigPhotoCommentCountElement = bigPhotoOverlayElement.querySelector('.social__comment-count');
const bigPhotoCommentLoaderElement = bigPhotoOverlayElement.querySelector('.comments-loader');
const bigPhotoCloseElement = bigPhotoOverlayElement.querySelector('.big-picture__cancel');


const findPhotoElementInArrayById = (photoId, photosArray) => photosArray.find((photo) => photo.id === Number(photoId));

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseFullPhoto();
  }
};


const renderComment = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  const commentListElement = bigPhotoOverlayElement.querySelector('.social__comments');
  commentListElement.innerHTML = '';

  if (comments.length) {
    comments.forEach((comment) => {
      const commentItem = document.createElement('li');
      const commentAvatar = document.createElement('img');
      const commentText = document.createElement('p');

      commentItem.classList.add('social__comment');
      commentAvatar.classList.add('social__picture');
      commentText.classList.add('social__text');

      commentAvatar.src = comment.avatar;
      commentAvatar.alt = comment.name;
      commentAvatar.width = '35';
      commentAvatar.height = '35';
      commentText.textContent = comment.message;

      commentItem.append(commentAvatar);
      commentItem.append(commentText);

      commentsFragment.append(commentItem);
    });

    commentListElement.append(commentsFragment);
  } else {
    bigPhotoCommentCountElement.textContent = 'К данной фотографии нет комментариев';
    bigPhotoCommentLoaderElement.classList.add('hidden');
  }
};

const renderFullPhoto = ({ url, likes, comments, description }) => {
  bigPhotoImageElement.src = url;
  bigPhotoLikesCountElement.textContent = likes;
  bigPhotoCommentsShownElement.textContent = 2;
  bigPhotoCommentsElement.textContent = comments.length;

  renderComment(comments);

  bigPhotoDescriptionElement.textContent = description;
};


function onCloseFullPhoto () {
  bigPhotoOverlayElement.classList.add('hidden');


  document.removeEventListener('keydown', onDocumentKeydown);
}


const onPhotoClick = (photoArray) => (evt) => {

  const currentEventTarget = evt.target.closest('.picture');
  evt.preventDefault();


  if (currentEventTarget) {
    const targetPhotoId = currentEventTarget.dataset.photoId;
    const targetPhotoObject = findPhotoElementInArrayById(targetPhotoId, photoArray);
    bigPhotoOverlayElement.classList.remove('hidden');


    renderFullPhoto(targetPhotoObject);

    document.addEventListener('keydown', onDocumentKeydown);
  }
};


bigPhotoCloseElement.addEventListener('click', () => {
  onCloseFullPhoto();
});


export { onPhotoClick };

import { isEscapeKey } from './utils.js';

const START_COMMENT_COUNT = 5;

const bigPhotoOverlayElement = document.querySelector('.big-picture');
const bigPhotoImageElement = bigPhotoOverlayElement.querySelector('.big-picture__img img');
const bigPhotoLikesCountElement = bigPhotoOverlayElement.querySelector('.likes-count');
const bigPhotoCommentsElement = bigPhotoOverlayElement.querySelector('.social__comment-total-count');
const bigPhotoDescriptionElement = bigPhotoOverlayElement.querySelector('.social__caption');
const bigPhotoCommentCountElement = bigPhotoOverlayElement.querySelector('.social__comment-count');
const bigPhotoCommentLoaderElement = bigPhotoOverlayElement.querySelector('.comments-loader');
const bigPhotoCloseElement = bigPhotoOverlayElement.querySelector('.big-picture__cancel');
const bigPhotoCommentListElement = bigPhotoOverlayElement.querySelector('.social__comments');


const findPhotoElementInArrayById = (photoId, photosArray) => photosArray.find((photo) => photo.id === Number(photoId));

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseFullPhoto();
  }
};


const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  bigPhotoCommentListElement.innerHTML = '';

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

  bigPhotoCommentListElement.append(commentsFragment);

};



const renderFullPhoto = ({ url, likes, comments, description }) => {
  bigPhotoImageElement.src = url;
  bigPhotoLikesCountElement.textContent = likes;
  bigPhotoCommentsElement.textContent = comments.length;
  bigPhotoDescriptionElement.textContent = description;

  const commentsCount = comments.length;
  let showedCommentsAmount = 0;

  const updateCommentsList = () => {
    showedCommentsAmount += START_COMMENT_COUNT;

    if (showedCommentsAmount >= commentsCount) {
      showedCommentsAmount = commentsCount;
      bigPhotoCommentLoaderElement.classList.add('hidden');
      bigPhotoCommentLoaderElement.removeEventListener('click', updateCommentsList);
    } else {
      bigPhotoCommentLoaderElement.classList.remove('hidden');
      bigPhotoCommentLoaderElement.addEventListener('click', updateCommentsList);
    }

    bigPhotoCommentListElement.innerHTML = '';
    renderComments(comments.slice(0, showedCommentsAmount));
    bigPhotoCommentCountElement.innerHTML = `<span class='social__comment-shown-count'>${showedCommentsAmount}</span> из <span class="social__comment-total-count">${commentsCount}</span> комментариев`;

  };

  if (comments.length) {
    updateCommentsList();
  } else {
    bigPhotoCommentListElement.innerHTML = '';
    bigPhotoCommentLoaderElement.classList.add('hidden');
    bigPhotoCommentCountElement.innerHTML = 'К этой фотографии пока нет комментариев.';
  }
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

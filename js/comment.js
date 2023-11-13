
const START_COMMENT_COUNT = 5;
let showedCommentsAmount = 0;

const commentTemplateElement = document.querySelector('#comment').content.querySelector('.social__comment');

const fullPhotoOverlayElement = document.querySelector('.big-picture');
const commentsListElement = fullPhotoOverlayElement.querySelector('.social__comments');
const fullPhotoCommentCountElement = fullPhotoOverlayElement.querySelector('.social__comment-count');
const fullPhotoCommentLoaderElement = fullPhotoOverlayElement.querySelector('.comments-loader');


const createComment = ({avatar, message, name}) => {
  const newComment = commentTemplateElement.cloneNode(true);

  newComment.querySelector('.social__text').textContent = message;
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;

  return newComment;
};


const emptyCommentList = () => {
  fullPhotoCommentLoaderElement.classList.add('hidden');
  commentsListElement.innerHTML = '';

  fullPhotoCommentCountElement.innerHTML = 'К этой фотографии пока нет комментариев.';
};


const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  commentsListElement.innerHTML = '';


  comments.forEach((commentItem) => {
    const comment = createComment(commentItem);
    commentsFragment.append(comment);

  });

  commentsListElement.append(commentsFragment);
};

const updateCommentsList = (comments) => {

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


export { emptyCommentList, updateCommentsList };

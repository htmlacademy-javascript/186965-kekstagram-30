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


export { renderComments, emptyCommentList };

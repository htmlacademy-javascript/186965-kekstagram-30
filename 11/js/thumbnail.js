document.querySelector('.pictures__title').classList.remove('visually-hidden');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');


const usersPhotoListFragment = document.createDocumentFragment();

const createThumbnail = ({ id, url, description, likes, comments }) => {
  const userPhotoElement = photoTemplate.cloneNode(true);

  userPhotoElement.querySelector('.picture__img').src = url;
  userPhotoElement.querySelector('.picture__img').alt = description;
  userPhotoElement.querySelector('.picture__likes').textContent = likes;
  userPhotoElement.querySelector('.picture__comments').textContent = comments.length;
  userPhotoElement.dataset.photoId = id;

  return userPhotoElement;
};


const renderThumbnails = (photos,container) => {
  if (photos.length) {
    photos.forEach((photo) => {
      const photoThumbnail = createThumbnail(photo);

      usersPhotoListFragment.append(photoThumbnail);
    });

    container.append(usersPhotoListFragment);

  }
};

export { renderThumbnails };

import { photos } from './data.js';
import { onPhotoClick } from './render-full-photo.js';

const photosBlockElement = document.querySelector('.pictures');
photosBlockElement
  .querySelector('.pictures__title')
  .classList.remove('visually-hidden');
const photoTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const usersPhotos = photos();

const usersPhotoListFragment = document.createDocumentFragment();

const createUsersPictures = () => {
  if (usersPhotos.length) {
    usersPhotos.forEach(({ id, url, description, likes, comments }) => {
      const userPhotoElement = photoTemplate.cloneNode(true);

      userPhotoElement.querySelector('.picture__img').src = url;
      userPhotoElement.querySelector('.picture__img').alt = description;
      userPhotoElement.querySelector('.picture__likes').textContent = likes;
      userPhotoElement.querySelector('.picture__comments').textContent = comments.length;
      userPhotoElement.dataset.photoId = id;

      usersPhotoListFragment.append(userPhotoElement);
    });

    photosBlockElement.append(usersPhotoListFragment);

    photosBlockElement.addEventListener('click', onPhotoClick(usersPhotos));
  }
};

export { createUsersPictures };

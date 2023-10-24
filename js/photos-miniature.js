import { photos } from './data.js';

const picturesBlockElement = document.querySelector('.pictures');
picturesBlockElement
  .querySelector('.pictures__title')
  .classList.remove('visually-hidden');
const pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const randomUsersPhotos = photos();
const usersPhotoListFragment = document.createDocumentFragment();

const createRandomUsersPictures = () => {
  randomUsersPhotos.forEach(({ url, description, likes, comments }) => {
    const randomUserPhotoElement = pictureTemplate.cloneNode(true);

    randomUserPhotoElement.querySelector('.picture__img').src = url;
    randomUserPhotoElement.querySelector('.picture__img').alt = description;
    randomUserPhotoElement.querySelector('.picture__likes').textContent = likes;
    randomUserPhotoElement.querySelector('.picture__comments').textContent =
      comments.length;

    usersPhotoListFragment.append(randomUserPhotoElement);
  });

  picturesBlockElement.append(usersPhotoListFragment);
};

export { createRandomUsersPictures };

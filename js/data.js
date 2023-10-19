import {
  createRandomId,
  getRandomArrayElement,
  getRandomInteger,
} from './utils.js';

const PHOTO_URL = 'photos/';
const AVATAR_URL = 'img/avatar';
const MIN_AMOUNT = 1;
const MAX_PHOTOS_AMOUNT = 25;
const MIN_LIKES_AMOUNT = 15;
const MAX_LIKES_AMOUNT = 200;
const MAX_COMMENTS_AMOUNT = 30;
const photoDescriptions = [
  'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue;',
  'and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.',
  'These cases are perfectly simple and easy to distinguish.',
  'In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided.',
  'But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted.',
  'The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains',
];
const photoCommentTexts = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const commentNames = ['Chandler', 'Monica', 'Rachel', 'Ross', 'Joey', 'Phoebe'];

const generatePhotoId = createRandomId(MIN_AMOUNT, MAX_PHOTOS_AMOUNT);
const generateRandomPhotoUrl = createRandomId(MIN_AMOUNT, MAX_PHOTOS_AMOUNT);
const generatePhotoCommentId = createRandomId(MIN_AMOUNT, 1000);

const createCommentMessage = () =>
  Array.from({ length: getRandomInteger(1, 2) }, () =>
    getRandomArrayElement(photoCommentTexts)
  ).join(' ');

const createPhotoComment = () => ({
  id: generatePhotoCommentId(),
  avatar: `${AVATAR_URL}${getRandomInteger(MIN_AMOUNT, 6)}.svg`,
  message: createCommentMessage(),
  name: getRandomArrayElement(commentNames),
});

const createPhotoElement = () => ({
  id: generatePhotoId(),
  url: `${PHOTO_URL}${generateRandomPhotoUrl()}.jpg`,
  description: getRandomArrayElement(photoDescriptions),
  likes: getRandomInteger(MIN_LIKES_AMOUNT, MAX_LIKES_AMOUNT),
  comments: Array.from(
    { length: getRandomInteger(0, MAX_COMMENTS_AMOUNT) },
    createPhotoComment
  ),
});

const photos = () =>
  Array.from({ length: MAX_PHOTOS_AMOUNT }, createPhotoElement);

export { photos };

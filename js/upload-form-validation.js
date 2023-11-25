const HASHTAG_RULES = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const photoUploadFormElement = document.querySelector('#upload-select-image');
const photoHashtagInputElement = photoUploadFormElement.querySelector('.text__hashtags');


const pristine = new Pristine(photoUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});


const normalizeHashtag = (str) => {
  const hashtags = str.trim().toLowerCase().split(' ').filter((hashtag) => hashtag.length > 0);

  return hashtags;
};

const findHashtagDuplicates = (hashtags) => new Set(hashtags).size !== hashtags.length;

const validateHashtag = (value) => {
  const hashtagInputValueArray = normalizeHashtag(value);

  return hashtagInputValueArray.every((item) => HASHTAG_RULES.test(item) || item.length === 0);
};

const validateHashtagLength = (value) => {
  const hashtagInputValueArray = normalizeHashtag(value);

  return hashtagInputValueArray.length <= MAX_HASHTAG_COUNT;
};

const validateHashtagsDuplicates = (value) => {
  const hashtagInputValueArray = normalizeHashtag(value);

  return !findHashtagDuplicates(hashtagInputValueArray);
};

pristine.addValidator(
  photoHashtagInputElement,
  validateHashtag,
  'Введён невалидный хэш-тег',
  1,
  true
);

pristine.addValidator(
  photoHashtagInputElement,
  validateHashtagLength,
  'Превышено количество хэш-тегов',
  2,
  true
);

pristine.addValidator(
  photoHashtagInputElement,
  validateHashtagsDuplicates,
  'Хэш-теги повторяются',
  3,
  true
);


export { photoUploadFormElement, pristine };

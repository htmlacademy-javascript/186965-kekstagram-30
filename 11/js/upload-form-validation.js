const HASHTAG_RULES = /^#[a-zа-яё0-9]{1,19}$/i;
const photoUploadFormElement = document.querySelector('#upload-select-image');
const photoHashtagInputElement = photoUploadFormElement.querySelector('.text__hashtags');


const pristine = new Pristine(photoUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'invalid-error'
}, false);


const normalizeHashtag = (hashtag) => hashtag.trim().toLowerCase().split(' ');

const findHashtagDuplicates = (hashtags) => new Set(hashtags).size !== hashtags.length;

const validateHashtag = (value) => {
  const hashtagInputValueArray = normalizeHashtag(value);

  return hashtagInputValueArray.every((item) => HASHTAG_RULES.test(item) || item.length === 0);
};

const validateHashtagLength = (value) => {
  const hashtagInputValueArray = normalizeHashtag(value);

  return hashtagInputValueArray.length <= 5;
};

const validateHashtagsDuplicates = (value) => {
  const hashtagInputValueArray = normalizeHashtag(value);

  return !findHashtagDuplicates(hashtagInputValueArray);
};

pristine.addValidator(photoHashtagInputElement, validateHashtag, 'Введён невалидный хэш-тег');
pristine.addValidator(photoHashtagInputElement, validateHashtagLength, 'Превышено количество хэш-тегов');
pristine.addValidator(photoHashtagInputElement, validateHashtagsDuplicates, 'Хэш-теги повторяются');


export { photoUploadFormElement, pristine };

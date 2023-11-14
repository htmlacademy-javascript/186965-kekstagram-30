// комментарий не обязателен;
// длина комментария не может составлять больше 140 символов;
// если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.


const HASHTAG_RULES = /^#[a-zа-яё0-9]{1,19}$/i;
const photoUploadFormElement = document.querySelector('#upload-select-image');
const photoHashtagInputElement = photoUploadFormElement.querySelector('.text__hashtags');
const photoTextInputElement = photoUploadFormElement.querySelector('.text__description');

const pristine = new Pristine(photoUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'invalid-error'
}, false);


// Валидация Hashtag
const normalizeHashtag = (hashtag) => hashtag.trim().split(' ');

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

pristine.addValidator(photoHashtagInputElement, validateHashtag, 'Неккоректный хэштег');
pristine.addValidator(photoHashtagInputElement, validateHashtagLength, 'Много хэштегов');
pristine.addValidator(photoHashtagInputElement, validateHashtagsDuplicates, 'Повтояющийся хэштег');



photoUploadFormElement.addEventListener('submit', () => {
  // evt.preventDefault();
  pristine.validate();
});

import { isEscapeKey } from './utils.js';

const ALERT_SHOW_TIME = 5000;

const errorDataLoadMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const successSendDataMessageTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorSendLoadMessageTemplate = document.querySelector('#error').content.querySelector('.error').cloneNode(true);


const hideServiceMessage = () => {
  const currentMessage = document.querySelector('.success') || document.querySelector('.error');

  currentMessage.remove();
  document.removeEventListener('keydown', onEscKey);
  document.body.removeEventListener('click', onBodyClick);
};


function onEscKey(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideServiceMessage();
  }
}


function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || (evt.target.closest('.error__inner'))) {
    return;
  }
  hideServiceMessage();
}

const onCloseButtonClick = () => {
  hideServiceMessage();
};


const addMessage = (message, buttonClass) => {
  document.body.append(message);
  document.addEventListener('keydown', onEscKey);
  document.body.addEventListener('click', onBodyClick);
  message.querySelector(buttonClass).addEventListener('click', onCloseButtonClick);
};


const showSuccessMessage = () => {
  addMessage(successSendDataMessageTemplate, '.success__button');
};

const showErrorMessage = () => {
  addMessage(errorSendLoadMessageTemplate, '.error__button');
};


const showErrorAlert = () => {
  document.body.append(errorDataLoadMessageTemplate);

  setTimeout(() => {
    errorDataLoadMessageTemplate.remove();
  }, ALERT_SHOW_TIME);
};

export { showErrorMessage, showSuccessMessage, showErrorAlert };

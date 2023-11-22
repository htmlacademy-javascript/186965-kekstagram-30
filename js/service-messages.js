const ERROR_SHOW_TIME = 5000;

const errorMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  document.body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, ERROR_SHOW_TIME);
};


export { showErrorMessage };

import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const emailRef = document.querySelector('input');
const messageRef = document.querySelector('textarea');

const LOCALSTORAGE_KEY = 'feedback-form-state';

// let formData = {
//   email: e.currentTarget.elements.email.value,
//   message: e.currentTarget.elements.message.value,
// };
let formData = {
  email: '',
  message: '',
};

formRef.addEventListener('input', throttle(onFormInput, 500));
formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  e.target.reset();
  console.log(formData);
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

window.addEventListener('DOMContentLoaded', writeFormValue);

function writeFormValue() {
  const parsedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  if (parsedData) {
    emailRef.value = parsedData.email;
    messageRef.value = parsedData.message;
    formData.email = parsedData.email;
    formData.message = parsedData.message;
  }
}

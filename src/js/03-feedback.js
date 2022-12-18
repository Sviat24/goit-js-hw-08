import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
};

const STORAGE_KEY = 'feedback-form-state';

const onFormInput = e => {
  e.preventDefault();

  const email = refs.form.elements.email.value;
  const message = refs.form.elements.message.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, message }));
};
refs.form.addEventListener('input', throttle(onFormInput, 500));

const onLoadFormData = e => {
  e.preventDefault();

  const getStorageItem = localStorage.getItem(STORAGE_KEY);
  const onSaveFormData = JSON.parse(getStorageItem) || {
    email: '',
    message: '',
  };
  const { email, message } = onSaveFormData;

  refs.form.elements.email.value = email;
  refs.form.elements.message.value = message;
};
window.addEventListener('load', onLoadFormData);

const onFormSubmit = e => {
  e.preventDefault();

  const { email, message } = refs.form.elements;
  console.log({ email: email.value, message: message.value });

  localStorage.removeItem(STORAGE_KEY);

  refs.form.reset();
};
refs.form.addEventListener('submit', onFormSubmit);

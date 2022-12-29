import throttle from 'lodash.throttle';
import localStorageService from './helper';
const { saveToLS, loadFromLS, removeFromLS } = localStorageService;

const LOCAL_STORAGE_KEY = 'feedback-form-state';

const refs = {
  fitBackFormEl: document.querySelector('.feedback-form'),
  fields: document
    .querySelector('.feedback-form')
    .querySelectorAll('input, textarea'),
};

refs.fitBackFormEl.addEventListener(
  'input',
  throttle(onFormElementsInput, 500)
);
refs.fitBackFormEl.addEventListener('submit', onFormSubmit);

let savedObject = {};
let userFitBack = {};

fillInFormData();

function fillInFormData() {
  savedObject = loadFromLS(LOCAL_STORAGE_KEY);

  if (savedObject) {
    for (const prop in savedObject) {
      refs.fitBackFormEl.elements[prop].value = savedObject[prop];
    }
    createUser();
  }
}

function createUser() {
  const data = new FormData(refs.fitBackFormEl);

  for (const [key, value] of data.entries()) {
    userFitBack[key] = value;
  }
  return userFitBack;
}

function onFormElementsInput(event) {
  createUser();

  saveToLS(LOCAL_STORAGE_KEY, userFitBack);

  return userFitBack;
}

function onFormSubmit(event) {
  for (const el of refs.fields) {
    if (el.value === '') {
      alert('Заповніть всі поля форми, будь ласка!');
      return;
    }
  }

  event.preventDefault();

  event.target.reset();

  removeFromLS(LOCAL_STORAGE_KEY);

  console.log(userFitBack);
}

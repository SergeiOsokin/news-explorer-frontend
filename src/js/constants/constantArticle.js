const BODY_DOCUMENT = document.querySelector('.body');
const PROPS = {
  isLoggedIn: '',
  userName: '',
};

const HEADER = BODY_DOCUMENT.querySelector('.header');
const INFO_BLOCK = BODY_DOCUMENT.querySelector('.info-block');
const ARTICLES_CONTAINER = BODY_DOCUMENT.querySelector('.results-list');
const BUTTON_EXIT = BODY_DOCUMENT.querySelector('.header__button_loggined');
const BASE_OPTION_MAIN_API = {
  baseUrl: 'http://localhost:3000/',
  credentials: 'include',
  header: { 'Content-Type': 'application/json' },
};


export {
  BODY_DOCUMENT,
  PROPS,
  HEADER,
  INFO_BLOCK,
  ARTICLES_CONTAINER,
  BUTTON_EXIT,
  BASE_OPTION_MAIN_API,
};

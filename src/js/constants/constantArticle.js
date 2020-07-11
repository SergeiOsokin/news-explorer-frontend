const bodyDocument = document.querySelector('.body');
const header = bodyDocument.querySelector('.header');
const infoBlock = bodyDocument.querySelector('.info-block');
const articlesContainer = bodyDocument.querySelector('.results-list');
const buttonExit = bodyDocument.querySelector('.header__button_loggined');

const PROPS = {
  isLoggedIn: '',
  userName: '',
};

const BASE_OPTION_MAIN_API = {
  baseUrl: 'http://localhost:3000/',
  // baseUrl: 'https://www.api.news-search.tk/',
  credentials: 'include',
};

const ERRORS = {
  errorDelete: 'Ошибка удаления статьи ',
};

export {
  bodyDocument,
  PROPS,
  header,
  infoBlock,
  articlesContainer,
  buttonExit,
  BASE_OPTION_MAIN_API,
  ERRORS,
};

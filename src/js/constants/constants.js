/* eslint-disable prefer-const */
/* eslint-disable import/no-mutable-exports */
// eslint-disable-next-line no-undef
const bodyDocument = document.querySelector('.body');
const buttonClose = bodyDocument.querySelectorAll('.popup__close');
// popups
const popupEntrance = bodyDocument.querySelector('.popup_entrance');
const popupRegistration = bodyDocument.querySelector('.popup_registration');
const popupSuccessfully = bodyDocument.querySelector('.popup_successfully');
const blockSearch = bodyDocument.querySelector('.search');
// forms
const formEntrance = popupEntrance.querySelector('.popup__form');
const formRegistration = popupRegistration.querySelector('.popup__form');
const formSearch = blockSearch.querySelector('.search__form');
// popups' button/link
const buttonAutorization = bodyDocument.querySelector('.header__button');
const linkRegistration = bodyDocument.querySelector('.popup__link_registration');
const linkEntrance = bodyDocument.querySelector('.popup__link_entrance');
const linkSuccessfully = bodyDocument.querySelector('.popup__link_successfully');

const header = bodyDocument.querySelector('.header');
const headerMenu = bodyDocument.querySelector('.header__checkbox');

const resultBlock = bodyDocument.querySelector('.result');
const prelouder = bodyDocument.querySelector('.result__searching_download');
const notFound = bodyDocument.querySelector('.result__searching_nothing');
const buttonShowMore = bodyDocument.querySelector('.result__button');
const articlesContainer = bodyDocument.querySelector('.results-list');
const resultFound = bodyDocument.querySelector('.result__found');


const BASE_OPTION_LOCAL = 'http://newsapi.org/v2/everything?'
+ 'pageSize=50&'
+ 'apiKey=f71a1f23df3e4dd3944aa53cca2414a6&';

const BASE_OPTION_DEPLOY = 'https://nomoreparties.co/news/v2/everything?'
+ 'pageSize=50&'
+ 'apiKey=f71a1f23df3e4dd3944aa53cca2414a6&';

const BASE_OPTION_MAIN_API = {
  baseUrl: 'http://localhost:3000/',
  // baseUrl: 'https://www.api.news-search.tk/',
  credentials: 'include',
  header: { 'Content-Type': 'application/json' },
};

const PROPS = {
  isLoggedIn: '',
  userName: '',
};

const INPUT_ERRORS = {
  tooShort: 'Должно быть от 2 до 30 символов',
  valueMissing: 'Это обязательное поле',
  patternMismatch: 'Введите корректный email',
  failFetch: 'Не удалось выполнить запрос',
};

const OTHER_ERRORS = {
  failUnlog: 'Не удается выполнить выход ',
  failSaveArt: 'Ошибка при сохранении статьи ',
  failDeleteArt: 'Ошибка при удалении статьи ',
  noInternet: 'Отсутствует подключение к интренету',
  tryLater: 'Неизвестная ошибка. Попробуйте позже',
  serverBreak: 'Сервер не доступен',
};

const isDev = process.env.NODE_ENV === 'development' ? BASE_OPTION_LOCAL : BASE_OPTION_DEPLOY;

export {
  bodyDocument,
  popupEntrance,
  popupRegistration,
  popupSuccessfully,
  buttonAutorization,
  buttonClose,
  linkRegistration,
  linkEntrance,
  INPUT_ERRORS,
  linkSuccessfully,
  header,
  formEntrance,
  formRegistration,
  blockSearch,
  PROPS,
  isDev,
  formSearch,
  prelouder,
  notFound,
  articlesContainer,
  resultFound,
  buttonShowMore,
  resultBlock,
  headerMenu,
  BASE_OPTION_MAIN_API,
  OTHER_ERRORS,
};

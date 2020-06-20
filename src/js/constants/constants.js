/* eslint-disable prefer-const */
/* eslint-disable import/no-mutable-exports */
// eslint-disable-next-line no-undef
const BODY_DOCUMENT = document.querySelector('.body');
const BUTTON_CLOSE = BODY_DOCUMENT.querySelectorAll('.popup__close');
// popups
const POPUP_ENTRANCE = BODY_DOCUMENT.querySelector('.popup_entrance');
const POPUP_REGISTRATION = BODY_DOCUMENT.querySelector('.popup_registration');
const POPUP_SUCCESSFULLY = BODY_DOCUMENT.querySelector('.popup_successfully');
const BLOCK_SEARCH = BODY_DOCUMENT.querySelector('.search');
// forms
const FORM_ENTRANCE = POPUP_ENTRANCE.querySelector('.popup__form');
const FORM_REGISTRATION = POPUP_REGISTRATION.querySelector('.popup__form');
const FORM_SEARCH = BLOCK_SEARCH.querySelector('.search__form');
// popups' button/link
const BUTTON_AUTORIZATION = BODY_DOCUMENT.querySelector('.header__button');
const LINK_REGISTRATION = BODY_DOCUMENT.querySelector('.popup__link_registration');
const LINK_ENTRANCE = BODY_DOCUMENT.querySelector('.popup__link_entrance');
const LINK_SUCCESSFULLY = BODY_DOCUMENT.querySelector('.popup__link_successfully');
// errors
const INPUT_ERRORS = {
  tooShort: 'Должно быть от 2 до 30 символов',
  valueMissing: 'Это обязательное поле',
  patternMismatch: 'Введите корректный email',
};

const HEADER = BODY_DOCUMENT.querySelector('.header');
const PROPS = {
  isLoggedIn: '',
  userName: '',
};
const PRELOUDER = BODY_DOCUMENT.querySelector('.result__searching_download');
const NOT_FOUND = BODY_DOCUMENT.querySelector('.result__searching_nothing');

const ARTICLES_CONTAINER = BODY_DOCUMENT.querySelector('.results-list');
const RESULT_FOUND = BODY_DOCUMENT.querySelector('.result__found');

const BASE_OPTION = 'http://newsapi.org/v2/everything?'
+ 'pageSize=10&'
+ 'apiKey=f71a1f23df3e4dd3944aa53cca2414a6&';

const BUTTON_SHOW_MORE = BODY_DOCUMENT.querySelector('.result__button');

export {
  BODY_DOCUMENT,
  POPUP_ENTRANCE,
  POPUP_REGISTRATION,
  POPUP_SUCCESSFULLY,
  BUTTON_AUTORIZATION,
  BUTTON_CLOSE,
  LINK_REGISTRATION,
  LINK_ENTRANCE,
  INPUT_ERRORS,
  LINK_SUCCESSFULLY,
  HEADER,
  FORM_ENTRANCE,
  FORM_REGISTRATION,
  BLOCK_SEARCH,
  PROPS,
  BASE_OPTION,
  FORM_SEARCH,
  PRELOUDER,
  NOT_FOUND,
  ARTICLES_CONTAINER,
  RESULT_FOUND,
  BUTTON_SHOW_MORE,
};

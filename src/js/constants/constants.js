// eslint-disable-next-line no-undef
const BODY_DOCUMENT = document.querySelector('.body');
const BUTTON_CLOSE = BODY_DOCUMENT.querySelectorAll('.popup__close');
// popups
const POPUP_ENTRANCE = BODY_DOCUMENT.querySelector('.popup_entrance');
const POPUP_REGISTRATION = BODY_DOCUMENT.querySelector('.popup_registration');
const POPUP_SUCCESSFULLY = BODY_DOCUMENT.querySelector('.popup_successfully');
// popups' button
const BUTTON_AUTORIZATION = BODY_DOCUMENT.querySelector('.header__button');
const LINK_REGISTRATION = BODY_DOCUMENT.querySelector('.popup__link_registration');
const LINK_ENTRANCE = BODY_DOCUMENT.querySelector('.popup__link_entrance');
// errors
const INPUT_ERRORS = {
  tooShort: 'Должно быть от 2 до 30 символов',
  valueMissing: 'Это обязательное поле',
  patternMismatch: 'Введите корректный email',
};

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
};

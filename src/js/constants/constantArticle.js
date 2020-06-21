const BODY_DOCUMENT = document.querySelector('.body');
const PROPS = {
  isLoggedIn: '',
  userName: '',
};

const HEADER = BODY_DOCUMENT.querySelector('.header');
const INFO_BLOCK = BODY_DOCUMENT.querySelector('.info-block');
const ARTICLES_CONTAINER = BODY_DOCUMENT.querySelector('.results-list');

export {
  BODY_DOCUMENT,
  PROPS,
  HEADER,
  INFO_BLOCK,
  ARTICLES_CONTAINER,
};

import '../css/style.css';

import * as constant from './constants/constants';
import Popup from './components/Popup';
import Form from './components/Form';
import Header from './components/Header';
import MainApi from './api/MainApi';

const POPUP_ENTRANCE = new Popup(constant.POPUP_ENTRANCE);
const POPUP_REGISTRATION = new Popup(constant.POPUP_REGISTRATION);
const POPUP_SUCCESSFULLY = new Popup(constant.POPUP_SUCCESSFULLY);

const FORM_ENTRANCE = new Form(constant.POPUP_ENTRANCE);
const FORM_REGISTRATION = new Form(constant.POPUP_REGISTRATION);

const HEADER_BLOCK = new Header(constant.HEADER);

const MAINAPI = new MainApi();

// listeners
constant.BUTTON_AUTORIZATION.addEventListener('click', (event) => {
  POPUP_ENTRANCE.open(event);
  FORM_ENTRANCE.setValidate(event);
});

for (const button of constant.BUTTON_CLOSE) {
  button.addEventListener('click', (event) => {
    POPUP_ENTRANCE.clearContent();
    POPUP_ENTRANCE.close();
    POPUP_REGISTRATION.clearContent();
    POPUP_REGISTRATION.close();
    POPUP_SUCCESSFULLY.close();
  });
}

constant.FORM_REGISTRATION.addEventListener('submit', (event) => {
  event.preventDefault();
  MAINAPI.signup(
    constant.FORM_REGISTRATION.emailreg.value,
    constant.FORM_REGISTRATION.passwordreg.value,
    constant.FORM_REGISTRATION.name.value,
  )
    .then((res) => {
      if (res.data) {
        POPUP_REGISTRATION.clearContent();
        POPUP_REGISTRATION.close();
        POPUP_SUCCESSFULLY.setContent();
        return;
      }
      return Promise.reject(res);
    })
    .catch((err) => FORM_REGISTRATION.setServerError(err.message));
});

constant.FORM_ENTRANCE.addEventListener('submit', (event) => {
  event.preventDefault();
  MAINAPI.signin(
    constant.FORM_ENTRANCE.emailenter.value,
    constant.FORM_ENTRANCE.passwordenter.value,
  )
    .then((res) => {
      if (res.data) {
        POPUP_ENTRANCE.clearContent();
        POPUP_ENTRANCE.close();
        HEADER_BLOCK.showSavedArticles();
        HEADER_BLOCK.changeButton(res.data);
        return;
      }
      return Promise.reject(res);
    })
    .catch((err) => FORM_ENTRANCE.setServerError(err.message));
});

constant.LINK_REGISTRATION.addEventListener('click', (event) => {
  POPUP_ENTRANCE.clearContent();
  POPUP_ENTRANCE.close();
  POPUP_REGISTRATION.open(event);
  FORM_REGISTRATION.setValidate(event);
});

constant.LINK_ENTRANCE.addEventListener('click', (event) => {
  POPUP_REGISTRATION.clearContent();
  POPUP_REGISTRATION.close();
  POPUP_ENTRANCE.open(event);
});

constant.LINK_SUCCESSFULLY.addEventListener('click', (event) => {
  POPUP_SUCCESSFULLY.close();
  POPUP_ENTRANCE.open(event);
});

MAINAPI.getUserData()
  .then((data) => {
    if (data.message) {
      return Promise.reject(data);
    }
    constant.PROPS.isLoggedIn = true;
    constant.PROPS.userName = data.data.name;
    return HEADER_BLOCK.render(constant.PROPS);
  })
  .catch((err) => console.log(err.message));


export { MAINAPI };

import '../css/style.css';

import * as constant from './constants/constants';
import Popup from './components/Popup';
import Form from './components/Form';

const POPUP_ENTRANCE = new Popup(constant.POPUP_ENTRANCE);
const POPUP_REGISTRATION = new Popup(constant.POPUP_REGISTRATION);
const POPUP_SUCCESSFULLY = new Popup(constant.POPUP_SUCCESSFULLY);

const FORM_ENTRANCE = new Form(constant.POPUP_ENTRANCE);
const FORM_REGISTRATION = new Form(constant.POPUP_REGISTRATION);

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

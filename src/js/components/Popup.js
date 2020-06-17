/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
export default class Popup {
  constructor(element) {
    this.element = element;
    // this.element.addEventListener('click', this.close);
  }

  open(event) {
    if (event.target.classList.contains('header__button')) {
      this.element.classList.add('popup_is-opened');
    }
    if (event.target.classList.contains('popup__link_registration')) {
      this.element.classList.add('popup_is-opened');
    }
    if (event.target.classList.contains('popup__link_entrance')) {
      this.element.classList.add('popup_is-opened');
    }
    if (event.target.classList.contains('popup__link_successfully')) {
      this.element.classList.add('popup_is-opened');
    }
  }

  close() {
    this.element.classList.remove('popup_is-opened');
  }

  clearContent() {
    this.element.querySelector('form').reset();
    this.element.querySelectorAll('.popup__error').forEach((item) => {
      item.textContent = '';
    });
  }

  setContent() {
    this.element.classList.add('popup_is-opened');
  }
}

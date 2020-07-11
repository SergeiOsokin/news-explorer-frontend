/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
export default class Popup {
  constructor(element) {
    this.element = element;
    this.form = this.element.querySelector('form');
    this.errorBlock = this.element.querySelectorAll('.popup__error');
  }

  open() {
    this.element.classList.add('popup_is-opened');
  }

  close() {
    this.element.classList.remove('popup_is-opened');
  }

  clearContent() {
    this.form.reset();
    this.errorBlock.forEach((item) => item.textContent = '');
  }

  setContent() {
    this.element.classList.add('popup_is-opened');
  }
}

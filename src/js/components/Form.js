/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
export default class Form {
  constructor(popup) {
    this.form = popup.querySelector('.popup__form');
    this.button = this.form.querySelector('.button');
  }

  setValidate(event) { // устанавливает валидацию
    this.form.addEventListener('input', this._validateForm.bind(this, this.form, this.button));
    this.form.addEventListener('input', this._validateInputElement.bind(event));
  }

  _validateInputElement(event) { // валидирует переданный в качестве аргумента инпут;
    const divError = event.target.closest('div').querySelector('.popup__error');
    if (event.target.validity.tooShort) {
      return divError.textContent = 'Должно быть от 2 до 30 символов';
    } if (event.target.validity.valueMissing) {
      return divError.textContent = 'Это обязательное поле';
    }
    if (event.target.validity.patternMismatch) {
      return divError.textContent = 'Введите корректный email';
    }
    return divError.textContent = '';
  }

  setServerError() { // добавляет форме ошибку, пришедшую с сервера;

  }

  _validateForm(form, button) { // валидирует всю форму;
    if (!form.checkValidity()) { // если наш блок не прошел проверку
      button.setAttribute('disabled', true);
      button.classList.remove('popup__button_active');
    } else {
      button.removeAttribute('disabled', false);
      button.classList.add('popup__button_active');
    }
  }

  _clear() { // вспомогательный метод, очищает поля формы;

  }

  _getInfo() { // вспомогательный метод, возвращает данные формы.

  }
}

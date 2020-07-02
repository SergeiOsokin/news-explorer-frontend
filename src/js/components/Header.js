export default class Header {
  constructor(header) {
    this.header = header;
    this.savedArtPage = this.header.querySelector('.header__menu-articles');
    this.buttonDefault = this.header.querySelector('.header__button');
  }

  render({ isLoggedIn, userName }) {
    if (isLoggedIn) {
      this.changeButton(userName);
      this.showSavedArticles();
    }
  }

  renderName({ isLoggedIn, userName }) {
    if (isLoggedIn) {
      this.changeButtonSavePage(userName);
    }
  }

  showSavedArticles() {
    this.savedArtPage.classList.toggle('header__menu-articles_not-logged');
  }

  changeButton(name) {
    this.buttonDefault.classList.add('header__button_loggined');
    this.buttonDefault.textContent = `${name} `;
    this.buttonDefault.insertAdjacentHTML('beforeEnd', '<span class="button__image"></span>');
  }

  backButtonAutorization() {
    this.buttonDefault.classList.remove('header__button_loggined');
    this.buttonDefault.textContent = 'Авторизация';
  }

  changeButtonSavePage(name) {
    this.buttonDefault.textContent = `${name} `;
    this.buttonDefault.insertAdjacentHTML('beforeEnd', '<span class="button__image_black"></span>');
  }
}

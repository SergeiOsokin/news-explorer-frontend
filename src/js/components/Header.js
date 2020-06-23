export default class Header {
  constructor(header) {
    this.header = header;
  }

  render({ isLoggedIn, userName }) {
    if (isLoggedIn) {
      this.changeButton(userName);
      this.showSavedArticles();
    }
  }

  renderName({ isLoggedIn, userName }) {
    if (isLoggedIn) {
      this.changeButton(userName);
    }
  }

  showSavedArticles() {
    this.header.querySelector('.header__menu-articles').classList.toggle('header__menu-articles_not-logged');
  }

  changeButton(name) {
    if (this.header.querySelector('.header__button')) {
      this.header.querySelector('.header__button').classList.add('disabled');
      this.header.querySelector('.header__button_loggined').classList.remove('disabled');
      this.header.querySelector('.header__button_loggined').textContent = name;
    }
    this.header.querySelector('.header__button_loggined').classList.remove('disabled');
    this.header.querySelector('.header__button_loggined').textContent = name;
  }

  backButtonAutorization() {
    this.header.querySelector('.header__button').classList.remove('disabled');
    this.header.querySelector('.header__button_loggined').classList.add('disabled');
    this.header.querySelector('.header__button_loggined').textContent = '';
  }
}

export default class Header {
  constructor(header) {
    this.header = header;
    this.savedArtPage = this.header.querySelector('.header__menu-articles');
    this.buttonDefault = this.header.querySelector('.header__button');
    this.buttonLoggined = this.header.querySelector('.header__button_loggined');
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
    this.savedArtPage.classList.toggle('header__menu-articles_not-logged');
  }

  changeButton(name) {
    if (this.buttonDefault) {
      this.buttonDefault.classList.add('disabled');
      this.buttonLoggined.classList.remove('disabled');
      this.buttonLoggined.textContent = name;
    }
    this.buttonLoggined.classList.remove('disabled');
    this.buttonLoggined.textContent = name;
  }

  backButtonAutorization() {
    this.buttonDefault.classList.remove('disabled');
    this.buttonLoggined.classList.add('disabled');
    this.buttonLoggined.textContent = '';
  }
}

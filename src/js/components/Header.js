export default class Header {
  constructor(header) {
    this.header = header;
    //
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
    // this.header.querySelector('.header__menu-articles').classList.toggle('header__menu-articles_not-logged');
  }

  changeButton(name) {
    if (this.buttonDefault) {
      // if (this.header.querySelector('.header__button')) {
      this.buttonDefault.classList.add('disabled');
      this.buttonLoggined.classList.remove('disabled');
      this.buttonLoggined.textContent = name;
      // this.header.querySelector('.header__button').classList.add('disabled');
      // this.header.querySelector('.header__button_loggined').classList.remove('disabled');
      // this.header.querySelector('.header__button_loggined').textContent = name;
    }
    this.buttonLoggined.classList.remove('disabled');
    this.buttonLoggined.textContent = name;
    // this.header.querySelector('.header__button_loggined').classList.remove('disabled');
    // this.header.querySelector('.header__button_loggined').textContent = name;
  }

  backButtonAutorization() {
    this.buttonDefault.classList.remove('disabled');
    this.buttonLoggined.classList.add('disabled');
    this.buttonLoggined.textContent = '';
    // this.header.querySelector('.header__button').classList.remove('disabled');
    // this.header.querySelector('.header__button_loggined').classList.add('disabled');
    // this.header.querySelector('.header__button_loggined').textContent = '';
  }
}

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

  showSavedArticles() {
    this.header.querySelector('.header__menu-articles').classList.remove('header__menu-articles_not-logged');
  }

  changeButton(name) {
    this.header.querySelector('.header__button').classList.add('disabled');
    this.header.querySelector('.header__button_loggined').classList.remove('disabled');
    this.header.querySelector('.header__button_loggined').textContent = name;
  }
}

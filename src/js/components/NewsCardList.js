/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
export default class NewsCardList {
  constructor(container, button) {
    this.container = container;
    this.buttonShowMore = button;
  }

  // не круто, исправить после
  renderArticles(article, arrArticlesLink = '') {
    const INDEX_URL_ART = 0;
    const INDEX_ID_ART = 1;
    if (arrArticlesLink) { // если есть массив, значит выполняется поиск статей
      for (const element of article) {
        const urlSource = element.querySelector('.result-card__source').getAttribute('href');
        const divForId = element.querySelector('.result-card__icon').closest('.result-card');
        const needElementArr = arrArticlesLink.find((item) => item[INDEX_URL_ART] === urlSource);
        // ищем совпадения url статей найденых и тех, что есть
        if (needElementArr) {
          // нашли совпадение, для найденного элемента закрасим флаг
          element.querySelector('.result-card__icon').classList.add('result-card__icon-active');
          divForId.setAttribute('id', needElementArr[INDEX_ID_ART]);
        }
        this.container.appendChild(element);
      }
    } else {
      for (const element of article) {
        this.container.appendChild(element);
      }
    }
  }

  showMore(element, arrArticlesLink) {
    return this.renderArticles(element, arrArticlesLink);
  }

  renderLoader(element) {
    element.classList.toggle('result__searching_active');
  }

  renderError(err) {
    this.container.textContent = err;
  }

  remove(event) {
    this.container.removeChild(event.target.closest('.result-card'));
  }
}

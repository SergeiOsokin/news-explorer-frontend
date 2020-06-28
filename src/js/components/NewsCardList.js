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
  // work
  // renderArticles(article) {
  //   for (const element of article) {
  //     this.container.appendChild(element);
  //   }
  // }

  renderArticles(article, arrArticlesLink = '') {

    for (const element of article) {
      console.log(element)
      // for (const link )
      this.container.appendChild(element);
    }
  }

  showMore(element) {
    return this.renderArticles(element);
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

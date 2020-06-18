/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
export default class NewsCardList {
  constructor(container) {
    this.container = container;
  }

  _cardTag(urlToImage, publishedAt, title, description, url, sourceName) {
    const resultCard = document.createElement('div');
    resultCard.classList.add('result-card');
    resultCard.insertAdjacentHTML(
      'afterbegin',
      `
          <div class="result-card__image"
          style="background-image: url(${urlToImage})">
          <button class="result-card__icon"></button>
          <p class="result-card__categories">${'linkValue'}</p>
        </div>
        <div class="result-card__description">
          <p class="result-card__date">${publishedAt}</p>
          <h4 class="result-card__title">${title}</h4>
          <p class="result-card__text">${description}</p>
          <a class="result-card__source" href="${url}" target="_blank">${sourceName}</a>
        </div>
    `,
    );
    return resultCard;
  }


  renderResults(articles) {
    this.container.textContent = '';
    for (const element of articles) {
      const article = this._cardTag(
        element.urlToImage,
        element.publishedAt,
        element.title,
        element.description,
        element.url,
        element.source.name);
      this.container.appendChild(article);
    }
  }

  renderLoader() {

  }

  renderError() {

  }

  showMore() {

  }

  addCard() {

  }
}

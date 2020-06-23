/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
export default class NewsCardList {
  constructor(container) {
    this.container = container;
  }

  _cardTag(urlToImage, publishedAt, title, description, url, sourceName, keyWord, backet = '', keyword = '', id = '') {
    const resultCard = document.createElement('div');
    resultCard.classList.add('result-card');
    resultCard.insertAdjacentHTML(
      'afterbegin',
      `
          <div class="result-card__image"
          style="background-image: url(${urlToImage})">
          <button class="result-card__icon ${backet}"></button>
          <p class="result-card__categories ${keyword}">${keyWord}</p>
        </div>
        <div class="result-card__description">
          <p class="result-card__date">${publishedAt}</p>
          <h4 class="result-card__title">${title}</h4>
          <p class="result-card__text">${description}</p>
          <a class="result-card__source" href="${url}" target="_blank">${sourceName}</a>
        </div>
    `,
    );
    resultCard.setAttribute('id', id);
    return resultCard;
  }

  renderResults(articles, keyWord) {
    this.container.textContent = '';
    for (const element of articles) {
      const article = this._cardTag(
        element.urlToImage,
        element.publishedAt,
        element.title,
        element.description,
        element.url,
        element.source.name,
        keyWord,
      );
      this.container.appendChild(article);
    }
  }

  renderSaveArticle(articles) {
    const backet = 'result-card__icon_backet';
    const keyword = 'result-card__categories_active';
    this.container.textContent = '';
    for (const element of articles) {
      const article = this._cardTag(
        element.image,
        element.date,
        element.title,
        element.text,
        element.link,
        element.source,
        element.keyword,
        backet,
        keyword,
        element._id,
      );
      this.container.appendChild(article);
    }
  }
  // showMore(articles, button) {
  //   const articlesArr = articles;
  // }

  // renderLoader() {

  // }

  // renderError() {

  // }

  dataCard(event) {
    if (event.target.classList.contains('result-card__icon')) {
      const article = event.target.closest('.result-card');
      return {
        urlToImage: article.querySelector('.result-card__image').style.backgroundImage.slice(5, -2),
        publishedAt: article.querySelector('.result-card__date').textContent,
        title: article.querySelector('.result-card__title').textContent,
        description: article.querySelector('.result-card__text').textContent,
        url: article.querySelector('.result-card__source').getAttribute('href'),
        sourceName: article.querySelector('.result-card__source').textContent,
        keyWord: article.querySelector('.result-card__categories').textContent,
        icon: article.querySelector('.result-card__icon'),
      };
    }
  }

  setId(event, id) {
    event.target.closest('.result-card').setAttribute('id', id);
  }

  getId(event) {
    return event.target.closest('.result-card').getAttribute('id');
  }

  remove(event) {
    this.container.removeChild(event.target.closest('.result-card'));
  }
}

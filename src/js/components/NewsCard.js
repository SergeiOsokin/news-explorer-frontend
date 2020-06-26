/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
export default class NewsCard {
  renderIcon(event, button) {
    const e = event.target.classList.contains('result-card__icon');
    const b = button.classList.contains('disabled');
    if (e && !b) {
      event.target.classList.add('result-card__icon_isNotLogIn');
      event.target.setAttribute('disabled', 'true');
      return false;
    }
    return true;
  }

  iconSaved(element) {
    element.classList.add('result-card__icon-active');
  }

  iconDeleted(element) {
    element.classList.remove('result-card__icon-active');
  }

  // работает
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
            <p class="result-card__date">${publishedAt.split('T')[0]}</p>
            <h4 class="result-card__title">${title}</h4>
            <p class="result-card__text">${description}</p>
            <a class="result-card__source" href="${url}" target="_blank">${sourceName}</a>
          </div>

    `,
    );
    resultCard.setAttribute('id', id);
    return resultCard;
  }

  makeCard(articles, keyWord, cardList) {
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
      cardList.renderArticles(article);
    }
  }

  makeSaveArticle(articles, cardList) {
    const backet = 'result-card__icon_backet';
    const keyword = 'result-card__categories_active';
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
      cardList.renderArticles(article);
    }
  }

  // тут норм
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
}

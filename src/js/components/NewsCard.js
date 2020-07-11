/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
export default class NewsCard {
  renderIcon(event, button) {
    const e = event.target.classList.contains('result-card__icon');
    const b = button.classList.contains('header__button_loggined');
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

  // ощущения не те, зато безопасно
  _cardTag(urlToImage, publishedAt, title, description, url, sourceName, keyWord, backet = 'empt', keywordActive = 'empt', id = '') {
    const INDEXSPLITE = 0;
    // функция sanitizeHTML  для борьбы с xss - не позволяет вставлять в данных пользователя html
    const template = document.createElement('div');
    template.insertAdjacentHTML('beforeend', `
        <div class="result-card" id="${sanitizeHTML(id)}">
          <div class="result-card__image"
            style="background-image: url(${sanitizeHTML(urlToImage)})">
              <button class="result-card__icon ${sanitizeHTML(backet)}"></button>
              <p class="result-card__categories ${sanitizeHTML(keywordActive)}">${sanitizeHTML(keyWord)}</p>
          </div>
          <div class="result-card__description">
            <p class="result-card__date">${sanitizeHTML(publishedAt.split('T')[INDEXSPLITE])}</p>
            <h4 class="result-card__title">${sanitizeHTML(title)}</h4>
            <p class="result-card__text">${sanitizeHTML(description)}</p>
            <a class="result-card__source" href="${sanitizeHTML(url)}" target="_blank">${sanitizeHTML(sourceName)}</a>
          </div>
        </div>`);

    const resultCard = template.firstElementChild;

    function sanitizeHTML(str) {
      const temp = document.createElement('div');
      temp.textContent = str;
      return temp.innerHTML;
    }
    return resultCard;
  }

  makeCard(articles, keyWord) {
    const article = [];
    for (const element of articles) {
      article.push(this._cardTag(
        element.urlToImage,
        element.publishedAt,
        element.title,
        element.description,
        element.url,
        element.source.name,
        keyWord,
      ));
    }
    return article;
  }

  makeSaveArticle(articles) {
    const article = [];
    const backet = 'result-card__icon_backet';
    const keywordActive = 'result-card__categories_active';
    for (const element of articles) {
      article.push(this._cardTag(
        element.image,
        element.date,
        element.title,
        element.text,
        element.link,
        element.source,
        element.keyword,
        backet,
        keywordActive,
        element._id,
      ));
    }
    return article;
  }

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

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

  // ощущения не те, зато безопасно
  _cardTag(urlToImage, publishedAt, title, description, url, sourceName, keyWord, backet = 'empt', keywordActive = 'empt', id = '') {
    const indexSplite = 0;
    const resultCard = document.createElement('div');
    const resultcard__image = document.createElement('div');
    const resultcard__icon = document.createElement('button');
    const resultcard__categories = document.createElement('p');
    const resultcard__description = document.createElement('div');
    const resultcard__date = document.createElement('p');
    const resultcard__title = document.createElement('h4');
    const resultcard__text = document.createElement('p');
    const resultcard__source = document.createElement('a');

    resultCard.classList.add('result-card');
    resultcard__image.classList.add('result-card__image');
    resultcard__icon.classList.add('result-card__icon', `${backet}`);
    resultcard__categories.classList.add('result-card__categories', `${keywordActive}`);
    resultcard__description.classList.add('result-card__description');
    resultcard__date.classList.add('result-card__date');
    resultcard__title.classList.add('result-card__title');
    resultcard__text.classList.add('result-card__text');
    resultcard__source.classList.add('result-card__source');

    resultCard.appendChild(resultcard__image);
    resultcard__image.appendChild(resultcard__icon);
    resultcard__image.appendChild(resultcard__categories);
    resultCard.appendChild(resultcard__description);
    resultcard__description.appendChild(resultcard__date);
    resultcard__description.appendChild(resultcard__title);
    resultcard__description.appendChild(resultcard__text);
    resultcard__description.appendChild(resultcard__source);

    resultCard.setAttribute('id', id);
    resultcard__source.setAttribute('href', url);

    resultcard__image.style.backgroundImage = `url(${urlToImage})`;
    resultcard__title.textContent = title;
    resultcard__text.textContent = description;
    resultcard__source.textContent = sourceName;
    resultcard__categories.textContent = keyWord;
    resultcard__date.textContent = publishedAt.split('T')[indexSplite];

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

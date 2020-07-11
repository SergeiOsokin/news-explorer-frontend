/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
export default class MainApi {
  constructor(option) {
    this.option = option;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(res);
    }
    return res.json();
  }

  signup(email, password, name) {
    return (fetch(`${this.option.baseUrl}signup`, {
      method: 'POST',
      credentials: `${this.option.credentials}`,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((res) => this._getResponseData(res))
    );
  }

  signin(email, password) {
    return (fetch(`${this.option.baseUrl}signin`, {
      method: 'POST',
      credentials: `${this.option.credentials}`,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => this._getResponseData(res))
    );
  }

  getUserData() {
    return (fetch(`${this.option.baseUrl}users/me`, {
      method: 'GET',
      credentials: `${this.option.credentials}`,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => this._getResponseData(res))
    );
  }

  getArticles() {
    return (fetch(`${this.option.baseUrl}articles`, {
      method: 'GET',
      credentials: `${this.option.credentials}`,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => this._getResponseData(res))
    );
  }

  createArticle({
    urlToImage, publishedAt, title, description, url, sourceName, keyWord,
  }) {
    return (fetch(`${this.option.baseUrl}articles`, {
      method: 'POST',
      credentials: `${this.option.credentials}`,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        keyword: keyWord,
        title,
        text: description,
        date: publishedAt,
        source: sourceName,
        link: url,
        image: urlToImage,
      }),
    })
      .then((res) => this._getResponseData(res)));
  }

  removeArticle(idArticle) {
    return (fetch(`${this.option.baseUrl}articles/${idArticle}`, {
      method: 'DELETE',
      credentials: `${this.option.credentials}`,
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => this._getResponseData(res)));
  }

  removeCookie() {
    return (fetch(`${this.option.baseUrl}deletecookie`, {
      method: 'DELETE',
      credentials: `${this.option.credentials}`,
      headers: { 'Content-Type': 'application/json' },
    })
    );
  }
}

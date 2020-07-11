/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
export default class NewsApi {
  constructor(baseoption) {
    this.option = baseoption;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка сервера: ${res}`);
    }
    return res.json();
  }

  getNews(text, fromdate, todate) {
    return (
      fetch(`${this.option}q=${text}&from=${fromdate}&to=${todate}`, {
        method: 'GET',
      })
        .then((res) => this._getResponseData(res))
    );
  }
}

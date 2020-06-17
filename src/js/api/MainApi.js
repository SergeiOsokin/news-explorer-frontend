/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
export default class MainApi {
  // constructor(option) {
  //   this.option = option;
  // }

  // registration new user
  signup(email, password, name) {
    return (fetch('http://localhost:3000/signup', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((res) => res.json())
    );
  }

  // autentification
  signin(email, password) {
    return (fetch('http://localhost:3000/signin', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
    );
  }

  getUserData() {
    return (fetch('http://localhost:3000/users/me', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
    );
  }

  getArticles() {

  }

  createArticle() {

  }

  removeArticle() {

  }
}

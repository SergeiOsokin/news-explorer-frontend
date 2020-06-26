/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
import '../css/style.css';

import * as constant from './constants/constants';
import * as utils from './utils/utils';
import Popup from './components/Popup';
import Form from './components/Form';
import Header from './components/Header';
import MainApi from './api/MainApi';
import NewsApi from './api/NewsApi';
import NewsCardList from './components/NewsCardList';
import NewsCard from './components/NewsCard';

const popupEntrance = new Popup(constant.popupEntrance);
const popupRegistration = new Popup(constant.popupRegistration);
const popupSuccessfully = new Popup(constant.popupSuccessfully);

const formEntrance = new Form(constant.popupEntrance);
const formRegistration = new Form(constant.popupRegistration);
const formSearch = new Form(constant.blockSearch);
const headerBlock = new Header(constant.header);
const mainAPI = new MainApi(constant.BASE_OPTION_MAIN_API);
const newsAPI = new NewsApi(constant.isDev);
const cardList = new NewsCardList(constant.articlesContainer);
const newsCardClass = new NewsCard();

for (const button of constant.buttonClose) {
  button.addEventListener('click', (event) => {
    popupEntrance.clearContent();
    popupEntrance.close();
    popupRegistration.clearContent();
    popupRegistration.close();
    popupSuccessfully.close();
  });
}
// listeners
constant.buttonAutorization.addEventListener('click', (event) => {
  popupEntrance.open(event);
  formEntrance.setValidate(event);
});

constant.linkRegistration.addEventListener('click', (event) => {
  popupEntrance.clearContent();
  popupEntrance.close();
  popupRegistration.open(event);
  formRegistration.setValidate(event);
});

constant.linkEntrance.addEventListener('click', (event) => {
  popupRegistration.clearContent();
  popupRegistration.close();
  popupEntrance.open(event);
});

constant.linkSuccessfully.addEventListener('click', (event) => {
  popupSuccessfully.close();
  popupEntrance.open(event);
});


constant.formRegistration.addEventListener('submit', (event) => {
  event.preventDefault();
  mainAPI.signup(
    constant.formRegistration.emailreg.value,
    constant.formRegistration.passwordreg.value,
    constant.formRegistration.name.value,
  )
    .then((res) => console.log(res))
    .then((res) => {
      console.log(res)
      if (!res.data) {
        return Promise.reject(res);
      }
      popupRegistration.clearContent();
      popupRegistration.close();
      popupSuccessfully.setContent();
    })
    .catch((err) => console.log(err)) //formRegistration.setServerError(err.message));
});

constant.formEntrance.addEventListener('submit', (event) => {
  event.preventDefault();
  mainAPI.signin(
    constant.formEntrance.emailenter.value,
    constant.formEntrance.passwordenter.value,
  )
    .then((res) => {
      console.log(res)
      if (!res.data) {
        return Promise.reject(res);
      }
      popupEntrance.clearContent();
      popupEntrance.close();
      headerBlock.showSavedArticles();
      headerBlock.changeButton(res.data);
    })
    .catch((err) => console.log(err))// .catch((err) => formEntrance.setServerError(err.message));
});

constant.blockSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  const date = utils.getDateFromTo();
  cardList.renderLoader(constant.prelouder);
  constant.articlesContainer.textContent = '';
  constant.resultFound.classList.remove('result__found_active');
  constant.notFound.classList.remove('result__searching_active');
  constant.resultBlock.scrollIntoView(true);
  newsAPI.getNews(
    constant.formSearch.search.value,
    date.dateFrom,
    date.dateTo,
  )
    .then((data) => {
      cardList.renderLoader(constant.prelouder);
      if (data.articles.length === 0) {
        return constant.notFound.classList.add('result__searching_active');
      }
      if (data.articles.length > 0) {
        constant.resultFound.classList.add('result__found_active');
        newsCardClass.makeCard(data.articles, constant.formSearch.search.value, cardList);

        // cardList.renderArticles(card);
        // cardList.renderResults(data.articles, constant.formSearch.search.value);
      }
    })
    .catch((err) => cardList.renderError(err));
});
console.log(cardList)
constant.articlesContainer.addEventListener('click', (event) => {
  const icon = event.target.classList.contains('result-card__icon');
  if (icon) {
    const iconActive = newsCardClass.renderIcon(event, constant.buttonAutorization);
    if (iconActive) {
      const article = newsCardClass.dataCard(event);
      mainAPI.createArticle(article)
        .then((data) => {
          if (!data.data) {
            return Promise.reject(data);
          }
          newsCardClass.iconSaved(article.icon);
          newsCardClass.setId(event, data.data._id);
        })
        .catch((err) => alert({ 'Ошибка сохранения данных': err }));
    }
  }
});

constant.articlesContainer.addEventListener('click', (event) => {
  const iconSaved = event.target.classList.contains('result-card__icon-active');
  if (iconSaved) {
    const id = newsCardClass.getId(event);
    const article = newsCardClass.dataCard(event);
    mainAPI.removeArticle(id)
      .then(() => {
        newsCardClass.iconDeleted(article.icon);
      })
      .catch((err) => console.log(err));
  }
});

constant.buttonExit.addEventListener('click', () => {
  mainAPI.removeCookie()
    .then(() => {
      headerBlock.showSavedArticles();
      headerBlock.backButtonAutorization();
    })
    .catch((err) => console.log(err));
});

mainAPI.getUserData()
  .then((data) => {
    console.log(data)
    if (data.message) {
      return Promise.reject(data);
    }
    constant.PROPS.isLoggedIn = true;
    constant.PROPS.userName = data.data.name;
    headerBlock.render(constant.PROPS);
  })
  .catch((err) => console.log(err));


formSearch.setValidate();

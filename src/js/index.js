/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-syntax */
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
// function
function closePopupEscapeHendler() {
  popupEntrance.close();
  popupEntrance.clearContent();
  popupRegistration.clearContent();
  popupRegistration.close();
  popupSuccessfully.close();
}

function searchNewsHendler(event) {
  event.preventDefault();
  const date = utils.getDateFromTo();
  cardList.renderLoader(constant.prelouder);
  constant.articlesContainer.textContent = '';
  constant.resultFound.classList.remove('result__found_active');
  constant.notFound.classList.remove('result__searching_active');
  constant.resultBlock.scrollIntoView(true);
  if (navigator.onLine) {
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
        }
      })
      .catch((err) => cardList.renderError(err));
  } else {
    cardList.renderLoader(constant.prelouder);
    constant.resultFound.classList.add('result__found_active');
    cardList.renderError('Отсутствует подключение к интренету');
  }
}

function entranceHendler(event) {
  event.preventDefault();
  utils.setDisabled(constant.formEntrance);
  mainAPI.signin(
    constant.formEntrance.emailenter.value,
    constant.formEntrance.passwordenter.value,
  )
    .then((res) => {
      if (!res.data) {
        return Promise.reject(res);
      }
      utils.removeDisabled(constant.formEntrance);
      popupEntrance.clearContent();
      popupEntrance.close();
      headerBlock.showSavedArticles();
      headerBlock.changeButton(res.data);
    })
    .catch((err) => {
      utils.removeDisabled(constant.formEntrance);
      formEntrance.setServerError(err.message);
    });
}

function registrationHendler(event) {
  event.preventDefault();
  utils.setDisabled(constant.formRegistration);
  mainAPI.signup(
    constant.formRegistration.emailreg.value,
    constant.formRegistration.passwordreg.value,
    constant.formRegistration.name.value,
  )
    .then((res) => {
      if (!res.data) {
        return Promise.reject(res);
      }
      utils.removeDisabled(constant.formRegistration);
      popupRegistration.clearContent();
      popupRegistration.close();
      popupSuccessfully.setContent();
    })
    .catch((err) => {
      utils.removeDisabled(constant.formRegistration);
      formRegistration.setServerError(err.message);
    });
}

for (const button of constant.buttonClose) {
  button.addEventListener('click', () => {
    popupEntrance.clearContent();
    popupEntrance.close();
    popupRegistration.clearContent();
    popupRegistration.close();
    popupSuccessfully.close();
  });
}

function saveArticleHendler(event) {
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
}

function removeArticleHendler(event) {
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
}

function removeCookie() {
  mainAPI.removeCookie()
    .then(() => {
      headerBlock.showSavedArticles();
      headerBlock.backButtonAutorization();
    })
    .catch((err) => console.log(err));
}

function isLogged() {
  mainAPI.getUserData()
    .then((data) => {
      if (data.message) {
        return Promise.reject(data);
      }
      constant.PROPS.isLoggedIn = true;
      constant.PROPS.userName = data.data.name;
      headerBlock.render(constant.PROPS);
    })
    .catch((err) => console.log(err));
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

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closePopupEscapeHendler();
  }
});

constant.popupEntrance.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup')) {
    popupEntrance.close();
    popupEntrance.clearContent();
  }
});

constant.popupSuccessfully.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup')) {
    popupSuccessfully.close();
  }
});

constant.popupRegistration.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup')) {
    popupRegistration.close();
    popupRegistration.clearContent();
  }
});

constant.formRegistration.addEventListener('submit', registrationHendler);

constant.formEntrance.addEventListener('submit', entranceHendler);

constant.blockSearch.addEventListener('submit', searchNewsHendler);

constant.articlesContainer.addEventListener('click', saveArticleHendler);

constant.articlesContainer.addEventListener('click', removeArticleHendler);

constant.buttonExit.addEventListener('click', removeCookie);

// callers
isLogged();
formSearch.setValidate();

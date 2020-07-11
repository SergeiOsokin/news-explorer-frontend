/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
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
const cardList = new NewsCardList(constant.articlesContainer, constant.buttonShowMore);
const newsCardClass = new NewsCard();
// чтобы работать с массивами, которые сделал в данной области
let arrArticles = [];
let arrArticlesLink = [];

// function
function getUserArticles() {
  mainAPI.getArticles()
    .then((data) => {
      for (const article of data.data) {
        arrArticlesLink.push([article.link, article._id]);
      }
      return arrArticlesLink;
    })
    .catch((err) => {
      if (!err.ok) {
        err.text().then((error) => {
          console.log(JSON.parse(error).message);
        });
      }
      throw unknownOther;
    })
    .catch(() => console.log(constant.OTHER_ERRORS.serverBreak));
}
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
  getUserArticles();
  if (navigator.onLine) {
    newsAPI.getNews(
      constant.formSearch.search.value,
      date.dateFrom,
      date.dateTo,
    )
      .then((data) => {
        cardList.renderLoader(constant.prelouder);
        if (data.articles.length === 0) {
          constant.notFound.classList.add('result__searching_active');
          constant.buttonShowMore.style.display = 'none';
          return;
        }
        if (data.articles.length > 0 && data.articles.length <= 3) {
          constant.resultFound.classList.add('result__found_active');
          constant.buttonShowMore.style.display = 'none';
          // сделаем разметку
          arrArticles = newsCardClass.makeCard(data.articles, constant.formSearch.search.value);
          cardList.renderArticles(arrArticles); // отправим массив с разметкой на отрисовку
          return;
        }
        if (data.articles.length > 3) {
          constant.resultFound.classList.add('result__found_active');
          constant.buttonShowMore.style.display = 'block';
          // сделаем разметку карточкам
          arrArticles = newsCardClass.makeCard(data.articles, constant.formSearch.search.value);
          // отправим первые 3 на отрисовку
          cardList.renderArticles(arrArticles.slice(0, 3), arrArticlesLink);
          return arrArticles.splice(0, 3); // оставшиеся вернем, чтобы отображать по кнопке
        }
      })
      .catch((err) => {
        if (!err.ok) {
          err.text().then((error) => {
            cardList.renderError(JSON.parse(error).message);
          });
        }
        throw unknownOther;
      })
      .catch(() => {
        cardList.renderError(constant.OTHER_ERRORS.tryLater);
      });
  } else {
    cardList.renderLoader(constant.prelouder);
    constant.resultFound.classList.add('result__found_active');
    cardList.renderError(constant.OTHER_ERRORS.noInternet);
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
      utils.removeDisabled(constant.formEntrance);
      popupEntrance.clearContent();
      popupEntrance.close();
      headerBlock.showSavedArticles();
      headerBlock.changeButton(res.data);
    })
    .catch((err) => {
      utils.removeDisabled(constant.formEntrance);
      if (!err.ok) {
        err.text().then((error) => {
          formEntrance.setServerError(JSON.parse(error).message);
        });
        return;
      }
      throw unknownOther;
    })
    .catch(() => {
      formEntrance.setServerError(constant.OTHER_ERRORS.tryLater);
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
    .then(() => {
      utils.removeDisabled(constant.formRegistration);
      popupRegistration.clearContent();
      popupRegistration.close();
      popupSuccessfully.setContent();
    })
    .catch((err) => {
      utils.removeDisabled(constant.formRegistration);
      if (!err.ok) {
        err.text().then((error) => {
          formRegistration.setServerError(JSON.parse(error).message);
        });
        return;
      }
      throw unknownOther;
    })
    .catch(() => {
      formRegistration.setServerError(constant.OTHER_ERRORS.tryLater);
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
  const iconSaved = event.target.classList.contains('result-card__icon-active');
  if (iconSaved) {
    const id = newsCardClass.getId(event);
    const article = newsCardClass.dataCard(event);
    return mainAPI.removeArticle(id)
      .then(() => {
        newsCardClass.iconDeleted(article.icon);
      })
      .catch((err) => {
        err.text().then((error) => {
          alert(constant.OTHER_ERRORS.failDeleteArt + JSON.parse(error).message);
        });
      });
  } if (icon) {
    const iconActive = newsCardClass.renderIcon(event, constant.buttonAutorization);
    if (iconActive) {
      const article = newsCardClass.dataCard(event);
      return mainAPI.createArticle(article)
        .then((data) => {
          newsCardClass.iconSaved(article.icon);
          newsCardClass.setId(event, data.data._id);
        })
        .catch((err) => {
          err.text().then((error) => {
            alert(constant.OTHER_ERRORS.failSaveArt + JSON.parse(error).message);
          });
        });
    }
  }
}

function removeCookie() {
  mainAPI.removeCookie()
    .then(() => {
      headerBlock.showSavedArticles();
      headerBlock.backButtonAutorization();
    })
    .catch((err) => alert(constant.OTHER_ERRORS.failUnlog + err));
}

function isLogged() {
  mainAPI.getUserData()
    .then((data) => {
      constant.PROPS.isLoggedIn = true;
      constant.PROPS.userName = data.data.name;
      headerBlock.render(constant.PROPS);
    })
    .catch((err) => {
      if (!err.ok) {
        err.text()
          .then((error) => console.log(JSON.parse(error).message));
      }
      throw unknownOther;
    })
    .catch(() => console.log(constant.OTHER_ERRORS.serverBreak));
}

function showMore() {
  cardList.showMore(arrArticles.slice(0, 3), arrArticlesLink);
  if (arrArticles.length <= 3) {
    constant.buttonShowMore.style.display = 'none';
    return;
  }
  return arrArticles.splice(0, 3);
}
// listeners
constant.buttonAutorization.addEventListener('click', (event) => {
  constant.headerMenu.checked = false;
  if (event.target.classList.contains('header__button_loggined')) {
    return removeCookie();
  }
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

constant.popupEntrance.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('popup')) {
    popupEntrance.close();
    popupEntrance.clearContent();
  }
});

constant.popupSuccessfully.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('popup')) {
    popupSuccessfully.close();
  }
});

constant.popupRegistration.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('popup')) {
    popupRegistration.close();
    popupRegistration.clearContent();
  }
});

constant.buttonShowMore.addEventListener('click', showMore);

constant.formRegistration.addEventListener('submit', registrationHendler);

constant.formEntrance.addEventListener('submit', entranceHendler);

constant.blockSearch.addEventListener('submit', searchNewsHendler);

constant.articlesContainer.addEventListener('click', saveArticleHendler);

// callers
isLogged();
formSearch.setValidate();

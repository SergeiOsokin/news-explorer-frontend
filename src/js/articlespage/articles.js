/* eslint-disable no-undef */
import '../../css/articles.css';

import {
  PROPS,
  HEADER,
  INFO_BLOCK,
  ARTICLES_CONTAINER,
  BUTTON_EXIT,
  BASE_OPTION_MAIN_API,
} from '../constants/constantArticle';

import Header from '../components/Header';
import MainApi from '../api/MainApi';
import ArticlesInfo from '../components/ArticlesInfo';
import NewsCardList from '../components/NewsCardList';

const HeaderBlock = new Header(HEADER);
const MainAPI = new MainApi(BASE_OPTION_MAIN_API);
const ArticlesINFO = new ArticlesInfo(INFO_BLOCK);
const CardList = new NewsCardList(ARTICLES_CONTAINER);

MainAPI.getArticles(event)
  .then((data) => {
    if (data.message) {
      return Promise.reject(data);
    }
    ArticlesINFO.keyWords(data.data);
    CardList.renderSaveArticle(data.data);
    ArticlesINFO.amount(data.data);
  })
  .catch((err) => ARTICLES_CONTAINER.textContent = err.message);

MainAPI.getUserData()
  .then((data) => {
    if (data.message) {
      return Promise.reject(data);
    }
    PROPS.isLoggedIn = true;
    PROPS.userName = data.data.name;
    HeaderBlock.renderName(PROPS);
    ArticlesINFO.amountArticles(PROPS.userName);
  })
  .catch((err) => alert(err.message));



ARTICLES_CONTAINER.addEventListener('click', (event) => {
  if (event.target.classList.contains('result-card__icon')) {
    const id = CardList.getId(event);
    MainAPI.removeArticle(id)
      .then((data) => {
        CardList.remove(event);
      })
      .catch((err) => alert(err));
  }
});

BUTTON_EXIT.addEventListener('click', () => {
  MainAPI.removeCookie()
    .then(() => {
      window.location.href = '/';
    })
    .catch((err) => alert(err));
});
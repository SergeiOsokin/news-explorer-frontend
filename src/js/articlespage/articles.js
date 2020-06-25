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

const getUserData = () => {
  MainAPI.getUserData()
    .then((data) => {
      if (data.message) {
        return Promise.reject(data);
      }
      PROPS.isLoggedIn = true;
      PROPS.userName = data.data.name;
      HeaderBlock.renderName(PROPS);
    })
    .catch((err) => {
      console.log(err);
      // для сервера и локально
      window.location.href = '/';
      // для github
      // window.location.href = '/news-explorer-frontend/';
    });
};

const getArticles = () => {
  MainAPI.getArticles()
    .then((data) => {
      if (data.message) {
        return Promise.reject(data);
      }
      ArticlesINFO.keyWords(data.data);
      CardList.renderSaveArticle(data.data);
      ArticlesINFO.amountArticles(BUTTON_EXIT.textContent, data.data.length);
    })
    .catch((err) => {
      ARTICLES_CONTAINER.textContent = err.message;
      ArticlesINFO.amountArticles(BUTTON_EXIT.textContent, 0);
      ArticlesINFO.keyWords([]);
    });
};

ARTICLES_CONTAINER.addEventListener('click', (event) => {
  if (event.target.classList.contains('result-card__icon')) {
    const id = CardList.getId(event);
    MainAPI.removeArticle(id)
      .then(() => {
        CardList.remove(event);
        getArticles();
      })
      .catch((err) => alert(err));
  }
});

BUTTON_EXIT.addEventListener('click', () => {
  MainAPI.removeCookie()
    .then(() => {
      // для сервера и локально
      window.location.href = '/';
      // для github
      // window.location.href = '/news-explorer-frontend/';
    })
    .catch((err) => alert(err));
});

getUserData();
getArticles();

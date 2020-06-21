import '../../css/articles.css';

import {
  PROPS,
  HEADER,
  INFO_BLOCK,
  ARTICLES_CONTAINER,
} from '../constants/constantArticle';

import Header from '../components/Header';
import MainApi from '../api/MainApi';
import ArticlesInfo from '../components/ArticlesInfo';
import NewsCardList from '../components/NewsCardList';

const HeaderBlock = new Header(HEADER);
const MainAPI = new MainApi();
const ArticlesINFO = new ArticlesInfo(INFO_BLOCK);
const CardList = new NewsCardList(ARTICLES_CONTAINER);

MainAPI.getUserData()
  .then((data) => {
    if (data.message) {
      return Promise.reject(data);
    }
    PROPS.isLoggedIn = true;
    PROPS.userName = data.data.name;
    HeaderBlock.renderArticle(PROPS);
    ArticlesINFO.amountArticles(PROPS.userName, 1);
  })
  .catch((err) => console.log(err.message));

MainAPI.getArticles()
  .then((data) => {
    if (data.message) {
      return Promise.reject(data);
    }
    ArticlesINFO.keyWords(data.data);
    CardList.renderSaveArticle(data.data);
  })
  .catch((err) => console.log(err.message));



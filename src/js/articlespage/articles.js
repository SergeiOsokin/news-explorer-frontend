/* eslint-disable no-undef */
import '../../css/articles.css';

import {
  PROPS,
  header,
  infoBlock,
  articlesContainer,
  buttonExit,
  BASE_OPTION_MAIN_API,
} from '../constants/constantArticle';

import Header from '../components/Header';
import MainApi from '../api/MainApi';
import ArticlesInfo from '../components/ArticlesInfo';
import NewsCardList from '../components/NewsCardList';
import NewsCard from '../components/NewsCard';

const headerBlock = new Header(header);
const mainAPI = new MainApi(BASE_OPTION_MAIN_API);
const articlesINFO = new ArticlesInfo(infoBlock);
const cardList = new NewsCardList(articlesContainer);
const newsCardClass = new NewsCard();
// functions
function removeArticleHandler(event) {
  if (event.target.classList.contains('result-card__icon')) {
    const id = newsCardClass.getId(event);
    mainAPI.removeArticle(id)
      .then(() => {
        cardList.remove(event);
        mainAPI.getArticles()
          .then((data) => {
            if (data.message) {
              articlesContainer.textContent = data.message;
              articlesINFO.amountArticles(buttonExit.textContent);
              articlesINFO.keyWords([]);
              return;
            }
            articlesINFO.amountArticles(buttonExit.textContent, data.data.length);
            articlesINFO.keyWords(data.data);
          });
      })
      .catch((err) => {
        articlesContainer.textContent = err;
      });
  }
}

function removeCookieHandler() {
  mainAPI.removeCookie()
    .then(() => {
      // для сервера и локально
      window.location.href = '/';
      // для github
      // window.location.href = '/news-explorer-frontend/';
    })
    .catch((err) => alert(err));
// });
}

const getUserData = () => {
  mainAPI.getUserData()
    .then((data) => {
      if (data.message) {
        return Promise.reject(data);
      }
      PROPS.isLoggedIn = true;
      PROPS.userName = data.data.name;
      headerBlock.renderName(PROPS);
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
  mainAPI.getArticles()
    .then((data) => {
      if (data.message) {
        return Promise.reject(data);
      }
      articlesINFO.keyWords(data.data);
      newsCardClass.makeSaveArticle(data.data, cardList);
      articlesINFO.amountArticles(buttonExit.textContent, data.data.length);
    })
    .catch((err) => {
      articlesContainer.textContent = err.message;
      articlesINFO.amountArticles(buttonExit.textContent);
      articlesINFO.keyWords([]);
    });
};
// listeners
articlesContainer.addEventListener('click', removeArticleHandler);
//  (event) => {
//   if (event.target.classList.contains('result-card__icon')) {
//     const id = newsCardClass.getId(event);
//     mainAPI.removeArticle(id)
//       .then(() => {
//         cardList.remove(event);
//         mainAPI.getArticles()
//           .then((data) => {
//             if (data.message) {
//               articlesContainer.textContent = data.message;
//               articlesINFO.amountArticles(buttonExit.textContent);
//               articlesINFO.keyWords([]);
//               return;
//             }
//             articlesINFO.amountArticles(buttonExit.textContent, data.data.length);
//             articlesINFO.keyWords(data.data);
//           });
//       })
//       .catch((err) => {
//         articlesContainer.textContent = err;
//       });
//   }
// });

buttonExit.addEventListener('click', removeCookieHandler);
// () => {
//   mainAPI.removeCookie()
//     .then(() => {
//       // для сервера и локально
//       window.location.href = '/';
//       // для github
//       // window.location.href = '/news-explorer-frontend/';
//     })
//     .catch((err) => alert(err));
// });
// callers
getUserData();
getArticles();

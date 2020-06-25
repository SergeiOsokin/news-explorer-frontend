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

const PopupEntrance = new Popup(constant.POPUP_ENTRANCE);
const PopupRegistration = new Popup(constant.POPUP_REGISTRATION);
const PopupSuccessfully = new Popup(constant.POPUP_SUCCESSFULLY);

const FormEntrance = new Form(constant.POPUP_ENTRANCE);
const FormRegistration = new Form(constant.POPUP_REGISTRATION);
const FormSearch = new Form(constant.BLOCK_SEARCH);
const HeaderBlock = new Header(constant.HEADER);
const MainAPI = new MainApi(constant.BASE_OPTION_MAIN_API);
const NewsAPI = new NewsApi(constant.IS_DEV);
const CardList = new NewsCardList(constant.ARTICLES_CONTAINER);
const NewsCardClass = new NewsCard();

for (const button of constant.BUTTON_CLOSE) {
  button.addEventListener('click', (event) => {
    PopupEntrance.clearContent();
    PopupEntrance.close();
    PopupRegistration.clearContent();
    PopupRegistration.close();
    PopupSuccessfully.close();
  });
}
// listeners
constant.BUTTON_AUTORIZATION.addEventListener('click', (event) => {
  PopupEntrance.open(event);
  FormEntrance.setValidate(event);
});

constant.LINK_REGISTRATION.addEventListener('click', (event) => {
  PopupEntrance.clearContent();
  PopupEntrance.close();
  PopupRegistration.open(event);
  FormRegistration.setValidate(event);
});

constant.LINK_ENTRANCE.addEventListener('click', (event) => {
  PopupRegistration.clearContent();
  PopupRegistration.close();
  PopupEntrance.open(event);
});

constant.LINK_SUCCESSFULLY.addEventListener('click', (event) => {
  PopupSuccessfully.close();
  PopupEntrance.open(event);
});


constant.FORM_REGISTRATION.addEventListener('submit', (event) => {
  event.preventDefault();
  MainAPI.signup(
    constant.FORM_REGISTRATION.emailreg.value,
    constant.FORM_REGISTRATION.passwordreg.value,
    constant.FORM_REGISTRATION.name.value,
  )
    .then((res) => {
      if (!res.data) {
        return Promise.reject(res);
      }
      PopupRegistration.clearContent();
      PopupRegistration.close();
      PopupSuccessfully.setContent();
    })
    .catch((err) => FormRegistration.setServerError(err.message));
});

constant.FORM_ENTRANCE.addEventListener('submit', (event) => {
  event.preventDefault();
  MainAPI.signin(
    constant.FORM_ENTRANCE.emailenter.value,
    constant.FORM_ENTRANCE.passwordenter.value,
  )
    .then((res) => {
      if (!res.data) {
        return Promise.reject(res);
      }
      PopupEntrance.clearContent();
      PopupEntrance.close();
      HeaderBlock.showSavedArticles();
      HeaderBlock.changeButton(res.data);
    })
    .catch((err) => FormEntrance.setServerError(err.message));
});

constant.BLOCK_SEARCH.addEventListener('submit', (event) => {
  event.preventDefault();
  const date = utils.getDateFromTo();
  CardList.renderLoader(constant.PRELOUDER);
  constant.ARTICLES_CONTAINER.textContent = '';
  constant.RESULT_FOUND.classList.remove('result__found_active');
  constant.NOT_FOUND.classList.remove('result__searching_active');
  constant.RESULT_BLOCK.scrollIntoView(true);
  NewsAPI.getNews(
    constant.FORM_SEARCH.search.value,
    date.dateFrom,
    date.dateTo,
  )
    .then((data) => {
      CardList.renderLoader(constant.PRELOUDER);
      if (data.articles.length === 0) {
        return constant.NOT_FOUND.classList.add('result__searching_active');
      }
      if (data.articles.length > 0) {
        constant.RESULT_FOUND.classList.add('result__found_active');
        CardList.renderResults(data.articles, constant.FORM_SEARCH.search.value);
      }
    })
    .catch((err) => CardList.renderError(err));
});

constant.ARTICLES_CONTAINER.addEventListener('click', (event) => {
  const icon = event.target.classList.contains('result-card__icon');
  if (icon) {
    const iconActive = NewsCardClass.renderIcon(event, constant.BUTTON_AUTORIZATION);
    if (iconActive) {
      const article = CardList.dataCard(event);
      MainAPI.createArticle(article)
        .then((data) => {
          if (!data.data) {
            return Promise.reject(data);
          }
          NewsCardClass.iconSaved(article.icon);
          CardList.setId(event, data.data._id);
        })
        .catch((err) => alert({ 'Ошибка сохранения данных': err }));
    }
  }
});

constant.ARTICLES_CONTAINER.addEventListener('click', (event) => {
  const iconSaved = event.target.classList.contains('result-card__icon-active');
  if (iconSaved) {
    const id = CardList.getId(event);
    const article = CardList.dataCard(event);
    MainAPI.removeArticle(id)
      .then(() => {
        NewsCardClass.iconDeleted(article.icon);
      })
      .catch((err) => console.log(err));
  }
});

constant.BUTTON_EXIT.addEventListener('click', () => {
  MainAPI.removeCookie()
    .then(() => {
      HeaderBlock.showSavedArticles();
      HeaderBlock.backButtonAutorization();
    })
    .catch((err) => console.log(err));
});

MainAPI.getUserData()
  .then((data) => {
    if (data.message) {
      return Promise.reject(data);
    }
    constant.PROPS.isLoggedIn = true;
    constant.PROPS.userName = data.data.name;
    HeaderBlock.render(constant.PROPS);
  })
  .catch((err) => console.log(err.message));


FormSearch.setValidate();

import '../css/style.css';

import * as constant from './constants/constants';
import * as utils from './utils/utils';
import Popup from './components/Popup';
import Form from './components/Form';
import Header from './components/Header';
import MainApi from './api/MainApi';
import NewsApi from './api/NewsApi';
import NewsCardList from './components/NewsCardList';

const PopupEntrance = new Popup(constant.POPUP_ENTRANCE);
const PopupRegistration = new Popup(constant.POPUP_REGISTRATION);
const PopupSuccessfully = new Popup(constant.POPUP_SUCCESSFULLY);

const FormEntrance = new Form(constant.POPUP_ENTRANCE);
const FormRegistration = new Form(constant.POPUP_REGISTRATION);
const FormSearch = new Form(constant.BLOCK_SEARCH);

const HeaderBlock = new Header(constant.HEADER);

const MainAPI = new MainApi();

const NewsAPI = new NewsApi(constant.BASE_OPTION);

const CardList = new NewsCardList(constant.ARTICLES_CONTAINER);

// listeners
constant.BUTTON_AUTORIZATION.addEventListener('click', (event) => {
  PopupEntrance.open(event);
  FormEntrance.setValidate(event);
});

for (const button of constant.BUTTON_CLOSE) {
  button.addEventListener('click', (event) => {
    PopupEntrance.clearContent();
    PopupEntrance.close();
    PopupRegistration.clearContent();
    PopupRegistration.close();
    PopupSuccessfully.close();
  });
}

constant.FORM_REGISTRATION.addEventListener('submit', (event) => {
  event.preventDefault();
  MainAPI.signup(
    constant.FORM_REGISTRATION.emailreg.value,
    constant.FORM_REGISTRATION.passwordreg.value,
    constant.FORM_REGISTRATION.name.value,
  )
    .then((res) => {
      if (res.data) {
        PopupRegistration.clearContent();
        PopupRegistration.close();
        PopupSuccessfully.setContent();
        return;
      }
      throw Promise.reject(res);
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
      if (res.data) {
        PopupEntrance.clearContent();
        PopupEntrance.close();
        HeaderBlock.showSavedArticles();
        HeaderBlock.changeButton(res.data);
        return;
      }
      throw Promise.reject(res);
    })
    .catch((err) => FormEntrance.setServerError(err.message));
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

constant.BLOCK_SEARCH.addEventListener('submit', (event) => {
  event.preventDefault();
  const date = utils.getDateFromTo();
  constant.PRELOUDER.classList.add('result__searching_active');
  NewsAPI.getNews(
    constant.FORM_SEARCH.search.value,
    date.dateFrom,
    date.dateTo,
  )
    .then((data) => {
      constant.PRELOUDER.classList.remove('result__searching_active');
      if (data.articles.length === 0) {
        return constant.NOT_FOUND.classList.add('result__searching_active');
      }
      constant.RESULT_FOUND.classList.add('result__found_active');
      CardList.renderResults(data.articles);
      // console.log(data.articles);
    })
    .catch((err) => console.log(err));
});

// MainAPI.getUserData()
//   .then((data) => {
//     if (data.message) {
//       return Promise.reject(data);
//     }
//     constant.PROPS.isLoggedIn = true;
//     constant.PROPS.userName = data.data.name;
//     return HeaderBlock.render(constant.PROPS);
//   })
//   .catch((err) => console.log(err.message));

FormSearch.setValidate();


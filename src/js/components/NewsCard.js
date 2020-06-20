/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
export default class NewsCard {
  renderIcon(event, button) {
    const e = event.target.classList.contains('result-card__icon');
    const b = button.classList.contains('disabled');
    if (e && !b) {
      event.target.classList.add('result-card__icon_isNotLogIn');
      event.target.setAttribute('disabled', 'true');
      return false;
    }
    return true;
  }

  iconSaved(element) {
    element.classList.add('result-card__icon-active');
  }
}

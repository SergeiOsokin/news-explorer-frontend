/* eslint-disable class-methods-use-this */
export default class ArticlesInfo {
  constructor(element) {
    this.element = element;
  }

  amountArticles(name, amount) {
    switch (amount) {
      case 1:
        this.element.querySelector('.info-block__amount').textContent = `${name}, у вас ${amount} сохранённая статья`;
        break;
      case 2:
        this.element.querySelector('.info-block__amount').textContent = `${name}, у вас ${amount} сохранённых статьи`;
        break;
      case 3:
        this.element.querySelector('.info-block__amount').textContent = `${name}, у вас ${amount} сохранённых статьи`;
        break;
      default:
        this.element.querySelector('.info-block__amount').textContent = `${name}, у вас ${amount} сохранённых статей`;
    }
  }

  keyWords(keyWords) {
    const wordsArr = [...new Set(keyWords.map((item) => item.keyword))];
    switch (wordsArr.length) {
      case 1:
        this.element.querySelector('.info-block__key-words_item').textContent = `${wordsArr[0]}`;
        break;
      case 2:
        this.element.querySelector('.info-block__key-words_item').textContent = `${wordsArr[0]}, ${wordsArr[1]}`;
        break;
      case 3:
        this.element.querySelector('.info-block__key-words_item').textContent = `${wordsArr[0]}, ${wordsArr[1]}, ${wordsArr[2]}`;
        break;
      default:
        this.element.querySelector('.info-block__key-words_item').textContent = `${wordsArr[0]}, ${wordsArr[1]}, и ${wordsArr.length - 2} другим`;
        break;
    }
  }
}

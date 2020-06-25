/* eslint-disable class-methods-use-this */
export default class ArticlesInfo {
  constructor(element) {
    this.element = element;
  }

  amountArticles(name, length) {
    switch (length) {
      case 0:
        this.element.querySelector('.info-block__amount').textContent = `${name}, у вас ${length} сохранённых статей`;
        break;
      case 1:
        this.element.querySelector('.info-block__amount').textContent = `${name}, у вас ${length} сохранённая статья`;
        break;
      case 2:
        this.element.querySelector('.info-block__amount').textContent = `${name}, у вас ${length} сохранённых статьи`;
        break;
      case 3:
        this.element.querySelector('.info-block__amount').textContent = `${name}, у вас ${length} сохранённых статьи`;
        break;
      default:
        this.element.querySelector('.info-block__amount').textContent = `${name}, у вас ${length} сохранённых статей`;
    }
  }

  keyWords(keyWords) {
    const wordsArr = [...new Set(keyWords.map((item) => item.keyword))];
    switch (wordsArr.length) {
      case 0:
        this.element.querySelector('.info-block__key-words_item').textContent = 'Данных нет';
        break;
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

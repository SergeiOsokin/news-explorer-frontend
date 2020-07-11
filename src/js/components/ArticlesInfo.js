/* eslint-disable class-methods-use-this */
export default class ArticlesInfo {
  constructor(element) {
    this.element = element;
    this.blockAmount = this.element.querySelector('.info-block__amount');
    this.keyWordsBlock = this.element.querySelector('.info-block__key-words_item');
  }

  amountArticles(name, length = 0) {
    switch (length) {
      case 0:
        this.blockAmount.textContent = `${name}, у вас ${length} сохранённых статей`;
        break;
      case 1:
        this.blockAmount.textContent = `${name}, у вас ${length} сохранённая статья`;
        break;
      case 2:
        this.blockAmount.textContent = `${name}, у вас ${length} сохранённых статьи`;
        break;
      case 3:
        this.blockAmount.textContent = `${name}, у вас ${length} сохранённых статьи`;
        break;
      default:
        this.blockAmount.textContent = `${name}, у вас ${length} сохранённых статей`;
    }
  }

  keyWords(keyWords) {
    const wordsArr = [...new Set(keyWords.map((item) => item.keyword))];
    switch (wordsArr.length) {
      case 0:
        this.keyWordsBlock.textContent = 'Данных нет';
        break;
      case 1:
        this.keyWordsBlock.textContent = `${wordsArr[0]}`;
        break;
      case 2:
        this.keyWordsBlock.textContent = `${wordsArr[0]}, ${wordsArr[1]}`;
        break;
      case 3:
        this.keyWordsBlock.textContent = `${wordsArr[0]}, ${wordsArr[1]}, ${wordsArr[2]}`;
        break;
      default:
        this.keyWordsBlock.textContent = `${wordsArr[0]}, ${wordsArr[1]}, и ${wordsArr.length - 2} другим`;
        break;
    }
  }
}

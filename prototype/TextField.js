const LINE_LIMIT = 10000;
const LINES_LOAD_LIMIT = 100;

class TextField {
  // Private attributes
  #linesCount = 0; // Number
  #data = null; // String
  #linesCurrentlyVisible = 0; // Number
  #lineGenerator = null;
  
  #lineNumbersElement = document.querySelector('.numbers')
  #textAreaElement = document.querySelector('.text-area')

  // Constructor
  constructor(data) {
    this.#data = data;
    this.#linesCount = data.split('\n').length;
    this.#lineGenerator = this.lineGenerator()
  }

  // Method for getting the total number of lines
  getLinesCount() {
    return this.#linesCount;
  }

  getLinesCurrentlyVisible() {
    return this.#linesCurrentlyVisible;
  }

  getVisibleLines() {
    return this.#lineGenerator.next().value
  }

  // Method for getting the data
  getData() {
    return this.#data;
  }

  // Method for setting the line count
  setLineCount(lines) {
    this.#linesCount = lines;
  }

  // Method for setting the data
  setData(data) {
    this.#data = data;
  }

  getNumberElement() {
    return this.#lineNumbersElement
  }

  getTextAreaElement() {
    return this.#textAreaElement
  }

  moreThan100() {
    return this.getLinesCount() > 100 ? true : false;
  }

  showMoreLines() {
    // All the lines already visible, do nothing
    if (this.getLinesCurrentlyVisible() === this.getLinesCount) return;

    this.getNumberElement().innerHTML = this.getVisibleLines()
  }

  // Generator Function
  *lineGenerator() {
    let genString = "";

    for (let i = 1; i <= LINE_LIMIT; i++) {
      genString += `${i} `;

      if (i === this.getLinesCount() || i % LINES_LOAD_LIMIT === 0) {
        this.#linesCurrentlyVisible = i
        yield genString;
      }
    }
  }
}

export default TextField;


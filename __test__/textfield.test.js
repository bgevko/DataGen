import { TextField } from '../prototype/TextField';

describe('TextField', () => {
  let textField
  const testData = 'This is\n some test\n data.'

  beforeEach(() => {
    textField = new TextField(testData)
  })

  it('getLinesCount() returns the correct number of lines', () => {
    expect(textField.getLinesCount()).toEqual(3)
  })

  it('getData() returns the text data', () => {
    expect(textField.getData()).toEqual(testData)
  })

  it('setData() updates the text data', () => {
    textField.setData('New test data')
    expect(textField.getData()).toEqual('New test data')
  })

  it('moreThan100() returns true when the number of lines is more than 100', () => {
    textField.setLineCount(101)
    expect(textField.moreThan100()).toBe(true)
  })

  it('moreThan100() returns false when the number of lines is 100 or less', () => {
    textField.setLineCount(100)
    expect(textField.moreThan100()).toBe(false)
  })

  it('showMoreLines() displays more lines of text', () => {
    textField.showMoreLines()
    expect(textField.getNumberElement().innerHTML).toEqual('1 2 3 ')
  })
})

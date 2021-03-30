class Calculator {
  constructor(previousOperandTextElement, recentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.recentOperandTextElement = recentOperandTextElement
    this.clear()
  }

  clear() {
    this.recentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.recentOperand = this.recentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.recentOperand.includes('.')) return
    this.recentOperand = this.recentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.recentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.recentOperand
    this.recentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const recent = parseFloat(this.recentOperand)
    if (isNaN(prev) || isNaN(recent)) return
    switch (this.operation) {
      case '+':
        computation = prev + recent
        break
      case '-':
        computation = prev - recent
        break
      case 'x':
        computation = prev * recent
        break
      case '÷':
        computation = prev / recent
        break
      default:
        return
    }
    this.recentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.recentOperandTextElement.innerText =
      this.getDisplayNumber(this.recentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const recentOperandTextElement = document.querySelector('[data-recent-operand]')

const calculator = new Calculator(previousOperandTextElement, recentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
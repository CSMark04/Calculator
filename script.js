
class Calculator {
    constructor(prevNum, curNum) {
        this.prevNum = prevNum
        this.curNum = curNum
        this.clear()
    }

    clear() { 
        this.curNumDisplay = ''
        this.prevNumDisplay = ''
        this.operation = undefined
    }

    delete() {
        this.curNumDisplay = this.curNumDisplay.toString().slice(0, -1)

    }

    appendNumb(number) {
        if(number === '.' && this.curNumDisplay.includes('.')) return
        this.curNumDisplay = this.curNumDisplay.toString() + number.toString()
    }

    chooseOperation(opt) { 
        if (this.curNumDisplay === '') return
        if (this.prevNumDisplay !== ''){
            this.compute()
        }
        this.operation = opt
        this.prevNumDisplay = this.curNumDisplay
        this.curNumDisplay = ''
    }

    compute() { 

        let computation 
        const prev = parseFloat(this.prevNumDisplay)
        const current = parseFloat(this.curNumDisplay)
        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation){
            case '÷':
                computation = prev / current
                break
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            default:
                return
        }
        this.curNumDisplay = computation
        this.operation = undefined
        this.prevNumDisplay = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const intergerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let intergerDisplay 
        if (isNaN(intergerDigits)) {
            intergerDisplay = ''
        } else {
            intergerDisplay = intergerDigits.toLocaleString('en',{
                maximumFractionDigits: 0})
        }
        if(decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`
        } else { 
            return intergerDisplay
        }
    }

    updateDisplay() { 
        this.curNum.innerText = this.getDisplayNumber(this.curNumDisplay)
        if(this.operation != null){
            this.prevNum.innerText = `${this.getDisplayNumber(this.prevNumDisplay)} ${this.operation}`
        } else { 
            this.prevNum.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const delBtn = document.querySelector('[data-delete]')
const clearBtn = document.querySelector('[data-clear]')
const equalsBtn = document.querySelector('[data-equals]')
const curNum = document.querySelector('[data-current]')
const prevNum = document.querySelector('[data-previous]')

const calculator = new Calculator(prevNum, curNum)

numberButtons.forEach(numbtn =>{
    numbtn.addEventListener('click', () =>{
        calculator.appendNumb(numbtn.innerText)
        calculator.updateDisplay()
    })
})

clearBtn.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

operationButtons.forEach(optBtn =>{
    optBtn.addEventListener('click', () =>{
        calculator.chooseOperation(optBtn.innerText)
        calculator.updateDisplay()
    })
})

equalsBtn.addEventListener('click', () =>{
    calculator.compute()
    calculator.updateDisplay()
})

delBtn.addEventListener('click', () =>{
    calculator.delete()
    calculator.updateDisplay()
})
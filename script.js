const numberbtns = document.querySelectorAll('[data-number]')
const operationbtns = document.querySelectorAll('[data-operation]')
const equalbtns = document.querySelector('[data-sum]')
const delbtns = document.querySelector('[data-delete]')
const ACbtns = document.querySelector('[data-all-clear]')

const previousScreenTextElement = document.querySelector('data-operand-previous')
const currentScreenTextElement = document.querySelector('[data-operand-current]')

class Calculator{
    constructor(currentScreenTextElement, previousScreenTextElement)
    {
        this.currentScreenTextElement = currentScreenTextElement;
        this.previousScreenTextElement = previousScreenTextElement;
        this.clear()
    }

    clear() {
    this.currentOperand = "";
    this.previousOperand= "";
    this.operation = null;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number) {
        if(number== '.' && this.currentOperand.includes('.'))
        return;
        this.currentOperand = this.currentOperand.toString()+number.toString();
    }

    flushOperator(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();   
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if (isNaN(previous) || isNaN(current)) return;
        switch(this.operation){
            case"+":
                computation = previous + current;
            break;

            case"-":
                computation = previous - current;
            break;

            case"×":
                computation = previous * current;
            break;

            case"÷":
                computation = previous / current;
            break;

            default:
                return;
            
                
        }
        this.currentOperand=computation;
        this.previousOperand="";
        this.operation=undefined;
    }

    updateDisplay(){
        this.currentScreenTextElement.innerText = this.currentOperand 
        if (this.operation != null) {
            this.previousScreenTextElement.innerText = `${this.previousOperand}
            ${this.operation}`;
        }

    }
}

const calculator = new Calculator (
    currentScreenTextElement,
    previousScreenTextElement
);

numberbtns.forEach((button) => {
    button.addEventListener("click",() => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    });
});

operationbtns.forEach((button) => {
    button.addEventListener("click",() => {
        calculator.flushOperator(button.innerText);
        calculator.updateDisplay();
    });
});

equalbtns.addEventListener("click", function () {
        calculator.compute()
        calculator.updateDisplay()
    });

ACbtns.addEventListener("click", () => {
    calculator.clear();
        cancelIdleCallback.updateDisplay();
});
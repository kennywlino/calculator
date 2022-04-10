function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) {
        return "ERROR";
    }
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
    case "+":
        return add(a, b);
        break;
    case "-":
        return subtract(a, b);
        break;
    case "*":
        return multiply(a, b);
        break;
    case "/":
        return divide(a, b);
        break;
    }
}

function wordToOperatorSymbol(operatorWord) {
    switch (operatorWord) {
    case "add":
        return "+";
        break;
    case "subtract":
        return "-";
        break;
    case "multiply":
        return "*";
        break;
    case "divide":
        return "/";
        break;
    }
}

function updateDisplay() {
    const display = document.getElementById("display");
    display.textContent = `${firstOperand} ${currOperator} ${secondOperand}`;
}

function containsDecimal(num) {
    return num.includes('.');
}

function appendDigit(digit) {
    if (currOperator == '') {
        if (digit == '.' && containsDecimal(firstOperand)) {
            digit = '';
        }
        firstOperand += digit;
    } else {
        if(digit == '.' && containsDecimal(secondOperand)) {
            digit = '';
        }
        secondOperand += digit;
    }
    updateDisplay();
}

function resetAllVar() {
    firstOperand = '';
    secondOperand = '';
    currOperator = '';
    updateDisplay();
}

function getCurrentVar() {
    if (firstOperand != '' && currOperator == '') {
        return "firstOperand";
    } else if (currOperator != '' && secondOperand == '') {
        return "currOperator";
    } else {
        return "secondOperand";
    }
}

function calculate() {
    result = operate(currOperator, firstOperand, secondOperand);
    resetAllVar();
    firstOperand = result;
    updateDisplay();
}

function processOperator(oper) {
    if (currOperator == '') {
        currOperator = oper;
    } else {
        calculate();
        currOperator = oper;
    }
    updateDisplay();
}

function clearCurrentVar() {
    currentVar = getCurrentVar();
    if (currentVar == "firstOperand") {
        firstOperand = '';
    } else if (currentVar == "currOperator") {
        currOperator = '';
    } else {
        secondOperand = '';
    }
    updateDisplay();
}

function setDigitsEventListener() {
    const buttons = document.querySelectorAll('.number');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            appendDigit(button.id);
        });
    });
}

function setOperatorEventListener() {
    const operators = document.querySelectorAll('.operator');
    operators.forEach((operator) => {
        operator.addEventListener('click', () => {
            operSymbol = wordToOperatorSymbol(operator.id);
            processOperator(operSymbol);
        });
    });
}

function setEqualsEventListener() {
    const equalsButton = document.getElementById('equals');
    equalsButton.addEventListener('click', () => {
        if (currOperator != '' && firstOperand != '' && secondOperand != '') {
            calculate();
        }
    });
}

function setAlLClearEventListener() {
    const allClearButton = document.getElementById('all-clear');
    allClearButton.addEventListener('click', () => {
        resetAllVar();
    });
}

function setClearEventListener() {
    const clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', () => {
        clearCurrentVar();
    });
}

function setKeyboardEventListener() {
    const calcNums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
    const calcOpers = ['+', '-', '*', '/'];
    document.addEventListener('keydown', (event) => {
        var name = event.key;
        if (calcNums.includes(name)) {
            appendDigit(name);
        } else if (calcOpers.includes(name)) {
            processOperator(name);
        } else if (name == 'Enter') {
            if (currOperator != '' && firstOperand != '' && secondOperand != '') {
                calculate();
            }
        } else if (name == 'C') {
            resetAllVar();
        } else if (name == 'c') {
            clearCurrentVar();
        }
    }, false);
}

firstOperand = '';
secondOperand = '';
currOperator = '';

setDigitsEventListener();
setOperatorEventListener();
setEqualsEventListener();
setAlLClearEventListener();
setClearEventListener();
setKeyboardEventListener();

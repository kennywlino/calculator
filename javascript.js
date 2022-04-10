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
    case "x":
        return multiply(a, b);
        break;
    case "÷":
        return divide(a, b);
        break;
    }
}

function updateDisplay() {
    const display = document.getElementById("display");
    display.textContent = `${firstOperand} ${currOperator} ${secondOperand}`;
}

function setDigitsEventListener() {
    const buttons = document.querySelectorAll('.number');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            appendDigit(button.id);
            updateDisplay();
        });
    });
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
}

function containsDecimal(num) {
    return num.includes('.');
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
        return "x";
        break;
    case "divide":
        return "÷";
        break;
    }
}

function setOperatorEventListener() {
    const operators = document.querySelectorAll('.operator');
    operators.forEach((operator) => {
        operator.addEventListener('click', () => {
            if (currOperator == '') {
            currOperator = wordToOperatorSymbol(operator.id);
            updateDisplay();
            } else {
                result = operate(currOperator, firstOperand, secondOperand);
                resetAllVar();
                firstOperand = result;
                currOperator = wordToOperatorSymbol(operator.id);
                updateDisplay();
            }
        });
    });
}

function setEqualsEventListener() {
    const equalsButton = document.getElementById('equals');
    equalsButton.addEventListener('click', () => {
        result = operate(currOperator, firstOperand, secondOperand);
        resetAllVar();
        firstOperand = result;
        updateDisplay();
    });
}

function setAlLClearEventListener() {
    const allClearButton = document.getElementById('all-clear');
    allClearButton.addEventListener('click', () => {
        resetAllVar();
        updateDisplay();
    });
}

function resetAllVar() {
    firstOperand = '';
    secondOperand = '';
    currOperator = '';
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

function setClearEventListener() {
    const clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', () => {
        currentVar = getCurrentVar();
        if (currentVar == "firstOperand") {
            firstOperand = '';
        } else if (currentVar == "currOperator") {
            currOperator = '';
        } else {
            secondOperand = '';
        }
        updateDisplay();
    });
}

firstOperand = '';
secondOperand = '';
currOperator = '';

setDigitsEventListener();
setOperatorEventListener();
setEqualsEventListener();
setAlLClearEventListener();
setClearEventListener();

// PSEUDOCODE:
// How do we get variables a & b? => on number click; store them as global variables
// How do we store the operator? => on operator click; store as global variable
// How do we return the results? => global variable? how do we make it the firstOperand to use more operators?
// How do we update the display? => on button click; same time as operations above

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

function updateDisplayResult(result) {
    const display = document.getElementById("display");
    display.textContent = result;
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
        firstOperand += digit;
    } else {
        secondOperand += digit;
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
            currOperator = wordToOperatorSymbol(operator.id);
            updateDisplay();
        });
    });
}

function setEqualsEventListener() {
    const equalsButton = document.getElementById('equals');
    equalsButton.addEventListener('click', () => {
        result = operate(currOperator, firstOperand, secondOperand);
        updateDisplayResult(result); 
    });
}

firstOperand = '';
secondOperand = '';
currOperator = '';

setDigitsEventListener();
setOperatorEventListener();
setEqualsEventListener();

// PSEUDOCODE:
// How do we get variables a & b? => on number click; store them as global variables
// How do we store the operator? => on operator click; store as global variable
// How do we return the results? => global variable? how do we make it the firstOperand to use more operators?
// How do we update the display? => on button click; same time as operations above

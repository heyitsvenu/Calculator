let displayValue = "0";
let firstNumber = null;
let secondNumber = null;
let firstOperator = null;
let secondOperator = null;
let result = null;

const KEYS = document.querySelectorAll(".key");

window.addEventListener("keydown", function (e) {
  const key = document.querySelector(`.key[data-key='${e.key}']`);
  key.click();
});

function clickButton() {
  KEYS.forEach(function (key) {
    key.addEventListener("click", function (e) {
      if (e.target.classList.contains("clear")) {
        clearDisplay();
        updateDisplay();
      } else if (e.target.classList.contains("number")) {
        inputNumber(e.target.value);
        updateDisplay();
      } else if (e.target.classList.contains("operator")) {
        inputOperator(e.target.value);
        updateDisplay();
      } else if (e.target.classList.contains("equals")) {
        inputEquals();
        updateDisplay();
      } else if (e.target.classList.contains("decimals")) {
        inputDecimal(e.target.value);
        updateDisplay();
      } else if (e.target.classList.contains("del")) {
        deleteNumber();
        updateDisplay();
      }
    });
  });
}

clickButton();

function updateDisplay() {
  const DISPLAY = document.querySelector("#display");
  DISPLAY.innerText = displayValue;
}

updateDisplay();

function inputNumber(num) {
  if (firstNumber === null) {
    if (displayValue === "0" || displayValue === 0) {
      displayValue = num;
    } else if (displayValue === firstNumber) {
      displayValue = num;
    } else {
      displayValue += num;
    }
  } else {
    if (displayValue === "0" || displayValue === 0) {
      displayValue = num;
    } else if (displayValue === firstNumber) {
      displayValue = num;
    } else {
      displayValue += num;
    }
  }
}

function inputOperator(op) {
  if (firstOperator != null && secondOperator === null) {
    secondOperator = op;
    secondNumber = displayValue;
    result = operate(Number(firstNumber), Number(secondNumber), firstOperator);
    displayValue = result;
    firstNumber = displayValue;
    result = null;
  } else if (firstOperator != null && secondOperator != null) {
    secondNumber = displayValue;
    result = operate(Number(firstNumber), Number(secondNumber), secondOperator);
    secondOperator = op;
    displayValue = result;
    firstNumber = displayValue;
    result = null;
  } else {
    firstOperator = op;
    firstNumber = displayValue;
  }
}

function inputEquals() {
  if (firstOperator === null) {
    displayValue = displayValue;
  } else if (secondOperator != null) {
    secondNumber = displayValue;
    result = operate(Number(firstNumber), Number(secondNumber), secondOperator);
    if (result === "Operation not possible") {
      displayValue = "Operation not possible";
    } else {
      displayValue = result;
      firstNumber = displayValue;
      secondNumber = null;
      firstOperator = null;
      secondOperator = null;
      result;
    }
  } else {
    secondNumber = displayValue;
    result = operate(Number(firstNumber), Number(secondNumber), firstOperator);
    if (result === "NP") {
      displayValue = "STOP IT!";
    } else {
      displayValue = result;
      firstNumber = displayValue;
      secondNumber = null;
      firstOperator = null;
      secondOperator = null;
      result = null;
    }
  }
}

function inputDecimal(decimal) {
  if (displayValue === firstNumber || displayValue === secondNumber) {
    displayValue = "0";
    displayValue += decimal;
  } else if (!displayValue.includes(decimal)) {
    displayValue += decimal;
  }
}

function deleteNumber() {
  if (displayValue != "0") {
    displayValue = "0";
  }
}

function clearDisplay() {
  displayValue = "0";
  firstNumber = null;
  secondNumber = null;
  firstOperator = null;
  secondOperator = null;
  result = null;
}

function operate(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
      break;
    case "-":
      return a - b;
      break;
    case "*":
      return a * b;
      break;
    case "/":
      if (b === 0) {
        return "NP";
      } else {
        return a / b;
      }
      break;
    default:
      return null;
  }
}

//Get all the buttons
const buttons = document.querySelectorAll("button");

const display = document.querySelector("#result");

let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;
let clearDisplay = false;

function updateDisplay(value) {
    if (clearDisplay) {
        display.value = value;
        clearDisplay = false;
    } else {
        display.value += value;
    }
}
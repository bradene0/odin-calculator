//Get all the buttons
const buttons = document.querySelectorAll("button");

//Gets the display input
const display = document.querySelector("#result");

//Initializes the calculator's variables
let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;
let clearDisplay = false;

//Function to update the display
function updateDisplay(value) {
    if (clearDisplay) {
        display.value = value;
        clearDisplay = false;
    } else {
        display.value += value;
    }
}

//Function to clear the display
function clear() {
    display.value = "";
    firstOperand = null;
    secondOperand = null;
    operator = null;
    result = null;
    clearDisplay = false;
    }

//Function to handle backspaces
function backspace() {
    display.value = display.value.slice(0, -1);
    }

//Function to handle percentages
function percentage() {
    display.value = Number(display.value) / 100;
    result = display.value;
    }

//Function to handle operator button
function handleOperator(value) {
	if (firstOperand === null) {
		firstOperand = Number(display.value);
		operator = value;
		clearDisplay = true;
	} else if (operator !== null) {
		secondOperand = Number(display.value);
		if (operator === "/" && secondOperand === 0) {
			display.value = "Error!! Nice try!";
		} else {
			result = operate(operator, firstOperand, secondOperand);
			display.value = result;
			firstOperand = result;
			secondOperand = null;
			operator = value;
			clearDisplay = true;
		}
	}
}
   
//Function to handle equal button
function handleEqual() {
    if (operator !== null && secondOperand === null) {
    secondOperand = Number(display.value);
    result = operate(operator, firstOperand, secondOperand);
    display.value = result;
    firstOperand = result;
    secondOperand = null;
    operator = null;
    clearDisplay = true;
    }
    }

//Function to perform operations
function operate(operator, firstOperand, secondOperand) {
    switch (operator) {
    case "+":
    return firstOperand + secondOperand;
    case "-":
    return firstOperand - secondOperand;
    case "*":
    return firstOperand * secondOperand;
    case "/":
    return firstOperand / secondOperand;
    default:
    return null;
    }
}

//Adds event listeners to each button
buttons.forEach(button => {
    button.addEventListener("click", () => {
    const value = button.textContent;
    switch (value) {
    case "C":
    clear();
    break;
    case "←":
    backspace();
    break;
    case "%":
    percentage();
    break;
    case "+":
    case "-":
    case "*":
    case "/":
    handleOperator(value);
    break;
    case "=":
    handleEqual();
    break;
    default:
    updateDisplay(value);
    break;
    }
    });
    });

//Added event listener to listen for key presses!
document.addEventListener("keydown", (event) => {
	const key = event.key;
	if (key >= "0" && key <= "9") {
		updateDisplay(key);
	} else if (key === ".") {
		if (!display.value.includes(".")) {
			updateDisplay(key);
		}
	} else if (key === "+" || key === "-" || key === "*" || key === "/") {
		handleOperator(key);
	} else if (key === "Enter" || key === "=") {
		handleEqual();
	} else if (key === "Backspace") {
		backspace();
	} else if (key === "Escape" || key === "c" || key === "C") {
		clear();
	}
});
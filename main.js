// Get all the buttons
const buttons = document.querySelectorAll("button");

// Get the display input
const display = document.querySelector("#result");

// Initialize the calculator variables
let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;
let clearDisplay = false;

// Function to update the display
function updateDisplay(value) {
	if (clearDisplay) {
		display.value = value;
		clearDisplay = false;
	} else {
		display.value += value;
	}
}

// Function to clear the
function clear() {
	display.value = "";
	firstOperand = null;
	secondOperand = null;
	operator = null;
	result = null;
	clearDisplay = false;
	}
	
	// Function to handle backspace
	function backspace() {
	display.value = display.value.slice(0, -1);
	}
	
	// Function to handle percentage
	function percentage() {
	display.value = Number(display.value) / 100;
	result = display.value;
	}
	
	// Function to handle operator buttons
	function handleOperator(value) {
	if (firstOperand === null) {
	firstOperand = Number(display.value);
	operator = value;
	clearDisplay = true;
	} else if (operator !== null) {
	secondOperand = Number(display.value);
	result = operate(operator, firstOperand, secondOperand);
	display.value = result;
	firstOperand = result;
	secondOperand = null;
	operator = value;
	clearDisplay = true;
	}
	}
	
	// Function to handle equal button
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
	
	// Function to perform operation based on operator
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
	
	// Add event listeners to buttons
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
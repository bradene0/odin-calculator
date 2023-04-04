
const calculator = {
	displayValue: '0',
	firstOperand: null,
	waitingForSecondOperand: false,
	operator: null,
};


function updateDisplay() {
	const display = document.getElementById('display');
	display.value = calculator.displayValue;
}


updateDisplay();


function inputDigit(digit) {
	if (calculator.waitingForSecondOperand === true) {
		calculator.displayValue = digit;
		calculator.waitingForSecondOperand = false;
	} else {
		calculator.displayValue = calculator.displayValue === '0' ? digit : calculator.displayValue + digit;
	}
}


function inputDecimal(decimal) {
	if (calculator.waitingForSecondOperand === true) {
		calculator.displayValue = '0.';
		calculator.waitingForSecondOperand = false;
		return;
	}

	if (!calculator.displayValue.includes(decimal)) {
		calculator.displayValue += decimal;
	}
}


function handleOperator(nextOperator) {
	const input = parseFloat(calculator.displayValue);

	if (calculator.operator && calculator.waitingForSecondOperand) {
		calculator.operator = nextOperator;
		return;
	}

	if (calculator.firstOperand == null) {
		calculator.firstOperand = input;
	} else if (calculator.operator) {
		const currentValue = calculator.firstOperand || 0;
		const result = performCalculation[calculator.operator](currentValue, input);

		calculator.displayValue = String(result);
		calculator.firstOperand = result;
	}

	calculator.waitingForSecondOperand = true;
	calculator.operator = nextOperator;
}


const performCalculation = {
	'/': (x, y) => x / y,
	'*': (x, y) => x * y,
	'+': (x, y) => x + y,
	'-': (x, y) => x - y,
	'=': (x, y) => y
};


function handleEquals() {
	if (calculator.operator === '/') {
		const input = parseFloat(calculator.displayValue);

		if (input === 0) {
			calculator.displayValue = 'Error!! Nice try!';
			calculator.firstOperand = null;
			calculator.waitingForSecondOperand = false;
			calculator.operator = null;
			return;
		}
	}

	const input = parseFloat(calculator.displayValue);

	if (calculator.firstOperand == null && calculator.operator === '/') {
		calculator.displayValue = 'Error!! Nice try!';
		calculator.waitingForSecondOperand = false;
		calculator.operator = null;
		return;
	}

	if (calculator.waitingForSecondOperand && calculator.operator) {
		calculator.firstOperand = performCalculation[calculator.operator](calculator.firstOperand, input);
		calculator.displayValue = String(calculator.firstOperand);
		calculator.waitingForSecondOperand = false;
	} else {
		calculator.displayValue = String(input);
	}

	calculator.operator = null;
}


function clearCalculator() {
	calculator.displayValue = '0';
	calculator.firstOperand = null;
	calculator.waitingForSecondOperand = false;
	calculator.operator = null;
}


function handleBackspace() {
	if (calculator.displayValue.length === 1) {
		calculator.displayValue = '0';
	} else {
		calculator.displayValue = calculator.displayValue.slice(0, -1);
	}
}


const digitButtons = document.querySelectorAll('.digit');
digitButtons.forEach(button => {
	button.addEventListener('click', () => {
		inputDigit(button.innerText);
		updateDisplay();
	});
});


const decimalButton = document.getElementById('decimal');
decimalButton.addEventListener('click', () => {
	inputDecimal(decimalButton.innerText);
	updateDisplay();
});


const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
	button.addEventListener('click', () => {
		handleOperator(button.innerText);
		updateDisplay();
	});
});


const equalsButton = document.getElementById('equals');
equalsButton.addEventListener('click', () => {
	handleEquals();
	updateDisplay();
});


const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
	clearCalculator();
	updateDisplay();
});


const backButton = document.getElementById('backspace');
backButton.addEventListener('click', () => {
	handleBackspace();
	updateDisplay();
});


document.addEventListener('keydown', (event) => {
	const key = event.key;
	const digit = /[0-9]/;
	const operator = /[\+\-\*\/]/;
	const decimal = /\./;

	if (digit.test(key)) {
		inputDigit(key);
		updateDisplay();
	} else if (operator.test(key)) {
		handleOperator(key);
		updateDisplay();
	} else if (decimal.test(key)) {
		inputDecimal(key);
		updateDisplay();
	} else if (key === 'Enter') {
		handleEquals();
		updateDisplay();
	} else if (key === 'Backspace') {
		handleBackspace();
		updateDisplay();
	}
    event.preventDefault();
});


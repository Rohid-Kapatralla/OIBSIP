const currentDisplay = document.getElementById("current-display");
const previousDisplay = document.getElementById("previous-display");

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const actionButtons = document.querySelectorAll("[data-action]");

let currentValue = "";
let previousValue = "";
let selectedOperator = null;
let shouldResetDisplay = false;


// -------------------------
// Number buttons
// -------------------------
numberButtons.forEach(button => {
    button.addEventListener("click", () => {

        const number = button.dataset.number;

        if (shouldResetDisplay) {
            currentValue = "";
            shouldResetDisplay = false;
        }

        // Prevent multiple decimal points
        if (number === "." && currentValue.includes(".")) {
            return;
        }

        // Prevent unnecessary leading zeros
        if (currentValue === "0" && number !== ".") {
            currentValue = number;
        } else {
            currentValue += number;
        }

        updateDisplay();
    });
});


// -------------------------
// Operator buttons
// -------------------------
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {

        if (currentValue === "") {
            return;
        }

        if (previousValue !== "" && selectedOperator !== null) {
            calculate();
        }

        previousValue = currentValue;
        selectedOperator = button.dataset.operator;
        shouldResetDisplay = true;

        previousDisplay.textContent =
            `${previousValue} ${getOperatorSymbol(selectedOperator)}`;
    });
});


// -------------------------
// Calculate result
// -------------------------
function calculate() {

    if (
        previousValue === "" ||
        currentValue === "" ||
        selectedOperator === null
    ) {
        return;
    }

    const firstNumber = parseFloat(previousValue);
    const secondNumber = parseFloat(currentValue);

    let result;

    switch (selectedOperator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":

            if (secondNumber === 0) {
                currentValue = "Error";
                previousValue = "";
                selectedOperator = null;
                shouldResetDisplay = true;

                previousDisplay.textContent = "Cannot divide by zero";

                updateDisplay();
                return;
            }

            result = firstNumber / secondNumber;
            break;
    }

    // Avoid very long decimal results
    result = Number(result.toFixed(10));

    currentValue = result.toString();

    previousValue = "";
    selectedOperator = null;
    shouldResetDisplay = true;

    previousDisplay.textContent = "";

    updateDisplay();
}


// -------------------------
// Clear button
// -------------------------
const clearButton = document.querySelector('[data-action="clear"]');

clearButton.addEventListener("click", () => {

    currentValue = "";
    previousValue = "";
    selectedOperator = null;
    shouldResetDisplay = false;

    previousDisplay.textContent = "";

    updateDisplay();
});


// -------------------------
// Backspace button
// -------------------------
const backspaceButton =
    document.querySelector('[data-action="backspace"]');

backspaceButton.addEventListener("click", () => {

    if (shouldResetDisplay) {
        return;
    }

    currentValue = currentValue.slice(0, -1);

    updateDisplay();
});


// -------------------------
// Equals button
// -------------------------
const equalsButton =
    document.querySelector('[data-action="calculate"]');

equalsButton.addEventListener("click", () => {
    calculate();
});


// -------------------------
// Update display
// -------------------------
function updateDisplay() {

    if (currentValue === "") {
        currentDisplay.textContent = "0";
    } else {
        currentDisplay.textContent = currentValue;
    }
}


// -------------------------
// Operator symbols
// -------------------------
function getOperatorSymbol(operator) {

    const symbols = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷"
    };

    return symbols[operator];
}


// Initial display
updateDisplay();
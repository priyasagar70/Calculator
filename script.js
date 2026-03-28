// --- CALCULATOR LOGIC ---
// We keep the logic simple for beginners using straightforward functions.

// 1. Get the display element from our HTML to update the text inside it
const displayElement = document.getElementById('display');

// 2. Track the current expression the user enters
// We'll store numbers and operators as a string (e.g., "7+8")
let currentExpression = '';

/**
 * Appends a number to the display when clicked.
 * @param {string} number - The number string from the button ("0" to "9")
 */
function appendNumber(number) {
    // If there was an error, clear it before appending the new number
    if (currentExpression === 'Error') {
        currentExpression = '';
    }

    // Add the new number to the end of our current logical expression
    currentExpression += number;
    
    // Update what the user sees
    updateDisplay();
}

/**
 * Appends a mathematical operator (+, -, *, /) when clicked.
 * @param {string} operator - The operator symbol
 */
function appendOperator(operator) {
    // If the expression is empty or "Error", ignore the initial operator press
    if (currentExpression === '' || currentExpression === 'Error') {
        return;
    }

    // Advanced: Prevent double operators (like "++" or "+*")
    // Retrieve the last character in the current expression string
    const lastCharacter = currentExpression.slice(-1);
    
    // Array of possible operators to check against
    const operatorsList = ['+', '-', '*', '/'];

    if (operatorsList.includes(lastCharacter)) {
        // Replace the last operator with the new one
        // slicing from '0 to -1' deletes the last character
        currentExpression = currentExpression.slice(0, -1) + operator;
    } else {
        // If the last character was a number, just append the operator
        currentExpression += operator;
    }

    updateDisplay();
}

/**
 * Clears the entirely screen when "C" is clicked.
 */
function clearDisplay() {
    currentExpression = ''; // Reset to empty string
    updateDisplay();
}

/**
 * Evaluates the mathematical expression and displays the final result when "=" is clicked.
 */
function calculate() {
    // Don't calculate if nothing has been entered
    if (currentExpression === '' || currentExpression === 'Error') {
        return;
    }

    try {
        // The eval() function computes Javascript string arithmetic natively.
        // E.g., eval("5+5") results in the number 10.
        // NOTE: eval() has security risks if user text input is untracked 
        // but is safe here since we strictly control button entry.
        let result = eval(currentExpression);

        // Handle mathematical limitations like division by zero in JavaScript (Infinity)
        if (!isFinite(result)) {
            currentExpression = 'Error'; // Graceful error text
        } else {
            // Convert evaluation back to string to show it in the disabled input UI
            currentExpression = result.toString();
        }
        
    } catch (error) {
        // A catch block executes if the user submits a syntactically wrong expression
        // such as terminating on an operator (e.g., "7+").
        currentExpression = 'Error';
    }

    updateDisplay();
}

/**
 * Helper function which updates our input HTML interface visual
 */
function updateDisplay() {
    displayElement.value = currentExpression;
}

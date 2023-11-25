let a = null;
let b = null;
let operator = null;
let result = 0;
let isError = false; 

let textArea = document.querySelector('.text-area');
let buttonGrid = document.querySelector('.button-grid');



buttonGrid.addEventListener('click', function (e){
    if (e.target.classList.contains('calc-button')) {
        const buttonText = e.target.textContent;

        if (e.target.classList.contains('num')){
            if (!checkDisplayLength(buttonText)) return;
            if (operator === null) {
                a = a === null ? buttonText : a + buttonText;
                textArea.textContent = `${a}`;
            } else {
                b = b === null ? buttonText : b + buttonText;
                textArea.textContent = `${a}${operator}${b}`;
            }
        } else if (e.target.classList.contains('op')) {
            if (!checkDisplayLength()) return;
            if (b === null) {
                operator = buttonText;
                textArea.textContent = `${a}${operator}`;
            } else if (b !== null && operator !== null) {
                operate(a,b,operator);
                if (isError) {
                    isError = false;
                    return;
                }
                a = result;
                operator = buttonText;
                textArea.textContent = `${a}${operator}`;
                b = null;
            }
            
        } else if (e.target.classList.contains('clear')) {
            if (b !== null && b.length > 0) {
                b = b.slice(0, -1);
                textArea.textContent = `${a}${operator}${b}`;
            } else if (operator !== null) {
                operator = null;
                textArea.textContent = `${a}`;
            } else if (a !== null && a.length > 0) {
                a= a.slice(0, -1);
                textArea.textContent = `${a}`;
            }
        } else if (e.target.classList.contains('AC')) {
            a = null;
            b = null;
            operator = null;
            result = 0;
            textArea.textContent = `${result}`;
        } else if (e.target.classList.contains('equal')) {
            operate(a,b,operator);
            if (isError) {
                isError = false;
                return;
            }
            a = result;
            textArea.textContent = `${a}`;
            operator = null;
            b = null;
        }else if (e.target.classList.contains('decimal')){
            if (operator === null) {
                if (!a || !a.includes('.')){
                    a = a === null ? '0' + buttonText : a + buttonText;
                }
                textArea.textContent = `${a}`;
            } else {
                if (!b || !b.includes('.')){
                    b = b === null ? '0' + buttonText : b + buttonText;
                }
                textArea.textContent = `${a}${operator}${b}`;
            } 
        }
    }
});

function operate(a,b,operator){
    if (a != null && b != null && operator != null){
        if (operator === "+") {
            sum(a, b);
        } else if (operator === "-") {
            subtract(a, b);
        } else if (operator === "*") {
            multiply(a, b);
        } else if (operator === "/") {
            divide(a, b);
            if (parseFloat(b) === 0) return;
        }
        if (isError) {
            return;
        }
        textArea.textContent = `${result}`;
    }
};

function checkDisplayLength(proposedInput) {
    let displayContent = a || '';
    if (operator) displayContent += operator;
    if (b || proposedInput) displayContent += b || proposedInput;
    return displayContent.length <= 14;
}

// Keyboard Functionality (Bonus) 
document.addEventListener('keydown', function(event) {
    event.preventDefault();
    let key = event.key;

    switch (key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            simulateButtonClick(`num-${key}`);
            break;
        case '+':
            simulateButtonClick(`plus`);
            break;
        case '-':
            simulateButtonClick(`minus`);
            break;
        case '*':
            simulateButtonClick(`multiply`);
            break;
        case '/':
            simulateButtonClick(`divide`);
            break;
        case 'Enter':
            simulateButtonClick('equal');
            break;
        case 'Backspace':
            simulateButtonClick('clear');
            break;
        case '.':
            simulateButtonClick('decimal');
            break;
    }
});

function simulateButtonClick(buttonClass) {
    let button = document.querySelector(`.${buttonClass}`);
    if (button) {
        button.click(); 
    }
}


// Mathematical functions 
function sum(a,b) {
    result = parseFloat(a) + parseFloat(b);
    if (result.toString().includes('.')){
        return result = result.toFixed(2);
    }
    return result;
}
function subtract(a,b) {
    result = parseFloat(a) - parseFloat(b);
    if (result.toString().includes('.')){
        return result = result.toFixed(2);
    }
    return result;
}
function multiply(a,b) {
    result = parseFloat(a) * parseFloat(b);
    if (result.toString().includes('.')){
        return result = result.toFixed(2);
    }
    return result;
}
function divide(a,b) {
    if (parseFloat(b) === 0) {
        textArea.textContent = `Bond, James Bond!`;
        isError = true;
        return ;
    } else {
    result = parseFloat(a) / parseFloat(b);
    if (result.toString().includes('.')){
        return result = result.toFixed(2);
    }
    return result;
    }
}








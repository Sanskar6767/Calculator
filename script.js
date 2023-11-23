let a = null;
let b = null;
let operator = null;
let result = 0;

let textArea = document.querySelector('.text-area');
let buttonGrid = document.querySelector('.button-grid');



buttonGrid.addEventListener('click', function (e){
    if (e.target.classList.contains('calc-button')) {
        const buttonText = e.target.textContent;

        if (e.target.classList.contains('num')){
            if (operator === null) {
                a = a === null ? buttonText : a + buttonText;
                textArea.textContent = `${a}`;
            } else {
                b = b === null ? buttonText : b + buttonText;
                textArea.textContent += `${b}`;
            }
        } else if (e.target.classList.contains('op')) {
            operator = buttonText;
            textArea.textContent += `${operator}`;
        } else if (e.target.classList.contains('clear')) {
            console.log("its: ", buttonText);
        } else if (e.target.classList.contains('AC')) {
            a = null;
            b = null;
            operator = null;
            result = 0;
            textArea.textContent = `${result}`;
        } else if (e.target.classList.contains('equal')) {
            operate(a,b,operator);
            a = result;
            textArea.textContent = `${a}`;
            operator = null;
            b = null;
        }
    }
});

function operate(a,b,operator){
    if (a != null && b != null && operator != null){
        if (operator === "+") {
            sum(a,b);
        } else if (operator === "-") {
            subtract(a,b);
        } else if (operator === "*") {
            multiply(a,b);
        } else if (operator === "/") {
            divide(a,b);
        }
        textArea.textContent = `${result}`;
    }
};


// Mathematical functions 
function sum(a,b) {
    return result = parseInt(a) + parseInt(b);
}
function subtract(a,b) {
    return result = parseInt(a) - parseInt(b);
}
function multiply(a,b) {
    return result = parseInt(a) * parseInt(b);
}
function divide(a,b) {
    if (parseInt(b) === 0) {
        alert("I am not falling for that");
    } else {
    return result = parseInt(a) / parseInt(b);
    }
}

// pasting in textArea 







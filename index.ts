// Declarations
const form = <HTMLFormElement>document.getElementById('form');
const input = <HTMLInputElement>document.getElementById('input');
const message = <HTMLElement>document.getElementById('message');
const hideErrorMessage = () => (message.className = 'hidden');
const makeErrorVisible = () => (message.className = 'visible');
const borderError = '1px solid rgba(255, 84, 102, .7)';
const borderNormal = '1px solid rgba(76, 123, 243, .7)';
const boxShadowError = '0 0 0 1px rgba(255, 84, 102, .7)';
const boxShadowNormal = '0 0 0 1px rgba(76, 123, 243, .7)';
const resetBoxShadow = '0 0 0 0 rgba(255, 84, 102, .7)';
let focusType = 'VALID';
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailValidation = emailRegex.test(input.value);
    if (emailValidation) {
        focusType = 'VALID';
        input.style.border = borderNormal;
        input.value = '';
        hideErrorMessage();
    } else {
        input.style.border = borderError;
        input.style.boxShadow = boxShadowError;
        makeErrorVisible();
        focusType = 'INVALID';
    }
});

input.addEventListener('focus', function () {
    if (input.value === '' && focusType === 'INVALID') {
        this.style.border = borderError;
    } else if (input.value === '' && focusType === 'VALID') {
        this.style.boxShadow = boxShadowNormal;
    }
});
input.addEventListener('blur', function () {
    if (input.value === '' && focusType === 'INVALID') {
        this.style.boxShadow = boxShadowError;
        makeErrorVisible();
    } else if (input.value !== '' && focusType === 'VALID') {
        this.style.boxShadow = resetBoxShadow;
        this.style.border = borderNormal;
    } else {
        this.style.boxShadow = resetBoxShadow;
        hideErrorMessage();
    }
});

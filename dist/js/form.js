const orderInputs = document.querySelectorAll('.orderForm-input');
const submitOrder = document.querySelector('.order__btn');
const timeInputs = document.querySelectorAll('.time-block__timepicker');

let inputsObj = JSON.parse(localStorage.getItem('orderForm')) || {};

orderInputs.forEach(input => {
    input.addEventListener('change', () => {
        if (input.value) {
            inputsObj = Array.from(orderInputs).filter(el => el.value !== '').reduce((acc, input) => ({
                ...acc, [input.name]: input.value
            }), {});
        }
    })
})

function getSelectedTime() {
    timeInputs.forEach(input => {
        if(input.value) {
            inputsObj = {
                ...inputsObj, [input.name]: input.value
            }
        }
    })
}

submitOrder.addEventListener('click', () => {
    getSelectedTime();
    localStorage.setItem('orderForm', JSON.stringify(inputsObj));
    console.log('submit');
})
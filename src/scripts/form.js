const orderInputs = document.querySelectorAll('.orderForm-input');
const submitOrder = document.querySelectorAll('.order__btn');
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

// submitOrder.addEventListener('click', () => {
//     getSelectedTime();
//     localStorage.setItem('orderForm', JSON.stringify(inputsObj));
    
// });

const forms = document.querySelectorAll('form');
const message = {
  loading: 'Загрузка...',
  success: 'Спасибо! Скоро мы с вами свяжемся',
  failure: 'Что-то пошло не так...'
};

forms.forEach(item => {
  postData(item);
});

function postData(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    form.appendChild(statusMessage);

    const request = new XMLHttpRequest();
    request.open('POST', 'send-message-to-telegram.php');
    const formData = new FormData(form);

    request.send(formData);

    request.addEventListener('load', () => {
      if (request.status === 200) {
        console.log(request.response);
        form.reset();
      } else {
        statusMessage.textContent = message.failure;
      }
    });
  });
};
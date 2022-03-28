const deliverBtn = document.querySelector('#deliver-btn');
const takeMySelfBtn = document.querySelector('#takeMySelf-btn');
const modal = document.querySelector('.modal');

const toGoBlock = document.querySelector('.col-1__toGo-active');
const toGoBtn = document.querySelector('.col-1__delivery-cont_toGo');
const deliveryBlock = document.querySelector('.col-1__delivery-active');
const deliveryBtn = document.querySelector('.col-1__delivery-cont_del');

if (modal) {
    if (document.location.pathname === '/order.html') {
        modal.style.display = "flex";
    } else {
        modal.style.display = "none";
    }

    if (localStorage.typeOfDelivery === 'col-1__delivery-cont_toGo') {
        addActive(toGoBlock, toGoBtn, deliveryBlock, deliveryBtn);
        modal.style.display = "none";
    } else if (localStorage.typeOfDelivery === 'col-1__delivery-cont_del') {
        addActive(deliveryBlock, deliveryBtn, toGoBlock, toGoBtn);
        modal.style.display = "none";
    }

    modal.addEventListener('click', e => {
        if (e.target === deliverBtn) {
            modal.style.display = "none";
            checkTypeOfDelivery(e);
        } else if (e.target === takeMySelfBtn) {
            modal.style.display = "none";
            checkTypeOfDelivery(e);
        }
    })
}

document.querySelector('.col-1__order-type').addEventListener('click', (e) => checkTypeOfDelivery(e));

function checkTypeOfDelivery(e) {

    const takeMySelfArr = ['col-1__delivery-cont_toGo', 'col-1__delivery-toGo-btn', 'col-1__delivery-toGo'];
    const deliverArr = ['col-1__delivery-cont_del', 'col-1__delivery-del-btn', 'col-1__delivery-del'];

    if (takeMySelfArr.some(el => e.target.classList.contains(el))) {
        addActive(toGoBlock, toGoBtn, deliveryBlock, deliveryBtn);
        localStorage.setItem('typeOfDelivery', 'col-1__delivery-cont_toGo');
    }

    if (deliverArr.some(el => e.target.classList.contains(el))) {
        addActive(deliveryBlock, deliveryBtn, toGoBlock, toGoBtn);
        localStorage.setItem('typeOfDelivery', 'col-1__delivery-cont_del');
    }
};

function addActive(addBlock, addBtn, removeBlock, removeBtn) {
    addBlock.classList.add('_active');
    addBtn.classList.add('_active');
    removeBlock.classList.remove('_active');
    removeBtn.classList.remove('_active');
}

function thanksModal() {
    modal.style.display = "block";
    modal.innerHTML = '';
    modal.innerHTML = `
        <div class="modal-header">
            <p class="modal-thanks">Дякуємо за замовлення ! =) <br> За необхідності ми Вам зателефонуємо</p>
        </div>
    `;
    setTimeout(function(){
        window.location.href = './index.html';
      }, 5 * 1000);
}

export {thanksModal};
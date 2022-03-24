const deliverBtn = document.querySelector('#deliver-btn');
const takeMySelfBtn = document.querySelector('#takeMySelf-btn');
const modal = document.querySelector('.modal');

if (modal) {
    if (document.location.pathname === '/order.html') {
        modal.style.display = "flex";
    } else {
        modal.style.display = "none";
    }

    modal.addEventListener('click', e => {
        if (e.target === deliverBtn) {
            modal.style.display = "none";
            checkTypeOfDelivery(e);
            console.log(e.target, 'deliver btn')
        } else if (e.target === takeMySelfBtn) {
            modal.style.display = "none";
            checkTypeOfDelivery(e);
            console.log(e, 'takeMySelf btn')
        }
    })
}

document.querySelector('.col-1__order-type').addEventListener('click', (e) => checkTypeOfDelivery(e));

function checkTypeOfDelivery(e) {
    const toGoBlock = document.querySelector('.col-1__toGo-active');
    const toGoBtn = document.querySelector('.col-1__delivery-cont_toGo');
    const deliveryBlock = document.querySelector('.col-1__delivery-active');
    const deliveryBtn = document.querySelector('.col-1__delivery-cont_del');

    if (e.target.classList.contains('col-1__delivery-cont_toGo') || e.target.classList.contains('col-1__delivery-toGo-btn') || e.target.classList.contains('col-1__delivery-toGo')) {
        addActive(toGoBlock, toGoBtn, deliveryBlock, deliveryBtn);
    }

    if (e.target.classList.contains('col-1__delivery-cont_del') || e.target.classList.contains('col-1__delivery-del-btn') || e.target.classList.contains('col-1__delivery-del')) {
        addActive(deliveryBlock, deliveryBtn, toGoBlock, toGoBtn);
    }
};

function addActive(addBlock, addBtn, removeBlock, removeBtn) {
    addBlock.classList.add('_active');
    addBtn.classList.add('_active');
    removeBlock.classList.remove('_active');
    removeBtn.classList.remove('_active');
}

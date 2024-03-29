window.addToCart = addToCart;
window.changeNumberOfUnits = changeNumberOfUnits;
window.removeItemFromCart = removeItemFromCart;

const today = new Date();
const todayHours = today.getHours();
const todayDay = today.getDay();

const pizzaContainer = document.querySelector('.pizza__container');
const pizzaClassico = document.querySelector('.pizza__classico');
const pizzaPremio = document.querySelector('.pizza__premio');
const pizzaMaestro = document.querySelector('.pizza__maestro');
const cartListContainer = document.querySelector('.basket__item-cont');
const totalItemsInCart = document.querySelector('.actions__basket-quantity');
const totalPriceInCart = document.querySelector('.col-2__price-value');
const deliveryList = document.querySelector('.col-2__list');
const order = document.querySelector('.order');
const submitOrder = document.querySelectorAll('.order__btn');
const inputHiddenField = document.querySelectorAll('.basket__price-total-input');

if (document.location.pathname === '/order.html') {
  order.classList.add('_active');
} else {
  order.classList.remove('_active');
}

// Render section 'Pizza' 
function renderPizza() {
  const parentsArr = [pizzaClassico, pizzaPremio, pizzaMaestro];

  parentsArr.forEach(parent => {
    productsPizza.forEach(pizza => {
      if (parent) {
        if (parent.id === pizza.class) {
          parent.innerHTML += `
            <div data-pid="${pizza.id}" class="pizza__card card ${pizza.class}">
              <div class="card__img-cont">
                <img class="card__img" src="${pizza.imgSrc}" alt="${pizza.name}}">
              </div>
              <div class="card__title">
                <h3>${pizza.name}</h3>
              </div>
              <div class="card__description">
                <h4>
                  ${pizza.description}
                </h4>
              </div>
              <div class="card__footer">
                <img class="card__hryvnia" src="./img/icons/hryvnia.svg" alt="hryvnia">
                <span class="card__price">${pizza.price}</span>
                <img class="card__hryvnia-red" src="./img/icons/hryvnia-red.svg" alt="hryvnia">
                <span class="card__sale-price">${pizza.salePrice}*  </span>
                
              </div>
            </div>
          `;
        }
      }
    })
  })

};
{/* <button onclick="addToCart(event, '${pizza.id}')" class="card__btn">
                  <img class="card__cart-icon" src="img/icons/basket-orange.svg" alt="basket">
                </button> */}
renderPizza();

// Масив елементів, що знаходяться у кошику
let cart = JSON.parse(localStorage.getItem('CART')) || [];
// updateCart();

// Додати до кошика
function addToCart(event, id) {
  const targetElement = event.target;

  if (targetElement.classList.contains('card__btn') || targetElement.classList.contains('card__cart-icon')) {
    const productId = targetElement.closest('.pizza__card').dataset.pid;;
    addFlyImgToCart(targetElement, productId);
    event.preventDefault();
  }

  if (cart.some(item => item.id === id)) {
    changeNumberOfUnits('plus', id)
  } else {
    const findElem = productsPizza.find(item => item.id === id);

    cart.push({ ...findElem, numberOfUnits: 1 });
  }

  setTimeout(updateCart, 500);
}

// Рендерінг елементів кошика
function renderCartItems() {
  const parentsArr = [cartListContainer, deliveryList];

  parentsArr.forEach(parent => {

    parent.innerHTML = '';

    cart.forEach(item => {

      parent.innerHTML += `
          <hr>
          <div data-cart-pid="${item.id}" class="basket__item">
            <img class="basket__item-img" src="${item.imgSrc}" alt="${item.name}">
            <div class="basket__details">
              <input class="basket__titleAndQuantityInput" type="hidden" name="pizza_name[]" " value="">
              <span class="basket__title">${item.name}</span>
              <div class="basket__cost">
                  
                  <div class="order__quantity">
                    <div class="order__minus-quantity quantity-img" onclick="changeNumberOfUnits('minus', '${item.id}')">
                    </div>
                    <span class="order__current-quantity basket__quantity">${item.numberOfUnits}</span>
                    <div class="order__plus-quantity quantity-img" onclick="changeNumberOfUnits('plus', '${item.id}')">
                    </div>
                  </div>
                  <div class="order__multiply">X</div>
                  <img class="basket__price-img" src="./img/icons/hryvnia-gray.svg" alt="hryvnia">
                  <span class="basket__price">${(todayHours >= 11 && todayHours < 14 && todayDay === 5) ? item.salePrice : item.price }</span>
                  <input type="hidden" name="" class="basket__price-current-input" value="" disabled>
              </div>
            </div>
            <div class="basket__delete-btn" onclick="removeItemFromCart('${item.id}')">
                <img class="basket__delete-img" src="./img/icons/close.svg" alt="delete">
            </div>
          </div>
        `
    });
  })

};

// Зміна кількості одиниць товару в кошику для замовлення
function changeNumberOfUnits(action, id) {
  cart = cart.map(item => {

    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === 'plus') {
        numberOfUnits++
      } else if (action === 'minus') {
        if (numberOfUnits > 1) {
          numberOfUnits--
        }
      }
    }
    return { ...item, numberOfUnits }
  })

  updateCart();
};

// Видалення елементів із кошика
function removeItemFromCart(id) {
  cart = cart.filter(item => item.id !== id);

  updateCart();
}

// Оновити кошик
function updateCart() {
  renderCartItems();
  renderSubtotal();

  //localStorage
  localStorage.setItem('CART', JSON.stringify(cart));

  disableOrderBtn();
  orderPizzaNameAndUnits();
}

// Підрахунок кількості товарів, загальної вартості та їх рендерінг
function renderSubtotal() {
  let totalPrice = 0;
  let totalItems = 0;
  let totalSaleItems = 0;

  cart.forEach(item => {
    totalPrice += item.price * item.numberOfUnits;
    totalSaleItems += item.salePrice * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  totalPriceInCart.innerHTML = `${totalPrice} грн`;
  totalItemsInCart.innerHTML = totalItems;

  //Щасливі години з 11 до 14
  if (todayHours >= 11 && todayHours < 14 && todayDay !== 0) {
    totalPriceInCart.innerHTML = `${totalSaleItems} грн - "Щасливі Години"`;
  }
}

// Вибір активної вкладки в блоці Піца
$('.pizza__controls .buttons').click(function () {
  $(this).addClass('button-active').siblings().removeClass('button-active');

  let filter = $(this).attr('data-filter');
  if (filter == 'classico') {
    $('.pizza .classico').fadeIn(400);
    $('.pizza .card').not('.' + filter).fadeOut(200);
  } else {
    $('.pizza .card').not('.' + filter).fadeOut(200);
    $('.pizza .card').filter('.' + filter).fadeIn(400).css('display', 'flex');;
  }
});

// Вибір активної вкладки в блоці Кава
$('.coffee-beans__controls .buttons').click(function () {
  $(this).addClass('button-active').siblings().removeClass('button-active');

  let filter = $(this).attr('data-filter');
  if (filter == 'mix') {
    $('.coffee-beans .mix').fadeIn(400);
    $('.coffee-beans .card').not('.' + filter).fadeOut(200);
  } else {
    $('.coffee-beans .card').not('.' + filter).fadeOut(200);
    $('.coffee-beans .card').filter('.' + filter).fadeIn(400).css('display', 'flex');;
  }
});

// Fly img animation
function addFlyImgToCart(productButton, productId) {
  if (!productButton.classList.contains('_hold')) {
    productButton.classList.add('_hold');
    productButton.classList.add('_fly');

    const cart = document.querySelector('.actions__basket');
    const product = document.querySelector(`[data-pid="${productId}"]`);
    const productImage = product.querySelector('.card__img');

    const productImageFly = productImage.cloneNode(true);

    const productImageFlyWidth = productImage.offsetWidth;
    const productImageFlyHeight = productImage.offsetHeight;
    const productImageFlyTop = productImage.getBoundingClientRect().top;
    const productImageFlyLeft = productImage.getBoundingClientRect().left;

    productImageFly.setAttribute('class', '_flyImage _ibg');
    productImageFly.style.cssText =
      `
      left: ${productImageFlyLeft}px;
      top: ${productImageFlyTop}px;
      width: ${productImageFlyWidth}px;
      height: ${productImageFlyHeight}px;
    `;

    document.body.append(productImageFly);

    const cartFlyLeft = cart.getBoundingClientRect().left;
    const cartFlyTop = cart.getBoundingClientRect().top;

    productImageFly.style.cssText =
      `
      left: ${cartFlyLeft}px;
      top: ${cartFlyTop}px;
      width: 0px;
      height: 0px;
      opacity:0;
    `;

    productImageFly.addEventListener('transitionend', function () {
      if (productButton.classList.contains('_fly')) {
        productImageFly.remove();
        productButton.classList.remove('_fly');
      }
    });

    productButton.classList.remove('_hold');
  }
}

// Перевіряємо лист замовлення. Якщо немає товарів, то кнопка "Оформити замовлення" заблокована
function checkOrderList() {
  const orderListItems = document.querySelector('.col-2__list');
  const orderBtn = document.querySelector('.order__btn');
  if (orderListItems.children.length <= 0) {
    orderBtn.disabled = true;
    orderBtn.classList.add('_disabled');
  } else {
    orderBtn.disabled = false;
    orderBtn.classList.remove('_disabled');
  }
};

// Відображає попередній лист замовлення
const $basket = $('.basket');
$basket.click(function () {
  $('.basket__list').toggleClass('_active');
})

// burger 
const $burgerIcon = $('.header__burger');
$burgerIcon.click(function () {
  $(this).toggleClass('_active');
  $('body').toggleClass('_stop-scrolling');
})
$('.header__bottom a').click(() => {
  if ($burgerIcon.hasClass('_active')) {
    $burgerIcon.toggleClass('_active');
    $('body').toggleClass('_stop-scrolling');
  }
})

// При скролі на навігаційному меню зверху відображає активний блок
$(window).on('load scroll', function () {

  if ($(window).scrollTop() > 60) {
    $('header .header__bottom').addClass('header-active');
  } else {
    $('header .header__bottom').removeClass('header-active');
  }

  $('section').each(function () {

    let height = $(this).height();
    let offset = $(this).offset().top - 200;
    let top = $(window).scrollTop();
    let id = $(this).attr('id');

    if (top >= offset && top < offset + height) {
      $('.header__navbar ul li a').removeClass('active');
      $('.header__navbar').find(`[href="./${id}.html"]`).addClass('active');
    }
  });

  if ($(window).scrollTop() > 0) {
    $('#scroll-up').show();
  } else {
    $('#scroll-up').hide();
  }

});

//loader
// const loader = document.querySelector('.loader');
// window.addEventListener('load', () => {
//   loader.classList.add('_hide');
//   setTimeout(() => {
//     loader.remove();
//   }, 600)
// });

//scroll-up
$('.scroll-up').on('click', function () {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});

//timepicker

$('.time-block__timepicker').timepicker({
  'timeFormat': 'HH:mm',
  'minTime': '11:00',
  'maxTime': '18:00',
  'interval': 15,
});

//form Валідація кнопки замовлення та запис кількості піци у поле форми для замовлення
function orderPizzaNameAndUnits() {
  let pizzaNameAndUnits = '';

  cart.forEach(cart => {
    pizzaNameAndUnits += `${cart.name} ${cart.numberOfUnits}шт; `;
  });

  inputHiddenField.forEach(input => input.value = pizzaNameAndUnits);
}


function disableOrderBtn() {
  submitOrder.forEach(item => {
    if (cart.length === 0) {
      item.setAttribute('disabled', 'disabled');
      item.classList.add('_disabled');
    } else {
      item.removeAttribute('disabled');
      item.classList.remove('_disabled');
    }
  })
}

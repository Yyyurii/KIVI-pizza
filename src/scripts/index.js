const pizzaContainer = document.querySelector('.pizza__container');

// Render section 'Pizza' 
function renderPizza() {
  productsPizza.forEach(pizza => {
    pizzaContainer.innerHTML += `
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
        <button onclick="addToCart('${pizza.id}')" class="card__btn">До Кошика</button>
      </div>
    </div>
    `;
  })
};
renderPizza();

// Масив продуктів, що зна[одяться у кошику
const cart = [];

// Додати до кошика
function addToCart(id) {
  const findElem = productsPizza.find(item => item.id === id);
  cart.push({...findElem, numberOfUnits: 1});
  console.log(cart);
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

//Add fly img to cart
document.addEventListener("click", documentActions);

function documentActions(e) {
  const targetElement = e.target;

  if (targetElement.classList.contains('basket__btn')) {
    const order = document.querySelector('.order');
    const page = document.querySelector('.page');

    if (document.querySelector('.col-2__list').children.length > 0) {
      order.classList.add('_active');
      page.style.display = 'none';
    } else {
      const emptyBasketMessage = document.querySelector('.actions p');
      emptyBasketMessage.classList.add('_active');
      setTimeout(() => emptyBasketMessage.classList.remove('_active'), 3000);
    }
  }

  if (targetElement.closest('.header__navbar') || targetElement.closest('.logo')) {
    const order = document.querySelector('.order');
    const page = document.querySelector('.page');

    order.classList.remove('_active');
    page.style.display = 'block';
  }

  if (targetElement.classList.contains('card__btn')) {
    const productId = targetElement.closest('.pizza__card').dataset.pid;;
    addFlyImgToCart(targetElement, productId);
    e.preventDefault();
  }
}


//add to cart
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
  }
}

const cartProductContent = `
        <div class="basket__item-cont">
          <div data-cart-pid="" class="basket__item">
            <img class="basket__item-img" src="" alt="">
            <div class="basket__details">
              <input class="basket__titleAndQuantityInput" type="hidden" name="pizza_name[]" " value="">
              <span class="basket__title"></span>
              <div class="basket__cost">
                  
                  <div class="order__quantity">
                    <div class="order__minus-quantity quantity-img">
                    </div>
                    <span class="order__current-quantity basket__quantity">1</span>
                    <div class="order__plus-quantity quantity-img">
                    </div>
                  </div>
                  <div class="order__multiply">X</div>
                  <img class="basket__price-img" src="./img/icons/hryvnia-gray.svg" alt="hryvnia">
                  <span class="basket__price"></span>
                  <input type="hidden" name="" class="basket__price-current-input" value="" disabled>
              </div>
            </div>
            <div class="basket__delete-btn">
                <img class="basket__delete-img" src="./img/icons/close.svg" alt="delete">
            </div>
          </div>
          <hr>
        </div>
      `;



// Перевіряємо тип замовлення
document.querySelector('.col-1__order-type').addEventListener('click', (e) => {
  const toGoBlock = document.querySelector('.col-1__toGo-active');
  const toGoBtn = document.querySelector('.col-1__delivery-cont_toGo');
  const deliveryBlock = document.querySelector('.col-1__delivery-active');
  const deliveryBtn = document.querySelector('.col-1__delivery-cont_del');

  if (e.target.classList.contains('col-1__delivery-cont_toGo') || e.target.classList.contains('col-1__delivery-toGo-btn') || e.target.classList.contains('col-1__delivery-toGo')) {
    toGoBlock.classList.add('_active');
    toGoBtn.classList.add('_active');
    deliveryBlock.classList.remove('_active');
    deliveryBtn.classList.remove('_active');
  }

  if (e.target.classList.contains('col-1__delivery-cont_del') || e.target.classList.contains('col-1__delivery-del-btn') || e.target.classList.contains('col-1__delivery-del')) {
    deliveryBlock.classList.add('_active');
    deliveryBtn.classList.add('_active');
    toGoBlock.classList.remove('_active');
    toGoBtn.classList.remove('_active');
  }
});

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

// Відправка форми та валідація номеру телефону
jQuery(document).ready(function () {
  $("#phone").mask("+380 (99) 999-99-99");

  jQuery('.order__btn').click(function () {
    var form = $('form');

    if (form.valid()) {
      var actUrl = form.attr('action');

      jQuery.ajax({
        url: actUrl,
        type: 'post',
        dataType: 'html',
        success: function (data) {
          alert('Заявка відправлена');
        },
        error: function () {
          form.find('.status').html('серверная ошибка');
        }
      });
    }
  });

});

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
      $('.header__navbar').find(`[href="#${id}"]`).addClass('active');
    }
  });

  if ($(window).scrollTop() > 0) {
    $('#scroll-up').show();
  } else {
    $('#scroll-up').hide();
  }

});

//loader
const loader = document.querySelector('.loader');
window.addEventListener('load', () => {
  loader.classList.add('_hide');
  setTimeout(() => {
    loader.remove();
  }, 600)
});

//scroll-up
$('.scroll-up').on('click', function () {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});
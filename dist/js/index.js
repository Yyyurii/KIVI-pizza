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

//scroll-up
$('.scroll-up').on('click', function () {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});

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

//basket 
const $basket = $('.basket');
$basket.click(function () {
  $('.basket__list').toggleClass('_active');
})

//loader
const loader = document.querySelector('.loader');
window.addEventListener('load', () => {
  loader.classList.add('_hide');
  setTimeout(() => {
    loader.remove();
  }, 600)
});

//Add to cart
document.addEventListener("click", documentActions);

function documentActions(e) {
  const targetElement = e.target;

  // nav.addEventListener('click', (event) => {
  //   order.style.display = 'none';
  //   mainContent.style.display = 'block';
  // });
  if (targetElement.classList.contains('basket__btn')) {
    const order = document.querySelector('.order');
    const page = document.querySelector('.page');
    // const basketList = document.querySelector('.basket__list');

    if (document.querySelector('.col-2__list').children.length > 0) {
      order.classList.add('_active');
      page.style.display = 'none';
      // basketList.classList.remove('_active');
    } else {
      const emptyBasketMessage = document.querySelector('.actions p');
      emptyBasketMessage.classList.add('_active');
      setTimeout(() => emptyBasketMessage.classList.remove('_active'), 3000);
    }
  }

  if (targetElement.closest('.header__navbar') || targetElement.closest('.logo')) {
    console.log('header-bottom');
    const order = document.querySelector('.order');
    const page = document.querySelector('.page');

    order.classList.remove('_active');
    page.style.display = 'block';
  }

  if (targetElement.classList.contains('card__btn')) {
    const productId = targetElement.closest('.pizza__card').dataset.pid;;
    addToCart(targetElement, productId);
    e.preventDefault();
  }

  // if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
  //   if (document.querySelector('.cart-list').children.length > 0) {
  //     document.querySelector('.cart-header').classList.toggle('_active');
  //   }
  //   e.preventDefault();
  // } else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product__button')) {
  //   document.querySelector('.cart-header').classList.remove('_active');
  // }

  if (targetElement.classList.contains('basket__delete-btn') || targetElement.classList.contains('basket__delete-img')) {
    console.log('click delete');
    const productId = targetElement.closest('.basket__item').dataset.cartPid;
    updateCart(targetElement, productId, false);
    e.preventDefault();
  }

}

//add to cart
function addToCart(productButton, productId) {
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
        updateCart(productButton, productId);
        productButton.classList.remove('_fly');
      }
    });
  }
}

function updateCart(productButton, productId, productAdd = true) {
  const cart = document.querySelector('.actions');
  const cartIcon = cart.querySelector('.basket__icon');
  const cartQuantity = cart.querySelector('span');
  const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);

  // Добавляем
  if (productAdd) {
    cartQuantity.classList.add('_active');
    if (cartQuantity) {
      cartQuantity.innerHTML = ++cartQuantity.innerHTML;
    } else {
      cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
    }

    if (!cartProduct) {
      const orderList = document.querySelector('.col-2__list');
      const product = document.querySelector(`[data-pid="${productId}"]`);
      const cartProductImage = product.querySelector('.card__img');
      const cartProductTitle = product.querySelector('.card__title').innerHTML;
      const cartProductPrice = product.querySelector('.card__price').innerHTML;
      const cartProductContent = `
        <div class="basket__item-cont">
          <div data-cart-pid="${productId}" class="basket__item">
            <img class="basket__item-img" src="${cartProductImage.attributes.src.nodeValue}" alt="">
            <div class="basket__details">
              <input type="hidden" name="pizza_name[]" " value="${cartProductTitle}">
              <span class="basket__title">${cartProductTitle}</span>
              <div class="basket__cost">
                  <input type="hidden" name="pizza_quantity[]" " value="">
                  <div class="order__quantity">
                    <div class="order__minus-quantity quantity-img">
                    </div>
                    <span class="order__current-quantity basket__quantity">1</span>
                    <div class="order__plus-quantity quantity-img">
                    </div>
                  </div>
                  <div class="order__multiply">X</div>
                  <img class="basket__price-img" src="./img/icons/hryvnia-gray.svg" alt="hryvnia">
                  <span class="basket__price">${cartProductPrice}</span>
              </div>
            </div>
            <div class="basket__delete-btn">
                <img class="basket__delete-img" src="./img/icons/close.svg" alt="delete">
            </div>
          </div>
          <hr>
        </div>
      `;
      // cartList.insertAdjacentHTML('beforeend', `${cartProductContent}`);
      orderList.insertAdjacentHTML('beforeend', `${cartProductContent}`);
    } else {
      const cartProductQuantity = cartProduct.querySelector('.basket__quantity');
      cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
    }

    // После всех действий
    productButton.classList.remove('_hold');
  } else {
    const cartProductQuantity = cartProduct.querySelector('.basket__quantity');
    const cartQuantityValue = cartQuantity.innerHTML - cartProductQuantity.innerHTML;
    cartProduct.closest('.basket__item-cont').remove();

    if (cartQuantityValue) {
      cartQuantity.innerHTML = cartQuantityValue;
    } else {
      cartQuantity.innerHTML = '';
      cartQuantity.classList.remove('_active');
    }
  }
}

$('#timepicker').timepicker({
  timeFormat: 'HH:mm ',
  interval: 10,
  minTime: '09:20',
  maxTime: '21:00',
  defaultTime: '',
  startTime: '09:00',
  dynamic: false,
  dropdown: true,
  scrollbar: true,
  value: this.value
});

//Відправка форми
jQuery(document).ready(function () {
  $("#phone").mask("+380 (99) 999-99-99");

  jQuery('.order__btn').click(function () {
    var form = jQuery(this).closest('form');

    if (form.valid()) {
      var actUrl = form.attr('action');

      jQuery.ajax({
        url: actUrl,
        type: 'post',
        dataType: 'html',
        data: form.serialize(),
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


document.querySelector('.col-1__order-type').addEventListener('click', (e) => {
  document.querySelectorAll('.col-1__delivery-cont').forEach(item => {
    item.classList.remove('_active');
  });
  e.target.classList.add('_active');
  checkTypeDelivery(e);
});

function checkTypeDelivery(e) {
  const toGoBlock = document.querySelector('.col-1__toGo-active');
  const deliveryBlock = document.querySelector('.col-1__delivery-active');

  if (e.target.classList.contains('col-1__delivery-cont_toGo') || e.target.classList.contains('col-1__delivery-toGo-btn') || e.target.classList.contains('col-1__delivery-toGo')) {
    toGoBlock.classList.add('_active');
    deliveryBlock.classList.remove('_active');
  }

  if (e.target.classList.contains('col-1__delivery-cont_del') || e.target.classList.contains('col-1__delivery-del-btn') || e.target.classList.contains('col-1__delivery-del')) {
    deliveryBlock.classList.add('_active');
    toGoBlock.classList.remove('_active');
  }
}


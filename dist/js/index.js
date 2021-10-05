$('.pizza__controls .buttons').click(function () {
  $(this).addClass('button-active').siblings().removeClass('button-active');

  let filter = $(this).attr('data-filter');
  if (filter == 'classico') {
    $('.pizza .classico').show(1000);
    $('.pizza .card').not('.' + filter).hide(200);
  } else {
    $('.pizza .card').not('.' + filter).hide(200);
    $('.pizza .card').filter('.' + filter).show(1000).css('display', 'flex');;
  }
});

$('.coffee-beans__controls .buttons').click(function () {
  $(this).addClass('button-active').siblings().removeClass('button-active');

  let filter = $(this).attr('data-filter');
  if (filter == 'mix') {
    $('.coffee-beans .mix').show(400);
    $('.coffee-beans .card').not('.' + filter).hide(200);
  } else {
    $('.coffee-beans .card').not('.' + filter).hide(200);
    $('.coffee-beans .card').filter('.' + filter).show(400).css('display', 'flex');;
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

//scroll-top
$('.scroll-up').on('click', function () {
  window.scrollTo(0, 0);
});

// burger 
$('.header__burger').click(function() {
  $(this).toggleClass('_active'); 
})
$('.pizza__controls .buttons').click(function () {
  $(this).addClass('button-active').siblings().removeClass('button-active');

  let filter = $(this).attr('data-filter');
  if (filter == 'classico') {
    $('.pizza .classico').show(400);
    $('.pizza .card').not('.' + filter).hide(200);
  } else {
    $('.pizza .card').not('.' + filter).hide(200);
    $('.pizza .card').filter('.' + filter).show(400).css('display', 'flex');;
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

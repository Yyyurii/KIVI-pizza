$('.pizza__controls .buttons').click(function () {
  console.log('click');
  $(this).addClass('button-active').siblings().removeClass('button-active');

  let filter = $(this).attr('data-filter');
  if (filter == 'classico') {
    $('.pizza .classico').show(400);
  } else {
    $('.pizza .card').not('.' + filter).hide(200);
    $('.pizza .card').filter('.' + filter).show(400);
  }

});
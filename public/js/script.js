$(function() {
  //JQuery goes here.
  
});

$(document).scroll(function () {
  var y = $(this).scrollTop();
  if (y > 100) {
    $('.header').fadeOut('slow');
  } else {
    $('.header').fadeIn('slow');
  }
});


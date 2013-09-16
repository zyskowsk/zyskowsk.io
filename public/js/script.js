$(function() {
  $('#snake-container').hide();
  $('#bored').on('click', function() {
    $('#snake-container').fadeIn('slow');
  });
});
$(function () {
  var canvas = $("#canvas");
  var game = new Asteroids.Game(800, 400, canvas.get(0));
  $('body').keypress(function(event) {
    if (event.keyCode == 115) {
      $('.asteroids-container h1').hide();
      game.start();
    } else if (event.keyCode == 114) {
      var new_game = new Asteroids.Game(800, 400, canvas.get(0));
      new_game.start();
    } else {
      console.log(event.keyCode);
    }
  });
});
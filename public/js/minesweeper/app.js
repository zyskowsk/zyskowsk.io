$(function () {
 
  function startGame(size) {
    $('#message').hide();
    $('#message').empty();

    board = new Minesweeper.Board(size),
    ui = new Minesweeper.UI(board);

    ui.clearBoard();
    ui.render();
  }

  startGame(8);

  $('#board').on("click", function (event) {
    if (event.shiftKey) {
      ui.addFlag(event);
    } else {
      ui.clickTile(event);
    } 
    
    if (board.swept()) {
      ui.clearBoard();
      board.revealAll();
      $('#message').append("you won!");
      ui.render();
      $('#message').fadeIn('slow');
    }
  });

  $('#small').on("click", function () {
    $('#board').css('width', 160);
    $('#board').css('height', 160);
    startGame(8);
  });

  $('#medium').on("click", function () {
    $('#message').fadeOut('slow'); 
    $('#board').css('width', 320);
    $('#board').css('height', 320);
    startGame(16);
  });

  $('#large').on("click", function () {
    $('#message').fadeOut('slow');
    $('#board').css('width', 480);
    $('#board').css('height', 480);
    startGame(24);
  });

  $('#peek').on("click", function () {
    ui.clearBoard();

    board.eachTile(function (tile) {
      tile.togglePeek();
    });

    ui.render();
  });

});
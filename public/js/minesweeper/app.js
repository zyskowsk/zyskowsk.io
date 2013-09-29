$(function () {

  function setSize(size) {
    $('#board').css('width', size);
    $('#board').css('height', size);
  }

  function startGame(size) {
    $('#message').hide();
    $('#message').empty();

    board = new Minesweeper.Board(size),
    ui = new Minesweeper.UI(board);

    ui.clearBoard();
    ui.render();
  }

  $('#board').on("click", function (event) {
    ui.click(event);
  });

  $('#peek').hover(
    function () {
      ui.togglePeek();
    }, function () {
      ui.togglePeek();
    });

  $('#small').on("click", function () {
    setSize(160)
    startGame(8);
  });

  $('#medium').on("click", function () { 
    setSize(320);
    startGame(16);
  });

  $('#large').on("click", function () {
    setSize(480);
    startGame(24);
  });
});
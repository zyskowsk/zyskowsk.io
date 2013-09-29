(function (root) {

  Minesweeper = root.Minsweeper = (root.Minsweeper || {});

  var UI = Minsweeper.UI = function (board) {
    this.board = board;
    this.size = this.board.size;
  }

  UI.numbers = {
    1 : "one",
    2 : "two",
    3 : "three",
    4 : "four",
    5 : "five",
    6 : "six",
    7 : "seven",
    8 : "eight"
  }

  UI.prototype.render = function () {
    var size = this.size;

    this.board.eachTile(function (tile) {
      if (tile.flag && !tile.peek) {
        $('#board').append("<div class='square flag' id=" + tile.pos + "><span>&#9873;</span><div>");
      } else if (tile.hidden && !tile.peek) {
        $('#board').append("<div class='square hidden' id=" + tile.pos + "><div>");
      } else if (tile.hidden && tile.peek && tile.bomb) {
        $('#board').append("<div class='square peek bomb' id=" + tile.pos + "><span class='bombChar'>&#9883;</span><div>");
      } else if (tile.hidden && tile.peek && tile.bombCount == 0) {
        $('#board').append("<div class='square hidden' id=" + tile.pos + "><div>");
      } else if (tile.hidden && tile.peek && tile.bombCount > 0) {
        $('#board').append("<div class='square hidden' id=" + tile.pos + "><div>");
      } else if ((!tile.hidden) && tile.bomb) {
        $('#board').append("<div class='square bomb' id=" + tile.pos + "><span class='bombChar'>&#9883;</span><div>");
      } else if ((!tile.hidden) && tile.bombCount == 0) {
        $('#board').append("<div class='square empty' id=" + tile.pos + "><div>");
      } else if ((!tile.hidden) && tile.bombCount > 0) {
        $('#board').append("<div class='square number " + UI.numbers[tile.bombCount] + "' id=" + tile.pos + "><span>" + tile.bombCount +"</span><div>");
      }
    });
  }

  UI.prototype.restart = function () {
    this.clearBoard();

  }

  UI.prototype.clickTile = function (event) {
    var pos = this._getPosFromEvent(event);

    this.clearBoard();
    this.board.clickTile(pos);
    this.render();

    debugger
    if (this.board.lost) {
      $('#message').append("you lost!");
      $('#message').fadeIn('slow');
    }
  }

  UI.prototype.clearBoard = function () {
    $('#board').empty();
  }

  UI.prototype.addFlag = function (event) {
    var pos = this._getPosFromEvent(event);
        tile = this.board.getTile(pos);

    this.clearBoard();
    tile.toggleFlag();
    this.render();
  }

  UI.prototype._getPosFromEvent = function (event) {
    return $(event.target).attr('id').split(",").map(function (int) { 
      return parseInt(int); 
    });
  }

})(this);
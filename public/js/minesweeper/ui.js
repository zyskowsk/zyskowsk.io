(function (root) {

  Minesweeper = root.Minsweeper = (root.Minsweeper || {});

  var UI = Minsweeper.UI = function (board) {
    this.board = board;
    this.size = this.board.size;
  }

  UI.NUMBERS = {
    1 : "one",
    2 : "two",
    3 : "three",
    4 : "four",
    5 : "five",
    6 : "six",
    7 : "seven",
    8 : "eight"
  }

  UI.prototype.click = function (event) {
     if (event.shiftKey) {
      this._addFlag(event);
    } else {
      this._clickTile(event);
    } 
  }

  UI.prototype.clearBoard = function () {
    $('#board').empty();
  }

  UI.prototype.togglePeek = function () {
    this.clearBoard();

    this.board.eachTile(function (tile) {
      tile.togglePeek();
    });

    this.render();  
  }

  UI.prototype.render = function () {
    var size = this.size;

    this.board.eachTile(function (tile) {
      if (tile.flag && !tile.peek) {
        $('#board').append([
          "<div class='square flag' id=" + tile.pos + ">",
            "<span>&#9873;</span>",
          "</div>"
          ].join(''));
      } else if (tile.hidden && tile.peek && tile.bomb) {
        $('#board').append([
          "<div class='square peek bomb' id=" + tile.pos + ">",
            "<span class='bombChar'>&#9883;</span>",
          "</div>"
          ].join(''));
      } else if (tile.hidden && (
            !tile.peek || 
            (tile.peek && tile.bombCount == 0) || 
            (tile.peek && tile.bombCount > 0
          ))){
        $('#board').append([
          "<div class='square hidden' id=" + tile.pos + ">",
          "</div>"
          ].join(''));
      } else if ((!tile.hidden) && tile.bomb) {
        $('#board').append([
          "<div class='square bomb' id=" + tile.pos + ">",
            "<span class='bombChar'>&#9883;</span>",
          "<div>"
          ].join(''));
      } else if ((!tile.hidden) && tile.bombCount == 0) {
        $('#board').append([
          "<div class='square empty' id=" + tile.pos + ">",
          "<div>"
          ].join(''));
      } else if ((!tile.hidden) && tile.bombCount > 0) {
        var id = UI.NUMBERS[tile.bombCount];
        $('#board').append([
          "<div class='square number " + id + "' id=" + tile.pos + ">",
            "<span>" + tile.bombCount +"</span>",
          "<div>"
          ].join(''));
      }
    });
  }

  UI.prototype._addFlag = function (event) {
    var pos = this._getPosFromEvent(event);
        tile = this.board.getTile(pos);

    this.clearBoard();
    tile.toggleFlag();
    this.render();
  }

  UI.prototype._clickTile = function (event) {
    var pos = this._getPosFromEvent(event);

    if (this.board.getTile(pos).flag) {
      return;
    }

    this.clearBoard();
    this.board.clickTile(pos);
    this.render();

    if (this.board.lost) {
      $('#message').append("Bummer!");
      $('#message').fadeIn('slow');
    }

    if (this.board.swept()) {
      this.board.revealAll();
      $('#message').append("Excellence!");
      $('#message').fadeIn('slow');
    }
  }

  UI.prototype._getPosFromEvent = function (event) {
    if (event.target.nodeName === 'DIV') {
      var element = event.target;
    } else {
      var element = event.target.parentElement;
    }

    return $(element).attr('id').split(",").map(function (int) { 
      return parseInt(int); 
    });
  }

})(this);
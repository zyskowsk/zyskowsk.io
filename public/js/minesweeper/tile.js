(function (root) {

  var Minesweeper = root.Minesweeper = (root.Minesweeper || {});

  var Tile = Minesweeper.Tile = function (pos, board) {
    this.pos = pos;
    this.board = board;
    this.neighborPositions = this.neighborPositions();
    this.flag = false;
    this.bomb = false;
    this.hidden = true;
    this.peek = false;
    this.bombCount = 0;
  }

  Tile.Compass = [
    [1,-1],
    [1,0],
    [1,1],
    [-1,-1],
    [-1,0],
    [-1,1],
    [0,-1],
    [0,1]
  ];

  Tile.prototype.neighborPositions = function () {
    var neighborPositions = []

    for(var i = 0; i < 8; i++) {
      var dir = Tile.Compass[i],
          newX = this.pos[0] + dir[0], 
          newY = this.pos[1] + dir[1],
          isOnBoard = ( 0 <= newX && newX < this.board.size &&
                          0 <= newY && newY < this.board.size );

      if (isOnBoard) {
        neighborPositions.push([newX, newY]);
      }
    }

    return neighborPositions;
  }

  Tile.prototype.reveal = function () {
    this.flag = false;
    this.hidden = false;
  }

  Tile.prototype.toggleBomb = function () {
    this.bomb = !this.bomb;
  }

  Tile.prototype.toggleHidden = function () {
    this.hidden = !this.hidden;
  }

  Tile.prototype.toggleFlag = function () {
    if (this.hidden) {
      this.flag = !this.flag;
    }
  }

  Tile.prototype.togglePeek = function () {
    this.peek = !this.peek;
  }
  
})(this);
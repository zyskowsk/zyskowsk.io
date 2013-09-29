(function (root) {

  var Minesweeper = root.Minesweeper = (root.Minesweeper || {});
 

  var Board = Minesweeper.Board = function (size) {
    this.size = size;
    this.board = this.buildBoard();
    this.lost = false;
    this.populateBoard();
    this.addBombs();
    this.setCount();
  };

  Board.prototype.addBombs = function () {
    var that = this;
    var bombPositions = this._bombPositions();

    Minesweeper.Utilities.each(bombPositions, function (pos) {
      that.getTile(pos).toggleBomb();
    });
  }

  Board.prototype.clickTile = function (pos) {
    var tile = this.getTile(pos);

    if (tile.bomb) {
      this.revealAll();
      this.lost = true;
    } else {
      this._revealNeighbors(pos);
    }
  }

  Board.prototype.eachTile = function (callback) {
    var size = this.size;
    for(var i = 0; i < size; i++) {
      for(var j = 0; j < size; j++) {
        var tile = this.getTile([i,j]);
        callback(tile);
      }
    }
  }

  Board.prototype.revealAll = function () {
    this.eachTile(function (tile) {
      tile.reveal();
    });
  }

  Board.prototype.setCount = function () {
    var that = this;

    this.eachTile(function (tile) {
      var count = 0;
      that._neighborTiles(tile.pos).forEach(function (neighbor) {
        if (neighbor.bomb) {
          count++;
        }
      });

      tile.bombCount = count;
    });
  }

  Board.prototype.swept  = function () {
    var numBombs = this._numBombs(),
        hiddenCount = 0;

    this.eachTile(function (tile) {
      if (tile.hidden) {
        hiddenCount++;
      }
    });

    return numBombs === hiddenCount;
  }

  Board.prototype.buildBoard = function () {
    var board = [];
    for(var i = 0, size = this.size; i < size; i++) {
      board.push(Array(size));
    }

    return board;
  }

  Board.prototype.getTile = function (pos) {
    return this.board[pos[0]][pos[1]];
  } 

  Board.prototype.populateBoard = function () {
    var size = this.size;
    for(var i = 0; i < size; i++) {
      for(var j = 0; j < size; j++) {
        this.board[i][j] = new Minesweeper.Tile([i,j], this);
      }
    }
  }

  Board.prototype._bombPositions = function (){
    var size = this.size,
        bombPositions = [];

    for(var i = 0, numBombs = this._numBombs(); i < numBombs; i++){
      var randomPos = this._randomPos();

      while (Minesweeper.Utilities.includesArray(bombPositions, randomPos)){
        randomPos = this._randomPos();
      }

      bombPositions.push(randomPos);
    }

    return bombPositions;
  }


  Board.prototype._neighborTiles = function (pos) {
    var that = this,
        neighborPositions = this.getTile(pos).neighborPositions;

    return neighborPositions.map(function (pos) {
      return that.getTile(pos);
    });
  }

  Board.prototype._numBombs = function () {
    return Math.floor((15/4 * this.size) - 20);
  }

  Board.prototype._randomPos = function () {
    var i = Math.floor(Math.random() * this.size),
        j = Math.floor(Math.random() * this.size);

    return [i,j];
  }

  Board.prototype._revealNeighbors = function (pos) {
    var that = this, 
        tile = this.getTile(pos);

    if (tile.bombCount > 0 || !tile.hidden) {
      tile.reveal();
      return 
    } else {
      tile.reveal();
      tile.neighborPositions.forEach(function (pos) {
        that._revealNeighbors(pos);
      });
    }
  }

})(this);
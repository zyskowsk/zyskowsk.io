(function (root) {
  var Minesweeper = root.Minesweeper = (root.Minesweeper || {});

  var Utilities = Minesweeper.Utilities = {};

  Utilities.each = function (array, callback) {
    var len = array.length;

    for(var i = 0; i < len; i++){
      callback(array[i]);
    }

    return array;
  }

  Utilities.includesArray = function(array, subArray) {
    var arrayLength = array.length; 

    for(var i = 0; i < arrayLength; i++){
      if (Utilities.areArraysEqual(subArray, array[i])) {
        return true;
      }
    }

    return false;
  }

  Utilities.areArraysEqual = function(array1, array2) {
    if (array1.length !== array2.length){
      return false;
    }

    var areEqual = true;

    for(var i = 0, len = array1.length; i < len; i++){
      if (array1[i] !== array2[i]) {
        areEqual = false;
      }
    }

    return areEqual;
  }
})(this);
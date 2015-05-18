var turn = 0;
var winningCombos = [[[0,0],[1,0],[2,0]], [[0,1],[1,1],[2,1]], [[0,2],[1,2],[2,2]], [[0,0],[1,1],[2,2]], [[0,0],[0,1],[0,2]], [[2,0],[2,1],[2,2]], [[1,0],[1,1],[1,2]], [[2,0],[1,1],[0,2]]]
var checkCells = function(ary) {
  for(var i = 0; i < ary.length; i++) {
    var winningCombo = ary[i];
    var x = winningCombo[0];
    var y = winningCombo[1];
    var selector = $('[data-x="' + x + '"][data-y="' + y + '"]')
    if( noCellMatch(selector)) {
      return false;
    }
  }
  return true;
}
var checkWinner = function() {
  for(var i = 0; i < winningCombos.length; i++) {
    if(checkCells(winningCombos[i]) == true) {
      message("Player " + player() + " Won!");
      return true;
    }
  }
  return false;
}

var tie = function() {
  var thereIsATie = true;
  $("td").each(function() {
    if ($(this).html().length <= 0) {
      thereIsATie = false;
    }
  });
  if (thereIsATie) message("Tie game");
  return thereIsATie;
}

var player = function() {
  if(turn % 2 == 0) {
    return "X";
  }
  else {
    return "O";
  }
};
var noCellMatch = function(element) {
  return (element.html() != player())
}
var clearBoard = function() {
  $("td").html("");
}
var resetGame = function() {
  clearBoard();
  var turn = 0;
}
var doTurn = function(event){
  updateState(event);
  if( checkWinner() || tie() ) {
    saveGameState();
    resetGame();
  } else {
    turn += 1;
  }
}
var saveGameState = function() {
  $("#lastGameBox").empty();
  $("td").each(function(element) {
    $('#lastGameBox').append($('<div>', {class: 'lastGame', "data-x": $(this).data("x"), "data-y": $(this).data("y"), style: "display: none;", text:getValue($(this)) }));
  })
}
var getValue = function(element) {
  return element.text() ? element.text() : "-"
}
var message = function(message) {
  $("#message").html(message);
}
var updateState = function(event) {
  $(event.target).html(player());
}
var attachListeners = function() {
  $("tbody").click(function(event) {
    doTurn(event)
  })
  $("#lastGame").click(function() {
    showLastGame();
  })
}
var lastGameString = function() {
  return firstRow() + secondRow() + thirdRow()
}

var showLastGame = function() {
  $("#lastGameBox").html(lastGameString());
}
var firstRow = function() {
  return getValues().slice(0,3).join("") + "<br>";
}
var secondRow = function() {
  return getValues().slice(3,6).join("") + "<br>";
}
var thirdRow = function() {
  return getValues().slice(6,9).join("");
}
var getValues = function() {
  var values = [];
  $(".lastGame").each(function() {
    values.push($(this).text())
  })
  return values;
};
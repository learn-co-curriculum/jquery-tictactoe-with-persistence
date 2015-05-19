var turn = 0;
var winningCombos = [[[0,0],[1,0],[2,0]], [[0,1],[1,1],[2,1]], [[0,2],[1,2],[2,2]], [[0,0],[1,1],[2,2]], [[0,0],[0,1],[0,2]], [[2,0],[2,1],[2,2]], [[1,0],[1,1],[1,2]], [[2,0],[1,1],[0,2]]];
var lastGameArray = [];
var lastGameString = null;

var checkWinner = function() {
  for(var i = 0; i < winningCombos.length; i++){
    if (checkCells(winningCombos[i]) == true){
      return true;
    } else if (tie() == true){
      return "tie";
    }
  }
  return false;
}

var checkCells = function(arr){
  for (var i = 0; i < arr.length; i++){
    var x = arr[i][0];
    var y = arr[i][1];
    if ($("td[data-x='" + x +"'][data-y='" + y +"']").html() != player()) {
      return false;
    }
  }
  return true;
}

var tie = function() {
  if (turn == 8) { return true };
}

var player = function() {
  if (turn % 2 == 0) {
    return "X";
  } else {
    return "O";
  }
}

var clearBoard = function() {
  lastGameArray = [];
  turn = 0;
  $('td').each(function() {
    $(this).html("");
  });
}

var doTurn = function(event) {
  updateState(event);
  if (checkWinner() == true) {
    message("Player " + player() + " Won!");
    saveGame(); 
    clearBoard();
  } else if (checkWinner() == "tie"){
    message("Tie game");
    saveGame(); 
    clearBoard();
  } else {
    turn += 1;
  }
}

var message = function(winner_message) {
  $('#message').text(winner_message);
}

var updateState = function(event) {
  $(event.target).html(player());
}

var attachListeners = function() {
  $("tbody").click(function(event) {
    doTurn(event);
  });

  $("#lastGame").click(function() {
    $('#lastGameBox').html(lastGameString);
  });
}

var saveGame = function() {
  $("td").each(function() {
    var html = $(this).html();
    if (html == "") {
      lastGameArray.push("-");
    } else {
      lastGameArray.push(html);
    }
  });
  lastGameArray.splice(3, 0, "<br>");
  lastGameArray.splice(7, 0, "<br>");
  lastGameString = lastGameArray.join("");
}

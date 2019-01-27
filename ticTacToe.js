//Author: Amit Prashar

//Object of game variables
var Game ={
    gameBoard: new Array(9),
    player: "X",
    computer: "O",
    none: "~",
    cells: document.querySelectorAll(".cell"),
    compCount: 0
}

//Function call to start game:
initializeGame();

//Operational functions
function initializeGame(){
     for(var i=0; i<Game.cells.length; i++){
        Game.gameBoard[i] = Game.none;
        Game.cells[i].innerText = Game.none;
        Game.cells[i].addEventListener('click', playGame);  
    }
}

function playGame(box){
    turn(box.target.id, Game.player);
    if(!isDraw()){
        var move = computerMove(Game.gameBoard, Game.compCount);
        turn(move, Game.computer);
        Game.compCount++
    }
    else{
        winner("Its A Draw!");
    }
}


function turn(box, marker){
    Game.gameBoard[box] = marker;
    Game.cells[box].innerText = marker;
    if(isWin(Game.gameBoard, marker)){
        winner(marker);
    }
}

function winner(who) {
    if(who == Game.computer){
        who = "Computer Wins!";
    }
    else if(who == Game.player){
        who = "You Win!";
    }
    document.querySelector(".popup").style.display = "block";
    document.querySelector(".popup #who").innerText = who;
}


//Query of gamestate
function isWin(checkBoard, marker){
    var winList = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ];
    
    return winList.some(function(threeInARow){
        return threeInARow.every(function(box){
            return checkBoard[box] === marker;
        });
    });

}

function isEmpty(){
    var availableMoves = []
    for(var search=0; search<Game.cells.length; search++){
        if(Game.gameBoard[search] == Game.none){
            availableMoves.push(search);
        }
    }
    return availableMoves;
}

function isDraw(){
    var isDraw = false;
    if(isEmpty().length == 0){
        isDraw = true;
    }
    return isDraw;
}


//computer strategy 
function computerMove(board, count){
    var availSpots = isEmpty();
    
    if(count == 0){
        if(board[4] =="~"){
            return 4;
        }
        else if(board[0] =="~"){
            return 0;
        }
    }

    var win = goForWin(board, availSpots);

    if(win >= 0){
        return win;        
    }

    var block = goForBlock(board, availSpots);

    if(block >= 0){
        return block;
    }
    else{
        return strategy(board, availSpots);
    }
}


function goForWin(board, availSpots){
    for(var search=0; search < availSpots.length; search++){
        var move = availSpots[search];
        board[move] = Game.computer;
        if(isWin(board, Game.computer)){
            return move;
        }
        else{
            board[move] = Game.none;
        }
    }
    return -1;
}

function goForBlock(board, availSpots){
    for(var search=0; search < availSpots.length; search++){
        var move = availSpots[search];
        board[move] = Game.player;
        if(isWin(board, Game.player)){
            board[move] = Game.computer;
            return move;
        }
        else{
            board[move] = Game.none;
        }
    }    
    return -1;
}

function strategy(board, availSpots){
    if(board[0]=="X" && board[8]=='X'){
        return 7;
    }
    else if( board[2]=="X" && board[6]=='X' ){
        return 1;
    }
    else{
        return availSpots[0];
    }
}
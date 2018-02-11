

class Game {
  constructor() {
    this.turn = 0;
    this.gameState = true;
    this.winner = 0;
    this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  }
}

class Player {
  constructor(name, symbol) {
    this.name = name;
    this.symbol = symbol;
    this.starts = undefined;
  }
}



let game = new Game();
let human = new Player('human', 'clear');
let jarvis = new Player('jarvis', 'panorama_fish_eye');

function startGame(player) {

  if (game.turn !== 0) {
      return;
  }

  let selectPlayer = document.getElementById('player' + player);
  selectPlayer.classList.add("active");

  if (player == 1) {
    game.turn = 1;
    human.starts = 1;
    jarvis.starts = 2;
  } else {
    game.turn = 2;
    jarvis.starts = 1;
    human.starts = 2;
    jarvisPlay();
  }

}

function clicked(x, y) {

  if (game.board[x][y] == 0 && game.turn != 0) {
     //winingCondition();
     humanPlay(x,y);
     jarvisPlay();
  }

}

function placeMove(position) {

  let node = document.createElement("i");
  let symbol;

  if (game.turn == 1) {
    if (human.starts == 1) symbol = human.symbol;
    else symbol = jarvis.symbol;
  } else {
    if (human.starts == 2) symbol = human.symbol;
    else symbol = jarvis.symbol;
  }

  let textnode = document.createTextNode(symbol);

  node.appendChild(textnode);
  node.classList.add("material-icons");

  document.getElementById(position).appendChild(node);
}

function toogleTurn() {
  let selectPlayer;

  selectPlayer = document.getElementById('player' + game.turn);
  selectPlayer.classList.remove("active");

  game.turn = game.turn % 2 + 1;

  selectPlayer = document.getElementById('player' + game.turn);
  selectPlayer.classList.add("active");

}


//TO DO: check wining condition
/*
function winingCondition(){
        let  i;
        let pre = game.board[0][0];
        let f =1;
        for( i = 0 ; i<2;i++){
            if(pre != game.board[0][i] ){
                f = 0;
                break;
            }
        } 
        if(f == 1) game.state = false;

        for( i = 0 ; i<2;i++){
          if(pre != game.board[i][0] ){
              f = 0;
              break;
          }
        } 
        if(f == 1) game.state = false;

        for( i = 0 ; i<2;i++){
          if(pre != game.board[i][i] ){
              f = 0;
              break;
          }
        } 
        if(f == 1) game.state = false;
    }
}
*/

function humanPlay(x, y){
  game.board[x][y] = game.turn;
  let position = "i" + x + y;
  placeMove(position);
  toogleTurn();
  // TODO: if jarvis turn do some magic to make a move
}

function jarvisPlay() {
  // make a move from empty cells
  let move, x, y, position;
  move = getRandomEmptyMove();
  x = move[0];
  y = move[1];
  game.board[x][y] = game.turn;
  position = "i" + x + y;
  placeMove(position);
  toogleTurn();
}

function getRandomEmptyMove(){
  let emptyCells = [];
  for(i = 0; i < 3; i++){
    for(j = 0 ;j < 3; j++){
        if(game.board[i][j] == 0){
          emptyCells.push([i,j]);
        }
    }
  }
  //console.log(emptyCells[1]);
  let randomMove =  Math.floor(Math.random()*emptyCells.length);
  return emptyCells[randomMove];
}
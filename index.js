

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
    
     humanPlay(x,y);
     //gameEnd();
     let turn =  game.turn;
     game.turn = 0;
     jarvisThink();
     setTimeout(function(){jarvisPlay(turn)}, 6000);
     gameEnd();
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



function humanPlay(x, y){
  game.board[x][y] = game.turn;
  let position = "i" + x + y;
  placeMove(position);
  toogleTurn();
  // TODO: if jarvis turn do some magic to make a move
}

function jarvisPlay(turn) {
  // make a move from empty cells
  game.turn = turn;
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

  // replace above code with AI algorithm
  return findBestMove();
}


function gameEnd(){
  let card = document.getElementById("judgement");
  card.style.visibility="visible";
}





function jarvisThink(){
  console.log("hi");
  // let text = document.getElementById('player2');
  // text.style.transform="rotateX(180deg)";
  // text.style.transition="linear 5s";
  // text.classList.add("player2-active");
  // setTimeout( function(){text.classList.remove("j-text-active");}, 4000);
}

function findBestMove(){
  let  i, j, maxValue,a=[[0,0,0][0,0,0][0,0,0]];
  for(i=0;i<3;i++){
    for(j=0;j<3;j++){
       a[i][j] = game.board[i][j];
    }
  }
  for(i=0;i<3;i++){
    for(j=0;j<3;j++){
      if(a[i][j] == 0){
        maxValue = max(maxValue , minMax(i,j));
      }
    }
  }
}

function minMax(a, x, y){
  if(jarvisWins(a) === true){
    return true;
  }
  if(humanWins(a) === true){
    return true;
  }
  if(gameDraw(a) === true ){
    return 0;
  }

  for(i=0;i<3;i++){
    for(j=0;j<3;j++){
      if(a[i][j] == 0){
        maxValue = max(maxValue , minMax(a, i, j));
      }
    }
  }

}

function gameDraw(a){
  let  i, j, count = 0;
  for(i=0;i<3;i++){
    for(j=0;j<3;j++){
     if(a[i][j] == 0){
       count++;
     }
    }
  }
  return count == 0 ? true : false;
}

function humanWins(a){
  let i;
   for(i=0;i<3;i++){
    if(check(a, 1, i, 0, i, 1) === true) return true;
    if(check(a, 1, 0, i, 1, i) === true) return true;
    
   }
   if(check(a, 1, 0, 0, 1, 1) === true) return true;
   if(check(a, 1, 0, 2, 1, -1) === true) return true;
   return false;
}

function jarvisWins(a){
  let i
  for(i=0;i<3;i++){
    if(check(a, 2, i, 0, 0, 1) === true) return true;
    if(check(a, 2, 0, i, 1, 0) === true) return true;
   }
   if(check(a, 2, 0, 0, 1, 1) === true) return true;
   if(check(a, 2, 0, 2, 1, -1) === true) return true;
   return false;
}

function check(a, id, x, y, r, c){
  let  i;
   for(i=0;i<3;i++){
      if( a[x][y] !== id) return false;
      x = x + r;
      y = y + c;
   }
   return true;
}
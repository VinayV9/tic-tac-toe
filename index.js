

class Game{
    constructor(){
        this.turn = 0;
        this.gameState = true;
        this.winner = 0;
        this.board = [[0,0,0],[0,0,0],[0,0,0]];
    }
}
  
  class Player{
    constructor(name, symbol){
      this.name = name;
      this.symbol = symbol;
      this.starts = undefined;
    }
  }
  
  let game = new Game();
  let human = new Player('human', 'clear');
  let jarvis = new Player('jarvis', 'panorama_fish_eye');
  
  function startGame(player){
      let selectPlayer = document.getElementById('player');
      selectPlayer.classList.add("active");
      if(game.turn !== 0){
        return;
      } 
      console.log(player);
      game.turn = 1;

      if(player == 1){
        human.starts = 1;
        jarvis.starts = 2;
     }else{
        jarvis.starts = 1;
        human.starts = 2;
     }
     
  }
  
  function clicked(x, y){
    
    //console.log(x,y);
    //console.log(game);
    if(game.board[x][y] == 0){
       console.log(game.board[x][y], game.turn);
       game.board[x][y] = parseInt(game.turn);
       let position = "i"+x+y;
       placeMove(position);
       toogleTurn();
    }
     
  }
  
  function placeMove(position){
      
      let node = document.createElement("i"); 
      let symbol;
      
      if(game.turn == 1){
         if(human.starts == 1) symbol = human.symbol;
         else symbol = jarvis.symbol;
      }else{
        if(human.starts == 2) symbol = human.symbol;
         else symbol = jarvis.symbol;
      }
      
      let textnode = document.createTextNode(symbol); 
      
      node.appendChild(textnode); 
      node.classList.add("material-icons");
      
      document.getElementById(position).appendChild(node); 
  }
  
  function toogleTurn(){
    game.turn = game.turn%2 + 1;

  }
  
  
  
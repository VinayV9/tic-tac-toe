

class Game{
    turn = 0;
    gameState = true;
    winner = 0;
    board = [[0,0,0],[0,0,0],[0,0,0]];
}
  
  class Player{
    constructor(name, symbol){
      this.name = name;
      this.symbol = turn;
    }
    starts = undefined;
  }
  
  let game = new Game();
  let human = new Player('human', 'clear');
  let jarvis = new Player('jarvis', 'panorama_fish_eye');
  
  function startGame(player){
      if(game.turn !== 0){
        return;
      } 
      game.turn =1;
      console.log(player);
      if(player === 'human'){
        human.starts = 1;
        jarvis.starts = 2;
     }else{
        jarvis.starts = 1;
        human.starts = 2;
     }
     
  }
  
  function clicked(x, y){
    
    console.log(x,y);
    if(game.board[x][y] === 0){
      
       game.board[x][y] = game.turn;
       toogleTurn();
       
       let position = "i"+x+y;
       console.log(place);
      
       placeMove(position);
      
    }
     
  }
  
  function placeMove(position){
      let node = document.createElement("i"); 
      let symbol;
      
      if(game.turn == 1){
         if(humans.starts == 1) symbol = human.starts;
         else symbol = jarvis.starts;
      }else{
        if(humans.starts == 2) symbol = human.starts;
         else symbol = jarvis.starts;
      }
      
      let textnode = document.createTextNode(symbol); 
      
      node.appendChild(textnode); 
      node.classList.add("material-icons");
      
      document.getElementById(position).appendChild(node); 
  }
  
  function toogleTurn(){
    game.turn = game.trun%2+1;
  }
  
  
  
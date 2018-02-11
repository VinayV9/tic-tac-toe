

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
      
      if(game.turn !== 0){
        return;
      } 

      let selectPlayer = document.getElementById('player'+player);
      selectPlayer.classList.add("active");
    
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
    if(game.board[x][y] == 0 && game.turn != 0){
       //console.log(game.board[x][y], game.turn);
       //winingCondition();
       game.board[x][y] = parseInt(game.turn);
       let position = "i"+x+y;
       placeMove(position);
       toogleTurn();
       // TO DO: if jarvis turn do some magic to make a move
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
    let selectPlayer;

    selectPlayer = document.getElementById('player'+game.turn);
    selectPlayer.classList.remove("active");

    game.turn = game.turn%2 + 1;

    selectPlayer = document.getElementById('player'+game.turn);
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
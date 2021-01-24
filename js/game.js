// created the Game class
class Game{
    constructor(){
    }

// created the getState()
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })
    }

// created the update()
    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }

// created the updateScore()
    updateScore(scr) {
        database.ref('/').update({
            score: scr
        });
    }

// created the async start()
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }

// created the players
        player1 = createSprite(200,500);
        player1.addImage("player1",player_img);
    
        player2 = createSprite(800,500);
        player2.addImage("player2", player_img);
        objPlayers=[player1,player2];

    }
  
// created the play()
    play(){
        
        form.hide();
        Player.getPlayerInfo();

        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;

// forlooping the players in an array
        for(var plr in allPlayers){
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y = 500;
                     
            objPlayers[index -1].x = x;
            objPlayers[index -1].y = y; 
                       
            if(index === player.index){
                         
                fill("white");
                textSize(25);
                text(allPlayers[plr].name ,x-25,y+25);

            }
        }
  
// functions while the RIGHT_ARROW is pressed
        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance -= 10
            player.update();
        }

// functions while the LEFT_ARROW is pressed
        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            player.distance += 10
            player.update();
        }
  
// functions in frameCount % 20 === 0
        if (frameCount % 20 === 0) {
            fruits = createSprite(random(100, 1000), 0, 100, 100);
            fruits.velocityY = 6;
            var rand = Math.round(random(1,5));
            switch(rand){
                case 1: fruits.addImage("fruit1",fruit1_img);
                break;
                case 2: fruits.addImage("fruit1", fruit2_img);
                break;
                case 3: fruits.addImage("fruit1", fruit3_img);
                break;
                case 4: fruits.addImage("fruit1", fruit4_img);
                break;
                case 5: fruits.addImage("fruit1", fruit5_img);
                break;
            }
            fruitGroup.add(fruits);
                     
        }
   
// functions while the fruitGroup is touching the players
        if (player.index !== null) {
            if(fruitGroup.isTouching(player1)||fruitGroup.isTouching(player2)){
                player.score = player.score+ 2;
                player.update();
                fruitGroup.destroyEach();

            }

        }

// the text styles
        fill("White");
        textSize(30);
        textFont('Georgia');

// displaying the score and the name in the canvas
        if(allPlayers != undefined){
            text(allPlayers.player1.name + " : " + allPlayers.player1.score,753,45);
            text(allPlayers.player2.name + " : " + allPlayers.player2.score,753,78);

            textSize(20);
            text(allPlayers.player1.name,player1.x-30,player1.y-35);
            text(allPlayers.player2.name,player2.x-30,player2.y-35);
        }
                
        drawSprites();

    }
   
}
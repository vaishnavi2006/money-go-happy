var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground;
var monkey , monkey_running;
var banana ,bananaImage, bananasGroup, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var obstacle, obstacleImage;
var score = 0;
var survivalTime = 4000;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  createCanvas(600,600);
  
  
 monkey = createSprite(300, 550, 40, 40); 
 monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  console.log(monkey.y);
  
  banana = createSprite(600, 300, 20, 20);
  
  bananasGroup = createGroup();
  console.log(banana.x);
  ground = createSprite(300,590,600,20);
  
  obstacle = createSprite(600, 560, 20, 20);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.1;
  obstacle.visible = false;
  
  Math.round(survivalTime);
  
}


function draw() {
background(225);
 
 if(gameState == PLAY){
   
   if(keyDown("space") ){
   monkey.velocityY = -12;
 }
 
   monkey.velocityY = monkey.velocityY + 0.8;
  survivalTime = survivalTime - 1;
  
   if(frameCount % 80 == 0){
      banana = createSprite(600,300,100,100);
      banana.addImage(bananaImage);
      banana.scale = 0.1;
      banana.velocityX = -4;
      banana.lifetime = 125;
      bananasGroup.add(banana);
    }
   
   if(frameCount % 400 == 0){
     obstacle = createSprite(600, 560, 20, 20);
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.2;
     obstacle.visible = true;
     obstacle.velocityX = -4;
     obstacle.lifetime = 125;
   }
  
   if(monkey.isTouching(banana)){
    banana.x = 1000;
    score = score + 1;
    survivalTime = survivalTime + 100;
  }
   
  if(monkey.isTouching(obstacle)){
    gameState = END;
  }
   
   
   if(survivalTime == 0){
     gameState = END
   }
   
}
  
 if(gameState == END){
   survivalTime = 0;
   textSize(20)
   text("The game is over", 200, 200);
   text("Press 'R' to restart", 200, 250);
   
   banana.velocityX = 0;
   banana.velocityY = 0;
   banana.lifetime = 0;
   obstacle.velocityX = 0;
   obstacle.velocityY = 0;
   obstacle.lifetime = 0;
   
   
   if(keyDown("R")){
     gameState = PLAY;
     score = 0;
     survivalTime = 400;
   }
 } 
 
  
  
  
  monkey.collide(ground);
  
  
  
 drawSprites();
  textSize(20); 
  text("survival time : "+survivalTime, 400, 30);
}

//Error-1 : overlap can only be checked between sprites or groups 
//Error-2 : Cannot read property 'isTouching' of undefined 



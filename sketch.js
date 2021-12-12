var PLAY = 1;
var END = 0;
var gameState = PLAY;

var doraemon, doraemon_running, doraemon_collided;
var ground, invisibleGround, groundImage;

var doracake
var backgroundImg
var score=0;
var jumpSound, collidedSound;

var gameOver1, restart1;


function preload(){
  backgroundImg = loadImage("Background.jpg")
  doraemon_running = loadAnimation("Doraemon1.png","Doraemon2.png","Doraemon3.png","Doraemon4.png","Doraemon5.png","Doraemon6.png");
  doraemon_collided = loadImage("doraemon_collided.jpg");
  doracake = loadImage("Doracake.jpg")
  mice = loadImage("Mice.png")
  groundImage = loadImage("ground.jpg");

  game_over = loadImage("game_over.png")
  restartImg = loadImage("restart.png")

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  doraemon = createSprite(50,height-70,20,50)
  doraemon.addAnimation("running", doraemon_running);
  doraemon.addImage(doraemon_collided);
  doraemon.setCollider('circle',0,0,350)
  doraemon.scale = 0.08;
 
  doracake1 = createSprite(40,height-40,20,50)

  mice1 = createSprite(30,195,20,30)
  invisibleGround =  createSprite(width/2,height-10,width,125);


  ground = createSprite(width/2,height,width,2);
  ground.addImage(groundImage);
  ground.x = width/2
  ground.velocityX = -(6 + 3*score/100);

  gameOver1 = createSprite(width/2,height/2- 50);
  gameOver1.addImage(game_over);
  
  restart1 = createSprite(width/2,height/2);
  restart1.addImage(restartImg);
  
  gameOver1.scale = 0.5;
  restart1.scale = 0.1;

  gameOver1.visible = false;
  restart1.visible = false;
  
  score = 0;
}

function draw() {

  background(backgroundImg);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);

  if(doraemon.isTouching(doracake1)){
    score = score + 1
  }
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && doraemon.y  >= height-120) {
      doraemon.velocityY = -10;
       touches = [];
    }
    
    doraemon.velocityY = doraemon.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    doraemon.collide(invisibleGround);
    spawnDoracakes();
   
  
    if(doraemon.isTouching(mice1)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver1.visible = true;
    restart1.visible = true;
    
    ground.velocityX = 0;
    doraemon.velocityY = 0;
    
    
    doraemon.changeAnimation("collided",doraemon_collided);
    
    doracake1.setLifetimeEach(-1);
   
    if(touches.length>0 || keyDown("SPACE") || mousePressedOver(restart)) {      
      reset();
      touches = []
    }
    drawSprites();
  }
}
  function spawnDoracakes() {
    if(frameCount % 60 === 0) {
      var doracake1 = createSprite(600,height-95,20,30);
      doraemon.setCollider('circle',0,0,45)

    
      doracake1.velocityX = -(6 + 3*score/100);
      
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: doracake1.addImage(doracake);
                break;
        default: break;
      }
      
     doracake1.scale = 0.3;
     doracake1.lifetime = 300;
     doracake1.depth = doraemon.depth;
     doraemon.depth +=1;
    }
  }
  
  function reset(){
    gameState = PLAY;
    gameOver1.visible = false;
    restart1.visible = false;
    
    doraemon.changeAnimation("running",doraemon_running);
    
    score = 0;
    
  }

  

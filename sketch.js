var bg,bgImg;
var player, shooterImg, shooter_shooting;
var enemyGroup,bulletsGroup;
var bullet;
function preload(){
  shooterImg = loadAnimation("assets/docr1.png","assets/docr2.png","assets/docr1.png");

  shooter_shooting = loadImage("assets/docr2.png")

  bgImg = loadImage("assets/covidbg.jpeg")
  enemyImg1=loadImage("assets/c-1.png")
  enemyImg2=loadImage("assets/c-2.png")
  enemyImg3=loadImage("assets/c-3.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(windowWidth,windowHeight,100,100)
bg.addImage(bgImg)
bg.scale = 0.8
 bg.velocityX=-2

  
//creating the player sprite
   player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
   player.addAnimation("running",shooterImg)
   player.scale = 1
   player.debug = true
   player.setCollider("circle",0,0,30)

//ground

score=0;
enemyGroup = createGroup();
bulletsGroup= createGroup();
}

function draw() {
  background(0); 

  if (bg.x < 500){
    bg.x =windowWidth/2;
  }


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyDown("space")){
  //player.addImage(shooter_shooting)
 bullets();
}

if(bulletsGroup.isTouching(enemyGroup)){
  enemyGroup.destroyEach();
  bulletsGroup.destroyEach();
}


enemys();
drawSprites();

}


function enemys(){
  if(World.frameCount%80===0){
     enemy=createSprite(windowWidth-10,200,20,20);
    enemy.velocityX=-9;
  
    enemyGroup.add(enemy)
    var num= Math.round(random(1,3));
    switch (num){
      case 1:
        enemy.addImage(enemyImg1);
        break;
        case 2:
        enemy.addImage(enemyImg2);
        break;
        case 3:
        enemy.addImage(enemyImg3);
        break;
    }
    enemy.scale=0.5
   enemy.y=Math.round(random(50,windowHeight-100));
    enemy.setLifetime=200;
   }
   
}

function bullets(){
 
  bullet=createSprite(player.x,player.y,10,10,6)
  bullet.velocityX=10;
bullet.shapeColor="red";
bulletsGroup.add(bullet)
}
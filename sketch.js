var monkey, imgMonkey, stone, imgStone, banana, imgBanana, invisibleGround, scene, imgScene, gameState, score, survivalTime, bananaGroup, stoneGroup, rand, obsHit

function preload() {
  imgMonkey = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  imgStone = loadImage("stone.png");

  imgBanana = loadImage("banana.png");

  imgScene = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(600, 200);
  scene = createSprite(0, 0, 600, 200);
  scene.addAnimation("scenemove", imgScene);
  scene.scale = 1;
  scene.x = scene.width / 2;

  monkey = createSprite(100, 170, 30, 30);
  monkey.addAnimation("monkeyrun", imgMonkey);
  monkey.scale = 0.1;

  invisibleGround = createSprite(300, 200, 600, 30);
  invisibleGround.visible = false;

  bananaGroup = createGroup();

  stoneGroup = createGroup();

  survivalTime = 0;

  score = 0;
  
  obsHit = 0;

  PLAY = 1;

  END = 0;

  gameState = PLAY;
}

function draw() {
  background(180);
  if (gameState === PLAY) {


    scene.velocityX = -(10 + Math.round(score / 4));

    if (scene.x < 30) {
      scene.x = scene.width / 2;
    }

    survivalTime += Math.round(frameCount / 100);

    bananas();

    stones();

    if (keyDown("space")&&monkey.y>=140) {
      monkey.velocityY = -15;
    }

    monkey.velocityY = monkey.velocityY + 0.7;
        //console.log(monkey.y);

    if (monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();
      score = score + 1;
    }

    if (monkey.isTouching(stoneGroup)) {
      stoneGroup.destroyEach();
      obsHit = obsHit + 1;
    }
  }
  else if (gameState === END) {
    bananaGroup.setVelocityXEach(0);
    stoneGroup.setVelocityXEach(0);
    scene.velocityX = 0;
    monkey.velocityY = 0;
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    if (keyDown("R")) {
      reset();
    }
  }

  monkey.collide(invisibleGround);

  drawSprites();

  textSize(15);
  textFont("Georgia");
  fill("white");
  text(" Survival Time: " + survivalTime, 5, 20);
  text(" Bananas Collected: " + score, 450, 20);
  text(" Obstacles Hit: "+obsHit,240,20);
  if (gameState === END) {
    textSize(20);
    text("Press R to Restart", 230, 100);
  }
}

function bananas() {
  if (frameCount % 80 == 0) {
    banana = createSprite(600, random(40, 70), 20, 20);
    banana.addAnimation("bananamove", imgBanana);
    banana.scale = 0.05;
    banana.velocityX = -(10 + 3 * score / 100);
    banana.lifetime = 200;
    switch (score) {
      case 5: monkey.scale = 0.12;
              break;
      case 10: monkey.scale = 0.14;
               break;
      case 15: monkey.scale = 0.16;
               break;
      case 20: monkey.scale = 0.18;
               break;
      case 25: monkey.scale = 0.20;
               break;     
      default: break;
    }
    bananaGroup.add(banana);
  }
}

function stones() {
  if (frameCount % 100 == 0) {
    stone = createSprite(random(300, 600), 170, 20, 20);
    stone.addAnimation("stonemove", imgStone);
    stone.scale = 0.1;
    stone.velocityX = -(10 + 3 * score / 100);
    stone.lifetime = 200;
    switch(obsHit){
      case 1: monkey.scale = 0.1;
              break;
      case 2: gameState = END; 
              break;
      default: break;        
    }
    stoneGroup.add(stone);
  }
}

function reset() {
  gameState = PLAY;
  score = 0;
  obsHit = 0;
  survivalTime = 0;
  bananaGroup.destroyEach();
  stoneGroup.destroyEach();
}

let bgImage, bugImages = [],bug, allBugs, 
rotationAngles = [0,90,180,-90], topWall, bottomWall, leftWall,
 rightWall,alive,squished,score, gameState, gameTime , timerIsDone, playTime;

function preload(){
  bgImage = loadImage("images/background.png");

  for(let i = 0; i < 4; i++){
    bugImages[i] = loadImage("images/Bugsprite" + i + ".png");
  }
}

function setup() {
  createCanvas(600, 600);

  allBugs = new Group();
  score = 0;
  gameTime = 30;
  gameState = "start"
timerIsDone = false;

}

function draw() {
  background(bgImage);

if(gameState === "start"){

  startScreen();
if(mouseIsPressed){
  moreBugs(20);
  playTime = millis();
  gameState = "play";
}
}
else if(gameState === "play"){
  timer();
  push();
  textSize(15);
  text(`Time Remaining: ${gameTime} / 30`, 30, 50);
  text(`Bugs Squished: ${score}`, 30, 70);
  pop();


  allSprites.forEach(function(e){
    if(e.mouse.pressed()){
      if(e.isDead === false){ e.isDead = true;
      e.ani = "dead";
      e.vel.x=0;
      e.vel.y = 0;
      e.life = 60;
      score++;
    }
    if(allBugs.size() <1){
      moreBugs(floor(random(5, 50)));
    }
    
    }
    
    
    });
    if(timerIsDone=== true){
      allBugs.remove();
      gameState = "end";
    }
}
else if(gameState === "end"){
endSceen();

if(keyIsPressed){
  if (keyCode === 13){
    setup();
  }
}
}


}
 function moreBugs(num){
  for(let i = 0; i < num; i++){
  bug = new Sprite(random(50, 750), random(50, 750), 50, 50);
  allBugs.add(bug);
  bug.isDead = false;
  alive = bug.addAni("alive", bugImages[0], bugImages[1], bugImages[0], bugImages[2]);
  
  dead = bug.addAni("dead", bugImages[3]);
  
  bug.ani = "alive";
  bug.scale=0.5;
  bug.overlap(allBugs);
  
  bug.rotation = floor(random(rotationAngles));
  
  switch(bug.rotation){
    case 0:
      bug.move("up", 3, 80000);
      break;
      case 90:
        bug.move("right", 3, 80000);
      break;
      case 180:
        bug.move("down", 3, 80000);
      break;
      case -90:
        bug.move("left", 3, 80000);
      break;
      
      default:
        bug.rotation = 0;
        bug.move("up", 3, 80000);
      break;
  
  }
 }
}
function startScreen(){
  push();
  fill("gray");
  stroke(0);
  strokeWeight(5);
  rect(width / 2 - 300, height / 2 - 100, 600, 300);

  noStroke();
  fill(0);
  textAlign(CENTER);
  textSize(25);
  text(`Click the Bugs to Win!\nClick as many as you can in 30 seconds!`, width / 2, height / 2-30);
  pop();
}

function endSceen(){
  push();
  fill("gray");
  stroke(0);
  strokeWeight(5);
  rect(width / 2 - 300, height / 2 - 100, 600, 300);

  noStroke();
  fill(0);
  textAlign(CENTER);
  textSize(25);
  text(`TIME'S UP!\nHere's Your Score!\n ${score}\nPress RETURN to Play Again!`, width / 2, height / 2-30);
  pop();

}
function timer() {
  gameTime = int((millis() - playTime) / 1000);
  if (gameTime > 30) {
    timerIsDone = true;
  }
  return gameTime;
}
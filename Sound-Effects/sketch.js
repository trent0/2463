function preload(){
  mouse = loadImage ('assets/SonicDash.avif')
}

function setup() {
  createCanvas(400, 400); 
}

function draw() {
  if (mouseIsPressed ===true){
    background(mouse);
  } else if (mouseIsPressed === false){
    background (240);
    text ('press mouse', 150, height/3);
  }
}


//Your assignment needs to use objects from Tone.js not preexisitng sound files!
let amSynth = new Tone.AMSynth().toDestination();
amSynth.type = 'sine'
amSynth.harmonicity.value= .1;

function mousePressed(){
  amSynth.triggerAttack('f4');
}

function mouseReleased(){
  amSynth.triggerRelease();
}
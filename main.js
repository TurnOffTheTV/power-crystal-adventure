var sounds;
var images;
var models;
var px;
var py;
var pxVelocity;
var pyVelocity;
var pr;
var keys = [keyCode];
var keysNow = {};

function preload(){
  sounds = {
    error:loadSound('sounds/error.mp3'),
    africa:loadSound('sounds/africa.mp3'),
    dont_stop:loadSound('sounds/dont_stop.mp3'),
    shadow:loadSound('sounds/shadow.mp3')
  };
  images = {
    africa:loadImage('images/africa.jpg'),
    dont_stop:loadImage('images/dont_stop.jpg')};
  models = {};
  px = width/2;
  py = height/2;
  pxVelocity = 0;
  pyVelocity = 0;
  pr = 0;
}

function setup() {
  imageMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  background(255, 0, 0);
}

function errorDisplay(errorMessage) {
  sounds.error.play();
  background(255);
  fill(0);
  text(errorMessage+" Please reload. Progress saved.",windowWidth/2,windowHeight/2);
  sounds.africa.stop();
  sounds.dont_stop.stop();
}

function mousePressed(){
  sounds.africa.stop();
  sounds.dont_stop.stop();
  sounds.shadow.stop();
  if(mouseX<width/3){
    sounds.dont_stop.play();
  }
  if(mouseX>2*(width/3)){
    sounds.africa.play();
}
if(mouseX>width/3 && mouseX<(width/3)*2){
  sounds.shadow.play();
}
}

function draw() {
  background(0);
  if(sounds.africa.isPlaying()){
    image(images.africa,width/2,height/2);
  }
  if(sounds.dont_stop.isPlaying()){
    image(images.dont_stop,width/2,height/2);
  }
  if(width!==windowWidth || height!==windowHeight){errorDisplay("Window size changed.");}
}

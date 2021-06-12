var sounds;
var images;
var models;

function preload(){
  sounds = {
    error:loadSound('sounds/error.mp3'),
    africa:loadSound('sounds/africa.mp3'),
    dont_stop:loadSound('sounds/dont_stop.mp3')
  };
  images = {
    africa:loadImage('images/africa.jpg'),
    dont_stop:loadImage('images/dont_stop.jpg')};
  models = {};
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
  if(mouseX<width/2){
    sounds.dont_stop.play();
  }
  if(mouseX>width/2){
    sounds.africa.play();
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

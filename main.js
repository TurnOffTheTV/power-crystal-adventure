var sounds;
var images;
var models;
var px;
var py;
var cx;
var cy;
var pxVelocity;
var pyVelocity;
var pr;
var keysNow = {};

function preload(){
  sounds = {
    error:loadSound('sounds/error.mp3'),
  };
  images = {
    grass:loadImage('images/grass.png'),
    dirt:loadImage('images/dirt.png'),
    stone:loadImage('images/stone.png'),
    cliff_b:loadImage('images/cliff-b.png'),
    cliff_t:loadImage('images/cliff-t.png'),
    cliff_br_dirt:loadImage('images/cliff-br-dirt.png'),
    cliff_bl_dirt:loadImage('images/cliff-bl-dirt.png'),
    cliff_br_stone:loadImage('images/cliff-br-stone.png'),
    cliff_bl_stone:loadImage('images/cliff-bl-stone.png'),
    cliff_tr:loadImage('images/cliff-tr.png'),
    cliff_tl:loadImage('images/cliff-tl.png'),
    cliff_r:loadImage('images/cliff-r.png'),
    cliff_l:loadImage('images/cliff-l.png'),
    cliff_t:loadImage('images/cliff-t.png'),
    cliff_b:loadImage('images/cliff-b.png'),
    side_bl_dirt:loadImage('images/side-bl-dirt.png'),
    side_b_dirt:loadImage('images/side-b-dirt.png'),
    side_br_dirt:loadImage('images/side-br-dirt.png'),
    side_bl_stone:loadImage('images/side-bl-stone.png'),
    side_b_stone:loadImage('images/side-b-stone.png'),
    side_br_stone:loadImage('images/side-br-stone.png'),
    bg:loadImage('images/bg.png')
    };
  models = {};
  px = width/2;
  py = height/2;
  cx = 0;
  cy = 0;
  pxVelocity = 0;
  pyVelocity = 0;
  pr = 0;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function errorDisplay(errorMessage) {
  if(sounds.error.isPlaying()===false){sounds.error.play();}
  background(255);
  fill(0);
  text(errorMessage+" Please reload. Progress saved.",windowWidth/2,windowHeight/2);
}

function mapLoad() {
  image(images.cliff_tl,0,0);
  image(images.cliff_t,64,0);
  image(images.cliff_t,64*2,0);
  image(images.cliff_tr,64*3,0);
  image(images.cliff_tl,64*5,0);
  image(images.cliff_t,64*6,0);
  image(images.cliff_t,64*7,0);
  image(images.cliff_t,64*8,0);
  image(images.cliff_tr,64*9,0);

  image(images.cliff_l,0,64);
  image(images.grass,64,64);
  image(images.grass,64*2,64);
  image(images.grass,64*3,64);
  image(images.cliff_t,64*4,64);
  image(images.grass,64*5,64);
  image(images.grass,64*6,64);
  image(images.grass,64*7,64);
  image(images.grass,64*8,64);
  image(images.cliff_r,64*9,64);

  image(images.cliff_l,0,64*2);
  image(images.grass,64,64*2);
  image(images.grass,64*2,64*2);
  image(images.grass,64*3,64*2);
  image(images.grass,64*4,64*2);
  image(images.cliff_l,64*5,64*2);
  image(images.grass,64*6,64*2);
  image(images.grass,64*7,64*2);
  image(images.grass,64*8,64*2);
  image(images.cliff_r,64*9,64*2);

  image(images.cliff_bl_dirt,0,64*3);
  image(images.grass,64,64*3);
  image(images.grass,64*2,64*3);
  image(images.cliff_br_dirt,64*3,64*3);
  image(images.grass,64*4,64*3);

  image(images.grass,64*6,64*3);
  image(images.grass,64*7,64*3);
  image(images.grass,64*8,64*3);
  image(images.cliff_r,64*9,64*3);
  image(images.cliff_l,64*5,64*3);

  image(images.dirt,0,64*4);
  image(images.dirt,64,64*4);
  image(images.dirt,64*2,64*4);
  image(images.dirt,64*3,64*4);
  image(images.grass,64*4,64*4);
  image(images.cliff_l,64*5,64*4);
  image(images.grass,64*6,64*4);
  image(images.grass,64*7,64*4);
  image(images.grass,64*8,64*4);
  image(images.cliff_r,64*9,64*4);

  image(images.side_bl_dirt,0,64*5);
  image(images.side_b_dirt,64,64*5);
  image(images.side_b_dirt,64*2,64*5);
  image(images.side_br_dirt,64*3,64*5);
  image(images.grass,64*4,64*5);
  image(images.cliff_bl_stone,64*5,64*5);
  image(images.cliff_b,64*6,64*5);
  image(images.cliff_b,64*7,64*5);
  image(images.cliff_b,64*8,64*5);
  image(images.cliff_br_stone,64*9,64*5);

  image(images.grass,0,64*6);
  image(images.grass,64,64*6);
  image(images.grass,64*2,64*6);
  image(images.grass,64*3,64*6);
  image(images.grass,64*4,64*6);
  image(images.stone,64*5,64*6);
  image(images.stone,64*6,64*6);
  image(images.stone,64*7,64*6);
  image(images.stone,64*8,64*6);
  image(images.stone,64*9,64*6);

  image(images.grass,0,64*7);
  image(images.grass,64,64*7);
  image(images.grass,64*2,64*7);
  image(images.grass,64*3,64*7);
  image(images.grass,64*4,64*7);
  image(images.side_bl_stone,64*5,64*7);
  image(images.side_b_stone,64*6,64*7);
  image(images.side_b_stone,64*7,64*7);
  image(images.side_b_stone,64*8,64*7);
  image(images.side_br_stone,64*9,64*7);

  image(images.grass,0,64*8);
  image(images.grass,64,64*8);
  image(images.grass,64*2,64*8);
  image(images.grass,64*3,64*8);
  image(images.grass,64*4,64*8);
  image(images.grass,64*5,64*8);
  image(images.grass,64*6,64*8);
  image(images.grass,64*7,64*8);
  image(images.grass,64*8,64*8);
  image(images.grass,64*9,64*8);
}

function draw() {
  for(var j=0;j<height;j++){
    for(var i=0;i<width;i++){
      image(images.bg,i,j);
      i+=127;
    }
    j+=127;
  }
  push();
  translate(cx,cy);
  mapLoad();
  pop();
  if(width!==windowWidth || height!==windowHeight){errorDisplay("Window size changed.");}
}

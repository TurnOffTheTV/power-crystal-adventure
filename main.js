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
var keysNow;
var pWalkCycle;
var player_foot_r;
var stick;
var buttons;
var players;

setInterval(() => {
  player.one = navigator.getGamepads()[0];
  console.log(gamepad);
  stick.lx=player.one.axes[0];
  stick.ly=player.one.axes[1];
}, 100) // print axes 10 times per second

function preload(){
  gamepad = navigator.getGamepads()[0];
  sounds = {
    error:loadSound('sounds/error.mp3'),
    errorPlays:0
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
    bg:loadImage('images/bg.png'),
    player:loadImage('images/player.png'),
    player_feet:loadImage('images/player-feet.png'),
    player_foot_l:loadImage('images/player-foot-l.png'),
    player_foot_r:loadImage('images/player-foot-r.png'),
    red_flower:loadImage('images/red-flower.png'),
    blue_flower:loadImage('images/blue-flower.png'),
    white_flower:loadImage('images/white-flower.png'),
    sunflower:loadImage('images/sunflower.png')
    };
  models = {};
  cx = 0;
  cy = 0;
  pxVelocity = 0;
  pyVelocity = 0;
  pr = 0;
  pWalkCycle = 0;
  stick = {
    lx:0,
    ly:0,
    rx:0,
    ry:0
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  px = width/2;
  py = height/2;
}

function errorDisplay(errorMessage) {
  if(sounds.error.isPlaying()===false && sounds.errorPlays===0){sounds.error.play();sounds.errorPlays=1;}
  background(255);
  fill(0);
  text(errorMessage+" Please reload. Progress saved.",windowWidth/2,windowHeight/2);
}

function mapLoad() {
  imageMode(CORNER);
  image(images.cliff_tl,0,0);
  image(images.cliff_t,64,0);
  image(images.cliff_t,64*2,0);
  image(images.cliff_tr,64*3,0);
  image(images.cliff_tl,64*5,0);
  image(images.cliff_t,64*6,0);
  image(images.cliff_t,64*7,0);
  image(images.cliff_t,64*8,0);
  image(images.cliff_tr,64*9,0);
  image(images.cliff_l,64*15,0);

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
  image(images.cliff_l,64*15,64);

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
  image(images.cliff_l,64*15,64*2);

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
  image(images.cliff_tl,64*14,64*3);

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
  image(images.cliff_tl,64*10,64*4);
  image(images.cliff_t,64*11,64*4);
  image(images.cliff_t,64*12,64*4);
  image(images.cliff_t,64*13,64*4);

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
  image(images.grass,64*10,64*5);

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
  image(images.grass,64*10,64*6);

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
  image(images.grass,64*10,64*7);

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
  image(images.grass,64*10,64*8);

  image(images.cliff_bl_stone,0,64*9);
  image(images.cliff_b,64,64*9);
  image(images.cliff_b,64*2,64*9);
  image(images.cliff_b,64*3,64*9);
  image(images.cliff_b,64*4,64*9);
  image(images.cliff_b,64*5,64*9);
  image(images.cliff_b,64*6,64*9);
  image(images.cliff_b,64*7,64*9);
  image(images.cliff_b,64*8,64*9);
  image(images.cliff_br_stone,64*9,64*9);
  image(images.grass,64*10,64*9);

  image(images.stone,0,64*10);
  image(images.stone,64,64*10);
  image(images.stone,64*2,64*10);
  image(images.stone,64*3,64*10);
  image(images.stone,64*4,64*10);
  image(images.stone,64*5,64*10);
  image(images.stone,64*6,64*10);
  image(images.stone,64*7,64*10);
  image(images.stone,64*8,64*10);
  image(images.stone,64*9,64*10);
  image(images.grass,64*10,64*10);

  image(images.stone,0,64*11);
  image(images.stone,64,64*11);
  image(images.stone,64*2,64*11);
  image(images.stone,64*3,64*11);
  image(images.stone,64*4,64*11);
  image(images.stone,64*5,64*11);
  image(images.stone,64*6,64*11);
  image(images.stone,64*7,64*11);
  image(images.stone,64*8,64*11);
  image(images.stone,64*9,64*11);
  image(images.grass,64*10,64*11);

  image(images.side_bl_stone,0,64*12);
  image(images.side_b_stone,64,64*12);
  image(images.side_b_stone,64*2,64*12);
  image(images.side_b_stone,64*3,64*12);
  image(images.side_b_stone,64*4,64*12);
  image(images.side_b_stone,64*5,64*12);
  image(images.side_b_stone,64*6,64*12);
  image(images.side_b_stone,64*7,64*12);
  image(images.side_b_stone,64*8,64*12);
  image(images.side_br_stone,64*9,64*12);
  image(images.grass,64*10,64*12);

  image(images.grass,0,64*13);
  image(images.grass,64,64*13);
  image(images.grass,64*2,64*13);
  image(images.grass,64*3,64*13);
  image(images.grass,64*4,64*13);
  image(images.grass,64*5,64*13);
  image(images.grass,64*6,64*13);
  image(images.grass,64*7,64*13);
  image(images.grass,64*8,64*13);
  image(images.grass,64*9,64*13);
  image(images.grass,64*10,64*13);

  image(images.blue_flower,32,32);
}

function input() {
  pxVelocity = 0;
  pyVelocity = 0;
  if(stick.lx>0.15 || stick.lx<-0.15){pxVelocity=stick.lx;}
  if(stick.ly>0.15 || stick.ly<-0.15){pyVelocity=stick.ly;}
  if(px<50){px+=2;cx+=2;}
  if(py<50){py+=2;cy+=2;}
  if(px>width-50){px-=2;cx-=2;}
  if(py>height-50){py-=2;cy-=2;}
}

function player() {
  imageMode(CENTER);
  push();
  translate(px,py);
  angleMode(DEGREES);
  rotate(pr-pr*2);
  if(pxVelocity!==0 || pyVelocity!==0){
    if(floor(pWalkCycle)===0){image(images.player_foot_l,0,0);}
    if(floor(pWalkCycle)===1 || pWalkCycle===3){image(images.player_feet,0,0);}
    if(floor(pWalkCycle)===2){image(images.player_foot_r,0,0);}
    pWalkCycle+=0.1;
  } else {image(images.player_feet,0,0);}
  image(images.player,0,0);
  pop();
  stroke(0);
  strokeWeight(35);
  pr = stick.lx*180+stick.ly*180;
  point(stick.lx*20 - px, stick.ly*20 - py);
  noStroke();
  if(pWalkCycle>3){pWalkCycle=0;}
  if(pxVelocity!==0 || pyVelocity!==0){
    if(pWalkCycle===0){image(images.player_foot_l,0,0);}
  }
  px+=pxVelocity*2;
  py+=pyVelocity*2;
}

function draw() {
  input();
  for(var j=0;j<height*1.5;j++){
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
  player();
  pr+=0.01;
  if(width!==windowWidth || height!==windowHeight){errorDisplay("Window size changed.");}
}

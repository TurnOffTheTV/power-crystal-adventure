function setup() {
     createCanvas(windowWidth, windowHeight);
     background(220);
     }

function draw() {
  background(0,0,255);
  if(width!==windowWidth || height!==windowHeight){background(255);
    fill(0);
    text("Please reload. Progress saved.",windowWidth/2,windowHeight/2);
  }
}

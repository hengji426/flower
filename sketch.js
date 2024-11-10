/*
TITLE: GARDEN
AUTHOR: FANYI QU

DESCRIPTION:An electronic aerial garden that responds to the audience's mouse movements by changing the perspective accordingly. 
The inspiration for this project comes from the gardening kit I purchased. When I engage in planting, I experience a profound sense of calm and tranquility.
*/

let plantImage = [];
let flyingBugs = [];
let view;
let closeView =0;
let font;

//set view class
class viewChange {
  constructor() {
    //set orignal camera parameters
    this.x = 1300;
    this.z = 100;
    this.y = 1300;
    this.cx = 750;
    this.cz = 0;
    this.cy = 850;
  }

  viewDisplay() {
    // if it is closeview updating the parameters with mouse changing  
    if(closeView==1){
      this.x = mouseX / 5 + 1000;
      this.y = 1000;
      this.z = mouseY / 5 - 100;
      this.cx = mouseX / 5 + 750;
      //give hint to change view
      push();
      translate(this.cx,this.cz,this.cy);
      textFont(font);
      textSize(10);
      fill(0);
      rotateY(PI/5);
      let s="press_'d'_to_change_distant_view";
      text(s,0,0);
      pop();

      // if it is distant view updating the parameters with mouse changing  
    }else{
      this.x = mouseX / 5 + 2300;
      this.y = 2300;
      this.z = mouseY / 5 - 100;
      this.cx = mouseX / 5 + 750;
      this.cy = 850;
      push();
      translate(this.cx,this.cz-300,this.cy-300);
      textFont(font);
      textSize(30);
       fill(0);
       rotateY(PI/4);
       let s="press_'c'_to_change_close_view";
      text(s,0,0);
      pop();
    }
    
    camera(this.x, this.z, this.y, this.cx, this.cz, this.cy, 0, 1, 0);
  }
}

//set the flying bug class
class FlyingBug {
  constructor() {
    this.position = createVector(random(2000), -random(500), random(2000));
    this.velocity = createVector(random(-2, 2), random(-2, 2), random(-2, 2));
  }

  update() {
    this.position.add(this.velocity);

    // if bug flies over range, reset it
    if (
      this.position.x < 0 ||
      this.position.x > 2000 ||
      this.position.y < -500 ||
      this.position.y > 500 ||
      this.position.z < 0 ||
      this.position.z > 2000
    ) {
      this.position = createVector(random(width), -random(500), random(1000));
      this.velocity = createVector(
        random(-2, 2),
        random(-2, 2),
        random(-2, 2)
      );
    }
  }
  //display the bugs
  display() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    noStroke();
    fill(255, 0, 0, 150);
    texture(plantImage[4]);
    plane(69, 69);
    pop();
  }
}

//preload pics and font
function preload() {
  plantImage[0] = loadImage('Untitled-1-1-07.png');
  plantImage[1] = loadImage('Untitled-02.png');
  plantImage[2] = loadImage('Untitled-03.png');
  plantImage[3] = loadImage('Untitled-1-1-08.png');
  plantImage[4] = loadImage('Untitled-05.png');
  plantImage[5] = loadImage('Untitled-1-1-09.png');
  font=loadFont('font.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // define the new view class
  view = new viewChange();

  // set bugs to 50
  for (let i = 0; i < 50; i++) {
    flyingBugs.push(new FlyingBug());
  }
}

function draw() {
  orbitControl();
  background(50);

  // updating the view
  view.viewDisplay();

  // updating the plants
  updateNoiseGrass();

  // updating the bus
  for (let b of flyingBugs) {
    b.update();
    b.display();
  }
}

//set the plants with linear rotating
function updateNoiseGrass() {
  for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 50; j++) {
      noStroke();
      //plants A
      let nn = noise(i, j);
      if (nn < 0.2) {
        push();
        translate(i * 30, -179 / 2, j * 30);
        rotateY(
          map(noise((frameCount + i * 1000) / 200, (frameCount + j * 1000) / 200), 0, 1, 0, PI)
        );
        texture(plantImage[1]);
        plane(69 * map(noise(i, j), 0, 1, 1, 4), 179 * map(noise(i, j), 0, 1, 1, 4));
        pop();
      }

      //plants B
      let nn1 = noise(i + 400, j + 400);
      if (nn1 < 0.1) {
        push();
        translate(i * 30, -60, j * 30);
        rotateY(
          map(noise((frameCount + i * 1000) / 200, (frameCount + j * 1000) / 200), 0, 1, 0, PI)
        );
        texture(plantImage[3]);
        plane(69/2.5 * map(noise(i, j), 0, 1, 2, 6), 179/2.5 * map(noise(i, j), 0, 1, 2, 6));
        pop();
      }

      //plants C
      let nn2 = noise(i + 600, j + 600);
      if (nn2 < 0.1) {
        push();
        translate(i * 30, random(-200, -100), j * 30);
        rotateY(
          map(noise((frameCount + i * 1000) / 200, (frameCount + j * 1000) / 200), 0, 1, 0, PI)
        );
        texture(plantImage[2]);
        plane(69 * map(noise(i, j), 0, 1, 0.1, 6), 179 * map(noise(i, j), 0, 1, 0.1, 6));
        pop();
      }

      //plants D
      let nn3 = noise(i + 800, j + 800);
      if (nn3 < 0.13) {
        push();
        translate(i * 30, -60, j * 30);
        rotateY(
          map(noise((frameCount + i * 1000) / 200, (frameCount + j * 1000) / 200), 0, 1, 0, PI)
        );
        texture(plantImage[0]);
        plane(69*1.7, 179*1.7);
        pop();
      }
      let nn4 = noise(i + 500, j + 900);
      if (nn4 < 0.13) {
        push();
        translate(i * 30, -120, j * 30);
        rotateY(
          map(noise((frameCount + i * 1000) / 200, (frameCount + j * 1000) / 200), 0, 1, 0, PI)
        );
        texture(plantImage[5]);
        plane(69*1.7, 179*1.3);
        pop();
      }
    }
  }
}

// key 'f' for fullscreen 'c'for closeview 'd' for distantview
function keyPressed() {
  if (key == 'f') {
    let fs = fullscreen();
    fullscreen(!fs);
  }
  if (key == 'c') {
    closeView=1;
  }
  if (key == 'd') {
    closeView =0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//a look at icons

let lanework = [];
let EL;
let postcard;
let hand;
let tropicana;
let dadLook;
let dadShoot;
let muralEL;
let muralDad;
let roof;
let base;
let flicker = 100;
let colour = 360;
let x = 0;
let y = 0;
let alp1 = 0;
let alp2 = 100;
let alp3 = 100;
let shade = 0;
let incr = 1;

function preload(){
  EL = loadImage('assets/ELDad_Icons_EL.png');
  postcard = loadImage('assets/ELDad_Icons_postcard.png');
  hand = loadImage('assets/ELDad_Icons_hand.png');
  tropicana = loadImage('assets/ELDad_Icons_handPostcard.png');
  dadLook = loadImage('assets/ELDad_Icons_dadLook.png');
  dadShoot = loadImage('assets/ELDad_Icons_dadShoot.png');
  muralEL = loadImage('assets/ELDad_Icons_muralEL.png');
  muralDad = loadImage('assets/ELDad_Icons_muralDad.png');
  roof = loadImage('assets/ELDad_Icons_roofDad.png');
  base = loadImage('assets/ELDad_Icons_base.png');
}

function setup() {
  createCanvas(base.width/2, base.height/2);
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(7);
  rectMode(CENTER);
  for (let i=0; i < 500; i++){
    lanework[i] = new Lane(random(width), random(height), random(10,50), random(-20, 20), random(-20, 20), 1);
  }
}

function draw() {
  background(0);
  
  //base
  push();
  tint(255, random(50, 100));
  image(base, 0, 0, width, height);
  pop();

  //roof
  blend(roof, 0, 0, roof.width, roof.height, 0, 0, width, height, DARKEST);

  //mural dad
  blend(muralDad, 0, 0, muralDad.width, muralDad.height, 0, 0, width, height, LIGHTEST);
 
  //mural EL
  blend(muralEL, 0, 0, muralEL.width, muralEL.height, 0, 0, width, height, OVERLAY);



   //dad shoot
   push();
   tint(colour-180, flicker, 100, alp2);
   dadShoot.filter(GRAY);
   image(dadShoot, 0, 0, width, height);
   pop();

   //universal flicker
   noStroke();
   fill(colour-180, 100, 100, random(alp1));
   rect(width/2, height/2, width, height);
   
     //lanework
  for (let i = 0; i < lanework.length; i++){
    lanework[i].edge();
    lanework[i].move();
    lanework[i].show();
  }

   //dad Look
   
   push();
   dadLook.filter(GRAY);
   image(dadLook, 0, 0, width, height);
   pop();

   //hand and postcard
   blend(tropicana, 0, 0, tropicana.width, tropicana.height, 0, 0, width, height, LIGHTEST);

   //hand
   hand.filter(GRAY);
   image(hand, 0, 0, width, height);

   //postcard
   push();
   tint(255, alp3);
   image(postcard, 0, 0, width, height);
   pop();

   //EL
   push();
   tint(colour, flicker, 100);
   EL.filter(GRAY);
   image(EL, 0, 0, width, height);
   pop();
  
   if (frameCount%10==0){
    colour = random(180, 360);
   }

   if (frameCount%2==0){
    flicker = random(30, 100);
   };

   if (frameCount%int(random(20))==0){
    dadLook.filter(INVERT);
    shade = random(255);
    if (alp1 <= 0){
    alp1 = 100;
    alp2 = 0;
    //alp3 = random(100);
    alp3 = 0
    } else {
      alp1 = 0;
      alp2 = 100;
      alp3 = 100;
      
    }
   }
}

class Lane{
  constructor(x, y, r, inc1, inc2, weight){
    this.x = x;
    this.y = y;
    this.r = r;
    this.inc1 = inc1;
    this.inc2 = inc2;
    this.weight = weight;
  }

  move(){
    this.x += this.inc1;
    this.y += this.inc2;
    this.weight += incr;
  }

  edge(){
    if (this.x <= 0 || this.x >= width){
      this.inc1 *= -1;
    }
    if (this.y <= 0 || this.y >= height){
      this.inc2 *= -1;
    }

    if (this.weight >= this.r/2 || this.weight <= 0){
      incr *= -1;
    };
  }
  show(){
    //fill(colour-180, random(100), random(100), random(alp1));
    //stroke(colour, random(100), random(100), alp);
    //noStroke();
    strokeWeight(random(0.5,4));
    noFill();
    stroke(shade, alp1);
    //fill(shade, random(alp1));
    //fill(0, alp1)
    rect(this.x, this.y, this.r);
  }
}

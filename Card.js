let cardImages = [];
let cardBack;
let cardDiscription = [];

class Card {
  constructor(x, y, r, s) {
    this.pos = createVector(x, y);
    this.tilt = r;
    this.size = createVector(70, 120);
    this.seed = s;
    this.sheta = random(0, PI * 2);
    this.scale = 1;
    this.flip = 0;
    this.speed = 0.95;
    this.up = round(random(0,1))==0?true:false;
  }
  move_to(pos = createVector(0, 0), tilt = null, s = null, f = null) {
    this.pos = pos.mult((1-this.speed)).add(this.pos.mult(this.speed));
    if(tilt != null)this.tilt = tilt * (1-this.speed) + this.tilt * this.speed;
    if(s != null)this.scale_to(s);
    if(f != null)this.flip_to(f);
  }
  scale_to(s) {
    this.scale = s * (1-this.speed) + this.scale * this.speed;
  }
  flip_to(f) {
    this.flip = f * (1-this.speed) + this.flip * this.speed;
  }
  shuffle() {
    this.sheta += noise(this.seed, frameCount * 0.001) * 0.05;
    let r = noise(this.seed + 50, frameCount * 0.01) * 400;
    let target_pos = createVector(r * cos(this.sheta), r * sin(this.sheta));
    let target_tilt =
      ((noise(this.seed + 100, frameCount * 0.001) - 0.5) * 10) % (PI * 2);
    this.move_to(target_pos, target_tilt);
  }
  draw() {
    push();
    fill(0);
    stroke(255);
    translate(this.pos.x, this.pos.y);
    rotate(this.tilt);
    scale(this.scale);
    if (cos(this.flip) > 0) {
      scale(cos(this.flip), 1);
      //rectMode(CENTER);
      //rect(0, 0, this.size.x, this.size.y);
      imageMode(CENTER);
      image(cardBack, 0, 0, this.size.x, this.size.y);
    } else {
      scale(-cos(this.flip), 1);
      rotate(this.up ? 0:PI);
      imageMode(CENTER);
      image(cardImages[this.seed], 0, 0, this.size.x, this.size.y);
    }
    pop();
  }
}
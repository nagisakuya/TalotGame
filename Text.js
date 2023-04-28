class Text {
  constructor(text,x, y) {
    this.text = text;
    this.pos = createVector(x, y);
    this.size = 50;
    this.color = color(255);
    this.time = 0;
  }
  draw() {
    this.time++;
    push();
    textAlign(CENTER,CENTER);
    var c = this.color;
    c.setAlpha(this.time * 5);
    fill(c);
    strokeWeight(3);
    stroke(0);
    textSize(this.size + sin(this.time/60)*5);
    text(this.text,this.pos.x,this.pos.y);
    pop();
  }
  inside(x,y){
    push();
    x = x-width/2;
    y = y-height/2;
    textSize(this.size + sin(this.time/60)*5);
    var r = this.pos.x - textWidth(this.text)/2 < x &&
      this.pos.x + textWidth(this.text)/2 > x &&
      this.pos.y - textSize()/2 < y &&
      this.pos.y + textSize()/2 > y ;
    pop();
    return r;
  }
}
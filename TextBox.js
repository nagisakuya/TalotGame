class TextBox {
  constructor(text, x, y, w,h) {
    this.text = "";
    text.forEach(ele => this.text = this.text + ele + "\n");
    text.pop();
    this.pos = createVector(x, y);
    this.size = createVector(w, h);
    this.time = 0;
    this.margin = 5;
    this.canvas = createGraphics(this.size.x-this.margin*2,this.size.y-this.margin*2);
    this.scroll = 0;
    this.scroll_queue = [];
  }
  ScrollFunc(text_high){
     for(let i = 0; i < this.scroll_queue.length; i++){
      if(this.scroll_queue[i] > 0){
        this.scroll += 10;
        this.scroll_queue[i]-= 10;
        if(this.scroll_queue[i] < 0) this.scroll_queue[i] = 0;
      }
      if(this.scroll_queue[i] < 0){
        this.scroll -= 10;
        this.scroll_queue[i] += 10;
        if(this.scroll_queue[i] > 0) this.scroll_queue[i] = 0;
      }
    }
    if(this.scroll_queue.length > 0 && this.scroll_queue[0]==0) this.scroll_queue.shift();
    if(this.scroll < 0)this.scroll = 0;
    var temp1 = text_high - this.canvas.height;
    if(this.scroll > temp1) this.scroll = temp1;
  }
  DrawFrame(){
    push();
    strokeWeight(5);
    stroke(0,this.time*3);
    fill(255,this.time*3);
    rect(0,0,this.size.x,this.size.y,10,10,10,10);
    pop();
  }
  DrawTexts(){
    this.canvas.clear();
    this.canvas.textAlign(LEFT, TOP);
    this.canvas.textSize(20);
    let x = 0;
    let y = 0;
    let c = color(0,0,0);
    for (let i = 0; i < this.text.length; i++) {
      if ((x + this.canvas.textWidth(this.text[i]) > this.canvas.width) || this.text[i] == "\n"){
        x = 0;
        y += this.canvas.textSize();
      }
      if(this.text[i] == "\n"){
        continue;
      }
      if(this.text.substr(i,4) == "<s1>"){
        this.canvas.textSize(50);
        i+=3;
        continue;
      }
      if(this.text.substr(i,4) == "<s2>"){
        this.canvas.textSize(40);
        i+=3;
        continue;
      }
      if(this.text.substr(i,4) == "<s3>"){
        this.canvas.textSize(30);
        i+=3;
        continue;
      }
      if(this.text.substr(i,4) == "<s4>"){
        this.canvas.textSize(20);
        i+=3;
        continue;
      }
      if(this.text.substr(i,4) == "<s5>"){
        this.canvas.textSize(10);
        i+=3;
        continue;
      }
      if(this.text.substr(i,5) == "<red>"){
        c = color(255,0,0);
        i+=4;
        continue;
      }
      if(this.text.substr(i,6) == "<blue>"){
        c = color(0,255,0);
        i+=5;
        continue;
      }
      if(this.text.substr(i,7) == "<green>"){
        c = color(0,0,255);
        i+=6;
        continue;
      }
      if(this.text.substr(i,7) == "<black>"){
        c = color(0);
        i+=6;
        continue;
      }
      var temp = c;
      temp.setAlpha(this.time*3-i*3);
      this.canvas.fill(c);
      this.canvas.text(this.text[i], x, y - this.scroll);
      x += this.canvas.textWidth(this.text[i]);
    }
    image(this.canvas,this.margin,this.margin);
    return y;
  }
  draw() {
    this.time++;
    
    push();
    translate(this.pos.x, this.pos.y);
    this.DrawFrame();
    let texts_high = this.DrawTexts();
    pop();
    
    this.ScrollFunc(texts_high);
  }
}
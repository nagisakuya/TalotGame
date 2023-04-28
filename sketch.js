let cards = [];
let texts = [];
let text_box;
let background;
let step = 0;
let stepBlock = false;

function inside(){
  return !(mouseX<0||mouseX>width||mouseY<0||mouseY>height);
}

function preload() {
  cardBack = loadImage("talot_image/back.png");
  background = loadImage("background.jpg");
  for (let i = 0; i < 22; i++) {
    cardImages.push(loadImage("talot_image/" + i + ".png"));
    cardDiscription.push([
      loadStrings("talot_data/H" + i + ".txt"),
      loadStrings("talot_data/T" + i + ".txt")
    ]);
  }
  texts.push(new Text("Click!", 0, 300));
}

function setup() {
  createCanvas(800, 800);
  reset();
}

function reset() {
  step = 0;
  cards = [];
  text_box = null;
  texts = [];
  stepBlock = false;
  for (let i = 0; i < 22; i++) {
    cards.push(new Card(0, 0, 0, i));
    cards[i].scale = 1.5;
  }
  texts.push(new Text("Click!", 0, 300));
}

function draw() {
  timer++;
  translate(width / 2, height / 2);
  push();
  imageMode(CENTER);
  image(background, 0, 0);
  pop();
  if (drawFunc[step] != null) drawFunc[step]();

  if (text_box != null) text_box.draw();
  cards.forEach((ele) => ele.draw());
  texts.forEach((ele) => ele.draw());
  
  if(!inside()){
    enableScroll();
  }else{
    disableScroll();
  }
}

function mousePressed() {
  if (!stepBlock) nextStep();
}

function mouseWheel(event) {
  if (text_box != null && inside()) {
    text_box.scroll_queue.push((event.delta > 0 ? 1 : -1) * 50);
  }
}

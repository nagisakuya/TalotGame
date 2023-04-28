let drawFunc = [];
let StepupFunc = [];
let timer = 0;


function nextStep(){
  if(step + 1 < drawFunc.length){
  timer = 0;
  step++;
  texts = [];
  if(StepupFunc[step]!=null)StepupFunc[step]();
  }
}

function addStep(func){
  drawFunc.push(func);
}
function addStepupFunc(func){
  StepupFunc[drawFunc.length] = func;
}


const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//初期
addStep();

//シャッフル
addStep(() => {
  cards.forEach((ele) => ele.shuffle());
  if(timer == 120) texts.push(new Text("Click!",0,300));
});

//集める
addStepupFunc(() => {
  stepBlock = true;
  cards.forEach((ele) => ele.speed = 0.93);
});
addStep(() => {
  cards.forEach((ele) => ele.move_to(createVector(0, 0), 0));
    if(timer == 80) nextStep();
});

//三つに分ける
addStepupFunc(() => {
  stepBlock = true;
  cards.forEach((ele) => ele.speed = 0.95);
});
addStep(() => {
  for (let i = 0; i < cards.length; i++) {
    if (i % 3 == 0) {
      cards[i].move_to(createVector(130, 0), 0);
    } else if (i % 3 == 1) {
      cards[i].move_to(createVector(-130, 0), 0);
    } else {
      cards[i].move_to(createVector(0, 0), 0);
    }
  }
  
  if(timer == 70) nextStep();
});

//集める
addStepupFunc(() => {
  cards = shuffle(cards);
});
addStep(() => {
  cards.forEach((ele) => ele.move_to(createVector(0, 0), 0));
  if(timer == 90) nextStep();
});


//引く
/* addStepupFunc(() => {
  stepBlock = true;
  cards.forEach((ele) => ele.speed = 0.95);
});
addStep(() => {
  for (let i = 0; i < cards.length; i++) {
    if (i == cards.length - 1) {
      cards[i].move_to(createVector(0, -50), 0);
    } else {
      cards[i].move_to(createVector(0, 70), 0);
    }
  }
  if(timer == 20) nextStep();
}); */

//拡大
addStep(() => {
  for (let i = 0; i < cards.length; i++) {
    if (i == cards.length - 1) {
      cards[i].move_to(createVector(0, -50), 0, 4);
    } else {
      cards[i].move_to(createVector(0, 70), 0);
    }
  }
  if(timer == 50) {
    texts.push(new Text("Click!",0,300));
    stepBlock = false;
    cards = [cards[cards.length - 1]];
  }
});

//カード反転
addStepupFunc(() => {
  stepBlock = true;
});
addStep(() => {
  cards.forEach((ele) => ele.move_to(createVector(0, -50), 0, 4, PI));
  if(timer == 80) {
    nextStep();
  }
});

addStepupFunc(() => {
  text_box = new TextBox(cardDiscription[cards[0].seed][cards[0].up?0:1], -100, -330, 450, 600);
  text_box.time = -30;
  var temp = new Text("Click here to restart",0,330)
  temp.time = -200;
  texts.push(temp);
});
addStep(() => {
  cards.forEach((ele) => ele.move_to(createVector(-250, -50 - sin(timer/100)*10), 0, 4, PI));
  if(mouseIsPressed && texts[0].inside(mouseX,mouseY)){
     reset();
     }
});

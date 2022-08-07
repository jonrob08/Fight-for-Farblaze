console.log("connected");

// Grabbing the canvas and setting/grabbing the context
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Set canvas height and width to generic browser window size
canvas.width = 1024;
canvas.height = 576;

// Filling in the canvas background with a black rectangle
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Global Variables
const wrapper = document.querySelector("#wrapper");
const charSelectScreen = document.querySelector("#character-select");
const selectKiba = document.querySelector("#select-kiba");
const selectMajor = document.querySelector("#select-major");
const selectNeji = document.querySelector("#select-neji");
const selectRenji = document.querySelector("#select-renji");
const selectSora = document.querySelector("#select-sora");
const selectVice = document.querySelector("#select-vice");
const beginSelectBtn = document.querySelector("#startmenu-btn2");
const beginBattleBtn = document.querySelector("#startchar-btn");
const mainmenu = document.getElementById("menu");
const storyOneP = document.querySelector("#startmenu-btn");
const storyTwoP = document.querySelector("#startmenu-btn3");
const restart = document.querySelector("#restart");
const aiHealth = document.querySelector("#ai-current-health");

// Setting canvas gravity
const gravity = 0.08;

// Initializing Game and Character Select Screen to display:none
wrapper.style.display = "none";
charSelectScreen.style.display = "none";

// characterSelectStart() is an onclick function used by the Main Menu "VS Mode" button
function characterSelectStart() {
  mainmenu.style.display = "none";
  charSelectScreen.style.display = "block";
}

// gameStart() is an onclick function used by the Character Select Screen "FIGHT!!!" button
function gameStart() {
  charSelectScreen.style.display = "none";
  wrapper.style.display = "block";
}

// storyMode() is an onclick function used by the Main Menu "Story Mode" buttons
function storyMode() {
  mainmenu.style.display = "none";
  wrapper.style.display = "block";
}

// restartGame() is an onclick function that restarts the game after a winner has been determined
function restartGame() {
  mainmenu.style.display = "block";
  wrapper.style.display = "none";
  window.location.reload()
}

// Cut canvas up into quadrants to be used later in AI functionality
let quadrant1 = {
  x: 0,
  y: 0,
  width: canvas.width / 2,
  height: canvas.height,
};

let quadrant2 = {
  x: quadrant1.width,
  y: 0,
  width: canvas.width / 2,
  height: canvas.height,
};

// Game Objects
// Creating Backgrounds
const background = new Sprite({
  position: {
    x: 0,
    y: -200,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/Background.png",
  scale: 1.4,
});

const background2 = new Sprite({
  position: {
    x: 1024,
    y: -200,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/Background.png",
  scale: 1.4,
});

const background3 = new Sprite({
  position: {
    x: -1024,
    y: -200,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/Background.png",
  scale: 1.4,
});

// Creating Scrolling Background
const backgroundScroll = new Sprite({
  position: {
    x: 0,
    y: -420,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/scroll.png",
  scale: 1.4,
});

// Creating Shop
const shop = new Sprite({
  position: {
    x: 650,
    y: 155,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/shop_anim.png",
  scale: 3,
  framesAmt: 6,
});

// Creating Kiba
const kiba = new Player({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/Characters/Kiba/Idle.png",
  scale: 3,
  framesAmt: 4,
  offset: {
    x: 30,
    y: 0,
  },
  sprites: {
    idle: {
      imageSrc: "./img/Characters/Kiba/Idle.png",
      framesAmt: 4,
    },
    revidle: {
      imageSrc: "./img/Characters/Kiba/rev_Idle.png",
      framesAmt: 4,
    },
    run: {
      imageSrc: "./img/Characters/Kiba/Run.png",
      framesAmt: 8,
    },
    revrun: {
      imageSrc: "./img/Characters/Kiba/rev_Run.png",
      framesAmt: 8,
    },
    jump: {
      imageSrc: "./img/Characters/Kiba/Jump.png",
      framesAmt: 2,
    },
    revjump: {
      imageSrc: "./img/Characters/Kiba/rev_Jump.png",
      framesAmt: 2,
    },
    fall: {
      imageSrc: "./img/Characters/Kiba/Fall.png",
      framesAmt: 2,
    },
    revfall: {
      imageSrc: "./img/Characters/Kiba/rev_Fall.png",
      framesAmt: 2,
    },
    attack1: {
      imageSrc: "./img/Characters/Kiba/attack1.png",
      framesAmt: 4,
    },
    revattack1: {
      imageSrc: "./img/Characters/Kiba/rev_attack1.png",
      framesAmt: 4,
    },
    attack2: {
      imageSrc: "./img/Characters/Kiba/attack2.png",
      framesAmt: 4,
    },
    revattack2: {
      imageSrc: "./img/Characters/Kiba/rev_attack2.png",
      framesAmt: 4,
    },
    takehit: {
      imageSrc: "./img/Characters/Kiba/Take_Hit.png",
      framesAmt: 4,
    },
    revtakehit: {
      imageSrc: "./img/Characters/Kiba/rev_Take_Hit.png",
      framesAmt: 4,
    },
    takehitflash: {
      imageSrc: "./img/Characters/Kiba/Take_Hit_w.png",
      framesAmt: 4,
    },
    revtakehitflash: {
      imageSrc: "./img/Characters/Kiba/rev_Take_Hit_w.png",
      framesAmt: 4,
    },
    death: {
      imageSrc: "./img/Characters/Kiba/Death.png",
      framesAmt: 4,
    },
    revdeath: {
      imageSrc: "./img/Characters/Kiba/rev_Death.png",
      framesAmt: 4,
    },
  },
  isFacing: "right",
  attackBox: {
    offset: {
      x: -30,
      y: -100,
    },
    width: 200,
    height: 50,
  },
  hitBox: {
    offset: {
      x: -100,
      y: -100,
    },
    width: 50,
    height: 100,
  },
  characterName: "Kiba",
});

console.log(kiba);

// Creating Neji
const neji = new Player({
  position: {
    x: 150,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/Characters/Neji/Idle.png",
  scale: 3,
  framesAmt: 4,
  offset: {
    x: 0,
    y: 0,
  },
  sprites: {
    idle: {
      imageSrc: "./img/Characters/Neji/Idle.png",
      framesAmt: 4,
    },
    revidle: {
      imageSrc: "./img/Characters/Neji/rev_Idle.png",
      framesAmt: 4,
    },
    run: {
      imageSrc: "./img/Characters/Neji/Run.png",
      framesAmt: 8,
    },
    revrun: {
      imageSrc: "./img/Characters/Neji/rev_Run.png",
      framesAmt: 8,
    },
    jump: {
      imageSrc: "./img/Characters/Neji/Jump.png",
      framesAmt: 2,
    },
    revjump: {
      imageSrc: "./img/Characters/Neji/rev_Jump.png",
      framesAmt: 2,
    },
    fall: {
      imageSrc: "./img/Characters/Neji/Fall.png",
      framesAmt: 2,
    },
    revfall: {
      imageSrc: "./img/Characters/Neji/rev_Fall.png",
      framesAmt: 2,
    },
    attack1: {
      imageSrc: "./img/Characters/Neji/Attack1.png",
      framesAmt: 4,
    },
    revattack1: {
      imageSrc: "./img/Characters/Neji/rev_Attack1.png",
      framesAmt: 4,
    },
    attack2: {
      imageSrc: "./img/Characters/Neji/Attack2.png",
      framesAmt: 4,
    },
    revattack2: {
      imageSrc: "./img/Characters/Neji/rev_Attack2.png",
      framesAmt: 4,
    },
    takehit: {
      imageSrc: "./img/Characters/Neji/Take_Hit.png",
      framesAmt: 4,
    },
    revtakehit: {
      imageSrc: "./img/Characters/Neji/rev_Take_Hit.png",
      framesAmt: 4,
    },
    takehitflash: {
      imageSrc: "./img/Characters/Neji/Take_Hit_w.png",
      framesAmt: 4,
    },
    revtakehitflash: {
      imageSrc: "./img/Characters/Neji/rev_Take_Hit_w.png",
      framesAmt: 4,
    },
    death: {
      imageSrc: "./img/Characters/Neji/Death.png",
      framesAmt: 4,
    },
    revdeath: {
      imageSrc: "./img/Characters/Neji/rev_Death.png",
      framesAmt: 4,
    },
  },
  isFacing: "right",
  attackBox: {
    offset: {
      x: -150,
      y: -50,
    },
    width: 110,
    height: 150,
  },
  hitBox: {
    offset: {
      x: -130,
      y: -80,
    },
    width: 50,
    height: 120,
  },
  characterName: "Neji",
});

// Creating Renji
const renji = new Player({
  position: {
    x: 150,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/Characters/Renji/Idle.png",
  scale: 3,
  framesAmt: 4,
  offset: {
    x: 0,
    y: 0,
  },
  sprites: {
    idle: {
      imageSrc: "./img/Characters/Renji/Idle.png",
      framesAmt: 4,
    },
    revidle: {
      imageSrc: "./img/Characters/Renji/rev_Idle.png",
      framesAmt: 4,
    },
    run: {
      imageSrc: "./img/Characters/Renji/Run.png",
      framesAmt: 8,
    },
    revrun: {
      imageSrc: "./img/Characters/Renji/rev_Run.png",
      framesAmt: 8,
    },
    jump: {
      imageSrc: "./img/Characters/Renji/Jump.png",
      framesAmt: 2,
    },
    revjump: {
      imageSrc: "./img/Characters/Renji/rev_Jump.png",
      framesAmt: 2,
    },
    fall: {
      imageSrc: "./img/Characters/Renji/Fall.png",
      framesAmt: 2,
    },
    revfall: {
      imageSrc: "./img/Characters/Renji/rev_Fall.png",
      framesAmt: 2,
    },
    attack1: {
      imageSrc: "./img/Characters/Renji/Attack1.png",
      framesAmt: 4,
    },
    revattack1: {
      imageSrc: "./img/Characters/Renji/rev_Attack1.png",
      framesAmt: 4,
    },
    attack2: {
      imageSrc: "./img/Characters/Renji/Attack2.png",
      framesAmt: 4,
    },
    revattack2: {
      imageSrc: "./img/Characters/Renji/rev_Attack2.png",
      framesAmt: 4,
    },
    takehit: {
      imageSrc: "./img/Characters/Renji/Take_Hit.png",
      framesAmt: 4,
    },
    revtakehit: {
      imageSrc: "./img/Characters/Renji/rev_Take_Hit.png",
      framesAmt: 4,
    },
    takehitflash: {
      imageSrc: "./img/Characters/Renji/Take_Hit_w.png",
      framesAmt: 4,
    },
    revtakehitflash: {
      imageSrc: "./img/Characters/Renji/rev_Take_Hit_w.png",
      framesAmt: 4,
    },
    death: {
      imageSrc: "./img/Characters/Renji/Death.png",
      framesAmt: 4,
    },
    revdeath: {
      imageSrc: "./img/Characters/Renji/rev_Death.png",
      framesAmt: 4,
    },
  },
  isFacing: "right",
  attackBox: {
    offset: {
      x: -150,
      y: -50,
    },
    width: 110,
    height: 150,
  },
  hitBox: {
    offset: {
      x: -130,
      y: -80,
    },
    width: 50,
    height: 120,
  },
  characterName: "Renji",
});

// Creating Major
const major = new AI({
  position: {
    x: 700,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: -8,
  },
  imageSrc: "./img/Characters/Major/Idle.png",
  scale: 3,
  framesAmt: 4,
  sprites: {
    idle: {
      imageSrc: "./img/Characters/Major/Idle.png",
      framesAmt: 4,
    },
    revidle: {
      imageSrc: "./img/Characters/Major/rev_Idle.png",
      framesAmt: 4,
    },
    run: {
      imageSrc: "./img/Characters/Major/Run.png",
      framesAmt: 8,
    },
    revrun: {
      imageSrc: "./img/Characters/Major/rev_Run.png",
      framesAmt: 8,
    },
    jump: {
      imageSrc: "./img/Characters/Major/Jump.png",
      framesAmt: 2,
    },
    revjump: {
      imageSrc: "./img/Characters/Major/rev_Jump.png",
      framesAmt: 2,
    },
    fall: {
      imageSrc: "./img/Characters/Major/Fall.png",
      framesAmt: 2,
    },
    revfall: {
      imageSrc: "./img/Characters/Major/rev_Fall.png",
      framesAmt: 2,
    },
    attack1: {
      imageSrc: "./img/Characters/Major/Attack1.png",
      framesAmt: 4,
    },
    revattack1: {
      imageSrc: "./img/Characters/Major/rev_Attack1.png",
      framesAmt: 4,
    },
    attack2: {
      imageSrc: "./img/Characters/Major/Attack2.png",
      framesAmt: 4,
    },
    revattack2: {
      imageSrc: "./img/Characters/Major/rev_Attack2.png",
      framesAmt: 4,
    },
    takehit: {
      imageSrc: "./img/Characters/Major/Take_Hit.png",
      framesAmt: 4,
    },
    revtakehit: {
      imageSrc: "./img/Characters/Major/rev_Take_Hit.png",
      framesAmt: 4,
    },
    takehitflash: {
      imageSrc: "./img/Characters/Major/Take_Hit_w.png",
      framesAmt: 4,
    },
    revtakehitflash: {
      imageSrc: "./img/Characters/Major/rev_Take_Hit_w.png",
      framesAmt: 4,
    },
    death: {
      imageSrc: "./img/Characters/Major/Death.png",
      framesAmt: 4,
    },
    revdeath: {
      imageSrc: "./img/Characters/Major/rev_Death.png",
      framesAmt: 4,
    },
  },
  isFacing: "left",
  attackBox: {
    offset: {
      x: -40,
      y: -80,
    },
    width: 200, //200?
    height: 80,
  },
  hitBox: {
    offset: {
      x: -120,
      y: -80,
    },
    width: 50,
    height: 120,
  },
  characterName: "Major",
  aggroBox: {
    offset: {
      x: -50,
      y: -100,
    },
    width: -450,
    height: 30,
  },
});

// Creating Vice
const vice = new AI({
  position: {
    x: 600,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 25,
  },
  imageSrc: "./img/Characters/Vice/Idle.png",
  scale: 3,
  framesAmt: 4,
  sprites: {
    idle: {
      imageSrc: "./img/Characters/Vice/Idle.png",
      framesAmt: 4,
    },
    revidle: {
      imageSrc: "./img/Characters/Vice/rev_Idle.png",
      framesAmt: 4,
    },
    run: {
      imageSrc: "./img/Characters/Vice/Run.png",
      framesAmt: 8,
    },
    revrun: {
      imageSrc: "./img/Characters/Vice/rev_Run.png",
      framesAmt: 8,
    },
    jump: {
      imageSrc: "./img/Characters/Vice/Jump.png",
      framesAmt: 2,
    },
    revjump: {
      imageSrc: "./img/Characters/Vice/rev_Jump.png",
      framesAmt: 2,
    },
    fall: {
      imageSrc: "./img/Characters/Vice/Fall.png",
      framesAmt: 2,
    },
    revfall: {
      imageSrc: "./img/Characters/Vice/rev_Fall.png",
      framesAmt: 2,
    },
    attack1: {
      imageSrc: "./img/Characters/Vice/Attack1.png",
      framesAmt: 4,
    },
    revattack1: {
      imageSrc: "./img/Characters/Vice/rev_Attack1.png",
      framesAmt: 4,
    },
    attack2: {
      imageSrc: "./img/Characters/Vice/Attack2.png",
      framesAmt: 4,
    },
    revattack2: {
      imageSrc: "./img/Characters/Vice/rev_Attack2.png",
      framesAmt: 4,
    },
    takehit: {
      imageSrc: "./img/Characters/Vice/Take_Hit.png",
      framesAmt: 4,
    },
    revtakehit: {
      imageSrc: "./img/Characters/Vice/rev_Take_Hit.png",
      framesAmt: 4,
    },
    takehitflash: {
      imageSrc: "./img/Characters/Vice/Take_Hit_w.png",
      framesAmt: 4,
    },
    revtakehitflash: {
      imageSrc: "./img/Characters/Vice/rev_Take_Hit_w.png",
      framesAmt: 4,
    },
    death: {
      imageSrc: "./img/Characters/Vice/Death.png",
      framesAmt: 4,
    },
    revdeath: {
      imageSrc: "./img/Characters/Vice/rev_Death.png",
      framesAmt: 4,
    },
  },
  isFacing: "left",
  attackBox: {
    offset: {
      x: -40,
      y: -80,
    },
    width: 200, //200?
    height: 80,
  },
  hitBox: {
    offset: {
      x: -120,
      y: -80,
    },
    width: 50,
    height: 120,
  },
  characterName: "Vice",
  aggroBox: {
    offset: {
      x: -50,
      y: -100,
    },
    width: -450,
    height: 30,
  },
});

// Creating Sora
const sora = new AI({
  position: {
    x: 600,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 10,
  },
  imageSrc: "./img/Characters/Sora/Idle.png",
  scale: 3,
  framesAmt: 4,
  sprites: {
    idle: {
      imageSrc: "./img/Characters/Sora/Idle.png",
      framesAmt: 4,
    },
    revidle: {
      imageSrc: "./img/Characters/Sora/rev_Idle.png",
      framesAmt: 4,
    },
    run: {
      imageSrc: "./img/Characters/Sora/Run.png",
      framesAmt: 8,
    },
    revrun: {
      imageSrc: "./img/Characters/Sora/rev_Run.png",
      framesAmt: 8,
    },
    jump: {
      imageSrc: "./img/Characters/Sora/Jump.png",
      framesAmt: 2,
    },
    revjump: {
      imageSrc: "./img/Characters/Sora/rev_Jump.png",
      framesAmt: 2,
    },
    fall: {
      imageSrc: "./img/Characters/Sora/Fall.png",
      framesAmt: 2,
    },
    revfall: {
      imageSrc: "./img/Characters/Sora/rev_Fall.png",
      framesAmt: 2,
    },
    attack1: {
      imageSrc: "./img/Characters/Sora/Attack1.png",
      framesAmt: 4,
    },
    revattack1: {
      imageSrc: "./img/Characters/Sora/rev_Attack1.png",
      framesAmt: 4,
    },
    attack2: {
      imageSrc: "./img/Characters/Sora/Attack2.png",
      framesAmt: 4,
    },
    revattack2: {
      imageSrc: "./img/Characters/Sora/rev_Attack2.png",
      framesAmt: 4,
    },
    takehit: {
      imageSrc: "./img/Characters/Sora/Take_Hit.png",
      framesAmt: 4,
    },
    revtakehit: {
      imageSrc: "./img/Characters/Sora/rev_Take_Hit.png",
      framesAmt: 4,
    },
    takehitflash: {
      imageSrc: "./img/Characters/Sora/Take_Hit_w.png",
      framesAmt: 4,
    },
    revtakehitflash: {
      imageSrc: "./img/Characters/Sora/rev_Take_Hit_w.png",
      framesAmt: 4,
    },
    death: {
      imageSrc: "./img/Characters/Sora/Death.png",
      framesAmt: 4,
    },
    revdeath: {
      imageSrc: "./img/Characters/Sora/rev_Death.png",
      framesAmt: 4,
    },
  },
  isFacing: "left",
  attackBox: {
    offset: {
      x: -40,
      y: -80,
    },
    width: 200, //200?
    height: 80,
  },
  hitBox: {
    offset: {
      x: -120,
      y: -80,
    },
    width: 50,
    height: 120,
  },
  characterName: "Sora",
  aggroBox: {
    offset: {
      x: -50,
      y: -100,
    },
    width: -450,
    height: 30,
  },
});

console.log(major);

// Character Select Screen Event Listeners
let charOne = null;
let charTwo = null;
let enemies = [major, vice, sora];

selectKiba.addEventListener("click", () => {
  if (charOne === null) {
    charOne = kiba;
  } else {
    charTwo = kiba;
  }
});

selectNeji.addEventListener("click", () => {
  if (charOne === null) {
    charOne = neji;
  } else {
    charTwo = neji;
  }
});

selectRenji.addEventListener("click", () => {
  if (charOne === null) {
    charOne = renji;
  } else {
    charTwo = renji;
  }
});

selectMajor.addEventListener("click", () => {
  if (charOne === null) {
    charOne = major;
  } else {
    charTwo = major;
  }
});

selectSora.addEventListener("click", () => {
  if (charOne === null) {
    charOne = sora;
  } else {
    charTwo = sora;
  }
});

selectVice.addEventListener("click", () => {
  if (charOne === null) {
    charOne = vice;
  } else {
    charTwo = vice;
  }
});


// Begin VS Mode
beginBattleBtn.addEventListener("click", () => {
  if (charOne === null || charTwo === null) {
    return;
  } else {
    animateVS(charOne, charTwo);
  }
});

// Begin Story Mode (1P)
storyOneP.addEventListener("click", () => {
  animateStoryOneP();
});

// Begin Story Mode (2P)
storyTwoP.addEventListener("click", () => {
  animateStoryTwoP();
});

// Setting up Key monitor
const keys = {
  // P1
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  f: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
  // P2
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
  ArrowDown: {
    pressed: false,
  },
  // Testing Enemy Movement
  j: {
    pressed: false,
  },
  l: {
    pressed: false,
  },
  i: {
    pressed: false,
  },
};

const rectCollisionDetect = function ({ rectangle1, rectangle2 }) {
  if (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height
  ) {
    console.log("yep");
  }
};

const attackDetect = function ({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x <=
      rectangle2.hitBox.position.x + rectangle2.hitBox.width &&
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.hitBox.position.x
  );
};

const aggroAICollisionDetect = function ({ rectangle1, rectangle2 }) {
  // console.log(rectangle1.aggroBox.position.x, rectangle1.aggroBox.width, rectangle2.position.x)
  // return (
  //     rectangle1.aggroBox.position.x + rectangle1.aggroBox.width >= rectangle2.position.x &&
  //     rectangle1.aggroBox.position.x <= rectangle2.position.x + rectangle2.width &&
  //     rectangle1.aggroBox.position.y + rectangle1.aggroBox.height >= rectangle2.position.y &&
  //     rectangle1.aggroBox.position.y <= rectangle2.position.y + rectangle2.height
  //     );
  return (
    rectangle1.aggroBox.position.x >=
      rectangle2.hitBox.position.x + rectangle2.hitBox.width &&
    rectangle1.aggroBox.position.x + rectangle1.aggroBox.width <=
      rectangle2.hitBox.position.x
  );
};

const attackCollisionDetect = function (attacker, target) {
  // attacker.status = 'player'
  // target.status = 'ai'
  if (
    attackDetect({ rectangle1: attacker, rectangle2: target }) &&
    attacker.isAttacking &&
    attacker.framesCur === 1
  ) {
    target.takehit();
    gsap.to(`#${target.status}-current-health`, {
      width: target.health + "%",
    });

    attacker.isAttacking = false;
    console.log("Attacker Hit!");
  }

  // If player misses
  if (attacker.isAttacking && attacker.framesCur === 1) {
    attacker.isAttacking = false;
    console.log("missed");
  }
};

// const rectCollisionDetect = function (player1, player2, ai) {
//   let ab = player1.attackBox.position.x;
//   let ba = ai.hitBox.position.x + ai.hitBox.width;
//   let ac = player1.attackBox.position.x + player1.attackBox.width;
//   let ca = ai.hitBox.position.x;
//   let ad = player1.attackBox.position.y;
//   let da = ai.hitBox.position.y + ai.height;
//   let ae = player1.attackBox.position.y + player1.attackBox.height;
//   let ea = ai.hitBox.position.y;

//   let zb = player2.attackBox.position.x;
//   let bz = ai.hitBox.position.x + ai.hitBox.width;
//   let zc = player2.attackBox.position.x + player2.attackBox.width;
//   let cz = ai.hitBox.position.x;
//   let zd = player2.attackBox.position.y;
//   let dz = ai.hitBox.position.y + ai.height;
//   let ze = player2.attackBox.position.y + player2.attackBox.height;
//   let ez = ai.hitBox.position.y;

//   let mb = ai.attackBox.position.x;
//   let bm = player1.hitBox.position.x + player1.hitBox.width;
//   let mc = ai.attackBox.position.x + ai.attackBox.width;
//   let cm = player1.hitBox.position.x;
//   let md = ai.attackBox.position.y;
//   let dm = player1.hitBox.position.y + player1.height;
//   let me = ai.attackBox.position.y + ai.attackBox.height;
//   let em = player1.hitBox.position.y;

//   let jb = ai.attackBox.position.x;
//   let bj = player2.hitBox.position.x + player2.hitBox.width;
//   let jc = ai.attackBox.position.x + ai.attackBox.width;
//   let cj = player2.hitBox.position.x;
//   let jd = ai.attackBox.position.y;
//   let dj = player2.hitBox.position.y + player2.height;
//   let je = ai.attackBox.position.y + ai.attackBox.height;
//   let ej = player2.hitBox.position.y;

//   if (
//     ab < ba &&
//     ac > ca &&
//     ad < da &&
//     ae > ea &&
//     player1.isAttacking &&
//     player1.framesCur === 2
//   ) {
//     ai.takehit();
//     player1.isAttacking = false;

//     console.log("player1 Hit!");
//   }

//   if (
//     zb < bz &&
//     zc > cz &&
//     zd < dz &&
//     ze > ez &&
//     player2.isAttacking &&
//     player2.framesCur === 2
//   ) {
//     ai.takehit();
//     player2.isAttacking = false;

//     console.log("player2 Hit!");
//   }

//   if (
//     mb < bm &&
//     mc > cm &&
//     md < dm &&
//     me > em &&
//     ai.isAttacking &&
//     ai.framesCur === 2
//   ) {
//     player1.takehit();
//     ai.isAttacking = false;

//     console.log("AI Hit P1!");
//   }

//   if (
//     jb < bj &&
//     jc > cj &&
//     jd < dj &&
//     je > ej &&
//     ai.isAttacking &&
//     ai.framesCur === 2
//   ) {
//     player2.takehit();
//     ai.isAttacking = false;

//     console.log("AI Hit P2!");

// If player misses
//   if (player1.isAttacking && player1.framesCur === 2) {
//     player1.isAttacking = false;
//     console.log("missed");
//   }

//   if (player2.isAttacking && player2.framesCur === 2) {
//     player2.isAttacking = false;
//     console.log("missed");
//   }

//   if (ai.isAttacking && ai.framesCur === 2) {
//     ai.isAttacking = false;
//     console.log("missed");
//   }

// if (
//     ab > ba &&
//     ac < ca&&
//     ad > da &&
//     ae < ea
//   ) {
//     // comp1.velocity.x = -2
//     console.log('move left')
//   }

/**
 * Decreasing the timer function - I'm adding this function in so there is a sense of urgency, also so that there is a default win condition that will always happen. Also, because a timer in a fighting game is pretty standard.
 */

// const displayResults = function(player1, player2) {
//     clearTimeout(timerId)
//     if (enemy.health === playerOne.health && playerTwo.health){
//         document.getElementById('results').innerHTML = 'Tie?? Are you even trying?'
//     } else if (enemy.health === 0) {
//         document.getElementById('results').innerHTML = 'Heroes Win!'
//     } else if (playerOne.health === 0 || playerTwo.health === 0) {
//         document.getElementById('results').innerHTML = 'Heroes Lose!'
//     }
// }

function displayResults(player1, player2) {
  clearTimeout(timerId);
  if (player2.health === player1.health) {
    document.getElementById("results").innerHTML = "<button id='restart' onclick='restartGame()'>Tie??</button>";
  } else if (player1.health <= 0) {
    document.getElementById("results").innerHTML = `<button id='restart' onclick='restartGame()'>${player2.characterName} Wins! </button>`;
  } else if (player2.health <= 0) {
    document.getElementById("results").innerHTML = `<button id='restart' onclick='restartGame()'>${player1.characterName} Wins! </button>`;
  }
};

let timer = 99;
let timerId = 0;

function decreaseTimer(player1, player2) {
  timerId = setTimeout(decreaseTimer, 1000);
  if (timer > 0) {
    timer--;
    document.getElementById("timer").innerHTML = timer;
  }

  // End the game based on time
  if (timer === 0) {
    if (player1.health === player2.health) {
      document.getElementById("results").innerHTML = "<button id='restart' onclick='restartGame()'>Tie??</button>";
    } else if (player1.health < player2.health) {
      document.getElementById("results").innerHTML = `<button id='restart' onclick='restartGame()'>${player2.characterName} Wins! </button>`;
    } else if (player1.health < player2.health) {
      document.getElementById("results").innerHTML = `<button id='restart' onclick='restartGame()'>${player1.characterName} Wins! </button>`;
    }
}
}

function winnerByCombat(player1, player2) {
  if (player1.health <= 0 || player2.health <= 0) {
    displayResults(player1, player2);
  }
}

const movement = function (player1, player2) {

  
  window.addEventListener("keydown", (e) => {
    if (!player1.dead) {
      switch (e.key) {
        // Player 1 Keys
        case "d":
          keys.d.pressed = true;
          player1.isFacing = "right";
          player1.lastKey = "d";
          break;
        case "a":
          keys.a.pressed = true;
          player1.isFacing = "left";
          player1.lastKey = "a";
          break;
        case "w":
          keys.w.pressed = true;
          player1.velocity.y = -6.5;
          break;
        case " ":
          keys.space.pressed = true;
          player1.attack();
          break;
      }
    }
    if (!player2.dead) {
      switch (e.key) {
        // Player 2 Keys
        case "ArrowRight":
          keys.ArrowRight.pressed = true;
          player2.isFacing = "right";
          player2.lastKey = "ArrowRight";
          break;
        case "ArrowLeft":
          keys.ArrowLeft.pressed = true;
          player2.isFacing = "left";
          player2.lastKey = "ArrowLeft";
          break;
        case "ArrowUp":
          keys.ArrowUp.pressed = true;
          player2.velocity.y = -6.5;
          break;
        case "ArrowDown":
          player2.attack();
          break;
      }
    }
    //   if (!major.dead) {
    //     switch (e.keyCode) {
    //       // test cases for enemy movement and attacks
    //       case "l":
    //         keys.l.pressed = true;
    //         major.isFacing = "right";
    //         major.lastKey = "l";
    //         break;
    //       case "j":
    //         keys.j.pressed = true;
    //         major.isFacing = "left";
    //         major.lastKey = "j";
    //         break;
    //       case "i":
    //         keys.i.pressed = true;
    //         major.velocity.y = -6.5;
    //         break;
    //       case "k":
    //         major.attack();
    //         break;
    //     }
    //   }
  });

  window.addEventListener("keyup", (e) => {
    // Player 1 Keys
    switch (e.key) {
      case "d":
        keys.d.pressed = false;
        background.velocity.x = 0;
        background2.velocity.x = 0;
        background3.velocity.x = 0;
        backgroundScroll.velocity.x = 0;
        shop.velocity.x = 0;

        break;
      case "a":
        keys.a.pressed = false;
        background.velocity.x = 0;
        background2.velocity.x = 0;
        background3.velocity.x = 0;
        backgroundScroll.velocity.x = 0;
        shop.velocity.x = 0;

        break;
      case "w":
        keys.w.pressed = false;
        break;
      case " ":
        keys.space.pressed = false;
        break;

      // Player 2 Keys
      case "ArrowRight":
        keys.ArrowRight.pressed = false;
        background.velocity.x = 0;
        background2.velocity.x = 0;
        background3.velocity.x = 0;
        backgroundScroll.velocity.x = 0;
        shop.velocity.x = 0;
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = false;
        background.velocity.x = 0;
        background2.velocity.x = 0;
        background3.velocity.x = 0;
        backgroundScroll.velocity.x = 0;
        shop.velocity.x = 0;
        break;
      case "ArrowUp":
        keys.ArrowUp.pressed = false;
        break;
      case "l":
        keys.l.pressed = false;
        break;
      case "j":
        keys.j.pressed = false;
        break;
      case "i":
        keys.i.pressed = false;
        break;
    }
  });

  // Set each player's velocity to 0
  if ((player1.velocity.x = 0 && player1.isFacing === "right")) {
    player1.switchSprite("idle");
  }

  // if(playerTwo.velocity.x = 0){
  //     playerTwo.switchSprite('idle')
  // }

  if ((player2.velocity.x = 0 && player2.isFacing === "left")) {
    player2.switchSprite("revidle");
  }

  // Player 1 Movement

  if (keys.a.pressed && player1.position.x >= 20) {
    player1.velocity.x = -3;
    player1.switchSprite("revrun");
  } else if (keys.a.pressed && player1.position.x <= 20) {
    background.velocity.x += 0.02;
    background2.velocity.x += 0.02;
    background3.velocity.x += 0.02;
    shop.velocity.x += 0.02;
    // backgroundScroll.velocity.x += .001
    player1.switchSprite("revrun");
  } else if (keys.d.pressed && player1.position.x < 700) {
    player1.velocity.x = 3;
    player1.switchSprite("run");
  } else if (keys.d.pressed && player1.position.x >= 700) {
    background.velocity.x -= 0.02;
    background2.velocity.x -= 0.02;
    background3.velocity.x -= 0.02;
    shop.velocity.x -= 0.02;
    // backgroundScroll.velocity.x -= .001
    player1.switchSprite("run");
  } else if (player1.lastKey === "a") {
    player1.switchSprite("revidle");
  } else {
    player1.switchSprite("idle");
  }

  if (player1.velocity.y < 0 && player1.isFacing === "right") {
    player1.switchSprite("jump");
  } else if (player1.velocity.y < 0 && player1.isFacing === "left") {
    player1.switchSprite("revjump");
  } else if (player1.velocity.y > 0 && player1.isFacing === "right") {
    player1.switchSprite("fall");
  } else if (player1.velocity.y > 0 && player1.isFacing === "left") {
    player1.switchSprite("revfall");
  }

  // Player 2 Movement

  if (keys.ArrowLeft.pressed && player2.position.x >= 100) {
    player2.velocity.x = -3;
    player2.switchSprite("revrun");
  } else if (keys.ArrowLeft.pressed && player2.position.x <= 100) {
    background.velocity.x += 0.002;
    background2.velocity.x += 0.002;
    background3.velocity.x += 0.002;
    shop.velocity.x += 0.002;
    player2.switchSprite("revrun");
  } else if (keys.ArrowRight.pressed && player2.position.x < 700) {
    player2.velocity.x = 3;
    player2.switchSprite("run");
  } else if (keys.ArrowRight.pressed && player2.position.x >= 700) {
    background.velocity.x -= 0.002;
    background2.velocity.x -= 0.002;
    background3.velocity.x -= 0.002;
    shop.velocity.x -= 0.002;
    player2.switchSprite("run");
  } else if (player2.lastKey === "a") {
    player2.switchSprite("revidle");
  } else {
    player2.switchSprite("idle");
  }

  if (player2.velocity.y < 0 && player2.isFacing === "right") {
    player2.switchSprite("jump");
  } else if (player2.velocity.y < 0 && player2.isFacing === "left") {
    player2.switchSprite("revjump");
  } else if (player2.velocity.y > 0 && player2.isFacing === "right") {
    player2.switchSprite("fall");
  } else if (player2.velocity.y > 0 && player2.isFacing === "left") {
    player2.switchSprite("revfall");
  }
};



/** Animate function - This recursive function "animates" the canvas in our browser window by calling itself and refreshes the frame by 

    -Reference: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 */
function animateVS() {
  // Call window.requestAnimationFrame() and pass in animate to refresh the canvas constantly
  window.requestAnimationFrame(animateVS);
  // Set the fill style to black
  ctx.fillStyle = "black";
  // Fill the entire area of the canvas with a black rectangle
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Draw background continuously
  background.update();
  background2.update();
  background3.update();
  // if (background.position.x)
  // Draw shop
  shop.update();
  // Draw and animate player 1
  charOne.update();
  charOne.status = "player";
  // Draw and animate player 2
  charTwo.update();
  charTwo.status = "ai";

  // Add player movement
  movement(charOne, charTwo);
  attackCollisionDetect(charOne, charTwo);
  attackCollisionDetect(charTwo, charOne);

  // End the game based on health:
  winnerByCombat(charOne, charTwo)

}

function animateStoryOneP() {
  // Call window.requestAnimationFrame() and pass in animate to refresh the canvas constantly
  window.requestAnimationFrame(animateStoryOneP);
  // Set the fill style to black
  ctx.fillStyle = "black";
  // Fill the entire area of the canvas with a black rectangle
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Draw background continuously
  background.update();
  background2.update();
  background3.update();
  // if (background.position.x)
  
  // Draw shop
  shop.update();
  // Draw and animate player 1
  kiba.update();
  kiba.status = "player";

  // Draw and animate enemy
  // if (!major.dead) {
    major.status = "ai";
    major.updateState(kiba);
    major.updateState(neji);
    major.update();
  // } else if (major.dead) {
  //   gsap.to(`#ai-current-health`, {
  //     width: vice.health + "%",
  //   });
  //   vice.status = "ai";
  //   vice.updateState(kiba);
  //   vice.updateState(neji);
  //   vice.update();
  // } else if (vice.dead) {
  //   sora.status = "ai";
  //   sora.updateState(kiba);
  //   sora.updateState(neji);
  //   sora.update();
  // }

  for (const enemy of enemies) {
    attackCollisionDetect(kiba, enemy);
  }

  // for (const enemy of enemies){
  //   if(!enemy.dead)
  //   enemy.status = 'ai'
  //   enemy.updateState(charOne)
  //   enemy.updateState(charTwo)
  //   enemy.update()
  //   // console.log(enemies[0])
  // }

  // Add player movement
  movement(kiba, neji);

   attackCollisionDetect(kiba, vice)
   attackCollisionDetect(kiba, sora)
   attackCollisionDetect(kiba, major)
   attackCollisionDetect(major, kiba)
  // Collision Detection - Player 2
  //  attackCollisionDetect(major, kiba)

  // Collision Detection - Player 2

  // End the game based on health:
  winnerByCombat(kiba, major)
  winnerByCombat(major, kiba)
}

function animateStoryTwoP() {
  // Call window.requestAnimationFrame() and pass in animate to refresh the canvas constantly
  window.requestAnimationFrame(animateStoryTwoP);
  // Set the fill style to black
  ctx.fillStyle = "black";
  // Fill the entire area of the canvas with a black rectangle
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Draw background continuously
  background.update();
  background2.update();
  background3.update();
  // if (background.position.x)
  // Draw shop
  shop.update();
  // Draw and animate player 1
  kiba.update();
  kiba.status = "player";
  // Draw and animate player 2
  neji.update();
  neji.status = "player";

  // Draw and animate enemy
  if (!major.dead) {
    major.status = "ai";
    major.updateState(kiba);
    major.updateState(neji);
    major.update();
  } else if (major.dead) {
    vice.status = "ai";
    vice.updateState(kiba);
    vice.updateState(neji);
    vice.update();
  } else if (vice.dead) {
    sora.status = "ai";
    sora.updateState(kiba);
    sora.updateState(neji);
    sora.update();
  }
  // for (const enemy of enemies){
  //   if(!enemy.dead)
  //   enemy.status = 'ai'
  //   enemy.updateState(charOne)
  //   enemy.updateState(charTwo)
  //   enemy.update()
  //   // console.log(enemies[0])
  // }

  attackCollisionDetect(kiba, major);
  attackCollisionDetect(neji, major);
  attackCollisionDetect(major, kiba);
  attackCollisionDetect(major, neji);

  // for (const enemy of enemies) {
    attackCollisionDetect(kiba, vice);
    attackCollisionDetect(neji, vice);
    attackCollisionDetect(vice, kiba);
    attackCollisionDetect(vice, neji);
  // }

  attackCollisionDetect(kiba, sora);
  attackCollisionDetect(neji, sora);
  attackCollisionDetect(sora, kiba);
  attackCollisionDetect(sora, neji);

  // Add player movement
  movement(kiba, neji);
  // backgroundScroll.update();
  // major.calculateDistanceBetween(kiba)
  // Collision Detection - Player 1
  // rectCollisionDetect(neji, kiba, major)
  // Collision Detection - Player 1
  //  attackCollisionDetect(kiba, major)
  // Collision Detection - Player 2
  //  attackCollisionDetect(major, kiba)

  // Collision Detection - Player 2

  // End the game based on health:
  // winnerByCombat(charOne, enemies)
  // winnerByCombat(enemies, charOne)
}

decreaseTimer(kiba, major);


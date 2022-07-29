console.log("connected");

// Grabbing the canvas and setting/grabbing the context
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Set canvas height and width to generic browser window size
canvas.width = 1024;
canvas.height = 576;

// Filling in the canvas background with a black rectangle
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Setting canvas gravity
const gravity = 0.08;

// Creating Background
const background = new Sprite({
  position: {
    x: 0,
    y: -200,
  },
  imageSrc: "./img/Background.png",
  scale: 1.4,
});

// Character Select Screen
const selectCharacter = new Sprite({
  position: {
    x: 0,
    y: -200,
  },
  imageSrc: "./img/Background.png",
  scale: 1.4,
});

// Creating Shop
const shop = new Sprite({
  position: {
    x: 650,
    y: 155,
  },
  imageSrc: "./img/shop_anim.png",
  scale: 3,
  framesAmt: 6,
});

// Creating Player One
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
      y: -120,
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
  characterName: "kiba",
});

console.log(kiba);

// Creating Player Two
// const playerTwo = new Player({
//     position: {
//         x: 150,
//         y: 0
//     },
//     velocity: {
//         x: 0,
//         y: 0
//     },
//     offset: {
//         x: 0,
//         y: 0
//     },
//     imageSrc: './img/Characters/Neji/Idle.png',
//     scale: 3,
//     framesAmt: 4,
//     sprites: {
//         idle: {
//             imageSrc: './img/Characters/Neji/Idle.png',
//             framesAmt: 4
//         },
//         revidle: {
//             imageSrc: './img/Characters/Neji/rev_Idle.png',
//             framesAmt: 4
//         },
//         run: {
//             imageSrc: './img/Characters/Neji/Run.png',
//             framesAmt: 8
//         },
//         revrun: {
//             imageSrc: './img/Characters/Neji/rev_Run.png',
//             framesAmt: 8
//         },
//         jump: {
//             imageSrc: './img/Characters/Neji/Jump.png',
//             framesAmt: 2
//         },
//         revjump: {
//             imageSrc: './img/Characters/Neji/rev_Jump.png',
//             framesAmt: 2
//         },
//         fall: {
//             imageSrc: './img/Characters/Neji/Fall.png',
//             framesAmt: 2
//         },
//         revfall: {
//             imageSrc: './img/Characters/Neji/rev_Fall.png',
//             framesAmt: 2
//         },
//         attack1: {
//             imageSrc: './img/Characters/Neji/Attack1.png',
//             framesAmt: 4
//         },
//         revattack1: {
//             imageSrc: './img/Characters/Neji/rev_Attack1.png',
//             framesAmt: 4
//         },
//     },
//     isFacing: 'right',
//     hitBox: {
//         offset: {
//             x: 0,
//             y: 0
//         },
//         width: 100,
//         height: 50
//     }
// })

// Creating Enemy
const major = new Player({
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
  characterName: "major",
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

const rectCollisionDetect = function (attacker, target) {
  let ab = attacker.attackBox.position.x;
  let ba = target.hitBox.position.x + target.hitBox.width;
  let ac = attacker.attackBox.position.x + attacker.attackBox.width;
  let ca = target.hitBox.position.x;
  let ad = attacker.attackBox.position.y;
  let da = target.hitBox.position.y + target.height;
  let ae = attacker.attackBox.position.y + attacker.attackBox.height;
  let ea = target.hitBox.position.y;

  if (
    ab < ba &&
    ac > ca &&
    ad < da &&
    ae > ea &&
    attacker.isAttacking &&
    attacker.framesCur === 2
  ) {
    target.takehit();
    attacker.isAttacking = false;

    console.log("Attacker Hit!");
  }

  // If player misses
  if (attacker.isAttacking && attacker.framesCur === 2) {
    attacker.isAttacking = false;
    console.log("missed");
  }
};

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

const displayResults = function(player1, player2) {
    clearTimeout(timerId)
    if (player2.health === player1.health){
        document.getElementById('results').innerHTML = 'Tie?? Are you even trying?'
    } else if (player2.health === 0) {
        document.getElementById('results').innerHTML = 'Heroes Win!'
    } else if (player1.health === 0) {
        document.getElementById('results').innerHTML = 'Heroes Lose!'
    }
}

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
    displayResults(player1, player2);
  }
}

function winnerByCombat(player1, player2) {
      if (player1.health <= 0 || player2.health <= 0){
      displayResults(player1, player2)
    }
}

const movement = function (player1, player2) {
    window.addEventListener("keydown", (e) => {
    if (!player1.dead){
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
          player1.attack();
          break;
      }
    }
    if (!player2.dead){
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
        // test cases for enemy movement and attacks
        // case "l":
        //   keys.l.pressed = true;
        //   major.isFacing = "right";
        //   major.lastKey = "l";
        //   break;
        // case "j":
        //   keys.j.pressed = true;
        //   major.isFacing = "left";
        //   major.lastKey = "j";
        //   break;
        // case "i":
        //   keys.i.pressed = true;
        //   major.velocity.y = -6.5;
        //   break;
        // case "k":
        //   major.attack();
        //   break;
      }
    }
    });
    
    window.addEventListener("keyup", (e) => {
      // Player 1 Keys
      switch (e.key) {
        case "d":
          keys.d.pressed = false;
          break;
        case "a":
          keys.a.pressed = false;
          break;
        case "w":
          keys.w.pressed = false;
          break;
        // Player 2 Keys
        case "ArrowRight":
          keys.ArrowRight.pressed = false;
          break;
        case "ArrowLeft":
          keys.ArrowLeft.pressed = false;
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
  if (player1.velocity.x = 0 && player1.isFacing === "right") {
    player1.switchSprite("idle");
  }

  // if(playerTwo.velocity.x = 0){
  //     playerTwo.switchSprite('idle')
  // }

  if (player2.velocity.x = 0 && player2.isFacing === "left") {
    player2.switchSprite("revidle");
  }
    
      // Player 1 Movement
    
      if (keys.a.pressed && player1.lastKey === "a") {
        player1.velocity.x = -3;
        player1.switchSprite("revrun");
      } else if (keys.d.pressed && player1.lastKey === "d") {
        player1.velocity.x = 3;
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
    
      if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
          player2.velocity.x = -3
          player2.switchSprite('revrun')
      } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
          player2.velocity.x = 3
          player2.switchSprite('run')
      } else if (player2.lastKey === 'ArrowLeft') {
          player2.switchSprite('revidle')
      } else {
          player2.switchSprite('idle')
      }
    
      if (player2.velocity.y < 0 && player2.isFacing === 'right') {
          player2.switchSprite('jump')
      } else if (player2.velocity.y < 0 && player2.isFacing === 'left') {
          player2.switchSprite('revjump')
      } else if (player2.velocity.y > 0 && player2.isFacing === 'right') {
          player2.switchSprite('fall')
      } else if (player2.velocity.y > 0 && player2.isFacing === 'left') {
          player2.switchSprite('revfall')
      }
    
      // Player 3 Movement
    //   if (keys.j.pressed && major.lastKey === "j") {
    //     major.velocity.x = -3;
    //     major.switchSprite("revrun");
    //   } else if (keys.l.pressed && major.lastKey === "l") {
    //     major.velocity.x = 3;
    //     major.switchSprite("run");
    //   } else if (major.lastKey === "j") {
    //     major.switchSprite("revidle");
    //   } else {
    //     major.switchSprite("idle");
    //   }
    
    //   if (major.velocity.y < 0 && major.isFacing === "right") {
    //     major.switchSprite("jump");
    //   } else if (major.velocity.y < 0 && major.isFacing === "left") {
    //     major.switchSprite("revjump");
    //   } else if (major.velocity.y > 0 && major.isFacing === "right") {
    //     major.switchSprite("fall");
    //   } else if (major.velocity.y > 0 && major.isFacing === "left") {
    //     major.switchSprite("revfall");
    //   }
    
    
    
    }
    


/** Animate function - This recursive function "animates" the canvas in our browser window by calling itself and refreshes the frame by 

    -Reference: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 */
function animate() {
  // Call window.requestAnimationFrame() and pass in animate to refresh the canvas constantly
  window.requestAnimationFrame(animate);
  // Set the fill style to black
  ctx.fillStyle = "black";
  // Fill the entire area of the canvas with a black rectangle
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Draw background continuously
  background.update();
  // Draw shop
  shop.update();
  // Draw and animate player 1
  kiba.update();
  kiba.status = 'player1'
  // Draw and animate player 2
  // playerTwo.update()
  // Draw and animate enemy
  major.update();
  major.status = 'player2'
  // Add player movement
  movement(kiba, major);
 
  // Collision Detection - Player 1
  rectCollisionDetect(kiba, major);

  // Collision Detection - Player 2
  rectCollisionDetect(major, kiba);

  // End the game based on health:
  winnerByCombat(kiba, major)
  
}

animate();

decreaseTimer(kiba, major)


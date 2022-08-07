# Fight-for-Farblaze
Is a 2D multiplayer fighting game where you and your friend select your hero and battle enemies to save Farblaze! You can choose 1 player mode, 2 player mode, or versus mode. 

## Wire Frame
![Screenshot](./img/wireframe.png)

## Installation Instructions
Fork code from github and more the index.html file on chrome or play game from the link listed here: https://jonrob08.github.io/Fight-for-Farblaze/

# Explanation of Technologies Used
In this project, I use HTML and CSS mainly for adding different elements, formatting the game, and styling the game. I use Javascript to run the game, add in additional elements that need to be introduced during the game, create and animate objects, and determine win conditions of the game.

# Technologies Used
HTML
CSS
Google Fonts
Javascript 
Javascript Canvas
Javascript GSAP library(https://cdnjs.com/libraries/gsap)

### HTML
The whole game is wrapped in a div called game screen 
```
<div id="game-screen">
```

There are two two menus and a canvas game that toggle on and off based on the choices you make using these buttons 
    ```
    <button
        id="startmenu-btn2"
        class="menu-btn"
        onclick="characterSelectStart()"
    >
    </button>
    <button id="startmenu-btn" class="menu-btn" onclick="storyMode()">
    </button>
    <button id="startmenu-btn3" class="menu-btn" onclick="storyMode()">
    </button>
    ```

There are two health bars and a timer that appear on the canvas and are HTML elements
```
      <!-- container div -->
      <div id="wrapper">
        <!-- header containing status bars and timer -->
        <div class="header">
          <div
            style="
              position: relative;
              height: 30px;
              width: 100%;
              border: 4px solid white;
            "
          >
            <div
              style="
                background-color: rgb(255, 0, 0);
                height: 30px;
                width: 100%;
                z-index: 2;
              "
            ></div>
            player Health Bar
            <div
              id="player-current-health"
              style="
                position: absolute;
                background: #18402a;
                top: 0;
                right: 0;
                bottom: 0;
                width: 100%;
              "
            ></div>
          </div>
          <div id="timer"></div>
          <div
            style="
              position: relative;
              height: 30px;
              width: 100%;
              border: 4px solid white;
            "
          >
            <div
              style="
                background-color: rgb(255, 0, 0);
                height: 30px;
                width: 100%;
                z-index: 2;
              "
            ></div>
            AI/P2 Health Bar
            <div
              id="ai-current-health"
              style="
                position: absolute;
                background: #18402a;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                width: 100%;
              "
            >
```
        
        


### CSS 
Adding some styling to the character buttons for the character select screen
```
#select-major img{
    width: 125px;
    height: 125px;
    border-radius: 100%;
    left: 785px;
    top: 230px;
    position: absolute;
}
```
## JavaScript Classes
```
/**
 * Creating Sprites Class
    ** Constructor -------> 
        Position - Need this because I need to be able to set the Sprite's positioning on the canvas and refer to it. It's in the constructor arguments because I will have multiple Sprites so the positions need to be independent of each other.

        Image Source - Need this to be able to swap out the source of my image depending on what Sprite it is, so I'm adding it to the constructor arguments so I can set the source individually on any Sprite.  

        Scale - Need this to have a way to scale up my images, so I'm adding an argument called scale that will multiply the current height and width. I set it equal to 1 so the original size of the image stays in tact if need be. It's a parameter because not every Sprite needs to be scaled. 

        Frames Amount - Need this because I have to divide the amount of frames by the entire length of the sprite sheet in order to determine the length of one section. This has to be a parameter because sprite sheets have different amounts of frames. 

        Current Frame - Need this to track the current frame and iterate through the frames to mimic the appearance of animation. We use this by multiplying this by the spritesheet width divided by the amount of frames inside the sprite sheet.
        
        Frames Elapsed - Need this to track the amount of frames that have elapsed. 

        Frames Wait - Need this to stop the frames from animating so fast that it doesn't look right. We make the frames "wait" for a certain amount of frames in the canvas to pass and then it moves to the next frame within the sprite sheet. Effictively making it possible to speed up or slow down sprite animations. 

        Offset - Need this because some of the animations in the sprite sheets are throwing off the measurments of the sprite during animation due to the padding around the sprite within any given frame. I'm offsetting the sprite in the frame to be in the top left corner everytime so it can have consistent animation.

        Height - Need this to set the height of Sprite on the y axis

        Width - Need this to set the width of Sprite on the x axis
 * -------
    ** Methods ------> 
        Draw() - Used to draw an image on the canvas. Using the draw image method I'm adding the first four arguments to crop sprite sheets and give the illusion of animation. 

        Update() - To be called on a Sprite object within the animate function, in updatehere I'm calling my draw() method first.
 *  -------
*/
class Sprite {
  constructor({
    position,
    width,
    height,
    velocity,
    imageSrc,
    scale = 1,
    framesAmt = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.velocity = velocity;
    this.height = height;
    this.width = width;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesAmt = framesAmt;
    this.framesCur = 0;
    this.framesElapsed = 0;
    this.framesWait = 20;
    this.offset = offset;
  }

  draw() {
    //console.log(this.position, this.offset);
    ctx.drawImage(
      this.image,
      // The width should be the image width(sprite sheet) divided by the max amount of frames within the image, then multiplied by the current frames. We start framesCur off at zero because we do not want there to be any crop at first, for instance if the width of the full sprite sheet was 800 and there were 4 different frames, we would have 0 * (800/4) which equals 0. Next framesCur will be 1 and it will move over 200px and start from the next available frame. Next it will be 2 and will move over 400px and display the next frame, and so on.
      this.framesCur * (this.image.width / this.framesAmt),
      // Start at the top left of the sprite sheet
      0,
      // Divide the width by however many images there are in the sprite sheet
      this.image.width / this.framesAmt,
      this.image.height,
      // Subtracting the offset from the image position so I can place it on the screen where is looks best regardless of padding in the original image
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      // You also need to divide the entire sprite sheet image width by however many images there are in it, or else it tries to stretch the cropped immage to it's original width. Divide this before you scale the image.
      (this.image.width / this.framesAmt) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrames() {
    this.framesElapsed++;

    // First checking to see if the amount of frames elapsed divided by the framesWait remainder is equal to zero, if so move to the next frame within the sprite sheet. Slowing down or speeding up our animation based on the number we pass to framesWait. Ex. if it's 2, it will happen every 2 frames so the frames will be extremely fast, as opposed to 200, less things are divisible by that over time so the frames will change a lot slower.
    if (this.framesElapsed % this.framesWait === 0) {
      // In order for us to animate through the frames we need to increment through framesCur but we also need to check and make sure that framesCur is less than the framesAmt. Once it hits the limit it should reset to 0. We subtract 1 at the end because there are cases where there is only 1 frame and we want to keep drawing that.
      if (this.framesCur < this.framesAmt - 1) {
        this.framesCur++;
      } else {
        this.framesCur = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();

    this.position.x += this.velocity.x;
  }
}
```

```
/**
 * Creating Player Class
 * -------
    ** Extends Sprite Class -------> 
        Needed to do this since our Players are no longer placeholder rectangles and I want to use the frames logic in my Sprite Class. A little refactoring and I'm able to create Players and give them all the properties that are available to a Sprite. 

        *** Extended Props
        Image Source - see Image Source in Sprite Class.  
        Scale -  see Scale in Sprite Class.  
        Frames Amount - see Frames Amount in Sprite Class.  
        Offset - see Offset in Sprite Class.
 * -------
    ** Constructor -------> 
        Position - Need this because I need to be able to track Player's positioning on the canvas and refer to it. It's in the constructor arguments because I will have multiple Players so the positions need to be independent of each other.

        Velocity - Utilizing this to add movement to our Players
        Reference: http://www.noxtar.net/2016/03/html5-canvas-tutorial-applying-velocity.html

        Height - Need this to refer to the height of Player on y axis

        Width - Need this to refer to the width of Player on x axis

        lastKey - Need this to differentiate keys that are being held down, as multiple keys can be pressed down at once we also want to check which key was held down last. We instantiate it as a falsy value because when we press a key in the EventListener it becomes a string of that key which we can use later.

        hitBox - Need this to determine if a player or enemy was hit or not. Each Player has an attack so if that crosses another persons hitbox they will be hit. hitBox is a vertical rectangle that is at the Player's exact x and y position and width and height.

        attackBox - Need this to determine if a Player's attack hit another Player's hitbox or not. Wanted to add this due to the varying lengths and movements of attacks.

        isAttacking - Need this to check if a Player is attacking or not

        Health - Need this to keep track of Player's health. Utilizing this to update the health bars in-game

        Sprites - Need this as a way to organize every single sprite animation for a particular character. So sprites is an object that has an array of objects. This array of objects is comprised of the different animations we have available for each Player, such as 'run', 'jump', 'attack'. These animation objects have two properties, imageSrc and framesAmt.

        isFacing - Need this to help determine which way the Player is facing, mainly to help with determining which animation to switch to.

        // Potentially add an isMoving prop

 * -------
    ** Methods ------> 
        Draw() - For reference I am drawing a rectangle placeholder for my Player 1 and Player 2. I am using a fillStyle to make my rectangle blue

        Update() - To be called in the animate function, here I'm calling my draw() method and adding velocity and gravity. The velocity gets added to the Player's position on the y axis and you can set individual velocities in the player objects. Next is an if statement that checks if the location of the bottom of the Player is greater than the location of the bottom of the canvas, if so, set the velocity to 0 stopping the Player.  

        Attack() - Sets isAttacking equal to true, and then sets it back to false after a setTimeout so the Player is not constantly attacking

        switchSprite() - This method does all of our sprite switching logic, instead of manually switching them in the player/enemy movement section I'm using a method here that has all of them and are set by an argument called sprites. More info on sprites above. 
 * -------
*/

class Player extends Sprite {
  constructor({
    position,
    velocity,
    imageSrc,
    scale = 1,
    framesAmt = 1,
    offset = {
      x: 0,
      y: 0,
    },
    sprites,
    isFacing,
    // Potentially add an isMoving prop
    attackBox = { offset: {}, width: undefined, height: undefined },
    hitBox = { offset: {}, width: undefined, height: undefined },
    aggroBox = { offset: {}, width: undefined, height: undefined },
    characterName,
  }) {
    super({
      // Inherit all the following properties from the parent Class
      position,
      imageSrc,
      scale,
      framesAmt,
      offset,
    });
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastKey;
    this.attackBox = {
      // Changing position to have it's own x and y instead of inheriting the parents, and adding an offset for when the character is facing backwards or forwards
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.hitBox = {
      // Changing position to have it's own x and y instead of inheriting the parents, and adding an offset for when the character is facing backwards or forwards
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: hitBox.offset,
      width: hitBox.width,
      height: hitBox.height,
    };
    this.aggroBox = {
      // Changing position to have it's own x and y instead of inheriting the parents, and adding an offset for when the character is facing backwards or forwards
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: aggroBox.offset,
      width: aggroBox.width,
      height: aggroBox.height,
    };
    this.isAttacking;
    this.health = 100;
    this.framesCur = 0;
    this.framesElapsed = 0;
    this.framesWait = 30;
    this.sprites = sprites;
    this.isFacing = isFacing;
    this.characterName = characterName;
    this.dead = false;
    this.status;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  update() {
    this.draw();
    if (!this.dead) this.animateFrames();

    // Subtract the hitBox offset if there is one
    this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y - this.attackBox.offset.y;

    // forward offset?
    // this.attackBox.position.x = this.position.x + this.width/2 - this.forwardsOffset(this.attackBox.offset.x);
    // this.attackBox.position.y = this.position.y + this.width/2 - this.attackBox.offset.y;

    //Keep this to visualize attackbox location
    // ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

    this.hitBox.position.x = this.position.x - this.hitBox.offset.x;
    this.hitBox.position.y = this.position.y - this.hitBox.offset.y;

    //Keep this to visualize hitbox location
    // ctx.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)

    this.aggroBox.position.x = this.position.x - this.aggroBox.offset.x;
    this.aggroBox.position.y = this.position.y - this.aggroBox.offset.y;

    //Keep this to visualize aggrobox location
    // ctx.fillStyle = 'red'
    // ctx.fillRect(this.aggroBox.position.x, this.aggroBox.position.y, this.aggroBox.width, this.aggroBox.height)

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // gravity function
    if (this.position.y + this.height + this.velocity.y > canvas.height - 85) {
      this.velocity.y = 0;
      this.position.y = 342;
    } else this.velocity.y += gravity;
  }

  attack() {
    if (this.isFacing === "right" && this.characterName === "neji") {
      this.attackBox.offset.x = -150;
      this.switchSprite("attack1");
    } else if (this.isFacing === "right") {
      this.switchSprite("attack1");
    } else if (this.isFacing === "left" && this.characterName === "neji") {
      this.attackBox.offset.x = -40;
      this.switchSprite("revattack1");
    } else if (this.isFacing === "left") {
      this.switchSprite("revattack1");
    }
    this.isAttacking = true;
  }

  switchSprite(sprite) {
    // console.log(sprite)
    // Animation override - Death
    if (this.image === this.sprites.death.image) {
      if (this.framesCur === this.sprites.death.framesAmt - 1) this.dead = true;
      return;
    }

    // Animation override - Attack
    if (
      this.image === this.sprites.attack1.image &&
      this.framesCur < this.sprites.attack1.framesAmt - 1
    ) {
      return;
    } else if (
      this.image === this.sprites.revattack1.image &&
      this.framesCur < this.sprites.revattack1.framesAmt - 1
    ) {
      return;
    }

    // Animation override - Take Hit
    if (
      this.image === this.sprites.takehitflash.image &&
      this.framesCur < this.sprites.takehitflash.framesAmt - 1
    ) {
      this.velocity.x = 1;
      return;
    } else if (
      this.image === this.sprites.revtakehitflash.image &&
      this.framesCur < this.sprites.revtakehitflash.framesAmt - 1
    ) {
      this.velocity.x = -1;
      return;
    }

    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesAmt = this.sprites.idle.framesAmt;
          this.framesCur = 0;
        }
        break;
      case "revidle":
        if (this.image !== this.sprites.revidle.image) {
          this.image = this.sprites.revidle.image;
          this.framesAmt = this.sprites.revidle.framesAmt;
          this.framesCur = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesAmt = this.sprites.run.framesAmt;
          this.framesCur = 0;
        }
        break;
      case "revrun":
        if (this.image !== this.sprites.revrun.image) {
          this.image = this.sprites.revrun.image;
          this.framesAmt = this.sprites.revrun.framesAmt;
          this.framesCur = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesAmt = this.sprites.jump.framesAmt;
          this.framesCur = 0;
        }
        break;
      case "revjump":
        if (this.image !== this.sprites.revjump.image) {
          this.image = this.sprites.revjump.image;
          this.framesAmt = this.sprites.revjump.framesAmt;
          this.framesCur = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesAmt = this.sprites.fall.framesAmt;
          this.framesCur = 0;
        }
        break;
      case "revfall":
        if (this.image !== this.sprites.revfall.image) {
          this.image = this.sprites.revfall.image;
          this.framesAmt = this.sprites.revfall.framesAmt;
          this.framesCur = 0;
        }
        break;
      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.framesAmt = this.sprites.attack1.framesAmt;
          this.framesCur = 0;
        }
        break;
      case "revattack1":
        if (this.image !== this.sprites.revattack1.image) {
          this.image = this.sprites.revattack1.image;
          this.framesAmt = this.sprites.revattack1.framesAmt;
          this.framesCur = 0;
        }
        break;
      case "attack2":
        if (this.image !== this.sprites.attack2.image) {
          this.image = this.sprites.attack2.image;
          this.framesAmt = this.sprites.attack2.framesAmt;
          this.framesCur = 0;
        }
        break;
      case "revattack2":
        if (this.image !== this.sprites.revattack2.image) {
          this.image = this.sprites.revattack2.image;
          this.framesAmt = this.sprites.revattack2.framesAmt;
          this.framesCur = 0;
        }
        break;
      case "takehit":
        if (this.image !== this.sprites.takehit.image) {
          this.image = this.sprites.takehit.image;
          this.framesAmt = this.sprites.takehit.framesAmt;
          this.framesCur = 0;
        }
        break;
      case "revtakehit":
        if (this.image !== this.sprites.revtakehit.image) {
          this.image = this.sprites.revtakehit.image;
          this.framesAmt = this.sprites.revtakehit.framesAmt;
          this.framesCur = 0;
        }
        break;
      case "takehitflash":
        if (this.image !== this.sprites.takehitflash.image) {
          this.image = this.sprites.takehitflash.image;
          this.framesAmt = this.sprites.takehitflash.framesAmt;
          this.framesCur = 0;
        }
        break;
      case "revtakehitflash":
        if (this.image !== this.sprites.revtakehitflash.image) {
          this.image = this.sprites.revtakehitflash.image;
          this.framesAmt = this.sprites.revtakehitflash.framesAmt;
          this.framesCur = 0;
        }
        break;
      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.framesAmt = this.sprites.death.framesAmt;
          this.framesCur = 0;
        }
        break;
      case "revdeath":
        if (this.image !== this.sprites.revdeath.image) {
          this.image = this.sprites.revdeath.image;
          this.framesAmt = this.sprites.revdeath.framesAmt;
          this.framesCur = 0;
        }
        break;
    }
  }

  takehit() {
    this.health -= 2;

    if (this.health <= 0) {
      this.switchSprite("death");
    } else if (this.isFacing === "left") {
      this.switchSprite("revtakehitflash");
    } else if (this.isFacing === "right") {
      this.switchSprite("takehitflash");
    }
  }
}
```
## Javascript Functions and Rendering
```
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
    // backgroundScroll.velocity.x += .001
    player2.switchSprite("revrun");
  } else if (keys.ArrowRight.pressed && player2.position.x < 700) {
    player2.velocity.x = 3;
    player2.switchSprite("run");
  } else if (keys.ArrowRight.pressed && player2.position.x >= 700) {
    background.velocity.x -= 0.002;
    background2.velocity.x -= 0.002;
    background3.velocity.x -= 0.002;
    shop.velocity.x -= 0.002;
    // backgroundScroll.velocity.x -= .001
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

  // Enemy test Movement
  // if (keys.j.pressed && major.lastKey === "j") {
  //   major.velocity.x = -3;
  //   major.switchSprite("revrun");
  // } else if (keys.l.pressed && major.lastKey === "l") {
  //   major.velocity.x = 3;
  //   major.switchSprite("run");
  // } else if (major.lastKey === "j") {
  //   major.switchSprite("revidle");
  // } else {
  //   major.switchSprite("idle");
  // }

  //   if (major.velocity.y < 0 && major.isFacing === "right") {
  //     major.switchSprite("jump");
  //   } else if (major.velocity.y < 0 && major.isFacing === "left") {
  //     major.switchSprite("revjump");
  //   } else if (major.velocity.y > 0 && major.isFacing === "right") {
  //     major.switchSprite("fall");
  //   } else if (major.velocity.y > 0 && major.isFacing === "left") {
  //     major.switchSprite("revfall");
  //   }
};
```

## Rules

Story- 
one player or two players start from the left and work their way to the end point, defeating all the enemies along the way.

VS - 
attack the other player until one wins or the time runs out

### List of Assets Used
#### Background Image
Image Download: https://edermunizz.itch.io/free-pixel-art-forest
Creator: https://edermunizz.itch.io
#### Various Sprites
Image Download: https://brullov.itch.io/oak-woods
Creator: https://brullov.itch.io
### Dev Notes

4 Elements of game design - Challenge, Choice, Change, Chance

Add Audio
Add Second Attack
Add Reset Button
Add Second and Third Stages


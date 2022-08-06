const states = {
  STANDING_LEFT: 0,
  STANDING_RIGHT: 1,
  RUNNING_LEFT: 2,
  RUNNING_RIGHT: 3,
  ATTACKING_LEFT: 4,
  ATTACKING_RIGHT: 5,
  JUMPING_LEFT: 6,
  JUMPING_RIGHT: 7,
  HIT_LEFT: 8,
  HIT_RIGHT: 9,
};

class State {
  constructor(state) {
    this.state = state;
  }
}

class Standing extends State {
  constructor(ai, direction) {
    super("STANDING LEFT");
    this.ai = ai;
    this.direction = direction;
  }

  enter() {
    this.ai.isFacing = this.direction;
    this.ai.velocity.x = 0;
    this.ai.switchSprite(this.direction == "left" ? "revidle" : "idle");
  }
  update(player) {
    if (this.direction == "left") {
      if (player.position.x > this.ai.position.x) {
        this.ai.setState(states.STANDING_RIGHT);
      }
    } else {
      if (player.position.x < this.ai.position.x) {
        this.ai.setState(states.STANDING_LEFT);
      }
    }

    if (this.direction == "left") {
      if (
        player.position.x < this.ai.position.x &&
        player.position.x > this.ai.position.x - 400
      ) {
        this.ai.setState(states.RUNNING_LEFT);
      }
    } else {
      if (
        player.position.x > this.ai.position.x &&
        player.position.x < this.ai.position.x + 400
      ) {
        this.ai.setState(states.RUNNING_RIGHT);
      }
    }
  }
}

class Running extends State {
  constructor(ai, direction) {
    super("RUNNING LEFT");
    this.ai = ai;
    this.direction = direction;
  }

  enter() {
    this.ai.isFacing = this.direction;

    if (this.direction == "left") {
      this.ai.velocity.x = -2;
    } else {
      this.ai.velocity.x = 2;
    }
    this.ai.switchSprite(this.direction == "left" ? "revrun" : "run");
  }

  update(player) {
    if (this.direction == "left") {
      if (player.position.x > this.ai.position.x) {
        this.ai.setState(states.RUNNING_RIGHT);
      }
    } else {
      if (player.position.x < this.ai.position.x) {
        this.ai.setState(states.RUNNING_LEFT);
      }
    }

    if (
      this.direction == "left" &&
      this.ai.position.x <= player.position.x + 50
    ) {
      this.ai.setState(states.ATTACKING_LEFT);
    } else if (
      this.direction == "right" &&
      this.ai.position.x >= player.position.x - 50
    ) {
      this.ai.setState(states.ATTACKING_RIGHT);
    }
  }
}

class Attacking extends State {
  constructor(ai, direction) {
    super("ATTACKING LEFT");
    this.ai = ai;
    this.direction = direction;
    this.attackCounter = 0;
  }

  enter() {
    this.ai.isFacing = this.direction;
    this.ai.velocity.x = 0;
    this.ai.isAttacking = true;
    this.attackCounter = 0;

    if (this.ai.isFacing === "left") {
      this.ai.switchSprite("revattack1");
    } else if (this.ai.isFacing === "right") {
      this.ai.switchSprite("attack1");
    }
  }

  update(player) {
    if (this.ai.framesCur === 1 && this.ai.isAttacking) {
      if (
        attackDetect({
          rectangle1: this.ai,
          rectangle2: player,
        })
      ) {
        {
          player.takehit();
          gsap.to(`#${player.status}-current-health`, {
            width: player.health + "%",
          });
          player.velocity.x = 5;
          console.log("Attacker Hit!");
        }
      }
      this.ai.isAttacking = false;
      this.attackCounter++;
      console.log(this.attackCounter);
    }

    if (this.ai.framesCur === this.ai.framesAmt - 1) {
      if (this.attackCounter > 3) {
        if (this.direction == "left") {
          this.ai.setState(states.JUMPING_LEFT);
        } else {
          this.ai.setState(states.JUMPING_RIGHT);
        }
      } else {
        this.ai.isAttacking = true;
      }
    }
  }
}

class Jumping extends State {
  constructor(ai, direction) {
    super("ATTACKING LEFT");
    this.ai = ai;
    this.direction = direction;
  }

  enter() {
    this.ai.isFacing = this.direction;
    this.ai.velocity.y = -6.5;
    if (this.direction == "left") {
      this.ai.velocity.x = -1;
    } else {
      this.ai.velocity.x = 1;
    }
    this.ai.switchSprite(this.direction == "left" ? "revjump" : "jump");
  }

  update(player) {
    if (this.ai.velocity.y == 0 && this.ai.position.y == 342) {
      this.ai.setState(states.STANDING_LEFT);
    }
  }
}

class Hit extends State {
  constructor(ai, direction) {
    super("HIT");
    this.ai = ai;
    this.direction = direction;
    this.ai.hit = false;
  }

  enter() {
    this.time = 0;
    this.ai.isFacing = this.direction;

    if (this.ai.health <= 0) {
      this.ai.switchSprite("death");
    } else if (this.ai.isFacing === "left") {
      this.ai.switchSprite("revtakehitflash");
      this.ai.velocity.x = -0.2;
    } else if (this.ai.isFacing === "right") {
      this.ai.switchSprite("takehitflash");
      this.ai.velocity.x = 0.2;
    }
  }

  update(player) {
    this.time += 1 / 60;

    if (this.time > 0.6) {
      this.ai.setState(states.STANDING_LEFT);
    }

    // if (this.direction == "left") {
    //     if (player.position.x > this.ai.position.x) {
    //         this.ai.setState(states.RUNNING_RIGHT)
    //     }
    // } else {
    //     if (player.position.x < this.ai.position.x) {
    //         this.ai.setState(states.RUNNING_LEFT)
    //     }
    // }

    // if (this.direction == "left" && this.ai.position.x <= player.position.x + 30 ){
    //     this.ai.setState(states.ATTACKING_LEFT)
    // } else if (this.direction == "right" && this.ai.position.x >= player.position.x - 100 )
    //  {
    //     this.ai.setState(states.ATTACKING_RIGHT)
    // }
  }

  // takehit() {
  //     this.ai.health -= 1

  //     if (this.ai.health <= 0) {
  //         this.ai.switchSprite('death')
  //     } else if (this.ai.isFacing==='left'){
  //         this.ai.switchSprite('revtakehitflash')
  //     } else if (this.ai.isFacing==='right'){
  //         this.ai.switchSprite('takehitflash')
  //     }
  //   }
}

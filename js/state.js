const states = {
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
}

class State {
    constructor(state){
        this.state = state;
    }
}

class StandingLeft extends State {
    constructor(ai){
        super('STANDING LEFT')
        this.ai = ai
    }

    enter(){
        this.ai.switchSprite('revidle')
    }
    handleInput(ai, player){
        if (ai.velocity.x === 0 && player.position.x < ai.position.x) {
            this.ai.isFacing = 'left'
            this.ai.setState(states.STANDING_LEFT)
          }
    }

}

class StandingRight extends State {
    constructor(ai){
       super('STANDING RIGHT')
        this.ai = ai
    }

    enter(){
        this.ai.switchSprite('idle')
    }
    handleInput(ai, player){
        console.log('weet')
        if (ai.velocity.x === 0 && player.position.x > ai.position.x) {
            this.ai.isFacing = 'right'
            this.ai.setState(states.STANDING_RIGHT)
          }
    }
}
console.log('connected')

// Grabbing the canvas and setting/grabbing the context
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Set canvas height and width to generic browser window size
canvas.width = 1024
canvas.height = 576

// Filling in the canvas background with a black rectangle
ctx.fillRect(0, 0, canvas.width, canvas.height)

/**
 * Creating Player Class
    Constructor -
        Position - because I need to be able to track Player's positioning on the canvas and refer to it. It's in the constructor arguments because I will have multiple Players so the positions need to be independent of each other.

        Velocity - Utilizing velocity to add movement to our Players
        Reference: http://www.noxtar.net/2016/03/html5-canvas-tutorial-applying-velocity.html

    Methods - 
        Draw() - For reference I am drawing a rectangle placeholder for my Player 1 and Player 2. I am using a fillStyle to make my rectangle blue

        Update() - To be called in the animate function, this is where I'll call my draw() method and add my speed or velocity and gravity. 

 */

class Player {
    // I changed the constructor to pass an object so it's easier to instantiate a Player
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
    }

    draw() {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.position.x, this.position.y, 50, 100)
    }

    update() {
        this.draw()
    }
}

// Creating Player One
const playerOne = new Player({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

// Draw Player One
playerOne.draw()

console.log(playerOne)

// Creating Player Two
const playerTwo = new Player({
    position: {
        x: 150,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

//Draw Player Two
playerTwo.draw()


/** Animate function - This recursive function "animates" the canvas in our browser window by calling itself and refreshes the frame by 

    -Reference: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 */ 
function animate() {
    window.requestAnimationFrame(animate)
    console.log('this works')
}

animate()
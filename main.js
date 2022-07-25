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
        Position - Adding this because I need to be able to track Player's positioning on the canvas and refer to it. It's in the constructor arguments because I will have multiple Players so the positions need to be independent of each other.

        Velocity - Utilizing this to add movement to our Players
        Reference: http://www.noxtar.net/2016/03/html5-canvas-tutorial-applying-velocity.html

        Height - Need this to refer to the height of Player on y axis

        Width - Need this to refer to the width of Player on x axis

    Methods - 
        Draw() - For reference I am drawing a rectangle placeholder for my Player 1 and Player 2. I am using a fillStyle to make my rectangle blue

        Update() - To be called in the animate function, here I'm calling my draw() method and adding velocity and gravity. The velocity gets added to the Player's position on the y axis and you can set individual velocities in the player objects. Next is an if statement that checks if the location of the bottom of the Player is greater than the location of the bottom of the canvas, if so, set the velocity to 0 stopping the Player.  

 */

class Player {
    // I changed the constructor to pass an object so it's easier to instantiate a Player
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 100
        this.width = 50
    }

    draw() {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        if (this.position.y + this.height > canvas.height) {
            this.velocity.y = 0
        }
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
        y: 2
    }
})

console.log(playerOne)

// Creating Player Two
const playerTwo = new Player({
    position: {
        x: 150,
        y: 0
    },
    velocity: {
        x: 0,
        y: 3
    }
})

/** Animate function - This recursive function "animates" the canvas in our browser window by calling itself and refreshes the frame by 

    -Reference: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 */ 
function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    playerOne.update()
    playerTwo.update()
}

animate()
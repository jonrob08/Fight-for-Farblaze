console.log('connected')

// Grabbing the canvas and setting/grabbing the context
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Set canvas height and width to generic browser window size
canvas.width = 1024
canvas.height = 576

// Filling in the canvas background with a black rectangle
ctx.fillRect(0, 0, canvas.width, canvas.height)

// Setting canvas gravity
const gravity = .05

// Setting up Key monitor

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

/**
 * Creating Player Class
    Constructor -
        Position - Adding this because I need to be able to track Player's positioning on the canvas and refer to it. It's in the constructor arguments because I will have multiple Players so the positions need to be independent of each other.

        Velocity - Utilizing this to add movement to our Players
        Reference: http://www.noxtar.net/2016/03/html5-canvas-tutorial-applying-velocity.html

        Height - Need this to refer to the height of Player on y axis

        Width - Need this to refer to the width of Player on x axis

        lastKey - Need this to differentiate keys that are being held down, as multiple keys can be pressed down at once we also want to check which key was held down last. We instantiate it as a falsy value because when we press a key in the EventListener it becomes a string of that key which we can use later.

        hitBox - Need this common property to determine if a player or enemy was hit or not. Each Player has an attack so if that crosses another persons hitbox they will be hit. hitBox is an object that has a position that is the Player's position, a width of 100 (subject to change depending on attack range and how bold I'm feeling), and a height of 30 (also subject to change).

    Methods - 
        Draw() - For reference I am drawing a rectangle placeholder for my Player 1 and Player 2. I am using a fillStyle to make my rectangle blue

        Update() - To be called in the animate function, here I'm calling my draw() method and adding velocity and gravity. The velocity gets added to the Player's position on the y axis and you can set individual velocities in the player objects. Next is an if statement that checks if the location of the bottom of the Player is greater than the location of the bottom of the canvas, if so, set the velocity to 0 stopping the Player.  

 */

class Player {
    // I changed the constructor to pass an object so it's easier to instantiate a Player
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.hitBox = {
            position: this.position,
            width: 100,
            height: 50
        }
    }

    draw() {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        // This is where the hitBox is drawn
        ctx.fillStyle = 'red'
        ctx.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)
    }

    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height > canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
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

// Creating Enemy
const enemy = new Player({
    position: {
        x: 700,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

/** Animate function - This recursive function "animates" the canvas in our browser window by calling itself and refreshes the frame by 

    -Reference: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 */ 
function animate() {
    // Call window.requestAnimationFrame() and pass in animate to refresh the canvas constantly
    window.requestAnimationFrame(animate)
    // Set the fill style to black
    ctx.fillStyle = 'black'
    // Fill the entire area of the canvas with a black rectangle
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // Draw and animate player 1
    playerOne.update()
    // Draw and animate player 2
    playerTwo.update()
    // Draw and animate enemy
    enemy.update()
    // Set each player's velocity to 0 
    playerOne.velocity.x = 0
    playerTwo.velocity.x = 0

    // Player 1 Movement
    if (keys.a.pressed && playerOne.lastKey === 'a') {
        playerOne.velocity.x = -2
    } else if (keys.d.pressed && playerOne.lastKey === 'd') {
        playerOne.velocity.x = 2
    }

    // Player 2 Movement
    if (keys.ArrowRight.pressed && playerTwo.lastKey === 'ArrowRight') {
        playerTwo.velocity.x = 2
    } else if (keys.ArrowLeft.pressed && playerTwo.lastKey === 'ArrowLeft') {
        playerTwo.velocity.x = -2
    }

    // Collision Detection
    if (playerOne.hitBox.position.x + playerOne.hitBox.width >= enemy.position.x && playerOne.hitBox.position.x <= enemy.position.x + enemy.width && playerOne.hitBox.position.y + playerOne.hitBox.height >= enemy.position.y && playerOne.hitBox.position.y <= enemy.position.y + enemy.height) {
        console.log('Hit!')
    }

    if (playerTwo.hitBox.position.x + playerTwo.hitBox.width >= enemy.position.x && playerTwo.hitBox.position.x <= enemy.position.x + enemy.width && playerTwo.hitBox.position.y + playerTwo.hitBox.height >= enemy.position.y && playerTwo.hitBox.position.y <= enemy.position.y + enemy.height) {
        console.log('Hit!')
    }
}

animate()

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        // Player 1 Keys
        case 'd':
            keys.d.pressed = true
            playerOne.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            playerOne.lastKey = 'a'
            break
        case 'w':
            keys.w.pressed = true
            playerOne.velocity.y = -6.5
            break
        // Player 2 Keys
            case 'ArrowRight':
            keys.ArrowRight.pressed = true
            playerTwo.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            playerTwo.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            playerTwo.velocity.y = -6.5
            break
    }
})

window.addEventListener('keyup', (e) => {
    // Player 1 Keys
    switch (e.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
        // Player 2 Keys
            case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
    }
})
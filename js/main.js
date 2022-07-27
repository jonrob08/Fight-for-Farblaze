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
const gravity = .09

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

// Creating Background
const background = new Sprite({
    position: {
        x: 0,
        y: -200
    },
    imageSrc: './img/Background.png',
    scale: 1.4
})


// Creating Shop
const shop = new Sprite({
    position: {
        x: 650,
        y: 155
    },
    imageSrc: './img/shop_anim.png',
    scale: 3,
    framesAmt: 6
})

// Creating Player One
const playerOne = new Player({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './img/Characters/Kiba/Idle.png',
    scale: 3,
    framesAmt: 4
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
    },
    offset: {
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
    },
    offset: {
        x: 50,
        y: 0
    }
})

/**
 * Decreasing the timer function - I'm adding this function in so there is a sense of urgency, also so that there is a default win condition that will always happen. Also, because a timer in a fighting game is pretty standard.
 */

const displayResults = function() {
    clearTimeout(timerId)
    if (enemy.health === playerOne.health && playerTwo.health){
        document.getElementById('results').innerHTML = 'Tie?? Are you even trying?'
    } else if (enemy.health === 0) {
        document.getElementById('results').innerHTML = 'Heroes Win!'
    } else if (playerOne.health === 0 || playerTwo.health === 0) {
        document.getElementById('results').innerHTML = 'Heroes Lose!'
    }
}

let timer = 99
let timerId = 0

function decreaseTimer() {
    timerId = setTimeout(decreaseTimer, 1000)
    if (timer > 0) {
        timer--
        document.getElementById('timer').innerHTML = timer
    }

    // End the game based on time
    if (timer === 0) {
        displayResults()
    }
}

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
    // Draw background continuously
    background.update()
    // Draw shop
    shop.update()
    // Draw and animate player 1
    playerOne.update()
    // Draw and animate player 2
    //playerTwo.update()
    // Draw and animate enemy
    //enemy.update()

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
    } else {
        playerTwo.velocity.x = 0
    }

    // Collision Detection - Player 1 / Player 2
    if (playerOne.hitBox.position.x + playerOne.hitBox.width >= enemy.position.x && playerOne.hitBox.position.x <= enemy.position.x + enemy.width && playerOne.hitBox.position.y + playerOne.hitBox.height >= enemy.position.y && playerOne.hitBox.position.y <= enemy.position.y + enemy.height && playerOne.isAttacking) {
        playerOne.isAttacking = false
        enemy.health -= 2
        document.querySelector('#enemy-current-health').style.width = enemy.health + "%"
        console.log('P1 Hit!')
    }

    if (playerTwo.hitBox.position.x + playerTwo.hitBox.width >= enemy.position.x && playerTwo.hitBox.position.x <= enemy.position.x + enemy.width && playerTwo.hitBox.position.y + playerTwo.hitBox.height >= enemy.position.y && playerTwo.hitBox.position.y <= enemy.position.y + enemy.height && playerTwo.isAttacking) {
        playerTwo.isAttacking = false 
        enemy.health -= 2 
        console.log('P2 Hit!')
        document.querySelector('#enemy-current-health').style.width = enemy.health + "%"
    }

    // Collision Detection - Enemy

    if (enemy.hitBox.position.x + enemy.hitBox.width >= playerOne.position.x && enemy.hitBox.position.x <= playerOne.position.x + playerOne.width && enemy.hitBox.position.y + enemy.hitBox.height >= playerOne.position.y && enemy.hitBox.position.y <= playerOne.position.y + playerOne.height && enemy.isAttacking) {
        enemy.isAttacking = false
        console.log('Hit!')
        playerOne.health -= 2
        document.querySelector('#player-current-health').style.width = playerOne.health + "%"
        console.log('Enemy Hit!')
    }

    if (enemy.hitBox.position.x + enemy.hitBox.width >= playerTwo.position.x && enemy.hitBox.position.x <= playerTwo.position.x + playerTwo.width && enemy.hitBox.position.y + enemy.hitBox.height >= playerTwo.position.y && enemy.hitBox.position.y <= playerTwo.position.y + playerTwo.height && enemy.isAttacking) {
        enemy.isAttacking = false
        console.log('Hit!')
        playerTwo.health -= 2
        document.querySelector('#player-current-health').style.width = playerTwo.health + "%"
        console.log('Enemy Hit!')
    }

    // Hitbox Offset Detection
    if (playerOne.position.x >= enemy.position.x  ){
        playerOne.hitBox.offset.x = 50
    }  else {
        playerOne.hitBox.offset.x = 0
    }

    if (playerTwo.position.x >= enemy.position.x  ){
        playerTwo.hitBox.offset.x = 50
    }  else {
        playerTwo.hitBox.offset.x = 0
    }

    if (enemy.position.x >= playerOne.position.x  ){
        enemy.hitBox.offset.x = 50
    }  else {
        enemy.hitBox.offset.x = 0
    }

    if (enemy.position.x >= playerTwo.position.x  ){
        enemy.hitBox.offset.x = 50
    }  else {
        enemy.hitBox.offset.x = 0
    }

    // End the game based on health:
    if (enemy.health <= 0 || playerOne.health <= 0 || playerTwo.health <=0){
        displayResults()
    }
}

animate()
decreaseTimer()

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
        case ' ':
            playerOne.attack()
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
        case 'ArrowDown':
            playerTwo.attack()
            break
        // test case for enemy attacks
        case '9':
            enemy.attack()
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
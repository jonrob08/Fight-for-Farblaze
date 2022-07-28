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
const gravity = .08

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
    imageSrc: './img/Characters/Kiba/Idle.png',
    scale: 3,
    framesAmt: 4,
    offset: {
        x: 30,
        y: 0
    },
    sprites: {
        idle: {
            imageSrc: './img/Characters/Kiba/Idle.png',
            framesAmt: 4
        },
        revidle: {
            imageSrc: './img/Characters/Kiba/rev_Idle.png',
            framesAmt: 4
        },
        run: {
            imageSrc: './img/Characters/Kiba/Run.png',
            framesAmt: 8
        },
        revrun: {
            imageSrc: './img/Characters/Kiba/rev_Run.png',
            framesAmt: 8
        },
        jump: {
            imageSrc: './img/Characters/Kiba/Jump.png',
            framesAmt: 2
        },
        revjump: {
            imageSrc: './img/Characters/Kiba/rev_Jump.png',
            framesAmt: 2
        },
        fall: {
            imageSrc: './img/Characters/Kiba/Fall.png',
            framesAmt: 2
        },
        revfall: {
            imageSrc: './img/Characters/Kiba/rev_Fall.png',
            framesAmt: 2
        },
        attack1: {
            imageSrc: './img/Characters/Kiba/attack1.png',
            framesAmt: 4
        },
        revattack1: {
            imageSrc: './img/Characters/Kiba/rev_attack1.png',
            framesAmt: 4
        },
    },
    isFacing: 'right',
    attackBox: {
        offset: {
            x: -50,
            y: -120
        },
        width: 200,
        height: 50
    },
    hitBox: {
        offset: {
            x: -100,
            y: -100
        },
        width: 50,
        height: 100
    }
})

console.log(playerOne)

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
        x: 0,
        y: -8
    },
    imageSrc: './img/Characters/Major/Idle.png',
    scale: 3,
    framesAmt: 4,
    sprites: {
        idle: {
            imageSrc: './img/Characters/Major/Idle.png',
            framesAmt: 4
        },
        revidle: {
            imageSrc: './img/Characters/Major/rev_Idle.png',
            framesAmt: 4
        },
        run: {
            imageSrc: './img/Characters/Major/Run.png',
            framesAmt: 8
        },
        revrun: {
            imageSrc: './img/Characters/Major/rev_Run.png',
            framesAmt: 8
        },
        jump: {
            imageSrc: './img/Characters/Major/Jump.png',
            framesAmt: 2
        },
        revjump: {
            imageSrc: './img/Characters/Major/rev_Jump.png',
            framesAmt: 2
        },
        fall: {
            imageSrc: './img/Characters/Major/Fall.png',
            framesAmt: 2
        },
        revfall: {
            imageSrc: './img/Characters/Major/rev_Fall.png',
            framesAmt: 2
        },
        attack1: {
            imageSrc: './img/Characters/Major/Attack1.png',
            framesAmt: 4
        },
        revattack1: {
            imageSrc: './img/Characters/Major/rev_Attack1.png',
            framesAmt: 4
        },
    },
    isFacing: 'left',
    attackBox: {
        offset: {
            x: -40,
            y: -80
        },
        width: 200, //200?
        height: 80
    },
    hitBox: {
        offset: {
            x: -120,
            y: -80
        },
        width: 50,
        height: 120
    }
})

// Setting up Key monitor

const keys = {
    // P1
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    // P2
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    // Testing Enemy Movement
    j: {
        pressed: false
    },
    l: {
        pressed: false
    },
    i: {
        pressed: false
    }
}

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
    // playerTwo.update()
    // Draw and animate enemy
    enemy.update()

    // Set each player's velocity to 0 
    if(playerOne.velocity.x = 0){
        playerOne.switchSprite('idle')  
    }

    // if(playerTwo.velocity.x = 0){
    //     playerTwo.switchSprite('idle')  
    // }

    if(enemy.velocity.x = 0 && enemy.isFacing === 'left'){
        enemy.switchSprite('revidle')  
    }

    // Player 1 Movement
  
    if (keys.a.pressed && playerOne.lastKey === 'a') {
        playerOne.velocity.x = -3
        playerOne.switchSprite('revrun')
    } else if (keys.d.pressed && playerOne.lastKey === 'd') {
        playerOne.velocity.x = 3
        playerOne.switchSprite('run')
    } else if (playerOne.lastKey === 'a') {
        playerOne.switchSprite('revidle')
    } else {
        playerOne.switchSprite('idle')
    }

    if (playerOne.velocity.y < 0 && playerOne.isFacing === 'right') {
        playerOne.switchSprite('jump')
    } else if (playerOne.velocity.y < 0 && playerOne.isFacing === 'left') {
        playerOne.switchSprite('revjump')
    } else if (playerOne.velocity.y > 0 && playerOne.isFacing === 'right') {
        playerOne.switchSprite('fall')
    } else if (playerOne.velocity.y > 0 && playerOne.isFacing === 'left') {
        playerOne.switchSprite('revfall')
    } 

    // Player 2 Movement
    
    // if (keys.ArrowLeft.pressed && playerTwo.lastKey === 'ArrowLeft') {
    //     playerTwo.velocity.x = -3
    //     playerTwo.switchSprite('revrun')
    // } else if (keys.ArrowRight.pressed && playerTwo.lastKey === 'ArrowRight') {
    //     playerTwo.velocity.x = 3
    //     playerTwo.switchSprite('run')
    // } else if (playerTwo.lastKey === 'ArrowLeft') {
    //     playerTwo.switchSprite('revidle')
    // } else {
    //     playerTwo.switchSprite('idle')
    // }

    // if (playerTwo.velocity.y < 0 && playerTwo.isFacing === 'right') {
    //     playerTwo.switchSprite('jump')
    // } else if (playerTwo.velocity.y < 0 && playerTwo.isFacing === 'left') {
    //     playerTwo.switchSprite('revjump')
    // } else if (playerTwo.velocity.y > 0 && playerTwo.isFacing === 'right') {
    //     playerTwo.switchSprite('fall')
    // } else if (playerTwo.velocity.y > 0 && playerTwo.isFacing === 'left') {
    //     playerTwo.switchSprite('revfall')
    // } 

    // Enemy Movement
    if (keys.j.pressed && enemy.lastKey === 'j') {
        enemy.velocity.x = -3
        enemy.switchSprite('revrun')
    } else if (keys.l.pressed && enemy.lastKey === 'l') {
        enemy.velocity.x = 3
        enemy.switchSprite('run')
    } else if (enemy.lastKey === 'j') {
        enemy.switchSprite('revidle')
    } else {
        enemy.switchSprite('idle')
    }

    if (enemy.velocity.y < 0 && enemy.isFacing === 'right') {
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y < 0 && enemy.isFacing === 'left') {
        enemy.switchSprite('revjump')
    } else if (enemy.velocity.y > 0 && enemy.isFacing === 'right') {
        enemy.switchSprite('fall')
    } else if (enemy.velocity.y > 0 && enemy.isFacing === 'left') {
        enemy.switchSprite('revfall')
    } 

    // Collision Detection - Player 1 / Player 2
    // if (playerOne.attackBox.position.x + playerOne.attackBox.width >= enemy.hitBox.position.x && playerOne.hitBox.position.x <= enemy.position.x + enemy.width && playerOne.hitBox.position.y + playerOne.hitBox.height >= enemy.position.y && playerOne.hitBox.position.y <= enemy.position.y + enemy.height && playerOne.isAttacking) {
    //     playerOne.isAttacking = false
    //     enemy.health -= 2
    //     document.querySelector('#enemy-current-health').style.width = enemy.health + "%"
    //     console.log('P1 Hit!')
    // }

    // if (
    //     playerOne.attackBox.position.x + playerOne.attackBox.width >= enemy.hitBox.position.x && playerOne.attackBox.position.x + playerOne.attackBox.width <= enemy.hitBox.position.x + enemy.hitBox.width && playerOne.attackBox.position.y + playerOne.attackBox.height >= enemy.hitBox.position.y && playerOne.attackBox.position.y <= enemy.hitBox.position.y + enemy.height && playerOne.isFacing === 'right'
    //     ) {
    //     console.log('Winning!')
    // } else if (
    //     playerOne.attackBox.position.x >= enemy.hitBox.position.x + enemy.hitBox.width && playerOne.attackBox.position.x <= enemy.hitBox.position.x 
    // ) {
    //     console.log('Winning Backwards!')
    // }

    let ab = playerOne.attackBox.position.x
    let ba = enemy.hitBox.position.x + enemy.hitBox.width
    let ac = playerOne.attackBox.position.x + playerOne.attackBox.width
    let ca = enemy.hitBox.position.x
    let ad = playerOne.attackBox.position.y
    let da = enemy.hitBox.position.y + enemy.height
    let ae = playerOne.attackBox.position.y + playerOne.attackBox.height
    let ea = enemy.hitBox.position.y

    if ( ab < ba && ac > ca && ad < da && ae > ea && playerOne.isAttacking) 
    {
        playerOne.isAttacking = false
        enemy.health -= 2
        document.querySelector('#enemy-current-health').style.width = enemy.health + "%"
        console.log('P1 Hit!')
        }

    // && playerOne.attackBox.position.x <= enemy.hitBox.position.x 
    // && playerOne.attackBox.position.y + playerOne.attackBox.height >= enemy.hitBox.position.y 
    // && playerOne.attackBox.position.y <= enemy.hitBox.position.y + enemy.height

    // if (playerTwo.hitBox.position.x + playerTwo.hitBox.width >= enemy.position.x && playerTwo.hitBox.position.x <= enemy.position.x + enemy.width && playerTwo.hitBox.position.y + playerTwo.hitBox.height >= enemy.position.y && playerTwo.hitBox.position.y <= enemy.position.y + enemy.height && playerTwo.isAttacking) {
    //     playerTwo.isAttacking = false 
    //     enemy.health -= 2 
    //     console.log('P2 Hit!')
    //     document.querySelector('#enemy-current-health').style.width = enemy.health + "%"
    // }

    // Collision Detection - Enemy



    // if (enemy.hitBox.position.x + enemy.hitBox.width >= playerOne.position.x && enemy.hitBox.position.x <= playerOne.position.x + playerOne.width && enemy.hitBox.position.y + enemy.hitBox.height >= playerOne.position.y && enemy.hitBox.position.y <= playerOne.position.y + playerOne.height && enemy.isAttacking) {
    //     enemy.isAttacking = false
    //     console.log('Hit!')
    //     playerOne.health -= 2
    //     document.querySelector('#player-current-health').style.width = playerOne.health + "%"
    //     console.log('Enemy Hit!')
    // }

    // if (enemy.hitBox.position.x + enemy.hitBox.width >= playerTwo.position.x && enemy.hitBox.position.x <= playerTwo.position.x + playerTwo.width && enemy.hitBox.position.y + enemy.hitBox.height >= playerTwo.position.y && enemy.hitBox.position.y <= playerTwo.position.y + playerTwo.height && enemy.isAttacking) {
    //     enemy.isAttacking = false
    //     console.log('Hit!')
    //     playerTwo.health -= 2
    //     document.querySelector('#player-current-health').style.width = playerTwo.health + "%"
    //     console.log('Enemy Hit!')
    // }

    // Hitbox Offset Detection
    // if (playerOne.position.x >= enemy.position.x  ){
    //     playerOne.hitBox.offset.x = 50
    // }  else {
    //     playerOne.hitBox.offset.x = 0
    // }

    // if (playerTwo.position.x >= enemy.position.x  ){
    //     playerTwo.hitBox.offset.x = 50
    // }  else {
    //     playerTwo.hitBox.offset.x = 0
    // }

    // if (enemy.position.x >= playerOne.position.x  ){
    //     enemy.hitBox.offset.x = 50
    // }  else {
    //     enemy.hitBox.offset.x = 0
    // }

    // if (enemy.position.x >= playerTwo.position.x  ){
    //     enemy.hitBox.offset.x = 50
    // }  else {
    //     enemy.hitBox.offset.x = 0
    // }

    // End the game based on health:
    // if (enemy.health <= 0 || playerOne.health <= 0 || playerTwo.health <=0){
    //     displayResults()
    // }
   
}

function trackX() {
    // top right
    console.log('top right')
console.log(playerOne.attackBox.position.x + playerOne.attackBox.width)
    // bottom right
    console.log('bottom right')
console.log(playerOne.attackBox.position.x + playerOne.attackBox.width + playerOne.attackBox.height)
 // top left
 console.log('top left')
console.log(playerOne.attackBox.position.x)
// bottom left
console.log('bottom left')
console.log(playerOne.attackBox.position.x + playerOne.attackBox.height)

}



animate()
decreaseTimer()

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        // Player 1 Keys
        case 'd':
            keys.d.pressed = true
            playerOne.isFacing = 'right'
            playerOne.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            playerOne.isFacing = 'left'
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
            playerTwo.isFacing = 'right'
            playerTwo.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            playerTwo.isFacing = 'left'
            playerTwo.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            playerTwo.velocity.y = -6.5
            break
        case 'ArrowDown':
            playerTwo.attack()
            break
        // test cases for enemy movement and attacks
        case 'l':
            keys.l.pressed = true
            enemy.isFacing = 'right'
            enemy.lastKey = 'l'
            break
        case 'j':
            keys.j.pressed = true
            enemy.isFacing = 'left'
            enemy.lastKey = 'j'
            break
        case 'i':
            keys.i.pressed = true
            enemy.velocity.y = -6.5
            break
        case 'k':
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
        case 'l':
            keys.l.pressed = false
            break
        case 'j':
            keys.j.pressed = false
            break
        case 'i':
            keys.i.pressed = false
            break
    }
})
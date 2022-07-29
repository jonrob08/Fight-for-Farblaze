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

// Character Select Screen
const selectCharacter = new Sprite({
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
const kiba = new Player({
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
        attack2: {
            imageSrc: './img/Characters/Kiba/attack2.png',
            framesAmt: 4
        },
        revattack2: {
            imageSrc: './img/Characters/Kiba/rev_attack2.png',
            framesAmt: 4
        },
        takehit: {
            imageSrc: './img/Characters/Kiba/Take_Hit.png',
            framesAmt: 2
        },
        revtakehit: {
            imageSrc: './img/Characters/Kiba/rev_Take_Hit.png',
            framesAmt: 2
        },
        takehitflash: {
            imageSrc: './img/Characters/Kiba/Take_Hit_w.png',
            framesAmt: 2
        },
        revtakehitflash: {
            imageSrc: './img/Characters/Kiba/rev_Take_Hit_w.png',
            framesAmt: 2
        },
    },
    isFacing: 'right',
    attackBox: {
        offset: {
            x: -30,
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
    },
    characterName: 'kiba'
})

console.log(kiba)

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
    },
    characterName: 'major'
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
    f: {
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

const rectCollisionDetect = function(attacker, target) {

    let ab = attacker.attackBox.position.x
    let ba = target.hitBox.position.x + target.hitBox.width
    let ac = attacker.attackBox.position.x + attacker.attackBox.width
    let ca = target.hitBox.position.x
    let ad = attacker.attackBox.position.y
    let da = target.hitBox.position.y + target.height
    let ae = attacker.attackBox.position.y + attacker.attackBox.height
    let ea = target.hitBox.position.y

    
    if ( ab < ba && ac > ca && ad < da && ae > ea && attacker.isAttacking && attacker.framesCur === 2) 
    {
        attacker.isAttacking = false
        target.health -= 2
        document.querySelector(`#${target.characterName}-current-health`).style.width = target.health + "%"
        console.log('Attacker Hit!')
        }

    // If player misses
    if (attacker.isAttacking && attacker.framesCur === 2){
        attacker.isAttacking = false
        console.log('missed')
    }
}

/**
 * Decreasing the timer function - I'm adding this function in so there is a sense of urgency, also so that there is a default win condition that will always happen. Also, because a timer in a fighting game is pretty standard.
 */

// const displayResults = function() {
//     clearTimeout(timerId)
//     if (enemy.health === playerOne.health && playerTwo.health){
//         document.getElementById('results').innerHTML = 'Tie?? Are you even trying?'
//     } else if (enemy.health === 0) {
//         document.getElementById('results').innerHTML = 'Heroes Win!'
//     } else if (playerOne.health === 0 || playerTwo.health === 0) {
//         document.getElementById('results').innerHTML = 'Heroes Lose!'
//     }
// }

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
    kiba.update()
    // Draw and animate player 2
    // playerTwo.update()
    // Draw and animate enemy
    major.update()

    // Set each player's velocity to 0 
    if(kiba.velocity.x = 0){
        kiba.switchSprite('idle')  
    }

    // if(playerTwo.velocity.x = 0){
    //     playerTwo.switchSprite('idle')  
    // }

    if(major.velocity.x = 0 && major.isFacing === 'left'){
        major.switchSprite('revidle')  
    }

    // Player 1 Movement
  
    if (keys.a.pressed && kiba.lastKey === 'a') {
        kiba.velocity.x = -3
        kiba.switchSprite('revrun')
    } else if (keys.d.pressed && kiba.lastKey === 'd') {
        kiba.velocity.x = 3
        kiba.switchSprite('run')
    } else if (kiba.lastKey === 'a') {
        kiba.switchSprite('revidle')
    } else {
        kiba.switchSprite('idle')
    }

    if (kiba.velocity.y < 0 && kiba.isFacing === 'right') {
        kiba.switchSprite('jump')
    } else if (kiba.velocity.y < 0 && kiba.isFacing === 'left') {
        kiba.switchSprite('revjump')
    } else if (kiba.velocity.y > 0 && kiba.isFacing === 'right') {
        kiba.switchSprite('fall')
    } else if (kiba.velocity.y > 0 && kiba.isFacing === 'left') {
        kiba.switchSprite('revfall')
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
    if (keys.j.pressed && major.lastKey === 'j') {
        major.velocity.x = -3
        major.switchSprite('revrun')
    } else if (keys.l.pressed && major.lastKey === 'l') {
        major.velocity.x = 3
        major.switchSprite('run')
    } else if (major.lastKey === 'j') {
        major.switchSprite('revidle')
    } else {
        major.switchSprite('idle')
    }

    if (major.velocity.y < 0 && major.isFacing === 'right') {
        major.switchSprite('jump')
    } else if (major.velocity.y < 0 && major.isFacing === 'left') {
        major.switchSprite('revjump')
    } else if (major.velocity.y > 0 && major.isFacing === 'right') {
        major.switchSprite('fall')
    } else if (major.velocity.y > 0 && major.isFacing === 'left') {
        major.switchSprite('revfall')
    } 

    // Collision Detection - Player 1 / Player 2

    rectCollisionDetect(kiba, major)
    
    // Collision Detection - Enemy
    rectCollisionDetect(major, kiba)


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

animate()
// decreaseTimer()

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        // Player 1 Keys
        case 'd':
            keys.d.pressed = true
            kiba.isFacing = 'right'
            kiba.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            kiba.isFacing = 'left'
            kiba.lastKey = 'a'
            break
        case 'w':
            keys.w.pressed = true
            kiba.velocity.y = -6.5
            break
        case ' ':
            kiba.attack()
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
            major.isFacing = 'right'
            major.lastKey = 'l'
            break
        case 'j':
            keys.j.pressed = true
            major.isFacing = 'left'
            major.lastKey = 'j'
            break
        case 'i':
            keys.i.pressed = true
            major.velocity.y = -6.5
            break
        case 'k':
            major.attack()
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
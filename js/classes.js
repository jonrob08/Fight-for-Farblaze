
/**
 * Creating Player Class
    ** Constructor -------> 
        Position - Adding this because I need to be able to track Player's positioning on the canvas and refer to it. It's in the constructor arguments because I will have multiple Players so the positions need to be independent of each other.

        Velocity - Utilizing this to add movement to our Players
        Reference: http://www.noxtar.net/2016/03/html5-canvas-tutorial-applying-velocity.html

        Height - Need this to refer to the height of Player on y axis

        Width - Need this to refer to the width of Player on x axis

        lastKey - Need this to differentiate keys that are being held down, as multiple keys can be pressed down at once we also want to check which key was held down last. We instantiate it as a falsy value because when we press a key in the EventListener it becomes a string of that key which we can use later.

        hitBox - Need this common property to determine if a player or enemy was hit or not. Each Player has an attack so if that crosses another persons hitbox they will be hit. hitBox is an object that has a position that is the Player's position, a width of 100 (subject to change depending on attack range and how bold I'm feeling), and a height of 30 (also subject to change).

        isAttacking - Need this to check if a Player is attacking or not

        health - Need this to keep track of Player's health. Utilizing this to update the health bars in-game

    ** Methods ------> 
        Draw() - For reference I am drawing a rectangle placeholder for my Player 1 and Player 2. I am using a fillStyle to make my rectangle blue

        Update() - To be called in the animate function, here I'm calling my draw() method and adding velocity and gravity. The velocity gets added to the Player's position on the y axis and you can set individual velocities in the player objects. Next is an if statement that checks if the location of the bottom of the Player is greater than the location of the bottom of the canvas, if so, set the velocity to 0 stopping the Player.  

        Attack() - Sets isAttacking equal to true, and then sets it back to false after a setTimeout so the Player is not constantly attacking

*/

class Player {
    constructor({position, velocity, offset}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.hitBox = {
            // Changing position to have it's own x and y instead of inheriting the parents, and adding an offset for when the character is facing backwards or forwards
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: offset,
            width: 100,
            height: 50
        }
        this.isAttacking
        this.health = 100
    }

    draw() {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        // This is where the hitBox is drawn
        if(this.isAttacking){
            ctx.fillStyle = 'red'
            ctx.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)
        }
    }

    update() {
        this.draw()

        // Subtract the hitBox offset if there is one
        this.hitBox.position.x = this.position.x - this.hitBox.offset.x
        this.hitBox.position.y = this.position.y - this.hitBox.offset.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height > canvas.height - 39) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}

/**
 * Creating Sprites Class
    ** Constructor -------> 
        Position - Need this because I need to be able to set the Sprite's positioning on the canvas and refer to it. It's in the constructor arguments because I will have multiple Sprites so the positions need to be independent of each other.

        Image Source - Need this to be able to swap out the source of my image depending on what Sprite it is, so I'm adding it to the constructor arguments so I can set the source individually on any Sprite.  

        Scale - Need this to have a way to scale up my images, so I'm adding an argument called scale that will multiply the current height and width. I set it equal to 1 so the original size of the image stays in tact if need be. It's a parameter because not every Sprite needs to be scaled. 

        Frames Amount - Need this because I have to divide the amount of frames by the entire length of the sprite sheet in order to determine the length of one section. This has to be a parameter because sprite sheets have different amounts of frames. 

        Current Frame - Need this to track the current frame and iterate through the frames to mimic the appearance of animation. We use this by multiplying this by the spritesheet width divided by the amount of frames inside the sprite sheet. 

        Height - Need this to set the height of Sprite on the y axis

        Width - Need this to set the width of Sprite on the x axis

    ** Methods ------> 
        Draw() - Used to draw an image on the canvas. Using the draw image method I'm adding the first four arguments to crop sprite sheets and give the illusion of animation. 

        Update() - To be called on a Sprite object within the animate function, in updatehere I'm calling my draw() method first.

*/

class Sprite {
    constructor({ position, imageSrc, scale = 1, framesAmt = 1 }) {
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesAmt = framesAmt
        this.framesCur = 0
    }

    draw() {
        ctx.drawImage(
            this.image,
            // The width should be the image width(sprite sheet) divided by the max amount of frames within the image, then multiplied by the current frames. We start framesCur off at zero because we do not want there to be any crop at first, for instance if the width of the full sprite sheet was 800 and there were 4 different frames, we would have 0 * (800/4) which equals 0. Next framesCur will be 1 and it will move over 200px and start from the next available frame. Next it will be 2 and will move over 400px and display the next frame, and so on.
            this.framesCur * (this.image.width / this.framesAmt),
            // Start at the top left of the sprite sheet
            0,
            // Divide the width by however many images there are in the sprite sheet
            this.image.width / this.framesAmt,
            this.image.height,
            this.position.x, 
            this.position.y, 
            // You also need to divide the entire sprite sheet image width by however many images there are in it, or else it tries to stretch the cropped immage to it's original width. Divide this before you scale the image. 
            (this.image.width / this.framesAmt) * this.scale, 
            this.image.height * this.scale
            )
    }

    update() {
        this.draw()
        // In order for us to animate through the frames we need to increment through framesCur but we also need to check and make sure that framesCur is less than the framesAmt. Once it hits the limit it should reset to 0. We subtract 1 at the end because there are cases where there is only 1 frame and we want to keep drawing that. 
        if (this.framesCur < this.framesAmt - 1){
            this.framesCur++
        } else {
            this.framesCur = 0
        }
        
    }
}
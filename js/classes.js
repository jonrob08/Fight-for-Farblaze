
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
    constructor({ position, imageSrc, scale = 1, framesAmt = 1, offset = {x: 0, y: 0} }) {
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesAmt = framesAmt
        this.framesCur = 0
        this.framesElapsed = 0
        this.framesWait = 20
        this.offset = offset
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
            // Subtracting the offset from the image position so I can place it on the screen where is looks best regardless of padding in the original image 
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            // You also need to divide the entire sprite sheet image width by however many images there are in it, or else it tries to stretch the cropped immage to it's original width. Divide this before you scale the image. 
            (this.image.width / this.framesAmt) * this.scale, 
            this.image.height * this.scale
            )
    }

    animateFrames() {
        this.framesElapsed++

        // First checking to see if the amount of frames elapsed divided by the framesWait remainder is equal to zero, if so move to the next frame within the sprite sheet. Slowing down or speeding up our animation based on the number we pass to framesWait. Ex. if it's 2, it will happen every 2 frames so the frames will be extremely fast, as opposed to 200, less things are divisible by that over time so the frames will change a lot slower.
        if (this.framesElapsed % this.framesWait === 0) {
            // In order for us to animate through the frames we need to increment through framesCur but we also need to check and make sure that framesCur is less than the framesAmt. Once it hits the limit it should reset to 0. We subtract 1 at the end because there are cases where there is only 1 frame and we want to keep drawing that. 
            if (this.framesCur < this.framesAmt - 1){
                this.framesCur++
            } else {
                this.framesCur = 0
            }
        }
    }
    

    update() {
        this.draw()
        this.animateFrames()
    }   
}   


/**
 * Creating Player Class
 * -------
    ** Extends Sprite Class -------> 
        Needed to do this since our Players are no longer placeholder rectangles and I want to use the frames logic in my Sprite Class. A little refactoring and I'm able to create Players and give them all the properties that are available to a Sprite. 

        *** Extended Props
        Image Source - see Image Source in Sprite Class.  
        Scale -  see Scale in Sprite Class.  
        Frames Amount - see Frames Amount in Sprite Class.  
        Offset - see Offset in Sprite Class, or the Migos.  
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
            x: 0, y: 0
        },
        sprites,
        isFacing,
        // Potentially add an isMoving prop
        attackBox = { offset: {}, width: undefined, height: undefined },
        hitBox = { offset: {}, width: undefined, height: undefined }
    }) {
        super({
            // Inherit all the following properties from the parent Class
            position,
            imageSrc, 
            scale, 
            framesAmt,
            offset,
        })
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.attackBox = {
            // Changing position to have it's own x and y instead of inheriting the parents, and adding an offset for when the character is facing backwards or forwards
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.hitBox = {
            // Changing position to have it's own x and y instead of inheriting the parents, and adding an offset for when the character is facing backwards or forwards
            position: {
                x: this.position.x ,
                y: this.position.y
            },
            offset: hitBox.offset,
            width: hitBox.width,
            height: hitBox.height
        }
        this.isAttacking
        this.health = 100
        this.framesCur = 0
        this.framesElapsed = 0
        this.framesWait = 30
        this.sprites = sprites
        this.isFacing = isFacing

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    // draw() {

    //     This is where the hitBox is drawn
    //     if(this.isAttacking){
    //         ctx.fillStyle = 'red'
    //         ctx.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)
    //     }
    // }

    update() {
        this.draw()
        this.animateFrames()
        
        // Subtract the hitBox offset if there is one
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x
        this.attackBox.position.y = this.position.y - this.attackBox.offset.y

        //Keep this to visualize attackbox location
        ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        this.hitBox.position.x = this.position.x - this.hitBox.offset.x
        this.hitBox.position.y = this.position.y - this.hitBox.offset.y


        //Keep this to visualize hitbox location
        ctx.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // gravity function
        if (this.position.y + this.height + this.velocity.y > canvas.height - 85) {
            this.velocity.y = 0
            this.position.y = 342
        } else this.velocity.y += gravity
    }

    attack() {
        if(this.isFacing === 'right'){
        this.switchSprite('attack1')
        } else if (this.isFacing === 'left'){
        this.switchSprite('revattack1')
        }
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 10)
    }

    switchSprite(sprite) {
        if (this.image === this.sprites.attack1.image && this.framesCur < this.sprites.attack1.framesAmt - 1) {
            return
        } else if (this.image === this.sprites.revattack1.image && this.framesCur < this.sprites.revattack1.framesAmt - 1) {
            return
        }

        switch (sprite) {
            case 'idle':
                if(this.image !== this.sprites.idle.image)
                {
                    this.image = this.sprites.idle.image;
                    this.framesAmt = this.sprites.idle.framesAmt;
                    this.framesCurrent = 0;
                }
                break
            case 'revidle':
                if(this.image !== this.sprites.revidle.image)
                {
                    this.image = this.sprites.revidle.image;
                    this.framesAmt = this.sprites.revidle.framesAmt;
                    this.framesCurrent = 0;
                }
                break
            case 'run':
                if(this.image !== this.sprites.run.image)
                {
                    this.image = this.sprites.run.image;
                    this.framesAmt = this.sprites.run.framesAmt;
                    this.framesCurrent = 0;
                }
                break
            case 'revrun':
                    if(this.image !== this.sprites.revrun.image)
                    {
                        this.image = this.sprites.revrun.image;
                        this.framesAmt = this.sprites.revrun.framesAmt;
                        this.framesCurrent = 0;
                    }
                break
            case 'jump':
                if(this.image !== this.sprites.jump.image)
                {
                    this.image = this.sprites.jump.image;
                    this.framesAmt = this.sprites.jump.framesAmt;
                    this.framesCurrent = 0;
                }
                break
            case 'revjump':
                if(this.image !== this.sprites.revjump.image)
                {
                this.image = this.sprites.revjump.image;
                this.framesAmt = this.sprites.revjump.framesAmt;
                this.framesCurrent = 0;
                }
            break
            case 'fall':
                if(this.image !== this.sprites.fall.image)
                {
                this.image = this.sprites.fall.image;
                this.framesAmt = this.sprites.fall.framesAmt;
                this.framesCurrent = 0;
                }
            break
            case 'revfall':
                if(this.image !== this.sprites.revfall.image)
                {
                this.image = this.sprites.revfall.image;
                this.framesAmt = this.sprites.revfall.framesAmt;
                this.framesCurrent = 0;
                }
            break
            case 'attack1':
                if(this.image !== this.sprites.attack1.image)
                {
                this.image = this.sprites.attack1.image;
                this.framesAmt = this.sprites.attack1.framesAmt;
                this.framesCurrent = 0;
                }
            break
            case 'revattack1':
                if(this.image !== this.sprites.revattack1.image)
                {
                this.image = this.sprites.revattack1.image;
                this.framesAmt = this.sprites.revattack1.framesAmt;
                this.framesCurrent = 0;
                }
            break
        }
    }

}

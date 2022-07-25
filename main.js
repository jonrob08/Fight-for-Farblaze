console.log('connected')

// Grabbing the canvas and setting/grabbing the context
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Set canvas height and width to generic browser window size
canvas.width = 1024
canvas.height = 576

// Filling in the canvas background with a black rectangle
ctx.fillRect(0, 0, canvas.width, canvas.height)

// Creating Player Class
    // Position - because I need to be able to track it's positioning on the canvas and refer to it. It's in the constructor arguments because I will have multiple Players so they need to be independent of eachother. 
class Player {
    constructor(position) {
        this.position = position
    }
}

// Creating Player One
const playerOne = new Player({
    x: 0,
    y: 0
})

console.log(playerOne)
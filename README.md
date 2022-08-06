# Fight-for-Farblaze
Is a 2D multiplayer fighting game where you and your friend select your hero and battle enemies to save Farblaze! You can choose 1 player mode, 2 player mode, or versus mode. 

## Wire Frame
![Screenshot](./img/wireframe.png)

## Installation Instructions
Fork code from github and more the index.html file on chrome or play game from the link listed here: https://jonrob08.github.io/Fight-for-Farblaze/

# Explanation of Technologies Used
In this project, I use HTML and CSS mainly for adding different elements, formatting the game, and styling the game. I use Javascript to run the game, add in additional elements that need to be introduced during the game, create and animate objects, and determine win conditions of the game.

# Technologies Used
HTML
CSS
Google Fonts
Javascript 
Javascript Canvas
Javascript GSAP library(https://cdnjs.com/libraries/gsap)

### HTML
The whole game is wrapped in a div called game screen 
```
<div id="game-screen">
```

There are two two menus and a canvas game that toggle on and off based on the choices you make using these buttons 
    ```
    <button
        id="startmenu-btn2"
        class="menu-btn"
        onclick="characterSelectStart()"
    >
    </button>
    <button id="startmenu-btn" class="menu-btn" onclick="storyMode()">
    </button>
    <button id="startmenu-btn3" class="menu-btn" onclick="storyMode()">
    </button>
    ```

There are two health bars and a timer that appear on the canvas and are HTML elements
```
      <!-- container div -->
      <div id="wrapper">
        <!-- header containing status bars and timer -->
        <div class="header">
          <div
            style="
              position: relative;
              height: 30px;
              width: 100%;
              border: 4px solid white;
            "
          >
            <div
              style="
                background-color: rgb(255, 0, 0);
                height: 30px;
                width: 100%;
                z-index: 2;
              "
            ></div>
            player Health Bar
            <div
              id="player-current-health"
              style="
                position: absolute;
                background: #18402a;
                top: 0;
                right: 0;
                bottom: 0;
                width: 100%;
              "
            ></div>
          </div>
          <div id="timer"></div>
          <div
            style="
              position: relative;
              height: 30px;
              width: 100%;
              border: 4px solid white;
            "
          >
            <div
              style="
                background-color: rgb(255, 0, 0);
                height: 30px;
                width: 100%;
                z-index: 2;
              "
            ></div>
            AI/P2 Health Bar
            <div
              id="ai-current-health"
              style="
                position: absolute;
                background: #18402a;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                width: 100%;
              "
            >
```
        
        


### CSS 
Adding some styling to the character buttons for the character select screen
```
#select-major img{
    width: 125px;
    height: 125px;
    border-radius: 100%;
    left: 785px;
    top: 230px;
    position: absolute;
}
```
## JavaScript Functions and Rendering
Put code snippets here

## Rules

Story- 
one player or two players start from the left and work their way to the end point, defeating all the enemies along the way.

VS - 
attack the other player until one wins or the time runs out

### List of Assets Used
#### Background Image
Image Download: https://edermunizz.itch.io/free-pixel-art-forest
Creator: https://edermunizz.itch.io
#### Various Sprites
Image Download: https://brullov.itch.io/oak-woods
Creator: https://brullov.itch.io
### Dev Notes

4 Elements of game design - Challenge, Choice, Change, Chance

Add Audio
Add Second Attack
Add Reset Button
Add Second and Third Stages


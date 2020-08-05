const canvas = document.querySelector("#canvas");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const WHITE = "rgb(255, 255, 255)";
let animationID; 
const RED = "rgb(255, 0, 0)";
const GREEN = "rgb(51, 255, 0)";

//this makes any rectangle, whether player or bad guy (may also include bullets when we get there)
function makeRectangle (x,y,height,width,color, isPlayer) {
    return {
        x:x,
        y:y,
        height:height,
        width:width,
        xUpper: WIDTH - width,
        yUPPER: HEIGHT - height,
        xLower: 0,
        YLower: 0,
        color: color,
        isPlayer: isPlayer,
    }
}

//initializes the player
let player = makeRectangle(250,460,30,30,WHITE,true)
//will change later to make randomized along y =5 and x = random between 0 and 500
let badGuy = makeRectangle(randomInteger(30, 470), 40, 30, 30,RED,false)
// Blaster BABY!!!
let blaster = makeRectangle(player.x, player.y, 5, 5, GREEN, false)
//helper function to randomize for badGuy spawns
function randomInteger(min, max) {
    let range = max - min + 1
    let randomized = Math.floor(Math.random() * range)
    return min + randomized
}

//makes it so you can have player and other stuff on canvas and interact with them
function getContext() {
    return canvas.getContext("2d");
    
}

//creates the rectangle within the context
function drawRect(x,y,width,height,color) {
    let ctx = getContext();

    ctx.fillStyle = color;
    ctx.fillRect(x,y,width,height);
}

//implements draw of the rectangle, not just the function
drawRect(player.x, player.y, player.width, player.height, player.color);
drawRect(badGuy.x, badGuy.y, badGuy.width, badGuy.height, badGuy.color);

//makes it so there isn't a trailing history of movement for avatar
function clearScreen() {
    let context = getContext();
    context.clearRect(0,0,WIDTH,HEIGHT);
}

function updateBadGuyPosition() {
    badGuy.y += 3
}
function updateBlasterPosition() {
    blaster.y -= 6
}
//lets you move left and right
function keyPressListener (event) {
    if (event.key === "ArrowRight" && player.x < 455) {
        player.x += 13
    } 
    else if (event.key === "ArrowLeft" && player.x > 5) {
        player.x -= 13
    }
    else if (event.key === " ") {
        // Adding blaster
        drawRect(blaster.x, blaster.y, blaster.width, blaster.height, blaster.color);
    }
}

//creates frame by frame erasing screen each time so no trailing
function drawFrame() {
    clearScreen();
    drawRect(player.x, player.y, player.width, player.height, player.color);
    updateBadGuyPosition(); 
    updateBlasterPosition();
   /* if   (badGuy.y >= 470 || badGuy.y <=472) {
         document.querySelector("#score").innerHTML += 1 
         updateBadGuyPosition(); 
        }*/
    //need to draw blaster IF there is a blaster, but NOT if there is no blaster. later
    //we account for edge case of multiple shots of blaster in frame at once
    drawRect(blaster.x, blaster.y, blaster.width, blaster.height, blaster.color); 
    drawRect(badGuy.x, badGuy.y, badGuy.width, badGuy.height, badGuy.color);
    
}

//allows for gameplay to start and stop, and movement listener
window.addEventListener("keydown", keyPressListener);
document.querySelector("#start-button").addEventListener("click", () => animationID = window.setInterval(drawFrame, 20))
document.querySelector("#stop-button").addEventListener("click", () => window.clearInterval(animationID))






//couple of glitches to work out with will/tomorrow:
//1) speeds up each time you press start, need to limit to one
//2) slows down if you press stop until stops, allows multiple also
//3) blaster fires on start button, not on spacebar
//4) cant play multiple games unless refresh browser each time (handle w alert?)

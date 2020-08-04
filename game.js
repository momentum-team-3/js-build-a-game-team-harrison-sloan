const canvas = document.querySelector("#canvas");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const WHITE = "rgb(255, 255, 255)";
let animationID; 
/*
const RED = "rgb(255, 0, 0)";
const MINXPOSITION = 0;
const MINYPOSITION = 0;
*/

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

let player = makeRectangle(200,200,30,30,WHITE,true)

function getContext() {
    return canvas.getContext("2d");
    
}

function drawRect(x,y,width,height,color) {
    let ctx = getContext();

    ctx.fillStyle = color;
    ctx.fillRect(x,y,width,height);
}

drawRect(player.x, player.y, player.width, player.height, player.color);


function clearScreen() {
    let context = getContext();
    context.clearRect(0,0,WIDTH,HEIGHT);
}

function keyPressListener (event) {
    if (event.key === "ArrowUp") {
        player.y -= 10
    } else if (event.key === "ArrowDown") {
        player.y += 10
    } else if (event.key === "ArrowRight") {
        player.x += 10
    } else if (event.key === "ArrowLeft") {
        player.x -= 10
    }
    if (player.x > player.xUpper) {
        player.x = player.xLower
    } 
    if (player.x < player.xLower) {
        player.x = player.xUpper
    }
    if (player.y > player.yUpper) {
        player.y = player.yLower
    }
    if (player.y < player.yLower) {
        player.y = player.yUpper
    }
}


function drawFrame () {
    clearScreen();
    drawRect(player.x, player.y, player.width, player.height, player.color);
}


window.addEventListener("keydown", keyPressListener);
document.querySelector("#start-button").addEventListener("click", () => animationID = window.setInterval(drawFrame, 20))
document.querySelector("#stop-button").addEventListener("click", () => window.clearInterval(animationID))



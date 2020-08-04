const canvas = document.querySelector("#canvas");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const CHARTREUSE = "rgb(127,255,0)";
const BADGUYCOLOR = "rgb(128,0,255)";
const MINXPOSISH = 0;
const MINYPOSISH = 0;
let animationID;

function makeRectangle(x,y,height,width,color, isPlayer) {
    return {
        x:x,
        y:y,
        height:height,
        width:width,
        xUpper: WIDTH - width,
        yUpper: HEIGHT - height,
        xLower: 0,
        yLower: 0,
        color:color,
        isPlayer: isPlayer,
    }
}

// Math helper
function randomInteger(min, max) {
    let range = max - min + 1
    let randomized = Math.floor(Math.random() * range)
    return min + randomized
}

let player = makeRectangle(400,400,100,100,CHARTREUSE,true)
let badguy = makeRectangle(randomInteger(0,700),randomInteger(0,700),50,50,BADGUYCOLOR,false) 
badguy.velocity = [randomInteger(-5,5), randomInteger(-5,5)]


// get a new 2d drawing context
function getContext() {
    return canvas.getContext("2d");
}

// Clear the whole screen
function clearScreen() {
    let context = getContext();
    context.clearRect(0,0,WIDTH,HEIGHT);
}

// Draw a rectangle with given location, color, and size
function drawRect (x,y,width,height,color) {
    let ctx = getContext();

    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);

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

function areColliding(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
             return true
            } else {
                return false
            }
}

function updateBadGuyPosition () {
    badguy.x += badguy.velocity[0]
    badguy.y += badguy.velocity[1]

    if (badguy.x > badguy.xUpper) {
        badguy.x = badguy.xUpper
        badguy.velocity[0] *= -1
    } 
    if (badguy.x < badguy.xLower) {
        badguy.x = badguy.xLower
        badguy.velocity[0] *= -1
    }
    if (badguy.y > badguy.yUpper) {
        badguy.y = badguy.yUpper
        badguy.velocity[1] *= -1
    }
    if (badguy.y < badguy.yLower) {
        badguy.y = badguy.yLower
        badguy.velocity[1] *= -1
    }
}

/* check if key being pressed is an arrow key
function keyDownListener (event) {
//   let up = 
  // let right = RIGHTARROW
   
}
function keyUpListener (event) {
}
*/

// Erase the screen and draw a new frame
function drawFrame () {
    clearScreen();
    updateBadGuyPosition()
    if (areColliding(player, badguy)) {
        window.clearInterval(animationID)
        alert("You lost, Dork!")
    }

    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(badguy.x, badguy.y, badguy.width, badguy.height,badguy.color);
}

window.addEventListener("keydown", keyPressListener)

document.querySelector("#start-button").addEventListener("click", () => animationID = window.setInterval(drawFrame, 20))
document.querySelector("#stop-button").addEventListener("click", () => window.clearInterval(animationID))

























function makeRectangle(x,y,height,width,color, isPlayer) {
  return {
      x:x,
      y:y,
      height:height,
      width:width,
      xUpper: WIDTH - width,
      yUpper: HEIGHT - height,
      xLower: 0,
      yLower: 0,
      color:color,
      isPlayer: isPlayer,
  }
}

































function makeRectangle(x,y,height,width,color, isPlayer) {
  return {
      x:x,
      y:y,
      height:height,
      width:width,
      xUpper: WIDTH - width,
      yUpper: HEIGHT - height,
      xLower: 0,
      yLower: 0,
      color:color,
      isPlayer: isPlayer,
  }
}

































function makeRectangle(x,y,height,width,color, isPlayer) {
  return {
      x:x,
      y:y,
      height:height,
      width:width,
      xUpper: WIDTH - width,
      yUpper: HEIGHT - height,
      xLower: 0,
      yLower: 0,
      color:color,
      isPlayer: isPlayer,
  }
}

































function makeRectangle(x,y,height,width,color, isPlayer) {
  return {
      x:x,
      y:y,
      height:height,
      width:width,
      xUpper: WIDTH - width,
      yUpper: HEIGHT - height,
      xLower: 0,
      yLower: 0,
      color:color,
      isPlayer: isPlayer,
  }
}

































function makeRectangle(x,y,height,width,color, isPlayer) {
  return {
      x:x,
      y:y,
      height:height,
      width:width,
      xUpper: WIDTH - width,
      yUpper: HEIGHT - height,
      xLower: 0,
      yLower: 0,
      color:color,
      isPlayer: isPlayer,
  }
}











































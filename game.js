const canvas = document.querySelector("#canvas");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const WHITE = "rgb(255, 255, 255)";
let animationID;
const RED = "rgb(255, 0, 0)";
const GREEN = "rgb(51, 255, 0)";
const GOODGUY = "goodguy";
const BADGUY = "badguy";
const BLASTER = "blaster";
let objects = [];
var playerDX = 0;
Score = 0;


//this makes any rectangle, whether player or bad guy (may also include bullets when we get there)
function makeRectangle (x,y,height,width,color, charType) {
    return {
        x:x,
        y:y,
        height:height,
        width:width,
        color: color,
        charType: charType
    }
}

//helper function to randomize for badGuy spawn location
function randomInteger(min, max) {
    let range = max - min + 1
    let randomized = Math.floor(Math.random() * range)
    return min + randomized
}

//makes it so you can have player and other stuff on canvas and interact with them
function getContext() {
    return canvas.getContext("2d");
    
}

//makes new bad guys at set interval
function spawnBadGuy() {
    if (Math.random() < 0.005) {
    let bg = makeRectangle(randomInteger(30, 470), 40, 30, 30,RED,BADGUY);
    objects.push(bg);
    }
}


//creates the rectangle within the context
function drawRect(rectangle) {
    let ctx = getContext();

    ctx.fillStyle = rectangle.color;
    ctx.fillRect(rectangle.x,rectangle.y,rectangle.width,rectangle.height);
}


//makes it so there isn't a trailing history of movement for avatar
function clearScreen() {
    let context = getContext();
    context.clearRect(0,0,WIDTH,HEIGHT);
}

function updateBadGuyPosition(badGuy) {
    badGuy.y += 2;
}
function updateBlasterPosition(blaster) {
    blaster.y -= 6;
}
//lets you move left and right
function keyPressListener (event) {
    if (event.key === "ArrowRight") {
        playerDX += 13;
    } 
    else if (event.key === "ArrowLeft") {
        playerDX -= 13;
    }
    else if (event.key === " ") {
        // Adding blaster
        let player = objects.find((o) => o.charType === "goodguy")
        let blaster = makeRectangle(player.x + 12.5, player.y - 2, 5, 5, GREEN, BLASTER);
        objects.push(blaster);        
    }
}

//creates frame by frame erasing screen each time so no trailing
function drawFrame() {
    clearScreen();
    objectsLooper();
    spawnBadGuy();
    for (let item of objects) {
        drawRect(item);
    }
}


function updateGoodGuyPosition(object) {
    object.x += playerDX
    playerDX = 0
    if (object.x < 20) {
        object.x = 20;
    } 
    else if (object.x > 480) {
        object.x = 480;
    }
}


//dispatcher for colliding objects
function handleCollision(object1, object2) {
    if (object1.charType === GOODGUY && object2.charType === BADGUY) {
        handleGoodGuyBadGuyCollision();
    }
    if (object1.charType === BADGUY && object2.charType === GOODGUY) {
        handleGoodGuyBadGuyCollision();
    }
    if (object1.charType === BLASTER && object2.charType === BADGUY) {
        handleBlasterBadGuyCollision(object1, object2);
    }
    if (object1.charType === BADGUY && object2.charType === BLASTER) {
        handleBlasterBadGuyCollision(object1, object2);

    }
}

function handleGoodGuyBadGuyCollision() {
    alert("GAME OVER. THE GALAXY HAS FALLEN PREY TO COMIC SANS.")
    tearDown()

}







//if a blaster hits a bad guy, it will remove both from the screen
function handleBlasterBadGuyCollision(object1, object2) {
    removeFromArray(objects, object1);
    removeFromArray(objects, object2);
    Score += 1;
}


//helper function to remove things from the screen
function removeFromArray(arr, obj) {    
    arr.splice(arr.indexOf(obj), 1); 
    }

//dispatcher for movement of the different objects
function updatePosition(object) {
    if (object.charType === GOODGUY) {
        updateGoodGuyPosition(object);
    }

    if (object.charType === BADGUY) {
        updateBadGuyPosition(object);
    }
    if (object.charType === BLASTER) {
        updateBlasterPosition(object);
    }
}

//dispatcher for movement of the different objects
function isColliding(object1, object2) {
        if (object1.x < object2.x+object2.width && 
            object1.x + object1.width > object2.x && 
            object1.y < object2.y+object2.height &&
            object1.y + object1.height > object2.y) {
            return true;
        }
        else {
            return false;
        }
    }


//updating things in the array
function objectsLooper() {
    for (let i = 0; i < objects.length; i++) {
        let currentObject = objects[i];
        updatePosition(currentObject);
        for (let j = 0; j < objects.length; j++) {
            if ( i !== j && isColliding(currentObject, objects[j])) {
                handleCollision(currentObject, objects[j]);
            }
        }
    }
}



//start the game
function startUp() {
    animationID = window.setInterval(drawFrame, 20);
    document.querySelector("#start-button").setAttribute("disabled", true);
    let player = makeRectangle(250, 470, 30, 30, WHITE, GOODGUY);
    objects.push(player);
    drawRect(player);
}
//stop the game
function tearDown() {
    window.clearInterval(animationID);
    document.querySelector("#start-button").removeAttribute("disabled");
    objects.splice(0)
    clearScreen()
}


//allows for gameplay to start and stop, and movement listener
window.addEventListener("keydown", keyPressListener);
document.querySelector("#start-button").addEventListener("click", startUp);
document.querySelector("#stop-button").addEventListener("click", tearDown);



const canvas = document.querySelector("#canvas");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const WHITE = "rgb(255, 255, 255)";
const RED = "rgb(255, 0, 0)";
const MINXPOSIH = 0;
const MINYPOSIH = 0;

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
        color:color,
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

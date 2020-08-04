const Keyboarder = {
  keyState: {},
  isDown: function (keyCode) {
    return this.keyState[keyCode] === true
  },
  on: function (keyCode, callback) {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === keyCode) {
        callback()
      }
    })
  }
}

let player = makeRectangle(400,400,50,50,CHARTREUSE,true)
function drawRect (x,y,width,height,color) {
  let ctx = getContext();

  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);



window.addEventListener('keydown', function (e) {
  Keyboarder.keyState[e.keyCode] = true
})

window.addEventListener('keyup', function (e) {
  Keyboarder.keyState[e.keyCode] = false
})

Keyboarder.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, S: 83 }

/** @type {HTMLCanvasElement}**/
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;
let canvasPosition = canvas.getBoundingClientRect();

const explosions = [];

class Explosion {
  constructor(x, y) {
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 0.5;
    this.height = this.spriteHeight * 0.5;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "boom.png";
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random() * 6.2;
    this.sound = new Audio();
    this.sound.src = "boom.wav";
  }

  update() {
    if (this.frame === 0) this.sound.play();
    this.timer++;
    if (this.timer % 5 === 0) {
      this.frame++;
    }
  }
  draw() {
    // ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh)
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }
}

window.addEventListener("click", (e) => {
  createAnimation(e);
});

const createAnimation = (e) => {
  //offsetting the position since the event listener doesnt take into account the position on the canvas.

  //also offsetting the x and y position by half the width and height so that the mouse cursor is in the middle when the rectangle is drawn

  let positionX = e.x - canvasPosition.left;
  let positionY = e.y - canvasPosition.top;

  explosions.push(new Explosion(positionX, positionY));
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update();
    explosions[i].draw();
    if (explosions[i].frame > 5) {
      explosions.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
};

animate();

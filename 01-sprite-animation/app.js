const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
let playerState = "idle";
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", (e) => {
  playerState = e.target.value;
});

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "shadow_dog.png";
const spriteWidth = 575;
const spriteHeight = 523;

let gameFrame = 0;
const staggerFrames = 4;

const spriteAnimation = [];
const animationStates = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];

//creating a position map for each and every state so that we are able to show correct animation and correct number of frames for each animation state
animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = spriteWidth * j;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimation[state.name] = frames;
});
// console.log(spriteAnimation);

//animation loop
const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimation[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimation[playerState].loc[position].y;

  //drawImage(image,x,y)
  //drawImage(image,x,y,width,height)
  //drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh)
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  //controlling the speed of the animation

  if (gameFrame < 9007199254740991) gameFrame++;
  else gameFrame = 0;

  requestAnimationFrame(animate);
};

animate();

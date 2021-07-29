const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var bridge;
var leftSide, rightSide, jointPoint2, jointPoint1;
var jointLink;
var ground;
//var stone;
var stones = [];
var bgImg, stoneImg, logImg, zombieImg, axeImg;
var zombie;
var breakButton;
var axe;

function preload()
{
  bgImg = loadImage('background.png');
  stoneImg = loadImage('stone.png');
  logImg = loadImage('wood.png');
  zombieImg = loadImage('zombie.png');
  axeImg = loadImage('axe.png'); 
}

function setup() {
  createCanvas(1700, 775); 
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  jointPoint2 = new newBase(width-250, height/2 - 100, 40, 20);
  ground = new newBase(0, height-10, width*2, 20);

  bridge = new createBridge(30, {x:50,y:height/2 - 140}); 
  rightSide = new newBase(width-100, height-300, 200, height/2 + 100);
  leftSide = new newBase(100, height-300, 200, height/2 + 100); 

  Matter.Composite.add(bridge.body, jointPoint2);
  jointLink = new newLink(bridge, jointPoint2);

  for (var i = 0; i <= 8; i++)
  {
    var x = random( width / 2 - 200, width / 2 + 300);
    var y = random( -100, 100);
    var stone = new createStone(x, y, 100, 100);
    stones.push(stone);
  }

  zombie = createSprite(width/2, height - 110, 10, 10);
  zombie.addImage(zombieImg);
  zombie.scale = 0.15;
  zombie.velocityX = 2;

  breakButton = createButton("");
  breakButton.position(width-200, height/2 - 50);
  breakButton.size(50, 50);
  breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);

}

function draw() {
  background(bgImg);  
  Engine.update(engine);

  bridge.show();

  leftSide.display();
  rightSide.display();
  jointPoint2.display();

  for (var i = 0; i <=8; i++)
  {
    stones[i].display();
  }
  
  drawSprites();
}

function handleButtonPress()
{
  jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}
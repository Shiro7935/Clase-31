const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

var bg_img;
var food;
var rabbit;

var elComeCuerdas;
var endRabbit;

var rabbitBlink;
var rabbitEat;
var sadRabbit;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  rabbitBlink = loadAnimation('blink_1.png','blink_2.png','blink_3.png')
  rabbitEat = loadAnimation('eat_0.png','eat_1.png','eat_2.png','eat_3.png','eat_4.png')
  sadRabbit = loadAnimation('sad_1.png','sad_2.png','sad_3.png')
  
  rabbitBlink.playing = true;
  rabbitEat.playing = true;
  sadRabbit.playing = true;

  sadRabbit.looping = false;
  rabbitEat.looping = false;  
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  rabbitBlink.frameDelay = 20;
  rabbitEat.frameDelay = 20;

  elComeCuerdas = createSprite(200,620,100,100);
  elComeCuerdas.addAnimation("parpadeo",rabbitBlink)
  elComeCuerdas.addAnimation("tristeza",sadRabbit)
  elComeCuerdas.addAnimation("Comercuerdas",rabbitEat)
  elComeCuerdas.scale = 0.25555555555551;

  endRabbit = createImg("cut_button.png");
  endRabbit.position(220,30);
  endRabbit.size(50,50);
  endRabbit.mouseClicked(drop);

  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);

  image(bg_img,width/2,height/2,490,690);

 if (fruit != null) {
  image(food,fruit.position.x,fruit.position.y,70,70);
 }
  rope.show();
  Engine.update(engine);
  ground.show();

if (collide(fruit,elComeCuerdas) == true) {
  elComeCuerdas.changeAnimation("Comercuerdas")
}
 
if (collide(fruit,ground) == true ) {
  elComeCuerdas.changeAnimation("tristeza")
}

   drawSprites();
}

function drop () {
  rope.break(); 
  fruit_con.detach()
  fruit_con = null
}

function collide(body,sprite) {
  if (body != null) {
    var distance = dist(body.position.x, body.position.y,sprite.position.x,sprite.position.y)
    if (distance <= 80) {
      World.remove(engine.world,fruit)
      fruit = null;
      return true;

    }
    else {
      return false; 

    }

  }

}
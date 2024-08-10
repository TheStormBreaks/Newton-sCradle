const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var bobObject1, bobObject2, bobObject3, bobObject4, bobObject5, roofObject;
var rope1, rope2, rope3, rope4, rope5;
var world;
var positions = [[], [], [], [], []]; // To store positions of the bobs over time
var time = []; // To store the corresponding time points

function setup() {
  createCanvas(1600, 700);
  rectMode(CENTER);

  engine = Engine.create();
  world = engine.world;

  roofObject = new roof(350, 90, 280, 20);

  bobDiameter = 40;

  bobObject1 = new bob(350 - bobDiameter * 2, 400, bobDiameter);
  bobObject2 = new bob(350 - bobDiameter, 400, bobDiameter);
  bobObject3 = new bob(350, 400, bobDiameter);
  bobObject4 = new bob(350 + bobDiameter, 400, bobDiameter);
  bobObject5 = new bob(350 + bobDiameter * 2, 400, bobDiameter);
  
  roof1 = new roof(350, 90, 280, 20);
  rope1 = new rope(bobObject1.body, roof1.body, -bobDiameter * 2, 0);
  rope2 = new rope(bobObject2.body, roof1.body, -bobDiameter, 0);
  rope3 = new rope(bobObject3.body, roof1.body, 0, 0);
  rope4 = new rope(bobObject4.body, roof1.body, bobDiameter, 0);
  rope5 = new rope(bobObject5.body, roof1.body, bobDiameter * 2, 0);

  Engine.run(engine);
}

function draw() {
  rectMode(CENTER);
  background(230);
  roofObject.display();

  rope1.display();
  rope2.display();
  rope3.display();
  rope4.display();
  rope5.display();

  bobObject1.display();
  bobObject2.display();
  bobObject3.display();
  bobObject4.display();
  bobObject5.display();

  // Record positions for the graph
  positions[0].push(bobObject1.body.position.x);
  positions[1].push(bobObject2.body.position.x);
  positions[2].push(bobObject3.body.position.x);
  positions[3].push(bobObject4.body.position.x);
  positions[4].push(bobObject5.body.position.x);
  time.push(frameCount);

  // Display the graph
  drawGraph();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    Matter.Body.applyForce(bobObject1.body, bobObject1.body.position, {x: -50, y: -45});
  }
}

// Function to draw the graph
function drawGraph() {
  push();
  translate(800, 100);
  noFill();
  strokeWeight(2);

  // Draw time vs. position graph
  stroke(255, 0, 0);
  beginShape();
  for (let i = 0; i < positions[0].length; i++) {
    vertex(time[i] * 0.1, positions[0][i] * 0.1);
  }
  endShape();

  stroke(0, 255, 0);
  beginShape();
  for (let i = 0; i < positions[1].length; i++) {
    vertex(time[i] * 0.1, positions[1][i] * 0.1);
  }
  endShape();

  stroke(0, 0, 255);
  beginShape();
  for (let i = 0; i < positions[2].length; i++) {
    vertex(time[i] * 0.1, positions[2][i] * 0.1);
  }
  endShape();

  stroke(255, 255, 0);
  beginShape();
  for (let i = 0; i < positions[3].length; i++) {
    vertex(time[i] * 0.1, positions[3][i] * 0.1);
  }
  endShape();

  stroke(255, 0, 255);
  beginShape();
  for (let i = 0; i < positions[4].length; i++) {
    vertex(time[i] * 0.1, positions[4][i] * 0.1);
  }
  endShape();

  pop();
}

import PIXI_NS from "../Libraries/pixi.js";
/** @type {typeof import("pixi.js")} */
const PIXI = PIXI_NS;

import unsafe_eval_js from "../Libraries/unsafe-eval.js";
Object.assign(PIXI, unsafe_eval_js); 

import { Grass } from "../Modules/grass.js";
import { Tree } from "../Modules/tree.js";
import { Flower } from "../Modules/flower.js";

// constants
const WIDTH = 640;
const HEIGHT = 360;

// Initialize the app
const app = new PIXI.Application;

// Create grass object
const grass = new Grass();
grass.makeData();
grass.makeGraphic();
const grass_graphic = grass.getGraphic();
grass_graphic.scale = 0.5;
grass_graphic.rotation = Math.PI;
grass_graphic.x = 100;
grass_graphic.y = 100;

// Create flower object
const flower = new Flower();
flower.makeData();
flower.makeGraphic();
const flower_graphic = flower.getGraphic();
//console.log(flower_graphic);
flower_graphic.x = 300;
flower_graphic.y = 200;


await app.init({
  backgroundColor: 0xaabbff, 
  width: WIDTH, 
  height: HEIGHT, 
  antialias: true,
  resolution: 1 });

app.stage.addChild(grass_graphic);
app.stage.addChild(flower_graphic);

document.body.append(app.canvas);

// Animation
// Count seconds that it has been running
let elapsed = 0.0;
let growth = 0.0;
// Listen for animate update
let ticker = PIXI.Ticker.shared;
ticker.autoStart = false;

// Create tree object
const tree = new Tree();
tree.makeData();
const tree_graphic = tree.makeGraphic(0.6);
tree.makeGraphic(0.601);
tree_graphic.position.set(200, 200);

app.stage.addChild(tree_graphic); 

// A growing tree
const tree_growing = new Tree();
tree_growing.makeData();
const tree_growing_graphic = tree_growing.makeGraphic(0);
tree_growing_graphic.position.set(300, 300);
app.stage.addChild(tree_growing_graphic); 


ticker.add(function(ticker) {
  growth += 0.001;
  // update the graphic
  tree_growing.makeGraphic(growth);
});

// function onClick() {
  // console.log("hello"); 
  // growth += 0.01;
  // tree_growing.makeGraphic(growth);
// }

// app.stage.eventMode = 'static';
// app.stage.hitArea = app.screen;
// app.stage.on('pointerdown', onClick); 

ticker.start();

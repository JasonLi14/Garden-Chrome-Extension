import { Grass } from "./Modules/grass.js";

// constants
const WIDTH = 640;
const HEIGHT = 360;

// Initialize the app
const app = new PIXI.Application();

// Create grass object
const grass = new Grass();
grass.makeData();
grass.makeGraphic();
const grass_graphic = grass.getGraphic();
grass_graphic.scale = 0.5;
grass_graphic.rotation = Math.PI;
grass_graphic.x = 100;
grass_graphic.y = 100;



await app.init({
  backgroundColor: 0xaabbff, 
  width: WIDTH, 
  height: HEIGHT, 
  antialias: true,
  resolution: 1 });

app.stage.addChild(grass_graphic);

document.body.append(app.canvas);

// Animation
// Count seconds that it has been running
let elapsed = 0.0;
app.ticker.add((ticker) => {
  // Add the time to our total elapsed time
  elapsed += ticker.deltaTime;
  // test movement
  // grass.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
});
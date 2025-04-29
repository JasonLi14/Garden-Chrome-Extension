// constants
const app = new PIXI.Application();
const WIDTH = 640;
const HEIGHT = 360;

// test
let obj = new PIXI.Graphics()
  .rect(0, 0, 200, 100)
  .fill(0xff0000);

await app.init({ width: WIDTH, height: HEIGHT });
app.stage.addChild(obj);
console.log("Hello World");

document.body.append(app.canvas);


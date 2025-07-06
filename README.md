# Garden Game
## About
This is a fun chrome extension.

## Note to future self:
You have to alter the pixi.js file a little bit. First, you have to export the pixi file by adding export default at the bottom. I.e. add at the bottom:
```js
export default PIXI;
```

Next, in unsafe eval, you have to export it and then change the top this to global this. 
```js
import PIXI from "./pixi.js";

globalThis.PIXI = PIXI || {};
```

Then, on the files using PIXI, to get documentation do:
```js
import PIXI_NS from "../Libraries/pixi.js";
/** @type {typeof import("pixi.js")} */
const PIXI = PIXI_NS;
```
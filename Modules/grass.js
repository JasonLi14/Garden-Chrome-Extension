import { Plant } from "./plants.js";
import PIXI from "../Libraries/pixi.js";

export function Grass(size=100, min_amt=10) {
    Plant.call(this, size);
    
    this.min_amt = min_amt;

    // create data for grass
    this.makeData = function() {
        // find amount of grass
        const amount = Math.floor(Math.random() * this.min_amt + this.min_amt);
        let y = 0;
        let previous = 0;

        for (let i = 0; i < amount; i++) {
            // a blade of grass
            const blade_width = this.size * Math.random() / 5;
            const blade_height = this.size / 2 * Math.random() + this.size;
            const blade_offset = blade_width * Math.random();
            this.data.push([previous, y, previous + blade_offset, y + blade_height, previous + blade_width, y]);

            // update previous
            previous = previous + blade_offset;
            
        }
    }

    // Draw the grass graphic
    this.makeGraphic = function(growth=1) {
        // create the object from data
        const data_length = this.data.length;
        for (let i = 0; i < data_length * growth; ++i) {
            const blade = new PIXI.Graphics()
                .poly(this.data[i])
                .fill(0x00aa00);          
            this.graphic.addChild(blade);
        }
        
    }
}
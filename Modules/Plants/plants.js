/**
 * @file The default plant class which all other plants inherit from.
 * @author Jason Li
 */

import PIXI_NS from "../../Libraries/pixi.js";
/** @type {typeof import("pixi.js")} */
const PIXI = PIXI_NS;
/**
 * The default plant class. All plant descendants should implement `makeData` and `makeGraphic`
 */
export function Plant() {
    this.size = 100;
    this.growth = 0;
    this.data_index = 0;
    this.data = [];

    /**
     * For information so that we can customize a plant each time.
     */
    this.info = {};

    /**
     * Sets the plant's data to `data`.
     * @param {array} data 
     */
    this.loadData = function(data) {
        this.data = data;
    }

    /**
     * For generating data for a plant based on some info
     */
    this.makeData = function() {}

    /**
     * For creating the actual plant graphic at a certain `growth` level. 
     */
    this.makeGraphic = function(growth=1) {} 

    /**
     * To be used with the `makeGraphic` function to let the object know 
     * about how the graphic ended.
     */
    this.prev_info = {};

    /**
     * Returns the generated graphic of the plant at the current growth level.
     * @returns {PIXI.Container}
     */
    this.getGraphic = function() {
        return this.graphic;
    }

    // Initialize an empty container as the base graphic
    this.graphic = new PIXI.Container({
        x:0,
        y:0
      });
    
}






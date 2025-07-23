import PIXI_NS from "../Libraries/pixi.js";
/** @type {typeof import("pixi.js")} */
const PIXI = PIXI_NS;

import { Plant } from "./plants.js";
import { randomInt, randomSign, randomFloat } from "../Utilities/random.js";

/**
 * A customizable tree class, inherits from ```Plant```
 * @param {float} size: int, the size of the tree.
 */
export function Tree(size=100) {
    // Inherit from plant
    Plant.call(this, size);

    // Stores info about the tree. These are just basic stats.
    this.info = {
        "Size": 200,
        "Max Branching": 2,
        "Min Branching": 3,
        "Layers": 4,
        "Height Variation": 0.2,
        "Thickness": 20,
        "Thinning": 5,
        "Balanced Root": true,
        "Balanced": true,
        "Min Spread": 0.2,
        "Max Spread": 1.3,
        "Branch Color": 0x753c85,
        "Leaf Color": 0x00ff00,
        "Equal Branch Lengths": true,
        "Branch Decay": 1, // Float from 0 to 1 about how many less branches per layer
        "Leaf Size": 10,
        "Leaf Ratio": 1,  
        "Leaf Over Branch": true  // whether it's leaf ratio of leaves per branch, or
        // leaf ratio branches per leaf
    };

    this.makeData = function() {    
        // Generate the tree    
        this.data = [[1, 0, 0, this.info["Thickness"]]];  // [num branches, x, y]

        let layer_start = 0;
        // Get the number of layers, i is the number of layers
        for (let i = 0; i < this.info["Layers"]; ++i) {
            // Every loop we need to get the end of the array
            const new_length = this.data.length;
            for (let j = layer_start; j < new_length; ++j) {
                // Create branches from the current branch we are on
                for (let k = 0; k < this.data[j][0]; ++k) {
                    // Find a number of branches to create
                    let new_branches = randomInt(this.info["Min Branching"], this.info["Max Branching"]);
                    // The last nodes should not have new branches
                    if (i === this.info["Layers"] - 1) {
                        new_branches = 0;
                    }

                    // Generate x and y coordinates
                    // branch_size is the size of the branch we want to be around
                    const branch_size = this.info["Size"]/this.info["Layers"];
                    // offset is how far the branches are, absolutely, in the x-direction
                    const offset = randomFloat(this.info["Min Spread"], this.info["Max Spread"]) * branch_size / 2;
                    
                    let new_x = offset * randomSign() + this.data[j][1];
                    
                    // Adjust the base branch to not be too extrmee
                    if (i === 0) {
                        new_x /= 5;
                    } else if (i === 1 && this.info["Balanced Root"] === true) {
                        if (k === 0) {
                            // The first branch will be towards the left
                            new_x = this.data[j][1] - offset;
                        } else if (k === 1) {
                            // The second branch will be towards the right
                            new_x = this.data[j][1] + offset;
                        }
                    } else if (this.info["Balanced"] === true) {
                        if (k === 0) {
                            // The first branch will be towards the left
                            new_x = this.data[j][1] - offset;
                        } else if (k === 1) {
                            // The second branch will be towards the right
                            new_x = this.data[j][1] + offset;
                        }
                    }

                    // Find the y coordinate of the branch
                    let new_y = randomInt(this.data[j][2] + (1 - this.info["Height Variation"]) * branch_size, 
                                          this.data[j][2] + branch_size);

                    // Check if equalized branches (i.e. ues Pythagorean distance)
                    if (this.info["Equal Branch Lengths"] === true) {
                        // Find the distance in the x direction
                        const x_dist = this.data[j][1] - new_x;
                        new_y = (branch_size ** 2 - x_dist ** 2) ** (1/2) + this.data[j][2];
                    }

                    // Get the thickness of the new branch
                    const thickness = this.info["Thickness"] - i * this.info["Thinning"];
                    this.data.push([new_branches, new_x, new_y, thickness])
                }
            }
            layer_start = new_length;  
        }
        return this.data;
    }

    // We need to store a reference to the last thing rendered 
    // And the last node we were building from
    this.prev_info = {
        "last_thing": null,
        "last_node": 0
    }; 

    this.makeGraphic = function(growth=1) {
        // growth must be between 0 and 1
        if (growth > 1) {
            growth = 1; 
        }

        // For a heuristic, reverse growing is the same as growing from 1
        if (this.growth > growth) {
            this.growth = 0;
        }
        // If it's already fully grown
        if (this.growth === 1) {
            return this.graphic;
        }
        // Set growth to 
        
        // Figure out how many objects there are to render
        const data_length = this.data.length;
        // Find the index to start on
        const start = Math.floor(growth * data_length); 
        part_i = start;
        prev_i = this.prev_info["last_node"];
        while (part_i < data_length * growth) {
            // Delete the last thing so that we can re-render it
            if (this.prev_info["last_thing"] != null) {
                this.prev_info["last_thing"].destroy();
            } 
            // Create a new branch
            const branch = new PIXI.Graphics()
                // Make it start from the previous node
                .moveTo(this.data[prev_i][1], this.data[prev_i][2]);

            
        }

        // Make the root the anchor
        this.graphic.pivot.set(0, 0);
        this.graphic.angle = 180;
        return this.graphic;
    }

}
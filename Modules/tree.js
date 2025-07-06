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

    // Stores info about the tree
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
                // Create branches 
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

    this.makeGraphic = function(growth=1) {
        // growth must be between 0 and 1
        if (growth > 1) {
            growth = 1; 
        }
        
        // Figure out how many objects there are to render
        const data_length = this.data.length;
        let branch_i = 1;
        let prev_i = 0;
        while (branch_i < data_length * growth) {
            for (let i = 0; i < this.data[prev_i][0]; ++i) {
                // Create the new line
                const branch = new PIXI.Graphics()
                    .moveTo(this.data[prev_i][1], this.data[prev_i][2]);

                // Check if it is the last branch
                if (branch_i > data_length * growth) {
                    break;
                } else if (branch_i + 1 > data_length * growth && growth != 1) {
                    // Find an intermediate value
                    const part = data_length * growth - branch_i;
                    console.log(data_length * growth, branch_i, part);
                    // Grow the branch partly
                    const part_x = (this.data[branch_i][1] - this.data[prev_i][1]) * part + this.data[prev_i][1];
                    const part_y = (this.data[branch_i][2] - this.data[prev_i][2]) * part + this.data[prev_i][2];
                    branch.lineTo(part_x, part_y);
                } else {
                    branch.lineTo(this.data[branch_i][1], this.data[branch_i][2]);
                }
                
                // Style the branch
                branch.stroke({width: this.data[branch_i][3], color: this.info["Branch Color"]});

                ++branch_i;

                this.graphic.addChild(branch);
            }
            ++prev_i;
        }

        // Make the root the anchor
        this.graphic.pivot.set(0, 0);
        this.graphic.angle = 180;
        return this.graphic;
    }

}
import PIXI from "../Libraries/pixi.js";
import { Plant } from "./plants.js";
import { randomInt } from "../Utilities/random.js";

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
        "Spread": 0.7,
        "Thickness": 8,
        "Thinning": 1.5,
        "Balanced Root": true,
        "Balanced": true,
        "Min Spread": 0.5,
        "Branch Color": 0x753c85,
        "Leaf Color": 0x00ff00,
        "Equal Branch Lengths": true,
    };

    this.makeData = function() {    
        // Generate the tree    
        this.data = [[1, 0, 0, this.info["Thickness"]]];  // [num branches, x, y]

        let layer_start = 0;
        // Get the right amount of layers
        for (let i = 0; i < this.info["Layers"]; ++i) {
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
                    const branch_size = this.info["Size"]/this.info["Layers"];
                    const offset = randomInt(this.info["Min Spread"] * branch_size, branch_size) * this.info["Spread"];
                    let new_x = offset - branch_size / 2 + this.data[j][1];
                    
                    // Adjust the base branch
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
                    // Check if equalized branches (i.e. ues Pythagorean distance)
                    let new_y = randomInt(this.data[j][2] + (1 - this.info["Height Variation"]) * branch_size, this.data[j][2] + branch_size);
                    if (this.info["Equal Branch Lengths"] === true) {
                        const x_dist = this.data[j][1] - new_x;
                        new_y = (branch_size ** 2 - new_x ** 2) ** (1/2) + this.data[j][2];
                    }
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
                if (branch_i + 1 > data_length * growth && growth != 1) {
                    // Find an intermediate value
                    const part = data_length * growth - branch_i;
                    const part_x = (this.data[branch_i][1] - this.data[prev_i][1]) * part + this.data[prev_i][1];
                    const part_y = (this.data[branch_i][2] - this.data[prev_i][2]) * part + this.data[prev_i][2];
                    branch.lineTo(part_x, part_y);
                } else {
                    branch.lineTo(this.data[branch_i][1], this.data[branch_i][2]);
                }
                branch.stroke({width: this.data[branch_i][3], color: this.info["Branch Color"]});
                
                ++branch_i;

                // Stop growth
                if (branch_i > data_length * growth) {
                    break;
                }
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
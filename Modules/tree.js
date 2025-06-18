import { Plant } from "./plants.js";

export function Tree() {
    // Inherit from plant
    Plant.call(this, size);

    const info = {
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

    function makeData() {    
        // Generate the tree    
        const tree_data = [[1, 0, 0, info["Thickness"]]];  // [num branches, x, y]

        let layer_start = 0;
        // Get the right amount of layers
        for (i = 0; i < info["Layers"]; ++i) {
            const new_length = tree_data.length;
            for (j = layer_start; j < new_length; ++j) {
                // Create branches 
                for (k = 0; k < tree_data[j][0]; ++k) {
                    // Find a number of branches to create
                    let new_branches = randomInt(info["Min Branching"], info["Max Branching"]);
                    // The last nodes should not have new branches
                    if (i === info["Layers"] - 1) {
                        new_branches = 0;
                    }
                    // Generate x and y coordinates
                    const branch_size = info["Size"]/info["Layers"];
                    const offset = randomInt(info["Min Spread"] * branch_size, branch_size) * info["Spread"];
                    let new_x = offset - branch_size / 2 + tree_data[j][1];
                    
                    // Adjust the base branch
                    if (i === 0) {
                        new_x /= 5;
                    } else if (i === 1 && info["Balanced Root"] === true) {
                        if (k === 0) {
                            // The first branch will be towards the left
                            new_x = tree_data[j][1] - offset;
                        } else if (k === 1) {
                            // The second branch will be towards the right
                            new_x = tree_data[j][1] + offset;
                        }
                    } else if (info["Balanced"] === true) {
                        if (k === 0) {
                            // The first branch will be towards the left
                            new_x = tree_data[j][1] - offset;
                        } else if (k === 1) {
                            // The second branch will be towards the right
                            new_x = tree_data[j][1] + offset;
                        }
                    }
                    // Check if equalized branches (i.e. ues Pythagorean distance)
                    let new_y = randomInt(tree_data[j][2] + (1 - info["Height Variation"]) * branch_size, tree_data[j][2] + branch_size);
                    if (info["Equal Branch Lengths"] === true) {
                        const x_dist = tree_data[j][1] - new_x;
                        new_y = (branch_size ** 2 - new_x ** 2) ** (1/2) + tree_data[j][2];
                    }
                    const thickness = info["Thickness"] - i * info["Thinning"];
                    tree_data.push([new_branches, new_x, new_y, thickness])
                }
            }
            layer_start = new_length;  
        }
        return tree_data;
    }

    function drawTree(tree_data, growth=1) {
        // growth must be between 0 and 1
        if (growth > 1) {
            growth = 1; 
        }
        // load the tree
        const tree = new PIXI.Container();
        
        const data_length = tree_data.length;
        let branch_i = 1;
        let prev_i = 0;
        while (branch_i < data_length * growth) {
            for (i = 0; i < tree_data[prev_i][0]; ++i) {
                // Create the new line

                const branch = new PIXI.Graphics()
                    .moveTo(tree_data[prev_i][1], tree_data[prev_i][2]);
                // Check if it is the last branch
                if (branch_i + 1 > data_length * growth && growth != 1) {
                    // Find an intermediate value
                    const part = data_length * growth - branch_i;
                    const part_x = (tree_data[branch_i][1] - tree_data[prev_i][1]) * part + tree_data[prev_i][1];
                    const part_y = (tree_data[branch_i][2] - tree_data[prev_i][2]) * part + tree_data[prev_i][2];
                    branch.lineTo(part_x, part_y);
                } else {
                    branch.lineTo(tree_data[branch_i][1], tree_data[branch_i][2]);
                }
                branch.stroke({width: tree_data[branch_i][3], color: info["Branch Color"]});
                
                ++branch_i;

                // Stop growth
                if (branch_i > data_length * growth) {
                    break;
                }
                tree.addChild(branch);
            }
            ++prev_i;
        }

        // Make the root the anchor
        tree.pivot.set(0, 0);
        tree.angle = 180;
        return tree;
    }

}
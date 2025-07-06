import { Plant } from "./plants.js";
import { randomInt } from "../Utilities/random.js"

/**
 * The Flower Class, inherits from ```Plant```
 * @param {float} size: int, the size of the flower.
 */
export function Flower(size=100) {
    Plant.call(this, size);

    this.minPetals = 4
    this.maxPetals = 8

    this.makeData = function() {
        this.numPetals = Math.floor(Math.random() * (this.maxPetals - this.minPetals + 1)) + this.minPetals;
        this.petalRadius = 20; // could randomize bw 30 and 50?
        this.flowerRadius = 10;


    }

    this.makeGraphic = function() {
        this.graphic = new PIXI.Container();

        //stem
        const stem = new PIXI.Graphics();
        stem.rect(-2.5, this.petalRadius, 5, 60);
        stem.fill(0x196f3d);
        this.graphic.addChild(stem);
        
        //petals
        for (let i = 0; i < this.numPetals; i++) {
            const angle = (i / this.numPetals) * Math.PI * 2;
            const petal = new PIXI.Graphics();

            petal.moveTo(0,0);
            petal.quadraticCurveTo(this.petalRadius, this.petalRadius, 0, this.petalRadius *2);
            petal.quadraticCurveTo(-this.petalRadius, this.petalRadius, 0, 0);
            petal.fill(0xe9b4ec);

            
            petal.y = -this.flowerRadius;
            const petalContainer = new PIXI.Container();
            petalContainer.addChild(petal);

            petalContainer.rotation = angle;

            this.graphic.addChild(petalContainer);
        }

        //centre
        const centre = new PIXI.Graphics();
        centre.circle(0, 0, this.flowerRadius);
        centre.fill(0xf0eaf0);
        this.graphic.addChild(centre);

        //flower.x = 
        //flower.y = 

    }

}

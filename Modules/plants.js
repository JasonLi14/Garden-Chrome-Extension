// Constants
const WIDTH = 640;
const HEIGHT = 360;
const SEED = 0;

export function Plant() {
    this.size = 100;
    this.growth = 0;
    this.data_index = 0;
    this.data = [];
    this.info = {};

    // For loading saved data about plants
    this.loadData = function(data) {
        this.data = data;
    }

    // For generating data for a plant based on some info
    this.makeData = function() {}

    // For creating the actual graphic
    this.makeGraphic = function(growth=1) {} 

    // 
    this.getGraphic = function() {
        return this.graphic;
    }

    // initialize graphic
    this.graphic = new PIXI.Container({
        x:0,
        y:0
      });
    
}






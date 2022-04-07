class View {
    constructor(){
        this.activeUnits = [];
    }
}
class Controller {
    constructor() {

    }
}
class Data {
    constructor() {
        this.playerUnits = [];
        this.enemyUnits = [];
    }
}
class Motion {
    constructor() {
        this.coords= []; //vector
        this.speed; //magnitude
        this.direction; //unit vector
    }
}
class Unit {
    constructor(name) {
        this.name = name;
        this.motion = new Motion();
    }
}
class Tower {
    constructor() {
    }
}





//temporary functions for development
function setTerrain() {
    const pathTiles = [4,5,14,15,24,25,34,35,44,45,54,55,64,65,74,75,84,85,94,95];
    const stoneTiles = [90,91,92,93,96,97,98,99];
    const underLayElements = document.querySelector(".game-board-underlay").children;
    for (let i = 0; i < 100; i++) {
        if (pathTiles.includes(i)) {
            underLayElements[i].classList.toggle("path");
        }
        else if (stoneTiles.includes(i)) {
            underLayElements[i].classList.toggle("stone");
        } else {
            underLayElements[i].classList.toggle("grass");
        }
    }
}
setTerrain();

function moveDown() {
    const unit1 = document.querySelector(".board-element");
    currentPosition = unit1.offsetTop;
    console.log(currentPosition);
    speed = 1;
    nextPosition = currentPosition + speed;
    console.log(nextPosition)
    unit1.style.top = `${nextPosition}px`;       
}
// const test = setInterval(moveDown, 50);

//TODOs
//pseudocoding
function init(){};
function render(){};
// goal is to have a game loop on interval
function gameLoop(){
    //process user input
    //update data model
    //render updates
};
const loop = setInterval(gameLoop, 50);

//create a wave class/object that creates a specified number of unit objects with the specified parameters
//How to easily change properties of the unit such as health, armor, speed in between waves?

const appView = new View();
currentWave = [];
let numEnemies = 5;
for (let i = 0; i < numEnemies; i++) {
    currentWave[i] = new Unit (`Unit ${i}`);
    appView.activeUnits.push(currentWave[i].name);
};
console.log(currentWave);
console.log(appView.activeUnits);


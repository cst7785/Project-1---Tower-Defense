class View {
    constructor(){
        this.activeUnits = [];
        this.toRender = [];
    }
    updateView() {
        //
    };
    viewMainLoop(){};
}
class Controller {
    constructor() {
        this.clickableObjects = []; //array of event listener for each element handle on the website?
        this.userQueries = [];
    };
    controllerMainLoop() {
    };
    processUserRequests() {

    }
}
class Data {
    constructor() {
        this.playerUnits = [];
        this.enemyUnits = [];
    }
    dataMainLoop(){};
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

//const loop = setInterval(gameLoop, 50);

//create a wave class/object that creates a specified number of unit objects with the specified parameters
//How to easily change properties of the unit such as health, armor, speed in between waves?



// goal is to have a game loop on interval
// create a game loop of self sufficient classes, each class has its own "loop" function
// function mainLoop(){
//     appController.controllerMainLoop();
//     appData.dataMainLoop();
//     appView.viewMainLoop();
// };
let activeGame = true;
const appView = new View();
const appController = new Controller();
const appData = new Data();
while (activeGame) {
    mainLoop();
}


//experimenting with creating a wave and displaying it to the view
currentWave = [];
let numEnemies = 5;
for (let i = 0; i < numEnemies; i++) {
    currentWave[i] = new Unit (`Unit ${i}`);
    appView.activeUnits.push(currentWave[i].name);
};
console.log(currentWave);
console.log(appView.activeUnits);

//how does the user get from pressing New game to having the first enemy appear onscreen?
//init function runs when webpage loads
//created event listeners for each clickable object 
//user clicks on new game
//a timer starts and is displayed on screen, wave 1 appears, remaining lives appears, starting currency appears
//a user can then click on towers within the tower menu 
//

//stretch goal -- save game / load game;

//******States****** 
//***Pregame***
    //**PreGame Root Menu
        //Hover over New Game -> Start a new game! Cursor pointer
        //Hover over Pause -> nothing
        //Hover over About Game -> Learn about the game! Cursor Pointer
        //Hover over tower -> Basic Tower Description, Cursor Pointer
    //**About Game
        //Tower Menu changes to About Game text;
        //Exit Menu button appears, cursor pointer, clicking on it changes state to Pregame Root Menu;
        //Stretch goal -> visual display of how to play the game, animated cursor clicks tower menu button, places tower, attacks creeps, loses life, upgrades tower
    //**Click on Tower
        //Tower Menu changes to About Tower text;
        //Exit menu button appears, cursor pointer, clicking on it changes state to PreGame Root Menu
//***Game***
    //**Game Root Menu
        //Hover over New Game -> Start a new game! Cursor pointer
        //Hover over Pause -> Pause the game. Cursor Pointer
        //Hover over About Game -> Learn about the game! Cursor Pointer
    //**About Game
        //Tower Menu changes to About Game text;
        //Exit Menu button appears, cursor pointer, clicking on it changes state to Pregame Root Menu;
    //**Pause Game
        //Stop automatic data calculations and rendering but keep the view and controller active to receive user queries
        //Pressing resume game will return the game to the Game Root Menu

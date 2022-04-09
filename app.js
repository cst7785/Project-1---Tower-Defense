class View {
    constructor(){
        this.newGameButton = document.querySelector(".new-game-button");
        this.aboutGameButton = document.querySelector(".about-game-button");
        this.pauseGameButton = document.querySelector(".pause-game-button");
        this.circleTowerButton = document.querySelector(".circle-tower-button");
        this.circleTowerInfoButton = document.querySelector(".circle-tower-info-button");
        // this.scoreBoard = document.querySelector(".game-menu-scoreboard");
        this.waveNumberField = document.querySelector(".wave-number-field");
        this.livesRemainingField = document.querySelector(".lives-remaining-field");
        this.currencyField = document.querySelector(".currency-field");
        this.newGameButtonHandlers = [
            this.newGameButton.addEventListener('click', ()=>{appController.eventList.push("new-game-clicked")}), 
            this.newGameButton.addEventListener('mouseover', ()=>{appController.eventList.push("new-game-hover")})
        ];
        this.aboutGameButtonHandlers = [
            this.aboutGameButton.addEventListener('click', ()=>{appController.eventList.push("about-game-clicked")}), 
            this.aboutGameButton.addEventListener('mouseover', ()=>{appController.eventList.push("about-game-hover")})
        ];
        this.pauseButtonHandlers = [
            this.pauseGameButton.addEventListener('click', ()=>{appController.eventList.push("pause-game-clicked")}), 
            this.pauseGameButton.addEventListener('mouseover', ()=>{appController.eventList.push("pause-game-hover")})
        ];
        this.circleTowerButtonHandlers = [
            this.circleTowerButton.addEventListener('click', ()=>{appController.eventList.push("circle-tower-clicked")}), 
            this.circleTowerButton.addEventListener('mouseover', ()=>{appController.eventList.push("circle-tower-hover")})
        ];
        this.circleTowerInfoButtonHandlers = [
            this.circleTowerInfoButton.addEventListener('click', ()=>{appController.eventList.push("circle-tower-info-clicked")}), 
            this.circleTowerInfoButton.addEventListener('mouseover', ()=>{appController.eventList.push("circle-tower-info-hover")})
        ];
        this.activeUnits = [];
        this.toRender = [];
    }
    //uses an update keyword
    viewMainLoop(){};
    clickNewGame() {
        appController.eventList.push("new-game-clicked");
        // console.log("Clicked new game")
    }
    updateScoreBoard(type, [wave, unitsOrTime, lives]) {
        console.log("Updating Scoreboard");
        let waveNumberFieldString;
        switch (type) {
            case "units":
                waveNumberFieldString = `Wave: ${wave} Units: ${unitsOrTime}`;
                break;
            case "timer":
                waveNumberFieldString = `Wave: ${wave} Timer: ${unitsOrTime}`;
                break;
        }
        const livesRemainingString = `Lives remaining: ${lives}`;
        this.waveNumberField.innerText = waveNumberFieldString;
        this.livesRemainingField.innerText = livesRemainingString;
    }
    updateCurrency(amount) {
        const currencyFieldString = `Currency: ${amount}`
        this.currencyField.innerText = currencyFieldString;
    }
}
class Controller {
    constructor() {
        const states = [
            "pre-game-root", 
            "about-game-clicked", 
            "pause-button-clicked", 
            "circle-tower-clicked", 
            "circle-tower-info-clicked",
            "pre-wave",
            "wave",
            "game-over"];
        this.state="pre-game-root";
        this.eventList = [];
    };
    controllerMainLoop() {
        this.processEvents();
    };
    setState(stateString) {
        this.eventList.push(stateString);
    }
    processEvents() {
        for (let i = 0; i < this.eventList.length; i++) {
            console.log(this.eventList);
            switch(this.eventList.shift()) {
                //Button Interactions
                case "new-game-clicked":
                    console.log("New Game Button Clicked");
                    this.setNewGameState();
                    break;
                case "new-game-hover":
                    console.log("New Game Button Hovered");
                    break;
                case "about-game-clicked":
                    console.log("About Game Button Clicked");
                    break;
                case "about-game-hover":
                    console.log("About Game Button Hovered");
                    break;
                case "pause-game-clicked":
                    console.log("Pause Game Button Clicked");
                    break;
                case "pause-game-hover":
                    console.log("Pause Game Button Hovered");
                    break;
                case "circle-tower-clicked":
                    console.log("Circle Tower Button Clicked");
                    break;
                case "circle-tower-hover":
                    console.log("Circle Tower Button Hovered");
                    break;
                case "circle-tower-info-clicked":
                    console.log("Circle Tower Info Button Clicked");
                    break;
                case "circle-tower-info-hover":
                    console.log("Circle Tower Info Button Hovered");
                    break;
                //State Changes
                case "pre-wave":
                    console.log(`Changing state to pre-wave`);
                    this.setPreWaveState();
                    break;
                case "wave":
                    console.log(`Changing state to wave`);
                    this.setWaveState();
                    break;
            console.log(this.eventList);
            }
        }   
    }
    //uses a set keyword
    setNewGameState() {
        console.log("Starting new game")
        //clear data model and view
        this.setScoreBoard();
        this.setCurrency();
        this.setState("pre-wave");
    }
    setPreWaveState() {
        this.state = "pre-wave";
        this.setScoreBoard();
        this.setCurrency(appData.addIncome); 
        this.setTimer("start");
    }
    setWaveState() {
        this.state = "wave";
        this.setScoreBoard();
    }
    setScoreBoard() {
        //has shape wave unit lives timer
        const scoreBoardData = appData.getScoreBoardData();
        let formattedData;
        switch (this.state) {
            case "pre-game-root":
                //TODO figure out how to remove duplication here
                //wave timer lives
                formattedData = [scoreBoardData[0], scoreBoardData[3], scoreBoardData[2]]
                return appView.updateScoreBoard("timer", formattedData);
                break;
            case "pre-wave":
                //wave timer lives
                formattedData = [scoreBoardData[0], scoreBoardData[3], scoreBoardData[2]]
                return appView.updateScoreBoard("timer", formattedData);
                break;
            case "wave":
                //wave unit lives
                formattedData = [scoreBoardData[0], scoreBoardData[1], scoreBoardData[2]]
                return appView.updateScoreBoard("units", formattedData);
                break;
        }
    }
    setCurrency(currencyChange=0) {
        const currencyData = appData.getCurrency(currencyChange);
        appView.updateCurrency(currencyData);
    }
    setTimer(startStopUpdate){    
        switch (startStopUpdate) {
            case "start": 
                console.log("Setting the timer...");
                appData.getTimer("start");
                break;
            case "update":
                console.log("Updating the timer...");
                appView.updateTimer();
            case "stop":
                console.log("Stopping the timer");
                this.setState("wave")
        }
        appData.getTimer();
    }
}
class Data {
    constructor() {
        this.wave = 1;
        this.units = 10;
        this.lives = 30;
        this.timer = 5;
        this.timerActive = false;
        this.timerInterval = setInterval(() => {
            console.log(this.timerActive);
            if (this.timerActive) {
                if (this.timer === 0) {
                    this.timerActive = false;
                    console.log("this.time = 0")
                    this.getTimer("stop");
                } else {
                    this.timer--;
                    console.log(this.timer);
                    this.getTimer("update");
                }
            } else {
                console.log("Timer not active")
            }
        }, 1000);
        this.currency = 100;
        this.addIncome = 50;
        this.playerUnits = [];
        this.enemyUnits = [];
    }
    //uses a get keyword
    dataMainLoop(){};
    getScoreBoardData() {
        console.log("Getting data...")
        const scoreBoardData = [this.wave, this.units, this.lives, this.timer];
        return scoreBoardData; 
    }
    getCurrency(currencyChange = 0) {
        this.currency += currencyChange;
        return this.currency;
    }
    getTimer(startStopUpdate) {
        switch (startStopUpdate) {
            case "start":
                // this.timer = 10;
                this.timerActive = true;
                break;
            case "stop":
                this.timerActive = false;
                appController.setTimer("stop");
            case "update":
                appController.setScoreBoard();
            case "default":
                break;
        }
        return this.timer;
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
    // console.log(currentPosition);
    speed = 1;
    nextPosition = currentPosition + speed;
    // console.log(nextPosition)
    unit1.style.top = `${nextPosition}px`;       
}
// const test = setInterval(moveDown, 50);

//TODOs
//pseudocoding
function init(){};
function render(){};

// const loop = setInterval(moveDown, 50);

//create a wave class/object that creates a specified number of unit objects with the specified parameters
//How to easily change properties of the unit such as health, armor, speed in between waves?



// goal is to have a game loop on interval
// create a game loop of self sufficient classes, each class has its own "loop" function
function mainLoop(){
    appController.controllerMainLoop();
    appData.dataMainLoop();
    appView.viewMainLoop();
};
let activeGame = true;
const appView = new View();
const appController = new Controller();
const appData = new Data();
const loop = setInterval(mainLoop, 50); //tune the time value


//experimenting with creating a wave and displaying it to the view
currentWave = [];
let numEnemies = 5;
for (let i = 0; i < numEnemies; i++) {
    currentWave[i] = new Unit (`Unit ${i}`);
    appView.activeUnits.push(currentWave[i].name);
};
// console.log(currentWave);
// console.log(appView.activeUnits);

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
    //**Click on Tower Info
        //Tower Menu changes to About Tower text;
        //Exit menu button appears, cursor pointer, clicking on it changes state to PreGame Root Menu
    //**New Game
        //1 Minute timer starts, currency, lives, wave number, unit count all appear on the screen.
        //Controller starts controller the sequence of spawning the first wave 
        //Tower buttons become Clickable 
//***Game***
    //**Game Root Menu
        //Hover over New Game -> Start a new game! Cursor pointer
        //Hover over Pause -> Pause the game. Cursor Pointer
        //Hover over About Game -> Learn about the game! Cursor Pointer
        //Timer starts 
        //Clicking on a tower that has been placed on the grid will change the state to Tower Upgrade Menu
    //**About Game
        //Tower Menu changes to About Game text;
        //Exit Menu button appears, cursor pointer, clicking on it changes state to Pregame Root Menu;
        //Clicking on a tower that has been placed on the grid will change the state to Tower Upgrade Menu
    //**Pause Game
        //Stop automatic data calculations and rendering but keep the view and controller active to receive user queries
        //Allows user to click on tower info to read and think without having the game update the positions and render 
        //Pressing resume game will return the game to the Game Root Menu
        //Clicking on a tower that has been placed on the grid will change the state to Tower Upgrade Menu
    //**Tower Info
        //Tower Menu changes to About Tower text;
        //Exit menu button appears, cursor pointer, clicking on it changes state to Game Root Menu
        //Clicking on a tower that has been placed on the grid will change the state to Tower Upgrade Menu
    //**Tower 
        //Clicking on a create tower button makes it so that any available grid tile for construction will show respond with a visual cue such as changing color
        //Clicking on an available grid tile will check if the user has enough currency, create a tower at that location, reduce the player currency and change state to Game Root Menu
        //Clicking on an existing tower produces an error message
        //Clicking on an invalid tower placement location will produce an error message
        //Pressing Escape or clicking cancel will change the state to Game Root Menu
    //**Wave
        //Timer is removed
        //Units are generated in the data structure and then displayed by the view, event listeners are added in the controller
        //Units grant a small amount of currency when killed by a player, event listener, view, and data associated with the unit are cleared 
        //Hovering over a unit displays information about it. 
        //Clicking on a unit changes the Tower Menu to display more information about the unit?
    //**Between Wave
        //Timer is started
        //A lump sum of currency is granted to the player 
        //The wave number increments and the unit count adjusts to that of the next wave
        //Enemies stop spawning
        //Possibly clear controller and data? If well designed, should be redundant?
    //**Game Over
    

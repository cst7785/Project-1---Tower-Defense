class View {
    constructor(){
        this.newGameButton = document.querySelector(".new-game-button");
        this.aboutGameButton = document.querySelector(".about-game-button");
        this.pauseGameButton = document.querySelector(".pause-game-button");
        this.circleTowerButton = document.querySelector(".circle-tower-button");
        this.circleTowerInfoButton = document.querySelector(".circle-tower-info-button");
        this.waveNumberField = document.querySelector(".wave-number-field");
        this.livesRemainingField = document.querySelector(".lives-remaining-field");
        this.currencyField = document.querySelector(".currency-field");
        this.gameBoard = document.querySelector(".game-board");
        this.gameBoardOverlay = document.querySelector(".game-board-overlay")
        this.gameBoardOverlayElements = document.querySelectorAll(".overlay-element")
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
            this.circleTowerButton.addEventListener('click', ()=>{
                appController.eventList.push("circle-tower-clicked")
                this.updateTowerGridToggle();
            }), 
            this.circleTowerButton.addEventListener('mouseover', ()=>{appController.eventList.push("circle-tower-hover")})
        ];
        this.circleTowerInfoButtonHandlers = [
            this.circleTowerInfoButton.addEventListener('click', ()=>{appController.eventList.push("circle-tower-info-clicked")}), 
            this.circleTowerInfoButton.addEventListener('mouseover', ()=>{appController.eventList.push("circle-tower-info-hover")})
        ]
        this.windowEventHandlers = [
            window.onresize = this.updateSizes
        ];
        this.gameBoardOverlayElements.forEach(element => {
            element.addEventListener('mouseenter',this.updateTowerPlacement)
            element.addEventListener('mouseout',this.updateTowerPlacement)
            element.addEventListener('click', this.updateTower);
        })
        this.activeUnits = [];
        this.activeTowers = [];
        this.toRender = [];
        this.setTerrain();
    }
    setTerrain() {
        const pathTiles = [4,5,14,15,24,25,34,35,44,45,54,55,64,65,74,75,84,85,94,95];
        const stoneTiles = [90,91,92,93,96,97,98,99];
        const underLayElements = document.querySelector(".game-board-underlay").children;
        const overLayElements = document.querySelector(".game-board-overlay").children;
        for (let i = 0; i < 100; i++) {
            if (pathTiles.includes(i)) {
                underLayElements[i].classList.toggle("path");
                overLayElements[i].classList.toggle("restricted")
            }
            else if (stoneTiles.includes(i)) {
                underLayElements[i].classList.toggle("stone");
                overLayElements[i].classList.toggle("restricted")
            } else {
                underLayElements[i].classList.toggle("grass");
            }   
        }
    }
    updateTowerPlacement() {
        let restrictedTiles = ["path", "stone"]
        if (!event.target.classList.contains("restricted") && !event.target.classList.contains("tower") && appController.placingTower) { 
            event.target.classList.toggle("highlight"); 
        }
    }
    updateTower(event) {
        if (!event.target.classList.contains("restricted") && !event.target.classList.contains("tower") && appController.placingTower) {
            event.target.classList.toggle("highlight");
            event.target.classList.toggle("tower");
            const newTower = appController.setNewTower()
            event.target.append(newTower.domHandle);
            newTower.calculateOriginVector();
            newTower.coords = [newTower.domHandle.offsetLeft, newTower.domHandle.offsetTop];
            console.log(newTower.coords)
        }
    }
    updateTowerGridToggle() {
        for (let i = 0; i < this.gameBoardOverlayElements.length; i++) {
            if (!this.gameBoardOverlayElements[i].classList.contains("restricted") && !this.gameBoardOverlayElements[i].classList.contains("tower")) {
                this.gameBoardOverlayElements[i].classList.toggle("overlay-border");    
            }
        }
    }
    reset() {
        length = this.gameBoard.children.length;
        for (let i = 0; i < length; i++) {
            this.gameBoard.children[0].remove();
        }
        for (let i = 0; i < this.gameBoardOverlayElements.length; i++) {
            if (this.gameBoardOverlayElements[i].hasChildNodes()) {
                this.gameBoardOverlayElements[i].firstChild.remove();
            }
        }
        if (document.querySelector(".game-over")) {
            document.querySelector(".game-over").remove();
        }
        const towerSpaces = document.querySelectorAll(".tower")
        console.log(towerSpaces);
        for (let space of towerSpaces) {
            space.classList.toggle("tower");
            space.classList.toggle("overlay-border");
        }
        this.activeUnits = [];
        this.activeTowers = [];
        this.toRender = [];
    }
    viewMainLoop(){
        for (let i = 0; i < this.toRender.length; i++) {
            this.render(this.toRender[i]);
        }
    };
    clickNewGame() {
        appController.eventList.push("new-game-clicked");
    }
    updateScoreBoard(type, [wave, unitsOrTime, lives]) {
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
    updateNewUnit(obj) {
        this.gameBoard.append(obj.domHandle);
        this.activeUnits.push(obj);
        console.log(`pushing new unit: ${obj.name}`)
        this.toRender.push(obj);
    }
    updateProjectile(obj) {
        this.toRender.push(obj);
    }
    updatePosition(obj) {
        const xCoord = obj.motion.coords[0];
        const yCoord = obj.motion.coords[1];
        obj.domHandle.style.left = `${xCoord}px`;
        obj.domHandle.style.top = `${yCoord}px`;
    }
    render(obj) {
        this.updatePosition(obj);
    }
    updateSizes() {
        appData.gameBoardDimensions = appData.getBoardDimensions();
        for (let i = 0; i < appView.activeUnits.length; i++) {
            appView.activeUnits[i].resize();
        }
        for (let i = 0; i < appData.playerUnits.length; i++) {
            appData.playerUnits[i].resize();
        }
    }
    updateGameOver() {
        if (!document.querySelector(".game-over")) {
            const gameOver = document.createElement('div')
            gameOver.classList.add("game-over");
            gameOver.innerText = "GAME OVER";
            appView.gameBoard.append(gameOver);
        }
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
        this.placingTower = false;
        this.timeOuts = [];
        this.timerValue = 3;
    };
    controllerMainLoop() {
        this.processEvents();
        this.processState();
    };
    setState(stateString) {
        this.eventList.push(stateString);
    }
    processEvents() {
        for (let i = 0; i < this.eventList.length; i++) {
            switch(this.eventList.shift()) {
                case "new-game-clicked":
                    console.log("New Game Button Clicked");
                    this.setNewGameState();
                    break;
                case "new-game-hover":
                    break;
                case "about-game-clicked":
                    console.log("About Game Button Clicked");
                    break;
                case "about-game-hover":
                    break;
                case "pause-game-clicked":
                    console.log("Pause Game Button Clicked");
                    break;
                case "pause-game-hover":
                    break;
                case "circle-tower-clicked":
                    console.log("Circle Tower Button Clicked");
                    this.placingTower = true;
                    break;
                case "circle-tower-hover":
                    break;
                case "circle-tower-info-clicked":
                    console.log("Circle Tower Info Button Clicked");
                    break;
                case "circle-tower-info-hover":
                    break;
                case "pre-wave":
                    console.log(`Changing state to pre-wave`);
                    this.setPreWaveState();
                    break;
                case "wave":
                    console.log(`Changing state to wave`);
                    this.setWaveState("new");
                    break;
                case "game-over":
                    this.setGameOverState();

            console.log(this.eventList);
            }
        }
    }
    processState() {
        switch (this.state) {
            case "pre-wave":
                break;
            case "wave":
                this.setWaveState("check")
                break;
        }   
    }
    reset() {
        this.eventList = [];
        let length = this.timeOuts.length;
        for (let i = 0; i < length; i++) {
            clearTimeout(this.timeOuts[i]);
        }
        this.timeOuts = [];
        this.state = "pre-game-root";
    }
    setNewGameState() {
        console.log("Starting new game")
        appController.reset();
        appView.reset();
        appData.reset();
        this.setState("pre-wave");
        this.setScoreBoard();
        this.setCurrency();
    }
    setPreWaveState() {
        this.state = "pre-wave";
        this.setScoreBoard();
        this.setCurrency(appData.income); 
        this.setTimer("start");
    }
    setWaveState(condition) {
        switch (condition) {
            case "new":
                this.state = "wave";
                this.setScoreBoard();
                let timeOut = 0;
                for (let i = 0; i < appData.units; i++) {
                    this.timeOuts.push(setTimeout(this.setNewUnit, timeOut));
                    timeOut += 2000;
                }
                break;
            case "check":
                if (appData.enemyUnits.length === 0 && this.timeOuts.length === 0) {
                    console.log("NO more enemies!")
                    this.setWaveState("next");
                    this.setState("pre-wave");
                }
                break;
            case "next":
                appData.getWave("next")
        }
    }
    setScoreBoard() {
        const scoreBoardData = appData.getScoreBoardData();
        let formattedData;
        switch (this.state) {
            case "pre-game-root":
                formattedData = [scoreBoardData[0], scoreBoardData[3], scoreBoardData[2]]
                return appView.updateScoreBoard("timer", formattedData);
                break;
            case "pre-wave":
                formattedData = [scoreBoardData[0], scoreBoardData[3], scoreBoardData[2]]
                return appView.updateScoreBoard("timer", formattedData);
                break;
            case "wave":
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
                appData.getTimer("start");
                break;
            case "update":
                appView.updateTimer();
            case "stop":
                this.setState("wave")
        }
    }
    setNewUnit() {
        appView.updateNewUnit(appData.getNewUnit());
    }
    setNewTower() {
        this.placingTower = false;
        appView.updateTowerGridToggle();
        const newTower = appData.getNewTower();
        appView.activeTowers.push(newTower.name)
        return newTower;
    }
    setGameOverState() {
        this.state = "game-over"
        appView.updateGameOver();
        const eventListenersToTurnOff = [];
    }
}
class Data {
    constructor() {
        this.wave = 1;
        this.units = 1;
        this.lives = 3;
        this.timer = appController.timerValue;
        this.timerActive = false;
        this.timerInterval = setInterval(() => {
            if (this.timerActive) {
                if (this.timer === -1) {
                    this.timer = 0;
                    this.timerActive = false;
                    this.getTimer("stop");
                } else {
                    this.getTimer("update");
                    this.timer--;
                }
            } else {
            }
        }, 1000);
        this.currency = 50;
        this.income = 50;
        this.playerUnits = [];
        this.enemyUnits = [];
        this.projectiles = [];
        this.gameBoardDimensions = this.getBoardDimensions();
        this.towerNumber = 1;
    }
    reset() {
        this.wave = 1;
        this.units = 5;
        this.unitNumber = 0;
        this.unitHealth = 100;
        this.lives = 3;
        this.timer = appController.timerValue;
        this.timerActive = false;
        this.currency = 50;
        this.income = 50;
        this.playerUnits = [];
        this.enemyUnits = [];
        this.towerNumber = 1;
    }
    dataMainLoop(){
        this.getNewEnemyPositions();  
        this.getNewProjectilePositions();
    };
    getScoreBoardData() {
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
                this.timer = appController.timerValue;
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
    getNewUnit() {
        const newUnit = new Unit (this.wave, ++this.unitNumber, this.unitHealth);
        this.enemyUnits.push(newUnit);
        appController.timeOuts.shift();
        return newUnit;
    }
    getNewTower() {
        const newTower = new Tower(`circle-tower-${this.towerNumber}`, 45, 1000, 200);
        this.playerUnits.push(newTower);
        this.towerNumber++;
        return newTower;
    }
    getNewEnemyPositions(){
        if (appController.state != "game-over"){  
            for (let unitObj of this.enemyUnits) {
                unitObj.motion.calculateNewPosition();     
                this.getTowersInRange(unitObj)         
                if (unitObj.motion.coords[1] >= appData.getBoardDimensions()[1]) {
                    this.getLives(-1);         
                    appView.toRender.splice(appView.toRender.indexOf(unitObj),1);
                    this.enemyUnits.splice(this.enemyUnits.indexOf(unitObj),1);
                    appView.activeUnits.splice(appView.activeUnits.indexOf(unitObj));
                    unitObj.domHandle.remove();
                }
            }
        }
    }
    getNewProjectilePositions() {
        if (appController.state != "game-over"){   
            for (let projectile of this.projectiles) {
                projectile.motion.calculateNewDirection([projectile.target.motion.coords[0]-projectile.target.originOffset[0],projectile.target.motion.coords[1]-projectile.target.originOffset[1]]);
                projectile.motion.calculateNewPosition();
                const distanceVector = [projectile.target.motion.coords[0] + this.gameBoardDimensions[2] - projectile.motion.coords[0], projectile.target.motion.coords[1] + this.gameBoardDimensions[3] - projectile.motion.coords[1]];
                const magnitude = Math.sqrt(distanceVector[0]**2 + distanceVector[1]**2)
                if (magnitude <= Math.abs(1.25*projectile.target.originOffset[0])) {
                    projectile.motion.speed /= 2;
                }
                if (magnitude <= Math.abs(0.9*projectile.target.originOffset[0]) || !this.enemyUnits.includes(projectile.target)) {
                    projectile.domHandle.remove();
                }
            }
        } 
    }
    getWave(condition) {
        switch (condition) {
            case "next":
                this.wave++;
                this.unitNumber = 0;
                this.unitHealth += 70;
                break; 
        }
    }
    getBoardDimensions() {
        const gameBoardWidth = appView.gameBoard.offsetWidth;
        const gameBoardHeight = appView.gameBoard.offsetHeight;
        const gameBoardOffsetLeft = appView.gameBoard.offsetLeft;
        const gameBoardOffsetTop = appView.gameBoard.offsetTop;
        return [gameBoardWidth, gameBoardHeight, gameBoardOffsetLeft, gameBoardOffsetTop]
    }
    getLives(change=0) {
        if (change != 0) {
            this.lives += change;
            appController.setScoreBoard("lives", this.getScoreBoardData());
            if (this.lives <= 0) {
                appController.setState("game-over");
                
                }
            }
            return this.lives;
    }
    getTowersInRange(unitObj) {
        for (let tower of appData.playerUnits) {
            const distanceVector = [unitObj.motion.originVector[0] - tower.originVector[0], unitObj.motion.originVector[1] - tower.originVector[1]]
            const distance = Math.sqrt(distanceVector[0]**2 + distanceVector[1]**2);
            if (distance <= tower.range && !tower.enemiesInRange.includes(unitObj)) {
                console.log("Pushing enemy to array!")
                tower.enemiesInRange.push(unitObj);
            } else if (distance >= tower.range && tower.enemiesInRange.includes(unitObj)) {
                tower.enemiesInRange.splice(tower.enemiesInRange.indexOf(unitObj),1);
                console.log("Pulling enemy from array!")
            }
        }
    }
}
class Motion {
    constructor(offset) {
        this.boardDimensions = appData.getBoardDimensions();
        this.coords= [offset[0] + (this.boardDimensions[0] / 2), offset[1]+(this.boardDimensions[1] * -0.1)]; 
        this.speed = this.boardDimensions[1] * .009 * 2 ; 
        this.direction = [0, 1]; 
    }
    calculateNewPosition() {
        this.boardDimensions = appData.getBoardDimensions();
        let deltas = [(this.speed*this.direction[0]),(this.speed*this.direction[1])];
        this.coords = [this.coords[0]+deltas[0],this.coords[1]+deltas[1]];
        this.originVector = [this.coords[0]+this.boardDimensions[2], this.coords[1]+this.boardDimensions[3]];
    }
    calculateNewDirection(targetCoords) {
        const distanceVector = [targetCoords[0] + this.boardDimensions[2] - this.coords[0], targetCoords[1] + this.boardDimensions[3] - this.coords[1]];
        const magnitude = Math.sqrt(distanceVector[0]**2 + distanceVector[1]**2)
        this.direction = [distanceVector[0] / magnitude, distanceVector[1] / magnitude]
    }
}
class Projectile {
    constructor(towerOrigin, targetUnit) {
        this.target = targetUnit;
        this.towerOrigin = towerOrigin;
        this.proportions = [0.01, 0.015];
        this.size = [this.proportions[0] * appView.gameBoard.offsetWidth, this.proportions[1] * appView.gameBoard.offsetHeight]; 
        this.originOffset = [-1*this.size[0] /2, -1*this.size[1]/2]
        this.motion = new Motion(this.originOffset);
        this.motion.speed = 30;
        this.style();
    }
    style() {
        this.domHandle = document.createElement("div");
        this.domHandle.style.width = `${this.size[0]}px`;
        this.domHandle.style.height = `${this.size[1]}px`;
        this.domHandle.style.position = "absolute";
        this.domHandle.style.backgroundColor = "red";
        this.domHandle.style.borderRadius = "50%";
        this.domHandle.style.zIndex = 0;
        this.motion.coords = [this.towerOrigin[0]+this.originOffset[0],this.towerOrigin[1]+this.originOffset[1]];
        this.domHandle.style.left = `${this.towerOrigin[0]+this.originOffset[0]}px`;
        this.domHandle.style.top = `${this.towerOrigin[1]+this.originOffset[1]}px`;
    }
}
class Unit {
    constructor(waveNumber, unitNumber, unitHealth) {
        this.name = `wave${waveNumber}-unit${unitNumber}`;
        this.health = unitHealth;
        this.bounty = 2*appData.wave;
        this.proportions = [0.05, 0.07];
        this.size = [this.proportions[0] * appView.gameBoard.offsetWidth, this.proportions[1] * appView.gameBoard.offsetHeight]; 
        this.originOffset = [-0.5*this.size[0], -0.5*this.size[1]]; 
        this.style();
        this.motion = new Motion(this.originOffset);
    }
    style() {
        this.domHandle = document.createElement("div");
        this.domHandle.classList.add(`${this.name}`);
        this.domHandle.style.width = `${this.size[0]}px`;
        this.domHandle.style.height = `${this.size[1]}px`;
        this.domHandle.style.position = "absolute";
        this.domHandle.style.backgroundColor = "blue";
        this.domHandle.style.borderRadius = "50%";
        this.domHandle.style.zIndex = 2;
        this.domHandle.style.left = `${appData.getBoardDimensions()[1]/2}px`;
        this.domHandle.style.top = `${appData.getBoardDimensions()[1] * -0.1}px`;
    }
    resize() {
        let oldBoardDimensions = this.motion.boardDimensions;
        this.motion.boardDimensions = appData.getBoardDimensions();
        this.size = [this.proportions[0] * appView.gameBoard.offsetWidth, this.proportions[1] * appView.gameBoard.offsetHeight]; // percentage of game board
        this.motion.coords= [this.motion.boardDimensions[0]*this.motion.coords[0]/oldBoardDimensions[0], this.motion.boardDimensions[1]*this.motion.coords[1]/oldBoardDimensions[1]]; //vector
        this.motion.speed = appView.gameBoard.offsetHeight * .009  ;
        this.domHandle.style.width = `${this.size[0]}px`;
        this.domHandle.style.height = `${this.size[1]}px`;
    }
}
class Tower {
    constructor(name, damage, attackSpeed, range) {
        this.name = name;
        this.damage = damage;
        this.attackSpeed = attackSpeed;
        this.range = range;
        this.enemiesInRange = [];
        console.log(this.enemiesInRange);
        this.shootInterval = setInterval( ()=>{
            console.log("Would shoot if enemy in")
            if (this.enemiesInRange.length > 0) {
                const firstEnemy = this.enemiesInRange[0]
                firstEnemy.health -= this.damage;
                console.log(firstEnemy.health)
                const newProjectile = this.createProjectile(firstEnemy); 
                if (!appView.toRender.includes(newProjectile)) {
                    appView.updateProjectile(newProjectile);
                }
                
                console.log("Shooting!")
                console.log(firstEnemy.health)
                if (firstEnemy.health <= 0) {
                    appController.setCurrency(this.enemiesInRange[0].bounty)
                    appView.toRender.splice(appView.toRender.indexOf(this.enemiesInRange[0]),1);
                    appData.enemyUnits.splice(appData.enemyUnits.indexOf(this.enemiesInRange[0]),1);
                    appView.activeUnits.splice(appView.activeUnits.indexOf(this.enemiesInRange[0]));
                    for (let projectile of appData.projectiles) {
                        if (projectile.target === firstEnemy) {
                            projectile.domHandle.remove();
                        }   
                    }
                    this.enemiesInRange[0].domHandle.remove();
                    this.enemiesInRange.shift()
                    for (let tower of appData.playerUnits) {
                        if (tower.enemiesInRange.includes(firstEnemy)) {
                            tower.enemiesInRange.splice(tower.enemiesInRange.indexOf(firstEnemy),1);
                        }
                    }
                }
            }}, this.attackSpeed);
        this.boardDimensions = appData.getBoardDimensions();
        this.style();
        this.coords = [];
    }
    style() {
        this.domHandle = document.createElement("div");
        this.domHandle.classList.add(`${this.name}`); 
        this.domHandle.classList.add(`circle-tower`); 
        this.proportions = [0.05, 0.07];
        this.size = [this.proportions[0] * appView.gameBoard.offsetWidth, this.proportions[1] * appView.gameBoard.offsetHeight]; 
        this.originOffset = [-0.5*this.size[0], -0.5*this.size[1]]; 
        this.domHandle.style.width = `${this.size[0]}px`;
        this.domHandle.style.height = `${this.size[1]}px`;
    }
    resize() {
        let oldBoardDimensions = this.boardDimensions;
        this.boardDimensions = appData.getBoardDimensions();
        this.size = [this.proportions[0] * this.boardDimensions[0], this.proportions[1] * this.boardDimensions[1]];
        this.domHandle.style.width = `${this.size[0]}px`;
        this.domHandle.style.height = `${this.size[1]}px`;
    }
    calculateOriginVector(){
        this.originVector = [this.domHandle.offsetLeft + -1*this.originOffset[0], this.domHandle.offsetTop + -1*this.originOffset[1]]
        console.log(this.originVector);
    }
    createProjectile(targetUnit) {
        console.log("creating new projectile")
        const newProjectile = new Projectile(this.originVector, targetUnit);
        newProjectile.damage = this.damage;
        appData.projectiles.push(newProjectile);
        this.domHandle.appendChild(newProjectile.domHandle);
        return newProjectile;
    }
}

function mainLoop(){
    appController.controllerMainLoop();
    appData.dataMainLoop();
    appView.viewMainLoop();
};
let activeGame = true;
const appView = new View();
const appController = new Controller();
const appData = new Data();
const loop = setInterval(mainLoop, 100);
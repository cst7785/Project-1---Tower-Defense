# Project-1-Tower-Defense
A simple browser based Tower Defense using DOM elements.
A tower defense game involves defending your base from waves of enemies as they travel along a path called a maze. The user places defensive towers which attack enemies as they travel along the path in order to prevent them from reaching the end. 
### Basic User stories
As a user, I want to keep track of the current wave, the number of lives, and the amount of currency.
As a user, I want to spend currency to purchase towers and place them on the game board.
As a user, I want to see enemies traveling along the path towards my base, and see the lives go down each time an enemy reaches the end.
As a user, I want to see my defensive towers attacking enemies, giving visual feedback that they are taking damage and when they are eliminated. 
As a user, I want to receive currency for defeating enemies as well as for completing a wave. 
As a user, I want to be able to upgrade my towers and purchase different types of towers. 
As a user, I want to see enemy waves increase in difficulty as the game progresses.
### MVP Goals
- There is a game board on which a player can place a tower instantly.
- Enemies travel along the path towards the end.
- There is a single type of tower and single type of enemy (both represented by simple geometric shapes).
- The tower attacks enemies which are eventually removed from the board if they receive enough hits.
- There is a scoreboard which tracks the number of lives as well as the player's currency.
### Stretch Goals 
-Add new types of towers as well as the ability to upgrade towers; add a construction/upgrade delay.
-Add CSS effects to events such as tower construction completion, enemies taking damage/dying, losing a life, gaining currency.
-Update the graphics of the game board, the towers, and enemies.
### Wireframes 
![Wire_Frame_Proj_1](https://user-images.githubusercontent.com/102082192/162044653-7d7ff662-a34c-439e-81c7-37a45e6b5ab2.png)
### Anything else your instructional team should know
I anticipate the challenge of creating a tower defense game is in the movement of enemies along the path, as well as animating the projectiles from the towers to the enemies. My plan to solve this is to make the game board have a position of relative, and any children appended to the screen (such as towers, enemies, and projectiles) will have a position absolute. Then, I intend to create a rendering loop, updating the top and left values of elements on the screen to create movement. Tackling projectile motion will involve solving a systems of equations to calculate the future position of an enemy at the time the projectile will impact it. 
### First Version of the Game
Image of the game upon startup:
![Tower_Defense_Startup_Screenshot](https://user-images.githubusercontent.com/102082192/163189684-61815118-7cc7-4043-bc5b-6c35be5042e8.png)
Image after clicking on a tower button:
![Tower_Defense_Tower_Placement](https://user-images.githubusercontent.com/102082192/163189803-29dac498-8622-4dee-9fec-69aeb1ae53ac.png)
Image of a tower shooting a projectile at an enemy:
![Tower_Defense_Shooting_Enemy](https://user-images.githubusercontent.com/102082192/163189817-11346184-1a3e-4d80-bb0c-b0b5ca5b8e51.png)
Image of what happens when you run out of lives:
![Tower_Defense_Game_Over](https://user-images.githubusercontent.com/102082192/163189828-6dd7f593-975a-4c9c-89dd-1858831bf107.png)
### Technologies Used
HTML, CSS, Javascript 
An MVC architecture was attempted.
### Getting Started
Click the link below to try the game!
After pressing new game, enemy units will spawn at the top and move toward the bottom. If they reach the end, you lose a life. Build towers to defend your castle from the enemies!
https://cst7785.github.io/Project-1-Tower-Defense/
### Next Steps
My next major steps would be to implement major bug fixes related to the animation and collision of projectiles with enemy units. This was by far the most difficult part of the project, however, it is also due to my lack of understanding of MVC architecture and poor implementation of the technique.
Currently, damage is being done to enemies as expected, but the projectiles do not accurately reflect the timing of that damage done to enemy units.
Then, I would like to fix minor bugs that occur in the game due to lack of time to address them before the project due date, these include grid toggle and display errors associated with creating towers depending on the specific state of the game when interacting with the circle tower button.
After fixing these bugs, I would like to start implementing a real time hit points bar above enemy units so the player can receive visual feedback of the amount of health each enemy unit has as well as how much damage their towers are doing with each hit.
Then, I would like to add more diversity to the types of towers available to the player as well as introducing an upgrade system to allow them to improve their existing towers.
Finally, I would like to add new graphics for the towers and enemy units as well as the game board itself to create a more visually appealing game.

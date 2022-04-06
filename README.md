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
### Pseudocode

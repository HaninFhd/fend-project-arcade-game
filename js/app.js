let win = 0;
let lose = 0;
// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    //multiply the movement by the dt parameter
    this.x += this.speed * dt;
    if (this.x > 500) {
        this.x = -100;
    }
    checkCollisions(this);
};
// Draw the enemy on the screen
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let checkCollisions = function (enmy) {
    //Math.abs(a-b) to returns absolute value of the parameter
    // if difference between player position and enemys < 50 it is a Collision
    if (Math.abs(player.y - enmy.y) < 50 && Math.abs(player.x - enmy.x) < 50) {
        //reset player position back to the starting square.
        player.x = 200;
        player.y = 300;
        //Hearts will get down by 1 
        let life = document.getElementsByClassName("life");
        if (life.length > 0) {
            life[0].className = "lose";
            lose += 1;
            if (lose == 5) {
                reset();
            }
        }
    }
}
// if player lose or wins 5 times reset Hearts to 5 and stars to 0
function reset() {
    let stars = document.getElementsByClassName("star");
    for (i = 0; i < win; i++) {
        stars[0].className = "none";
    }
    let Hearts = document.getElementsByClassName("lose");
    for (i = 0; i < lose; i++) {
        Hearts[0].className = "life";
    }
    lose = 0;
    win = 0;
}

// player class
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};
// Update the Player's position,
Player.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
};
// Draw the player on the screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// instantiate the objects.
let player = new Player(200, 300);
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
let postion = 60;
for (i = 1; i < 5; i++) {
    let enemy = new Enemy(0, postion, Math.floor(Math.random() * 200) + 50);
    postion += 55;
    allEnemies.push(enemy);
}
// This listens for key presses and sends the keys to Player.handleInput() method. 
Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'up') {
        if (player.y > -60) {
            player.y -= 30;
        } else {
            wins();
        }
    }
    if (keyPress == 'down') {
        if (player.y < 420) {
            player.y += 30;
        }
    }
    if (keyPress == 'left') {
        if (player.x > 0) {
            player.x -= 50;
        }
    }
    if (keyPress == 'right') {
        if (player.x < 400) {
            player.x += 50;
        }
    }
}
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
// This method for check if player wins the game and to move back to the starting square.
function wins() {
    win += 1;
    //reset player position back to the starting square.
    player.y = 300;
    player.x = 200;
    // if player wins add star
    if (win < 6) {
        document.getElementsByClassName("none")[0].className = "star";
    }
    // if player wins the game 5 times open popup
    if (win == 5) {
        let popup = document.getElementsByClassName('popup')[0];
        popup.style.display = "block";
    }
}
// if player want to play again reset the game
function playAgain() {
    let popup = document.getElementsByClassName('popup')[0];
    popup.style.display = "none";
    reset();
}
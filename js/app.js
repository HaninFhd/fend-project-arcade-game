let win = 0;
let lose = 0;
// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 500) {
        this.x = -100;
    }
    checkCollisions(this);
};
let checkCollisions = function (enmy) {
    if (Math.abs(player.y - enmy.y) < 50 && Math.abs(player.x - enmy.x) < 50) {
        console.log('touch!!');
        player.x = 200;
        player.y = 300;
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

function reset() {
    let stars = document.getElementsByClassName("star");
    for (i = 0; i < win; i++) {
        stars[0].className = "none";
    }
    let lifes = document.getElementsByClassName("lose");
    for (i = 0; i < lose; i++) {
        lifes[0].className = "life";
    }
    lose = 0;
    win = 0;
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our Player, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};
// Update the Player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};
// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let postion = 60;
let player = new Player(200, 300);
for (i = 1; i < 5; i++) {
    let enemy = new Enemy(0, postion, Math.floor(Math.random() * 200) + 50);
    postion += 55;
    allEnemies.push(enemy);
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
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

function wins() {
    win += 1;
    player.y = 300;
    player.x = 200;
    if (win < 6) {
        document.getElementsByClassName("none")[0].className = "star";
    }
    if (win == 5) {
        // Get the modal
        let popup = document.getElementsByClassName('popup')[0];
        popup.style.display = "block";
    }
}
//
function playAgain() {
    let popup = document.getElementsByClassName('popup')[0];
    popup.style.display = "none";
    reset();
}
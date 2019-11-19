
let score = 0;
let scoreUpdater;

// setting score on page load
window.onload = function() {
    scoreUpdater = document.getElementById("score");
}

// Enemies our player must avoid
class Enemy {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
        //For making game more fun, speed of enemy will be random
        this.speed = 100 + (Math.random() * 200);
        
    }
    
update(dt) {
    //check for enemy to stay game board
    if (this.x > ctx.canvas.width) {
        this.x = -100;
    }
    this.x += this.speed * dt;
}
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    

}

// Our player
class Player {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-pink-girl.png';
    }
    
    update(dt) {
        // Check if the char reach water
        // will increas score by 1 every time player reach water
        if (this.y < 0) {
            scoreUpdater.innerText = score++;
            this.x = 200;
            this.y = 300;
        } 
    }
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
    handleInput(direction){
        
        switch (direction) {
            case 'up':
                if (this.y > 0) { this.y -= 83; }
                break;
            
            case 'down':
                if (this.y < 300) { this.y += 83 };
                break;
            
            case 'right':
                if (this.x < 400) {this.x += 101; }
                break;
            
            case 'left':
                if (this.x > 0) { this.x -= 101; }
                break;
            
            default:
             
                break;
        }

    }
}



let enemy1 = new Enemy(100, 55);
let enemy2 = new Enemy(100, 138);
let enemy3 = new Enemy(100, 221);
let allEnemies = [enemy1, enemy2, enemy3];

let player = new Player(200, 300);



document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// collisions between player and enemies
function checkCollisions() {
    
    allEnemies.forEach(enemy => {
        let space = getDistance(enemy, player);
        if (space < 75) {
            // collision, check for score and decrease by 1
            score -= score > 0 ? 1 : 0;
            scoreUpdater.innerText = score;
            player.x = 200;
            player.y = 300;

        }
});
}

// calculating distance
function getDistance(enemyObj, playerObj) {
    
    let a = enemyObj.x - playerObj.x;
    let b = enemyObj.y - playerObj.y;
    
    return Math.sqrt(a*a + b*b);
}



const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 640;
const PLAYER_WIDTH = 200;
const PLAYER_HEIGHT = 50;
const PLAYER_RELOAD_TIME = 2000;
const TURRET_RADIUS = 10;
const TURRET_BARREL_WIDTH = "5";
const TURRET_BARREL_LENGTH = 20;
const RAD = Math.PI/180;

class Bullet {
    constructor(player, turret, speed) {
        let playerDirection = player.dir * RAD;
        this.x = player.x + turret.x * Math.cos(playerDirection) + turret.y * Math.sin(playerDirection);
        this.y = player.y + turret.y * Math.cos(playerDirection) + turret.x * Math.sin(playerDirection);
        this.dir = player.dir + turret.dir;
        this.speed = speed;
    }
}

class Turret {
    constructor(x, y, dir, angle) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.angle = angle;
        this.reloading = false;
    }
}

class Player {
    constructor(x, y, dir, speed, front, rear) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.speed = speed;
        this.front = front;
        this.rear = rear;
        this.width = PLAYER_WIDTH; //TODO Better collision detection
        this.height = PLAYER_HEIGHT;
    }
}

class ShipsGame {
    //TODO Make into Set
    /** An array of keys currently pressed down */
    keysPressed;
    /** Array of Bullets in game */
    bullets;

    player;

    constructor() {
        this.bullets = [];

	    let frontTurret = new Turret(PLAYER_WIDTH/4,0,0,0);
	    let rearTurret = new Turret(-PLAYER_WIDTH/4,0,-180,0);
        this.player = new Player(PLAYER_WIDTH/2, PLAYER_HEIGHT/2, 0, 0, frontTurret, rearTurret);
    }
    handlePressedKeys(game, keysPressed) {
        if(!keysPressed) return;
        if(keysPressed.has('KeyA')) //a
        {
            ++game.player.front.dir;
            ++game.player.rear.dir;
        }
        if(keysPressed.has("KeyD")) //d
        {
            --game.player.front.dir;
            --game.player.rear.dir;
        }
        if(keysPressed.has("KeyW")) //w
        {
            ++game.player.front.angle;
            ++game.player.rear.angle;
        }
        if(keysPressed.has("KeyS")) //s
        {
            --game.player.front.angle;
            --game.player.rear.angle;
        }
        if(keysPressed.has("KeyS")) //q
        {
            ++game.player.front.dir;
            --game.player.rear.dir
        }
        if(keysPressed.has("KeyE")) //e
        {
            --game.player.front.dir;
            ++game.player.rear.dir;
        }
        if(keysPressed.has("ArrowUp")) //up arrow
        {
            ++game.player.speed;
        }
        if(keysPressed.has("ArrowDown")) //down arrow
        {
            --game.player.speed;
        }
        if(keysPressed.has("ArrowLeft")) //left arrow
        {
            --game.player.dir;//TODO
        }
        if(keysPressed.has("ArrowRight")) //right arrow
        {
            ++game.player.dir;//TODO
        }
        if(keysPressed.has("Space")) //space
        {
            if(!game.player.front.reloading)
            {
                game.bullets.push(new Bullet(game.player, game.player.front, 10));
                game.player.front.reloading = true;
                window.setTimeout(function(){game.player.front.reloading = false;}, PLAYER_RELOAD_TIME);
            }
            if(!game.player.rear.reloading)
            {
                game.bullets.push(new Bullet(game.player, game.player.rear, 10));
                game.player.rear.reloading = true;
                window.setTimeout(function(){game.player.rear.reloading = false;}, PLAYER_RELOAD_TIME);
            }
        }
    }

    movePlayer(player) {
        if(player.speed != 0)
        {
            player.x += player.speed * Math.cos(player.dir * RAD);
            player.y += player.speed * Math.sin(player.dir * RAD);
        }
    }
    moveBullet(b) {
        b.x += b.speed * Math.cos(b.dir * RAD);
        b.y += b.speed * Math.sin(b.dir * RAD);
    }
    checkBullet(game, b, index) {
        //If offscreen, remove from array
        if(b.x < 0 || b.x > CANVAS_WIDTH || b.y < 0 || b.y > CANVAS_HEIGHT )
        {
            game.bullets.splice(index, 1);
        }
        
        //TODO Check collision
    }
    update(game, keysPressed) {
        this.handlePressedKeys(game, keysPressed);
        this.movePlayer(game.player);
        for (let index in game.bullets) {
            let bullet = game.bullets[index];
            this.moveBullet(bullet);
            this.checkBullet(game, bullet, index);
        }
    }
}

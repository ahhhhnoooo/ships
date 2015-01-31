var game = {};
game.player1;
game.bullets = [];
game.images = [];
game.keysPressed = [];
game.labels = [];
game.cvs;
game.ctx;
game.p = Math.PI/180;

function Bullet(player, turret, img, speed){
	var playerDirection = player.dir * game.p;
	this.x = player.x + turret.x * Math.cos(playerDirection) + turret.y * Math.sin(playerDirection);
	this.y = player.y + turret.y * Math.cos(playerDirection) + turret.x * Math.sin(playerDirection);
	this.dir = player.dir + turret.dir;
	this.img = img;
	this.speed = speed;
}

function Turret(x,y,dir,img,angle){
	this.x = x;
	this.y = y;
	this.dir = dir;
	this.img = img;
	this.angle = angle;
	this.reloading = false;
}

function Player(x,y,dir,img,speed,front,rear){
	this.x = x;
	this.y = y;
	this.dir = dir;
	this.img = img;
	this.speed = speed;
	this.front = front;
	this.rear = rear;
	this.width = img.width; //TODO Better collision detection
	this.height = img.height;
}

function movePlayer(player){
	if(player.speed != 0)
	{
		player.x += player.speed * Math.cos(player.dir * game.p);
		player.y += player.speed * Math.sin(player.dir * game.p);
	}
}

function moveBullet(b){
	b.x += b.speed * Math.cos(b.dir * game.p);
	b.y += b.speed * Math.sin(b.dir * game.p);
}

function checkBullet(b,index,array)
{
	//If offscreen, remove from array
	if(b.x < 0 || b.x > game.cvs.width || b.y < 0 || b.y > game.cvs.height )
	{
		game.bullets.splice(index,1);
	}
	
	//TODO Check collision
}

function drawBullet(b,index,array){
	moveBullet(b);
	checkBullet(b,index,array);
	game.ctx.drawImage(b.img,b.x,b.y);
}

function drawTurret(player,turret){
	game.ctx.save();
	game.ctx.translate(turret.x, turret.y);
	game.ctx.rotate(turret.dir * game.p);
	game.ctx.drawImage(turret.img, -turret.img.width/2, -turret.img.height/2);
	game.ctx.restore();
}

function drawPlayer(player){
	game.ctx.save();
	game.ctx.translate(player.x, player.y);
	game.ctx.rotate(player.dir * game.p);
	game.ctx.drawImage(player.img, -player.img.width/2, -player.img.height/2);
	drawTurret(player,player.front);
	drawTurret(player,player.rear);
	game.ctx.restore();
}

function keyDown(keyEvent) {
	var charCode = keyEvent.charCode ? keyEvent.charCode : keyEvent.keyCode;
	game.keysPressed[charCode] = true;
}

function keyUp(keyEvent) {
	var charCode = keyEvent.charCode ? keyEvent.charCode : keyEvent.keyCode;
	game.keysPressed[charCode] = false;
}

function handlePressedKeys() {
	var update = false;
		if(game.keysPressed[65]) //a
		{
			++game.player1.front.dir;
			++game.player1.rear.dir;
			update = true;
		}
		if(game.keysPressed[68]) //d
		{
			--game.player1.front.dir;
			--game.player1.rear.dir;
			update = true;
		}
		if(game.keysPressed[87]) //w
		{
			++game.player1.front.angle;
			++game.player1.rear.angle;
			update = true;
		}
		if(game.keysPressed[83]) //s
		{
			--game.player1.front.angle;
			--game.player1.rear.angle;
			update = true;
		}
		if(game.keysPressed[81]) //q
		{
			++game.player1.front.dir;
			--game.player1.rear.dir
			update = true;
		}
		if(game.keysPressed[69]) //e
		{
			--game.player1.front.dir;
			++game.player1.rear.dir;
			update = true;
		}
		if(game.keysPressed[70]) //f
		{
			++game.player1.speed;
			update = true;
		}
		if(game.keysPressed[86]) //v
		{
			--game.player1.speed;
			update = true;
		}
		if(game.keysPressed[37]) //left arrow
		{
			--game.player1.dir;//TODO
		}
		if(game.keysPressed[39]) //right arrow
		{
			++game.player1.dir;//TODO
		}
	if(game.keysPressed[32]) //space
	{
		if(!game.player1.front.reloading)
		{
			game.bullets.push(new Bullet(game.player1, game.player1.front, game.images.bulletImage, 1));
			game.player1.front.reloading = true;
			window.setTimeout(function(){game.player1.front.reloading = false;},2000);
		}
		if(!game.player1.rear.reloading)
		{
			game.bullets.push(new Bullet(game.player1, game.player1.rear, game.images.bulletImage, 1));
			game.player1.rear.reloading = true;
			window.setTimeout(function(){game.player1.rear.reloading = false;},2000);
		}
	}
	
	if(update)
	{
		game.labels["frontAngleLabel"].innerHTML=game.player1.front.dir.toString();
		game.labels["rearAngleLabel"].innerHTML=game.player1.rear.dir.toString();
		game.labels["frontElevationLabel"].innerHTML=game.player1.front.angle.toString();
		game.labels["rearElevationLabel"].innerHTML=game.player1.rear.angle.toString();
		game.labels["speed"].innerHTML=game.player1.speed.toString();
	}
}

function mainLoop(timestamp){
	game.cvs.width = game.cvs.width;
	
	movePlayer(game.player1);
	drawPlayer(game.player1);
	
	game.bullets.forEach(drawBullet);
	
	window.requestAnimationFrame(mainLoop);
}

function init() {
	document.addEventListener("keydown", keyDown);
	document.addEventListener("keyup", keyUp);
	game.cvs = document.getElementById("gameCanvas");
	game.ctx = game.cvs.getContext("2d");
	game.images.bulletImage = new Image();
	game.images.bulletImage.src = "img/bullet.png";
	game.images.playerImage = new Image();
	game.images.playerImage.src = "img/ship.png";
	game.images.turretImage = new Image();
	game.images.turretImage.src = "img/turret.png";
	game.labels["frontAngleLabel"] = document.getElementById("frontAngleLabel");
	game.labels["rearAngleLabel"] = document.getElementById("rearAngleLabel");
	game.labels["frontElevationLabel"] = document.getElementById("frontElevationLabel");
	game.labels["rearElevationLabel"] = document.getElementById("rearElevationLabel");
	game.labels["speed"] = document.getElementById("speed");
	
	game.images.playerImage.onload=function(){
	    frontTurret = new Turret(game.images.playerImage.width/3,0,0,game.images.turretImage,0);
	    rearTurret = new Turret(-game.images.playerImage.width/3,0,0,game.images.turretImage,0);
	    game.player1 = new Player(game.images.playerImage.width/2,
                              game.images.playerImage.height/2,
                            0,
                            game.images.playerImage,
                            0,
                            frontTurret,
                            rearTurret);
	    mainLoop();
	}
	window.setInterval(handlePressedKeys,50);
}

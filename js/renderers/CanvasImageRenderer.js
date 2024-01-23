

class CanvasImageRenderer {
    /** Canvas 2D Context */
    ctx;
    /** Images used to draw */
    bulletImage;
    turretImage;
    playerImage;

    constructor() {
        let cvs = document.getElementById("gameCanvas");
        this.ctx = cvs.getContext("2d");
        this.bulletImage = new Image();
        this.bulletImage.src = "img/bullet.png";
        this.turretImage = new Image();
        this.turretImage.src = "img/turret.png";
        this.playerImage = new Image();
        this.playerImage.src = "img/ship.png";
    }
    drawBullet(b){
        this.ctx.drawImage(this.bulletImage,b.x,b.y);
    }
    drawTurret(turret){
        this.ctx.save();
        this.ctx.translate(turret.x, turret.y);
        this.ctx.rotate(turret.dir * RAD);
        this.ctx.drawImage(this.turretImage, -this.turretImage.width/2, -this.turretImage.height/2);
        this.ctx.restore();
    }
    drawPlayer(player){
        this.ctx.save();
        this.ctx.translate(player.x, player.y);
        this.ctx.rotate(player.dir * RAD);
        this.ctx.drawImage(this.playerImage, -this.playerImage/2, -this.playerImage/2);
        this.drawTurret(player, player.front);
        this.drawTurret(player, player.rear);
        this.ctx.restore();
    }
    draw(game) {
        this.ctx.fillStyle = "#0000ff";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = "#ffffff";
        this.drawPlayer(game.player);
        for (let bullet of game.bullets) {
            this.drawBullet(bullet);
        }
    }
}

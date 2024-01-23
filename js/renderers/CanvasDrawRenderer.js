
class CanvasDrawRenderer {
    /** Canvas 2D Context */
    ctx;
    constructor() {
        let cvs = document.getElementById("gameCanvas");
        this.ctx = cvs.getContext("2d");
    }
    drawBullet(b){
		this.ctx.save();
		this.ctx.translate(b.x, b.y);
		this.ctx.rotate(b.dir * RAD);
		this.ctx.beginPath();
		this.ctx.moveTo(3, 0);
		this.ctx.lineTo(-1, 2);
		this.ctx.lineTo(-1, -2);
		this.ctx.lineTo(3, 0);
		this.ctx.fill();
		this.ctx.restore();
    }
    drawTurret(turret){
		this.ctx.save();
		this.ctx.translate(turret.x, turret.y);
		this.ctx.rotate(turret.dir * RAD);
		this.ctx.beginPath();
		this.ctx.arc(0, 0, TURRET_RADIUS, 0, 2 * Math.PI);
		this.ctx.lineWidth = TURRET_BARREL_WIDTH;
		this.ctx.lineTo(TURRET_BARREL_LENGTH, 0);
		this.ctx.stroke();
		this.ctx.fill();
		this.ctx.restore();
    }
    drawPlayer(player){
		this.ctx.save();
		this.ctx.translate(player.x, player.y);
		this.ctx.rotate(player.dir * RAD);
		this.ctx.moveTo(PLAYER_WIDTH / 2, 0);
		this.ctx.quadraticCurveTo(0, PLAYER_HEIGHT, -PLAYER_WIDTH / 2, 0);
		this.ctx.quadraticCurveTo(0, -PLAYER_HEIGHT, PLAYER_WIDTH / 2, 0);
		this.ctx.stroke();
		this.ctx.fillStyle = "#888888";
		this.ctx.fill();
        this.drawTurret(player.front);
        this.drawTurret(player.rear);
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
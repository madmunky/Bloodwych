function Projectile(type, level, tower, floor, x, y, d) {
	this.level = level;
	this.type = type;
	this.tower = tower;
	this.floor = floor;
	this.x = x;
	this.y = y;
	this.d = d;
}

function newProjectile(type, level, floor, x, y, d) {
	var pmax = projectile.length;
	projectile[pmax] = new Projectile(type, level, towerThis, floor, x, y, d);
}

function moveProjectile(id) {
}

function deleteProjectile(id) {
	projectile.splice(id, 1);
}
function Projectile(type, power, tower, floor, x, y, d) {
	this.power = power;
	this.type = type;
	this.tower = tower;
	this.floor = floor;
	this.x = x;
	this.y = y;
	this.d = d;
}

function newProjectile(type, power, floor, x, y, d) {
	var pmax = projectile.length;
	projectile[pmax] = new Projectile(type, power, towerThis, floor, x, y, d);
}

function moveProjectile(id) {
	
}

function deleteProjectile(id) {
	projectile.splice(id, 1);
}
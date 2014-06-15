function Projectile(id, type, palette, power, tower, floor, x, y, d, m) {
	this.id = id;
	this.type = type;
	this.palette = palette;
	this.power = power;
	this.tower = tower;
	this.floor = floor;
	this.x = x;
	this.y = y;
	this.d = d;
	this.monster = m;
	this.dead = 0;
}

Projectile.prototype.moveProjectile = function() {
	if(this.dead === 0) {
		var xy = getOffsetByRotation(this.d);
		var ob = getObject(this.floor, this.x, this.y, this.d);
		var obNext = canMove(this.floor, this.x, this.y, this.d);
		if(obNext <= OBJECT_MISC && ob !== OBJECT_MISC && ob !== OBJECT_CHARACTER && ob !== OBJECT_STAIRS && ob !== OBJECT_DOOR) {
			this.x += xy.x;
			this.y += xy.y;
		} else {
			if(ob === OBJECT_CHARACTER) {
				var mon = getMonsterAt(this.floor, this.x, this.y);
				if(mon !== null) {
					if(typeof this.monster !== "undefined") {
						for(p = 0; p < player.length; p++) {
							if (this.floor === player[p].floor && this.x === player[p].x && this.y === player[p].y) {
								this.attack(player[p]);
								this.dead = 1;
								return false;
							}
						}
						this.attack(mon);
					}
				}
			}
			this.dead = 1;
			return false;
		}
	} else if(this.dead === 1) {
		this.dead = 2;
		return false;
	}
	return true;
}

Projectile.prototype.attack = function(target) {
	var combat = calculateAttack(this, target);
	for (com = 0; com < combat.length; com++) {
		var att = combat[com].attacker;
		var def = combat[com].defender;
		var pwr = combat[com].power;
		var dExh = combat[com].defExhaustion;
		if(att !== null) {
			var pl = att.isRecruitedBy();
			var ch = att.getChampion();
			att.doDamageTo(def, pwr, dExh);
			if (pl !== null && ch !== null) {
				pl.gainChampionXp(pwr, ch);
				if(def.dead) {
					pl.gainChampionXp(128);
				}
			}
		}
	}
}

function newProjectile(type, palette, power, f, x, y, d, m) {
	if(typeof tower[towerThis].floor[f].Map[y] === "undefined" || typeof tower[towerThis].floor[f].Map[y][x] === "undefined") {
		return false;
	}
	var pmax = projectile[towerThis].length;
	projectile[towerThis][pmax] = new Projectile(pmax, type, palette, power, towerThis, f, x, y, d, m);
	return true;
}

function getProjectileDistanceByPos(pos) {
	if (pos <= 4) {
		return DISTANCE_FAR;
	} else if (pos <= 9) {
		return DISTANCE_MID;
	} else if (pos <= 12) {
		return DISTANCE_CLOSE;
	} else if (pos <= 15) {
		return DISTANCE_VERY_CLOSE;
	} else {
		return -1;
	}
}

function getProjectileGfxOffset(pos) {
	var xy = posToCoordinates(pos, 0, 0, 0);
	var offx = xy.x * 4;
	var offy = -xy.y * 4;
	var x = Math.round(offx * (190.0 / (offy + 6)));
	var y = Math.round(51 - 200.0 / (offy + 6));
	return {
		x: x,
		y: y
	}
}
function Projectile(id, type, palette, s, power, tower, floor, x, y, d, m) {
	this.id = id;
	this.type = type;
	this.palette = palette;
	this.spell = getSpellById(s);
	this.power = power;
	this.tower = tower;
	this.floor = floor;
	this.x = x;
	this.y = y;
	this.d = d;
	this.monster = m;
	if (s > -1) {
		this.dead = 0;
	} else {
		this.dead = 1;
	}
	this.timer = timerMaster;
}

Projectile.prototype.moveProjectile = function() {
	if (this.dead === 0) {
		if (this.action()) {
			return true;
		}
		var ob = getObject(this.floor, this.x, this.y, this.d);
		var obNext = canMove(this.floor, this.x, this.y, this.d);
		var msc = (ob === OBJECT_MISC || ob === OBJECT_STAIRS || ob === OBJECT_DOOR);
		if (typeof this.monster !== "undefined") {
			for (var p = 0; p < player.length; p++) {
				if (this.floor === player[p].floor && this.x === player[p].x && this.y === player[p].y) {
					this.attack(player[p]);
					this.dead = 2;
					return false;
				}
			}
			var mon = getMonsterAt(this.floor, this.x, this.y);
			if (mon !== null) {
				this.attack(mon);
				this.dead = 2;
				return false;
			}
		}
		if ((obNext >= OBJECT_WOOD && obNext <= OBJECT_GEM) || msc) {
			this.dead = 2;
			return false;
		}
		var pr = getProjectilesAt(this.floor, this.x, this.y);
		if (pr.length > 1) {
			for (var p = 0; p < pr.length; p++) {
				pr[p].dead = 2;
			}
			return false;
		}
	} else if (this.dead === 1) {
		this.dead = 2;
		return false;
	} else if (this.dead === 2) {
		this.dead = 3;
		return false;
	}
	var xy = getOffsetByRotation(this.d);
	this.x += xy.x;
	this.y += xy.y;
	return true;
}

Projectile.prototype.action = function() {
	var ob = getObject(this.floor, this.x, this.y, this.d);
	var obNext = canMove(this.floor, this.x, this.y, this.d);
	var msc = (ob === OBJECT_MISC || ob === OBJECT_STAIRS || ob === OBJECT_DOOR);
	switch (this.spell.index) {
		case SPELL_ARC_BOLT:
			if (obNext > OBJECT_MISC && !msc) {
				var dNew = Math.floor(Math.random() * 2) * 2 + 1;
				obNext = canMove(this.floor, this.x, this.y, (this.d + dNew) % 4);
				if (obNext > OBJECT_MISC) {
					dNew = 4 - dNew;
					obNext = canMove(this.floor, this.x, this.y, (this.d + dNew) % 4);
					if (obNext > OBJECT_MISC) {
						dNew = 2;
						obNext = canMove(this.floor, this.x, this.y, (this.d + dNew) % 4);
						if (obNext > OBJECT_MISC) {
							return true;
						}
					}
				}
				this.d = (this.d + dNew) % 4;
			}
			break;
		case SPELL_FIREPATH:
		case SPELL_BLAZE:
			if (getHexToBinaryPosition(tower[towerThis].floor[this.floor].Map[this.y][this.x], 0, 16) === '0000') {
				setDungeonHex(this.floor, this.x, this.y, 12, 7, '7');
				setDungeonHex(this.floor, this.x, this.y, 6, 2, '1');
				setDungeonHex(this.floor, this.x, this.y, 0, 6, dec2hex(this.power));
				setDungeonSpell(this.floor, this.x, this.y, this);
			}
			break;
	}
	return false;
}

Projectile.prototype.attack = function(target, prc) {
	if (typeof prc === "undefined") {
		var prc = 1.0;
	}
	single = false;
	if (this.spell.index === SPELL_MISSILE) {
		single = true;
	}
	for (var i = 3; i >= 0; i--) {
		if (single) {
			var combat = calculateAttack(this, target);
		} else {
			var combat = calculateAttack(this, target, i);
		}
		for (com = 0; com < combat.length; com++) {
			var att = combat[com].attacker;
			var def = combat[com].defender;
			var pwr = Math.floor(combat[com].power * prc);
			var dExh = Math.floor(combat[com].defExhaustion * prc);
			if (att !== null) {
				var pl = att.isRecruitedBy();
				var ch = att.getChampion();
				att.doDamageTo(def, pwr, dExh);
				if (pl !== null && ch !== null) {
					pl.gainChampionXp(pwr, ch);
					if (def.dead) {
						pl.gainChampionXp(128);
					}
				}
			}
		}
		if (single) {
			break;
		}
	}
}

function newProjectile(type, palette, s, power, f, x, y, d, m) {
	if (typeof tower[towerThis].floor[f].Map[y] === "undefined" || typeof tower[towerThis].floor[f].Map[y][x] === "undefined") {
		return false;
	}
	var pmax = projectile[towerThis].length;
	if (s > -1) {
		var xy = getOffsetByRotation(d);
		if (canMove(f, x, y, d) !== OBJECT_WALL && canMove(f, x, y, d) !== OBJECT_WOOD) {
			projectile[towerThis][pmax] = new Projectile(pmax, type, palette, s, power, towerThis, f, x + xy.x, y + xy.y, d, m);
		}
	} else {
		projectile[towerThis][pmax] = new Projectile(pmax, type, palette, s, power, towerThis, f, x, y, d, m);
	}
	return true;
}

function getProjectilesAt(f, x, y) {
	var pr = new Array();
	for (p = 0; p < projectile[towerThis].length; p++) {
		if (projectile[towerThis][p].dead === 0 && projectile[towerThis][p].floor === f && projectile[towerThis][p].x === x && projectile[towerThis][p].y === y) {
			pr.push(projectile[towerThis][p]);
		}
	}
	return pr;
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
	var y = Math.round(45 - 0.0 / (offy + 6));
	return {
		x: x,
		y: y
	}
}

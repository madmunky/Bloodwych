function Projectile(id, type, palette, s, power, tower, floor, x, y, d, m) {
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
	this.s = s;
	if(s >= 100) {
		this.spell = s - 100;
	} else {
		this.spell = getSpellById(s);
	}
	if (s > -1) {
		this.dead = 0;
	} else {
		this.dead = 1;
	}
	this.timer = timerMaster;
}

Types.Projectile = Projectile;

Projectile.prototype.toJSON = function() {
	var mid = null;
	if(typeof this.monster !== 'undefined' && this.monster !== null) {
		mid = this.monster.id;
	}
	return {
		__type: 'Projectile',
		id: this.id,
		type: this.type,
		palette: this.palette,
		power: this.power,
		tower: this.tower,
		floor: this.floor,
		x: this.x,
		y: this.y,
		d: this.d,
		monster: mid,
		s: this.s,
		dead: this.dead,
		timer: this.timer,
	}
}

Projectile.revive = function(data) {
	var p = new Projectile(data.id, data.type, data.palette, data.s, data.power, data.tower, data.floor, data.x, data.y, data.d);
	p.monster = getMonsterById(data.monster);
	p.dead = data.dead;
	p.timer = data.timer;
	return p;
};

Projectile.prototype.moveProjectile = function() {
	var ob = getObject(this.floor, this.x, this.y, this.d);
	var msc = (ob === OBJECT_MISC || ob === OBJECT_STAIRS || ob === OBJECT_DOOR);
	if (this.dead === 0) {
		if (this.action()) {
			return true;
		}
		var obNext = canMove(this.floor, this.x, this.y, this.d);
		if (typeof this.monster !== "undefined") {
			var sid = this.spell.index;
			var isDamage = (sid === SPELL_ARC_BOLT || sid === SPELL_DISRUPT || sid === SPELL_MISSILE || sid === SPELL_FIREBALL || sid === SPELL_FIREPATH || sid === SPELL_BLAZE || sid === SPELL_WYCHWIND);
			for (p in player) {
				if (!player[p].dead && this.floor === player[p].floor && this.x === player[p].x && this.y === player[p].y) {
					if(isDamage) {
						this.attack(player[p]);
						this.dead = 2;
						return false;
					}
				}
			}
			var mon = getMonsterAt(this.floor, this.x, this.y);
			if (mon !== null) {
				if(isDamage) {
					this.attack(mon);
				} else {
					var combat = calculateAttack(this, mon);
					if(combat.length > 0) {
						if(sid === SPELL_PARALYZE) {
							mon.timerParalyze = combat[0].power;
						} else if(sid === SPELL_TERROR) {
							mon.timerTerror = combat[0].power;
						}
					}
				}
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
		if(typeof this.spell === 'number') { //item
			if(getMonsterAt(this.floor, this.x, this.y) === null) {
				if(msc) {
					var d1 = [ 3, 0, 1, 2 ];
					dropItem(this.spell, 1, this.floor, this.x, this.y, d1[this.d]);
				} else {
					dropItem(this.spell, 1, this.floor, this.x, this.y, this.d);
				}
			}
		}
		this.dead = 3;
		return false;
	}
	var xy = getOffsetByRotation(this.d);
	this.x += xy.x;
	this.y += xy.y;
	return true;
}

Projectile.prototype.action = function() {
	if(typeof this.spell !== 'number') {
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
				if (getHexToBinaryPosition(tower[towerThis].floor[this.floor].Map[this.y][this.x], 0, 16) === '0000') {
					setDungeonHex(this.floor, this.x, this.y, 12, 4, '7');
					setDungeonHex(this.floor, this.x, this.y, 6, 2, '1');
					setDungeonHex(this.floor, this.x, this.y, 0, 6, dec2hex(this.power));
					setDungeonSpell(this.floor, this.x, this.y, this);
				}
				break;
			case SPELL_BLAZE:
				if(this.palette === PALETTE_BLAZE_BIG) {
					if (getHexToBinaryPosition(tower[towerThis].floor[this.floor].Map[this.y][this.x], 0, 16) === '0000') {
						setDungeonHex(this.floor, this.x, this.y, 12, 4, '7');
						setDungeonHex(this.floor, this.x, this.y, 6, 2, '1');
						setDungeonHex(this.floor, this.x, this.y, 0, 6, dec2hex(this.power));
						setDungeonSpell(this.floor, this.x, this.y, this);
					}
					if (obNext > OBJECT_NONE) {
						this.palette = PALETTE_DRAGON_BIG;
						this.d = (this.d + 2) % 4;
						return true;
					}
				} else {
					var xy = getOffsetByRotation(this.d);
					if (canMoveByFirepath(this.floor, this.x, this.y) && !canMoveByFirepath(this.floor, this.x, this.y, this.d)) {
						this.d = (this.d + 2) % 4;
						if (!canMoveByFirepath(this.floor, this.x, this.y, this.d)) {
							return true;
						}
					}
				}
				break;
		}
	}
	return false;
}

Projectile.prototype.attack = function(target, prc) {
	if (typeof prc === "undefined") {
		var prc = 1.0;
	}
	single = false;
	if (typeof this.spell === 'number' || this.spell.index === SPELL_MISSILE) {
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
			if (typeof this.spell !== 'number' && this.spell.index === SPELL_DISRUPT) {
				if(pwr < def.getHP()) {
					pwr = 1;
				}
			}
			var dExh = Math.floor(combat[com].defExhaustion * prc);
			if (att !== null) {
				var pl = att.isRecruitedBy();
				var ch = att.getChampion();
				att.doDamageTo(def, pwr, dExh);
				if (pl !== null && ch !== null) {
					if (def instanceof Monster) {
						pl.gainChampionXp(pwr, ch);
						if (def.dead) {
							pl.gainChampionXp(128);
						}
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

function getProjectileById(t, id) {
	for (var p = 0; p < projectile[t].length; p++) {
		if(id === projectile[t][p].id){
			return projectile[t][p];
		}
	}
	return null;
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

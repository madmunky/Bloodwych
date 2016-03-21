function Projectile(id, type, palette, snd, s, power, tower, floor, x, y, d, m, act) {
	this.id = id;
	this.type = type;
	this.palette = palette;
	this.sound = snd;
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
	if(typeof act !== "undefined") {
		this.action = act;
	} else if(typeof spellJson[s] !== "undefined" && typeof spellJson[s].action !== "undefined") {
		this.action = spellJson[s].action;
	}
	this.dead = 0;
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
		sound: this.sound,
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
		action: this.action
	}
}

Projectile.revive = function(data) {
	var p = new Projectile(data.id, data.type, data.palette, data.sound, data.s, data.power, data.tower, data.floor, data.x, data.y, data.d, data.action);
	p.monster = getMonsterById(data.monster);
	p.dead = data.dead;
	p.timer = data.timer;
	return p;
};

Projectile.prototype.move = function() {
	var ob = getObject(this.floor, this.x, this.y, this.d);
	var msc = (ob === OBJECT_MISC || ob === OBJECT_STAIRS || ob === OBJECT_DOOR);
	if (this.dead === 0) {
		if (this.event()) {
			return true;
		}
		for(var p in player) { player[p].redrawViewPort = true;} 
		var obNext = canMove(this.floor, this.x, this.y, this.d);
		if (typeof this.monster !== "undefined") {
			var sid = null;
			if(this.spell !== null) {
				var sid = this.spell.id;
				var sp = this.action;
				var isMissile = (sid === SPELL_PARALYZE || sid === SPELL_TERROR || sid === SPELL_SPELLTAP || sid === SPELL_MISSILE || sid === SPELL_CONFUSE || sid === SPELL_NULLIFY || sid === SPELL_FIREPATH);
				if(typeof sp !== "undefined") { //JSON
					var mis = getObjectByKeys(sp, 'onComplete', 'areaOfEffect');
					//var mid = getObjectByKeys(sp, 'id');
					if(typeof mis !== "undefined") {
						isMissile = (mis === 'single');
					}
				} else {
					var isDamage = (typeof this.spell === 'number' || sid === SPELL_ARC_BOLT || sid === SPELL_DISRUPT || sid === SPELL_MISSILE || sid === SPELL_FIREBALL || sid === SPELL_FIREPATH || sid === SPELL_BLAZE || sid === SPELL_WYCHWIND || sid === SPELL_INFERNO || sid === SPELL_SPRAY);
				}
				/*if(typeof sp !== "undefined" && typeof mis !== "undefined") {
					var isMissile = (mis === 'single');
				} else {
					var isMissile = (sid === SPELL_PARALYZE || sid === SPELL_TERROR || sid === SPELL_SPELLTAP || sid === SPELL_MISSILE || sid === SPELL_CONFUSE || sid === SPELL_NULLIFY || sid === SPELL_FIREPATH);
				}*/
			}
			var pl = getPlayerAt(this.floor, this.x, this.y);
			if(pl !== null) {
				var dfl = pl.getActiveSpellActionValue('deflectProjectile');
				if(typeof dfl !== "undefined") { //JSON
					var dft = dfl.areaOfEffect;
					var dfi = dfl.id;
				}
				var abs = pl.getActiveSpellActionValue('absorbProjectile');
				if(typeof abs !== "undefined") { //JSON
					var abt = abs.areaOfEffect;
					var abi = abs.id;
				}
				if((typeof dfl !== "undefined" && (typeof dft === "undefined" || dft === mis) && (typeof dfi === "undefined" || dfi === this.type)) || ((pl.getActiveSpellById(SPELL_DEFLECT).timer > 0 || pl.getActiveSpellById(SPELL_PROTECT).timer > 0) && isMissile)) { //Deflect makes missile-shaped spells to reverse direction
					if(pl.getActiveSpellById().timer > 0) {
						pl.getActiveSpellById().timer -= this.power;
					}
					this.d = (this.d + 2) % 2;
					var xy = getOffsetByRotation(this.d);
					this.x += xy.x;
					this.y += xy.y;
					return true;
				} else if(typeof abs !== "undefined" && (typeof abt === "undefined" || abt === mis) && (typeof abi === "undefined" || abi === this.type)) {
					var abf = abs.absorbFactor;
					if(typeof abf !== "undefined" && abf > 0.0) {
						var tim = pl.getActiveSpellById().timer;
						if(tim > 0) {
							tim = tim - this.power * abf;
							pl.getActiveSpellById().timer = tim;
							this.power = this.power * (1.0 - abf);
							if(tim < 0) {
								this.power = -tim * abf;
							}
						}
					}
				} else {
					if(this.doAction(pl)) {
						return true;
					} else {
						if(isDamage) {
							this.attack(pl);
						}
						this.die(true);
						return false;
					}
				}
			}
			var mon = getMonsterAt(this.floor, this.x, this.y);
			if (mon !== null) {
				if(isDamage) {
					this.attack(mon);
				}
				if(this.doAction(mon)) {
					return true;
				} else {
					this.die();
					return false;
				}
			}
		}
		if(this.power === 0) {
			if(this.spell !== null) {
				this.doAction();
			}
			this.die();
			return false;
		}
		if ((obNext >= OBJECT_WOOD && obNext <= OBJECT_GEM) || msc) {
			this.die();
			return false;
		}
		var pr = getProjectilesAt(this.floor, this.x, this.y);
		if (pr.length > 1) {
			for (var p = 0; p < pr.length; p++) {
				pr[p].die();
			}
			return false;
		}
	} else if (this.dead === 1) {
		if(this.spell !== null && typeof this.spell === 'number') { //item
			if(getMonsterAt(this.floor, this.x, this.y) === null) {
				if(msc) {
					var d1 = [ CHAR_BACK_LEFT, CHAR_FRONT_LEFT, CHAR_FRONT_RIGHT, CHAR_BACK_RIGHT ];
					dropItem(this.spell, 1, this.floor, this.x, this.y, d1[this.d]);
				} else {
					dropItem(this.spell, 1, this.floor, this.x, this.y, this.d);
				}
			}
		}
		if(this.spell !== null) {
			var id = this.spell.id;
			var act = this.action; //spellJson[id];
			if(typeof act !== "undefined") { //JSON
				if(getMonsterAt(this.floor, this.x, this.y) === null) {
					executeSpell(id, act.onFail, this, this.power);
					executeSpell(id, act.onComplete, this, this.power);
				}
			}
		}
		this.dead = 2;
		for(var p in player) { player[p].redrawViewPort = true;}
		return false;
	}
	var xy = getOffsetByRotation(this.d);
	this.x += xy.x;
	this.y += xy.y;
	return true;
}

Projectile.prototype.die = function(snd) {
	var fromP = false;
	if(this.monster instanceof Monster && this.monster !== null) {
		var ch = this.monster.getChampion();
		if(ch !== null && ch.recruitment.playerId > -1) {
			fromP = true;
		}
	}
	this.dead = 1;
	if(fromP || (snd && this.sound !== null)) {
		playSound(this.sound);
	}
	for(var p in player) { player[p].redrawViewPort = true;}
}

Projectile.prototype.doAction = function(tar) {
	var res = false;
	if(this.spell !== null && typeof this.spell !== 'number') {
		var id = this.spell.id;
		var sp = this.action; //spellJson[id];
		if(typeof sp !== "undefined") { //JSON
			var act = sp.onComplete;
			if(typeof act !== "undefined") {
				var typ = getObjectByKeys(act, 'areaOfEffect');
				if(typeof typ !== "undefined" && typ === 'multi') {
					var combat = calculateAttack(this, tar, 'all');
				} else {
					var combat = calculateAttack(this, tar);
				}
				if(combat.length > 0) {
					for(var c in combat) {
						executeSpell(id, act, combat[c]);
					}
				}
			}
		} else {
			var fac = 1.0;
			var combat = calculateAttack(this, tar);
			if(combat.length > 0) {
				switch (id) {
					case SPELL_PARALYZE:
						if(tar instanceof Monster) {
							tar.timerParalyze = combat[0].power * fac;
						}
						break;
					case SPELL_TERROR:
						if(tar instanceof Monster) {
							tar.timerTerror = combat[0].power * fac;
						}
						break;
					case SPELL_SPELLTAP:
						var pw = combat[0].power * fac;
						if(tar instanceof Monster) {
							var cht = tar.getChampion();
							if(cht !== null) {
								if(pw > cht.getSP()) {
									pw = cht.getSP();
								}
								cht.addSP(-pw);
							} else if(tar.type === MON_TYPE_CASTER || tar.type === MON_TYPE_DRONE_CASTER) {
								tar.type--;
							}
						} else {
							var def = combat[0].defender;
							if(def !== null) {
								if(pw > def.getSP()) {
									pw = def.getSP();
								}
								def.addSP(-pw);
								if(def.recruitment.playerId > -1) {
									redrawUI(def.recruitment.playerId, UI_REDRAW_LEFT);
								}
							}
						}
						if (typeof this.monster !== "undefined") {
							var ch = this.monster.getChampion();
							if(ch !== null) {
								ch.addSP(pw);
								if(ch.recruitment.playerId > -1) {
									redrawUI(ch.recruitment.playerId, UI_REDRAW_LEFT);
								}
							}
						}
						break;
					case SPELL_VIVIFY:
						if (getMonsterAt(this.floor, this.x, this.y) === null) {
							for(var i = item[towerThis].length - 1; i >= 0; i--) {
								var it = item[towerThis][i];
								if(it.location.tower === towerThis && it.location.floor === this.floor && it.location.x === this.x && it.location.y === this.y) {
									var rv = itemJson[it.id].revive;
									if (typeof rv !== "undefined") {
										var c = CHAMPION_ID[rv.getVar()]; //it.id - 'ITEM_BLODWYN_RIP';
										item[towerThis].splice(i, 1);
										champion[c].stat.hp = 0;
										champion[c].getMonster().floor = this.floor;
										champion[c].getMonster().x = this.x;
										champion[c].getMonster().y = this.y;
										champion[c].getMonster().d = this.d;
										champion[c].getMonster().hp = 0;
										champion[c].getMonster().dead = false;
										if (!champion[c].recruitment.attached && champion[c].recruitment.playerId > -1) {
											var p = player[champion[c].recruitment.playerId];
											if (p.dead) {
												champion[c].recruitment.attached = true;
												var i = p.getChampionPosition(c);
												p.exchangeChampionPosition(0, i);
												p.championLeader = 0;
												p.tower = towerThis;
												p.floor = this.floor;
												p.x = this.x;
												p.y = this.y;
												p.d = this.d;
												p.dead = false;
												p.updateChampions();
												redrawUI(2);
											}
										}
										return;
									}
								}
							}
						}
						if(tar instanceof Player) {
							for(var c = 0; c < tar.champion.length; c++) {
								var ch = tar.getChampion(c);
								if(ch !== null && ch.getMonster().dead && ch.recruitment.attached) {
									ch.stat.hp = 0;
									ch.getMonster().dead = false;
									redrawUI(2);
								}
							}
							tar.updateChampions();
						}
						break;
					case SPELL_CONFUSE:
						var dr = Math.floor(Math.random() * 4);
						tar.rotateTo(dr);
						if(tar instanceof Player) {
							tar.doEvent(false);
						}
						break;
				}
			}
		}
	}
	return res;
}

Projectile.prototype.event = function() {
	var res = false;
	if(this.spell !== null && typeof this.spell !== 'number') {
		var id = this.spell.id;
		var ob = getObject(this.floor, this.x, this.y, this.d);
		var obNext = canMove(this.floor, this.x, this.y, this.d);
		var msc = (ob === OBJECT_MISC || ob === OBJECT_STAIRS || ob === OBJECT_DOOR);
		var mov = getObjectByKeys(this.action, 'onMove');
		if(typeof mov !== "undefined") { //JSON
			executeSpell(id, mov, this, this.power);
		} else {
			/*if(id === SPELL_ARC_BOLT) {
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
								res = true;
							}
						}
					}
					this.d = (this.d + dNew) % 4;
				}
			}
			if(id === SPELL_FIREPATH) {
				if (getHexToBinaryPosition(tower[towerThis].floor[this.floor].Map[this.y][this.x], 0, 16) === '0000') {
					setDungeonHex(this.floor, this.x, this.y, 13, 3, '7');
					setDungeonHex(this.floor, this.x, this.y, 6, 2, '1');
					setDungeonHex(this.floor, this.x, this.y, 0, 6, dec2hex(this.power));
					setDungeonSpell(id, this.floor, this.x, this.y, this);
				}
			}
			if(id === SPELL_BLAZE) {
				if(this.palette === paletteData['BLAZE_BIG']) {
					if (getHexToBinaryPosition(tower[towerThis].floor[this.floor].Map[this.y][this.x], 0, 16) === '0000') {
						setDungeonHex(this.floor, this.x, this.y, 13, 3, '7');
						setDungeonHex(this.floor, this.x, this.y, 6, 2, '1');
						setDungeonHex(this.floor, this.x, this.y, 0, 6, dec2hex(this.power));
						setDungeonSpell(id, this.floor, this.x, this.y, this);
					}
					if (obNext > OBJECT_NONE) {
						this.palette = paletteData['DRAGON_BIG'];
						this.d = (this.d + 2) % 4;
						res = true;
					}
				} else {
					//var xy = getOffsetByRotation(this.d);
					if (canMoveByFirepath(this.floor, this.x, this.y) && !canMoveByFirepath(this.floor, this.x, this.y, this.d)) {
						this.d = (this.d + 2) % 4;
						if (!canMoveByFirepath(this.floor, this.x, this.y, this.d)) {
							res = true;
						}
					}
				}
			}
			if(id === SPELL_INFERNO) {
				if(this.palette === paletteData['BLAZE_BIG']) {
					if(!canMoveByFirepath(this.floor, this.x, this.y)) {
						if (getHexToBinaryPosition(tower[towerThis].floor[this.floor].Map[this.y][this.x], 0, 16) === '0000') {
							setDungeonHex(this.floor, this.x, this.y, 13, 3, '7');
							setDungeonHex(this.floor, this.x, this.y, 6, 2, '1');
							setDungeonHex(this.floor, this.x, this.y, 0, 6, dec2hex(this.power));
							setDungeonSpell(id, this.floor, this.x, this.y, this);
						}
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
										res = true;
									}
								}
							}
							this.d = (this.d + dNew) % 4;
						}
					} else {
						this.palette = paletteData['DRAGON_BIG'];
						res = true;
					}
				} else {
					if (canMoveByFirepath(this.floor, this.x, this.y) && !canMoveByFirepath(this.floor, this.x, this.y, this.d)) {
						var dLast = (this.d + 2) % 4;
						var dNew = Math.floor(Math.random() * 2) * 2 + 1;
						this.d = (this.d + dNew) % 4;
						if (!canMoveByFirepath(this.floor, this.x, this.y, this.d)) {
							this.d = (this.d + 2) % 4;
							if (!canMoveByFirepath(this.floor, this.x, this.y, this.d)) {
								this.d = dLast;
								if (!canMoveByFirepath(this.floor, this.x, this.y, this.d)) {
									res = true;
								}
							}
						}
					}
				}
			}
			if(id === SPELL_NULLIFY) {
				if(this.setBinaryView(18, 12, 1) === '1') {
					this.setBinaryView(18, 12, 1, '0');
				}
				if (this.getBinaryView(18, 13, 3) === '7') {
					this.setBinaryView(18, 0, 16, '0000');
					deleteDungeonSpells(this.floor, this.x, this.y);
				}
			}*/
		}
	}
	return res;
}

Projectile.prototype.attack = function(target, prc) {
	if (typeof prc === "undefined") {
		var prc = 1.0;
	}
	single = false;
	if (typeof this.spell === 'number' || this.spell.id === SPELL_MISSILE) {
		single = true;
	}
	//for (var i = 3; i >= 0; i--) {
		if (single) {
			var combat = calculateAttack(this, target);
		} else {
			var combat = calculateAttack(this, target, 'all');
		}
		for(var com = 0; com < combat.length; com++) {
			var att = combat[com].attacker;
			var def = combat[com].defender;
			var pwr = Math.floor(combat[com].power * prc);
			if(def instanceof Champion) {
				var def2 = def;
				if(def2.recruitment.playerId > -1) {
					def2 = player[def.recruitment.playerId];
				}
				if(def2.getActiveSpellById(SPELL_ANTIMAGE).timer > 0) { //Antimage decreases power of the spell
					def2.getActiveSpellById(SPELL_ANTIMAGE).timer -= pwr;
					pwr = 0;
					if(def2.getActiveSpellById(SPELL_ANTIMAGE).timer < 0) {
						pwr = -def2.getActiveSpellById(SPELL_ANTIMAGE).timer;
					}
				}
				if(def2.getActiveSpellById(SPELL_PROTECT).timer > 0) { //Protect decreases power of the spell
					def2.getActiveSpellById(SPELL_PROTECT).timer -= pwr;
					pwr = 0;
					if(def2.getActiveSpellById(SPELL_PROTECT).timer < 0) {
						pwr = -def2.getActiveSpellById(SPELL_PROTECT).timer;
					}
				}
			}
			if (typeof this.spell !== 'number' && (this.spell.id === SPELL_DISRUPT || this.spell.id === SPELL_SPRAY)) {
				if(pwr > 1 && pwr < def.getHP()) {
					pwr = 1;
				}
			}
			var dExh = Math.floor(combat[com].defExhaustion * prc);
			if (typeof att !== "undefined" && att !== null) {
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
		//if (single) {
		//	break;
		//}
	//}
}

Projectile.prototype.setBinaryView = function(pos18, index, length, to) {
    var xy = posToCoordinates(pos18, this.x, this.y, this.d);
    tower[towerThis].floor[this.floor].Map[xy.y][xy.x] = setHexToBinaryPosition(tower[towerThis].floor[this.floor].Map[xy.y][xy.x], index, length, to);
}

Projectile.prototype.getBinaryView = function(pos18, index, length) {
    var xy = posToCoordinates(pos18, this.x, this.y, this.d);
    try {
        return getHexToBinaryPosition(tower[towerThis].floor[this.floor].Map[xy.y][xy.x], index, length);
    } catch (e) {
        return '0001';
    }
};

function newProjectile(type, palette, snd, s, power, f, x, y, d, m, act) {
	if (typeof tower[towerThis].floor[f].Map[y] === "undefined" || typeof tower[towerThis].floor[f].Map[y][x] === "undefined") {
		return false;
	}
	var pmax = projectile[towerThis].length;
	if (s > -1) {
		var xy = getOffsetByRotation(d);
		if (canMove(f, x, y, d) !== OBJECT_WALL && canMove(f, x, y, d) !== OBJECT_WOOD) {
			projectile[towerThis][pmax] = new Projectile(pmax, type, palette, snd, s, power, towerThis, f, x + xy.x, y + xy.y, d, m, act);
		}
	} else {
		projectile[towerThis][pmax] = new Projectile(pmax, type, palette, snd, s, power, towerThis, f, x, y, d, m, act);
	}
	return true;
}

function getProjectilesAt(f, x, y) {
	var pr = new Array();
	for (var p = 0; p < projectile[towerThis].length; p++) {
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

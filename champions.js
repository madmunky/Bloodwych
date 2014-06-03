function Champion(id, firstName, lastName, prof, colour, level, stat, spellBin, monster, pocketData) {
	this.spellBook = new Array();
	this.pocket = pocketData;
	this.id = id;
	this.recruitment = {
		recruited: false,
		attached: false,
		playerId: 0,
		position: 0,
		attackTimer: 0
	};
	this.firstName = firstName;
	this.lastName = lastName;
	this.level = level;
	this.prof = prof;
	this.colour = colour;
	this.stat = stat;
	this.food = 200;
	this.xp = 0;
	this.xp2 = 0;
	this.spellUp = 0;
	this.levelUp = 0;
	this.monster = monster;
	for (i = 0; i < SPELL_MAX; i++) {
		this.spellBook[i] = new Array();
		this.spellBook[i].castSuccessful = 0;
		this.spellBook[i].learnt = false;
		if (spellBin.substr(i, 1) == '1') {
			this.addSpellToSpellBook(i);
		}
	}
}

Champion.prototype.addSpellToSpellBook = function(spell) {
	this.spellBook[spell].learnt = true;
}

Champion.prototype.doDamageTo = function(def, dmg, aExh, dExh) {
	var self = this;
	if (this.recruitment.recruited) {
		self.writeAttackPoints(dmg);
		redrawUI(self.recruitment.playerId);
	}
	if (typeof aExh !== "undefined") {
		this.stat.vit -= aExh;
		if (this.stat.vit <= 0) {
			this.stat.vit = 0;
		}
	}
	if (def instanceof Champion) {
		if (typeof dExh !== "undefined") {
			def.stat.vit -= dExh;
			if (def.stat.vit <= 0) {
				def.stat.vit = 0;
			}
		}
		def.getDamage(dmg);
	} else if (def instanceof Monster) {
		def.getDamage(dmg);
	}
}

//Damage is 'safe' when champ doesn't get killed by it (e.g. by low vitality)
Champion.prototype.getDamage = function(dmg, safe) {
	var self = this;
	this.stat.hp -= dmg;
	if (typeof safe !== "undefined" && safe) {
		if (this.stat.hp <= 0) {
			this.stat.hp = 0;
		}
	} else {
		if (this.stat.hp < 0) {
			this.stat.hp = -1;
			this.monster.die();
		}
		if (this.recruitment.recruited && this.recruitment.attached) {
			if(self.recruitment.playerId > -1) {
				if(!player[self.recruitment.playerId].attacking) {
					self.writeAttackPoints(dmg, true);
				}
				player[self.recruitment.playerId].alertDamagedPlayer();
				player[self.recruitment.playerId].checkDead();
				player[self.recruitment.playerId].updateChampions();
				redrawUI(self.recruitment.playerId);
			}
		}
	}
}

Champion.prototype.getWeaponPower = function(s) {
	return this.pocket[s].getWeaponPower();
}

Champion.prototype.getArmourClass = function() {
	var ac = this.stat.ac;
	var arm = this.pocket[POCKET_TORSO].getArmourClass();
	var sld = this.pocket[POCKET_SHIELD].getArmourClass();
	var glv = this.pocket[POCKET_GLOVES].getArmourClass();
	if (ac > arm) {
		arm = ac;
	}
	return 10 - arm - sld - glv;
}

Champion.prototype.checkGainLevel = function() {
	if (this.levelUp > 0) {
		var prof = this.prof;
		var stat = new Array();
		stat[PROFESSION_WARRIOR] = {
			str: 10,
			agi: 7,
			int: 5,
			cha: 5,
			hp: 10,
			vit: 8,
			sp: 3
		}
		stat[PROFESSION_WIZARD] = {
			str: 5,
			agi: 7,
			int: 10,
			cha: 5,
			hp: 5,
			vit: 8,
			sp: 10
		}
		stat[PROFESSION_ADVENTURER] = {
			str: 7,
			agi: 5,
			int: 7,
			cha: 10,
			hp: 8,
			vit: 8,
			sp: 5
		}
		stat[PROFESSION_CUTPURSE] = {
			str: 5,
			agi: 10,
			int: 5,
			cha: 5,
			hp: 8,
			vit: 8,
			sp: 5
		}
		for (l = 0; l < this.levelUp; l++) {
			this.stat.str += Math.floor(Math.random() * stat[prof].str) + 1;
			this.stat.agi += Math.floor(Math.random() * stat[prof].agi) + 1;
			this.stat.int += Math.floor(Math.random() * stat[prof].int) + 1;
			this.stat.cha += Math.floor(Math.random() * stat[prof].cha) + 1;
			this.stat.hpMax += Math.floor(Math.random() * stat[prof].hp) + 1;
			this.stat.vitMax += Math.floor(Math.random() * stat[prof].vit) + 1;
			this.stat.spMax += Math.floor(Math.random() * stat[prof].sp) + 1;
			this.level++;
		}
		if(this.recruitment.recruited) {
			var p = this.recruitment.playerId;
			player[p].message(this.firstName + TEXT_GAINED_LEVEL, COLOUR[COLOUR_RED], true);
		}
		this.levelUp = 0;
	}
}



Champion.prototype.restoreStats = function() {
	var alertPlayer = false;
	if(this.recruitment.playerId > -1) {
		var p = player[this.recruitment.playerId];
	}
	if (this !== null) {
		if (!this.monster.dead) {
			this.stat.hp = this.stat.hp + Math.floor((Math.random() * (this.stat.str / 16)) + this.stat.str / 16);
			if (this.stat.hp > this.stat.hpMax) {
				this.stat.hp = this.stat.hpMax;
			}
			this.stat.vit = this.stat.vit + Math.floor((Math.random() * (this.stat.agi / 12)) + this.stat.agi / 12);
			if (this.stat.vit > this.stat.vitMax) {
				this.stat.vit = this.stat.vitMax;
			}
			this.stat.sp = this.stat.sp + Math.floor((Math.random() * (this.stat.int / 12)) + this.stat.int / 12);
			if (this.stat.sp > this.stat.spMax) {
				this.stat.sp = this.stat.spMax;
			}
			if(this.recruitment.recruited && this.id !== CHA_MR_FLAY) {
				if (this.food > 0) {
					this.food--;
				} else {
					this.stat.vit -= Math.floor(Math.random() * 9) + 3;
					if (this.stat.vit < 0) {
						this.stat.vit = 0;
					}
				}
			}
			if (this.stat.vitMax * 0.15 > this.stat.vit) {
				dmg = Math.ceil(this.stat.vitMax * 0.15) - this.stat.vit;
				this.getDamage(dmg, true);
				if (dmg > 0) {
					alertPlayer = true;
				}
			}
		}
	}
	if(typeof p !== "undefined") {
		if (alertPlayer) {
			p.alertDamagedPlayer();
		}
		redrawUI(p.id);
	}
}



Champion.prototype.getNextSpells = function(prof) {
	
}

Champion.prototype.writeAttackPoints = function(pwr, def) {
	if (typeof pwr !== "undefined" && this.recruitment.recruited) {
		var self = this;
		var p = player[this.recruitment.playerId];
		var x = 0,
			y = 0;
			w = 96;
		switch (this.recruitment.position) {
			case 0:
				x = 96;
				y = 88;
				w = 128;
				break;
			case 1:
				x = 0;
				y = 0;
				break;
			case 2:
				x = 96;
				y = 0;
				break;
			case 3:
				x = 212;
				y = 0;
				break;
		}
		ctx.clearRect((p.ScreenX + x) * scale, (p.ScreenY + y - 10) * scale, w * scale, 8 * scale);
		writeFontImage(String.fromCharCode(this.prof + 3), (p.ScreenX + x + 2), (p.ScreenY + y - 9), CLASS_COLOUR[this.colour]);
		if (typeof def === "undefined" || def === false) {
			if (pwr > 0) {
				writeFontImage(TEXT_HITS_FOR + pwr, (p.ScreenX + x + 10), (p.ScreenY + y - 9), COLOUR[COLOUR_YELLOW]);
			} else {
				writeFontImage(TEXT_MISSES, (p.ScreenX + x + 10), (p.ScreenY + y - 9), COLOUR[COLOUR_YELLOW]);
			}
		} else {
			writeFontImage(TEXT_DEFENDS, (p.ScreenX + x + 10), (p.ScreenY + y - 9), COLOUR[COLOUR_YELLOW]);
		}
		(function(p, x, y, w) {
			setTimeout(function() {
				if(p.messageTimeout === 0 || self.recruitment.position === 0) {
					ctx.clearRect((p.ScreenX + x) * scale, (p.ScreenY + y - 10) * scale, w * scale, 8 * scale);
				}
			}, 1500);
		})(p, x, y, w);
	}
}

Champion.prototype.toString = function() {
	sb = "";
	for (i = 0; i < SPELL_MAX; i++) {
		sb = sb + "" + i + ":[";
		sb = sb + "castSuccesful:" + this.spellBook[i].castSuccessful;
		sb = sb + ", learnt:" + this.spellBook[i].learnt;
		sb = sb + "], ";
	}
	return '[id:' + this.id + ', firstName:' + this.firstName + ', lastName:' + this.lastName + ', prof:' + this.prof + ', colour:' + this.colour + ', level:' + this.level + ', pocket:[' + this.pocket + '], stat:[str:' + this.stat.str + ', agi:' + this.stat.agi + ', int:' + this.stat.int + ', cha:' + this.stat.cha + ', hp:' + this.stat.hp + ', hpMax:' + this.stat.hpMax + ', vit:' + this.stat.vit + ', vitMax:' + this.stat.vitMax + ', hp:' + this.stat.hp + ', sp:' + this.stat.sp + ', spMax:' + this.stat.spMax + ', ac:' + this.stat.ac + ']]';
}

function getChampionClass(id) {
	return id % 4;
}

function getChampionColour(id) {
	return ((id + Math.floor(id / 4)) % 4);
}

function initChampions() {
	champion.length = 0;
	monster[TOWER_CHAMPIONS] = new Array();
	for (ch = 0; ch < CHAMPION_MAX; ch++) {
		var slot = new Array();
		var pk = championPocketData[ch].match(/.{1,2}/g);
		for (i = 0; i < 16; i++) {
			var a = hex2dec(pk[i].substr(0, 2));
			pk[i] = parseInt(a);
		}
		for (i = 0; i < POCKET_GLOVES; i++) {
			if (pk[i] >= 1 && pk[i] < 5) {
				slot[i] = newPocketItem(pk[i], pk[pk[i] + 11]);
			} else {
				slot[i] = newPocketItem(pk[i]);
			}
		}
		slot[POCKET_GLOVES] = newPocketItem();
		var md = championData[ch];
		var level = parseInt(hex2dec(md.substr(0, 2)));
		var str = parseInt(hex2dec(md.substr(2, 2)));
		var agi = parseInt(hex2dec(md.substr(4, 2)));
		var int = parseInt(hex2dec(md.substr(6, 2)));
		var cha = parseInt(hex2dec(md.substr(8, 2)));
		var hp = parseInt(hex2dec(md.substr(10, 2)));
		var hpMax = parseInt(hex2dec(md.substr(12, 2)));
		var vit = parseInt(hex2dec(md.substr(14, 2)));
		var vitMax = parseInt(hex2dec(md.substr(16, 2)));
		var sp = parseInt(hex2dec(md.substr(18, 2)));
		var spMax = parseInt(hex2dec(md.substr(20, 2)));
		var ac = parseInt(hex2dec(md.substr(22, 2)));
		var stat = {
			str: str,
			agi: agi,
			int: int,
			cha: cha,
			hp: hp,
			hpMax: hp,
			vit: vit,
			vitMax: vit,
			sp: sp,
			spMax: sp,
			ac: ac
		};
		var spellBin = hex2bin(md.substr(24, 2));
		var x = parseInt(hex2dec(md.substr(44, 2)));
		var y = parseInt(hex2dec(md.substr(46, 2)));
		var d = parseInt(hex2dec(md.substr(48, 2)));
		var floor = parseInt(hex2dec(md.substr(52, 2)));
		spellBin = spellBin + hex2bin(md.substr(26, 2));
		spellBin = spellBin + hex2bin(md.substr(28, 2));
		spellBin = spellBin + hex2bin(md.substr(30, 2));
		monster[TOWER_CHAMPIONS][ch] = new Monster(ch + monster[TOWER_MOD0].length, level, 3, ch, TOWER_MOD0, floor, x, y, d, 0, 0, ch);
		champion[ch] = new Champion(ch, TEXT_CHAMPION_NAME[ch], TEXT_CHAMPION_LASTNAME[ch], getChampionClass(ch), getChampionColour(ch), level, stat, spellBin, monster[TOWER_CHAMPIONS][ch], slot);
		PrintLog('Loaded champion: ' + champion[ch] + ', as monster: ' + monster[TOWER_CHAMPIONS][ch]);
	}
}

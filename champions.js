function Champion(id, firstName, lastName, prof, colour, level, stat, spellBin, monster, pocketData) {
	this.spellBook = new Array();
	this.pocket = pocketData;
	this.id = id;
	this.recruitment = {
		playerId: -1,
		attached: false,
		position: 0,
		attackTimer: 0
	};
	this.firstName = firstName;
	this.lastName = lastName;
	this.level = level;
	this.prof = prof;
	this.colour = colour;
	this.spellBookPage = 0;
	this.selectedSpell = null;
	this.activeSpell = {
		id: -1,
		timer: 0,
		power: 0
	};
	this.stat = stat;
	this.food = 200;
	this.xp = 0;
	this.xp2 = 0;
	this.spellFatigue = 1.0;
	this.spellUp = 0;
	this.levelUp = 0;
	this.monster = monster;
	for (pg = 0; pg < COLOUR_MAX; pg++) {
		this.spellBook[pg] = new Array();
		var spl = getSpellBookPage(pg);
		for (rw = 0; rw < SPELL_MAX; rw++) {
			this.spellBook[pg][rw] = new Array();
			this.spellBook[pg][rw].learnt = false;
			this.spellBook[pg][rw].castSuccessful = 0;
			this.spellBook[pg][rw].ref = spl[rw];
			this.spellBook[pg][rw].id = spl[rw].index;
			this.spellBook[pg][rw].cost = 2 + spl[rw].level * 2;
			if (spellBin.substr(rw + pg * SPELL_MAX, 1) == '1') {
				this.spellBook[pg][rw].castSuccessful = 5;
				this.addSpellToSpellBook(spl[rw]);
			}
		}
	}
}

Champion.prototype.getName = function(){
    return this.firstName + " " + this.lastName;
};

Champion.prototype.getTrade = function(){    
   return TEXT_TRADE[this.prof];    
};

Champion.prototype.doDamageTo = function(def, dmg, aExh, dExh) {
	if (this.recruitment.playerId > -1) {
		this.writeAttackPoints(dmg);
		redrawUI(this.recruitment.playerId, UI_REDRAW_STATS);
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
	this.stat.hp -= dmg;
	if (typeof safe !== "undefined" && safe) {
		if (this.getHP() <= 0) {
			this.stat.hp = 0;
		}
	} else {
		if (this.getHP() < 0) {
			this.stat.hp = -1;
			this.monster.die();
		}
		if (this.recruitment.playerId > -1 && this.recruitment.attached) {
			if (!player[this.recruitment.playerId].attacking) {
				this.writeAttackPoints(dmg, true);
			}
			player[this.recruitment.playerId].alertDamagedPlayer();
			player[this.recruitment.playerId].checkDead();
			player[this.recruitment.playerId].updateChampions();
			redrawUI(this.recruitment.playerId, UI_REDRAW_STATS);
		}
	}
}

Champion.prototype.getHP = function() {
	return this.stat.hp;
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

Champion.prototype.gainLevel = function() {
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
		//for (l = 0; l < this.levelUp; l++) {
		this.stat.str += Math.floor(Math.random() * stat[prof].str) + 1;
		this.stat.agi += Math.floor(Math.random() * stat[prof].agi) + 1;
		this.stat.int += Math.floor(Math.random() * stat[prof].int) + 1;
		this.stat.cha += Math.floor(Math.random() * stat[prof].cha) + 1;
		this.stat.hpMax += Math.floor(Math.random() * stat[prof].hp) + 1;
		this.stat.vitMax += Math.floor(Math.random() * stat[prof].vit) + 1;
		this.stat.spMax += Math.floor(Math.random() * stat[prof].sp) + 1;
		this.level++;
		//}
		var p = this.recruitment.playerId;
		if (p > -1) {
			player[p].message(this.firstName + TEXT_GAINED_LEVEL, COLOUR[COLOUR_RED]);
		}
		this.levelUp--;
	}
}

Champion.prototype.checkGainSpell = function() {

}

Champion.prototype.restoreStats = function() {
	var alertPlayer = false;
	if (this.recruitment.playerId > -1) {
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
			if (this.recruitment.playerId > -1 && this.id !== CHA_MR_FLAY) {
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
	if (typeof p !== "undefined") {
		if (alertPlayer) {
			p.alertDamagedPlayer();
		}
		redrawUI(p.id, UI_REDRAW_STATS);
	}
}

Champion.prototype.addSpellToSpellBook = function(sp) {
	this.getSpellInBook(sp).learnt = true;
}

Champion.prototype.getUnlearntSpellsByColour = function(cl) {
	var sb = new Array();
	for (pg = 0; pg < COLOUR_MAX; pg++) {
		for (rw = 0; rw < SPELL_MAX; rw++) {
			var sp = this.spellBook[pg][rw];
			if (!sp.learnt && sp.ref.colour === cl) {
				sb.push(sp.ref);
			}
		}
	}
	return sb.sort(function(a, b) {
		return (a.id - b.id);
	});
	return sb;
}

Champion.prototype.getSpellInBook = function(sp) {
	for (pg = 0; pg < COLOUR_MAX; pg++) {
		for (rw = 0; rw < SPELL_MAX; rw++) {
			var sb = this.spellBook[pg][rw];
			if (sb.ref === sp) {
				return sb;
			}
		}
	}
}

Champion.prototype.getSpellInBookById = function(id) {
	for (pg = 0; pg < COLOUR_MAX; pg++) {
		for (rw = 0; rw < SPELL_MAX; rw++) {
			var sb = this.spellBook[pg][rw];
			if (sb.id === id) {
				return sb;
			}
		}
	}
}

Champion.prototype.buySpell = function(sp) {
	if (this.recruitment.playerId > -1) {
		var p = player[this.recruitment.playerId];
		var pk = this.findPocketItem(ITEM_COINAGE);
		if (this.consumePocketItem(pk, p.fairyDetails.spell.cost)) {
			this.addSpellToSpellBook(sp);
			this.spellUp--;
			p.sleep();
		} else {
			p.message(TEXT_PAUPER, COLOUR[COLOUR_GREEN], false, 0);
		}
	}
}

//mainly used for finding coins
Champion.prototype.findPocketItem = function(i) {
	for (ip = 0; ip < this.pocket.length; ip++) {
		if (this.pocket[ip].id === i) {
			return ip;
		}
	}
	return null;
}

//used for arrows and coins
Champion.prototype.consumePocketItem = function(pk, q) {
	var it = this.pocket[pk];
	if (typeof it !== "undefined") {
		if (typeof q === "undefined") {
			q = 1;
		}
		if (it.quantity - q >= 0) {
			it.setPocketItem(it.id, it.quantity - q);
			return true;
		}
	}
	return false;
}

Champion.prototype.writeAttackPoints = function(pwr, def) {
	if (typeof pwr !== "undefined" && this.recruitment.playerId > -1) {
		//var self = this;
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
				//if (p.messageTimeout === 0 || self.recruitment.position === 0) {
					ctx.clearRect((p.ScreenX + x) * scale, (p.ScreenY + y - 10) * scale, w * scale, 8 * scale);
				//}
			}, 1500);
		})(p, x, y, w);
	}
}

Champion.prototype.toString = function() {
	sb = "";
	for (cl = 0; cl < COLOUR_MAX; cl++) {
		sb = sb + "[";
		for (i = 0; i < SPELL_MAX; i++) {
			if (this.spellBook[cl][i].learnt) {
				sb = sb + "1";
			} else {
				sb = sb + "0";
			}
			if (i < SPELL_MAX - 1) {
				sb = sb + ", ";
			}
		}
		sb = sb + "]";
		if (cl < COLOUR_MAX - 1) {
			sb = sb + ", ";
		}
	}
	return '[id:' + this.id + ', firstName:' + this.firstName + ', lastName:' + this.lastName + ', prof:' + this.prof + ', colour:' + this.colour + ', level:' + this.level + ', spellBook:[' + sb + '], stat:[str:' + this.stat.str + ', agi:' + this.stat.agi + ', int:' + this.stat.int + ', cha:' + this.stat.cha + ', hp:' + this.stat.hp + ', hpMax:' + this.stat.hpMax + ', vit:' + this.stat.vit + ', vitMax:' + this.stat.vitMax + ', hp:' + this.stat.hp + ', sp:' + this.stat.sp + ', spMax:' + this.stat.spMax + ', ac:' + this.stat.ac + ']]';
}

Champion.prototype.activateSpell = function(s, pow) {
	this.expireSpell();
	this.activeSpell.id = s;
	this.activeSpell.timer = pow * 5;
	this.activeSpell.power = pow;
	if (this.recruitment.playerId > -1) {
		redrawUI(this.recruitment.playerId);
	}
}

Champion.prototype.checkSpell = function() {
	this.spellFatigue += 0.1;
	if (this.spellFatigue > 1.0) {
		this.spellFatigue = 1.0;
	}
	if (this.activeSpell.id > -1) {
		this.activeSpell.timer--;
		if (this.activeSpell.timer === 0) {
			this.expireSpell();
		}
	}
	var p = this.recruitment.playerId;
	if (p > -1) {
		if (player[p].uiRightPanel.mode === UI_RIGHT_PANEL_SPELLBOOK && player[p].selectedSpell !== null) {
			redrawUI(p, UI_REDRAW_SPELLBOOK);
		}
	}
}

Champion.prototype.expireSpell = function() {
	var p = this.recruitment.playerId;
	this.activeSpell.timer = 0;
	switch(this.activeSpell.id) {
		case SPELL_ARMOUR: break;
		case SPELL_COMPASS: break;
		case SPELL_LEVITATE: player[p].doPit(); break;
		case SPELL_WARPOWER: break;
		case SPELL_ANTIMAGE: break;
		case SPELL_TRUEVIEW: break;
		case SPELL_VANISH: break;
		default: break;
	}
	this.activeSpell.id = -1;
	this.activeSpell.power = 0;
}

//gets active spell, when spell id matches
Champion.prototype.getActiveSpellById = function(id) {
	if (id === this.activeSpell.id) {
		return this.activeSpell;
	}
	return {
		id: -1,
		power: 0,
		timer: 0
	};
}

Champion.prototype.selectSpell = function(id) {
	if (this.spellBook[this.spellBookPage][id].learnt) {
		this.selectedSpell = this.spellBook[this.spellBookPage][id];
		while (this.getSpellCastChance() >= 1.0 && this.selectedSpell.cost > 1.0) {
			this.setSpellCost(false);
		}
	} else {
		this.selectedSpell = null;
	}
	if (this.recruitment.playerId > -1) {
		player[this.recruitment.playerId].showSpellText = false;
	}
}

Champion.prototype.setSpellCost = function(ud) {
	p = this.recruitment.playerId;
	if (p > -1) {
		if (ud) {
			var to = Math.ceil(this.selectedSpell.cost * (1.1 + 0.1 * this.selectedSpell.ref.level));
			if (to < 100) {
				this.selectedSpell.cost = to;
				p.showSpellText = false;
			}
		} else {
			var to = Math.floor(this.selectedSpell.cost / (1.1 + 0.1 * this.selectedSpell.ref.level));
			if (to >= 1) {
				this.selectedSpell.cost = to;
				p.showSpellText = false;
			}
		}
	}
}

Champion.prototype.getSpellCastChance = function() {
	var res = this.getSpellPower();
	//PrintLog("COST: " + res + " f:" + this.spellFatigue);
	if (res > 1.0) {
		return 1.0;
	} else if (res < 0.0) {
		return 0.0;
	}
	return res;
}

Champion.prototype.getSpellPower = function() {
	var res = (this.selectedSpell.castSuccessful * 0.01 - 6.0 / (this.selectedSpell.cost + 6.0) + this.stat.int * 0.01 - (this.selectedSpell.ref.level - 1.0) * 0.2) + this.spellFatigue + (this.level - 1) * 0.1;
	//var res = (this.selectedSpell.castSuccessful * 0.01 - 7.5 / (this.selectedSpell.cost + 6.0) + this.stat.int * 0.02 - (this.selectedSpell.ref.level - 1.0) * 0.4) + this.spellFatigue; /* + (this.level - 1) * 0.1;*/
	PrintLog('pcast:' + this.selectedSpell.castSuccessful + ' scost:' + this.selectedSpell.cost + ' pint:' + this.stat.int + ' slvl:' + this.selectedSpell.ref.level + ' fat:' + this.spellFatigue + ' = res:' + res)
	return res;
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
			spMax: spMax,
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

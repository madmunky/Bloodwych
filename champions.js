function Champion(id, firstName, lastName, level, stat, spellBin, monster) {
	this.spellBook = new Array();
	this.id = id;
	this.recruited = false;
	this.firstName = firstName;
	this.lastName = lastName;
	this.level = level;
	this.stat = stat;
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

Champion.prototype.toString = function() {
	sb = "";
	for (i = 0; i < SPELL_MAX; i++) {
		sb = sb + "" + i + ":[";
		sb = sb + "castSuccesful:" + this.spellBook[i].castSuccessful;
		sb = sb + ", learnt:" + this.spellBook[i].learnt;
		sb = sb + "], ";
	}
	return '[id:' + this.id + ', firstName:' + this.firstName + ', lastName:' + this.lastName + ', level:' + this.level + ', stat:[str:' + this.stat.str + ', agi:' + this.stat.agi + ', int:' + this.stat.int + ', cha:' + this.stat.cha + ', hp:' + this.stat.hp + ', hpMax:' + this.stat.hpMax + ', vit:' + this.stat.vit + ', vitMax:' + this.stat.vitMax + ', hp:' + this.stat.hp + ', sp:' + this.stat.sp + ', spMax:' + this.stat.spMax + ', ac:' + this.stat.ac + '], spellBook:[' + sb + ']]';
}

function getChampionName(id) {
	switch (id) {
		case CHA_BLODWYN:
			return "BLODWYN";
		case CHA_ASTROTH:
			return "ASTROTH";
		case CHA_SIR_EDWARD:
			return "SIR EDWARD";
		case CHA_ULRICH:
			return "ULRICH";
		case CHA_MURLOCK:
			return "MURLOCK";
		case CHA_ZOTHEN:
			return "ZOTHEN";
		case CHA_MEGRIM:
			return "MEGRIM";
		case CHA_ZASTAPH:
			return "ZASTAPH";
		case CHA_ELEANOR:
			return "ELEANOR";
		case CHA_BALDRICK:
			return "BALDRICK";
		case CHA_SETHRA:
			return "SETHRA";
		case CHA_HENGIST:
			return "HENGIST";
		case CHA_ROSANNE:
			return "ROSANNE";
		case CHA_ELFRIC:
			return "ELFRIC";
		case CHA_MR_FLAY:
			return "MR FLAY";
		case CHA_THAI_CHANG:
			return "THAI CHANG";
	}
	return "UNKNOWN";
}

function initChampions() {
	champion.length = 0;
	monster[TOWER_CHAMPIONS] = new Array();
	for (ch = 0; ch < CHAMPION_MAX; ch++) {
		var md = championData[ch];
		var level = hex2dec(md.substr(0, 2));
		var str = hex2dec(md.substr(2, 2));
		var agi = hex2dec(md.substr(4, 2));
		var int = hex2dec(md.substr(6, 2));
		var cha = hex2dec(md.substr(8, 2));
		var hp = hex2dec(md.substr(10, 2));
		var hpMax = hex2dec(md.substr(12, 2));
		var vit = hex2dec(md.substr(14, 2));
		var vitMax = hex2dec(md.substr(16, 2));
		var sp = hex2dec(md.substr(18, 2));
		var spMax = hex2dec(md.substr(20, 2));
		var ac = hex2dec(md.substr(22, 2));
		var stat = {
			str: str,
			agi: agi,
			int: int,
			cha: cha,
			hp: hp,
			hpMax: hpMax,
			vit: vit,
			vitMax: vitMax,
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
		champion[ch] = new Champion(ch, getChampionName(ch), "tester", level, stat, spellBin, monster[TOWER_CHAMPIONS][ch]);
		PrintLog('Loaded champion: ' + monster[TOWER_CHAMPIONS][ch]);
	}
}

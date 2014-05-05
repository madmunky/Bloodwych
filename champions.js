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

function getChampionName(id, full) {
	var name = "UNKNOWN";
	if (typeof full === "undefined") full = false;
	switch (id) {
		case CHA_BLODWYN:
			name = "BLODWYN";
			if (full) name += " STONEMAIDEN";
		case CHA_ASTROTH:
			name = "ASTROTH";
			if (full) name += " SLAEMWORT";
		case CHA_SIR_EDWARD:
			name = "SIR EDWARD";
			if (full) name += " LION";
		case CHA_ULRICH:
			name = "ULRICH";
			if (full) name += " STERNAXE";
		case CHA_MURLOCK:
			return "MURLOCK";
			if (full) name += " DARKENHEART";
		case CHA_ZOTHEN:
			name = "ZOTHEN";
			if (full) name += " RUNECASTER";
		case CHA_MEGRIM:
			name = "MEGRIM";
			if (full) name += " OF MOONWYCH";
		case CHA_ZASTAPH:
			name = "ZASTAPH";
			if (full) name += " MANTRIC";
		case CHA_ELEANOR:
			name = "ELEANOR";
			if (full) name += " OF AVALON";
		case CHA_BALDRICK:
			name = "BALDRICK";
			if (full) name += " THE DUNG";
		case CHA_SETHRA:
			name = "SETHRA";
			if (full) name += " BHOAGHAIL";
		case CHA_HENGIST:
			name = "HENGIST";
			if (full) name += " MELDANASH";
		case CHA_ROSANNE:
			name = "ROSANNE";
			if (full) name += " SWIFTHAND";
		case CHA_ELFRIC:
			name = "ELFRIC";
			if (full) name += " FALAENDOR";
		case CHA_MR_FLAY:
			name = "MR. FLAY";
			if (full) name += " SEPULCRAST";
		case CHA_THAI_CHANG:
			name = "THAI CHANG";
			if (full) name += " OF YINN";
	}
	return name;
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
		PrintLog('Loaded champion: ' + champion[ch] + ', as monster: ' + monster[TOWER_CHAMPIONS][ch]);
	}
}

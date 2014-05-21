function Champion(id, firstName, lastName, prof, colour, level, stat, spellBin, monster) {
	this.spellBook = new Array();
        this.pocket = [0,0,0,0,0,0,0,1,0,0,0,0];
	this.id = id;
	this.recruited = false;
	this.firstName = firstName;
	this.lastName = lastName;
	this.level = level;
	this.prof = prof;
	this.colour = colour;
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

Champion.prototype.doDamageTo = function(def, dmg, exh) {
	this.stat.vit -= exh;
	if(this.stat.vit <= 0) {
		this.stat.vit = 0;
	}
	if(def instanceof Champion) {
		def.getDamage(dmg);
	} else if(def instanceof Monster) {
		def.getDamage(dmg);
	}
}

//Damage is 'safe' when champ doesn't get killed by it (e.g. by lack of vitality)
Champion.prototype.getDamage = function(dmg, safe) {
	this.stat.hp -= dmg;
	if(this.stat.hp <= 0) {
		this.stat.hp = 0;
		if(typeof safe === "undefined" || !safe) {
			this.monster.die();
		}
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
	return '[id:' + this.id + ', firstName:' + this.firstName + ', lastName:' + this.lastName + ', prof:' + this.prof + ', colour:' + this.colour + ', level:' + this.level + ', stat:[str:' + this.stat.str + ', agi:' + this.stat.agi + ', int:' + this.stat.int + ', cha:' + this.stat.cha + ', hp:' + this.stat.hp + ', hpMax:' + this.stat.hpMax + ', vit:' + this.stat.vit + ', vitMax:' + this.stat.vitMax + ', hp:' + this.stat.hp + ', sp:' + this.stat.sp + ', spMax:' + this.stat.spMax + ', ac:' + this.stat.ac + ']]';
}

function getChampionName(id, first) {
	var name = "UNKNOWN";
	if (typeof first === "undefined") first = true;
	switch (id) {
		case CHA_BLODWYN:
			if(first) name = "BLODWYN";
			else name = "STONEMAIDEN";
			break;
		case CHA_ASTROTH:
			if(first) name = "ASTROTH";
			else name = "SLAEMWORT";
			break;
		case CHA_SIR_EDWARD:
			if(first) name = "SIR EDWARD";
			else name = "LION";
			break;
		case CHA_ULRICH:
			if(first) name = "ULRICH";
			else name = "STERNAXE";
			break;
		case CHA_MURLOCK:
			if(first) name = "MURLOCK";
			else name = "DARKENHEART";
			break;
		case CHA_ZOTHEN:
			if(first) name = "ZOTHEN";
			else name = "RUNECASTER";
			break;
		case CHA_MEGRIM:
			if(first) name = "MEGRIM";
			else name = "OF MOONWYCH";
			break;
		case CHA_ZASTAPH:
			if(first) name = "ZASTAPH";
			else name = "MANTRIC";
			break;
		case CHA_ELEANOR:
			if(first) name = "ELEANOR";
			else name = "OF AVALON";
			break;
		case CHA_BALDRICK:
			if(first) name = "BALDRICK";
			else name = "THE DUNG";
			break;
		case CHA_SETHRA:
			if(first) name = "SETHRA";
			else name = "BHOAGHAIL";
			break;
		case CHA_HENGIST:
			if(first) name = "HENGIST";
			else name = "MELDANASH";
			break;
		case CHA_ROSANNE:
			if(first) name = "ROSANNE";
			else name = "SWIFTHAND";
			break;
		case CHA_ELFRIC:
			if(first) name = "ELFRIC";
			else name = "FALAENDOR";
			break;
		case CHA_MR_FLAY:
			if(first) name = "MR. FLAY";
			else name = "SEPULCRAST";
			break;
		case CHA_THAI_CHANG:
			if(first) name = "THAI CHANG";
			else name = "OF YINN";
			break;
		default:
			break;
	}
	return name;
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
		champion[ch] = new Champion(ch, getChampionName(ch, true), getChampionName(ch, false), getChampionClass(ch), getChampionColour(ch), level, stat, spellBin, monster[TOWER_CHAMPIONS][ch]);
		PrintLog('Loaded champion: ' + champion[ch] + ', as monster: ' + monster[TOWER_CHAMPIONS][ch]);
	}
}

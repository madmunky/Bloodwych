var CHA_CHAMPION_MAX = 16;

var	CHA_BLODWYN = 0,
	CHA_ASTROTH = 1,
	CHA_SIR_EDWARD = 2,
	CHA_ULRICH = 3,
	CHA_MURLOCK = 4,
	CHA_ZOTHEN = 5,
	CHA_MEGRIM = 6,
	CHA_ZASTAPH = 7,
	CHA_ELEANOR = 8,
	CHA_BALDRICK = 9,
	CHA_SETHRA = 10,
	CHA_HENGIST = 11,
	CHA_ROSANNE = 12,
	CHA_ELFRIC = 13,
	CHA_MR_FLAY = 14,
	CHA_THAI_CHANG = 15;

var champion = new Array();

function Champion(id) {
	this.spellBook = new Array();
	this.id = id;
	this.recruited = false;
	for(sp = 0; sp < SPELL_MAX; sp++) {
		this.spellBook[sp] = new Array();
		this.spellBook[sp].learnt = false;
		this.spellBook[sp].castSuccessful = 0;
	}
	switch(id) {
		case CHA_BLODWYN:
			this.firstName = 'BLODWYN';
			this.lastName = 'STONEMAIDEN';
			this.stat = { str: 35, agi: 17, int: 13, cha: 13, hp: 35, vit: 31, ac: 5 };
			this.spellBook[SPELL_ARMOUR].learnt = true;
			this.spellBook[SPELL_ARMOUR].castSuccessful = 1;
			break;
		case CHA_ASTROTH:
			this.firstName = 'ASTROTH';
			this.lastName = 'SLAEMWORT';
			this.stat = { str: 34, agi: 21, int: 15, cha: 15, hp: 37, vit: 26, ac: 7 };
			this.spellBook[SPELL_DEFLECT].learnt = true;
			this.spellBook[SPELL_DEFLECT].castSuccessful = 1;
			break;
		case CHA_SIR_EDWARD:
			this.firstName = 'SIR EDWARD';
			this.lastName = 'LION';
			this.stat = { str: 33, agi: 26, int: 14, cha: 13, hp: 32, vit: 28, ac: 8 };
			this.spellBook[SPELL_MISSILE].learnt = true;
			this.spellBook[SPELL_MISSILE].castSuccessful = 1;
			break;
		default: break;
	}
}

Champion.prototype.addSpellToSpellBook = function(spell) {
	this.spellBook[spell].learned = true;
}

function initChampions() {
	champion.length = 0;
	for(ch = 0; ch < CHA_CHAMPION_MAX; ch++) {
		champion[ch] = new Champion(ch);
	}
}
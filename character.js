var	CHAMP_BLODWYN = 0,
	CHAMP_ASTROTH = 1,
	CHAMP_SIR_EDWARD = 2,
	CHAMP_ULRICH = 3,
	CHAMP_MURLOCK = 4,
	CHAMP_ZOTHEN = 5,
	CHAMP_MEGRIM = 6,
	CHAMP_ZASTAPH = 7,
	CHAMP_ELEANOR = 8,
	CHAMP_BALDRICK = 9,
	CHAMP_SETHRA = 10,
	CHAMP_HENGIST = 11,
	CHAMP_ROSANNE = 12,
	CHAMP_ELFRIC = 13,
	CHAMP_MR_FLAY = 14,
	CHAMP_THAI_CHANG = 15;

var SPELL_CLASS_SERPENT = 0,
	SPELL_CLASS_MOON = 1,
	SPELL_CLASS_DRAGON = 2,
	SPELL_CLASS_CHAOS = 3;

//Serpent spells
var SPELL_ARMOUR = 0,
	SPELL_PARALYZE = 1,
	SPELL_COMPASS = 2,
	SPELL_LEVITATE = 3,
	SPELL_WARPOWER = 4,
	SPELL_RENEW = 5,
	SPELL_ARC_BOLT = 6,
	SPELL_FORMWALL = 7;

//Moon spells
var SPELL_BEGUILE = 0,
	SPELL_CONFUSE = 1,
	SPELL_CONCEAL = 2,
	SPELL_TRUEVIEW = 3,
	SPELL_VANISH = 4,
	SPELL_ILLUSION = 5,
	SPELL_MINDROCK = 6,
	SPELL_WYCHWIND = 7;

//Dragon spells
var SPELL_MISSILE = 0,
	SPELL_MAGELOCK = 1,
	SPELL_VITALISE = 2,
	SPELL_DISPELL = 3,
	SPELL_FIREBALL = 4,
	SPELL_FIREPATH = 5,
	SPELL_RECHARGE = 6,
	SPELL_BLAZE = 7;

//Chaos spells
var SPELL_DEFLECT = 0,
	SPELL_TERROR = 1,
	SPELL_ANTIMAGE = 2,
	SPELL_SPELLTAP = 3,
	SPELL_ALCHEMY = 4,
	SPELL_SUMMON = 5,
	SPELL_VIVIFY = 6,
	SPELL_DISRUPT = 7;

var STAT_STR = 0,
	STAT_AGL = 1,
	STAT_INT = 2,
	STAT_CHA = 3,
	STAT_HP = 4,
	STAT_VIT = 5,
	STAT_AC = 6;

var champion = new Array();

function Character(body, str, agi, int, cha, hp, vit, ac, spellBook) {
	var stat = new Array();
	this.str = str;
	this.agi = agi;
	this.int = int;
	this.cha = cha;
	this.hpMax = hp;
	this.hp = hp;
	this.vitMax = vit;
	this.vit = vit;
	this.manaMax = '100';
	this.mana = '100';
	this.ac = ac;
	this.spellBook = spellBook;
}

Champion.prototype = new Character();
Champion.prototype.constructor = Champion;
function Champion(chr) {
	var stat = {};
	var spellBook = new Array();
	bodyID = chr;
	for(sc = 0; sc < 4; sc++) {
		spellBook[sc] = new Array();
		for(sp = 0; sp < 8; sp++) {
			spellBook[sc][sp] = false;
		}
	}
	switch(chr) {
		case CHAMP_BLODWYN:
			this.firstName = 'BLODWYN';
			this.lastName = 'STONEMAIDEN';
			stat = { str: 35, agi: 17, int: 13, cha: 13, hp: 35, vit: 31, ac: 5 };
			spellBook[SPELL_CLASS_SERPENT][SPELL_ARMOUR] = true;
			break;
		case CHAMP_ASTROTH:
			this.firstName = 'ASTROTH';
			this.lastName = 'SLAEMWORT';
			stat = { str: 34, agi: 21, int: 15, cha: 15, hp: 37, vit: 26, ac: 7 };
			spellBook[SPELL_CLASS_CHAOS][SPELL_DEFLECT] = true;
			break;
		default: break;
	}
	if(typeof stat !== 'undefined') {
		Character.call(this, bodyID, stat.str, stat.agi, stat.int, stat.cha, stat.hp, stat.vit, stat.ac, spellBook);
	}
}

function initChampions() {
	for(ch = 0; ch < 16; ch++) {
		champion[ch] = new Champion(ch);
	}
}
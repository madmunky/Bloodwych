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

var MON_SPIDER = 16,
	MON_CRAB = 17;

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

Monster.prototype = new Character();
Monster.prototype.constructor = Monster;
function Monster(id, colourHead, colourBody, colourArms, colourLegs) {

}

Champion.prototype = new Character();
Champion.prototype.constructor = Champion;
function Champion(id) {
	var stat = {};
	var spellBook = new Array();
	this.id = id;
	this.recruited = false;
	for(sc = 0; sc < 4; sc++) {
		spellBook[sc] = new Array();
		for(sp = 0; sp < 8; sp++) {
			spellBook[sc][sp] = false;
		}
	}
	switch(id) {
		case CHA_BLODWYN:
			this.firstName = 'BLODWYN';
			this.lastName = 'STONEMAIDEN';
			stat = { str: 35, agi: 17, int: 13, cha: 13, hp: 35, vit: 31, ac: 5 };
			spellBook[SPELL_CLASS_SERPENT][SPELL_ARMOUR] = true;
			break;
		case CHA_ASTROTH:
			this.firstName = 'ASTROTH';
			this.lastName = 'SLAEMWORT';
			stat = { str: 34, agi: 21, int: 15, cha: 15, hp: 37, vit: 26, ac: 7 };
			spellBook[SPELL_CLASS_CHAOS][SPELL_DEFLECT] = true;
			break;
		case CHA_SIR_EDWARD:
			this.firstName = 'SIR EDWARD';
			this.lastName = 'LION';
			stat = { str: 33, agi: 26, int: 14, cha: 13, hp: 32, vit: 28, ac: 8 };
			spellBook[SPELL_CLASS_DRAGON][SPELL_MISSILE] = true;
			break;
		default: break;
	}
	if(typeof stat !== 'undefined') {
		Character.call(this, id, stat.str, stat.agi, stat.int, stat.cha, stat.hp, stat.vit, stat.ac, spellBook);
	}
}

function initChampions() {
	for(ch = 0; ch < 16; ch++) {
		champion[ch] = new Champion(ch);
	}
}
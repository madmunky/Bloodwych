var SPELL_MAX = 32;

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
var SPELL_BEGUILE = 8,
	SPELL_CONFUSE = 9,
	SPELL_CONCEAL = 10,
	SPELL_TRUEVIEW = 11,
	SPELL_VANISH = 12,
	SPELL_ILLUSION = 13,
	SPELL_MINDROCK = 14,
	SPELL_WYCHWIND = 15;

//Dragon spells
var SPELL_MISSILE = 16,
	SPELL_MAGELOCK = 17,
	SPELL_VITALISE = 18,
	SPELL_DISPELL = 19,
	SPELL_FIREBALL = 20,
	SPELL_FIREPATH = 21,
	SPELL_RECHARGE = 22,
	SPELL_BLAZE = 23;

//Chaos spells
var SPELL_DEFLECT = 24,
	SPELL_TERROR = 25,
	SPELL_ANTIMAGE = 26,
	SPELL_SPELLTAP = 27,
	SPELL_ALCHEMY = 28,
	SPELL_SUMMON = 29,
	SPELL_VIVIFY = 30,
	SPELL_DISRUPT = 31;

var spell = new Array();

function Spell(id) {
	this.name = '';
	this.level = 1;
	this.class = CLASS_SERP;
	this.description = '';
	switch(id) {
		case SPELL_ARMOUR: 	stat = { name: 'Armour', level: 1, class: CLASS_SERP, description: 'Wear this spell with pride.' }; break;
		case SPELL_DEFLECT:     stat = { name: 'Deflect', level: 1, class: CLASS_CHAOS, description: 'A spell a day keeps an arrow away.' }; break;
		case SPELL_ARMOUR: 	stat = { name: 'Missile', level: 1, class: CLASS_DRAG, description: 'One in the eye for Archers.' }; break;
		default: break;
	}
	if(typeof stat !== 'undefined') {
		this.name = stat.name;
		this.level = stat.level;
		this.class = stat.class;
		this.description = stat.description;
	}
}

Spell.prototype.cost = this.level * 5;

function initSpells() {
	for(sp = 0; sp < SPELL_MAX; sp++) {
		spell[sp] = new Spell(sp);
	}
}
var spell = new Array();

function Spell(id, name, description, prof, level, cost) {
	this.name = name;
	this.level = level;
	this.prof = prof;
	this.description = description;
	//switch(id) {
	//	case SPELL_ARMOUR: 	stat = { name: 'Armour', level: 1, class: CLASS_SERP, description: 'Wear this spell with pride.' }; break;
	//	case SPELL_DEFLECT:     stat = { name: 'Deflect', level: 1, class: CLASS_CHAOS, description: 'A spell a day keeps an arrow away.' }; break;
	//	case SPELL_ARMOUR: 	stat = { name: 'Missile', level: 1, class: CLASS_DRAG, description: 'One in the eye for Archers.' }; break;
	//	default: break;
	//}
}

Spell.prototype.cost = this.level * 5;

function initSpells() {
	for(sp = 0; sp < SPELL_MAX; sp++) {
		spell[sp] = new Spell(sp);
	}
}
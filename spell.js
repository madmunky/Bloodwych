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

function reviveChampOnGround(f, x, y, d) {
	if(getMonsterAt(f, x, y) === null) {
		for (i = item[towerThis].length - 1; i >= 0; i--) {
			var it = item[towerThis][i];
			if(it.id >= ITEM_BLODWYN_RIP && it.id <= ITEM_THAI_CHANG_RIP && it.location.tower === towerThis && it.location.floor === f && it.location.x === x && it.location.y === y) {
				var ch = it.id - ITEM_BLODWYN_RIP;
				item[towerThis].splice(i, 1);
				champion[ch].stat.hp = 0;
				champion[ch].monster.floor = f;
				champion[ch].monster.x = x;
				champion[ch].monster.y = y;
				champion[ch].monster.d = d;
				champion[ch].monster.hp = 0;
				champion[ch].monster.dead = false;
				if(champion[ch].recruitment.recruited && !champion[ch].recruitment.attached && champion[ch].recruitment.playerId > -1) {
					var p = player[champion[ch].recruitment.playerId];
					if(p.dead) {
						champion[ch].recruitment.attached = true;
						var i = p.getChampionPosition(ch);
						p.exchangeChampionPosition(0, i);
						p.championLeader = 0;
						p.tower = towerThis;
						p.floor = f;
						p.x = x;
						p.y = y
						p.d = d;
						p.dead = false;
						p.updateChampions();
						redrawUI(p.id);
					}
				}
				return true;
			}
		}
	}
	return false;
}
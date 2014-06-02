function Spell(id, name, description, prof, level) {
	this.name = name;
	this.level = level;
	this.prof = prof;
	this.description = description;
	this.cost = this.level * 5;
}

function initSpells() {
	for(id = 0; id < SPELL_MAX; id++) {
		var name = "";
		var description = "";
		var prof = Math.floor(id / 8);
		var level = id % 8;
		spell[id] = new Spell(id, name, description, prof, level);
	}
}

function castSpell(s, src) {
	var f = src.f;
	var x = src.x;
	var y = src.y;
	var d = src.d;
	switch(s) {
		case SPELL_VIVIFY:
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
					champion[ch].monster.d = (d + 2) % 4;
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
							p.d = (d + 2) % 4;
							p.dead = false;
							p.updateChampions();
							redrawUI(p.id);
						}
					}
					return;
				}
			}
		}
		break;
		default:
		break;
	}
}
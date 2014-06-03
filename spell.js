function Spell(colour, id, name, description, level) {
	this.colour = colour;
	this.id = id;
	this.name = name;
	this.description = description;
	this.level = level;
	this.cost = this.level * 5;
}

Spell.prototype.toString = function() {
	return '[colour:' + this.colour + ', id:' + this.id + ', name:' + this.name + ', description:' + this.description + ', level:' + this.level + ', cost:' + this.cost + ']';
}

function initSpells() {
	for(cl = 0; cl < COLOUR_MAX; cl++) {
		spell[cl] = new Array();
		for (id = 0; id < SPELL_MAX; id++) {
			var l = [0, 1, 1, 2, 2, 3]
			var name = TEXT_SPELL_NAME[id + cl * 8];
			var description = TEXT_SPELL_DESCRIPTION[id + cl * 8];
			var level = getSpellLevel(cl, id);
			spell[cl][id] = new Spell(cl, id, name, description, level);
			PrintLog('Loaded spell: ' + spell[cl][id]);
		}
	}
}

function getSpellLevel(p, i) {
	var c = [
		[1, 2, 2, 2, 3, 3, 4, 5],
		[1, 2, 2, 3, 3, 4, 4, 7],
		[1, 2, 2, 3, 3, 4, 5, 6],
		[1, 2, 4, 5, 5, 6, 7, 8]
	];
	return c[p][i];
}

function castSpell(s, src) {
	var f = src.f;
	var x = src.x;
	var y = src.y;
	var d = src.d;
	switch (s) {
		case SPELL_VIVIFY:
			if (getMonsterAt(f, x, y) === null) {
				for (i = item[towerThis].length - 1; i >= 0; i--) {
					var it = item[towerThis][i];
					if (it.id >= ITEM_BLODWYN_RIP && it.id <= ITEM_THAI_CHANG_RIP && it.location.tower === towerThis && it.location.floor === f && it.location.x === x && it.location.y === y) {
						var ch = it.id - ITEM_BLODWYN_RIP;
						item[towerThis].splice(i, 1);
						champion[ch].stat.hp = 0;
						champion[ch].monster.floor = f;
						champion[ch].monster.x = x;
						champion[ch].monster.y = y;
						champion[ch].monster.d = (d + 2) % 4;
						champion[ch].monster.hp = 0;
						champion[ch].monster.dead = false;
						if (champion[ch].recruitment.recruited && !champion[ch].recruitment.attached && champion[ch].recruitment.playerId > -1) {
							var p = player[champion[ch].recruitment.playerId];
							if (p.dead) {
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

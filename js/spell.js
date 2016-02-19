function Spell(colour, id, name, description, symbols, level) {
	this.colour = colour;
	this.id = id;
	this.index = id + colour * 8;
	this.name = name;
	this.description = description;
	this.symbols = symbols;
	this.level = level;
	this.cost = this.level * 5;
	var pr = getSpellPageAndRow(colour, id);
	this.page = pr.page;
	this.row = pr.row;
	this.power = getSpellPower(this.index);
}

Spell.prototype.toString = function() {
	return '[colour:' + this.colour + ', id:' + this.id + ', name:' + this.name + ', description:' + this.description + ', level:' + this.level + ', cost:' + this.cost + ']';
}

function initSpells() {
	for(var cl = 0; cl < SPELL_COLOUR_MAX; cl++) {
		spell[cl] = new Array();
		for(var id = 0; id < SPELL_LEVEL_MAX; id++) {
			//var l = [0, 1, 1, 2, 2, 3];
			var name = TEXT_SPELL_NAME[id + cl * SPELL_LEVEL_MAX];
			var description = TEXT_SPELL_DESCRIPTION[id + cl * SPELL_LEVEL_MAX];
			var symbols = TEXT_SPELL_BOOK[id + cl * SPELL_LEVEL_MAX];
			var level = getSpellLevel(cl, id);
			spell[cl][id] = new Spell(cl, id, name, description, symbols, level);
			//PrintLog(spell[cl][id], false);
		}
	}
}

function getSpellLevel(c, i) {
	var sl = [
		[1, 2, 2, 2, 3, 3, 4, 5],
		[1, 2, 4, 5, 5, 6, 7, 8],
		[1, 2, 2, 3, 3, 4, 5, 6],
		[1, 2, 2, 3, 3, 4, 4, 7],
		[6, 7, 7, 8, 8, 10, 12, 18]
	];
	return sl[c][i];
}

/*
"ARMOUR",		"ARMOUR",	
"TERROR",		"PARALYZE",
"VITALISE",		"COMPASS",
"BEGUILE",		"LEVITATE",
"DEFLECT",		"WARPOWER",
"MAGELOCK",		"RENEW",
"CONCEAL",		"ARC BOLT",
"WARPOWER",		"FORMWALL",

"MISSILE",		"BEGUILE",
"VANISH",		"CONFUSE",
"PARALYZE",		"CONCEAL",
"ALCHEMY",		"TRUEVIEW",
"CONFUSE",		"VANISH",
"LEVITATE",		"ILLUSION",
"ANTIMAGE",		"MINDROCK",
"RECHARGE",		"WYCHWIND",

"TRUEVIEW",		"MISSILE",
"RENEW",		"MAGELOCK",
"VIVIFY",		"VITALISE",
"DISPELL",		"DISPELL",
"FIREPATH",		"FIREBALL",
"ILLUSION",		"FIREPATH",
"COMPASS",		"RECHARGE",
"SPELLTAP",		"BLAZE",

"DISRUPT",		"DEFLECT",
"FIREBALL",		"TERROR",
"WYCHWIND",		"ANTIMAGE",
"ARC BOLT",		"SPELLTAP",
"FORMWALL",		"ALCHEMY",
"SUMMON",		"SUMMON",
"BLAZE",		"VIVIFY",
"MINDROCK"		"DISRUPT"
*/

function getSpellPageAndRow(c, i) {
	var sp = [
		[0, 1, 2, 1, 0, 2, 3, 3],
		[0, 0, 1, 2, 1, 3, 2, 3],
		[1, 0, 0, 2, 3, 2, 1, 3],
		[0, 1, 0, 2, 1, 2, 3, 3],
		[4, 4, 4, 4, 4, 4, 4, 4]
	];
	var sr = [
		[0, 2, 6, 5, 7, 1, 3, 4],
		[4, 1, 6, 7, 3, 5, 2, 0],
		[0, 5, 2, 3, 1, 4, 7, 6],
		[3, 4, 6, 0, 1, 5, 7, 2],
		[0, 1, 2, 3, 4, 5, 6, 7]
	];
	return {
		page: sp[c][i],
		row: sr[c][i]
	};
}

function getSpellById(id) {
	if (id > -1) {
		var cl = Math.floor(id / 8);
		var s = id % 8;
		if (typeof spell[cl] !== "undefined" && typeof spell[cl][s] !== "undefined") {
			return spell[cl][s];
		}
	}
	return null;
}

function getSpellBookPage(p) {
	var sb = new Array();
	for(var cl = 0; cl < SPELL_COLOUR_MAX; cl++) {
		for(var id = 0; id < SPELL_LEVEL_MAX; id++) {
			var sp = spell[cl][id];
			if (sp.page === p) {
				sb.push(sp);
			}
		}
	}
	return sb.sort(function(a, b) {
		return (a.row - b.row);
	});
}

function getSpellPower(id) {
	switch (id) {
		case SPELL_ARMOUR:
			return 1;
		case SPELL_PARALYZE:
			return 4;
		case SPELL_COMPASS:
			return 2;
		case SPELL_LEVITATE:
			return 2;
		case SPELL_WARPOWER:
			return 1;
		case SPELL_RENEW:
			return 1;
		case SPELL_ARC_BOLT:
			return 2;
		case SPELL_FORMWALL:
			return 1;

			//chaos
		case SPELL_DEFLECT:
			return 1;
		case SPELL_TERROR:
			return 1;
		case SPELL_ANTIMAGE:
			return 1;
		case SPELL_SPELLTAP:
			return 1;
		case SPELL_ALCHEMY:
			return 1;
		case SPELL_SUMMON:
			return 1;
		case SPELL_VIVIFY:
			return 1;
		case SPELL_DISRUPT:
			return 4;

			//dragon
		case SPELL_MISSILE:
			return 2;
		case SPELL_MAGELOCK:
			return 1;
		case SPELL_VITALISE:
			return 1;
		case SPELL_DISPELL:
			return 1;
		case SPELL_FIREBALL:
			return 2;
		case SPELL_FIREPATH:
			return 2;
		case SPELL_RECHARGE:
			return 1;
		case SPELL_BLAZE:
			return 2;

			//moon
		case SPELL_BEGUILE:
			return 2;
		case SPELL_CONFUSE:
			return 1;
		case SPELL_CONCEAL:
			return 1;
		case SPELL_TRUEVIEW:
			return 1;
		case SPELL_VANISH:
			return 1;
		case SPELL_ILLUSION:
			return 1;
		case SPELL_MINDROCK:
			return 1;
		case SPELL_WYCHWIND:
			return 2;

			//ancient
		case SPELL_PROTECT:
			return 1;
		case SPELL_PHASE:
			return 1;
		case SPELL_ENHANCE:
			return 1;
		case SPELL_INFERNO:
			return 2;
		case SPELL_NULLIFY:
			return 1;
		case SPELL_SPRAY:
			return 4;
		case SPELL_VORTEX:
			return 2;
		case SPELL_RESTORE:
			return 1;

		default:
			return 1;
	}
}

function castSpell(s, src, pw) {
	var sp = getSpellById(s);
	var pow = (Math.random() * pw * 0.25) + pw;
	pow = Math.ceil(pow * sp.power);
	var f = src.floor;
	var x = src.x;
	var y = src.y;
	var d = src.d;
	var xy = getOffsetByRotation(d);
	var x1 = x + xy.x;
	var y1 = y + xy.y;
	if (src.champId > -1) {
		var ch = champion[src.champId];
		PrintLog('SPELLPOWER: ' + pow + ' ' + sp.power);
	}
	switch (s) {
		//serpent
		case SPELL_ARMOUR:
			ch.activateSpell(s, pow);
			break;
		case SPELL_PARALYZE:
			newProjectile(DUNGEON_PROJECTILE_ARROW, paletteData['SERPENT_ARROW'], SOUND_FLASH, s, pow, f, x, y, d, src);
			break;
		case SPELL_COMPASS:
			ch.activateSpell(s, pow);
			break;
		case SPELL_LEVITATE:
			ch.activateSpell(s, pow);
			break;
		case SPELL_WARPOWER:
			ch.activateSpell(s, pow);
			break;
		case SPELL_RENEW:
			if(ch.recruitment.playerId > -1) {
				var pl = player[ch.recruitment.playerId];
				var chs = pl.getOrderedChampions();
				for(var c in chs) {
					if(chs[c].recruitment.attached) {
						chs[c].addHP(pow);
					}
				}
			}
			break;
		case SPELL_ARC_BOLT:
			newProjectile(DUNGEON_PROJECTILE_BIG, paletteData['SERPENT_BIG'], SOUND_EXPLODE, s, pow, f, x, y, d, src);
			break;
		case SPELL_FORMWALL:
			if (src.getBinaryView(15, 0, 16) === '0000') {
				src.setBinaryView(15, 13, 3, '7');
				src.setBinaryView(15, 6, 2, '3');
				src.setBinaryView(15, 0, 6, dec2hex(pow));
				var xy = posToCoordinates(15, x, y, d);
				setDungeonSpell(f, xy.x, xy.y);
			}
			break;

			//chaos
		case SPELL_DEFLECT:
			ch.activateSpell(s, pow);
			break;
		case SPELL_TERROR:
			newProjectile(DUNGEON_PROJECTILE_ARROW, paletteData['CHAOS_ARROW'], SOUND_FLASH, s, pow, f, x, y, d, src);
			break;
		case SPELL_ANTIMAGE:
			ch.activateSpell(s, pow);
			break;
		case SPELL_SPELLTAP:
			newProjectile(DUNGEON_PROJECTILE_ARROW, paletteData['GOLD_ARROW'], SOUND_FLASH, s, pow, f, x, y, d, src);
			break;
		case SPELL_ALCHEMY:
			var validItems = ['ITEM_TYPE_WEAPON', 'ITEM_TYPE_ARMOUR', 'ITEM_TYPE_SHIELD', 'ITEM_TYPE_GLOVES'];
			if(validItems.indexOf(ch.pocket[POCKET_LEFT_HAND].type) > -1) {
				ch.pocket[POCKET_LEFT_HAND].setPocketItem('ITEM_COINAGE', pow);
			} else if(validItems.indexOf(ch.pocket[POCKET_RIGHT_HAND].type) > -1) {
				ch.pocket[POCKET_RIGHT_HAND].setPocketItem('ITEM_COINAGE', pow);
			}
			break;
		case SPELL_SUMMON:
			var ob = canMove(f, x, y, d);
			if (ob === OBJECT_CHARACTER || ob === OBJECT_PROJECTILE || ob === OBJECT_MISC || ob === OBJECT_STAIRS || ob === OBJECT_DOOR) {
				castSpell(SPELL_FIREBALL, src, pw);
			} else if (ob === OBJECT_NONE) {
				var max = monster[towerThis].length;
				monster[towerThis][max] = new Monster(null, Math.floor(pow * 0.2) - 10, MON_TYPE_DRONE, MON_FORM_SUMMON, towerThis, f, x1, y1, d, (d + Math.floor(Math.random() * 2) + 2) % 4, 0);
				monster[towerThis][max].doGesture(CHA_GESTURE_SPELLCASTING);
			}
			break;
		case SPELL_VIVIFY:
			newProjectile(DUNGEON_PROJECTILE_ARROW, paletteData['CHAOS'], SOUND_FLASH, s, 0, f, x, y, d, src);
			for(var p in player) {
				var pl = player[p];
				if (!pl.dead && f === pl.floor && x === pl.x && y === pl.y) {
					for(var c = 0; c < pl.champion.length; c++) {
						var ch1 = pl.getChampion(c);
						if(ch1 !== null && ch1.getMonster().dead && ch1.recruitment.attached) {
							ch1.stat.hp = 0;
							ch1.getMonster().dead = false;
							redrawUI(2);
						}
					}
					pl.updateChampions();
					break;
				}
			}
			break;
		case SPELL_DISRUPT:
			newProjectile(DUNGEON_PROJECTILE_BIG, paletteData['DISRUPT_BIG'], SOUND_EXPLODE, s, pow, f, x, y, d, src);
			break;

			//dragon
		case SPELL_MISSILE:
			newProjectile(DUNGEON_PROJECTILE_ARROW, paletteData['DRAGON_ARROW'], SOUND_ATTACK, s, pow, f, x, y, d, src);
			break;
		case SPELL_MAGELOCK:
			if (src.getBinaryView(18, 13, 3) === '2' && src.getBinaryView(18, ((5 + 2 - d) % 4) * 2) === '1') {
				src.setBinaryView(18, 11, 1);
			} else if (src.getBinaryView(15, 13, 3) === '2' && src.getBinaryView(15, ((5 + 0 - d) % 4) * 2) === '1') {
				src.setBinaryView(15, 11, 1);
			} else if (src.getBinaryView(15, 13, 3) === '5' && src.getBinaryView(15, 4) === '0') {
				src.setBinaryView(15, 11, 1);
			}
			break;
		case SPELL_VITALISE:
			if(ch.recruitment.playerId > -1) {
				var pl = player[ch.recruitment.playerId];
				var chs = pl.getOrderedChampions();
				for(var c in chs) {
					if(chs[c].recruitment.attached) {
						chs[c].addVit(pow);
					}
				}
			}
			break;
		case SPELL_DISPELL:
			if(src.setBinaryView(15, 12, 1) === '1') {
				src.setBinaryView(15, 12, 1, '0');
			}
			if (src.getBinaryView(15, 13, 3) === '7') {
				src.setBinaryView(15, 0, 16, '0000');
				deleteDungeonSpell(f, x1, y1);
			}
			break;
		case SPELL_FIREBALL:
			newProjectile(DUNGEON_PROJECTILE_BIG, paletteData['DRAGON_BIG'], SOUND_EXPLODE, s, pow, f, x, y, d, src);
			break;
		case SPELL_FIREPATH:
			newProjectile(DUNGEON_PROJECTILE_ARROW, paletteData['DRAGON_ARROW'], SOUND_ATTACK, s, pow, f, x, y, d, src);
			break;
		case SPELL_RECHARGE:
			if(ch.recruitment.playerId > -1) {
				var it = ch.getEquippedItems();
	            for(var i = 0; i < it.length; i++) {
	            	var qm = getObjectByKeys(itemJson[it[i].id], 'quantity');
	            	if(typeof qm !== "undefined" && qm > 1 && it[i].quantity < qm) {
	            		var q = it[i].quantity + Math.ceil(pow * 0.02);
	            		if(q > qm) {
	            			q = qm;
	            		}
	            		it[i].setQuantity(q);
	            	}
	            }
	        }
			break;
		case SPELL_BLAZE:
			newProjectile(DUNGEON_PROJECTILE_BIG, paletteData['BLAZE_BIG'], SOUND_EXPLODE, s, pow, f, x, y, d, src);
			break;

			//moon
		case SPELL_BEGUILE:
			break;
		case SPELL_CONFUSE:
			newProjectile(DUNGEON_PROJECTILE_ARROW, paletteData['MOON_ARROW'], SOUND_FLASH, s, pow, f, x, y, d, src);
			break;
		case SPELL_CONCEAL:
			src.setBinaryView(15, 12, 1);
			break;
		case SPELL_TRUEVIEW:
			ch.activateSpell(s, pow);
			break;
		case SPELL_VANISH:
			ch.activateSpell(s, pow);
			break;
		case SPELL_ILLUSION:
			var ob = canMove(f, x, y, d);
			if (ob === OBJECT_CHARACTER || ob === OBJECT_PROJECTILE || ob === OBJECT_MISC || ob === OBJECT_STAIRS || ob === OBJECT_DOOR) {
				castSpell(SPELL_FIREBALL, src, pw);
			} else if (ob === OBJECT_NONE) {
				var max = monster[towerThis].length;
				monster[towerThis][max] = new Monster(null, Math.floor(pow * 0.2) - 10, MON_TYPE_DRONE_CASTER, MON_FORM_ILLUSION, towerThis, f, x1, y1, d, (d + Math.floor(Math.random() * 2) + 2) % 4, 0);
				monster[towerThis][max].hp = 0;
				monster[towerThis][max].doGesture(CHA_GESTURE_SPELLCASTING);
			}
			break;
		case SPELL_MINDROCK:
			if (src.getBinaryView(15, 0, 16) === '0000') {
				src.setBinaryView(15, 13, 3, '7');
				src.setBinaryView(15, 6, 2, '2');
				src.setBinaryView(15, 0, 6, dec2hex(pow));
			}
			break;
		case SPELL_WYCHWIND:
			newProjectile(DUNGEON_PROJECTILE_BIG, paletteData['MOON_BIG'], SOUND_EXPLODE, s, pow, f, x - xy.y, y - xy.x, d, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, paletteData['MOON_BIG'], SOUND_EXPLODE, s, pow, f, x, y, d, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, paletteData['MOON_BIG'], SOUND_EXPLODE, s, pow, f, x + xy.y, y + xy.x, d, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, paletteData['MOON_BIG'], SOUND_EXPLODE, s, pow, f, x + xy.y, y + xy.x, (d + 2) % 4, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, paletteData['MOON_BIG'], SOUND_EXPLODE, s, pow, f, x, y, (d + 2) % 4, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, paletteData['MOON_BIG'], SOUND_EXPLODE, s, pow, f, x - xy.y, y - xy.x, (d + 2) % 4, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, paletteData['MOON_BIG'], SOUND_EXPLODE, s, pow, f, x, y, (d + 1) % 4, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, paletteData['MOON_BIG'], SOUND_EXPLODE, s, pow, f, x, y, (d + 3) % 4, src);
			break;

			//ancient
		case SPELL_PROTECT:
			ch.activateSpell(s, pow);
			break; 
		case SPELL_PHASE:
			var pl = player[ch.recruitment.playerId];
			var ob = canMove(f, x, y, d, DIRECTION_NORTH);
			var ob2 = canMove(f, x1, y1, d, DIRECTION_NORTH);
			var x2 = x;
			var y2 = y;
			if(ob <= OBJECT_PROJECTILE && ob2 <= OBJECT_PIT) {
				x2 = x2 + xy.x * 2;
				y2 = y2 + xy.y * 2;
				pl.setPlayerPosition(f, x2, y2);
			}
			newProjectile(DUNGEON_NONE, paletteData['TELEPORT_FLASH'], SOUND_FLASH, -1, 0, f, x2, y2, d, null);
			break; 
		case SPELL_ENHANCE:
			ch.activateSpell(s, pow);
			break; 
		case SPELL_INFERNO:
			newProjectile(DUNGEON_PROJECTILE_BIG, paletteData['BLAZE_BIG'], SOUND_EXPLODE, s, pow, f, x, y, d, src);
			break; 
		case SPELL_NULLIFY:
			newProjectile(DUNGEON_PROJECTILE_ARROW, paletteData['DRAGON_ARROW'], SOUND_FLASH, s, pow, f, x, y, d, src);
			break;
		case SPELL_SPRAY:
			newProjectile(DUNGEON_PROJECTILE_BIG, paletteData['DISRUPT_BIG'], SOUND_EXPLODE, s, pow, f, x - xy.y, y - xy.x, d, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, paletteData['DISRUPT_BIG'], SOUND_EXPLODE, s, pow, f, x, y, d, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, paletteData['DISRUPT_BIG'], SOUND_EXPLODE, s, pow, f, x + xy.y, y + xy.x, d, src);
			break; 
		case SPELL_VORTEX:
			break; 
		case SPELL_RESTORE:
			break; 
		default:
			break;
	}
}

function setDungeonSpell(f, x, y, proj) {
	var max = dungeonSpellList.length;
	if(typeof proj === "undefined") {
		proj = null;
	}
	dungeonSpellList[max] = {
		tower: towerThis,
		floor: f,
		x: x,
		y: y,
		projectile: proj,
		projectileId: proj.id
	};
}

function getDungeonSpell(f, x, y) {
	for(var d in dungeonSpellList) {
		ds = dungeonSpellList[d];
		if(ds.tower === towerThis && ds.floor === f && ds.x === x && ds.y === y) {
			return ds;
		}
	}
	return null;
}

function deleteDungeonSpell(f, x, y) {
	for(var d in dungeonSpellList) {
		ds = dungeonSpellList[d];
		if(ds.tower === towerThis && ds.floor === f && ds.x === x && ds.y === y) {
			delete dungeonSpellList[d];
		}
	}
	return null;
}

function updateDungeonSpells() {
	for(var s in dungeonSpellList) {
		var ds = dungeonSpellList[s];
		if (ds.tower === towerThis) {
			if(ds.projectile !== null && typeof ds.projectile.spell !== 'number' && (ds.projectile.spell.index === SPELL_FIREPATH || ds.projectile.spell.index === SPELL_BLAZE || ds.projectile.spell.index === SPELL_INFERNO)) {
				for(var p in player) {
					if (ds.floor === player[p].floor && ds.x === player[p].x && ds.y === player[p].y) {
						ds.projectile.attack(player[p]);
					}
				}
				var mon = getMonsterAt(ds.floor, ds.x, ds.y);
				if (mon !== null) {
					ds.projectile.attack(mon);
				}
			}
			var hex = tower[ds.tower].floor[ds.floor].Map[ds.y][ds.x];
			var tm = parseInt(hex2dec(getHexToBinaryPosition(hex, 0, 6)) - 1);
			if (tm > 0) {
				tower[ds.tower].floor[ds.floor].Map[ds.y][ds.x] = setHexToBinaryPosition(hex, 0, 6, dec2hex(tm));
			} else {
				tower[ds.tower].floor[ds.floor].Map[ds.y][ds.x] = setHexToBinaryPosition(hex, 0, 16, '0000');
				delete dungeonSpellList[s];
			}
		}
	}
}

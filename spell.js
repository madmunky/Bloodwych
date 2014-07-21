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
	for (cl = 0; cl < COLOUR_MAX; cl++) {
		spell[cl] = new Array();
		for (id = 0; id < SPELL_MAX; id++) {
			var l = [0, 1, 1, 2, 2, 3];
			var name = TEXT_SPELL_NAME[id + cl * SPELL_MAX];
			var description = TEXT_SPELL_DESCRIPTION[id + cl * SPELL_MAX];
			var symbols = TEXT_SPELL_BOOK[id + cl * SPELL_MAX];
			var level = getSpellLevel(cl, id);
			spell[cl][id] = new Spell(cl, id, name, description, symbols, level);
			PrintLog('Loaded spell: ' + spell[cl][id]);
		}
	}
}

function getSpellLevel(c, i) {
	var sl = [
		[1, 2, 2, 2, 3, 3, 4, 5],
		[1, 2, 4, 5, 5, 6, 7, 8],
		[1, 2, 2, 3, 3, 4, 5, 6],
		[1, 2, 2, 3, 3, 4, 4, 7]
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
		[0, 1, 0, 2, 1, 2, 3, 3]
	];
	var sr = [
		[0, 2, 6, 5, 7, 1, 3, 4],
		[4, 1, 6, 7, 3, 5, 2, 0],
		[0, 5, 2, 3, 1, 4, 7, 6],
		[3, 4, 6, 0, 1, 5, 7, 2]
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
	for (cl = 0; cl < COLOUR_MAX; cl++) {
		for (id = 0; id < SPELL_MAX; id++) {
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
		default:
			return 0;
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
			newProjectile(DUNGEON_PROJECTILE_ARROW, PALETTE_SERPENT_ARROW, s, pow, f, x, y, d, src);
                        playSound(SOUND_SPELL);
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
				for (c in chs) {
					if(chs[c].recruitment.attached) {
						chs[c].addHP(pow);
					}
				}
			}
			break;
		case SPELL_ARC_BOLT:
			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_SERPENT_BIG, s, pow, f, x, y, d, src);
			break;
		case SPELL_FORMWALL:
			if (src.getBinaryView(15, 0, 16) === '0000') {
				src.setBinaryView(15, 12, 4, '7');
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
			newProjectile(DUNGEON_PROJECTILE_ARROW, PALETTE_CHAOS_ARROW, s, pow, f, x, y, d, src);
			break;
		case SPELL_ANTIMAGE:
			ch.activateSpell(s, pow);
			break;
		case SPELL_SPELLTAP:
			newProjectile(DUNGEON_PROJECTILE_ARROW, PALETTE_GOLD_ARROW, s, pow, f, x, y, d, src);
			break;
		case SPELL_ALCHEMY:
			var validItems = [ITEM_TYPE_WEAPON, ITEM_TYPE_ARMOUR, ITEM_TYPE_SHIELD, ITEM_TYPE_GLOVES];
			if(validItems.indexOf(ch.pocket[POCKET_LEFT_HAND].type) > -1) {
				ch.pocket[POCKET_LEFT_HAND].setPocketItem(ITEM_COINAGE, pow);
			} else if(validItems.indexOf(ch.pocket[POCKET_RIGHT_HAND].type) > -1) {
				ch.pocket[POCKET_RIGHT_HAND].setPocketItem(ITEM_COINAGE, pow);
			}
			break;
		case SPELL_SUMMON:
			var ob = canMove(f, x, y, d);
			if (ob === OBJECT_CHARACTER || ob === OBJECT_PROJECTILE || ob === OBJECT_MISC || ob === OBJECT_STAIRS || ob === OBJECT_DOOR) {
				castSpell(SPELL_FIREBALL, src, pw);
			} else if (ob === OBJECT_NONE) {
				var max = monster[towerThis].length;
				monster[towerThis][max] = new Monster(null, Math.floor(pow / 3.0), MON_TYPE_DRONE, MON_FORM_SUMMON, towerThis, f, x1, y1, d, (d + Math.floor(Math.random() * 2) + 2) % 4, true, 0);
				monster[towerThis][max].doGesture(CHA_GESTURE_SPELLCASTING);
			}
			break;
		case SPELL_VIVIFY:
			if (canMove(f, x, y, d) === OBJECT_NONE && getMonsterAt(f, x1, y1) === null) {
				for (i = item[towerThis].length - 1; i >= 0; i--) {
					var it = item[towerThis][i];
					if (it.id >= ITEM_BLODWYN_RIP && it.id <= ITEM_THAI_CHANG_RIP && it.location.tower === towerThis && it.location.floor === f && it.location.x === x1 && it.location.y === y1) {
						var c = it.id - ITEM_BLODWYN_RIP;
						item[towerThis].splice(i, 1);
						champion[c].stat.hp = 0;
						champion[c].getMonster().floor = f;
						champion[c].getMonster().x = x1;
						champion[c].getMonster().y = y1;
						champion[c].getMonster().d = (d + 2) % 4;
						champion[c].getMonster().hp = 0;
						champion[c].getMonster().dead = false;
						if (!champion[c].recruitment.attached && champion[c].recruitment.playerId > -1) {
							var p = player[champion[c].recruitment.playerId];
							if (p.dead) {
								champion[c].recruitment.attached = true;
								var i = p.getChampionPosition(c);
								p.exchangeChampionPosition(0, i);
								p.championLeader = 0;
								p.tower = towerThis;
								p.floor = f;
								p.x = x1;
								p.y = y1;
								p.d = (d + 2) % 4;
								p.dead = false;
								p.updateChampions();
								redrawUI(p.id);
							}
						}
						newProjectile(DUNGEON_PROJECTILE_ARROW, PALETTE_CHAOS, -1, 0, f, x, y, 0, null);
						return;
					}
				}
			}
                        playSound(SOUND_SPELL);
			break;
		case SPELL_DISRUPT:
			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_DISRUPT_BIG, s, pow, f, x, y, d, src);
			break;

			//dragon
		case SPELL_MISSILE:
			newProjectile(DUNGEON_PROJECTILE_ARROW, PALETTE_DRAGON_ARROW, s, pow, f, x, y, d, src);
			break;
		case SPELL_MAGELOCK:
			if (src.getBinaryView(18, 12, 4) === '2' && src.getBinaryView(18, ((5 + 2 - d) % 4) * 2) === '1') {
				src.setBinaryView(18, 11, 1);
			} else if (src.getBinaryView(15, 12, 4) === '2' && src.getBinaryView(15, ((5 + 0 - d) % 4) * 2) === '1') {
				src.setBinaryView(15, 11, 1);
			} else if (src.getBinaryView(15, 12, 4) === '5' && src.getBinaryView(15, 4) === '0') {
				src.setBinaryView(15, 11, 1);
			}
			break;
		case SPELL_VITALISE:
			if(ch.recruitment.playerId > -1) {
				var pl = player[ch.recruitment.playerId];
				var chs = pl.getOrderedChampions();
				for (c in chs) {
					if(chs[c].recruitment.attached) {
						chs[c].addVit(pow);
					}
				}
			}
			break;
		case SPELL_DISPELL:
			if (src.getBinaryView(15, 12, 4) === '7') {
				src.setBinaryView(15, 0, 16, '0000');
			}
			break;
		case SPELL_FIREBALL:
			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_DRAGON_BIG, s, pow, f, x, y, d, src);
			break;
		case SPELL_FIREPATH:
			newProjectile(DUNGEON_PROJECTILE_ARROW, PALETTE_DRAGON_ARROW, s, pow, f, x, y, d, src);
			break;
		case SPELL_RECHARGE:
			break;
		case SPELL_BLAZE:
			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_BLAZE_BIG, s, pow, f, x, y, d, src);
			break;

			//moon
		case SPELL_BEGUILE:
			break;
		case SPELL_CONFUSE:
			newProjectile(DUNGEON_PROJECTILE_ARROW, PALETTE_MOON_ARROW, s, pow, f, x, y, d, src);
			break;
		case SPELL_CONCEAL:
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
				monster[towerThis][max] = new Monster(null, Math.floor(pow / 3), MON_TYPE_DRONE_CASTER, MON_FORM_ILLUSION, towerThis, f, x1, y1, d, (d + Math.floor(Math.random() * 2) + 2) % 4, true, 0);
				monster[towerThis][max].hp = 0;
				monster[towerThis][max].doGesture(CHA_GESTURE_SPELLCASTING);
			}
			break;
		case SPELL_MINDROCK:
			if (src.getBinaryView(15, 0, 16) === '0000') {
				src.setBinaryView(15, 12, 4, '7');
				src.setBinaryView(15, 6, 2, '2');
				src.setBinaryView(15, 0, 6, dec2hex(pow));
			}
			break;
		case SPELL_WYCHWIND:
			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_MOON_BIG, s, pow, f, x - xy.y, y - xy.x, d, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_MOON_BIG, s, pow, f, x, y, d, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_MOON_BIG, s, pow, f, x + xy.y, y + xy.x, d, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_MOON_BIG, s, pow, f, x + xy.y, y + xy.x, (d + 2) % 4, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_MOON_BIG, s, pow, f, x, y, (d + 2) % 4, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_MOON_BIG, s, pow, f, x - xy.y, y - xy.x, (d + 2) % 4, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_MOON_BIG, s, pow, f, x, y, (d + 1) % 4, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_MOON_BIG, s, pow, f, x, y, (d + 3) % 4, src);
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
	for(d in dungeonSpellList) {
		ds = dungeonSpellList[d];
		if(ds.tower === towerThis && ds.floor === f && ds.x === x && ds.y === y) {
			return ds;
		}
	}
	return null;
}

function updateDungeonSpells() {
	for (s in dungeonSpellList) {
		var ds = dungeonSpellList[s];
		if (ds.tower === towerThis) {
			if(ds.projectile !== null && typeof ds.projectile.spell !== 'number' && (ds.projectile.spell.index === SPELL_FIREPATH || ds.projectile.spell.index === SPELL_BLAZE)) {
				for (p in player) {
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
				dungeonSpellList.splice(s, 1);
				s--;
			}
		}
	}
}

function Spell(colour, id, name, description, symbols, level) {
	this.colour = colour;
	this.id = id;
	this.name = name;
	this.description = description;
	this.symbols = symbols;
	this.level = level;
	this.cost = this.level * 5;
	var pr = getSpellPageAndRow(colour, id);
	this.page = pr.page;
	this.row = pr.row;
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
	var cl = Math.floor(id / 8);
	var s = id % 8;
	return spell[cl][s];
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

function castSpell(s, src, pw) {
	if (typeof pw === "undefined") {
		pw = 0;
	}
	var pow = Math.floor((Math.random() * pw / 2) + (pw / 2));
	if (pow > 63) {
		pow = 63;
	}
	var f = src.floor;
	var x = src.x;
	var y = src.y;
	var d = src.d;
	var xy = getOffsetByRotation(d);
	var x1 = x + xy.x;
	var y1 = y + xy.y;
	if (src.champId > -1) {
		var ch = champion[src.champId];
	}
	switch (s) {
		//serpent
		case SPELL_ARMOUR:
			ch.activateSpell(s, pow, pow * 5);
			break;
		case SPELL_PARALYZE:
			break;
		case SPELL_COMPASS:
			ch.activateSpell(s, pow, pow * 10);
			break;
		case SPELL_LEVITATE:
			ch.activateSpell(s, pow, pow * 10);
			break;
		case SPELL_WARPOWER:
			ch.activateSpell(s, pow, pow * 5);
			break;
		case SPELL_ARC_BOLT:
			break;
		case SPELL_FORMWALL:
			if (src.getBinaryView(15, 0, 16) === '0000') {
				src.setBinaryView(15, 12, 4, '7');
				src.setBinaryView(15, 6, 2, '3');
				src.setBinaryView(15, 0, 6, dec2hex(pow));
				var xy = posToCoordinates(15, x, y, d);
				setDungeonSpell(towerThis, f, xy.x, xy.y);
			}
			break;

			//chaos
		case SPELL_DEFLECT:
			break;
		case SPELL_TERROR:
			break;
		case SPELL_ANTIMAGE:
			ch.activateSpell(s, pow, pow * 5);
			break;
		case SPELL_SPELLTAP:
			break;
		case SPELL_ALCHEMY:
			break;
		case SPELL_SUMMON:
			if (canMove(f, x, y, d, 0)) {
				var max = monster[towerThis].length;
				monster[towerThis][max] = new Monster(null, Math.floor(pow / 3.0), MON_TYPE_MAGICAL, MON_FORM_SUMMON, towerThis, f, x1, y1, d, (d + 2) % 4, 0);
			}
			break;
		case SPELL_VIVIFY:
			if (canMove(f, x, y, d, 0) && getMonsterAt(f, x1, y1) === null) {
				for (i = item[towerThis].length - 1; i >= 0; i--) {
					var it = item[towerThis][i];
					if (it.id >= ITEM_BLODWYN_RIP && it.id <= ITEM_THAI_CHANG_RIP && it.location.tower === towerThis && it.location.floor === f && it.location.x === x1 && it.location.y === y1) {
						var c = it.id - ITEM_BLODWYN_RIP;
						item[towerThis].splice(i, 1);
						champion[c].stat.hp = 0;
						champion[c].monster.floor = f;
						champion[c].monster.x = x1;
						champion[c].monster.y = y1;
						champion[c].monster.d = (d + 2) % 4;
						champion[c].monster.hp = 0;
						champion[c].monster.dead = false;
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
						return;
					}
				}
			}
			break;
			SPELL_DISRUPT: break;

			//dragon
		case SPELL_MISSILE:
			newProjectile(DUNGEON_PROJECTILE_ARROW, PALETTE_DRAGON, pow * 10, f, x1, y1, d, src);
			break;
		case SPELL_MAGELOCK:
			if (src.getBinaryView(18, 12, 4) === '2' && src.getBinaryView(18, ((5 + 2 - d) % 4) * 2) === '1') {
				src.setBinaryView(18, 11, 1);
			} else if (src.getBinaryView(15, 12, 4) === '2' && src.getBinaryView(15, ((5 + 0 - d) % 4) * 2) === '1') {
				src.setBinaryView(15, 11, 1);
			}
			break;
		case SPELL_VITALISE:
			break;
		case SPELL_DISPELL:
			if (src.getBinaryView(15, 12, 4) === '7') {
				src.setBinaryView(15, 0, 16, '0000');
			}
			break;

		case SPELL_FIREBALL:
			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_DRAGON_BIG, pow * 10, f, x1, y1, d, src);
			break;
		case SPELL_FIREPATH:
			break;
		case SPELL_RECHARGE:
			break;
		case SPELL_BLAZE:
			break;

			//moon
		case SPELL_BEGUILE:
			break;
		case SPELL_CONFUSE:
			var mon = getMonstersInTower(towerThis);
			var dr = Math.floor(Math.random() * 4);
			for (m in mon) {
				if (mon[m].floor === f && mon[m].x === x1 && mon[m].y === y1) {
					mon[m].d = dr;
					if(mon[m].champId > -1) {
						var cht = champion[mon[m].champId];
						if(cht.recruitment.playerId > -1) {
							player[cht.recruitment.playerId].d = dr;
						}
					}
				}
			}
			break;
		case SPELL_CONCEAL:
			break;
		case SPELL_TRUEVIEW:
			ch.activateSpell(s, pow, pow * 5);
			break;
		case SPELL_VANISH:
			ch.activateSpell(s, pow, pow * 5);
			break;
		case SPELL_ILLUSION:
			if (canMove(f, x, y, d, 0)) {
				var max = monster[towerThis].length;
				monster[towerThis][max] = new Monster(null, Math.floor(pow / 10), MON_TYPE_MAGICAL, MON_FORM_ILLUSION, towerThis, f, x1, y1, d, (d + 2) % 4, 0);
				monster[towerThis][max].hp = 0;
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
			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_MOON_BIG, pow * 5, f, x + xy.x - xy.y, y + xy.y - xy.x, d, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_MOON_BIG, pow * 5, f, x + xy.x, y + xy.y, d, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_MOON_BIG, pow * 5, f, x + xy.x + xy.y, y + xy.y + xy.x, d, src);
			
			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_MOON_BIG, pow * 5, f, x - xy.x + xy.y, y - xy.y + xy.x, (d + 2) % 4, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_MOON_BIG, pow * 5, f, x - xy.x, y - xy.y, (d + 2) % 4, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_MOON_BIG, pow * 5, f, x - xy.x - xy.y, y - xy.y - xy.x, (d + 2) % 4, src);

			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_MOON_BIG, pow * 5, f, x + xy.y, y + xy.x, (d + 3) % 4, src);
			newProjectile(DUNGEON_PROJECTILE_BIG, PALETTE_MOON_BIG, pow * 5, f, x - xy.y, y - xy.x, (d + 1) % 4, src);
			break;
		default:
			break;
	}
}

function setDungeonSpell(t, f, x, y) {
	var max = dungeonSpellList.length;
	dungeonSpellList[max] = {
		tower: t,
		floor: f,
		x: x,
		y: y
	};
}

function updateDungeonSpells() {
	for (s = 0; s < dungeonSpellList.length; s++) {
		var ds = dungeonSpellList[s];
		if (ds.tower === towerThis) {
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

function calculateAttack(att, def) {
	combat = new Array();
	if(att instanceof Monster) {
		var mon = new Array();
		if(att.teamId != 0) {
			mon = getMonsterTeam(att.teamId);
		} else {
			mon[0] = att;
		}
	}

	for (a = 0; a < 2; a++) {
	    var attack = 0;
		var crit = 1;
		var hit = 1.0;
		var defense = 0;
		var defChance = 1;
		var attExhaustion = 0;
		var defExhaustion = 0;
		var fromDir = 0;
		var from;
		var to;
		var fmon;
		var tmon;

		//Attacker calculations
		if(att instanceof Player) {
        	from = champion[att.champion[a]];
        	fmon = from.monster;
        	if(typeof from === "undefined" || fmon.dead) {
        		continue;
        	}
			if(Math.floor(Math.random() * 20) >= 19) {
				crit = 2;
			}
        	fromDir = fmon.d;
        	if(from.prof === PROFESSION_CUTPURSE && (from.pocket[0].id === ITEM_DAGGER || from.pocket[0].id === ITEM_STEALTH_BLADE) && att.d === def.d) {
        		defChance = 0.5;
			}
			var wp = from.getWeaponPower(0);
			if(wp > 0) {
				attack += wp;
			} else {
				attack += from.getWeaponPower(1);
			}
			//attack += from.getWeaponPower(1);
			attack += Math.round(from.stat.str / 8);
			attack += Math.round(from.stat.agi / 32);
			attExhaustion = Math.floor(Math.random() * 2) + 1;
			hit = hit * (from.stat.vit / from.stat.vitMax + 0.75);
		} else {
			from = mon[a];
			fmon = from;
        	if(typeof from === "undefined" || from.dead) {
        		continue;
        	}
        	fromDir = from.d;
			attack += 4 + from.level * 4;
		}

		//Defender calculations
		if(def instanceof Player) {
			var ch = [];
			var ch1 = [];
			for (d = 0; d < 2; d++) {
				ch[0] = champion[def.champion[(7 + fromDir - def.d - d) % 4]];
				ch[1] = champion[def.champion[(4 + fromDir - def.d + d) % 4]];
				//tmon = to1[d].monster;
				if(typeof ch[0] !== "undefined" && !ch[0].monster.dead) {
					ch1.push(ch[0]);
				} else if(typeof ch[1] !== "undefined" && !ch[1].monster.dead) {
					ch1.push(ch[1]);
				}
			}
			if(ch1.length > 0) {
				to = ch1[Math.floor(Math.random() * ch1.length)];
				tmon = to.monster;
				defense = 10;
				if(!to.attacking) {
					defense += 10 + Math.round(to.stat.agi / 4);
				}
				defense -= to.getArmourClass();
				defExhaustion = Math.floor(Math.random() * 2) + 1;
			}
		} else if(def instanceof Monster) {
			var mon = new Array();
			if(def.teamId != 0) {
				mon = getMonsterTeam(def.teamId);
			} else {
				mon[0] = def;
			}
			for (d = 0; d < mon.length; d++) {
				if(Math.random() < 1.0 / (mon.length - d)) {
					to = mon[d];
					tmon = to;
					if(to.champId > -1) { //champion
						to = champion[to.champId];
						tmon = to.monster;
						defense += 15 + Math.round(to.stat.agi / 4);
						defense -= to.getArmourClass();
						defExhaustion = Math.floor(Math.random() * 2) + 1;
					} else { //monster
						if(!to.attacking) {
							defense += 10;
						}
						defense += 10 + to.level * 3;
					}
					break;
				}
			}
		}

		//Final calculations
		if(typeof from !== "undefined" && !fmon.dead && typeof to !== "undefined" && !tmon.dead) {
			var power = Math.floor(Math.random() * 20 * crit + attack - (defChance * defense));
			if(Math.random() > hit || power < 0) {
				power = 0;
			}
			combat.push({
				attacker: from,
				defender: to,
				power: power,
				attExhaustion: attExhaustion,
				defExhaustion: defExhaustion
			});
		}
	}
	return combat;
}

function getXpForLevel(lvl) {
	switch(lvl) {
		case 1:
		return 11;
		default:
		return lvl * 10;
	}
	return 0;
}

function getXpForSpell(lvl, prof) {
	var fairx = [ 2, 1, 2, 2 ]; //exponent
	var fairs = [ 0, 0, 1, 1 ]; //starting

	switch(lvl) {
		case 1:
		return Math.ceil(11 * fairx[prof] / 2) - (5 * fairs[prof]);
		default:
		return lvl * 5 * fairx[prof] - 5 * fairs[prof];
	}
	return 0;
}
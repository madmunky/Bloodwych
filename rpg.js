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
		var exhaustion = 0;
		var defense = 0;
		var fromDir = 0;

		//Attacker calculations
		if(att instanceof Player) {
        	var from = champion[att.champion[a]];
        	if(typeof from === "undefined" || from.monster.dead) {
        		continue;
        	}
			if(Math.floor(Math.random() * 20) >= 19) {
				crit = 2;
			}
        	fromDir = from.monster.d;
			attack += Math.floor(from.stat.str / 8);
			attack += Math.floor(from.stat.agi / 32);
			attack += from.getWeaponPower();
			exhaustion = Math.floor(attack / 4);
			hit = hit * (from.stat.vit / from.stat.vitMax + 0.75);
		} else {
			var from = mon[a];
        	if(typeof from === "undefined" || from.dead) {
        		continue;
        	}
        	fromDir = from.d;
			attack += 4 + from.level * 4;
		}

		//Defender calculations
		if(def instanceof Player) {
			for (d = 0; d < 2; d++) {
				var to = champion[def.champion[(7 + fromDir - def.d - d) % 4]];
				if(typeof to === "undefined" || to.monster.dead) {
					to = champion[def.champion[(4 + fromDir - def.d + d) % 4]];
				}
				if(Math.random() < (d + 1.0) * 0.5) {
					if(!to.attacking) {
						defense += 10 + Math.floor(to.stat.agi / 4);
					}
					defense -= to.getArmourClass();
					break;
				}
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
					var to = mon[d];
					if(to.champId > -1) { //champion
						to = champion[to.champId];
						defense += 10 + Math.floor(to.stat.agi / 4);
						defense -= to.getArmourClass();
					} else { //monster
						if(!to.attacking) {
							defense += 10;
						}
						defense += 5 + to.level * 2;
					}
					break;
				}
			}
		}

		//Final calculations
		if(typeof from !== "undefined" && typeof to !== "undefined") {
			var power = Math.floor(Math.random() * 20 * crit) + attack - defense;
			if(Math.random() > hit || power < 0) {
				power = 0;
			}
			combat.push({
				attacker: from,
				defender: to,
				power: power,
				exhaustion: exhaustion
			});
		}
	}
	return combat;
}
function calculateAttack(att, def) {
	combat = new Array();

	for (a = 0; a < 2; a++) {
	    var attack = 0;
		var crit = 1;
		if(Math.floor(Math.random() * 20) >= 19) {
			crit = 2;
		}
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
        	fromDir = from.monster.d;
			attack += Math.floor(from.stat.str / 8);
			attack += Math.floor(from.stat.agi / 32);
			attack += 0; //weapon items
			exhaustion = Math.floor(attack / 2);
			hit = from.stat.vit / from.stat.vitMax + 0.25;
		} else {

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
					defense -= to.stat.ac;
					defense -= 0; //armour items
					break;
				}
			}
		} else if(def instanceof Monster) {

		}

		//Final calculations
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
	return combat;
}
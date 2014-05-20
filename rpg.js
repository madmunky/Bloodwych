function calculateAttack(att, def) {
	combat = new Array();
	var hit = 1.0;
	if(att instanceof Player) {
		for (a = 0; a < 2; a++) {
        	var from = champion[att.champion[a]];
        	var attack = 0;
			var crit = 1;
			if(Math.floor(Math.random() * 20) >= 19) {
				crit = 2;
			}
			attack += Math.floor(from.stat.str / 8);
			attack += Math.floor(from.stat.agi / 32);
			attack += 0; //weapon items
			hit = from.stat.vit / from.stat.vitMax;
			if(def instanceof Player) {
				for (d = 0; d < 2; d++) {
					var defense = 0;
					var to = champion[def.champion[(7 + from.monster.d - def.d - d) % 4]];
					if(typeof to === "undefined" || to.dead) {
						to = champion[def.champion[(4 + from.monster.d - def.d + d) % 4]];
					}
					if(Math.random() < (d + 1.0) * 0.5) {
						if(!to.attacking) {
							defense += 10 + Math.floor(to.stat.agi / 4);
						}
						defense -= to.stat.ac;
						defense -= 0; //armour items

						var power = Math.floor(Math.random() * 20 * crit) + attack - defense;
						if(Math.random() > hit || power < 0) {
							power = 0;
						}
						combat.push({
							attacker: from,
							defender: to,
							power: power
						});
						break;
					}
				}
			}
		}
	}
	return combat;
}
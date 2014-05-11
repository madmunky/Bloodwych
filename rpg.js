function calculateAttack(from, to) {
	var crit = 1;
	var critChance = Math.floor(Math.random() * 20);
	if(critChance === 0) {
		crit = 3;
	} if(critChance <= 4) {
		crit = 2;
	}
	var power = Math.floor(Math.random() * (from.level + (10 * crit));
	if(from instanceof Monster) {
		if(to instanceof Player) {
			power = power + to.ac
		}
	}
}
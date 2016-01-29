function calculateAttack(att, def, tof) {
	combat = new Array();
	if (att instanceof Monster) {
		var mon = new Array();
		if (att.teamId != 0) {
			mon = getMonsterTeam(att.teamId);
		} else {
			mon[0] = att;
		}
	}

	for (a = 0; a < 4; a++) {
		var attack = 0; //attack points
		var critChance = 1.0; //chance for a critical strike (2x hit)
		var hit = 1.0; //chance for attacker for a successful hit
		var defense = 0; //defense points
		var defChance = 1; //chance that defender can succesfully defend
		var attExhaustion = 0; //attack exhaustion points. used to decrease vitality of attacker
		var defExhaustion = 0; //defense exhaustion points. used to decrease vitality of defender
		var fromDir = 0;
		var from;
		var to;
		var fmon;
		var tmon;
		if (typeof tof === "undefined") { //force a 'to'
			var tof = -1;
		}

		//Attacker calculations
		if(att instanceof Champion && att.recruitment.playerId > -1 && att.recruitment.position !== a) {
			continue;
		}
		if (att instanceof Player || (att instanceof Champion && att.recruitment.playerId > -1)) {
			var att2 = att;
			if (att instanceof Champion) {
				att2 = player[att.recruitment.playerId];
			}
			from = att2.getChampion(a);
			if (typeof from === "undefined" || from === null || !from.recruitment.attached) {
				continue;
			}
			fmon = from.getMonster();
			if (fmon.dead) {
				continue;
			}
			if(from.selectedSpell === null && from.getBowPower() === 0) {
				if (a >= 2 || typeof def === 'undefined') {
					continue;
				}
			}
			if(typeof def !== 'undefined') {
				if (Math.floor(Math.random() * 20) >= 19) { //critical strike chance is 5%
					critChance = 1.5;
				}
				fromDir = fmon.d;
				if (from.prof === PROFESSION_CUTPURSE && (from.pocket[0].id === ITEM_DAGGER || from.pocket[0].id === ITEM_STEALTH_BLADE) && att2.d === def.d) { //cutpurses can cut through 50% of the defense
					defChance = 0.5;
				}
				var wp = from.getWeaponPower(POCKET_LEFT_HAND); //weapon attack power
				if (wp > 0) {
					attack += wp;
				} else {
					attack += from.getWeaponPower(POCKET_RIGHT_HAND); //if no weapon in right hand, check left hand
				}
				attack = attack * (1.0 + from.stat.str / 2.0 + from.stat.agi / 4.0); //add strength and agility to attack points
				attack += Math.floor(from.getActiveSpellById(SPELL_WARPOWER).power / 10.0);
				attExhaustion = Math.floor(Math.random() * 2) + 1; //attack exhaustion
				//hit = hit * (from.stat.vit / from.stat.vitMax + 0.75); //when vitality is low, attack chance is lower (75% hit chance when vitality is 0)
			}
		} else if (att instanceof Projectile) {
			if (a === 0) {
				if(att.monster === null) {
					break;
				}
				from = att.monster;
				fmon = null;
				attack += att.power;
			} else {
				continue;
			}
		} else if (att instanceof Monster) { //monster
			from = mon[a];
			fmon = from;
			if (typeof from === "undefined" || from.dead) {
				continue;
			}
			fromDir = from.d;
			attack += 25 + from.level * 4;
		}

		//Defender calculationss
		if (def instanceof Player) {
			var ch = [];
			var ch1 = [];
			for (d = 0; d < 2; d++) {
				ch[0] = champion[def.champion[(7 + fromDir - def.d - d) % 4]];
				ch[1] = champion[def.champion[(4 + fromDir - def.d + d) % 4]];
				if (typeof ch[0] !== "undefined" && !ch[0].getMonster().dead) {
					ch1.push(ch[0]);
				} else if (typeof ch[1] !== "undefined" && !ch[1].getMonster().dead) {
					ch1.push(ch[1]);
				}
			}
			if (ch1.length > 0 || tof > -1) {
				if (tof === -1) {
					to = ch1[Math.floor(Math.random() * ch1.length)];
				} else if (typeof champion[def.champion[tof]] !== "undefined" && !champion[def.champion[tof]].dead) {
					to = champion[def.champion[tof]];
				}
				if (typeof to !== "undefined") {
					tmon = to.getMonster();
					defense += to.stat.agi / 2.0;
					defense -= to.getArmourClass();
					defense += Math.floor(to.getActiveSpellById(SPELL_ARMOUR).power / 10.0);
					defense += Math.floor(to.getActiveSpellById(SPELL_PROTECT).power / 10.0);
					defense += (6.0 + to.level) * 4.0;
					if (!to.attacking) {
						defense = defense * 1.1;
					}
					defExhaustion = Math.floor(Math.random() * 2) + 1;
				}
			}
		} else if (def instanceof Monster) {
			var mon = new Array();
			if (def.teamId != 0) {
				mon = getMonsterTeam(def.teamId);
			} else {
				mon[0] = def;
			}
			for (d = 0; d < mon.length; d++) {
				if (Math.random() < 1.0 / (mon.length - d) || tof > -1) {
					if (tof === -1) {
						to = mon[d];
					} else {
						to = mon[tof];
					}
					if (typeof to !== "undefined") {
						tmon = to;
						if (to.champId > -1) { //champion
							to = champion[to.champId];
							tmon = to.getMonster();
							defense += to.stat.agi / 2.0;
							defense -= to.getArmourClass();
							defense += Math.floor(to.getActiveSpellById(SPELL_ARMOUR).power / 10.0);
							defense += Math.floor(to.getActiveSpellById(SPELL_PROTECT).power / 10.0);
							defense += (6.0 + to.level) * 4.0;
							defExhaustion = Math.floor(Math.random() * 2) + 1;
						} else { //monster
							defense += 35; // + to.level * 2;
							//if (!to.attacking) {
							//	defense = defense * 1.1;
							//}
						}
					}
					break;
				}
			}
		} else if (typeof def === 'undefined') {
			to = null;
			tmon = null;
		}

		//Final calculations
		if (typeof from !== "undefined" && (fmon === null || !fmon.dead) && typeof to !== 'undefined' && (tmon === null || !tmon.dead)) {
			var dmg = (attack - defChance * defense) * critChance;
			var lvl = (2.0 + from.level) * 2.0;
			var power = Math.floor(Math.random() * lvl + dmg + lvl);
			if (Math.random() > hit || power < 0) {
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
	switch (lvl) {
		case 1:
			return 11;
		default:
			return lvl * 10;
	}
	return 0;
}

function getXpForSpell(lvl, prof) {
	var fairx = [2, 1, 2, 2]; //exponent
	var fairs = [0, 0, 1, 1]; //starting

	switch (lvl) {
		case 1:
			return Math.ceil(11 * fairx[prof] / 2) - (5 * fairs[prof]);
		default:
			return lvl * 5 * fairx[prof] - 5 * fairs[prof];
	}
	return 0;
}

function Game() {};
Game.prototype = {

	init: function() {
		this.fps = 10;
		this.step = 1 / this.fps;
		this.reset();
		this.eventQueue = [];
	},

	// Reset the game
	reset: function() {
		this.example = 0;
	},

	// Update the game model
	update: function() {
		timerMaster++;
		timerAction();
	},

	subscribe: function(e, callback, target) {
		this.subs = this.subs || {};
		this.subs[e] = this.subs[e] || [];
		this.subs[e].push({
			callback: callback,
			target: target
		});
	},

	publish: function(e) {
		this.subs && this.subs[e].forEach(function(sub) {
			var args = [].slice.call(arguments, 1);
			sub.callback.apply(sub.target, args)
		});
	}
}

function timerAction() {
	cutpurseTrueview = (Math.floor(Math.random() * 10) === 0);
	if (timerMaster - timerChampionAttack >= 20) {
		timerChampionAttack = timerMaster;
		for (p = 0; p < player.length; p++) {
			if (player[p].attacking) {
				player[p].tryAttack();
			}
		}
	}
	if (timerMaster - timerMonsterMove >= 20) {
		timerMonsterMove = timerMaster;
		monsterAttackSequence = 0;
		mon = getMonstersInTower(towerThis);
		for (m in mon) {
			//mon[m].move();
		}
	}
	if (timerMaster - timerMonsterAttack >= 3) {
		timerMonsterAttack = timerMaster;
		monsterAttackSequence++;
	}

	for (p = 0; p < player.length; p++) {
		var pl = player[p];
		var tm = 100;
		if (pl.sleeping) {
			tm = 50;
		}
		if (timerMaster - pl.timerChampionStats >= tm) {
			pl.timerChampionStats = timerMaster;
			if (pl.sleeping) {
				pl.checkChampionUp();
			}
			for (c = 0; c < pl.champion.length; c++) {
				var ch = pl.getChampion(c);
				if (ch !== null) {
					ch.restoreStats();
				}
			}
		}
		if (timerMaster - activeSpellTimer >= 10) {
			activeSpellTimer = timerMaster;
			for (c = 0; c < pl.champion.length; c++) {
				var ch = pl.getChampion(c);
				if (ch !== null) {
					ch.checkSpell();
				}
			}
		}
	}
	if (timerMaster - timerChampionStats >= 100) {
		timerChampionStats = timerMaster;
		for (ch = 0; ch < champion.length; ch++) {
			if (!champion[ch].recruitment.playerId > -1) {
				champion[ch].restoreStats();
			}
		}
		for (m = 0; m < monster[towerThis].length; m++) {
			if (monster[towerThis][m].dead) {
				monster[towerThis].splice(m, 1);
				m--;
			}
		}
		for (p = 0; p < projectile[towerThis].length; p++) {
			if (projectile[towerThis][p].dead >= 3) {
				projectile[towerThis].splice(p, 1);
				p--;
			}
		}
	}
	if (timerMaster - dungeonSpellTimer >= 50) {
		dungeonSpellTimer = timerMaster;
		updateDungeonSpells();
	}
	//if (timerMaster - projectileTimer >= 3) {
		//projectileTimer = timerMaster;
		for (p = 0; p < projectile[towerThis].length; p++) {
			if(timerMaster - projectile[towerThis][p].timer >= 2) {
				projectile[towerThis][p].timer = timerMaster;
				projectile[towerThis][p].moveProjectile();
			}
		}
	//}
}

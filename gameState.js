function gameState(saveName) {
	this.gameData = [];
	this.fileName = saveName;
}

gameState.prototype.getName = function() {
	var json = JSON.parse(localStorage.getItem(this.fileName));
	if(json !== null) {
		return json.name;
	}
	return '';
}

gameState.prototype.load = function() {
	this.gameData = JSON.parse(localStorage.getItem(this.fileName));
	if(this.gameData !== null) {
		versionThis = this.gameData.version;
		tower = this.gameData.tower;
		player = this.gameData.player;
		champion = this.gameData.champion;
		monster = this.gameData.monster;
		item = this.gameData.item;
		projectile = this.gameData.projectile;
		timerMaster = this.gameData.variables.timerMaster;
		timerMonsterMove = this.gameData.variables.timerMonsterMove;
		timerChampionStats = this.gameData.variables.timerChampionStats;
		towerThis = this.gameData.variables.towerThis;
		monsterTeamIdMax = this.gameData.variables.monsterTeamIdMax;
		dungeonSpellTimer = this.gameData.variables.dungeonSpellTimer;
		dungeonSpellList = this.gameData.variables.dungeonSpellList;
	//	activeSpellTimer = this.gameData.variables.activeSpellTimer;

		clearCanvas();
		for (p in player) {
			player[p] = castObject(player[p], 'Player');
			redrawUI(player[p].id);
		}
		for (c in champion) {
			champion[c] = castObject(champion[c], 'Champion');
			for (pg = 0; pg < COLOUR_MAX; pg++) {
				for (rw = 0; rw < SPELL_MAX; rw++) {
					champion[c].spellBook[pg][rw]["ref"] = getSpellById(champion[c].spellBook[pg][rw].id);
				}
			}
		}
		for (var t = 0; t < 7; t++) {
			for (var m = 0; m < monster[t].length; m++) {
				monster[t][m] = castObject(monster[t][m], 'Monster');
				monster[t][m]["ref"] = monsterRef[monster[t][m].form][monster[t][m].colour];
			}
		}
		for (var t = 0; t < 6; t++) {
			for (var i = 0; i < item[t].length; i++) {
				item[t][i] = castObject(item[t][i], 'Item');
			}
		}
		for (var t = 0; t < 6; t++) {
			for (var p = 0; p < projectile[t].length; p++) {
				projectile[t][p] = castObject(projectile[t][p], 'Projectile');
			}
		}
		for (s in dungeonSpellList) {
			dungeonSpellList[s].projectile = getProjectileById(dungeonSpellList[s].tower, dungeonSpellList[s].projectileId);
		}

		//version control
		if(typeof versionThis === 'undefined' || versionThis < 0.50) {
			for (var t = 0; t < 7; t++) {
				for (var m = 0; m < monster[t].length; m++) {
					monster[t][m].hp += monster[t][m].level * 5 + 5;
				}
			}
		}

		player[0].message(TEXT_GAME_LOADED, COLOUR[COLOUR_GREEN]);
	}
};

gameState.prototype.save = function(name) {
	this.gameData = {
		name: name,
		version: VERSION,
		tower: $.extend(true, {}, tower),
		player: $.extend(true, {}, player),
		champion: $.extend(true, {}, champion),
		monster: $.extend(true, {}, monster),
		item: $.extend(true, {}, item),
		projectile: $.extend(true, {}, projectile),
		variables: {
			timerMaster: timerMaster,
			timerMonsterMove: timerMonsterMove,
			timerChampionStats: timerChampionStats,
			towerThis: towerThis,
			monsterTeamIdMax: monsterTeamIdMax,
			dungeonSpellTimer: dungeonSpellTimer,
			dungeonSpellList: $.extend(true, {}, dungeonSpellList),
//			activeSpellTimer: activeSpellTimer
		}
	};
	localStorage.setItem(this.fileName, JSON.stringify(this.gameData));
	player[0].message(TEXT_GAME_SAVED, COLOUR[COLOUR_GREEN]);
};

function castObject(ob, to) {
	return Types[ob.__type].revive(ob);
}

function gameState(fileName) {
	this.gameData = [];
	this.fileName = fileName;
}

function getGameName(g) {
	var json = JSON.parse(localStorage.getItem('savegame' + g));
	if(json !== null) {
		return json.name;
	}
	return '';
}

function loadGame(g) {
	var save = new gameState('savegame' + g);
	save.gameData = JSON.parse(localStorage.getItem(save.fileName));
	if(save.gameData !== null) {
		versionThis = save.gameData.version;
		tower = save.gameData.tower;
		player = save.gameData.player;
		champion = save.gameData.champion;
		monster = save.gameData.monster;
		item = save.gameData.item;
		projectile = save.gameData.projectile;
		timerMaster = save.gameData.variables.timerMaster;
		timerMonsterMove = save.gameData.variables.timerMonsterMove;
		timerChampionStats = save.gameData.variables.timerChampionStats;
		towerThis = save.gameData.variables.towerThis;
		monsterTeamIdMax = save.gameData.variables.monsterTeamIdMax;
		dungeonSpellTimer = save.gameData.variables.dungeonSpellTimer;
		dungeonSpellList = save.gameData.variables.dungeonSpellList;
		soundEnabled = save.gameData.variables.soundEnabled;
	//	activeSpellTimer = save.gameData.variables.activeSpellTimer;

		clearCanvas();
		for(var p in player) {
			player[p] = castObject(player[p], 'Player');
			redrawUI(player[p].id);                        
		}
		for(var c in champion) {
			champion[c] = castObject(champion[c], 'Champion');
			for(var pg = 0; pg < SPELL_COLOUR_MAX; pg++) {
				for(var rw = 0; rw < SPELL_LEVEL_MAX; rw++) {
					champion[c].spellBook[pg][rw]["ref"] = getSpellById(champion[c].spellBook[pg][rw].id);
				}
			}
		}
		for (var t = 0; t < 7; t++) {
			for (var m = 0; m < monster[t].length; m++) {
				monster[t][m] = castObject(monster[t][m], 'Monster');
//                                if (typeof monsterRef[monster[t][m].form][monster[t][m].colour] !== 'undefined'){
//                                    monster[t][m]["ref"] = monsterRef[monster[t][m].form][monster[t][m].colour];
//                                }else{
                                    monster[t][m]["ref"] = null;
//                                }
				
			}
		}
		for (var t = 0; t < 6; t++) {
			for (var i = 0; i < item[t].length; i++) {
				item[t][i] = castObject(item[t][i], 'Item');
			}
		}
		for (var t = 0; t < 6; t++) {
			//for (var p = 0; p < projectile[t].length; p++) {
			for(var p in projectile[t]) {
				projectile[t][p] = castObject(projectile[t][p], 'Projectile');
			}
		}
		for(var s in dungeonSpellList) {
			if(dungeonSpellList[s] !== null) {
				dungeonSpellList[s].projectile = getProjectileById(dungeonSpellList[s].tower, dungeonSpellList[s].projectileId);
			}
		}

		//version control
		if(typeof versionThis === 'undefined' || versionThis < 0.50) {
			for (var t = 0; t < 7; t++) {
				for (var m = 0; m < monster[t].length; m++) {
					monster[t][m].hp += monster[t][m].level * 5 + 5;
				}
			}
		}
                for(var p in player){
                    for(var c in player[p].champion){             
                        var id = champion[player[p].champion[c]].id;
                            initMonsterGfxNew(champion[id].getMonster());
                        }
                }
		player[0].message(TEXT_GAME_LOADED, colourData['GREEN']);
	}
};

function saveGame(g, name) {
	var save = new gameState('savegame' + g);
	save.gameData = {
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
			dungeonSpellList: dungeonSpellList,
			soundEnabled: soundEnabled
//			activeSpellTimer: activeSpellTimer
		}
	};
	localStorage.setItem(save.fileName, JSON.stringify(save.gameData));
	if(g < 99) {
		player[0].message(TEXT_GAME_SAVED, colourData['GREEN']);
	}
};

function deleteGame(g) {
	localStorage.removeItem('savegame' + g);
}

function castObject(ob, to) {
	return Types[ob.__type].revive(ob);
}

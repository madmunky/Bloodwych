function gameState(saveName) {
	this.gameData = [];
	this.fileName = saveName;
}

gameState.prototype.load = function() {
	this.gameData = parseObject(localStorage.getItem(this.fileName));

	tower = this.gameData.tower;
	champion = this.gameData.champion;
	monster = this.gameData.monster;

	for (c in this.gameData.champion) {
		for (pg = 0; pg < COLOUR_MAX; pg++) {
			for (rw = 0; rw < SPELL_MAX; rw++) {
				champion[c].spellBook[pg][rw]["ref"] = getSpellById(champion[c].spellBook[pg][rw].id);
			}
		}
	}
	for (var t = 0; t < 6; t++) {
		for(var m = 0; m < monster[t].length; m++) {
			monster[t][m]["ref"] = monsterRef[monster[t][m].form][monster[t][m].colour];
		}
	}
};

gameState.prototype.save = function() {
	this.gameData = {
		//tower: $.extend(true, {}, tower),
		champion: $.extend(true, {}, champion),
		monster: $.extend(true, {}, monster)
	};
	for (c in this.gameData.champion) {
		for (pg = 0; pg < COLOUR_MAX; pg++) {
			for (rw = 0; rw < SPELL_MAX; rw++) {
				delete this.gameData.champion[c].spellBook[pg][rw].ref;
			}
		}
	}
	/*for (var t = 0; t < 7; t++) {
		for(var m = 0; m < monster[t].length; m++) {
			delete this.gameData.monster[t][m].ref;
		}
	}*/
	//this.gameData.tower[towerThis].floor[player[0].floor].Map[player[0].y][player[0].x] = setHexToBinaryPosition(this.gameData.tower[towerThis].floor[player[0].floor].Map[player[0].y][player[0].x], 8, 1, '0');
	localStorage.setItem(this.fileName, JSON.stringify(this.gameData));
};

function parseObject(stringed) {
	return JSON.parse(stringed, function(key, value) {
	  return key === '' && value.hasOwnProperty('__type')
	    ? Types[value.__type].revive(value)
	    : this[key];
	});
}
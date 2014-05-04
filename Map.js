function Tower(id, start) {
	var t = this;
	t.id = id;

	towerDataLoaded[id] = {
		floor: false,
		switches: false,
		triggers: false,
		monsters: false,
		champions: false
	};

	getFileData('maps/' + TOWER_NAME[id] + '.MAP', readMapData, t, "floor");

	towerDataLoaded[id].watch("floor", function(prop, oldval, newval) {
		getFileData('maps/' + TOWER_NAME[id] + '.switches', readSimpleData, t, "switches", 4);
		getFileData('maps/' + TOWER_NAME[id] + '.triggers', readSimpleData, t, "triggers", 4);
	});
	towerDataLoaded[id].watch("triggers", function(prop, oldval, newval) {
		getFileData('maps/' + TOWER_NAME[id] + '.monsters', readSimpleDataHex, t, "monsterData", 6);
	});

	towerDataLoaded[id].watch("monsters", function(prop, oldval, newval) {
		if (typeof start === "boolean" && start) {
			getFileData('maps/MOD0.charstats', readSimpleDataHex, t, "championData", 32);
		}
		initMonsters(t);
	});

	towerDataLoaded[id].watch("champions", function(prop, oldval, newval) {
		if (typeof start === "boolean" && start) {
			init();
			grabFont();
			initChampions();
			initSpells();
			player[0] = new Player(0, 0, 0);
			player[1] = new Player(1, 410, 0);
			initTowerSwitches();
			switchTower(id);
		}
	});
}

function Map(Width, Height, xOff, yOff) {
	this.Width = Width;
	this.Height = Height;
	this.yOffset = yOff;
	this.xOffset = xOff;
	this.Map = [];
}

function init() {

	if (gfx['character']['torsos'].width > 0 && gfx['character']['arms'].width > 0 && gfx['character']['heads'].width > 0 && gfx['character']['legs'].width > 0 && gfx['character']['minis'].width > 0 && championData.length > 0 && gfx['misc']['font'].width > 0) {
		//clearInterval(imageChecker);
		gfx['character']['heads'].onload = getCharacterSprite(NUMBER_OF_HEADS, 'character', 'heads', 13, 13, 16);
		gfx['character']['legs'].onload = getCharacterSprite(NUMBER_OF_LEGS, 'character', 'legs', 17, 26, 17);
		gfx['character']['arms'].onload = getCharacterSprite(NUMBER_OF_ARMS, 'character', 'arms', 13, 18, 13);
		gfx['character']['minis'].onload = getCharacterSprite(NUMBER_OF_MINIS, 'character', 'minis', 13, 22, 16);
		gfx['character']['torsos'].onload = getCharacterSprite(NUMBER_OF_TORSOS, 'character', 'torsos', 17, 14, 17);

		if (typeof game === "undefined") {
			Run();
		}
	}

}

function checkSwitchTower(p, trig) {
	if((trig[0] == 18 || trig[0] == 38) && parseInt(player[0].View[18].substring(3, 4), 16) === 6 && parseInt(player[1].View[18].substring(3, 4), 16) === 6) {
		if(player[1 - p].floor === player[p].floor && player[1 - p].x === trig[2] && player[1 - p].y === trig[3]) {
			var tw = Math.floor(trig[1] * 0.5);
			//sw = getHexToBinaryPosition(tower[towerThis].floor[player[p].floor].Map[trig[3]][trig[2]], 1, 1);
			//sw = getHexToBinaryPosition(player[0].View[18], 1, 1);
			switchTower(tw, 0);
		}
	}
}

//po = 0: normal player positions, po = 1: exchange player positions
function switchTower(id, po) {
	towerLast = towerThis;
	towerThis = id;
	if(typeof po === "undefined") {
		var po = 0;
	}
	if (monster[id][0].gfx.length === 0) {
		for (var m = 0; m < monster[towerThis].length; m++) {
			monster[id][m].getGfx();
		}
	}
	if (towerLast === TOWER_MOD0 && towerThis === TOWER_MOD0) {  //from tower to tower (start of game)
		player[po].setPlayerPosition(4, 12, 8, 3); //(3, 12, 23, 0);
		player[1 - po].setPlayerPosition(4, 12, 7, 3);
	} else if(towerThis !== TOWER_MOD0) { //from keep to tower
		for(p = 0; p < 2; p++) {
			var pt = Math.abs(p - po);
			floor = player[p].towerSwitches[0][towerThis].floor;
			x = player[p].towerSwitches[0][towerThis].x;
			y = player[p].towerSwitches[0][towerThis].y;
			player[pt].setPlayerPosition(floor, x, y);
		}
	} else if(towerThis === TOWER_MOD0) { //from tower to keep
		for(p = 0; p < 2; p++) {
			var pt = Math.abs(p - po);
			floor = player[p].towerSwitches[1][towerLast].floor;
			x = player[p].towerSwitches[1][towerLast].x;
			y = player[p].towerSwitches[1][towerLast].y;
			player[pt].setPlayerPosition(floor, x, y);
		}
	}
}

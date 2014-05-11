var loadingIntervalTimer = 0;

function initGame() {

	loadGfxData();
	watch(gfxLoaded, "done", function(prop, action, newvalue, oldvalue) {
		tower[towerThis] = new Tower(towerThis, true);
		updateLoadingScreen("Loading File Data", 30);
	});

	watch(dataLoaded, "done", function(prop, action, newvalue, oldvalue) {
		if (newvalue === 1) {
			for (var i = 1; i < 6; i++) {
				tower[i] = new Tower(i);
			}
			updateLoadingScreen("Loading Tower Data", 50);
		} else if (newvalue === 2) {
			for (var i = 0; i < 6; i++) {
				initMonsters(tower[i]);
			}
			initData();
			if (typeof game === "undefined") {
				Run();
			}
			updateLoadingScreen("Starting Game", 100);
		}
	});
	updateLoadingScreen("Loading Graphics", 0);
}

function updateLoadingScreen(msg, percent) {
	refreshLoadingScreen(msg, percent);
	clearInterval(loadingIntervalTimer);
	loadingIntervalTimer = setTimeout(function() {
		refreshLoadingScreen(msg, percent);
	}, 10);
}

function refreshLoadingScreen(msg, percent) {
	//ctx.clearRect(0, 0, 795, 20);
	clearCanvas();
	ctx.font = "normal 11px verdana, sans-serif";
	ctx.fillStyle = "#FFF";
	ctx.fillText(percent + "% - " + msg + "...", 0, 15);
}

function loadGfxData() {
	//Misc
	gfxLoadImage("misc", "dashboard0");
	gfxLoadImage("misc", "dashboard1");
	gfxLoadImage("misc", "separator");

	//Background
	gfxLoadImage("dungeon", "background");

	//Stone wall and shelf
	gfxLoadImage("dungeon", "stone", "wall");
	gfxLoadImage("dungeon", "stone", "shelf");

	//Wall decorations, banners, wall buttons and gem slots
	gfxLoadImage("dungeon", "deco", "serpent-head");
	gfxLoadImage("dungeon", "deco", "moon-head");
	gfxLoadImage("dungeon", "deco", "dragon-head");
	gfxLoadImage("dungeon", "deco", "chaos-head");
	gfxLoadImage("dungeon", "deco", "switch", 8);
	gfxLoadImage("dungeon", "deco", "switch-off", 8);
	gfxLoadImage("dungeon", "deco", "gem", 7);
	gfxLoadImage("dungeon", "deco", "gem-off", 7);
	gfxLoadImage("dungeon", "deco", "script", 7);
	gfxLoadImage("dungeon", "deco", "banner", 7);

	//Wooden walls and doors
	gfxLoadImage("dungeon", "wood", "wall");
	gfxLoadImage("dungeon", "wood", "door");
	gfxLoadImage("dungeon", "wood", "door-open");

	//Miscellaneous
	gfxLoadImage("dungeon", "misc", "pillar");
	gfxLoadImage("dungeon", "misc", "bed");

	//Solid doors
	gfxLoadImage("dungeon", "door", "solid", 8);
	gfxLoadImage("dungeon", "door", "gate", 8);
	gfxLoadImage("dungeon", "door", "open", 8);

	//Stairs
	gfxLoadImage("dungeon", "stairs", "down");
	gfxLoadImage("dungeon", "stairs", "up");

	//Floors
	gfxLoadImage("dungeon", "floor", "pit-down");
	gfxLoadImage("dungeon", "floor", "pit-up");
	gfxLoadImage("dungeon", "floor", "switch");

	//Characters
	gfxLoadImage("character", "heads", "");
	gfxLoadImage("character", "arms", "");
	gfxLoadImage("character", "torsos", "");
	gfxLoadImage("character", "legs", "");
	gfxLoadImage("character", "minis", "");

	//Monsters
	gfxLoadImage("character", "behemoth", "");
	gfxLoadImage("character", "crab", "");
	gfxLoadImage("character", "dragon", "");
	gfxLoadImage("character", "nastyfloater", "");
	gfxLoadImage("character", "summon", "");

	//Misc
	gfxLoadImage("misc", "font", "", null);
}

function loadTowerData(t, start) {
	var id = t.id;

	if (typeof start === "boolean" && start) {
		getFileData('maps/MOD0.charstats', readSimpleDataHex, t, "championData", 32);
		getFileData('maps/heads.monsters', readSimpleData, null, "monsterHeads", 1);
		getFileData('maps/bodies.monsters', readSimpleData, null, "monsterBodies", 1);
		getFileData('maps/palette.monsters', readSimpleData, null, "monsterPalette", 20);
		getFileData('maps/tower.switches', readSimpleData, t, "towerSwitchesData", 25);
	}

	getFileData('maps/' + TOWER_NAME[id] + '.MAP', readMapData, t, "floor");
	getFileData('maps/' + TOWER_NAME[id] + '.switches', readSimpleData, t, "switches", 4);
	getFileData('maps/' + TOWER_NAME[id] + '.triggers', readSimpleData, t, "triggers", 4);
	getFileData('maps/' + TOWER_NAME[id] + '.monsters', readSimpleDataHex, t, "monsterData", 6);
}


function initData() {
	//if (gfx['character']['torsos'].width > 0 && gfx['character']['arms'].width > 0 && gfx['character']['heads'].width > 0 && gfx['character']['legs'].width > 0 && gfx['character']['minis'].width > 0 && championData.length > 0 && gfx['misc']['font'].width > 0) {
	gfx['character']['heads'].onload = getCharacterSprite(NUMBER_OF_HEADS, 'character', 'heads', 13, 13, 16);
	gfx['character']['legs'].onload = getCharacterSprite(NUMBER_OF_LEGS, 'character', 'legs', 17, 26, 17);
	gfx['character']['arms'].onload = getCharacterSprite(NUMBER_OF_ARMS, 'character', 'arms', 13, 19, 13);
	gfx['character']['minis'].onload = getCharacterSprite(NUMBER_OF_MINIS, 'character', 'minis', 13, 22, 16);
	gfx['character']['torsos'].onload = getCharacterSprite(NUMBER_OF_TORSOS, 'character', 'torsos', 17, 14, 17);

	grabFont();
	initChampions();
	initSpells();
	player[0] = new Player(0, (canvas.width - (128 * scale)) / 2, 12 * scale);
	player[1] = new Player(1, (canvas.width - (128 * scale)) / 2, 116 * scale);
	initPlayersQuickStart();
	initTowerSwitches();
	switchTower(0);
	//}
}

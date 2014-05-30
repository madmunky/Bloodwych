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
	gfxLoadImage("dungeon", "stone", "wall2");
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

	//Items
	gfxLoadImage("dungeon", "items2", "");

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
	gfxLoadImage("character", "floater", "");
	gfxLoadImage("character", "nastyfloater", "");
	gfxLoadImage("character", "summon", "");

	//Misc
	gfxLoadImage("misc", "font", "", null);
	gfxLoadImage("misc", "uistuff", "", null);
}

function loadTowerData(t, start) {
	var id = t.id;

	if (typeof start === "boolean" && start) {
		getFileData('data/charstats.data', readSimpleDataHex, t, "championData", 32);
		getFileData('data/charpockets.data', readSimpleDataHex, t, "championPocketData", 16);
		getFileData('data/heads.monsters', readSimpleData, null, "monsterHeads", 1);
		getFileData('data/bodies.monsters', readSimpleData, null, "monsterBodies", 1);
		getFileData('data/palette.monsters', readSimpleData, null, "monsterPalette", 4);
		getFileData('data/palette_meta.monsters', readSimpleData, null, "monsterPaletteMeta", 8);
		getFileData('data/tower.switches', readSimpleData, t, "towerSwitchesData", 25);
	}

	getFileData('data/' + TOWER_NAME[id] + '.MAP', readMapData, t, "floor");
	getFileData('data/' + TOWER_NAME[id] + '.switches', readSimpleData, t, "switches", 4);
	getFileData('data/' + TOWER_NAME[id] + '.triggers', readSimpleData, t, "triggers", 4);
	getFileData('data/' + TOWER_NAME[id] + '.monsters', readSimpleDataHex, t, "monsterData", 6);
	getFileData('data/' + TOWER_NAME[id] + '.ob', readSimpleData, t, "itemData", 0);
}


function initData() {
	//if (gfx['character']['torsos'].width > 0 && gfx['character']['arms'].width > 0 && gfx['character']['heads'].width > 0 && gfx['character']['legs'].width > 0 && gfx['character']['minis'].width > 0 && championData.length > 0 && gfx['misc']['font'].width > 0) {
	gfx['character']['heads'].onload = getCharacterSprite(NUMBER_OF_HEADS, 'character', 'heads', 13, 13, 16);
	gfx['character']['legs'].onload = getCharacterSprite(NUMBER_OF_LEGS, 'character', 'legs', 17, 27, 17);
	gfx['character']['arms'].onload = getCharacterSprite(NUMBER_OF_ARMS, 'character', 'arms', 13, 19, 13);
	gfx['character']['minis'].onload = getCharacterSprite(NUMBER_OF_MINIS, 'character', 'minis', 13, 22, 16);
	gfx['character']['torsos'].onload = getCharacterSprite(NUMBER_OF_TORSOS, 'character', 'torsos', 17, 14, 17);

	initMonsterGfx();
	for (var i = 0; i < 6; i++) {
		initMonsters(tower[i]);
	}
	initChampions();
	initSpells();
	player[0] = new Player(0, 96 * scale, 12 * scale, 0 * scale, 10);
	player[1] = new Player(1, 96 * scale, 116 * scale, 0 * scale, 114);
	gfxUI = grabUISprites(gfx['misc']['uistuff']);
	itemsGfxD = initItemsGfxD();
	initItemRefs();
	for (var i = 0; i < 6; i++) {
		initItems(tower[i]);
	}
	font = grabFont();
	initPlayersQuickStart();
	initTowerSwitches();
	switchTower(0);
	uiClickArea = uiClickAreas();
	//}
}

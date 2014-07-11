//var loadingIntervalTimer = 0;

function initGame() {
	$('canvas').attr('data-game-status', 'loading');
	loadGfxUIData();
	watch(gfxLoaded, "done", function(prop, action, newvalue, oldvalue) {
		if (typeof tower[towerThis] === 'undefined') {
			tower[towerThis] = new Tower(towerThis, true);
			projectile[towerThis] = new Array();
			updateLoadingScreen("Loading File Data", 30);
		}
	});

	watch(dataLoaded, "done", function(prop, action, newvalue, oldvalue) {
		if (newvalue === 1) {
			for (var i = 1; i < 6; i++) {
				tower[i] = new Tower(i);
				projectile[i] = new Array();
			}
			updateLoadingScreen("Loading Tower Data", 50);
		} else if (newvalue === 2) {
			initData();

			if (typeof game === "undefined") {
				//Run();
				startScreen();
			} else {
				//updateLoadingScreen("Starting Game", 100);
			}
		}
	});
	updateLoadingScreen("Loading Graphics", 0);
}

function updateLoadingScreen(msg, percent) {
	clearCanvas();
	ctx.font = "normal 14px \"Bookman Old Style\", verdana, sans-serif";
	ctx.fillStyle = "#FFF";
	ctx.fillText(percent + "% - " + msg + "...", 0, 15);
	//clearInterval(loadingIntervalTimer);
	//loadingIntervalTimer = setTimeout(function() {
	//	refreshLoadingScreen(msg, percent);
	//}, 10);
}

function loadGfxUIData() {
	//Misc
	gfxLoadImage("misc", "separator");
	gfxLoadImage("misc", "font", "", null);
	gfxLoadImage("misc", "uistuff", "", null);

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
}

function loadGfxData() {
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
	gfxLoadImage("dungeon", "deco", "switch", 6);
	gfxLoadImage("dungeon", "deco", "switch-off", 6);
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
	gfxLoadImage("dungeon", "floor", "path", 2);
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
		getFileData('data/scroll.data', readScrollData, t, "scrollData");
		getFileData('data/gem.switches', readSimpleData, null, "gemSwitchesData", 2);
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

	gfxUI = grabUISprites(gfx['misc']['uistuff']);
	itemsGfxD = initItemsGfxD();
	font = grabFont();
	uiClickArea = uiClickAreas();

	initMonsterGfx();
	initMonsters();

	initSpells();
	initItemRefs();
	for (var i = 0; i < 6; i++) {
		initItems(tower[i]);
	}

	initChampions();

}

function startGame(singlePlayer, quickStart, p1_cid, p2_cid, god) {
    
    	if (typeof god === "undefined") {
			god = false;
		}
    	initPlayers(singlePlayer, quickStart, p1_cid, p2_cid);

		if (god) {
			godMode();
		}
		loadGfxData();
		initTowerSwitches();
		switchTower(0);		
		gameStarted = true;
		
		for (pl in championSelect) {
			if (championSelect[pl].champID > -1) {
				champion[championSelect[pl].champID].selectedSpell = null;
				championSelect[pl].champID = -1;
			}
		}
		$('canvas').attr('data-game-status', 'started');
		//for (p in player) {
		//		player[p].message("WELCOME THEE TRAVELLER, TO THE REMAKE OF", COLOUR[COLOUR_YELLOW], true);
		//		player[p].message("   BLOODWYCH - REWRITTEN BY MAD BONE    ", COLOUR[COLOUR_YELLOW], true);
		//		player[p].message("          WWW.BLOODWYCH.CO.UK           ", COLOUR[COLOUR_YELLOW], true);
		//	}
                setTimeout(function() {Run();}, 500);
}
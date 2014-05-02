/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Tower(map) {
	var t = this;
	t.map = map;

	towerDataLoaded = {
		floor: false,
		switches: false,
		triggers: false,
		monsters: false,
		champions: false
	};
	monsterDataLoaded.watch("monsterPalette", function(prop, oldval, newval) {
		getFileData('maps/' + map + '.MAP', readMapData, t, "floor");
	});

	towerDataLoaded.watch("floor", function(prop, oldval, newval) {
		getFileData('maps/' + map + '.switches', readSimpleData, t, "switches", 4);
		getFileData('maps/' + map + '.triggers', readSimpleData, t, "triggers", 4);
	});
	towerDataLoaded.watch("triggers", function(prop, oldval, newval) {
		getFileData('maps/' + map + '.monsters', readSimpleDataHex, t, "monsterData", 6);
	});

	towerDataLoaded.watch("monsters", function(prop, oldval, newval) {
		getFileData('maps/' + map + '.charstats', readSimpleDataHex, t, "championData", 32);
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

	if (gfx['character']['torsos'].width > 0 && gfx['character']['arms'].width > 0 && gfx['character']['heads'].width > 0 && gfx['character']['legs'].width > 0 && gfx['character']['minis'].width > 0 && championData.length > 0) {
		clearInterval(imageChecker);
		gfx['character']['heads'].onload = getCharacterSprite(NUMBER_OF_HEADS, 'character', 'heads', 13, 13, 16);
		gfx['character']['legs'].onload = getCharacterSprite(NUMBER_OF_LEGS, 'character', 'legs', 17, 26, 17);
		gfx['character']['arms'].onload = getCharacterSprite(NUMBER_OF_ARMS, 'character', 'arms', 9, 18, 16);
		gfx['character']['minis'].onload = getCharacterSprite(NUMBER_OF_MINIS, 'character', 'minis', 13, 22, 16);
		gfx['character']['torsos'].onload = getCharacterSprite(NUMBER_OF_TORSOS, 'character', 'torsos', 15, 14, 16);

		initMonsters(tw);
		initChampions();
		initSpells();
		initPlayers();
		initPlayersQuickStart();

		for (var m = 0; m < monster.length; m++) {
			monster[m].getGfx();
		}

		if (typeof game === "undefined") {
			Run();
		}
	}

}

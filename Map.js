/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Tower(map) {
	var t = this;
	t.map = map;
	getFileData('maps/' + map + '.MAP', readMapData, t, "floor");

	towerDataLoaded = {
		floor: false,
		switches: false,
		triggers: false,
		monsters: false,
		champions: false
	};
	towerDataLoaded.watch("floor", function(prop, oldval, newval) {
		getFileData('maps/' + map + '.switches', readSimpleData, t, "switches", 4);
		getFileData('maps/' + map + '.triggers', readSimpleData, t, "triggers", 4);
		getFileData('maps/' + map + '.monsters', readSimpleDataHex, t, "monsterData", 6);
	});
	towerDataLoaded.watch("monsters", function(prop, oldval, newval) {
		getFileData('maps/' + map + '.charstats', readSimpleDataHex, t, "championData", 32);
		if (gfx['character']['heads'].width > 0 && !gameGfxLoaded.monsterTorsos) {
			gfx['character']['heads'].onload = getCharacterSprite(NUMBER_OF_HEADS, 'character', 'heads', 12, 12, 16);
			gfx['character']['legs'].onload = getCharacterSprite(NUMBER_OF_LEGS, 'character', 'legs', 15, 26, 16);
			gfx['character']['arms'].onload = getCharacterSprite(NUMBER_OF_ARMS, 'character', 'arms', 9, 18, 16);
			gfx['character']['people'].onload = getCharacterSprite(NUMBER_OF_WHOLEPEOPLE, 'character', 'people', 13, 22, 14);
			gfx['character']['torsos'].onload = getCharacterSprite(NUMBER_OF_TORSOS, 'character', 'torsos', 15, 14, 16);
		}
                towerDataLoaded.watch("champions", function(prop, oldval, newval) {
                            initChampions();                
                            initMonsters(t);
                            initSpells();
                            initPlayers();
                            initPlayersQuickStart();
                            for (var m = 0; m < monster.length; m++) {
                                    monster[m].getGfx();
                            }
                   
                    if (typeof game === "undefined") {
			Run();
		}
                });
	});
        
	
}

function Map(Width, Height, xOff, yOff) {
	this.Width = Width;
	this.Height = Height;
	this.yOffset = yOff;
	this.xOffset = xOff;
	this.Map = [];
}

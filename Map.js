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
		initMonsters(t);
		if (typeof game === "undefined") {
			Run();
		}
	});
	towerDataLoaded.watch("champions", function(prop, oldval, newval) {
		if (typeof champion === "undefined" || champion.length === 0) {
			initChampions();
			initPlayersQuickStart();
			for (var m = 0; m < monster.length; m++) {
				monster[m].getGfx();
			}
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

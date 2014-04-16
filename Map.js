/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Tower(map) {
	var t = this;
	t.map = map;
	getFileData('maps/' + map + '.MAP', readMapData, t, "floor");

	towerDataLoaded = { floor: false, switches: false, triggers: false, monsters: false, characters: false };
	towerDataLoaded.watch("floor", function(prop, oldval, newval) {
		getFileData('maps/' + map + '.switches', readSimpleData, t, "switches", 4);
		getFileData('maps/' + map + '.triggers', readSimpleData, t, "triggers", 4);
		getFileData('maps/' + map + '.monsters', readSimpleData, t, "monsterData", 6);
		getFileData('maps/' + map + '.charstats', readSimpleData, t, "characterData", 16);
	});
	towerDataLoaded.watch("monsters", function(prop, oldval, newval) {
		initMonsters(t);
		if(typeof game === "undefined") {
			Run();
		}
	});
}

//
//Tower.prototype.readOtherData = function() {
//	this.switches = getFileData('maps/' + this.map + '.switches', readSimpleData, 4);
//	this.triggers = getFileData('maps/' + this.map + '.triggers', readSimpleData, 4);
//	this.monsterData = getFileData('maps/' + this.map + '.monsters', readSimpleData, 6);
//	this.characterData = getFileData('maps/' + this.map + '.charstats', readSimpleData, 16);
//}

function Map(Width,Height,xOff,yOff) {
	this.Width = Width;
	this.Height = Height;
	this.yOffset = yOff;
	this.xOffset = xOff;
	this.Map = [];
}
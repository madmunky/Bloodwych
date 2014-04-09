/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Tower(map) {
	dataLoaded = { level: false, switches: false, triggers: false, monsters: false, characters: false };
	var t = this;
	t.map = map;
	getFileData('maps/' + map + '.MAP', readMapData, t, "Level");

	dataLoaded.watch("level", function(prop, oldval, newval) {
	    if(typeof game === "undefined") {
	        Run();
	    }
	    getFileData('maps/' + map + '.switches', readSimpleData, t, "Switches", 4);
	    getFileData('maps/' + map + '.triggers', readSimpleData, t, "Triggers", 4);
	    getFileData('maps/' + map + '.monsters', readSimpleData, t, "MonsterData", 6);
	    getFileData('maps/' + map + '.charstats', readSimpleData, t, "CharacterData", 16);
	});
	dataLoaded.watch("monsters", function(prop, oldval, newval) {
		initMonsters(t);
	});
}

//
//Tower.prototype.readOtherData = function() {
//	this.Switches = getFileData('maps/' + this.map + '.switches', readSimpleData, 4);
//	this.Triggers = getFileData('maps/' + this.map + '.triggers', readSimpleData, 4);
//	this.MonsterData = getFileData('maps/' + this.map + '.monsters', readSimpleData, 6);
//	this.CharacterData = getFileData('maps/' + this.map + '.charstats', readSimpleData, 16);
//}

function Map(Width,Height,xOff,yOff) {
	this.Width = Width;
	this.Height = Height;
	this.yOffset = yOff;
	this.xOffset = xOff;
	this.Map = [];
}
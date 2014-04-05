/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Tower(map) {
	this.map = map;
	getFileData('maps/' + map + '.MAP', readMapData, this, "Levels");
	getFileData('maps/' + map + '.switches', readSimpleData, this, "Switches", 4);
	getFileData('maps/' + map + '.triggers', readSimpleData, this, "Triggers", 4);
	getFileData('maps/' + map + '.monsters', readSimpleData, this, "MonsterData", 6);
	getFileData('maps/' + map + '.charstats', readSimpleData, this, "CharacterData", 16);

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

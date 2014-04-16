var MON_SPIDER = 16,
	MON_CRAB = 17;

var monster = new Array();

function Monster(id, level, type, form, floor, x, y, teamId) {
	this.id = id;
	this.level = level;
	this.type = type;
	this.form = form;
	this.teamId = teamId;
	this.floor = floor;
	this.x = x;
	this.y = y;
	this.d = 0;
}

function initMonsters(t) {
	monster.length = 0;
	var teamIdLast = -1;
	var teamDo = false;
	var xLast = 0;
	for(i = 0; i < t.monsterData.length; i++) {
		var md = t.monsterData[i];
		var level = parseInt(hex2dec(getHexToBinaryPosition(md, 24, 8)));
		var type = parseInt(hex2dec(getHexToBinaryPosition(md, 0, 4)));
		var form = parseInt(hex2dec(getHexToBinaryPosition(md, 32, 8)));
		var floor = parseInt(hex2dec(getHexToBinaryPosition(md, 4, 4)));
		var x = parseInt(hex2dec(getHexToBinaryPosition(md, 8, 8)));
		var y = parseInt(hex2dec(getHexToBinaryPosition(md, 16, 8)));
		var tid = parseInt(hex2dec(getHexToBinaryPosition(md, 40, 8)));
		var teamId = -1;
		if(tid != 255) {
			if(x != 255) {
				xLast = x;
				teamIdLast++;
			} else {
				x = xLast;
			}
			teamId = teamIdLast;
		}
		if(level != 0 || type != 0 || form != 0 || floor != 0 || x != 0 || y != 0) {
			monster[i] = new Monster(i, level, type, form, floor, x, y, teamId);
			PrintLog('Loaded monster: ' + monster[i].toString());
		}
	}
}

Monster.prototype.toString = function() {
	return '[id=' + this.id + ', level=' + this.level + ', type=' + this.type + ', form=' + this.form + ', floor=' + this.floor + ', x=' + this.x + ', y=' + this.y + ', teamId=' + this.teamId + ']';
}
function Monster(id, level, type, form, floor, x, y, d, teamId, champId) {
	this.id = id;
	this.level = level;
	this.type = type;
	this.form = form;
	this.teamId = teamId;
	this.floor = floor;
	this.x = x;
	this.y = y;
	this.d = d;
	if (level > 0) this.square = d;
	else this.square = CHAR_FRONT_SOLO;
	this.champId = -1;
	if (typeof champId !== "undefined") {
		this.champId = champId; //optional Champion ID
	}
	this.gfx = [];
}

Monster.prototype.toString = function() {
	var cha = "";
	if (this.champId !== -1) {
		cha = ', champion:' + getChampionName(this.champId) + '(' + this.champId + ')';
	}
	return '[id:' + this.id + ', level:' + this.level + ', type:' + this.type + ', form:' + this.form + ', floor:' + this.floor + ', x:' + this.x + ', y:' + this.y + ', d:' + this.d + ', square:' + this.square + ', teamId:' + this.teamId + cha + ']';
}

Monster.prototype.getGfx = function() {
	var gfx = [];
	var dirArray = [];
	for (dis = 0; dis < NUMBER_OF_DISTANCES; dis++) {
		for (dir = 0; dir < 4; dir++) {
			gfx.push(grabCharacter(this.form, dir, dis));
		}
		dirArray.push(gfx);
		gfx = [];
	}
	this.gfx = dirArray;
}

function initMonsters(t) {
	monster.length = 0;
	var teamIdLast = -1;
	var teamDo = false;
	var xLast = 0;
	for (i = 0; i < t.monsterData.length; i++) {
		var md = t.monsterData[i];
		var level = parseInt(hex2dec(getHexToBinaryPosition(md, 24, 8)));
		var type = parseInt(hex2dec(getHexToBinaryPosition(md, 0, 4)));
		var form = parseInt(hex2dec(getHexToBinaryPosition(md, 32, 8)));
		var floor = parseInt(hex2dec(getHexToBinaryPosition(md, 4, 4))) - 1;
		var x = parseInt(hex2dec(getHexToBinaryPosition(md, 8, 8)));
		var y = parseInt(hex2dec(getHexToBinaryPosition(md, 16, 8)));
		var tid = parseInt(hex2dec(getHexToBinaryPosition(md, 40, 8)));
		var teamId = -1;
		if (tid != 255) {
			if (x != 255) {
				xLast = x;
				teamIdLast++;
			} else {
				x = xLast;
			}
			teamId = teamIdLast;
		}
		if (level != 0 || type != 0 || form != 0 || floor != -1 || x != 0 || y != 0) {
			monster[i] = new Monster(i, level, type, form, floor, x, y, 0, teamId);
			PrintLog('Loaded monster: ' + monster[i].toString());
			monsterMax++;
		}
	}

	//TESTING!!! REMOVE AFTER
	monster[monsterMax] = new Monster(monsterMax, 0, 0, 27, 3, 13, 23, 3, -1); monsterMax++;
}

function getMonsterGfxOffset(pos, sub) {
	var xy = posToCoordinates(pos, 0, 0, 0);
	var offx = 0;
	var offy = 0;
	switch (sub) {
		case CHAR_FRONT_LEFT:
			offx = -43;
			offy = 4;
			break;
		case CHAR_FRONT_RIGHT:
			offx = 43;
			offy = 4;
			break;
		case CHAR_FRONT_SOLO:
			offx = 0;
			offy = 0;
			break;
		case CHAR_BACK_LEFT:
			offx = -36;
			offy = -2;
			break;
		case CHAR_BACK_RIGHT:
			offx = 36;
			offy = -2;
			break;
	}
	offx = Math.floor(offx / (xy["y"] - 1));

	var x = -Math.floor(xy["x"] / (xy["y"] - 1) * 180.0) + offx;
	var y = (xy["y"] + 1) * 3 + Math.floor(offy / (-xy["y"]));

	return {
		x: x,
		y: y
	}
}

function getMonsterDistanceByPos(pos) {
	switch (pos) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
			return CHAR_DISTANCE_DISTANT;
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
			return CHAR_DISTANCE_DISTANT;
		case 10:
		case 11:
		case 12:
			return CHAR_DISTANCE_FAR;
		case 13:
		case 14:
		case 15:
		case 16:
		case 17:
		case 18:
			return CHAR_DISTANCE_CLOSE;
			//return CHAR_DISTANCE_MID;

		default:
			return 0;
	}
}

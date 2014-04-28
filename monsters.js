function Monster(id, level, type, form, floor, x, y, d, square, teamId, champId) {
	this.id = id;
	this.level = level;
	this.type = type;
	this.form = form;
	this.teamId = teamId;
	this.floor = floor;
	this.x = x;
	this.y = y;
	this.d = d;
	this.square = (square + d) % 4;
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
        if (characterGfx.length > 0) {
            for (dis = 0; dis < NUMBER_OF_DISTANCES; dis++) {
                if (dis < 4){
                    for (dir = 0; dir < 4; dir++) {
                            gfx.push(grabCharacter(this.form, dir, dis));
                    }
                    dirArray.push(gfx);
                    gfx = [];
                }else {
                    for (dir = 0; dir < 2; dir++) {                    
                            gfx.push(grabWholeCharacter(this.form, dir, dis));                    
                    }
                    dirArray.push(gfx);
                    gfx = [];
                }
	}}
	this.gfx = dirArray;
}

Monster.prototype.canMove = function() {
	var sq = this.getSquareByDir();

	if (this.teamId === -1 || sq === CHAR_FRONT_LEFT || sq === CHAR_FRONT_RIGHT) {
		var hexThis = this.getBinaryView(18, 0, 16);
		var hexNext = this.getBinaryView(15, 0, 16);
		var objThis = getHexToBinaryPosition(hexThis, 12, 4);
		var objNext = getHexToBinaryPosition(hexNext, 12, 4);

		//Check other player
		if (getHexToBinaryPosition(hexNext, 8) == '1') {
			return false;
		}

		//Check wooden walls and doors
		if (objThis == '2' || objNext == '2') {
			//if (!this.canMoveToPosByWood(pos)) {
			//	return false;
			//}
		}

		//Check other objects
		switch (objNext) {
			case '1':
				return false; //Wall
			case '3':
				return false; //Misc
			case '5': //Doors
				if (getHexToBinaryPosition(hex, 7, 1) == '1') {
					return false;
				}
		}
	}
	return true;
}

Monster.prototype.move = function() {
	if (this.canMove()) {
		switch (this.d) {
			case 0:
				xo = 0;
				yo = -1;
				break;
			case 1:
				xo = 1;
				yo = 0;
				break;
			case 2:
				xo = 0;
				yo = 1;
				break;
			case 3:
				xo = -1;
				yo = 0;
				break;
		}
		if (this.teamId === -1) {
			this.x += xo;
			this.y += yo;
		} else {
			var sq = this.getSquareByDir();
			this.square = this.getSquareByDirNext();
			switch (sq) {
				case CHAR_FRONT_LEFT:
				case CHAR_FRONT_RIGHT:
					this.x += xo;
					this.y += yo;
					break;
				default:
					break;
			}
		}
	} else {
		this.d = (this.d + Math.floor(Math.random() * 2) * 2 + 3) % 4;
	}
}

//	CHAR_FRONT_LEFT = 0,
//	CHAR_FRONT_RIGHT = 1,
//	CHAR_BACK_RIGHT = 2,
//	CHAR_BACK_LEFT = 3,
//returns the sub square relative to the direction of the monster
Monster.prototype.getSquareByDir = function() {
	return (this.square + this.d) % 4;
}

//returns the sub square relative to the direction of the monster, if the (small) monster would move 1 step forwards
Monster.prototype.getSquareByDirNext = function() {
	switch (this.square) {
		case 0:
			switch (this.d) {
				case 0:
				case 2:
					return 3;
				case 1:
				case 3:
					return 1;
			}
			break;
		case 1:
			switch (this.d) {
				case 0:
				case 2:
					return 2;
				case 1:
				case 3:
					return 0;
			}
			break;
		case 2:
			switch (this.d) {
				case 0:
				case 2:
					return 1;
				case 1:
				case 3:
					return 3;
			}
			break;
		case 3:
			switch (this.d) {
				case 0:
				case 2:
					return 0;
				case 1:
				case 3:
					return 2;
			}
			break;
	}
}


Monster.prototype.getBinaryView = function(pos18, index, length) {
	var xy = posToCoordinates(pos18, this.x, this.y, this.d);
	try {
		return getHexToBinaryPosition(tw.floor[this.floor].Map[xy["y"]][xy["x"]], index, length);
	} catch (e) {
		return '0001';
	}
}

function initMonsters(t) {
	monster.length = 0;
	var teamIdLast = -1;
	var teamDo = false;
	var xLast = 0;
	var square = 0;
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
				square++;
			}
			teamId = teamIdLast;
		} else if (form === 21 || form === 22) {
			square = -1;
		} else {
			square = 0;
		}
		if (level != 0 || type != 0 || form != 0 || floor != -1 || x != 0 || y != 0) {
			monster[i] = new Monster(i, level, type, form, floor, x, y, 0, square, teamId);
			PrintLog('Loaded monster: ' + monster[i].toString());
			monsterMax++;
		}
	}

	//TESTING!!! REMOVE AFTER
	monster[monsterMax] = new Monster(monsterMax, 1, 0, 27, 3, 13, 23, 0, CHAR_FRONT_LEFT, 4);
	monsterMax++;
	monster[monsterMax] = new Monster(monsterMax, 1, 0, 27, 3, 13, 23, 0, CHAR_FRONT_RIGHT, 4);
	monsterMax++;
	//monster[monsterMax] = new Monster(monsterMax, 1, 0, 27, 3, 13, 23, 3, 2, 4);
	//monsterMax++;
	//monster[monsterMax] = new Monster(monsterMax, 1, 0, 27, 3, 13, 23, 3, 1, 4);
	//monsterMax++;
}

function getMonsterGfxOffset(pos, sub) {
	var xy = posToCoordinates(pos, 0, 0, 0);
	var offx = 0;
	var offy = 0;
	switch (sub) {
		case CHAR_FRONT_LEFT:
			offx = -43;
			offy = 3;
			break;
		case CHAR_FRONT_RIGHT:
			offx = 43;
			offy = 3;
			break;
		case CHAR_FRONT_SOLO:
			offx = 0;
			offy = 0;
			break;
		case CHAR_BACK_LEFT:
			offx = -35;
			offy = -2;
			break;
		case CHAR_BACK_RIGHT:
			offx = 35;
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

function getMonsterDistanceByPos(pos, sq) {
	if (pos <= 4) {
		return CHAR_DISTANCE_DISTANT;
	} else if (pos <= 9) {
		return CHAR_DISTANCE_DISTANT;
	} else if (pos <= 12) {
		return CHAR_DISTANCE_FAR;
	} else if (pos <= 15) {
		if (sq === 1) {
			return CHAR_DISTANCE_MID;
		} else {
			return CHAR_DISTANCE_CLOSE;
		}
	} else {
		return -1;
	}
}

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
	if(square > -1) {
		this.square = (square + d) % 4;
	}
	this.champId = -1;
	if (typeof champId !== "undefined") {
		this.champId = champId; //optional Champion ID
	}
	this.gfx = [];
}

Monster.prototype.toString = function() {
	var cha = "";
	var torso = "null";
	var bodyId = "null";
	if (this.champId !== -1) {
		cha = ', champion:' + getChampionName(this.champId) + '(' + this.champId + ')';
	}
	if(typeof monsterPalette[this.id] !== "undefined") {
		if(typeof monsterPalette[this.id].bodyId !== "undefined") {
			bodyId = monsterPalette[this.id].bodyId;
		}
		if(typeof monsterPalette[this.id].torso !== "undefined") {
			torso = monsterPalette[this.id].torso;
		}
	}
	return '[id:' + this.id + ', level:' + this.level + ', type:' + this.type + ', form:' + this.form + ', floor:' + this.floor + ', x:' + this.x + ', y:' + this.y + ', d:' + this.d + ', square:' + this.square + ', teamId:' + this.teamId + cha + 
	', formBodyId:' + bodyId + ', formBodyTorso:' + torso + ']';
}

Monster.prototype.getGfx = function() {
	var gfx = [];
	var dirArray = [];
	if (characterGfx.length > 0) {
		for (dis = 0; dis < NUMBER_OF_DISTANCES; dis++) {
			if (dis < 4) {
				for (dir = 0; dir < 4; dir++) {
					gfx.push(grabCharacter(this.form, dir, dis));
				}
				dirArray.push(gfx);
				gfx = [];
			} else {
				for (dir = 0; dir < 4; dir++) {
					gfx.push(grabMiniCharacter(this.form, dir, dis));
				}
				dirArray.push(gfx);
				gfx = [];
			}
		}
	} else {}
	this.gfx = dirArray;
}

Monster.prototype.canAttack = function() {
	//Check other player to attack
	if (this.champId === -1) {
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
		var hexNext = this.getBinaryView(15, 0, 16);
		if (getHexToBinaryPosition(hexNext, 8) === '1') {
			if (this.floor === player[0].floor && this.x + xo === player[0].x && this.y + yo === player[0].y) {
				PrintLog('PLAYER 1 GETS HIT BY MONSTER #' + this.id + '!');
				return 0;
			} else if (this.floor === player[1].floor && this.x + xo === player[1].x && this.y + yo === player[1].y) {
				PrintLog('PLAYER 2 GETS HIT BY MONSTER #' + this.id + '!');
				return 1;
			}
		}
		for (var m = 0; m < monster.length; m++) {
			if (monster[m].champId > -1 && this.id !== monster[m].id && this.floor === monster[m].floor && this.x + xo === monster[m].x && this.y + yo === monster[m].y) {
				PrintLog('CHAMPION ' + getChampionName(monster[m].champId) + ' GETS HIT BY MONSTER #' + this.id + '!!!');
				return 2;
			}
		}
	}
	return -1;
}

Monster.prototype.canMove = function() {
	var sq = this.getSquareByDir();

	if (this.teamId > 0 || sq === CHAR_FRONT_SOLO || sq === CHAR_FRONT_LEFT || sq === CHAR_FRONT_RIGHT) {
		var hexThis = this.getBinaryView(18, 0, 16);
		var hexNext = this.getBinaryView(15, 0, 16);
		var objThis = getHexToBinaryPosition(hexThis, 12, 4);
		var objNext = getHexToBinaryPosition(hexNext, 12, 4);


		//Check wooden walls and doors
		if (objThis === '2' || objNext === '2') {
			var moveByWood = this.canMoveByWood();
			if (moveByWood !== 1) {
				return moveByWood;
			}
		}

		//Check other objects
		switch (objNext) {
			case '1':
				return 0; //Wall
			case '3':
				return 0; //Misc
			case '5': //Doors
				if (getHexToBinaryPosition(hexNext, 7, 1) === '1') {
					return 0;
				}
		}

		//Check other player
		if (getHexToBinaryPosition(hexNext, 8) === '1') {
			return 2;
		}

		//Check other monsters
		for (var m = 0; m < monster.length; m++) {
			if (this.id !== monster[m].id && this.floor === monster[m].floor) {
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
				if (this.x + xo === monster[m].x && this.y + yo === monster[m].y) {
					return 2;
				}
			}
		}
	}
	return 1;
}

Monster.prototype.canMoveByWood = function() {
	var hexThis = this.getBinaryView(18, 0, 16); 
	var hexNext = this.getBinaryView(15, 0, 16);
	//Check the space the player is standing on
	if (getHexToBinaryPosition(hexThis, 12, 4) == '2' && getHexToBinaryPosition(hexThis, ((7 - this.d) % 4) * 2 + 1, 1) == '1') {
		if (this.champId === -1 && getHexToBinaryPosition(hexThis, 11, 1) == '0' && getHexToBinaryPosition(hexThis, ((7 - this.d) % 4) * 2, 1) === '1') {
			//a door that can be opened
			this.setBinaryView(18, ((7 - this.d) % 4) * 2 + 1, 1, '0');
			return 3;
		}
		return 0;
	}
	//Check the space the player is moving to
	if (getHexToBinaryPosition(hexNext, 12, 4) == '2' && getHexToBinaryPosition(hexNext, ((5 - this.d) % 4) * 2 + 1, 1) == '1') {
		if(this.champId === -1 && getHexToBinaryPosition(hexNext, 11, 1) == '0' && getHexToBinaryPosition(hexNext, ((5 - this.d) % 4) * 2, 1) === '1') {
			//a door that can be opened
			this.setBinaryView(15, ((5 - this.d) % 4) * 2 + 1, 1, '0');
			return 3;
		}
		return 0;
	}
	return 1;
}

Monster.prototype.move = function() {
	if (this.teamId >= 0) {
		var canMove = this.canMove();
		if (canMove === 2 && this.canAttack() > -1) return;
		if (canMove === 1) {
			if (this.rotateToPlayer()) return;
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

			if (this.teamId > 0) {
				team = this.id;
				while (typeof monster[team] !== "undefined" && this.teamId === Math.abs(monster[team].teamId)) {
					monster[team].x += xo;
					monster[team].y += yo;
					team++;
				}
			} else if (this.square === -1) {
				this.x += xo;
				this.y += yo;
			} else {
				var sq = this.getSquareByDir();
				switch (sq) {
					case CHAR_FRONT_LEFT:
					case CHAR_FRONT_RIGHT:
						this.x += xo;
						this.y += yo;
						break;
					default:
						break;
				}
				this.square = this.getSquareByDirNext();
			}
		} else if (canMove != 3) {
			if (this.rotateToPlayer()) {
				return;
			} else {
				var turn = Math.floor(Math.random() * 2) * 2 - 1;
				this.rotateTo((this.d + turn + 4) % 4);
			}
		}
	}
}

Monster.prototype.rotateToPlayer = function() {
	//Move to player
	if (this.champId === -1) {
		var rnd = Math.floor(Math.random() * 2);
		if (Math.abs(player[0].x - this.x) + Math.abs(player[0].y - this.y) < Math.abs(player[1].x - this.x) + Math.abs(player[1].y - this.y)) {
			//player 1 is closer
			if (rnd === 0) {
				if (player[0].x > this.x && (this.d === 0 || this.d === 2)) {
					this.rotateTo(1);
					return true;
				} else if (player[0].x < this.x && (this.d === 0 || this.d === 2)) {
					this.rotateTo(3);
					return true;
				} else if ((player[0].x < this.x && this.d === 1) || (player[0].x > this.x && this.d === 3)) {
					this.rotateTo(Math.floor(Math.random() * 2) * 2);
					return true;
				}
			} else if (rnd === 1) {
				if (player[0].y > this.y && (this.d === 1 || this.d === 3)) {
					this.rotateTo(2);
					return true;
				} else if (player[0].y < this.y && (this.d === 1 || this.d === 3)) {
					this.rotateTo(0);
					return true;
				} else if ((player[0].y < this.y && this.d === 2) || (player[0].y > this.y && this.d === 0)) {
					this.rotateTo(Math.floor(Math.random() * 2) * 2 + 1);
					return true;
				}
			}
		} else {
			//player 2 is closer
			if (rnd === 0) {
				if (player[1].x > this.x && (this.d === 0 || this.d === 2)) {
					this.rotateTo(1);
					return true;
				} else if (player[1].x < this.x && (this.d === 0 || this.d === 2)) {
					this.rotateTo(3);
					return true;
				} else if ((player[1].x < this.x && this.d === 1) || (player[1].x > this.x && this.d === 3)) {
					this.rotateTo(Math.floor(Math.random() * 2) * 2);
					return true;
				}
			} else if (rnd === 1) {
				if (player[1].y > this.y && (this.d === 1 || this.d === 3)) {
					this.rotateTo(2);
					return true;
				} else if (player[1].y < this.y && (this.d === 1 || this.d === 3)) {
					this.rotateTo(0);
					return true;
				} else if ((player[1].y < this.y && this.d === 2) || (player[1].y > this.y && this.d === 0)) {
					this.rotateTo(Math.floor(Math.random() * 2) * 2 + 1);
					return true;
				}
			}
		}
	}
	return false;
}

Monster.prototype.rotateTo = function(d) {
	if (this.teamId > 0) {
		var team = this.id;
		while (typeof monster[team] !== "undefined" && this.teamId === Math.abs(monster[team].teamId)) {
			sqr = d - monster[team].d;
			monster[team].d = d;
			if (monster[team].square > -1) {
				monster[team].square = (4 + monster[team].square + sqr) % 4;
			}
			team++;
		}
	} else {
		this.d = d;
	}
}

//	CHAR_FRONT_LEFT = 0,
//	CHAR_FRONT_RIGHT = 1,
//	CHAR_BACK_RIGHT = 2,
//	CHAR_BACK_LEFT = 3,
//returns the sub square relative to the direction of the monster
Monster.prototype.getSquareByDir = function() {
	if (this.square > -1) {
		return (4 + this.square - this.d) % 4;
	} else {
		return -1;
	}
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

Monster.prototype.assembleTeam = function() {

}


Monster.prototype.setBinaryView = function(pos18, index, length, to) {
	var xy = posToCoordinates(pos18, this.x, this.y, this.d);
	tw.floor[this.floor].Map[xy["y"]][xy["x"]] = setHexToBinaryPosition(tw.floor[this.floor].Map[xy["y"]][xy["x"]], index, length, to);
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
	var teamIdLast = 0;
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
		var teamId = 0;
		if (tid != 255) {
			if (x != 255) {
				xLast = x;
				teamIdLast++;
				teamId = teamIdLast;
			} else {
				x = xLast;
				square++;
				teamId = -teamIdLast;
			}
		} else if (form === 21 || form === 22) {
			square = -1;
		} else {
			square = 0;
		}
		if (level != 0 || type != 0 || form != 0 || floor != -1 || x != 0 || y != 0) {
			monster[i + 16] = new Monster(i + 16, level, type, form, floor, x, y, 0, square, teamId);
			PrintLog('Loaded monster: ' + monster[i + 16]);
			monsterMax++;
		}
	}

	//TESTING!!! REMOVE AFTER
	monster[monsterMax] = new Monster(monsterMax, 1, 0, CHA_BLODWYN, 3, 13, 23, 3, CHAR_FRONT_LEFT, 4);
	monsterMax++;
	monster[monsterMax] = new Monster(monsterMax, 1, 0, CHA_ROSANNE, 3, 13, 23, 3, CHAR_FRONT_RIGHT, -4);
	monsterMax++;
	/*monster[monsterMax] = new Monster(monsterMax, 1, 0, 25, 3, 13, 23, 3, CHAR_BACK_LEFT, -4);
	monsterMax++;
	monster[monsterMax] = new Monster(monsterMax, 1, 0, 27, 3, 13, 23, 3, CHAR_BACK_RIGHT, -4);
	monsterMax++;*/

	for(i = 0; i < monsterPaletteData.length; i++) {
		var body = CHA_BODY[monsterBodiesData[i][0]];
		monsterPalette[i] = {
			gender: CHA_GENDER_MALE,
			head: monsterHeadsData[i][0],
			leg: body.leg,
			torso: body.torso,
			arm: body.arm,
			mini: body.mini,
			headPalette: [COLOUR[monsterPaletteData[i][0]], COLOUR[monsterPaletteData[i][1]], COLOUR[monsterPaletteData[i][2]], COLOUR[monsterPaletteData[i][3]]],
			legPalette: [COLOUR[monsterPaletteData[i][4]], COLOUR[monsterPaletteData[i][5]], COLOUR[monsterPaletteData[i][6]], COLOUR[monsterPaletteData[i][7]]],
			torsoPalette: [COLOUR[monsterPaletteData[i][8]], COLOUR[monsterPaletteData[i][9]], COLOUR[monsterPaletteData[i][10]], COLOUR[monsterPaletteData[i][11]]],
			armPalette: [COLOUR[monsterPaletteData[i][12]], COLOUR[monsterPaletteData[i][13]], COLOUR[monsterPaletteData[i][14]], COLOUR[monsterPaletteData[i][15]]],
			miniPalette: [COLOUR[monsterPaletteData[i][16]], COLOUR[monsterPaletteData[i][17]], COLOUR[monsterPaletteData[i][18]], COLOUR[monsterPaletteData[i][19]]],
			bodyId: monsterBodiesData[i][0]
		};
	}
}

function getMonsterGfxOffset(pos, sub) {
	var xy = posToCoordinates(pos, 0, 0, 0);
	if(sub === CHAR_FRONT_SOLO) {
		subx = 0;
		suby = -1;
	} else if(sub === CHAR_FRONT_LEFT) {
		subx = 1;
		suby = -1;
	} else if(sub === CHAR_FRONT_RIGHT) {
		subx = -1;
		suby = -1;
	} else if(sub === CHAR_BACK_LEFT) {
		subx = 1;
		suby = 1;
	} else {
		subx = -1;
		suby = 1;
	}
	var offx = xy["x"] * 4 + subx;
	var offy = -xy["y"] * 4 + suby;

	var x = Math.round(offx * (190.0 / (offy + 6)));
	var y = Math.round(49 - 340.0 / (offy + 6));

	return {
		x: x,
		y: y
	}
}

function getMonsterDistanceByPos(pos, sq) {
	if (pos <= 4) {
		return CHAR_DISTANCE_VERY_DISTANT;
	} else if (pos <= 9) {
		return CHAR_DISTANCE_DISTANT;
	} else if (pos <= 12) {
		if (sq === 1) {
			return CHAR_DISTANCE_FAR;
		} else {
			return CHAR_DISTANCE_MID;
		}
	} else if (pos <= 15) {
		if (sq === 1) {
			return CHAR_DISTANCE_CLOSE;
		} else {
			return CHAR_DISTANCE_VERY_CLOSE;
		}
	} else {
		return -1;
	}
}

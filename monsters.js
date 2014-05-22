function Monster(id, level, type, form, tower, floor, x, y, d, square, teamId, champId) {
	this.id = id;
	this.level = level;
	this.type = type;
	this.form = form;
	this.teamId = teamId;
	this.tower = tower;
	this.floor = floor;
	this.x = x;
	this.y = y;
	this.d = d;
	this.attacking = false;
	this.attackTimer = 0;
	this.dead = false;
	if(square > CHAR_FRONT_SOLO) {
		this.square = (square + d) % 4;
	} else {
		this.square = CHAR_FRONT_SOLO;
	}
	this.champId = -1;
	if (typeof champId !== "undefined") {
		this.champId = champId; //optional Champion ID
		this.hp = 0;
	} else {
		this.hp = level * 10 + 25;
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
	return '[id:' + this.id + ', level:' + this.level + ', type:' + this.type + ', form:' + this.form + ', tower:' + this.tower + ', floor:' + this.floor + ', x:' + this.x + ', y:' + this.y + ', d:' + this.d + ', square:' + this.square + ', hp:' + this.hp + ', teamId:' + this.teamId + ', teamSize:' + getMonsterTeam(this.teamId).length + cha + ']';
}

Monster.prototype.getGfx = function() {
	if (characterGfx.length > 0) {
		if(this.form >= 101) {
			var level = Math.floor(this.level / 3);
			this.gfx = grabMonster(this);
		} else {
			var dGfx = [];
			var disGfx = [];
			for(part = 0; part < 5; part++) {
				for (dis = 0; dis < NUMBER_OF_DISTANCES; dis++) {
					for (d = 0; d < 8; d++) {
						if(d < 4 || part === IMAGE_CHA_ARM) { //arms have four more 'directions': 2 front attack arms and 2 side attack arms
							dGfx.push(grabCharacter(this, part, d, dis));
						}
					}
					disGfx.push(dGfx);
					dGfx = [];
				}
				this.gfx.push(disGfx);
				disGfx = [];
			}
		}
	}
}

Monster.prototype.canInteract = function() {
	//Check other player to attack
	ply = -1;
	if(this.floor === player[0].floor && this.x + xy.x === player[0].x && this.y + xy.y === player[0].y) {
		ply = 0;
	} else if(this.floor === player[1].floor && this.x + xy.x === player[1].x && this.y + xy.y === player[1].y) {
		ply = 1;
	}
	if(this.isAgressive()) { //enemy
		xy = getOffsetByRotation(this.d);
		var hexNext = this.getBinaryView(15, 0, 16);
		if (getHexToBinaryPosition(hexNext, 8) === '1') {
			if (ply > -1) {
				//attack player
				this.attack(true, player[ply]);
				return ply;
			}
		}
		var mon = getMonsterAt(this.floor, this.x + xy.x, this.y + xy.y);

		if (mon.champId > -1) {
			//attack champion
			this.attack(true, mon);
			return 2;
		} else if(this.teamId === 0 && this.square > CHAR_FRONT_SOLO) {
			//interact with other monster, only monsters without a team can team up
			return this.assembleTeamWith(mon);
		}
	} else if(this.champId > -1) { //champion

	} else { //vendor
		return ply;
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
		var xy = getOffsetByRotation(this.d);
		if(getMonsterAt(this.floor, this.x + xy.x, this.y + xy.y) !== null) {
			return 2;
		}
	}
	return 1;
}

Monster.prototype.assembleTeamWith = function(m) {
	if(m.square != CHAR_FRONT_SOLO) {
		if(m.teamId === 0) { //create a new team
			monsterTeamIdMax++;
			m.teamId = monsterTeamIdMax;
			this.teamId = -monsterTeamIdMax;
		} else {
			if (getMonsterTeam(m.teamId).length === 4) { //full team
				return -1;
			} else { //join existing team
				this.teamId = -Math.abs(m.teamId);
			}
		}
		updateMonsterTeam(this.teamId);
		return 3;
	}
	return -1;
}

Monster.prototype.canMoveByWood = function() {
	var hexThis = this.getBinaryView(18, 0, 16); 
	var hexNext = this.getBinaryView(15, 0, 16);
	//Check the space the player is standing on
	if (getHexToBinaryPosition(hexThis, 12, 4) == '2' && getHexToBinaryPosition(hexThis, ((7 - this.d) % 4) * 2 + 1, 1) == '1') {
		if (this.isAgressive() && getHexToBinaryPosition(hexThis, 11, 1) == '0' && getHexToBinaryPosition(hexThis, ((7 - this.d) % 4) * 2, 1) === '1') {
			//a door that can be opened
			this.setBinaryView(18, ((7 - this.d) % 4) * 2 + 1, 1, '0');
			return 3;
		}
		return 0;
	}
	//Check the space the player is moving to
	if (getHexToBinaryPosition(hexNext, 12, 4) == '2' && getHexToBinaryPosition(hexNext, ((5 - this.d) % 4) * 2 + 1, 1) == '1') {
		if(this.isAgressive() && getHexToBinaryPosition(hexNext, 11, 1) == '0' && getHexToBinaryPosition(hexNext, ((5 - this.d) % 4) * 2, 1) === '1') {
			//a door that can be opened
			this.setBinaryView(15, ((5 - this.d) % 4) * 2 + 1, 1, '0');
			return 3;
		}
		return 0;
	}
	return 1;
}

Monster.prototype.move = function() {
	if (!this.dead && this.teamId >= 0 && !this.isRecruited()) {
		this.attack(false);
		var canMove = this.canMove();
		if (canMove === 2 && this.canInteract() > -1) return;
		if (canMove === 1) {
			if (this.rotateToPlayer()) return;
			xy = getOffsetByRotation(this.d);
			if (this.teamId > 0) {
				this.x += xy.x;
				this.y += xy.y;
				updateMonsterTeam(this.teamId);
			} else if (this.square === CHAR_FRONT_SOLO) {
				this.x += xy.x;
				this.y += xy.y;
			} else {
				var sq = this.getSquareByDir();
				switch (sq) {
					case CHAR_FRONT_LEFT:
					case CHAR_FRONT_RIGHT:
						this.x += xy.x;
						this.y += xy.y;
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

Monster.prototype.attack = function(attack, target) {
	if(attack) {
		var combat = calculateAttack(this, target);
        for (com = 0; com < combat.length; com++) {
            var att = combat[com].attacker;
            var def = combat[com].defender;
            var pwr = combat[com].power;
			att.attacking = true;
			att.doDamageTo(def, pwr);
			if (def instanceof Champion) {
				PrintLog('MONSTER #' + att.id + ' HITS CHAMPION ' + getChampionName(def.id) + ' FOR ' + pwr + '!');
			} else if (def instanceof Monster) {
				PrintLog('MONSTER #' + att.id + ' HITS HITS MONSTER #' + def.id + ' FOR ' + pwr + '!');
			}
		}
	} else {
		var team = getMonsterTeam(this.teamId);
		this.attacking = false;
		for(i = 1; i < team.length; i++) {
			team[i].attacking = false;
		}
	}
}

Monster.prototype.doDamageTo = function(def, dmg) {
	if(def instanceof Champion) {
		def.getDamage(dmg);
	} else if(def instanceof Monster) {
		def.getDamage(dmg);
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
	this.d = d;
	updateMonsterTeam(this.teamId);
}

//	CHAR_FRONT_LEFT = 0,
//	CHAR_FRONT_RIGHT = 1,
//	CHAR_BACK_RIGHT = 2,
//	CHAR_BACK_LEFT = 3,
//returns the sub square relative to the direction of the monster
Monster.prototype.getSquareByDir = function() {
	if (this.square > CHAR_FRONT_SOLO) {
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

Monster.prototype.getChampion = function() {
	if(this.champId > -1) {
		return champion[this.champId];
	}
	return null;
}

Monster.prototype.isRecruited = function() {
	if(this.champId > -1) {
		return champion[this.champId].recruitment.recruited;
	}
	return false;
}

Monster.prototype.isAgressive = function() {
	if(this.champId > -1 || this.form === 21 || this.form === 22) {
		return false;
	}
	return true;
}

Monster.prototype.getDamage = function(dmg) {
	this.hp -= dmg;
	if(this.hp <= 0) {
		this.die();
	}
}

Monster.prototype.die = function() {
	this.dead = true;
	this.attacking = false;
	this.hp = 0;
	updateMonsterTeam(this.teamId);
}

Monster.prototype.setBinaryView = function(pos18, index, length, to) {
	var xy = posToCoordinates(pos18, this.x, this.y, this.d);
	tower[towerThis].floor[this.floor].Map[xy.y][xy.x] = setHexToBinaryPosition(tower[towerThis].floor[this.floor].Map[xy.y][xy.x], index, length, to);
}
Monster.prototype.getBinaryView = function(pos18, index, length) {
	var xy = posToCoordinates(pos18, this.x, this.y, this.d);
	try {
		return getHexToBinaryPosition(tower[towerThis].floor[this.floor].Map[xy.y][xy.x], index, length);
	} catch (e) {
		return '0001';
	}
}

function initMonsters(t) {
	monster[t.id] = new Array();
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
		if (level != 0 || type != 0 || form != 0 || floor != -1 || x != 0 || y != 0) {
			if (tid != 255) {
				if (x != 255) {
					xLast = x;
					monsterTeamIdMax++;
					teamId = monsterTeamIdMax;
				} else {
					x = xLast;
					square++;
					teamId = -monsterTeamIdMax;
				}
			} else if (form === 21 || form === 22) {
				square = -1;
			} else {
				square = 0;
			}
			monster[t.id][i] = new Monster(i, level, type, form, t.id, floor, x, y, 0, square, teamId);
			PrintLog('Loaded monster: ' + monster[t.id][i]);
		}
	}

	//TESTING!!! REMOVE AFTER
	if(t.id === TOWER_MOD0) {
		var max = monster[t.id].length;
		monster[t.id][max] = new Monster(max, 0, 0, 101, t.id, 3, 12, 18, 3, CHAR_FRONT_LEFT, 0);
		max++;
		monster[t.id][max] = new Monster(max, 3, 0, 101, t.id, 3, 14, 18, 2, CHAR_BACK_RIGHT, 0);
		max++;
		monster[t.id][max] = new Monster(max, 6, 0, 101, t.id, 3, 13, 16, 1, CHAR_BACK_LEFT, 0);
		max++;
		monster[t.id][max] = new Monster(max, 9, 0, 107, t.id, 3, 13, 20, 0, CHAR_FRONT_RIGHT, 0);
		max++;
		//monster[t.id][max] = new Monster(max, 1, 0, 27, t.id, 3, 13, 23, 3, CHAR_BACK_RIGHT, -4);
		//max++;
	}

	for(i = 0; i < 7; i++) {
		monsterBigPalette[i] = new Array();                
		for(j = 0; j < 14; j++) { //palettes
			var k = 430 + j;
			monsterBigPalette[i][j] = [COLOUR[monsterPaletteData[k][0]], COLOUR[monsterPaletteData[k][1]], COLOUR[monsterPaletteData[k][2]], COLOUR[monsterPaletteData[k][3]]];                        
		}
	}

	for(i = 0; i < monsterBodiesData.length; i++) {
		var body = CHA_BODY[monsterBodiesData[i][0]];
		var j = i * 5;
		monsterPalette[i] = {
			gender: CHA_GENDER_MALE,
			head: monsterHeadsData[i][0],
			leg: body.leg,
			torso: body.torso,
			arm: body.arm,
			mini: body.mini,
			headPalette: [COLOUR[monsterPaletteData[j][0]], COLOUR[monsterPaletteData[j][1]], COLOUR[monsterPaletteData[j][2]], COLOUR[monsterPaletteData[j][3]]],
			legPalette: [COLOUR[monsterPaletteData[j+1][0]], COLOUR[monsterPaletteData[j+1][1]], COLOUR[monsterPaletteData[j+1][2]], COLOUR[monsterPaletteData[j+1][3]]],
			torsoPalette: [COLOUR[monsterPaletteData[j+2][0]], COLOUR[monsterPaletteData[j+2][1]], COLOUR[monsterPaletteData[j+2][2]], COLOUR[monsterPaletteData[j+2][3]]],
			armPalette: [COLOUR[monsterPaletteData[j+3][0]], COLOUR[monsterPaletteData[j+3][1]], COLOUR[monsterPaletteData[j+3][2]], COLOUR[monsterPaletteData[j+3][3]]],
			miniPalette: [COLOUR[monsterPaletteData[j+4][0]], COLOUR[monsterPaletteData[j+4][1]], COLOUR[monsterPaletteData[j+4][2]], COLOUR[monsterPaletteData[j+4][3]]],
			bodyId: monsterBodiesData[i][0]
		};
	}

}

//Gets the (leader) monster at floor, x, y
function getMonsterAt(floor, x, y) {
	mon = getMonstersInTower(towerThis);
    for (m in mon) {
    	if (!mon[m].dead && mon[m].teamId >= 0 && mon[m].floor === floor && mon[m].x === x && mon[m].y === y) {
    		return mon[m];
    	}
    }
    return null;
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
	var offx = xy.x * 4 + subx;
	var offy = -xy.y * 4 + suby;

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

//Returns the number of members in this monster's team
function getMonsterTeam(id) {
	var team = new Array();
	if(id != 0) {
		for (var m = 0; m < monster[towerThis].length; m++) {
			if(typeof monster[towerThis][m] !== "undefined" && !monster[towerThis][m].dead) {
				if(monster[towerThis][m].teamId === Math.abs(id)) {
					team.unshift(monster[towerThis][m]);
				} else if(monster[towerThis][m].teamId === -Math.abs(id)) {
					team.push(monster[towerThis][m]);
				}
			}
		}
	}
	return team;
}

function updateMonsterTeam(id) {
	if(id != 0) {
		var team = getMonsterTeam(id);
		leader = team[0];
		if(team.length > 1) {
			leader.square = leader.d;
			leader.teamId = Math.abs(id);
			var s = 1;
			for(i = 1; i < team.length; i++) {
				team[i].x = leader.x;
				team[i].y = leader.y;
				team[i].d = leader.d;
				team[i].square = (leader.d + s) % 4;
				team[i].teamId = -Math.abs(id);
				s++;
			}
		} else {
			leader = team[0];
			leader.teamId = 0;
		}
	}
}

//returns a list of monsters on this tower. Includes champions on this tower
function getMonstersInTower(id) {
	var mon = monster[id].slice();
	for(m = 0; m < monster[TOWER_CHAMPIONS].length; m++) {
		if(monster[TOWER_CHAMPIONS][m].tower === id) {
			mon.push(monster[TOWER_CHAMPIONS][m]);
		}
	}
	return mon;
}
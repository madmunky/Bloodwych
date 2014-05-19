function Player(id, PortX, PortY,ScreenX,ScreenY) {
	this.id = id;
	this.champion = new Array();        
	this.x = 0; //posX;
	this.y = 0; //posY;
	this.floor = 0; //floor;
	this.d = 0; //d;
	this.PortalX = PortX;
	this.PortalY = PortY;
	this.Portal = null;
        this.ScreenX = ScreenX;
        this.ScreenY = ScreenY;
        this.Action = null;
        this.Hand = null;
	this.lastX = 0;
	this.lastY = 0;
	this.lastFloor = 0;
	this.lastTower = towerThis;
	this.moving = 0; //0 = Forward,1 = Right, 2 = Backwards, 3 = Left
	this.towerSwitches = new Array();
        this.uiRightPanel = { activePocket: 0, view: UI_RIGHT_PANEL_MAIN};
        this.uiLeftPanel = { champs: new Array(true,false,false,false), mode: LEFT_PANEL_MODE_STATS };
        this.communication = [];
}

Player.prototype.getViewPortal = function() {

	var Portal = document.createElement('canvas');
	Portal.width = 128 * scale;
	Portal.height = 76 * scale;
	Portal.getContext("2d").imageSmoothingEnabled = false;
	Portal.getContext("2d").webkitImageSmoothingEnabled = false;
	Portal.getContext("2d").mozImageSmoothingEnabled = false;
	Portal.getContext("2d").oImageSmoothingEnabled = false;
	Portal.getContext("2d").font = "bold 20px Calibri";
	this.Portal = Portal.getContext("2d");

};

Player.prototype.canMoveToPos = function(pos) {
	//Check other player
	var view = this.getView();
	var hex = view[pos];
	if (getHexToBinaryPosition(hex, 8) == '1') {
		return false;
	}

	var objThis = getHexToBinaryPosition(view[18], 12, 4);
	var objNext = getHexToBinaryPosition(hex, 12, 4);

	//Check wooden walls and doors
	if (objThis == '2' || objNext == '2') {
		if (!this.canMoveToPosByWood(pos)) {
			return false;
		}
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
	return true;
}

Player.prototype.canMoveToPosByWood = function(pos) {
	var view = this.getView();
	var hex = this.getView()[pos];
	//Check the space the player is standing on
	if (getHexToBinaryPosition(view[18], 12, 4) == '2' && getHexToBinaryPosition(view[18], ((7 - ((this.d + this.moving) % 4)) % 4) * 2 + 1, 1) == '1') {
		return false;
	}
	//Check the space the player is moving to
	if (getHexToBinaryPosition(hex, 12, 4) == '2' && getHexToBinaryPosition(hex, ((5 - ((this.d + this.moving) % 4)) % 4) * 2 + 1, 1) == '1') {
		return false;
	}
	return true;
}

Player.prototype.changeUpFloor = function() {

	//In bloodwych when the player moves floors they also moved 2 places forward
	//This function changes the players floor and moves the player forward 2x spaces

	this.floor++;
	if (this.floor > tower[towerThis].length) {
		this.floor = 0;
	} else {
		this.move(DIRECTION_NORTH);
		this.move(DIRECTION_NORTH);
	}

};

Player.prototype.changeDownFloor = function() {

	//In bloodwych when the player moves floors they also moved 2 places forward
	//This function changes the players floor and moves the player forward 2x spaces

	this.floor--;
	if (this.floor < tower[towerThis].length) {
		this.floor = tower[towerThis].length;
	} else {
		this.move(DIRECTION_NORTH);
		this.move(DIRECTION_NORTH);
	}
};

//Take the map code which is in front of the player and see if the player can interact with it.
Player.prototype.action = function() {
	//Wooden doors (in front of player)
	if (this.getBinaryView(15, 12, 4) == '2' && this.getBinaryView(15, ((5 - this.d) % 4) * 2) == '1') {
		this.setBinaryView(15, ((5 - this.d) % 4) * 2 + 1, 1);
	}
	//Wooden doors (on player)
	if (this.getBinaryView(18, 12, 4) == '2' && this.getBinaryView(18, ((7 - this.d) % 4) * 2) == '1') {
		this.setBinaryView(18, ((7 - this.d) % 4) * 2 + 1, 1);
	}
	//Wall switches
	if (this.getBinaryView(15, 0, 4) != '0' && this.getBinaryView(15, 8) == '1' && this.getBinaryView(15, 6, 2) == '2') {
		this.setBinaryView(15, 5, 1);
		switchAction(parseInt(getHexToBinaryPosition(this.getView()[15], 0, 5), 16).toString(10), this);
	}
	//Check if something is in the way
	if(this.getMonstersInRange(15).length > 0) {
		return false;
	}
	//Doors
	if (this.getBinaryView(15, 12, 4) == '5' && this.getBinaryView(15, 4) == '0') {
		this.setBinaryView(15, 7, 1);
		//this.setBinaryView(15, 1, '000'); //Will set the door to 'normal'
	}
	return true;
};

Player.prototype.toggleFrontObject = function() {
	if (debug) {
		this.setBinaryView(15, 12, 1);
	}
}

//Sets a binary index on a hexadecimal string to a certain binary flag
//'to' will be a binary string, e.g. '1010'
Player.prototype.setBinaryView = function(pos18, index, length, to) {
	var xy = posToCoordinates(pos18, this.x, this.y, this.d);
	tower[towerThis].floor[this.floor].Map[xy.y][xy.x] = setHexToBinaryPosition(tower[towerThis].floor[this.floor].Map[xy.y][xy.x], index, length, to);
	//this.updateView();
}

Player.prototype.getBinaryView = function(pos18, index, length) {
	var xy = posToCoordinates(pos18, this.x, this.y, this.d);
	try {
		return getHexToBinaryPosition(tower[towerThis].floor[this.floor].Map[xy.y][xy.x], index, length);
	} catch (e) {
		return '0001';
	}
}

Player.prototype.setMovementData = function() {
	tower[this.lastTower].floor[this.lastFloor].Map[this.lastY][this.lastX] = setHexToBinaryPosition(tower[this.lastTower].floor[this.lastFloor].Map[this.lastY][this.lastX], 8, 1, '0');
	this.setBinaryView(18, 8, 1, '1');
	//player[1].setBinaryView(18, 8, 1, '1');
	this.lastX = this.x;
	this.lastY = this.y;
	this.lastFloor = this.floor;
	this.lastTower = towerThis;
};

Player.prototype.rotateTo = function(d) {
	this.d = (d + 4) % 4;
	this.doEvent(false);
};

Player.prototype.move = function(d) {
	this.moving = d;
	this.lastX = this.x;
	this.lastY = this.y;
	var viewIndex = [15, 16, 19, 17];
	if (this.canMoveToPos(viewIndex[d])) {
		xy = getOffsetByRotation((this.d + d) % 4);
		this.x = this.x + xy.x;
		this.y = this.y + xy.y;
		if (debug) {
			//PrintLog("Player Moved " + getDirection(this.d));
		}
		this.setMovementData();
		this.doEvent(true);
	} else if(d === 2) { //check current square when moving backward
		this.doEvent(false);
	}
};

Player.prototype.getView = function() {
	//This function takes the map file and stores the 20 positions required 
	//to either draw the players view or objects which the player are likely to interact with
	//like standing on a presure pad or stairs or if there is a door infront of the player etc..
	view = [];
	for (pos = 0; pos < 20; pos++) {
		try {
			var xy = posToCoordinates(pos, this.x, this.y, this.d);
			var newView = tower[towerThis].floor[this.floor].Map[xy.y][xy.x];
			if (typeof newView === "undefined") {
				newView = '0001';
			}
		} catch (e) {
			newView = '0001';
		}
		view.push(newView);
	}
	return view;
}

//mr = true : player moves
//mr = false: player rotates
Player.prototype.doEvent = function(mr) {
	//this.setMovementData();
	var view = this.getView();
	switch (parseInt(view[18].substring(3, 4), 16)) {

		case 4:
			this.doStairs();
			break;
		case 6:
			if (mr) floorActionType(tower[towerThis].triggers[parseInt(getHexToBinaryPosition(view[18], 0, 5), 16).toString(10)], this);
			break;
		default:
			break;
	}
	this.updateChampions();
	//this.updateView();
};

Player.prototype.doPit = function() {
	floor = this.floor - 1;
	fOff = getTowerFloorOffset(this.floor, floor);
	x = this.x + fOff.x;
	y = this.y + fOff.y;
	this.setPlayerPosition(floor, x, y);
}

Player.prototype.doStairs = function() {
	var ud = parseInt(this.getBinaryView(18, 7), 10);
	var d = (parseInt(this.getBinaryView(18, 5, 2), 10) + 2) % 4;
	var floor = this.floor + 1 - (ud % 2) * 2;
	var fOff = getTowerFloorOffset(this.floor, floor);
	var off = getOffsetByRotation(d);
	var x = this.x + fOff.x + off.x * 2;
	var y = this.y + fOff.y + off.y * 2;
	this.setPlayerPosition(floor, x, y, d);
}

Player.prototype.setPlayerPosition = function(floor, x, y, d) {
	this.floor = floor;
	if (typeof x !== "undefined") this.x = x;
	if (typeof y !== "undefined") this.y = y;
	if (typeof d !== "undefined") this.d = d;
	this.setMovementData();
	//this.updateView();
}

Player.prototype.updateChampions = function() {
	for (c = 0; c < this.champion.length; c++) {
		champion[this.champion[c]].monster.tower = towerThis;
		champion[this.champion[c]].monster.floor = this.floor;
		champion[this.champion[c]].monster.x = this.x;
		champion[this.champion[c]].monster.y = this.y;
		champion[this.champion[c]].monster.d = this.d;
		if(this.champion.length === 1) {
			champion[this.champion[c]].monster.square = -1
		} else {
			champion[this.champion[c]].monster.square = (this.d + c) % 4;
		}
	}
}

Player.prototype.recruitChampion = function(id) {
	if(this.champion.length < 4) {
		this.champion[this.champion.length] = id;
		champion[id].recruited = true;
		return true;
	}
	return false;
}

//loc = location number (0-3)
Player.prototype.getChampion = function(loc) {
	if (this.champion[loc] > -1) {
		return champion[this.champion[loc]];
	}
	return null;
}

//Returns a list of monsters and their distance pos relative to the player
//pos2 : when defined it only lists the monsters on this square
Player.prototype.getMonstersInRange = function(pos2) {
	var p = this;
	var monstersInRange = [];
	var pos = -1;
	mon = getMonstersInTower(towerThis);
	for(m in mon) {
		if (p.floor === mon[m].floor) {
			pos = coordinatesToPos(mon[m].x, mon[m].y, p.x, p.y, p.d);
			var sq = CHAR_FRONT_SOLO;
			var sq2 = 0;
			if (mon[m].square > CHAR_FRONT_SOLO) {
				sq = (6 + mon[m].square - p.d) % 4;
				sq2 = (sq === CHAR_FRONT_LEFT || sq === CHAR_FRONT_RIGHT) ? 0 : 1; //extra check for really close-by monsters
			}
			if (mon[m].floor == p.floor && pos > -1 && (typeof pos2 === "undefined" || pos2 === pos)) {
				if (sq2 == 1) {
					monstersInRange.unshift({
						monster: mon[m],
						position: pos,
						distance: getMonsterDistanceByPos(pos, sq2),
						gfxCoord: getMonsterGfxOffset(pos, sq),
						square: sq2
					});
				} else {
					monstersInRange.push({
						monster: mon[m],
						position: pos,
						distance: getMonsterDistanceByPos(pos, sq2),
						gfxCoord: getMonsterGfxOffset(pos, sq),
						square: sq2
					});
				}
			}
		}
	}
	return monstersInRange;
}


Player.prototype.drawMonster = function(m, distance, offset) {
	var form = m.form;
	//var loc = characterSpriteLocation();
	var p = this;

	if (typeof monsterPalette[form] !== "undefined") {
		drawCharacter(m, (6 + p.d - m.d) % 4, distance, this, offset);
	}
}

Player.prototype.testMode = function(id) {
	if (debug) {
		//var xy = posToCoordinates(15, this.x, this.y, this.d);
		//var hex = tower[towerThis].floor[this.floor].Map[xy.y][xy.x];
		//tower[towerThis].floor[this.floor].Map[xy.y][xy.x] = setHexToBinaryPosition(hex, 8, 8, '0'); //REMOVE OBJECT
		//tower[towerThis].floor[this.floor].Map[xy.y][xy.x] = toggleObject(hex, '3'); //TOGGLE PILLAR
		//tower[towerThis].floor[this.floor].Map[xy.y][xy.x] = setHexToBinaryPosition(hex, 10, 2, '' + ((parseInt(getHexToBinaryPosition(hex, 10, 2)) + 1) % 4)); //ROTATE WALL
		//tower[towerThis].floor[this.floor].Map[xy.y][xy.x] = bin2hex(hex2bin(hex).substring(2, 8) +  hex2bin(hex).substring(0, 2) + hex2bin(hex).substring(8, 16)); //ROTATE WOODEN WALL
		try {
			var view = this.getView();
			for (i = 0; i < 17; i++) {
				var t = view[i].substring(2, 4);
				if (view[i].substring(2, 4) === "80") {
					window.alert("Distance: " + getMonsterDistanceByPos(i) + " Code: " + view[i]);
				}
			}
		} catch (e) {
			PrintLog(e.toString());
		};
	}
}

function initPlayersQuickStart() {
	for (i = 0; i < 4; i++) {
		player[0].recruitChampion(i);
		player[1].recruitChampion(i + 4);
	}
        player[0].currentChamp = 0;
        player[1].currentChamp = 4;
}



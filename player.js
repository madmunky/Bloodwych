function Player(id, posX, posY, floor, rotation, PortX, PortY) {
	this.id = id;
	this.champion = new Array();
	for (i = 0; i < 4; i++) {
		this.champion[i] = -1;
	}
	this.x = posX;
	this.y = posY;
	this.floor = floor;
	this.Rotation = rotation;
	this.PortalX = PortX;
	this.PortalY = PortY;
        this.Portal = null;
	this.View = [];
	this.lastX = posX;
	this.lastY = posY;
	this.lastFloor = floor;
	this.moving = 0; //0 = Forward,1 = Right, 2 = Backwards, 3 = Left

	try {
		this.setBinaryView(18, 8, 1, '1');
		//tw.floor[this.floor].Map[this.y][this.x] = tw.floor[this.floor].Map[this.y][this.x].replaceAt(2,"8");
	} catch (c) {};
}

Player.prototype.getViewPortal = function() {
	
          var Portal = document.createElement('canvas');
          Portal.width = 128 * scale;
          Portal.height = 74 * scale;
          Portal.getContext("2d").imageSmoothingEnabled = false;
          Portal.getContext("2d").webkitImageSmoothingEnabled = false;
          Portal.getContext("2d").mozImageSmoothingEnabled = false;
          Portal.getContext("2d").oImageSmoothingEnabled = false;
          Portal.getContext("2d").font = "bold 20px Calibri";
          this.Portal = Portal.getContext("2d");
          
};

Player.prototype.canMoveToPos = function(pos) {
	//Check other player
	var hex = this.View[pos];
	if (getHexToBinaryPosition(hex, 8) == '1') {
		return false;
	}

	var objThis = getHexToBinaryPosition(this.View[18], 12, 4);
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
	var hex = this.View[pos];
	//Check the space the player is standing on
	if (getHexToBinaryPosition(this.View[18], 12, 4) == '2' && getHexToBinaryPosition(this.View[18], ((7 - ((this.Rotation + this.moving) % 4)) % 4) * 2 + 1, 1) == '1') {
		return false;
	}
	//Check the space the player is moving to
	if (getHexToBinaryPosition(hex, 12, 4) == '2' && getHexToBinaryPosition(hex, ((5 - ((this.Rotation + this.moving) % 4)) % 4) * 2 + 1, 1) == '1') {
		return false;
	}
	return true;
}

Player.prototype.changeUpFloor = function() {

	//In bloodwych when the player moves floors they also moved 2 places forward
	//This function changes the players floor and moves the player forward 2x spaces

	this.floor++;
	if (this.floor > tw.length) {
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
	if (this.floor < tw.length) {
		this.floor = tw.length;
	} else {
		this.move(DIRECTION_NORTH);
		this.move(DIRECTION_NORTH);
	}
};

//Take the map code which is in front of the player and see if the player can interact with it.
Player.prototype.action = function() {
	//Doors
	if (this.getBinaryView(15, 12, 4) == '5' && this.getBinaryView(15, 4) == '0') {
		this.setBinaryView(15, 7, 1);
		//this.setBinaryView(15, 1, '000'); //Will set the door to 'normal'
	}
	//Wall switches
	if (this.getBinaryView(15, 0, 4) != '0' && this.getBinaryView(15, 8) == '1' && this.getBinaryView(15, 6, 2) == '2') {
		this.setBinaryView(15, 5, 1);
		switchAction(0, parseInt(getHexToBinaryPosition(this.View[15], 0, 5), 16).toString(10), this);
	}
	//Wooden doors (in front of player)
	if (this.getBinaryView(15, 12, 4) == '2' && this.getBinaryView(15, ((5 - this.Rotation) % 4) * 2) == '1') {
		this.setBinaryView(15, ((5 - this.Rotation) % 4) * 2 + 1, 1);
	}
	//Wooden doors (on player)
	if (this.getBinaryView(18, 12, 4) == '2' && this.getBinaryView(18, ((7 - this.Rotation) % 4) * 2) == '1') {
		this.setBinaryView(18, ((7 - this.Rotation) % 4) * 2 + 1, 1);
	}
};

Player.prototype.toggleFrontObject = function() {
	if (debug) this.setBinaryView(15, 12, 1);
}

//Sets a binary index on a hexadecimal string to a certain binary flag
//'to' will be a binary string, e.g. '1010'
Player.prototype.setBinaryView = function(pos18, index, length, to) {
	var xy = posToCoordinates(pos18, this.x, this.y, this.Rotation);
	tw.floor[this.floor].Map[xy["y"]][xy["x"]] = setHexToBinaryPosition(tw.floor[this.floor].Map[xy["y"]][xy["x"]], index, length, to);
}

Player.prototype.getBinaryView = function(pos18, index, length) {
	var xy = posToCoordinates(pos18, this.x, this.y, this.Rotation);
	try {
		return getHexToBinaryPosition(tw.floor[this.floor].Map[xy["y"]][xy["x"]], index, length);
	} catch (e) {
		return '0001';
	}
}

Player.prototype.setMovementData = function() {
	tw.floor[this.lastFloor].Map[this.lastY][this.lastX] = setHexToBinaryPosition(tw.floor[this.lastFloor].Map[this.lastY][this.lastX], 8, 1, '0');
	player[0].setBinaryView(18, 8, 1, '1');
	player[1].setBinaryView(18, 8, 1, '1');
	this.lastX = this.x;
	this.lastY = this.y;
	this.lastFloor = this.floor;
};

Player.prototype.rotateTo = function(d) {
	this.Rotation = (d + 4) % 4;
	this.doEventSquare(false);
};

Player.prototype.move = function(d) {
	this.moving = d;
	this.lastX = this.x;
	this.lastY = this.y;
	var viewIndex = [15, 16, 19, 17];
	if (this.canMoveToPos(viewIndex[d])) {
		xy = getOffsetByRotation((this.Rotation + d) % 4);
		this.x = this.x + xy['x'];
		this.y = this.y + xy['y'];
		if (debug) {
			PrintLog("Player Moved " + getDirection(this.Rotation));
		}
		this.doEvent();
		this.setMovementData();
	}
};

Player.prototype.updateView = function(m) {
	//m = Map Data
	//This function takes the map file and stores the 20 positions required 
	//to either draw the players view or objects which the player are likely to interact with
	//like standing on a presure pad or stairs or if there is a door infront of the player etc..
	this.View = [];

	for (pos = 0; pos < 20; pos++) {
		try {
			var xy = posToCoordinates(pos, this.x, this.y, this.Rotation);
			var newView = m[xy['y']][xy['x']];
			if (typeof newView === "undefined") {
				newView = '0001';
			}
		} catch (e) {
			newView = '0001';
		}
		this.View.push(newView);
	}

};

Player.prototype.doEvent = function() {
	//this.setMovementData();
	this.updateView(tw.floor[this.floor].Map);
	drawPlayersView(this);
	this.doEventSquare(true);
}

//mr = true : player moves
//mr = false: player rotates
Player.prototype.doEventSquare = function(mr) {

	//this.setMovementData();

	switch (parseInt(this.View[18].substring(3, 4), 16)) {

		case 4:
			this.doStairs();
			break;
		case 6:
			if (mr) floorActionType(tw.triggers[parseInt(getHexToBinaryPosition(this.View[18], 0, 5), 16).toString(10)], this);
			break;
		default:
			break;

	}
};

Player.prototype.doPit = function() {
	this.setPlayerFloor(this.floor - 1);
	this.x = this.x + (tw.floor[this.floor + 1].xOffset - tw.floor[this.floor].xOffset);
	this.y = this.y + (tw.floor[this.floor + 1].yOffset - tw.floor[this.floor].yOffset);
	this.setMovementData();
};

Player.prototype.doStairs = function() {

	var ud = parseInt(this.getBinaryView(18, 7), 10);
	var d = parseInt(this.getBinaryView(18, 5, 2), 10);

	this.setPlayerFloor(this.floor + 1 - (ud % 2) * 2); //Stairs Up or Down

	switch (d) {
		case 0: //South
			this.Rotation = 2;
			if (ud === 0) {
				this.x = this.x - (tw.floor[this.floor].xOffset - tw.floor[this.floor - 1].xOffset);
				this.y = this.y - (tw.floor[this.floor].yOffset - tw.floor[this.floor - 1].yOffset);
				this.y = this.y + 2;
			} else {
				this.x = this.x + (tw.floor[this.floor + 1].xOffset - tw.floor[this.floor].xOffset);
				this.y = this.y + (tw.floor[this.floor + 1].yOffset - tw.floor[this.floor].yOffset);
				this.y = this.y + 2;
			}
			break;
		case 1: //West
			this.Rotation = 3;
			if (ud === 0) {
				this.x = this.x - (tw.floor[this.floor].xOffset - tw.floor[this.floor - 1].xOffset);
				this.x = this.x - 2;
				this.y = (this.y - (tw.floor[this.floor].yOffset - tw.floor[this.floor - 1].yOffset));
			} else {
				this.x = this.x + (tw.floor[this.floor + 1].xOffset - tw.floor[this.floor].xOffset);
				this.x = this.x - 2;
				this.y = (this.y + (tw.floor[this.floor + 1].yOffset - tw.floor[this.floor].yOffset));
			}
			break;
		case 2: //North
			this.Rotation = 0;
			if (ud === 0) {
				this.x = this.x - (tw.floor[this.floor].xOffset - tw.floor[this.floor - 1].xOffset);
				this.y = this.y - (tw.floor[this.floor].yOffset - tw.floor[this.floor - 1].yOffset);
				this.y = this.y - 2;
			} else {
				this.x = this.x + (tw.floor[this.floor + 1].xOffset - tw.floor[this.floor].xOffset);
				this.y = this.y + (tw.floor[this.floor + 1].yOffset - tw.floor[this.floor].yOffset);
				this.y = this.y - 2;
			}
			break;
		case 3: //East
			this.Rotation = 1;
			if (ud === 0) {
				this.x = this.x - (tw.floor[this.floor].xOffset - tw.floor[this.floor - 1].xOffset);
				this.x = this.x + 2;
				this.y = (this.y - (tw.floor[this.floor].yOffset - tw.floor[this.floor - 1].yOffset));
			} else {
				this.x = this.x + (tw.floor[this.floor + 1].xOffset - tw.floor[this.floor].xOffset);
				this.x = this.x + 2;
				this.y = (this.y + (tw.floor[this.floor + 1].yOffset - tw.floor[this.floor].yOffset));
			}
			break;
		default:
			break;
	}
	this.setMovementData();
}

//Change the Players Floor
//l: 1 = up, -1 = down
Player.prototype.setPlayerFloor = function(floor) {
	if (floor >= 0 && floor < tw.floor.length) {
		this.lastFloor = this.floor;
		this.floor = floor;
	}
};

Player.prototype.recruitChampion = function(id) {
	for (i = 0; i < 4; i++) {
		if (this.champion[i] == -1) {
			this.champion[i] = id;
			champion[id].recruited = true;
			return true;
		}
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
Player.prototype.getMonstersInRange = function(pos2) {
	var p = this;
	var monstersInRange = {};
	var i = 0;
	var pos = -1;
	for (m = 0; m < monster.length; m++) {
		pos = coordinatesToPos(monster[m].x, monster[m].y, this.x, this.y, this.Rotation);
		var sq = CHAR_FRONT_SOLO;
		var sq2 = 0;
		if(monster[m].square > -1) {
			sq = (monster[m].square + p.Rotation) % 4;
			sq2 = (sq === 1 || sq === 2) ? 1 : 0; //extra check for really close-by monsters
		}
		if (monster[m].floor == this.floor && pos > -1 && (typeof pos2 === "undefined" || pos2 === pos)) {
			monstersInRange[i] = {
				monster: monster[m],
				position: pos,
				distance: getMonsterDistanceByPos(pos, sq2),
				gfxCoord: getMonsterGfxOffset(pos, sq)
			};
			i++;
		}
	}
	return monstersInRange;
}
Player.prototype.drawMonster = function(m, distance, offset) {
	var form = m.form;
	var loc = characterSpriteLocation();
	var p = this;

	if (typeof monsterPalette[form] !== "undefined") {
		//    drawPerson(p, form, CHAR_SOLO, maleCharacterSpriteLocations,DIRECTION_NORTH,distance);
		drawCharacter(m.id, (m.d + p.Rotation) % 4, distance, this, offset);


		//		var leg = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[form].leg][distance][0], MON_PALETTE_DEFAULT, monsterPalette[form].legPalette);
		//		ctx.drawImage(leg, loc[distance][0][0] + offset.x, loc[distance][0][1] + offset.y, leg.width * scale, leg.height * scale);
		//
		//		var torso = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[form].torso][distance][0], MON_PALETTE_DEFAULT, monsterPalette[form].torsoPalette);
		//		ctx.drawImage(torso, loc[distance][1][0] + offset.x, loc[distance][1][1] + offset.y, torso.width * scale, torso.height * scale);
		//		
		//		var head = recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[form].head][distance][0], MON_PALETTE_DEFAULT, monsterPalette[form].headPalette);
		//		ctx.drawImage(head, loc[distance][2][0] + offset.x, loc[distance][2][1] + offset.y, head.width * scale, head.height * scale);
		//		
		//		var arm = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[form].arm][distance][0], MON_PALETTE_DEFAULT, monsterPalette[form].armPalette);
		//		ctx.drawImage(flipImage(arm), loc[distance][3][0] + offset.x, loc[distance][3][1] + offset.y, arm.width * scale, arm.height * scale);
		//		ctx.drawImage(arm, loc[distance][4][0] + offset.x, loc[distance][4][1] + offset.y - distance, arm.width * scale, arm.height * scale);
	}
}

Player.prototype.testMode = function(id) {
	if (debug) {
		//var xy = posToCoordinates(15, this.x, this.y, this.Rotation);
		//var hex = tw.floor[this.floor].Map[xy["y"]][xy["x"]];
		//tw.floor[this.floor].Map[xy["y"]][xy["x"]] = setHexToBinaryPosition(hex, 8, 8, '0'); //REMOVE OBJECT
		//tw.floor[this.floor].Map[xy["y"]][xy["x"]] = toggleObject(hex, '3'); //TOGGLE PILLAR
		//tw.floor[this.floor].Map[xy["y"]][xy["x"]] = setHexToBinaryPosition(hex, 10, 2, '' + ((parseInt(getHexToBinaryPosition(hex, 10, 2)) + 1) % 4)); //ROTATE WALL
		//tw.floor[this.floor].Map[xy["y"]][xy["x"]] = bin2hex(hex2bin(hex).substring(2, 8) +  hex2bin(hex).substring(0, 2) + hex2bin(hex).substring(8, 16)); //ROTATE WOODEN WALL
		try {
			for (i = 0; i < 17; i++) {
				var t = this.View[i].substring(2, 4);
				if (this.View[i].substring(2, 4) === "80") {
					window.alert("Distance: " + getMonsterDistanceByPos(i) + " Code: " + this.View[i]);
				}
			}
		} catch (e) {
			PrintLog(e.toString());
		};
	}
}

function initPlayers() {
	player[0] = new Player(0, 12, 23, 3, 1, 0, 0);
	player[1] = new Player(1, 14, 22, 3, 0, 410, 0);
}

function initPlayersQuickStart() {
	for (i = 0; i < 4; i++) {
		player[0].recruitChampion(i);
		player[1].recruitChampion(i + 4);
	}
}

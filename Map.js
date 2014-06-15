function Tower(id, start) {
	var t = this;
	t.id = id;
	loadTowerData(t, start);
}

function Map(Width, Height, xOff, yOff) {
	this.Width = Width;
	this.Height = Height;
	this.yOffset = yOff;
	this.xOffset = xOff;
	this.Map = [];
}

function checkSwitchTower(p, trig) {
	if(player.length === 1) {
	} else {
		if ((trig[0] == 18 || trig[0] == 38) && parseInt(player[0].getView()[18].substring(3, 4), 16) === 6 && parseInt(player[1].getView()[18].substring(3, 4), 16) === 6) {
			if (player[1 - p].floor === player[p].floor && player[1 - p].x === trig[2] && player[1 - p].y === trig[3]) {
				var tw = Math.floor(trig[1] * 0.5);
				//sw = getHexToBinaryPosition(tower[towerThis].floor[player[p].floor].Map[trig[3]][trig[2]], 1, 1);
				//sw = getHexToBinaryPosition(player[0].getView()[18], 1, 1);
				switchTower(tw, 0);
			}
		}
	}
}

//floor1: floor we are on
//floor2: floor we go to

function getTowerFloorOffset(floor1, floor2) {
	return {
		x: tower[towerThis].floor[floor1].xOffset - tower[towerThis].floor[floor2].xOffset,
		y: tower[towerThis].floor[floor1].yOffset - tower[towerThis].floor[floor2].yOffset
	}
}

//po = 0: normal player positions, po = 1: exchange player positions

function switchTower(id, po) {
	ctx.clearRect(0, 0, 795, 400);
	$('canvas').attr('data-game-status', 'loading');
	towerLast = towerThis;
	towerThis = id;
	if (typeof po === "undefined") {
		var po = 0;
	}
	/*if (monster[id][0].ref.gfx.length === 0) {
		for (var m = 0; m < monster[id].length; m++) {
			monster[id][m].getGfx();
		}
	}
	if (monster[TOWER_CHAMPIONS][0].ref.gfx.length === 0) {
		for (var m = 0; m < monster[TOWER_CHAMPIONS].length; m++) {
			monster[TOWER_CHAMPIONS][m].getGfx();
		}
	}*/
	if (towerLast === TOWER_MOD0 && towerThis === TOWER_MOD0) { //from tower to tower (start of game)
		player[po].setPlayerPosition(3, 12, 23, 0); //(3, 12, 23, 0);
		if(player.length > 1) {
			player[1 - po].setPlayerPosition(3, 14, 23, 0); //(3, 14, 23, 0);
		}
	} else if (towerThis !== TOWER_MOD0) { //from keep to tower
		for (p = 0; p < player.length; p++) {
			var pt = Math.abs(p - po);
			floor = player[p].towerSwitches[0][towerThis].floor;
			x = player[p].towerSwitches[0][towerThis].x;
			y = player[p].towerSwitches[0][towerThis].y;
			player[pt].setPlayerPosition(floor, x, y);
		}
	} else if (towerThis === TOWER_MOD0) { //from tower to keep
		for (p = 0; p < player.length; p++) {
			var pt = Math.abs(p - po);
			floor = player[p].towerSwitches[1][towerLast].floor;
			x = player[p].towerSwitches[1][towerLast].x;
			y = player[p].towerSwitches[1][towerLast].y;
			player[pt].setPlayerPosition(floor, x, y);
		}
	}
	for(p = 0; p < player.length; p++) {
		player[p].updateChampions();
	}
	$('canvas').attr('data-game-status', 'started');
	player[0].message("WELCOME THEE TRAVELLER, TO THE REMAKE OF", COLOUR[COLOUR_YELLOW], true);
	player[0].message("   BLOODWYCH - REWRITTEN BY MAD BONE    ", COLOUR[COLOUR_YELLOW], true);
	player[0].message("          WWW.BLOODWYCH.CO.UK           ", COLOUR[COLOUR_YELLOW], true);
}

function canMove(f, x, y, d, to) {
	if(typeof to === "undefined") {
		to = 0;
	}
	xy = getOffsetByRotation((d + to) % 4);
	if(typeof tower[towerThis].floor[f].Map[y + xy.y] === "undefined" || typeof tower[towerThis].floor[f].Map[y + xy.y][x + xy.x] === "undefined") { //edge of floor
		return OBJECT_WALL;
	}

	hex18 = tower[towerThis].floor[f].Map[y][x];
	hex15 = tower[towerThis].floor[f].Map[y + xy.y][x + xy.x];
	var objThis = getHexToBinaryPosition(hex18, 12, 4);
	var objNext = getHexToBinaryPosition(hex15, 12, 4);

	if(objNext == '1') {
		return OBJECT_WALL;
	} else if (objNext === '7' && getHexToBinaryPosition(hex15, 6, 2) === '3') { //formwall
		return OBJECT_WALL;
	}

	//Check wooden walls and doors
	if (objThis == '2' || objNext == '2') {
		if (!canMoveByWood(f, x, y, d, to)) {
			return OBJECT_WOOD;
		}
	}

	if (getHexToBinaryPosition(hex15, 8) == '1') { //other player
		return OBJECT_CHARACTER;
	} else if (getMonsterAt(f, x + xy.x, y + xy.y) !== null) { //monster
		return OBJECT_CHARACTER;
	}

	//Check other objects
	if(objNext == '3') {
		return OBJECT_MISC; //Misc
	} else if(objNext == '5' && getHexToBinaryPosition(hex15, 7, 1) == '1') {
		return OBJECT_DOOR;
	}
	return OBJECT_NONE;
}

function canMoveByWood(f, x, y, d, to) {
	xy = getOffsetByRotation((d + to) % 4);
	hex18 = tower[towerThis].floor[f].Map[y][x];
	hex15 = tower[towerThis].floor[f].Map[y + xy.y][x + xy.x];
	//Check the space the player is standing on
	if (getHexToBinaryPosition(hex18, 12, 4) == '2' && getHexToBinaryPosition(hex18, ((7 - ((d + to) % 4)) % 4) * 2 + 1, 1) == '1') {
		return false;
	}
	//Check the space the player is moving to
	if (getHexToBinaryPosition(hex15, 12, 4) == '2' && getHexToBinaryPosition(hex15, ((5 - ((d + to) % 4)) % 4) * 2 + 1, 1) == '1') {
		return false;
	}
	return true;
}

function getObject(f, x, y, d, to) {
	if (x >= 0 && x < tower[towerThis].floor[f].Height && y >= 0 && y < tower[towerThis].floor[f].Width) {
		var hex = tower[towerThis].floor[f].Map[y][x];
		var obj = getHexToBinaryPosition(hex, 12, 4);
		if (obj === '1') { //wall
			if (typeof to === "undefined" || (d + to) % 4 === parseInt(getHexToBinaryPosition(hex, 10, 2))) {
				if (getHexToBinaryPosition(hex, 8) === '1') { //wall deco
					if (getHexToBinaryPosition(hex, 6, 2) === '0') { //shelf
						return OBJECT_SHELF;
					} else if (getHexToBinaryPosition(hex, 6, 2) === '1') { //Scroll
						var col = parseInt(getHexToBinaryPosition(hex, 0, 6), 16);
						if (col > 4) {
							return OBJECT_SCROLL;
						}
					} else if (getHexToBinaryPosition(hex, 6, 2) === '2') { //Switch
						return OBJECT_SWITCH;
					} else if (getHexToBinaryPosition(hex, 6, 2) === '3') { //Crystal Gem
						return OBJECT_GEM;
					}
				}
			}
			return OBJECT_WALL;
		} else if (obj === '2') { //wood
			if(typeof to !== "undefined") {
				//if (getHexToBinaryPosition(hex, ((7 - to - d) % 4) * 2) === '1') {
				if(getHexToBinaryPosition(hex, ((7 - to - d) % 4) * 2) === '1') {
					if(getHexToBinaryPosition(hex, ((7 - to - d) % 4) * 2 + 1, 1) == '1') {
						return OBJECT_WOOD_DOOR;
					} else {
						return OBJECT_WOOD_DOOR_OPEN;
					}
				} else if (getHexToBinaryPosition(hex, ((7 - to - d) % 4) * 2 + 1, 1) === '1') {
					return OBJECT_WOOD;
				}
			}
		//} else if (getHexToBinaryPosition(hex, 8) == '1') { //other player
		//	return OBJECT_CHARACTER;
		//} else if (getMonsterAt(f, x, y) !== null) { //monster
		//	return OBJECT_CHARACTER;
		} else if (obj === '3') { //misc
			//if (getHexToBinaryPosition(hex, 6, 2) === '1') { //pillar
			return OBJECT_MISC;
			//} else {
				//return 'bed';
			//}
		} else if (obj === '4') { //stairs
			return OBJECT_STAIRS;
		} else if (obj === '5') { //door
			if (typeof to === "undefined" || (d + to) % 2 === parseInt(getHexToBinaryPosition(hex, 5, 1))) {
				if(getHexToBinaryPosition(hex, 7, 1) == '1') {
					return OBJECT_DOOR;
				} else {
					return OBJECT_DOOR_OPEN;
				}
			}
		}
	}
	return OBJECT_NONE;
}
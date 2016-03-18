function initTowers() {
	for(var i in tower){
		projectile[i] = new Array();
		TOWER_NAME.push(tower[i].name);
	};
}

function getTowerByName(strName){

	for(var t in tower){
		if (tower[t].name === strName){
			return tower[t];
		}
	}
	
	return null;
}

function Map(Width, Height, xOff, yOff) {
	this.Width = Width;
	this.Height = Height;
	this.yOffset = yOff;
	this.xOffset = xOff;
	this.Map = [];
}

function checkSwitchTower(p, m, id, trig) {
	if (typeof player[1] === 'undefined' && m) {
		if (parseInt(player[0].getView()[18].substring(3, 4), 16) === 6) {
			//var tw = Math.floor(trig[1] * 0.5);
			switchTower(id);
		}
	} else if (typeof player[1] !== 'undefined' && !m) {
		if ((trig[0] == 18 || trig[0] == 38) && parseInt(player[0].getView()[18].substring(3, 4), 16) === 6 && parseInt(player[1].getView()[18].substring(3, 4), 16) === 6) {
			if (player[1 - p].floor === player[p].floor && player[1 - p].x === trig[2] && player[1 - p].y === trig[3]) {
				//var tw = Math.floor(trig[1] * 0.5);
				switchTower(id);
			}
		}
	}
}

//po = 0: normal player positions, po = 1: exchange player positions

function switchTower(id, po) {
	//ctx.clearRect(0, 0, 795, 400);
	//$('canvas').attr('data-game-status', 'loading');
	towerLast = towerThis;
	towerThis = id;
	if (typeof po === "undefined") {
		var po = 0;
	}
	if (towerLast === TOWER_MOD0 && towerThis === TOWER_MOD0) { //from tower to tower (start of game)

	} else if (towerThis !== TOWER_MOD0) { //from keep to tower
		for(var p in player) {
			var pt = Math.abs(p - po);
			floor = player[p].towerSwitches[0][towerThis].floor;
			x = player[p].towerSwitches[0][towerThis].x;
			y = player[p].towerSwitches[0][towerThis].y;
			player[pt].setPlayerPosition(floor, x, y);
		}
	} else if (towerThis === TOWER_MOD0) { //from tower to keep
		for(var p in player) {
			var pt = Math.abs(p - po);
			floor = player[p].towerSwitches[1][towerLast].floor;
			x = player[p].towerSwitches[1][towerLast].x;
			y = player[p].towerSwitches[1][towerLast].y;
			player[pt].setPlayerPosition(floor, x, y);
		}
	}
        if (isMobile){
            var mon = getMonstersInTower(towerThis, true);
            for(var m in mon){
                initMonsterGfxNew(monster[towerThis][m]);
            }
        }
	//for(var p in player) {
	//	player[p].updateChampions();
	//}
	//$('canvas').attr('data-game-status', 'started');
}

function getObjectNameById(id) {
	switch (id) {
		case OBJECT_NONE:
			return "Floor";
			break;
		case OBJECT_PATH:
			return "Floor path";
			break;
		case OBJECT_PIT:
			return "Pit";
			break;
		case OBJECT_CHARACTER:
			return "Character";
			break;
		case OBJECT_PROJECTILE:
			return "Projectile";
			break;
		case OBJECT_MISC:
			return "Misc";
			break;
		case OBJECT_WOOD:
			return "Wood";
			break;
		case OBJECT_WALL:
			return "Wall";
			break;
		case OBJECT_WOOD_DOOR:
			return "Wood door";
			break;
		case OBJECT_SHELF:
			return "Wall shelf";
			break;
		case OBJECT_SCROLL:
			return "Wall scroll";
			break;
		case OBJECT_SWITCH:
			return "Wall switch";
			break;
		case OBJECT_GEM:
			return "Wall gem";
			break;
		case OBJECT_STAIRS:
			return "Stairs";
			break;
		case OBJECT_DOOR:
			return "Door";
			break;
		case OBJECT_DOOR_OPEN:
			return "Door open";
			break;
		case OBJECT_WOOD_DOOR_OPEN:
			return "Wood door open";
			break;
		default:
			return "";
	}
}

function canMove(f, x, y, d, to) {
	if (typeof to === "undefined") {
		to = 0;
	}
	xy = getOffsetByRotation((d + to) % 4);
	if (typeof tower[towerThis].floor[f].Map[y + xy.y] === "undefined" || typeof tower[towerThis].floor[f].Map[y + xy.y][x + xy.x] === "undefined") { //edge of floor
		return OBJECT_WALL;
	}

	hex18 = tower[towerThis].floor[f].Map[y][x];
	hex15 = tower[towerThis].floor[f].Map[y + xy.y][x + xy.x];
	var objThis = getHexToBinaryPosition(hex18, 13, 3);
	var objNext = getHexToBinaryPosition(hex15, 13, 3);

	if (objNext == '1') {
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

	if (getPlayerAt(f, x + xy.x, y + xy.y) !== null) { //other player
		return OBJECT_CHARACTER;
	} else if (getMonsterAt(f, x + xy.x, y + xy.y) !== null) { //monster
		return OBJECT_CHARACTER;
	}
	if (getProjectilesAt(f, x + xy.x, y + xy.y).length > 0) {
		return OBJECT_PROJECTILE;
	}

	//Check other objects
	if (objNext == '3') {
		return OBJECT_MISC; //Misc
	} else if (objNext == '4') { //Stairs
		return OBJECT_STAIRS;
	} else if (objNext == '5' && getHexToBinaryPosition(hex15, 7, 1) == '1') {
		return OBJECT_DOOR;
	}

	return OBJECT_NONE;
}

//for blaze ball

function canMoveByFirepath(f, x, y, d) {
	if (typeof d !== "undefined") {
		xy = getOffsetByRotation(d);
	} else {
		xy = {
			x: 0,
			y: 0
		};
	}
	if (typeof tower[towerThis].floor[f].Map[y + xy.y] === "undefined" || typeof tower[towerThis].floor[f].Map[y + xy.y][x + xy.x] === "undefined") { //edge of floor
		return false;
	}
	hex15 = tower[towerThis].floor[f].Map[y + xy.y][x + xy.x];
	if (getHexToBinaryPosition(hex15, 13, 3) === '7' && getHexToBinaryPosition(hex15, 6, 2) === '1') {
		return true;
	}
	return false;
}

function canMoveByWood(f, x, y, d, to) {
	if (typeof to === "undefined") {
		to = 0;
	}
	xy = getOffsetByRotation((d + to) % 4);
	hex18 = tower[towerThis].floor[f].Map[y][x];
	//Check the space the player is standing on
	if (getHexToBinaryPosition(hex18, 13, 3) == '2' && getHexToBinaryPosition(hex18, ((7 - ((d + to) % 4)) % 4) * 2 + 1, 1) == '1') {
		return false;
	}
	//Check the space the player is moving to
	if (typeof tower[towerThis].floor[f].Map[y + xy.y] !== 'undefined' && typeof tower[towerThis].floor[f].Map[y + xy.y][x + xy.x] !== 'undefined') {
		hex15 = tower[towerThis].floor[f].Map[y + xy.y][x + xy.x];
		if (getHexToBinaryPosition(hex15, 13, 3) == '2' && getHexToBinaryPosition(hex15, ((5 - ((d + to) % 4)) % 4) * 2 + 1, 1) == '1') {
			return false;
		}
	}
	return true;
}

function getObject(f, x, y, d, to) {
	if (x >= 0 && x < tower[towerThis].floor[f].Height && y >= 0 && y < tower[towerThis].floor[f].Width) {
		var hex = tower[towerThis].floor[f].Map[y][x];
		var obj = getHexToBinaryPosition(hex, 13, 3);
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
			if (typeof to !== "undefined") {
				//if (getHexToBinaryPosition(hex, ((7 - to - d) % 4) * 2) === '1') {
				if (getHexToBinaryPosition(hex, ((7 - to - d) % 4) * 2) === '1') {
					if (getHexToBinaryPosition(hex, ((7 - to - d) % 4) * 2 + 1, 1) == '1') {
						return OBJECT_WOOD_DOOR;
					} else {
						return OBJECT_WOOD_DOOR_OPEN;
					}
				} else if (getHexToBinaryPosition(hex, ((7 - to - d) % 4) * 2 + 1, 1) === '1') {
					return OBJECT_WOOD;
				}
			}
		} else if (obj === '3') { //misc
			return OBJECT_MISC;
		} else if (obj === '4') { //stairs
			return OBJECT_STAIRS;
		} else if (obj === '5') { //door
			if (typeof to === "undefined" || (d + to) % 2 === parseInt(getHexToBinaryPosition(hex, 5, 1))) {
				if (getHexToBinaryPosition(hex, 7, 1) == '1') {
					return OBJECT_DOOR;
				} else {
					return OBJECT_DOOR_OPEN;
				}
			}
		} else if (obj == '6') { //path, pits
			if (getHexToBinaryPosition(hex, 6, 2) === '1') {
				return OBJECT_PIT;
			} else if (getHexToBinaryPosition(hex, 6, 2) === '2') {
				return OBJECT_PATH;
			}
		} else if (obj == '7') { //magic
			if (getHexToBinaryPosition(hex, 6, 2) === '1') {
				return OBJECT_PATH;
			}
		}
	}
	return OBJECT_NONE;
}

function getDungeonHex(f, x, y, index, length) {    
	return getHexToBinaryPosition(tower[towerThis].floor[f].Map[y][x], index, length);
}

function setDungeonHex(f, x, y, index, length, to) {    
	tower[towerThis].floor[f].Map[y][x] = setHexToBinaryPosition(tower[towerThis].floor[f].Map[y][x], index, length, to);
}

//floor1: floor we are on
//floor2: floor we go to
function getTowerFloorOffset(floor1, floor2) {
	if (typeof tower[towerThis].floor[floor2] === 'undefined') {
		return {
			x: 0,
			y: 0
		};
	}
	return {
		x: tower[towerThis].floor[floor1].xOffset - tower[towerThis].floor[floor2].xOffset,
		y: tower[towerThis].floor[floor1].yOffset - tower[towerThis].floor[floor2].yOffset
	}
}

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
	$('canvas').removeClass('active');
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
	$('canvas').addClass('active');
	player[0].message("WELCOME THEE TRAVELLER, TO MADMUNKY AND ", COLOUR[COLOUR_YELLOW], true);
	player[0].message("     WISHBONE'S REMAKE OF BLOODWYCH     ", COLOUR[COLOUR_YELLOW], true);
}

function canMove(f, x, y, d, to) {
	xy = getOffsetByRotation((d + to) % 4);
	if(typeof tower[towerThis].floor[f].Map[y + xy.y] === "undefined" || typeof tower[towerThis].floor[f].Map[y + xy.y][x + xy.x] === "undefined") { //edge of floor
		return false;
	}
	hex18 = tower[towerThis].floor[f].Map[y][x];
	hex15 = tower[towerThis].floor[f].Map[y + xy.y][x + xy.x];
	if (getHexToBinaryPosition(hex15, 8) == '1') { //other player
		return false;
	}
	if (getHexToBinaryPosition(hex15, 12, 4) === '7' && getHexToBinaryPosition(hex15, 6, 2) === '3') { //formwall
		return false;
	}
	if (getMonsterAt(f, x + xy.x, y + xy.y) !== null) { //monster
		return false;
	}

	var objThis = getHexToBinaryPosition(hex18, 12, 4);
	var objNext = getHexToBinaryPosition(hex15, 12, 4);

	//Check wooden walls and doors
	if (objThis == '2' || objNext == '2') {
		if (!canMoveByWood(f, x, y, d, to)) {
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
			if (getHexToBinaryPosition(hex15, 7, 1) == '1') {
				return false;
			}
	}
	return true;
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
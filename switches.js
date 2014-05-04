function switchAction(r, p) {
	//Changes map data based on the switch being pressed
	//t = tower as each tower has different defaults for the switches
	//r = the reference to the switch action
	//p = The Player (as need to react on the same floor)
	var sw = tower[towerThis].switches[r];

	tar = tower[towerThis].floor[p.floor].Map[sw[3]][sw[2]];
	switch (sw[0]) {
		case SWITCH_WALL_REMOVE:
			tower[towerThis].floor[p.floor].Map[sw[3]][sw[2]] = setHexToBinaryPosition(tar, 8, 8, '0');
			break;
		case SWITCH_WALL_TOGGLE_STONE_WALL:
			tower[towerThis].floor[p.floor].Map[sw[3]][sw[2]] = toggleObject(tar, '1');
			break;
		case SWITCH_WALL_OPEN_VOID_DOOR:
			tower[towerThis].floor[p.floor].Map[sw[3]][sw[2]] = setHexToBinaryPosition(tar, 12, 4, '0');
			break;
		case SWITCH_WALL_ROTATE_STONE_WALL:
			tower[towerThis].floor[p.floor].Map[sw[3]][sw[2]] = setHexToBinaryPosition(tar, 10, 2, '' + ((parseInt(getHexToBinaryPosition(tar, 10, 2)) + 1) % 4));
			break;
		case SWITCH_WALL_TOGGLE_PILLAR:
			tower[towerThis].floor[p.floor].Map[sw[3]][sw[2]] = toggleObject(tar, '3');
			break;
		case SWITCH_WALL_PLACE_PILLAR:
			tower[towerThis].floor[p.floor].Map[sw[3]][sw[2]] = setHexToBinaryPosition(tar, 12, 4, '3');
			break;
		case SWITCH_WALL_ROTATE_WOOD_WALLS:
			tower[towerThis].floor[p.floor].Map[sw[3]][sw[2]] = hex2bin(hex2bin(tar).substring(2, 8) + hex2bin(tar).substring(0, 2) + hex2bin(tar).substring(8, 16));
			break;
		default:
			window.alert("Unhandled Switch Action: " + sw.toString());
	}
}

function toggleObject(hex, o) {
	if (getHexToBinaryPosition(hex, 12, 4) === '0') {
		return setHexToBinaryPosition(hex, 12, 4, o);
	} else {
		return setHexToBinaryPosition(hex, 12, 4, '0');
	}
}

function floorActionType(trig, p) {
	if (parseInt(p.View[18].substring(1, 2), 16) % 4 === 1) {
		p.doPit(p);
		return;
	}
	tar = tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]];

	switch (trig[0]) {
		case SWITCH_FLOOR_NONE:
			break;
		case SWITCH_FLOOR_SPIN_180:
			p.d = (p.d + 2) % 4;
			break;
		case SWITCH_FLOOR_SPIN_RANDOM:
			p.d = p.d = (Math.floor(Math.random() * 4));
			break;
		case SWITCH_FLOOR_OPEN_VOID_LOCK_DOOR:
			tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = setHexToBinaryPosition(tar, 7, 1, '0');
			break;
		case SWITCH_FLOOR_VIVIFY_MACHINE_EXTERNAL:
			tower[towerThis].floor[p.floor].Map[p.y][p.x + 1] = setHexToBinaryPosition(tower[towerThis].floor[p.floor].Map[p.y][p.x + 1], 7, 1, '1');
			break;
		case SWITCH_FLOOR_VIVIFY_MACHINE_INTERNAL:
			tower[towerThis].floor[p.floor].Map[p.y][p.x - 1] = setHexToBinaryPosition(tower[towerThis].floor[p.floor].Map[p.y][p.x - 1], 7, 1, '1');
			break;
		case SWITCH_FLOOR_WOOD_DOOR_CLOSER_1:
			break;
		case SWITCH_FLOOR_WOOD_DOOR_CLOSER_2:
			break;
		case SWITCH_FLOOR_TRADER_DOOR:
			tower[towerThis].floor[p.floor].Map[p.y][p.x - 1] = setHexToBinaryPosition(tower[towerThis].floor[p.floor].Map[p.y][p.x - 1], 7, 1, '1');
			break;
		case SWITCH_FLOOR_TOWER_ENTRANCE_SIDE_PAD:
			checkSwitchTower(p.id, trig);
			break;
		case SWITCH_FLOOR_TOWER_ENTRANCE:
			break;
		case SWITCH_FLOOR_REMOVE:
			tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = toggleObject(tar, '3');
			break;
		case SWITCH_FLOOR_CLOSE_VOID_LOCK_DOOR:
			tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = setHexToBinaryPosition(tar, 7, 1, '1');
			break;
		case SWITCH_FLOOR_TOGGLE_PILLAR:
			tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = toggleObject(tar, '3');
			break;
		case SWITCH_FLOOR_CREATE_SPINNER:
			tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = '0103';
			break;
		case SWITCH_FLOOR_OPEN_CREATE_WALL_WITH_SWITCHES:
			tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = setHexToBinaryPosition(tar, 7, 1, '1');
			break;
		case SWITCH_FLOOR_CREATE_PAD:
			tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = setHexToBinaryPosition(tar, 7, 1, '1');
			break;
		case SWITCH_FLOOR_MOVE_PILLAR_AT_PLAYER:
			tower[towerThis].floor[p.floor].Map[p.y - 1][p.x - 1] = setHexToBinaryPosition(tower[towerThis].floor[p.floor].Map[p.y - 1][p.x - 1], 7, 1, '0');
			break; //Not sure this is right
		case SWITCH_FLOOR_CREATE_PILLAR:
			tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = '1306';
			break;
		case SWITCH_FLOOR_KEEP_ENTRANCE_SIDEPAD:
			checkSwitchTower(p.id, trig);
			break;
		case SWITCH_FLOOR_KEEP_ENTRANCE_CENTRAL_PAD:
			break;
		case SWITCH_FLOOR_FLASH_TELEPORT:
			break;
		case SWITCH_FLOOR_ROTATE_STONE_WALL:
			tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = setHexToBinaryPosition(tar, 10, 2, '' + ((parseInt(getHexToBinaryPosition(tar, 10, 2)) + 1) % 4));
			break;
		case SWITCH_FLOOR_TOGGLE_WALL:
			tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = toggleObject(tar, '3');
			break;
		case SWITCH_FLOOR_SPINNER:
			break;
		case SWITCH_FLOOR_CLICK_TELEPORT:
			break;
		case SWITCH_FLOOR_TOGGLE_GREEN_PAD:
			tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = toggleObject(tar, '3');
			break;
		case SWITCH_FLOOR_ROTATE_WOOD_WALL_COUNTER_CLOCKWISE:
			tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = hex2bin(hex2bin(tar).substring(2, 8) + hex2bin(tar).substring(0, 2) + hex2bin(tar).substring(8, 16));
			break;
		case SWITCH_FLOOR_TOGGLE_HOLE:
			tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = toggleObject(tar, '3');
			break;
		case SWITCH_FLOOR_GAME_COMPLETION_PAD:
			break;
		case SWITCH_FLOOR_REMOVE_PILLAR_OTHER_EVENT:
			tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = toggleObject(tar, '3');
			break;
		default:
			window.alert("Unhandled Floor Action: " + trig.toString());
	}

}

function initTowerSwitches() {
	for (p = 0; p < 2; p++) { //player
		for (i = 0; i < 2; i++) { //0: to tower, 1: to keep
			player[p].towerSwitches[i] = new Array();
			for (t = 0; t < 5; t++) { //tower
				player[p].towerSwitches[i][t + 1] = {
					floor: towerSwitchesData[i][t],
					x: towerSwitchesData[i][t * 4 + p * 2 + 5],
					y: towerSwitchesData[i][t * 4 + p * 2 + 6]
				};
			}
		}
	}
}

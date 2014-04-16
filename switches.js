var SWITCH_WALL_NONE = 0,
	SWITCH_WALL_REMOVE = 2,
	SWITCH_WALL_TOGGLE_STONE_WALL = 4,
	SWITCH_WALL_OPEN_VOID_DOOR = 6,
	SWITCH_WALL_ROTATE_STONE_WALL = 8,
	SWITCH_WALL_TOGGLE_PILLAR = 10,
	SWITCH_WALL_PLACE_PILLAR = 12,
	SWITCH_WALL_ROTATE_WOOD_WALLS = 14;

var SWITCH_FLOOR_NONE = 0,
	SWITCH_FLOOR_SPIN_180 = 2,
	SWITCH_FLOOR_SPIN_RANDOM = 4,
	SWITCH_FLOOR_OPEN_VOID_LOCK_DOOR = 6,
	SWITCH_FLOOR_VIVIFY_MACHINE_EXTERNAL = 8,
	SWITCH_FLOOR_VIVIFY_MACHINE_INTERNAL = 10,
	SWITCH_FLOOR_WOOD_DOOR_CLOSER_1 = 12,
	SWITCH_FLOOR_WOOD_DOOR_CLOSER_2 = 14,
	SWITCH_FLOOR_TRADER_DOOR = 16,
	SWITCH_FLOOR_TOWER_ENTRANCE_SIDE_PAD = 18, //(X/Y OF OPPOSITE PAD)
	SWITCH_FLOOR_TOWER_ENTRANCE = 20, // (CENTRAL PAD) 
	SWITCH_FLOOR_REMOVE = 22, // (X/Y) *
	SWITCH_FLOOR_CLOSE_VOID_LOCK_DOOR = 24, // (X/Y) *
	SWITCH_FLOOR_TOGGLE_PILLAR = 26, // (X/Y) *
	SWITCH_FLOOR_CREATE_SPINNER = 28, // (OR OTHER) (X/Y) *
	SWITCH_FLOOR_OPEN_CREATE_WALL_WITH_SWITCHES = 30, //? (X/Y) *
	SWITCH_FLOOR_CREATE_PAD = 32, // (F/X/Y) 
	SWITCH_FLOOR_MOVE_PILLAR_AT_PLAYER = 34, // X,Y TO PLAYER X-1,Y-1 (SPECIAL CASE) **
	SWITCH_FLOOR_CREATE_PILLAR = 36, // (X/Y) *
	SWITCH_FLOOR_KEEP_ENTRANCE_SIDEPAD = 38, // (X/Y OF OPPOSITE PAD)
	SWITCH_FLOOR_KEEP_ENTRANCE_CENTRAL_PAD = 40,
	SWITCH_FLOOR_FLASH_TELEPORT = 42, // (F/X/Y)
	SWITCH_FLOOR_ROTATE_STONE_WALL = 44, // (X/Y) *
	SWITCH_FLOOR_TOGGLE_WALL = 46, // (X/Y) *
	SWITCH_FLOOR_SPINNER = 48, // (UNKNOWN DIFFERENCE) (X/Y) *
	SWITCH_FLOOR_CLICK_TELEPORT = 50, // (F/X/Y)
	SWITCH_FLOOR_TOGGLE_GREEN_PAD = 52, // (X/Y) *
	SWITCH_FLOOR_ROTATE_WOOD_WALL_COUNTER_CLOCKWISE = 54,// (X/Y) *
	SWITCH_FLOOR_TOGGLE_HOLE = 56, // (X/Y) *
	SWITCH_FLOOR_GAME_COMPLETION_PAD = 58, // **
	SWITCH_FLOOR_REMOVE_PILLAR_OTHER_EVENT = 60; // (X/Y) **

function switchAction(t,r,p){
	//Changes map data based on the switch being pressed
	//t = tower as each tower has different defaults for the switches
	//r = the reference to the switch action
	//p = The Player (as need to react on the same floor)
		
	switch (t) {
		
		case 0:{mod0Actions(r,p);};break;
		case 1:{};break;
		case 2:{};break;
		case 3:{};break;
		case 4:{};break;
		
	}
}

function mod0Actions(r, p){
	actionType(tw.switches[r],p);
}

function actionType(sw, p){
	tar = tw.floor[p.floor].Map[sw[3]][sw[2]];
	switch (sw[0]) {
		case SWITCH_WALL_REMOVE:            tw.floor[p.floor].Map[sw[3]][sw[2]] = setHexToBinaryPosition(tar, 8, 8, '0'); break;
		case SWITCH_WALL_TOGGLE_STONE_WALL: tw.floor[p.floor].Map[sw[3]][sw[2]] = toggleObject(tar, '1'); break;
		case SWITCH_WALL_OPEN_VOID_DOOR:    tw.floor[p.floor].Map[sw[3]][sw[2]] = setHexToBinaryPosition(tar, 12, 4, '0'); break;
		case SWITCH_WALL_ROTATE_STONE_WALL: tw.floor[p.floor].Map[sw[3]][sw[2]] = setHexToBinaryPosition(tar, 10, 2, '' + ((parseInt(getHexToBinaryPosition(tar, 10, 2)) + 1) % 4)); break;
		case SWITCH_WALL_TOGGLE_PILLAR:     tw.floor[p.floor].Map[sw[3]][sw[2]] = toggleObject(tar, '3'); break;
		case SWITCH_WALL_PLACE_PILLAR:      tw.floor[p.floor].Map[sw[3]][sw[2]] = setHexToBinaryPosition(tar, 12, 4, '3'); break;
		case SWITCH_WALL_ROTATE_WOOD_WALLS: tw.floor[p.floor].Map[sw[3]][sw[2]] = hex2bin(hex2bin(tar).substring(2, 8) + hex2bin(tar).substring(0, 2) + hex2bin(tar).substring(8, 16)); break;
		default: window.alert("Unhandled Switch Action: " + sw.toString());
	 }
	
}

function toggleObject(hex, o) {
	if (getHexToBinaryPosition(hex, 12, 4) === '0') {
		return setHexToBinaryPosition(hex, 12, 4, o);
	} else {
		return setHexToBinaryPosition(hex, 12, 4, '0');
	}
}

function floorActionType(trig, p){
	if(parseInt(p.View[18].substring(1,2),16) % 4 === 1){p.doPit(p);end;};
	tar = tw.floor[p.floor].Map[trig[3]][trig[2]];

	switch (trig[0]) {
		case SWITCH_FLOOR_NONE:                                 break;
		case SWITCH_FLOOR_SPIN_180:                             p.Rotation = (p.Rotation + 2) % 4;break;
		case SWITCH_FLOOR_SPIN_RANDOM:                          p.Rotation = p.Rotation = (Math.floor(Math.random() * 4)); break;
		case SWITCH_FLOOR_OPEN_VOID_LOCK_DOOR:                  tw.floor[p.floor].Map[trig[3]][trig[2]] = setHexToBinaryPosition(tar, 7, 1, '0'); break;
		case SWITCH_FLOOR_VIVIFY_MACHINE_EXTERNAL:              tw.floor[p.floor].Map[p.y][p.x+1] = setHexToBinaryPosition(tw.floor[p.floor].Map[p.y][p.x+1], 7, 1, '1'); break;    
		case SWITCH_FLOOR_VIVIFY_MACHINE_INTERNAL:              tw.floor[p.floor].Map[p.y][p.x-1] = setHexToBinaryPosition(tw.floor[p.floor].Map[p.y][p.x-1], 7, 1, '1'); break;
		case SWITCH_FLOOR_WOOD_DOOR_CLOSER_1:                   break;
		case SWITCH_FLOOR_WOOD_DOOR_CLOSER_2:                   break;
		case SWITCH_FLOOR_TRADER_DOOR:                          tw.floor[p.floor].Map[p.y][p.x-1] = setHexToBinaryPosition(tw.floor[p.floor].Map[p.y][p.x-1], 7, 1, '1'); break;
		case SWITCH_FLOOR_TOWER_ENTRANCE_SIDE_PAD:              break;
		case SWITCH_FLOOR_TOWER_ENTRANCE:                       break; //switchTower(getHexToBinaryPosition(trig[1], 3, 2)); //trig[1]: 0=SERP, 1=DRAG, 2=MOON, 3=CHAOS, 4=ZENDIK
		case SWITCH_FLOOR_REMOVE:                               tw.floor[p.floor].Map[trig[3]][trig[2]] = toggleObject(tar, '3');break;
		case SWITCH_FLOOR_CLOSE_VOID_LOCK_DOOR:                 tw.floor[p.floor].Map[trig[3]][trig[2]] = setHexToBinaryPosition(tar, 7, 1, '1'); break;
		case SWITCH_FLOOR_TOGGLE_PILLAR:                        tw.floor[p.floor].Map[trig[3]][trig[2]] = toggleObject(tar, '3');break;
		case SWITCH_FLOOR_CREATE_SPINNER:                       tw.floor[p.floor].Map[trig[3]][trig[2]] = '0103';break;
		case SWITCH_FLOOR_OPEN_CREATE_WALL_WITH_SWITCHES:       tw.floor[p.floor].Map[trig[3]][trig[2]] = setHexToBinaryPosition(tar, 7, 1, '1'); break;
		case SWITCH_FLOOR_CREATE_PAD:                           tw.floor[p.floor].Map[trig[3]][trig[2]] = setHexToBinaryPosition(tar, 7, 1, '1'); break;
		case SWITCH_FLOOR_MOVE_PILLAR_AT_PLAYER:                tw.floor[p.floor].Map[p.y-1][p.x-1] = setHexToBinaryPosition(tw.floor[p.floor].Map[p.y-1][p.x-1], 7, 1, '0'); break; //Not sure this is right
		case SWITCH_FLOOR_CREATE_PILLAR:                        tw.floor[p.floor].Map[trig[3]][trig[2]] = '1306';break;
		case SWITCH_FLOOR_KEEP_ENTRANCE_SIDEPAD:                break;
		case SWITCH_FLOOR_KEEP_ENTRANCE_CENTRAL_PAD:            break;
		case SWITCH_FLOOR_FLASH_TELEPORT:                       break;
		case SWITCH_FLOOR_ROTATE_STONE_WALL:                    tw.floor[p.floor].Map[trig[3]][trig[2]] = setHexToBinaryPosition(tar, 10, 2, '' + ((parseInt(getHexToBinaryPosition(tar, 10, 2)) + 1) % 4)); break;
		case SWITCH_FLOOR_TOGGLE_WALL:                          tw.floor[p.floor].Map[trig[3]][trig[2]] = toggleObject(tar, '3');break;
		case SWITCH_FLOOR_SPINNER:                              break;
		case SWITCH_FLOOR_CLICK_TELEPORT:                       break;
		case SWITCH_FLOOR_TOGGLE_GREEN_PAD:                     tw.floor[p.floor].Map[trig[3]][trig[2]] = toggleObject(tar, '3');break;
		case SWITCH_FLOOR_ROTATE_WOOD_WALL_COUNTER_CLOCKWISE:   tw.floor[p.floor].Map[trig[3]][trig[2]] = hex2bin(hex2bin(tar).substring(2, 8) + hex2bin(tar).substring(0, 2) + hex2bin(tar).substring(8, 16)); break;
		case SWITCH_FLOOR_TOGGLE_HOLE:                          tw.floor[p.floor].Map[trig[3]][trig[2]] = toggleObject(tar, '3');break;
		case SWITCH_FLOOR_GAME_COMPLETION_PAD:                  break;
		case SWITCH_FLOOR_REMOVE_PILLAR_OTHER_EVENT:            tw.floor[p.floor].Map[trig[3]][trig[2]] = toggleObject(tar, '3');break;
		default:                                                window.alert("Unhandled Floor Action: " + trig.toString());
	}

}


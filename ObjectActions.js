function switchAction(t,r,p){
    //Changes map data based on the switch being pressed
    //t = tower as each tower has different defaults for the switches
    //r = the reference to the switch action
    //p = The Player (as need to react on the same level)
        
    switch (t) {
        
        case 0:{mod0Actions(r,p);};break;
        case 1:{};break;
        case 2:{};break;
        case 3:{};break;
        case 4:{};break;
        
    }
}

function mod0Actions(r,p){actionType(tw.Switches[r],p);}

function actionType(sw,p){
        //02 - REMOVE
        //04 - TOGGLE STONE WALL
        //06 - OPEN VOID-LOCK DOOR
        //08 - ROTATE BRICK WALL
        //10 - TOGGLE PILLAR
        //12 - PLACE PILLAR
        //14 - ROTATE WOOD WALLS
    
     switch (sw[0]){
         
        case 2: {tw.Levels[p.level].Map[sw[2]][sw[3]] = tw.Levels[p.level].Map[sw[2]][sw[3]].replaceAt(3,"0");}break;
        case 4: {tw.Levels[p.level].Map[sw[2]][sw[3]] = toggleWall(tw.Levels[p.level].Map[sw[2]][sw[3]]);};break;
        case 6: {tw.Levels[p.level].Map[sw[2]][sw[3]] = tw.Levels[p.level].Map[sw[2]][sw[3]].replaceAt(3,"0");}break;
        case 8: {window.alert("JORG PLEASE FIX THIS!!! Unhandled Switch Action: " + sw.toString());}  //JORG PLEASE FIX THIS!!!
        case 10: {tw.Levels[p.level].Map[sw[2]][sw[3]] = togglePillar(tw.Levels[p.level].Map[sw[2]][sw[3]]);};break;
        case 12: {tw.Levels[p.level].Map[sw[2]][sw[3]] = tw.Levels[p.level].Map[sw[2]][sw[3]].replaceAt(3,"0");}break;
        case 14: {window.alert("JORG PLEASE FIX THIS!!! Unhandled Switch Action: " + sw.toString());}  //JORG PLEASE FIX THIS!!!
        default:{window.alert("Unhandled Switch Action: " + sw.toString());}
     }
    
}

function toggleWall(hex){
    
    if (hex.substring(3,4) === "1"){
        return hex.replaceAt(3,"0");
    }
    else {
        return hex.replaceAt(3,"1");
    }

}

function togglePillar(hex){
    
    if (hex.substring(3,4) === "3"){
        return hex.replaceAt(3,"0");
    }
    else {
        return hex.replaceAt(3,"3");
    }

}

function floorActionType(trig,p){
    
    var SWITCH_FLOOR_NONE = 0,
        SWITCH_FLOOR_SPIN_180 = 2,
        SWITCH_FLOOR_SPIN_RANDOM = 4,
        SWITCH_FLOOR_OPEN_VOID_LOCK_DOOR = 6,
        SWITCH_FLOOR_VIVIFY_MACHINE_EXTERNAL = 8,
        SWITCH_FLOOR_VIVIFY_MACHINE_INTERNAL = 10,
        SWITCH_FLOOR_WOOD_DOOR_CLOSER = 12,
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

    if(parseInt(p.View[18].substring(1,2),16) % 4 === 1){p.doPit(p);end;};
    
    switch (trig[0]){
    
        case SWITCH_FLOOR_NONE :{};break;
        case SWITCH_FLOOR_SPIN_180 :{p.Rotation = (p.Rotation + 2) % 4;};break;
        case SWITCH_FLOOR_SPIN_RANDOM :{p.Rotation = p.Rotation = (Math.floor(Math.random() * 4));};break;
        case SWITCH_FLOOR_OPEN_VOID_LOCK_DOOR :{tw.Levels[p.level].Map[trig[2]][trig[3]] = setHexToBinaryPosition(tw.Levels[p.level].Map[trig[2]][trig[3]], 7, '0');};break;  // - OPEN VOID-LOCK DOOR (X/Y) *
        case SWITCH_FLOOR_VIVIFY_MACHINE_EXTERNAL :{tw.Levels[p.level].Map[p.Y][p.X+1] = setHexToBinaryPosition(tw.Levels[p.level].Map[p.Y][p.X+1], 7, '1');};break;    
        case SWITCH_FLOOR_VIVIFY_MACHINE_INTERNAL :{tw.Levels[p.level].Map[p.Y][p.X-1] = setHexToBinaryPosition(tw.Levels[p.level].Map[p.Y][p.X-1], 7, '1');};break;
        case SWITCH_FLOOR_WOOD_DOOR_CLOSER :{};break;
        case SWITCH_FLOOR_WOOD_DOOR_CLOSER_2 :{};break;
        case SWITCH_FLOOR_TRADER_DOOR :{};break;
        case SWITCH_FLOOR_TOWER_ENTRANCE_SIDE_PAD :{};break;
        case SWITCH_FLOOR_TOWER_ENTRANCE :{};break;
        case SWITCH_FLOOR_REMOVE :{};break;
        case SWITCH_FLOOR_CLOSE_VOID_LOCK_DOOR :{};break;
        case SWITCH_FLOOR_TOGGLE_PILLAR :{};break;
        case SWITCH_FLOOR_CREATE_SPINNER :{};break;
        case SWITCH_FLOOR_OPEN_CREATE_WALL_WITH_SWITCHES :{};break;
        case SWITCH_FLOOR_CREATE_PAD :{};break;
        case SWITCH_FLOOR_MOVE_PILLAR_AT_PLAYER :{};break;
        case SWITCH_FLOOR_CREATE_PILLAR :{};break;
        case SWITCH_FLOOR_KEEP_ENTRANCE_SIDEPAD :{};break;
        case SWITCH_FLOOR_KEEP_ENTRANCE_CENTRAL_PAD :{};break;
        case SWITCH_FLOOR_FLASH_TELEPORT :{};break;
        case SWITCH_FLOOR_ROTATE_STONE_WALL :{};break;
        case SWITCH_FLOOR_TOGGLE_WALL :{};break;
        case SWITCH_FLOOR_SPINNER :{};break;
        case SWITCH_FLOOR_CLICK_TELEPORT :{};break;
        case SWITCH_FLOOR_TOGGLE_GREEN_PAD :{};break;
        case SWITCH_FLOOR_ROTATE_WOOD_WALL_COUNTER_CLOCKWISE :{};break;
        case SWITCH_FLOOR_TOGGLE_HOLE :{};break;
        case SWITCH_FLOOR_GAME_COMPLETION_PAD :{};break;
        case SWITCH_FLOOR_REMOVE_PILLAR_OTHER_EVENT :{};break;
        default: {window.alert("Unhandled Floor Action: " + trig.toString());}
    }

}


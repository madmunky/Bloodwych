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
    //00 - NONE
    //02 - SPIN 180 **
    //04 - SPIN RANDOM **
    //06 - OPEN VOID-LOCK DOOR (X/Y) *
    //08 - VIVIFY MACHINE EXTERNAL PAD **
    //10 - VIVIFY MACHINE INTERNAL PAD **
    //12 - WOOD DOOR CLOSER #1 (SPECIAL CASE) **
    //14 - WOOD DOOR CLOSER #2 (SPECIAL CASE) **
    //16 - TRADER DOOR **
    //18 - TOWER ENTRANCE (SIDE PAD) (X/Y OF OPPOSITE PAD)
    //20 - TOWER ENTRANCE (CENTRAL PAD) 
    //22 - REMOVE (X/Y) *
    //24 - CLOSE VOID-LOCK DOOR (X/Y) *
    //26 - TOGGLE PILLAR (X/Y) *
    //28 - CREATE SPINNER (OR OTHER) (X/Y) *
    //30 - OPEN/CREATE WALL WITH SWITCHES? (X/Y) *
    //32 - CREATE PAD (F/X/Y) 
    //34 - MOVE PILLAR AT PLAYER X,Y TO PLAYER X-1,Y-1 (SPECIAL CASE) **
    //36 - CREATE PILLAR (X/Y) *
    //38 - KEEP ENTRANCE (SIDE PAD) (X/Y OF OPPOSITE PAD)
    //40 - KEEP ENTRANCE (CENTRAL PAD)
    //42 - FLASH TELEPORT (F/X/Y)
    //44 - ROTATE STONE WALL (X/Y) *
    //46 - TOGGLE WALL (X/Y) *
    //48 - SPINNER (UNKNOWN DIFFERENCE) (X/Y) *
    //50 - CLICK TELEPORT (F/X/Y)
    //52 - TOGGLE GREEN PAD (X/Y) *
    //54 - ROTATE WOOD WALL COUNTER-CLOCKWISE (X/Y) *
    //56 - TOGGLE HOLE (X/Y) *
    //58 - GAME COMPLETION PAD **
    //60 - REMOVE PILLAR / OTHER EVENT (X/Y) **



}
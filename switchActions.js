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

function mod0Actions(r,p){
    
    actionType(tw.Switches[r],p);
  
}

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
        case 8: {};break;  //JORG PLEASE FIX THIS!!!
        case 10: {tw.Levels[p.level].Map[sw[2]][sw[3]] = togglePillar(tw.Levels[p.level].Map[sw[2]][sw[3]]);};break;
        case 12: {tw.Levels[p.level].Map[sw[2]][sw[3]] = tw.Levels[p.level].Map[sw[2]][sw[3]].replaceAt(3,"0");}break;
        case 14: {};break;  //JORG PLEASE FIX THIS!!!
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
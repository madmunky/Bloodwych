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
         
        case 2: {tw.Levels[p.level].Map[sw[2]][sw[3]] = "0000";}break;
        case 4: {tw.Levels[p.level].Map[sw[2]][sw[3]] = toggleWall(tw.Levels[p.level].Map[sw[2]][sw[3]]);};break;
        case 6: {};break;  //JORG PLEASE FIX THIS!!!
        case 8: {};break;  //JORG PLEASE FIX THIS!!!
        case 10: {tw.Levels[p.level].Map[sw[2]][sw[3]] = togglePillar(tw.Levels[p.level].Map[sw[2]][sw[3]]);};break;
        case 12: {tw.Levels[p.level].Map[sw[2]][sw[3]] = "0000";}break;
        case 14: {};break;  //JORG PLEASE FIX THIS!!!
         
     }
    
}

function toggleWall(hex){
    
    if (hex === "0001"){
        return "0000";
    }
    else {
        return "0001";
    }

}

function togglePillar(hex){
    
    if (hex === "0103"){
        return "0000";
    }
    else {
        return "0103";
    }

}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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
    
    switch (r){
        
        case "0":{};
        case "1":{actionType(tw.Switches[1],p);}break;
        case "2":{actionType(tw.Switches[2],p);}break;
        case "3":{actionType(tw.Switches[3],p);}break;
        case "4":{actionType(tw.Switches[4],p);}break;
        case "5":{actionType(tw.Switches[5],p);}break;
        case "6":{actionType(tw.Switches[6],p);}break;
        case "7":{actionType(tw.Switches[7],p);}break;
        case "8":{actionType(tw.Switches[8],p);}break;
        case "9":{actionType(tw.Switches[9],p);}break;
        case "10":{actionType(tw.Switches[10],p);}break;
        case "11":{actionType(tw.Switches[11],p);}break;
        case "12":{actionType(tw.Switches[12],p);}break;
        case "13":{actionType(tw.Switches[13],p);}break;
        case "14":{actionType(tw.Switches[14],p);}break;
        case "15":{actionType(tw.Switches[15],p);}break;
    }
    
}

function actionType(sw,p){
        //02 - REMOVE
        //04 - TOGGLE STONE WALL
        //06 - OPEN VOID-LOCK DOOR
        //08 - ROTATE BRICK WALL
        //0A - TOGGLE PILLAR
        //0C - PLACE PILLAR
        //0E - ROTATE WOOD WALLS
    
     switch (sw[0]){
         
        case 2: {tw.Levels[p.level].Map[sw[2]][sw[3]] = "0000";}break;
        case 4: {tw.Levels[p.level].Map[sw[2]][sw[3]] = toggleWall(tw.Levels[p.level].Map[sw[2]][sw[3]]);};break;
        case 6: {};break;
        case 8: {};break;
        case 10: {};break;
        case 12: {};break;
        case 14: {};break;
         
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
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
        case "1":{tw.Levels[p.level].Map[8][1] = "0000";}break;
        case "2":{tw.Levels[p.level].Map[1][17] = "0000";}break;
        case "3":{tw.Levels[p.level].Map[7][6] = "0000";}break;
        case "4":{tw.Levels[p.level].Map[12][2] = "0000";}break;
        case "5":{tw.Levels[p.level].Map[9][1] = "0000";}break;
        case "6":{tw.Levels[p.level].Map[1][9] = "0000";}break;
        case "7":{}break;
        case "8":{}break;
        case "9":{tw.Levels[p.level].Map[30][21] = "0000";}break;
        case "10":{tw.Levels[p.level].Map[8][11] = "0000";}break;
        case "11":{tw.Levels[p.level].Map[2][11] = "0000";}break;
        case "12":{tw.Levels[p.level].Map[4][14] = "0000";}break;
        case "13":{tw.Levels[p.level].Map[12][17] = "0000";}break;
        case "14":{tw.Levels[p.level].Map[23][17] = "0000";}break;
        case "15":{}break;
    }
    
}
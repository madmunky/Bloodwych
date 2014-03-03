/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function bwObject(Hex) {
    
    createSides();
    
    this.Sides = [];
    this.Type = returnType(Hex.subString(3,1));
    this.Locked = false;
    this.Door = false;
    this.Passable = false;
        
    function getWallGfx() {
        
    }; 
    
    function createSides() {
        
        for (x = 0; x < 4; x++) {
            
        }
        
    }
    
};

function returnType(t) {
    
    switch (t) {
        
        case 0:{return "Empty";}break;
        case 1:{return "StoneWall";}break;
        case 2:{return "Wooden";}break;
        case 3:{return "Bed/Pillar";}break;
        case 4:{return "Stairs";}break;
        case 5:{return "Door";}break;
        case 6:{return "FloorPad";}break;
        default :{console.log ("Unhandled: " + t.toString);}break;    
    }
    
}



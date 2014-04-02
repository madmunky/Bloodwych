/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 /*
bw.direction = {
    North : 0,
    East : 1,
    South : 2,
    West : 3
};*/

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

function ReturnWoodenObject(hex,p) {
    
        var b = hex2bin(hex.substring(0,2));
        var s = [];
        s[0] = b.substring(6,8); //North Face
        s[1] = b.substring(4,6); //East Face
        s[2] = b.substring(2,4); //South Face
        s[3] = b.substring(0,2); //West Face
        
        var CurrentBlock = false;
        
        if (hex === p.View[18]){CurrentBlock = true;};
        
        if (CurrentBlock){
            
            switch (p.Rotation) {
            
        case 0:{
                switch (p.moving) {                    
                    case 0:{return s[0];};break;
                    case 1:{return s[3];};break;
                    case 2:{return s[2];};break;
                    case 3:{return s[1];};break;                        
                }                
        };break;
        case 1:{
                switch (p.moving) {                    
                    case 0:{return s[3];};break;
                    case 1:{return s[0];};break;
                    case 2:{return s[1];};break;
                    case 3:{return s[2];};break;                        
                }  
        };break;
        case 2:{
                switch (p.moving) {                    
                    case 0:{return s[2];};break;
                    case 1:{return s[1];};break;
                    case 2:{return s[0];};break;
                    case 3:{return s[3];};break;                        
                }  
        };break;
        case 3:{
                switch (p.moving) {                    
                    case 0:{return s[1];};break;
                    case 1:{return s[2];};break;
                    case 2:{return s[3];};break;
                    case 3:{return s[0];};break;                        
                }  
        };break;
            
        }
            
        }
        else {
        
        switch (p.Rotation) {
            
        case 0:{
                switch (p.moving) {                    
                    case 0:{return s[2];};break;
                    case 1:{return s[1];};break;
                    case 2:{return s[0];};break;
                    case 3:{return s[3];};break;                        
                }                
        };break;
        case 1:{
                switch (p.moving) {                    
                    case 0:{return s[3];};break;
                    case 1:{return s[2];};break;
                    case 2:{return s[1];};break;
                    case 3:{return s[0];};break;                        
                }  
        };break;
        case 2:{
                switch (p.moving) {                    
                    case 0:{return s[0];};break;
                    case 1:{return s[3];};break;
                    case 2:{return s[2];};break;
                    case 3:{return s[1];};break;                        
                }  
        };break;
        case 3:{
                switch (p.moving) {                    
                    case 0:{return s[1];};break;
                    case 1:{return s[0];};break;
                    case 2:{return s[3];};break;
                    case 3:{return s[2];};break;                        
                }  
        };break;
            
        }}    
    
}

function WoodType(hex) {
    
    var t = parseInt(hex,16);
    
    switch (parseInt(hex,16)) {
        
        case 0:{return true;};break;
        case 1:{return false;};break;
        case 16:{return true;};break;
        case 17:{return false;};break;
            
    }
    
}
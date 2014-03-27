/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
bw.direction = {
    North : 0,
    East : 1,
    South : 2,
    West : 3
};

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

function WoodenObjectPassable(hex,p) {
    
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
                    case 0:{return WoodType(s[0]);};break;
                    case 1:{return WoodType(s[3]);};break;
                    case 2:{return WoodType(s[2]);};break;
                    case 3:{return WoodType(s[1]);};break;                        
                }                
        };break;
        case 1:{
                switch (p.moving) {                    
                    case 0:{return WoodType(s[1]);};break;
                    case 1:{return WoodType(s[0]);};break;
                    case 2:{return WoodType(s[3]);};break;
                    case 3:{return WoodType(s[2]);};break;                        
                }  
        };break;
        case 2:{
                switch (p.moving) {                    
                    case 0:{return WoodType(s[2]);};break;
                    case 1:{return WoodType(s[1]);};break;
                    case 2:{return WoodType(s[0]);};break;
                    case 3:{return WoodType(s[3]);};break;                        
                }  
        };break;
        case 3:{
                switch (p.moving) {                    
                    case 0:{return WoodType(s[3]);};break;
                    case 1:{return WoodType(s[2]);};break;
                    case 2:{return WoodType(s[1]);};break;
                    case 3:{return WoodType(s[0]);};break;                        
                }  
        };break;}            
        }
        else {
            
        switch (p.Rotation) {
            
        case 0:{
                switch (p.moving) {                    
                    case 0:{return WoodType(s[2]);};break;
                    case 1:{return WoodType(s[1]);};break;
                    case 2:{return WoodType(s[0]);};break;
                    case 3:{return WoodType(s[3]);};break;                        
                }                
        };break;
        case 1:{
                switch (p.moving) {                    
                    case 0:{return WoodType(s[3]);};break;
                    case 1:{return WoodType(s[2]);};break;
                    case 2:{return WoodType(s[1]);};break;
                    case 3:{return WoodType(s[0]);};break;                        
                }  
        };break;
        case 2:{
                switch (p.moving) {                    
                    case 0:{return WoodType(s[0]);};break;
                    case 1:{return WoodType(s[3]);};break;
                    case 2:{return WoodType(s[2]);};break;
                    case 3:{return WoodType(s[1]);};break;                        
                }  
        };break;
        case 3:{
                switch (p.moving) {                    
                    case 0:{return WoodType(s[1]);};break;
                    case 1:{return WoodType(s[0]);};break;
                    case 2:{return WoodType(s[3]);};break;
                    case 3:{return WoodType(s[2]);};break;                        
                }  
        };break;
            
        }}    
    
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

function changeWoodenObject(hex,p){
    
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
                case 0:{s[0] = toggleWoodenDoor(s[0]);};break;
                case 1:{s[1] = toggleWoodenDoor(s[1]);};break;
                case 2:{s[2] = toggleWoodenDoor(s[2]);};break;
                case 3:{s[3] = toggleWoodenDoor(s[3]);};break;    
        }                   
        }
        else {switch (p.Rotation) {            
                case 0:{s[2] = toggleWoodenDoor(s[2]);};break;
                case 1:{s[3] = toggleWoodenDoor(s[3]);};break;
                case 2:{s[0] = toggleWoodenDoor(s[0]);};break;
                case 3:{s[1] = toggleWoodenDoor(s[1]);};break;    
        }} 
        
        var tt = s[3];
        tt = tt + s[2];
        tt = tt + s[1];
        tt = tt + s[0];
    
        var t1 = tt.substring(0,4);
        var t2 = tt.substring(4,8);
        var t = bin2hex(t1);
        var ttt = bin2hex(t2);
        
        return t + ttt;
                
}

function toggleWoodenDoor(bit) {
    
    if (bit !== "00" && bit !== "01"){
        if (bit === "11"){bit = "10";}else{bit = "11";}
    }    
    
    return bit;
    
}


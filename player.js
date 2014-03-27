function player(posX,posY,level,rotation,PortX,PortY) {
    
    this.X=posX;
    this.Y=posY;
    this.level=level;
    this.Rotation= rotation;
    this.PortalX=PortX;
    this.PortalY=PortY;
    this.View = [];
    this.pbg = 0;
    this.lastX = posX;
    this.lastY = posY;
    this.lastLevel = level;
    this.moving = 0; //0 = Forward,1 = Left, 2 = Backwards, 3 = Right
  
  try{
  tw.Levels[this.level].Map[this.Y][this.X] = tw.Levels[this.level].Map[this.Y][this.X].replaceAt(2,"8");
  }
  catch(c){};
}

var Direction = {
        North: 0,
        East: 1,
        South: 2,
        West: 3,
        properties: {
            0: {name: "North", value: 0},
            1: {name: "West", value: 1},
            2: {name: "South", value: 2},
            3: {name: "West", value: 3}
        }
    };

function checkObject(hex,p) {
    
//Passes in a MAP HEX Code and returns a True or False
    
    switch (hex.substring(3,4)) {
    
        case "0": {return true;};
        case "1": {return false;};
        case "2": {return WoodenObjectPassable(hex,p);}
        case "3": {return false;};
        case "5": {if (parseInt(hex.substring(1, 2),16) % 2 === 0){return true;}else{return false;}};
        
        default: {return true;break};
        
    }       
    
}

player.prototype.ChangeUpLevel = function() {
    
    //In bloodwych when the player moves levels they also moved 2 places forward
    //This function changes the players level and moves the player forward 2x spaces
    
    this.level++;
    if (this.level > tw.length){
        this.level = 0;
    }
    else {
        this.moveForward();
        this.moveForward();
    }
    
};

player.prototype.ChangeDownLevel = function() {
    
    //In bloodwych when the player moves levels they also moved 2 places forward
    //This function changes the players level and moves the player forward 2x spaces
    
    this.level--;
    if (this.level < tw.length){
        this.level = tw.length;
    }
    else{
        this.moveForward();
        this.moveForward();
    }
};

player.prototype.switchPlayerBackground = function() {
  
    if (this.pbg === 0){this.pbg = 1;}else {this.pbg = 0;}  
    
};

//Take the map code which is in front of the player and see if the player can interact with it.
player.prototype.Action = function() {
    //Doors
    if (this.getBinaryView(15, 12, 4) == '5') {
        var t = this.getBinaryView(15, 1, 3);
        switch (t) {
          case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7':
            this.setBinaryView(15, 7); break;
          default: break;
        }
    }
    //Wall switches
    if (this.getBinaryView(15, 8) == '1' && this.getBinaryView(15, 6, 2) == '2') {
        this.setBinaryView(15, 5);
    }
    //Wooden doors (in front of player)
    if (this.getBinaryView(15, 12, 4) == '2' && this.getBinaryView(15, ((5 - this.Rotation) % 4) * 2) == '1') {
      this.setBinaryView(15, ((5 - this.Rotation) % 4) * 2 + 1);
    }
    //Wooden doors (on player)
    if (this.getBinaryView(18, 12, 4) == '2' && this.getBinaryView(18, ((7 - this.Rotation) % 4) * 2) == '1'){
      this.setBinaryView(18, ((7 - this.Rotation) % 4) * 2 + 1);       
    }
};

//Sets a binary index on a hexadecimal string to a certain binary flag
player.prototype.setBinaryView = function(pos18, index, to) {
  var xy = posToCoordinates(pos18, this.X, this.Y, this.Rotation);
  tw.Levels[this.level].Map[xy["y"]][xy["x"]] = setHexToBinaryPosition(tw.Levels[this.level].Map[xy["y"]][xy["x"]], index, to);
};

player.prototype.getBinaryView = function(pos18, index, length) {
  var xy = posToCoordinates(pos18, this.X, this.Y, this.Rotation);
  try {
    return getHexToBinaryPosition(tw.Levels[this.level].Map[xy["y"]][xy["x"]], index, length);
  } catch(e) {
    return '0001';
  }
};

player.prototype.UpdateMap = function() {
   
        tw.Levels[this.lastLevel].Map[this.lastY][this.lastX] = tw.Levels[this.lastLevel].Map[this.lastY][this.lastX].replaceAt(2,"0");
        tw.Levels[this.level].Map[this.Y][this.X] = tw.Levels[this.level].Map[this.Y][this.X].replaceAt(2,"8");  
         
  
  this.lastX = this.X;
  this.lastY = this.Y;
  this.lastLevel = this.level;
  //this.lastLevel = this.level;
  
};

player.prototype.moveForward = function() {
    
    this.moving = 0;
    this.UpdateMap();
    this.lastX = this.X;
    this.lastY = this.Y;

    if (checkObject(this.View[15],this) && (checkObject(this.View[18],this))) {

        xo = 0, yo = 0;
        
        switch (this.Rotation){
          case 0: xo = 0; yo = -1; break;
          case 1: xo = 1; yo = 0; break;
          case 2: xo = 0; yo = 1; break;
          case 3: xo = -1; yo = 0; break;
        }
        
       this.Y = this.Y + (1 * yo) - (0 * xo);
       this.X = this.X + (1 * xo) + (0 * yo);
       if (debug) {PrintLog("Player Moved Forward");}
       ;
       this.switchPlayerBackground();
    } 
    playerEvents(this);
};

player.prototype.moveBackwards = function() {
    this.moving = 2;
    this.UpdateMap();
    this.lastX = this.X;
    this.lastY = this.Y;

    if (checkObject(this.View[19],this) && (checkObject(this.View[18],this))) {
        xo = 0, yo = 0;
        
        switch (this.Rotation){
          case 0: xo = 0; yo = -1; break;
          case 1: xo = 1; yo = 0; break;
          case 2: xo = 0; yo = 1; break;
          case 3: xo = -1; yo = 0; break;
        }
        
       this.Y = this.Y - (1 * yo) - (0 * xo);
       this.X = this.X - (1 * xo) + (0 * yo);
       if (debug) {PrintLog("Player Moved Backwards");}       
       
       this.switchPlayerBackground();
    }
    playerEvents(this);
};

player.prototype.moveLeft = function() {
    this.moving = 1;
    this.UpdateMap();
    this.lastX = this.X;
    this.lastY = this.Y;
    
   if (checkObject(this.View[17],this)&& (checkObject(this.View[18],this))) {
    xo = 0, yo = 0;
        
        switch (this.Rotation){
          case 0: xo = 0; yo = -1; break;
          case 1: xo = 1; yo = 0; break;
          case 2: xo = 0; yo = 1; break;
          case 3: xo = -1; yo = 0; break;
        }
    
    this.Y = this.Y - (0 * yo) - (1 * xo);
    this.X = this.X - (0 * xo) + (1 * yo);
    if (debug) {PrintLog("Player Moved Left");}   
    playerEvents(this);
    this.switchPlayerBackground();
   }
};

player.prototype.moveRight = function() {
    this.moving = 3;
    this.UpdateMap();
    this.lastX = this.X;
    this.lastY = this.Y;
    
   if (checkObject(this.View[16],this)&& (checkObject(this.View[18],this))) { 
            xo = 0, yo = 0;
        
        switch (this.Rotation){
          case 0: xo = 0; yo = -1; break;
          case 1: xo = 1; yo = 0; break;
          case 2: xo = 0; yo = 1; break;
          case 3: xo = -1; yo = 0; break;
        }
    
    this.Y = this.Y - (0 * yo) + (1 * xo);
    this.X = this.X - (0 * xo) - (1 * yo);
    if (debug) {PrintLog("Player Moved Right");}
    playerEvents(this);
    this.switchPlayerBackground();
    
   }
};

player.prototype.RotatePlayer = function(d){
    
    if (d === 1) {
        this.Rotation = this.Rotation -1;
        if (this.Rotation < 0) {
            this.Rotation = 3;
        }
        if (debug) {PrintLog("Player Rotated Anti-Clockwise");}
    }
    else {
        this.Rotation = this.Rotation +1;
        if (this.Rotation > 3) {
            this.Rotation = 0;
        }
        if (debug) {PrintLog("Player Rotated Clockwise");}
    }   
    this.switchPlayerBackground();
    checkCurrentSqaure(this);
};

player.prototype.pView = function(m){
    
    //m = Map Data
    //This function takes the map file and stores the 20 positions required 
    //to either draw the players view or objects which the player are likely to interact with
    //like standing on a presure pad or stairs or if there is a door infront of the player etc..
        
        this.View = [];    
        
        switch (this.Rotation){
          case 0: xo = 0; yo = -1; break;
          case 1: xo = 1; yo = 0; break;
          case 2: xo = 0; yo = 1; break;
          case 3: xo = -1; yo = 0; break;
        }
            
    var t1 = this.Y + (3 * yo) + (1 * xo);
    var t2 = this.X + (3 * xo) - (1 * yo);
    
        for (x = 0;x < 20;x++){
            
            try {
            switch (x){
                case 0:{this.View.push(m[this.Y + (4 * yo) + (2 * xo)][this.X + (4 * xo) - (2 * yo)]);};break; //-4 +2
                case 1:{this.View.push(m[this.Y + (4 * yo) - (2 * xo)][this.X + (4 * xo) + (2 * yo)]);};break; //-4 -2
                case 2:{this.View.push(m[this.Y + (4 * yo) + (1 * xo)][this.X + (4 * xo) - (1 * yo)]);};break; //-4 +1
                case 3:{this.View.push(m[this.Y + (4 * yo) - (1 * xo)][this.X + (4 * xo) + (1 * yo)]);};break; //-4 -1
                case 4:{this.View.push(m[this.Y + (4 * yo) - (0 * xo)][this.X + (4 * xo) + (0 * yo)]);};break; //-4 0
                case 5:{this.View.push(m[this.Y + (3 * yo) + (2 * xo)][this.X + (3 * xo) - (2 * yo)]);};break; //-3 +2 
                case 6:{this.View.push(m[this.Y + (3 * yo) - (2 * xo)][this.X + (3 * xo) + (2 * yo)]);};break; //-3 -2
                case 7:{this.View.push(m[this.Y + (3 * yo) + (1 * xo)][this.X + (3 * xo) - (1 * yo)]);};break; //-3 +1
                case 8:{this.View.push(m[this.Y + (3 * yo) - (1 * xo)][this.X + (3 * xo) + (1 * yo)]);};break; //-3 -1
                case 9:{this.View.push(m[this.Y + (3 * yo) - (0 * xo)][this.X + (3 * xo) - (0 * yo)]);};break; //-3 0
                case 10:{this.View.push(m[this.Y + (2 * yo) + (1 * xo)][this.X + (2 * xo) - (1 * yo)]);};break; //-2 +1                
                case 11:{this.View.push(m[this.Y + (2 * yo) - (1 * xo)][this.X + (2 * xo) + (1 * yo)]);};break; //-2 -1
                case 12:{this.View.push(m[this.Y + (2 * yo) - (0 * xo)][this.X + (2 * xo) + (0 * yo)]);};break; //-2 0
                case 13:{this.View.push(m[this.Y + (1 * yo) + (1 * xo)][this.X + (1 * xo) - (1 * yo)]);};break; //-1 +1
                case 14:{this.View.push(m[this.Y + (1 * yo) - (1 * xo)][this.X + (1 * xo) + (1 * yo)]);};break; //-1 -1
                case 15:{this.View.push(m[this.Y + (1 * yo) - (0 * xo)][this.X + (1 * xo) + (0 * yo)]);};break; //-1 0
                case 16:{this.View.push(m[this.Y + (0 * yo) + (1 * xo)][this.X + (0 * xo) - (1 * yo)]);};break; //0 +1
                case 17:{this.View.push(m[this.Y + (0 * yo) - (1 * xo)][this.X + (0 * xo) + (1 * yo)]);};break; //0 -1
                case 18:{this.View.push(m[this.Y][this.X]);};break; //0 0
                case 19:{this.View.push(m[this.Y - (1 * yo) - (0 * xo)][this.X - (1 * xo) + (0 * yo)]);};break; //-1 0
                default:{this.View.push("0001");};break;
            }
        }catch(e){
           this.View.push("0001");
        }        
        }
        
        for (x = 0;x < 20;x++){
            if (this.View[x] === undefined) {
                this.View[x] = "0001";
            }
                
        }
        
    };
    
player.prototype.drawView = function(p) {
    
    //To draw the players view it consists of 30 tiles to build up the screen view
    //we use the players view to work out what each of these 30 images should be based
    //on the player direction and the map code 
    
    for (var i = 0; i < 29; i++) {
        
        //getWallDirection(p.Rotation,i);
        
        switch (i) {
            
            case 0:{myDIx(ctx, getImage(this.View[0],getWallDirection(p.Rotation,28),28,p,0), gfxPos[28], this, scale);};break;
            case 1:{myDIx(ctx, getImage(this.View[0],getWallDirection(p.Rotation,27),27,p,0), gfxPos[27], this, scale);};break;
            case 2:{myDIx(ctx, getImage(this.View[1],getWallDirection(p.Rotation,26),26,p,1), gfxPos[26], this, scale);};break;
            case 3:{myDIx(ctx, getImage(this.View[1],getWallDirection(p.Rotation,25),25,p,1), gfxPos[25], this, scale);};break;
            case 4:{myDIx(ctx, getImage(this.View[5],getWallDirection(p.Rotation,24),24,p,5), gfxPos[24], this, scale);};break;                
            case 5:{myDIx(ctx, getImage(this.View[2],getWallDirection(p.Rotation,23),23,p,2), gfxPos[23], this, scale);};break;
            case 6:{myDIx(ctx, getImage(this.View[2],getWallDirection(p.Rotation,22),22,p,2), gfxPos[22], this, scale);};break;
            case 7:{myDIx(ctx, getImage(this.View[3],getWallDirection(p.Rotation,21),21,p,3), gfxPos[21], this, scale);};break;
            case 8:{myDIx(ctx, getImage(this.View[3],getWallDirection(p.Rotation,20),20,p,3), gfxPos[20], this, scale);};break;
            case 9:{myDIx(ctx, getImage(this.View[6],getWallDirection(p.Rotation,19),19,p,6), gfxPos[19], this, scale);};break;
            case 10:{myDIx(ctx, getImage(this.View[7],getWallDirection(p.Rotation,18),18,p,7), gfxPos[18], this, scale);};break;
            case 11:{myDIx(ctx, getImage(this.View[7],getWallDirection(p.Rotation,17),17,p,7), gfxPos[17], this, scale);};break;
            case 12:{myDIx(ctx, getImage(this.View[4],getWallDirection(p.Rotation,16),16,p,4), gfxPos[16], this, scale);};break;
            case 13:{myDIx(ctx, getImage(this.View[8],getWallDirection(p.Rotation,15),15,p,8), gfxPos[15], this, scale);};break;
            case 14:{myDIx(ctx, getImage(this.View[8],getWallDirection(p.Rotation,14),14,p,8), gfxPos[14], this, scale);};break;
            case 15:{myDIx(ctx, getImage(this.View[10],getWallDirection(p.Rotation,13),13,p,10), gfxPos[13], this, scale);};break;
            case 16:{myDIx(ctx, getImage(this.View[10],getWallDirection(p.Rotation,12),12,p,10), gfxPos[12], this, scale);};break;
            case 17:{myDIx(ctx, getImage(this.View[9],getWallDirection(p.Rotation,11),11,p,9), gfxPos[11], this, scale);};break;
            case 18:{myDIx(ctx, getImage(this.View[11],getWallDirection(p.Rotation,10),10,p,11), gfxPos[10], this, scale);};break;
            case 19:{myDIx(ctx, getImage(this.View[11],getWallDirection(p.Rotation,9),9,p,11), gfxPos[9], this, scale);};break;
            case 20:{myDIx(ctx, getImage(this.View[13],getWallDirection(p.Rotation,8),8,p,13), gfxPos[8], this, scale);};break;
            case 21:{myDIx(ctx, getImage(this.View[13],getWallDirection(p.Rotation,7),7,p,13), gfxPos[7], this, scale);};break;
            case 22:{myDIx(ctx, getImage(this.View[12],getWallDirection(p.Rotation,6),6,p,12), gfxPos[6], this, scale);};break;
            case 23:{myDIx(ctx, getImage(this.View[14],getWallDirection(p.Rotation,5),5,p,14), gfxPos[5], this, scale);};break;
            case 24:{myDIx(ctx, getImage(this.View[14],getWallDirection(p.Rotation,4),4,p,14), gfxPos[4], this, scale);};break;
            case 25:{myDIx(ctx, getImage(this.View[16],getWallDirection(p.Rotation,3),3,p,16), gfxPos[3], this, scale);};break;
            case 26:{myDIx(ctx, getImage(this.View[15],getWallDirection(p.Rotation,2),2,p,15), gfxPos[2], this, scale);};break;
            case 27:{myDIx(ctx, getImage(this.View[17],getWallDirection(p.Rotation,1),1,p,17), gfxPos[1], this, scale);};break;
            case 28:{myDIx(ctx, getImage(this.View[18],getWallDirection(p.Rotation,0),0,p,18), gfxPos[0], this, scale);};break;
            
        }        
    } 
    
    
    
};

function playerEvents(p) {
           
       p.UpdateMap();
       p.pView(tw.Levels[p.level].Map);
       drawPlayersView(p);
       checkCurrentSqaure(p);      
}

function checkCurrentSqaure(p) {    
  
   p.UpdateMap();
  
    switch (parseInt(p.View[18].substring(3,4),16)) {
        
        case 4: {playerOnStair(p,true);};break;
        case 6: {if(parseInt(p.View[18].substring(1,2),16) % 4 === 1){playerOnPit(p);}};break;
        default: break;        
        
    }

}
function playerOnPit(p) {
    
    changePlayerLevel(p,false);
    p.X = p.X + (tw.Levels[p.level +1].xOffset - tw.Levels[p.level].xOffset);
    p.Y = p.Y + (tw.Levels[p.level +1].yOffset - tw.Levels[p.level].yOffset);
    
}


function playerOnStair(p,stairs){
    
     BB = parseInt(p.View[18].substring(1, 2));
        
        if (BB % 2 === 0){changePlayerLevel(p,true);} // "Stairs Up";            
        else if (BB % 2 === 1){changePlayerLevel(p,false);} // "Stairs Down";
        
         switch (BB) {
            case 0:
            case 1: // "South"
                if (stairs){p.Rotation = 2;}                
                if (BB % 2 === 0){
                    p.X = p.X - (tw.Levels[p.level].xOffset - tw.Levels[p.level -1].xOffset);
                    p.Y = p.Y - (tw.Levels[p.level].yOffset - tw.Levels[p.level -1].yOffset); if (stairs){p.Y = p.Y +2;} ;
                }
                else {
                    p.X = p.X + (tw.Levels[p.level +1].xOffset - tw.Levels[p.level].xOffset);
                    p.Y = p.Y + (tw.Levels[p.level +1].yOffset - tw.Levels[p.level].yOffset); if (stairs){p.Y = p.Y +2;}
                }
                break;
            case 2:
            case 3: // "West";
                if (stairs){p.Rotation = 3;}
                if (BB % 2 === 0){  
                    p.X = p.X - (tw.Levels[p.level].xOffset - tw.Levels[p.level -1].xOffset); if (stairs){p.X = p.X -2;};
                    p.Y = (p.Y - (tw.Levels[p.level].yOffset - tw.Levels[p.level -1].yOffset)) ;
                }
                else {
                    p.X = p.X + (tw.Levels[p.level +1].xOffset - tw.Levels[p.level].xOffset); if (stairs){p.X = p.X -2;};
                    p.Y = (p.Y + (tw.Levels[p.level +1].yOffset - tw.Levels[p.level].yOffset)) ;
                }
                break;
            case 4:
            case 5: // "North";
                if (stairs){p.Rotation = 0;}
                if (BB % 2 === 0){
                    p.X = p.X - (tw.Levels[p.level].xOffset - tw.Levels[p.level -1].xOffset);
                    p.Y = p.Y - (tw.Levels[p.level].yOffset - tw.Levels[p.level -1].yOffset); if (stairs){p.Y = p.Y -2;} ;
                }
                else {
                    p.X = p.X + (tw.Levels[p.level +1].xOffset - tw.Levels[p.level].xOffset);
                    p.Y = p.Y + (tw.Levels[p.level +1].yOffset - tw.Levels[p.level].yOffset); if (stairs){p.Y = p.Y -2;}
                }
                break;
            case 6:
            case 7: // "East";
                if (stairs){p.Rotation = 1;}
                if (BB % 2 === 0){  
                    p.X = p.X - (tw.Levels[p.level].xOffset - tw.Levels[p.level -1].xOffset); if (stairs){p.X = p.X +2;};
                    p.Y = (p.Y - (tw.Levels[p.level].yOffset - tw.Levels[p.level -1].yOffset)) ;
                }
                else {                    
                    p.X = p.X + (tw.Levels[p.level +1].xOffset - tw.Levels[p.level].xOffset); if (stairs){p.X = p.X +2;};
                    p.Y = (p.Y + (tw.Levels[p.level +1].yOffset - tw.Levels[p.level].yOffset)) ;
                }
                break;
            default:
                break;
        }
  //  p.UpdateMap();
}

function changePlayerLevel(p,l){
    
    //Change the Players Level
    //l = Boolean
    //True = Move Player Up a Level
    //False = Move Player Down a Level
    
    p.lastLevel = p.level;
    
    if (l) {        
        p.level = p.level +1 ;        
    }
    else {
        p.level = p.level -1 ;
    }
    
}


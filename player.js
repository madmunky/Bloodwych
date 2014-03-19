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
    //this.lastLevel = this.level;
   
  tw.Levels[this.level].Map[this.Y][this.X] = tw.Levels[this.level].Map[this.Y][this.X].replaceAt(2,"8");
   
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

function checkObject(hex) {
    
    //var t = hex.substring(3,4);
    
    if (parseInt(hex.substring(2,3),16) === 8){
        return;false;
    }
    
    switch (hex.substring(3,4)) {
    
        case "0": {return true;};
        case "1": {return false;};
        case "3": {return false;};
        case "5": {if (parseInt(hex.substring(1, 2),16) % 2 === 0){return true;}else{return false;}};
        
        default: {return true;break};
        
    }       
    
}

player.prototype.ChangeUpLevel = function() {
    
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
    
    if (this.pbg === 0)
    {this.pbg = 1;}
    else {this.pbg = 0;}   
    
};

player.prototype.Action = function() {
    
    if (this.View[15].substring(3,4) === "5") {
    
        xo = 0, yo = 0;
        var MapX;
        var MapY;

            switch (this.Rotation){
              case 0: xo = 0; yo = -1; break;
              case 1: xo = 1; yo = 0; break;
              case 2: xo = 0; yo = 1; break;
              case 3: xo = -1; yo = 0; break;
            }

           MapY = this.Y + (1 * yo) - (0 * xo);
           MapX = this.X + (1 * xo) + (0 * yo);
 
        var t = parseInt(this.View[15].substring(1,2),16);
 
 
        switch (t) {

         case 0 :{tw.Levels[this.level].Map[MapY][MapX] = tw.Levels[this.level].Map[MapY][MapX].replaceAt(1,"1");break;};
         case 1 :{tw.Levels[this.level].Map[MapY][MapX] = tw.Levels[this.level].Map[MapY][MapX].replaceAt(1,"0");break;};
         case 2 :{tw.Levels[this.level].Map[MapY][MapX] = tw.Levels[this.level].Map[MapY][MapX].replaceAt(1,"3");break;};
         case 3 :{tw.Levels[this.level].Map[MapY][MapX] = tw.Levels[this.level].Map[MapY][MapX].replaceAt(1,"2");break;};
         case 4 :{tw.Levels[this.level].Map[MapY][MapX] = tw.Levels[this.level].Map[MapY][MapX].replaceAt(1,"5");break;};
         case 5 :{tw.Levels[this.level].Map[MapY][MapX] = tw.Levels[this.level].Map[MapY][MapX].replaceAt(1,"4");break;};
         case 6 :{tw.Levels[this.level].Map[MapY][MapX] = tw.Levels[this.level].Map[MapY][MapX].replaceAt(1,"7");break;};
         case 7 :{tw.Levels[this.level].Map[MapY][MapX] = tw.Levels[this.level].Map[MapY][MapX].replaceAt(1,"6");break;};
         case 14:{tw.Levels[this.level].Map[MapY][MapX] = tw.Levels[this.level].Map[MapY][MapX].replaceAt(1,"F");break;};
         case 15:{tw.Levels[this.level].Map[MapY][MapX] = tw.Levels[this.level].Map[MapY][MapX].replaceAt(1,"E");break;};
         default:{break;};

        }
    }    
};

player.prototype.UpdateMap = function() {


  try {  
        tw.Levels[this.level].Map[this.lastY][this.lastX] = tw.Levels[this.level].Map[this.lastY][this.lastX].replaceAt(2,"0");  
        tw.Levels[this.level].Map[this.Y][this.X] = tw.Levels[this.level].Map[this.Y][this.X].replaceAt(2,"8");  
     }catch (e){PrintLog("Error: " + e);};
  
  this.lastX = this.X;
  this.lastY = this.Y;
  //this.lastLevel = this.level;
  
};

player.prototype.moveForward = function() {

    if (checkObject(this.View[15])) {

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
       playerEvents(this);
    }    
};

player.prototype.moveBackwards = function() {

    if (checkObject(this.View[19])) {
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
       
       
    }
    playerEvents(this);
};

player.prototype.moveLeft = function() {
    
   if (checkObject(this.View[17])) {
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
   }
};

player.prototype.moveRight = function() {
   if (checkObject(this.View[16])) { 
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
    this.View[18]
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
    
    for (var i = 0; i < 29; i++) {
        
        //getWallDirection(p.Rotation,i);
        
        switch (i) {
            
            case 0:{myDIx(ctx, getImage(this.View[0],getWallDirection(p.Rotation,28),28,p), gfxPos[28], this, scale);};break;
            case 1:{myDIx(ctx, getImage(this.View[0],getWallDirection(p.Rotation,27),27,p), gfxPos[27], this, scale);};break;
            case 2:{myDIx(ctx, getImage(this.View[1],getWallDirection(p.Rotation,26),26,p), gfxPos[26], this, scale);};break;
            case 3:{myDIx(ctx, getImage(this.View[1],getWallDirection(p.Rotation,25),25,p), gfxPos[25], this, scale);};break;
            case 4:{myDIx(ctx, getImage(this.View[5],getWallDirection(p.Rotation,24),24,p), gfxPos[24], this, scale);};break;                
            case 5:{myDIx(ctx, getImage(this.View[2],getWallDirection(p.Rotation,23),23,p), gfxPos[23], this, scale);};break;
            case 6:{myDIx(ctx, getImage(this.View[2],getWallDirection(p.Rotation,22),22,p), gfxPos[22], this, scale);};break;
            case 7:{myDIx(ctx, getImage(this.View[3],getWallDirection(p.Rotation,21),21,p), gfxPos[21], this, scale);};break;
            case 8:{myDIx(ctx, getImage(this.View[3],getWallDirection(p.Rotation,20),20,p), gfxPos[20], this, scale);};break;
            case 9:{myDIx(ctx, getImage(this.View[6],getWallDirection(p.Rotation,19),19,p), gfxPos[19], this, scale);};break;
            case 10:{myDIx(ctx, getImage(this.View[7],getWallDirection(p.Rotation,18),18,p), gfxPos[18], this, scale);};break;
            case 11:{myDIx(ctx, getImage(this.View[7],getWallDirection(p.Rotation,17),17,p), gfxPos[17], this, scale);};break;
            case 12:{myDIx(ctx, getImage(this.View[4],getWallDirection(p.Rotation,16),16,p), gfxPos[16], this, scale);};break;
            case 13:{myDIx(ctx, getImage(this.View[8],getWallDirection(p.Rotation,15),15,p), gfxPos[15], this, scale);};break;
            case 14:{myDIx(ctx, getImage(this.View[8],getWallDirection(p.Rotation,14),14,p), gfxPos[14], this, scale);};break;
            case 15:{myDIx(ctx, getImage(this.View[10],getWallDirection(p.Rotation,13),13,p), gfxPos[13], this, scale);};break;
            case 16:{myDIx(ctx, getImage(this.View[10],getWallDirection(p.Rotation,12),12,p), gfxPos[12], this, scale);};break;
            case 17:{myDIx(ctx, getImage(this.View[9],getWallDirection(p.Rotation,11),11,p), gfxPos[11], this, scale);};break;
            case 18:{myDIx(ctx, getImage(this.View[11],getWallDirection(p.Rotation,10),10,p), gfxPos[10], this, scale);};break;
            case 19:{myDIx(ctx, getImage(this.View[11],getWallDirection(p.Rotation,9),9,p), gfxPos[9], this, scale);};break;
            case 20:{myDIx(ctx, getImage(this.View[13],getWallDirection(p.Rotation,8),8,p), gfxPos[8], this, scale);};break;
            case 21:{myDIx(ctx, getImage(this.View[13],getWallDirection(p.Rotation,7),7,p), gfxPos[7], this, scale);};break;
            case 22:{myDIx(ctx, getImage(this.View[12],getWallDirection(p.Rotation,6),6,p), gfxPos[6], this, scale);};break;
            case 23:{myDIx(ctx, getImage(this.View[14],getWallDirection(p.Rotation,5),5,p), gfxPos[5], this, scale);};break;
            case 24:{myDIx(ctx, getImage(this.View[14],getWallDirection(p.Rotation,4),4,p), gfxPos[4], this, scale);};break;
            case 25:{myDIx(ctx, getImage(this.View[16],getWallDirection(p.Rotation,3),3,p), gfxPos[3], this, scale);};break;
            case 26:{myDIx(ctx, getImage(this.View[15],getWallDirection(p.Rotation,2),2,p), gfxPos[2], this, scale);};break;
            case 27:{myDIx(ctx, getImage(this.View[17],getWallDirection(p.Rotation,1),1,p), gfxPos[1], this, scale);};break;
            case 28:{myDIx(ctx, getImage(this.View[18],getWallDirection(p.Rotation,0),0,p), gfxPos[0], this, scale);};break;
            
        }        
    } 
    
    
    
};

function playerEvents(p) {
    
       p.switchPlayerBackground();
       p.UpdateMap();
       p1.pView(tw.Levels[p1.level].Map);
       drawPlayersView(p);
       checkCurrentSqaure(p);
       
}

function checkCurrentSqaure(p) {
    
    switch (parseInt(p.View[18].substring(3,4),16)) {
        
        case 4: {playerOnStair(p);};break;
        default: break;        
        
    }
     
}

function playerOnStair(p){
    
     BB = parseInt(p.View[18].substring(1, 2));
        
        if (BB % 2 === 0){changePlayerLevel(p,true);} // "Stairs Up";            
        else if (BB % 2 === 1){changePlayerLevel(p,false);} // "Stairs Down";
        
         switch (BB) {
            case 0:
            case 1: // "South"
                p.Rotation = 2;
                if (BB % 2 === 0){
                    p.X = p.X - tw.Levels[p.level].xOffset;
                    p.Y = (p.Y - tw.Levels[p.level].yOffset) +2;
                }
                else {
                    p.X = p.X + tw.Levels[p.level +1].xOffset;
                    p.Y = (p.Y + tw.Levels[p.level +1].yOffset) +2;
                }
                break;
            case 2:
            case 3: // "West";
                p.Rotation = 3;
                if (BB % 2 === 0){  
                    p.X = p.X - (tw.Levels[p.level].xOffset - tw.Levels[p.level -1].xOffset) -2;
                    p.Y = (p.Y - (tw.Levels[p.level].yOffset - tw.Levels[p.level -1].yOffset)) ;
                }
                else {
                    p.X = p.X + (tw.Levels[p.level +1].xOffset - tw.Levels[p.level].xOffset) -2;
                    p.Y = (p.Y + (tw.Levels[p.level +1].yOffset - tw.Levels[p.level].yOffset)) ;
                }
                break;
            case 4:
            case 5: // "North";
                p.Rotation = 0;
                if (BB % 2 === 0){
                    p.X = p.X - tw.Levels[p.level].xOffset;
                    p.Y = (p.Y - tw.Levels[p.level].yOffset) -2;
                }
                else {
                    p.X = p.X + tw.Levels[p.level +1].xOffset;
                    p.Y = (p.Y + tw.Levels[p.level +1].yOffset) -2;
                }
                break;
            case 6:
            case 7: // "East";
                p.Rotation = 1;
                if (BB % 2 === 0){  
                    p.X = p.X - (tw.Levels[p.level].xOffset - tw.Levels[p.level -1].xOffset) +2;
                    p.Y = (p.Y - (tw.Levels[p.level].yOffset - tw.Levels[p.level -1].yOffset)) ;
                }
                else {                    
                    p.X = p.X + (tw.Levels[p.level +1].xOffset - tw.Levels[p.level].xOffset) +2;
                    p.Y = (p.Y + (tw.Levels[p.level +1].yOffset - tw.Levels[p.level].yOffset)) ;
                }
                break;
            default:
                break;
        }
    p.UpdateMap();
}

function changePlayerLevel(p,l){
    
    //Change the Players Level
    //l = Boolean
    //True = Move Player Up a Level
    //False = Move Player Down a Level
    
    p.lastlevel = p.level;
    
    if (l) {        
        p.level = p.level +1 ;        
    }
    else {
        p.level = p.level -1 ;
    }
    
}


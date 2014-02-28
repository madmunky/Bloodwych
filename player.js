function player(posX,posY,level,rotation)
{
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
    
    
    this.X=posX;
    this.Y=posY;
    this.level=level;
    this.Rotation= rotation;
    this.PortalX=100;
    this.PortalY=100;
    this.View = [];
    
}

player.prototype.moveForward = function mF() {

        xo = 0, yo = 0;
        
        switch (this.Rotation){
          case 0: xo = 0; yo = -1; break;
          case 1: xo = 1; yo = 0; break;
          case 2: xo = 0; yo = 1; break;
          case 3: xo = -1; yo = 0; break;
        }
        
       this.Y = this.Y + (1 * yo) - (0 * xo);
       this.X = this.X + (1 * xo) + (0 * yo);

};

player.prototype.moveBackwards = function mF() {

        xo = 0, yo = 0;
        
        switch (this.Rotation){
          case 0: xo = 0; yo = -1; break;
          case 1: xo = 1; yo = 0; break;
          case 2: xo = 0; yo = 1; break;
          case 3: xo = -1; yo = 0; break;
        }
        
       this.Y = this.Y - (1 * yo) - (0 * xo);
       this.X = this.X - (1 * xo) + (0 * yo);

};

player.prototype.moveLeft = function mL() {
    
            xo = 0, yo = 0;
        
        switch (this.Rotation){
          case 0: xo = 0; yo = -1; break;
          case 1: xo = 1; yo = 0; break;
          case 2: xo = 0; yo = 1; break;
          case 3: xo = -1; yo = 0; break;
        }
    
    this.Y = this.Y - (0 * yo) - (1 * xo);
    this.X = this.X - (0 * xo) + (1 * yo);
};

player.prototype.moveRight = function mR() {
    
            xo = 0, yo = 0;
        
        switch (this.Rotation){
          case 0: xo = 0; yo = -1; break;
          case 1: xo = 1; yo = 0; break;
          case 2: xo = 0; yo = 1; break;
          case 3: xo = -1; yo = 0; break;
        }
    
    this.Y = this.Y - (0 * yo) + (1 * xo);
    this.X = this.X - (0 * xo) - (1 * yo);
};


player.prototype.RotatePlayer = function rotate(d){
    
    if (d === 1) {
        this.Rotation = this.Rotation -1;
        if (this.Rotation < 0) {
            this.Rotation = 3;
        }            
    }
    else {
        this.Rotation = this.Rotation +1;
        if (this.Rotation > 3) {
            this.Rotation = 0;
        }
    }    
};

player.prototype.pView = function gView(m){
        
        this.View = [];    
        
        switch (this.Rotation){
          case 0: xo = 0; yo = -1; break;
          case 1: xo = 1; yo = 0; break;
          case 2: xo = 0; yo = 1; break;
          case 3: xo = -1; yo = 0; break;
        }
            
    var t1 = this.Y + (3 * yo) + (1 * xo);
    var t2 = this.X + (3 * xo) - (1 * yo);
    
        for (x = 0;x < 19;x++){
            
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
                default:{this.View.push("0001");};break;
            }
        }catch(e){
           this.View.push("0001");
        }        
        }
        
        for (x = 0;x < 19;x++){
            if (this.View[x] === undefined) {
                this.View[x] = "0001";
            }
                
        }
        
    };
    
player.prototype.drawView = function vD() {
    
    for (var i = 0; i < 28; i++) {
        
        switch (i) {
            
            case 0:{myDIx(ctx, getImage(this.View[0]), gfxPos[27], this, scale);};break;
            case 1:{myDIx(ctx, getImage(this.View[1]), gfxPos[26], this, scale);};break;
            case 2:{myDIx(ctx, getImage(this.View[1]), gfxPos[25], this, scale);};break;
            case 3:{myDIx(ctx, getImage(this.View[5]), gfxPos[24], this, scale);};break;                
            case 4:{myDIx(ctx, getImage(this.View[2]), gfxPos[23], this, scale);};break;
            case 5:{myDIx(ctx, getImage(this.View[2]), gfxPos[22], this, scale);};break;
            case 6:{myDIx(ctx, getImage(this.View[3]), gfxPos[21], this, scale);};break;
            case 7:{myDIx(ctx, getImage(this.View[3]), gfxPos[20], this, scale);};break;
            case 8:{myDIx(ctx, getImage(this.View[6]), gfxPos[19], this, scale);};break;
            case 9:{myDIx(ctx, getImage(this.View[7]), gfxPos[18], this, scale);};break;
            case 10:{myDIx(ctx, getImage(this.View[7]), gfxPos[17], this, scale);};break;
            case 11:{myDIx(ctx, getImage(this.View[4]), gfxPos[16], this, scale);};break;
            case 12:{myDIx(ctx, getImage(this.View[8]), gfxPos[15], this, scale);};break;
            case 13:{myDIx(ctx, getImage(this.View[8]), gfxPos[14], this, scale);};break;
            case 14:{myDIx(ctx, getImage(this.View[10]), gfxPos[13], this, scale);};break;
            case 15:{myDIx(ctx, getImage(this.View[10]), gfxPos[12], this, scale);};break;
            case 16:{myDIx(ctx, getImage(this.View[9]), gfxPos[11], this, scale);};break;
            case 17:{myDIx(ctx, getImage(this.View[11]), gfxPos[10], this, scale);};break;
            case 18:{myDIx(ctx, getImage(this.View[11]), gfxPos[9], this, scale);};break;
            case 19:{myDIx(ctx, getImage(this.View[13]), gfxPos[8], this, scale);};break;
            case 20:{myDIx(ctx, getImage(this.View[13]), gfxPos[7], this, scale);};break;
            case 21:{myDIx(ctx, getImage(this.View[12]), gfxPos[6], this, scale);};break;
            case 22:{myDIx(ctx, getImage(this.View[14]), gfxPos[5], this, scale);};break;
            case 23:{myDIx(ctx, getImage(this.View[14]), gfxPos[4], this, scale);};break;
            case 24:{myDIx(ctx, getImage(this.View[16]), gfxPos[3], this, scale);};break;
            case 25:{myDIx(ctx, getImage(this.View[15]), gfxPos[2], this, scale);};break;
            case 26:{myDIx(ctx, getImage(this.View[17]), gfxPos[1], this, scale);};break;
            case 27:{myDIx(ctx, getImage(this.View[18]), gfxPos[0], this, scale);};break;
            //case 28:{myDIx(ctx, getImage(this.View[10]), gfxPos[0], this, 2);};break; <- Current floor pad
        }        
    } 
};
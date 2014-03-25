function SpriteSheetArray(){

  //Convert the graphics sprite sheets into individual images and put them in an array
  //The Array consists of StartX,StartY,WidthX,HeightY,ScreenX,ScreenY
  
  var ImageArray = new Array();

    ImageArray[0] = new Array(15, 0, 98, 76, 15, 0);
  	ImageArray[1] = new Array(0, 0, 15, 76, 0, 0);
    ImageArray[2] = new Array(15, 0, 98, 76, 15, 0);
    ImageArray[3] = new Array(113, 0, 15, 76, 113, 0);
    ImageArray[4] = new Array(128, 0, 16, 76, 0, 0);
    ImageArray[5] = new Array(144, 0, 16, 76, 16, 0);
    ImageArray[6] = new Array(160, 0, 64, 76, 32, 0);
    ImageArray[7] = new Array(224, 0, 17, 76, 96, 0);
    ImageArray[8] = new Array(241, 0, 16, 76, 113, 0);
    ImageArray[9] = new Array(0, 76, 32, 42, 0, 14);
    ImageArray[10] = new Array(32, 76, 8, 42, 32, 14);
    ImageArray[11] = new Array(40, 76, 48, 42, 40, 14);
    ImageArray[12] = new Array(88, 76, 8, 42, 88, 14);
    ImageArray[13] = new Array(96, 76, 32, 42, 96, 14);
    ImageArray[14] = new Array(128, 76, 41, 34, 0, 14);
    ImageArray[15] = new Array(169, 76, 5, 34, 41, 14);
    ImageArray[16] = new Array(174, 76, 36, 34, 46, 14);
    ImageArray[17] = new Array(210, 76, 5, 34, 82, 14);
    ImageArray[18] = new Array(215, 76, 41, 34, 87, 14);
    ImageArray[19] = new Array(0, 118, 12, 28, 0, 18);
    ImageArray[20] = new Array(12, 118, 34, 28, 12, 18);
    ImageArray[21] = new Array(46, 118, 4, 28, 46, 18);
    ImageArray[22] = new Array(50, 118, 4, 28, 78, 18);
    ImageArray[23] = new Array(54, 118, 34, 28, 82, 18);
    ImageArray[24] = new Array(88, 118, 12, 28, 116, 18);
    ImageArray[25] = new Array(100, 118, 13, 28, 0, 18);
    ImageArray[26] = new Array(113, 118, 10, 28, 13, 18);
    ImageArray[27] = new Array(123, 118, 10, 28, 104, 18);
    ImageArray[28] = new Array(133, 118, 14, 28, 114, 18);
    ImageArray[29] = new Array(146, 111, 16, 76, 0, 0);
    ImageArray[30] = new Array(162, 111, 96, 76, 16, 0);
    ImageArray[31] = new Array(258, 111, 16, 76, 112, 0);
  
  return ImageArray;
  
}

function PrintLog(myString) {
    
    if (debug) {console.log(getTimeStamp() +" Debug: " +myString);}
    
}

function getTimeStamp() {
   var now = new Date();
   return ((now.getMonth() + 1) + '/' + (now.getDate()) + '/' + now.getFullYear() + " " + now.getHours() + ':'
                 + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
                 .getSeconds()) : (now.getSeconds())));
}

function getImage(Hex,d,pos,p){
  
  // Hex = Bloodwych Hex Code
  // d = direction of required wall (North,East,South,West)
  // pos = Position on the screen we are drawing
  // 
  // This function will return the correct graphic to be draw for the Hex Code passed
  // I may need to pass the Graphics Position to be drawn so I can work out which graphic
  // to be return for each wall side.
  
  
  var CC = parseInt(Hex.substring(3),16);
  var BB = parseInt(Hex.substring(1,2),16);
  var AA = parseInt(Hex.substring(0,1),16);
  var A8 = (AA > 8) ? 8 : AA;
  
    switch (CC){
        case 0: return null;break;
        case 1: return getStoneWall(Hex,d,pos,p);break;
        case 2: return getWoodenObject(Hex,d,pos,p);break;
        case 3: return getMiscObject(BB);break;
        case 4: {if (BB % 2 === 1){return gfx["stairs"]["down"];}else {return gfx["stairs"]["up"];};break;}
        case 5: {
            if ((BB%4 === 2 || BB%4 === 3) && BB%2 === 1) {
                return gfx["door"]["gate"][A8];
            } else if((BB%4 === 0 || BB%4 === 1) && BB%2 === 1) {
                return gfx["door"]["solid"][A8];
            } else if(BB%2 === 0) {
                return gfx["door"]["open"][A8];
            };
        }
        break;
        case 6: {if (Hex === "0706"){return gfx["floor"]["pit-up"];} //Roof Pit
                if (BB % 4 === 0) {return null;} 
                else if (BB % 4 === 1) {return gfx["floor"]["pit-down"];} //Floor Pit
                else if (BB % 4 === 2) {return gfx["floor"]["switch"];} //Green Pad
                else if (BB % 4 === 3) {return null;} //Blank space
                else {PrintLog("Get Image Failed - " + Hex);return null;}} //Default blank space
        case 7: PrintLog("Get Image Failed - " + Hex);return null;break;
        default: PrintLog("Get Image Failed - " + Hex);
    }
};

function getMiscObject(BB){
            
     switch (BB) {
        case 0: //Return a Bed
            return gfx["misc"]["bed"];                
        case 1: //Return a Piller
            return gfx["misc"]["pillar"];   
        default:PrintLog("Get Image Failed - " + BB); return gfx["misc"]["pillar"];                
    }
}
    
function bin2type(b) {
        
        switch (b) {
            
            case "00":{return null; break;};
            case "01":{return gfx["wood"]["wall"]; break;};
            case "10":{return gfx["wood"]["door-open"]; break;};
            case "11":{return gfx["wood"]["door"]; break;};
            default:{return null;};
        }            
    }


    
function getStoneWall(HexCode,d,pos,P) {
    
    
    var AA = parseInt(HexCode.substring(0, 1),16);
    var BB = parseInt(HexCode.substring(1, 2),16);
    var CC = parseInt(HexCode.substring(2, 3),16);

    if (CC === 0) {return gfx["stone"]["wall"];};

    ctx.drawImage(gfx["stone"]["wall"], gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] *scale)+ P.PortalX, (gfxPos[pos][5] * scale) + P.PortalY, gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
   
    switch (CC) { 
        
        case 8:{if (d === 0) {return getWallDeco(AA,BB,CC,pos,P);}break;} //North Wall has Deco
        case 9:{if (d === 1) {return getWallDeco(AA,BB,CC,pos,P);}break;} //East Wall has Deco
        case 10:{if (d === 2) {return getWallDeco(AA,BB,CC,pos,P);}break;} //South Wall has Deco
        case 11:{if (d === 3) {return getWallDeco(AA,BB,CC,pos,P);}break;} //West Wall has Deco
        default:{console.log ("Unhandled StoneWall CC: " + CC.toString());return gfxStone;};
                
    }
    
    return gfx["stone"]["wall"];
    
    function getWallDeco(AA,BB,CC,pos,P){
        
        var R3 = Math.floor(seededRandom(pos + P.X + P.Y) * 4.0); //Math.floor(Math.random() * (3 - 0 + 1) + 0);
        var R8 = Math.floor(seededRandom(pos + P.X + P.Y) * 6.0); //Math.floor(Math.random() * (8 - 0 + 1) + 0);
        debugText((pos + P.X + P.Y) + " - " + R3 + "," + R8);

        try{
            if (CC >= 8) { //Wall has something on it
                if (BB % 4 === 0) { //Shelf
                    return gfx["stone"]["shelf"];
                } else if (BB % 4 === 1) { //Sign
                    if (AA === 0 && BB === 1) { //Random Color
                        ctx.drawImage(gfx["deco"]["banner"][R8], gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] *scale)+ P.PortalX, (gfxPos[pos][5] * scale) + P.PortalY, gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
                        switch(R3) {
                            case 0: return gfx["deco"]["serpent-head"];
                            case 1: return gfx["deco"]["dragon-head"];
                            case 2: return gfx["deco"]["moon-head"];
                            case 3: return gfx["deco"]["chaos-head"];
                            default: return null;
                        }
                    } else if (AA === 0 && BB === 5) { //Serpent Flag
                        ctx.drawImage(gfx["deco"]["banner"][COLOUR_SERPENT], gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] *scale)+ P.PortalX, (gfxPos[pos][5] * scale) + P.PortalY, gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
                        return gfx["deco"]["serpent-head"];                       
                    } else if (AA === 0 && BB === 9) { //Dragon Flag
                         ctx.drawImage(gfx["deco"]["banner"][COLOUR_DRAGON], gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] *scale)+ P.PortalX, (gfxPos[pos][5] * scale) + P.PortalY, gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
                        return gfx["deco"]["dragon-head"];  
                    } else if (AA === 0 && BB === 13) { //Moon Flag
                        ctx.drawImage(gfx["deco"]["banner"][COLOUR_MOON], gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] *scale)+ P.PortalX, (gfxPos[pos][5] * scale) + P.PortalY, gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
                        return gfx["deco"]["moon-head"];                     
                    } else if (AA === 1 && BB === 1) { //Choas Flag
                         ctx.drawImage(gfx["deco"]["banner"][COLOUR_CHAOS], gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] *scale)+ P.PortalX, (gfxPos[pos][5] * scale) + P.PortalY, gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
                        return gfx["deco"]["chaos-head"];
                    } else if (BB % 4 === 1) {
                        ctx.drawImage(gfx["deco"]["banner"][COLOUR_BRONZE], gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] *scale)+ P.PortalX, (gfxPos[pos][5] * scale) + P.PortalY, gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
                        return gfx["deco"]["script"];                   
                    } else {
                       ctx.drawImage(gfx["deco"]["banner"][COLOUR_BRONZE], gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] *scale)+ P.PortalX, (gfxPos[pos][5] * scale) + P.PortalY, gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
                       return gfx["deco"]["script"];
                    }
                } else if (BB % 4 === 2) { //Switch
                        return gfx["deco"]["switch"];
                } else if (BB % 4 === 3) { //Crystal Switch
                       return gfx["deco"]["gem"];
                } else {
                 return gfx["stone"]["wall"];
                }
            } else {PrintLog("Unhandled Banner - " + HexCode);
                return gfx["stone"]["wall"];
            }}catch(e){}  
         
        return gfx["stone"]["wall"];
    }
}

function getWallDirection(d,s) {
    
    // d = player direction
    // s = screen gfx position
    
//I should be able to use the below in an array to work out all directions
    //current plus direction = wall face i.e.
    //If a wall is currently North which is a 0 + player direction. Say Player is facing East = 1
    // 0 + 1 = 1 (North Wall becomes East)
    
   var Wall = [];
        
        Wall[0] = 0;
        Wall[1] = 1;
        Wall[2] = 2;
        Wall[3] = 3;
        Wall[4] = 2;                
        Wall[5] = 1;
        Wall[6] = 2;
        Wall[7] = 3;
        Wall[8] = 2;
        Wall[9] = 2;
        Wall[10] = 1;
        Wall[11] = 2;
        Wall[12] = 3;
        Wall[13] = 2;
        Wall[14] = 2;
        Wall[15] = 1;
        Wall[16] = 2;
        Wall[17] = 3;
        Wall[18] = 2;
        Wall[19] = 1;
        Wall[20] = 2;
        Wall[21] = 1;
        Wall[22] = 3;
        Wall[23] = 2;
        Wall[24] = 3;
        Wall[25] = 2;
        Wall[26] = 1;
        Wall[27] = 3;
        Wall[28] = 2;
        Wall[29] = 3;
        Wall[30] = 0;
        Wall[31] = 1;
	            
        Wall[s] = Wall[s] + d;
        
        if (Wall[s] > 3) {
            Wall[s] = (Wall[s] - 3) -1;
        }
        
        if (debugHigh) {console.log (s + " = " + getDirection(Wall[s]));}
        
   return Wall[s];
    
};

function getDirection(n) {
 
    switch (n) {
        
        case 0:{return "North";};
        case 1:{return "East";};
        case 2:{return "South";};
        case 3:{return "West";};
    
    }
};

function drawPlayersView(p) {
    
    // p = Player
    
    // What we do now is take the 18 Blocks which make up the players view
    // We can then make a virtual cube of 4 sides which could possibly be
    // drawn for each block, if the block is a Wall or Wooden object which
    // has 4 sides we draw each of the sides, if it is not a Wooden object
    // or Wall we just draw a single image.
    
    myDIx(ctx, gfx["background"], background[p.pbg], p, scale);
    
//        try {
    for (x = 0;x < 19;x++){
      
      var BlockType = parseInt(p.View[x].substring(3,4));
      
      if (BlockType === 2) {
          drawWoodenObject(p,x);
      }
      else {
        switch (x){
            case 0:{
                myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,28),28,p), gfxPos[28], p, scale);
                myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,27),27,p), gfxPos[27], p, scale);
            };break;
            case 1:{
                myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,26),26,p), gfxPos[26], p, scale);
                myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,25),25,p), gfxPos[25], p, scale);
            };break;
            case 2:{
                myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,27),27,p), gfxPos[27], p, scale);
                myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,23),23,p), gfxPos[23], p, scale);
                myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,22),22,p), gfxPos[22], p, scale);
            };break;
            case 3:{
                myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,26),26,p), gfxPos[26], p, scale);
                myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,21),21,p), gfxPos[21], p, scale);
                myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,20),20,p), gfxPos[20], p, scale);                
            };break;
            case 4:{
                myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,22),22,p), gfxPos[22], p, scale);
                myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,21),21,p), gfxPos[21], p, scale);
                myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,16),16,p), gfxPos[16], p, scale);                
            };break;
            case 5:{                   
                myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,24),24,p), gfxPos[24], p, scale);
            };break;
            case 6:{                  
                myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,19),19,p), gfxPos[19], p, scale);
            };break;    
            case 7:{
                    if (BlockType === 1 || BlockType === 2) {
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,23),23,p), gfxPos[23], p, scale);
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,24),24,p), gfxPos[24], p, scale);
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,17),17,p), gfxPos[17], p, scale);
                    }
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,18),18,p), gfxPos[18], p, scale);                
            };break;
            case 8:{
                    if (BlockType === 1 || BlockType === 2) {
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,20),20,p), gfxPos[20], p, scale);
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,19),19,p), gfxPos[19], p, scale);
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,15),15,p), gfxPos[15], p, scale);
                    }
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,14),14,p), gfxPos[14], p, scale);              
            };break;
            case 9:{
                    if (BlockType === 1 || BlockType === 2) {
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,17),17,p), gfxPos[17], p, scale);
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,16),16,p), gfxPos[16], p, scale);
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,15),15,p), gfxPos[15], p, scale);
                    }
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,11),11,p), gfxPos[11], p, scale);                               
            };break;
            case 10:{
                    if (BlockType === 1 || BlockType === 2) {
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,18),18,p), gfxPos[18], p, scale);
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,12),12,p), gfxPos[12], p, scale);
                    }
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,13),13,p), gfxPos[13], p, scale);                
            };break;
            case 11:{
                    if (BlockType === 1 || BlockType === 2) {
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,14),14,p), gfxPos[14], p, scale);
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,10),10,p), gfxPos[10], p, scale);
                    }
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,9),9,p), gfxPos[9], p, scale);
            };break;
            case 12:{
                     if (BlockType === 1 || BlockType === 2) {
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,12),12,p), gfxPos[12], p, scale);
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,11),11,p), gfxPos[11], p, scale);
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,10),10,p), gfxPos[10], p, scale);                
                     }
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,6),6,p), gfxPos[6], p, scale);     
            };break;
            case 13:{
                    if (BlockType === 1 || BlockType === 2) {
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,13),13,p), gfxPos[13], p, scale);
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,7),7,p), gfxPos[7], p, scale);                        
                    }                    
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,8),8,p), gfxPos[8], p, scale);               

            };break;
            case 14:{
                    if (BlockType === 1 || BlockType === 2) {
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,9),9,p), gfxPos[9], p, scale);
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,5),5,p), gfxPos[5], p, scale);
                    }
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,4),4,p), gfxPos[4], p, scale);               

            };break;
            case 15:{
                    if (BlockType === 1 || BlockType === 2) {
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,6),6,p), gfxPos[6], p, scale);
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,7),7,p), gfxPos[7], p, scale);
                        myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,5),5,p), gfxPos[5], p, scale);
                    }
                    myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,2),2,p), gfxPos[2], p, scale);
            };break;
            case 16:{
                myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,3),3,p), gfxPos[3], p, scale);
            };break;
            case 17:{
                myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,1),1,p), gfxPos[1], p, scale);
            };break;
            case 18:{  
                       if (BlockType === 5) {
                           drawDoorFrame(p);
                       }
                       else {
                           myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,31),31,p), gfxPos[31], p, scale);
                           myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,29),29,p), gfxPos[29], p, scale);
                           myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,30),30,p), gfxPos[30], p, scale);
                       };                          
            };break;
     }
 }
}
    } 

function drawDoorFrame(p){
    
    var HexCode = p.View[18];
  
    var BB = parseInt(HexCode.substring(1, 2),16);
    
    if (BB >= 0 & BB <= 3 || BB >= 8 & BB <= 11) { //"North/South"
        if (p.Rotation === 0 || p.Rotation === 2) {
            myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,29),29,p), gfxPos[29], p, scale);
            myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,31),31,p), gfxPos[31], p, scale);
        }
        else {
            myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,30),30,p), gfxPos[30], p, scale);                               
        }
    }
    else { if (BB >= 4 & BB <= 7 || BB >= 12 & BB <= 15) { //"East/West"
        if (p.Rotation === 1 || p.Rotation === 3) {
            myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,29),29,p), gfxPos[29], p, scale);
            myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,31),31,p), gfxPos[31], p, scale);                   
        }
        else {
            myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,30),30,p), gfxPos[30], p, scale);
        }
    }; 
}
}

function drawWoodenObject(p,x) {
      
    // p = Player
    // x = Current Block being drawn
    
    //We create an array of all the sides for each 18 blocks
    //because wooden walls have 4 sides me need to loop though them all
    //and return the correct wall depending on the players rotation
    
     var BlockSides = [];
     
        BlockSides[0] = [-1,-1,28,27];
        BlockSides[1] = [-1,26,25,-1];
        BlockSides[2] = [-1,27,23,22];
        BlockSides[3] = [-1,21,20,26];
        BlockSides[4] = [-1,22,16,21];
        BlockSides[5] = [28,-1,-1,24];
        BlockSides[6] = [25,19,-1,-1];
        BlockSides[7] = [23,24,18,17];
        BlockSides[8] = [20,15,14,19];
        BlockSides[9] = [16,17,11,15];
        BlockSides[10] = [18,-1,13,12];
        BlockSides[11] = [14,10,9,-1];
        BlockSides[12] = [11,12,6,10];
        BlockSides[13] = [13,-1,8,7];
        BlockSides[14] = [9,5,4,-1];
        BlockSides[15] = [6,7,2,5];
        BlockSides[16] = [8,-1,-1,3];
        BlockSides[17] = [4,1,-1,-1];
        BlockSides[18] = [2,3,-1,1];
    
    var b = hexToBinary(p.View[x].substring(0,2));
    var s = [];
    s[0] = b.result.substring(6,8); //North Face
    s[1] = b.result.substring(4,6); //East Face
    s[2] = b.result.substring(2,4); //South Face
    s[3] = b.result.substring(0,2); //West Face
    
    switch (p.Rotation){
            case 0:{                        
                    if (BlockSides[x][0] > -1){myDIx(ctx, bin2type(s[0]), gfxPos[BlockSides[x][0]], p, scale);}
                    if (BlockSides[x][1] > -1){myDIx(ctx, bin2type(s[1]), gfxPos[BlockSides[x][1]], p, scale);}                        
                    if (BlockSides[x][3] > -1){myDIx(ctx, bin2type(s[3]), gfxPos[BlockSides[x][3]], p, scale);}
                    if (BlockSides[x][2] > -1){myDIx(ctx, bin2type(s[2]), gfxPos[BlockSides[x][2]], p, scale);}
                    };break;
            case 1:{                        
                    if (BlockSides[x][0] > -1){myDIx(ctx, bin2type(s[1]), gfxPos[BlockSides[x][0]], p, scale);}
                    if (BlockSides[x][1] > -1){myDIx(ctx, bin2type(s[2]), gfxPos[BlockSides[x][1]], p, scale);}                        
                    if (BlockSides[x][3] > -1){myDIx(ctx, bin2type(s[0]), gfxPos[BlockSides[x][3]], p, scale);}
                    if (BlockSides[x][2] > -1){myDIx(ctx, bin2type(s[3]), gfxPos[BlockSides[x][2]], p, scale);}
                    };break;
            case 2:{                        
                    if (BlockSides[x][0] > -1){myDIx(ctx, bin2type(s[2]), gfxPos[BlockSides[x][0]], p, scale);}
                    if (BlockSides[x][1] > -1){myDIx(ctx, bin2type(s[3]), gfxPos[BlockSides[x][1]], p, scale);}
                    if (BlockSides[x][3] > -1){myDIx(ctx, bin2type(s[1]), gfxPos[BlockSides[x][3]], p, scale);}
                    if (BlockSides[x][2] > -1){myDIx(ctx, bin2type(s[0]), gfxPos[BlockSides[x][2]], p, scale);}
                    };break;
            case 3:{                        
                    if (BlockSides[x][0] > -1){myDIx(ctx, bin2type(s[3]), gfxPos[BlockSides[x][0]], p, scale);}
                    if (BlockSides[x][1] > -1){myDIx(ctx, bin2type(s[0]), gfxPos[BlockSides[x][1]], p, scale);}
                    if (BlockSides[x][3] > -1){myDIx(ctx, bin2type(s[2]), gfxPos[BlockSides[x][3]], p, scale);}
                    if (BlockSides[x][2] > -1){myDIx(ctx, bin2type(s[1]), gfxPos[BlockSides[x][2]], p, scale);}
                    };break;
            }
}

function recolorImage(img, pallet, type){
    var c = document.createElement('canvas');
    var ctx1=c.getContext("2d");
    var w = img.width;
    var h = img.height;

    c.width = w;
    c.height = h;
    
    var PALETTE_NORMAL =    [[96, 96, 96],      [64, 64, 64],       [0, 0, 0]];
    var PALETTE_MOON =      [[160, 160, 160],   [64, 128, 224],     [32, 32, 224]];
    var PALETTE_DRAGON =    [[224, 129, 96],    [224, 0, 0],        [129, 32, 0]];
    var PALETTE_SERPENT =   [[224, 129, 96],    [0, 192, 0],        [0, 129, 0]];
    var PALETTE_CHAOS =     [[255, 255, 255],   [224, 192, 0],      [224, 129, 96]];
    var PALETTE_BRONZE =    [[224, 129, 96],    [160, 64, 32],      [129, 32, 0]];
    var PALETTE_IRON =      [[255, 255, 255],   [196, 196, 196],    [128, 128, 128]];
    var PALETTE_CHROMATIC = [[255, 255, 255],   [255,255,255],      [160, 160, 160]];
    var PALETTE_LOCKED =    [[0, 0, 0],         [0, 0, 0],          [64, 64, 64]];
    
    switch (pallet) {
        
        case COLOUR_NORMAL: {pallet=PALETTE_NORMAL;};break;
        case COLOUR_MOON: {pallet=PALETTE_MOON;};break;
        case COLOUR_DRAGON: {pallet=PALETTE_DRAGON;};break;
        case COLOUR_CHAOS: {pallet=PALETTE_CHAOS;};break;
        case COLOUR_SERPENT: {pallet=PALETTE_SERPENT;};break;
        case COLOUR_BRONZE: {pallet=PALETTE_BRONZE;};break;
        case COLOUR_IRON: {pallet=PALETTE_IRON;};break;
        case COLOUR_CHROMATIC: {pallet=PALETTE_CHROMATIC;};break;
        case COLOUR_LOCKED: {pallet=PALETTE_LOCKED;};break;
        
    }    
    
    // draw the image on the temporary canvas
    ctx1.drawImage(img, 0, 0, w, h);

    // pull the entire image into an array of pixel data
    var imageData = ctx1.getImageData(0, 0, w, h);

    // examine every pixel, 
    // change any old rgb to the new-rgb
    for (var i=0;i<imageData.data.length;i+=4)
      {
          // is this pixel the old rgb?
          if (type === "deco"){
              
             if(imageData.data[i]===PALETTE_MOON[0][0] && imageData.data[i+1]===PALETTE_MOON[0][1] && imageData.data[i+2]===PALETTE_MOON[0][2]){
              // change to your new rgb
              imageData.data[i]=pallet[0][0];imageData.data[i+1]=pallet[0][1];imageData.data[i+2]=pallet[0][2];
             }
             else if(imageData.data[i]===PALETTE_MOON[1][0] && imageData.data[i+1]===PALETTE_MOON[1][1] && imageData.data[i+2]===PALETTE_MOON[1][2]){
              // change to your new rgb
              imageData.data[i]=pallet[1][0];imageData.data[i+1]=pallet[1][1];imageData.data[i+2]=pallet[1][2];
             }
             else if(imageData.data[i]===PALETTE_MOON[2][0] && imageData.data[i+1]===PALETTE_MOON[2][1] && imageData.data[i+2]===PALETTE_MOON[2][2]){
              // change to your new rgb
              imageData.data[i]=pallet[2][0];imageData.data[i+1]=pallet[2][1];imageData.data[i+2]=pallet[2][2];
             }
              
          }
          else if (type === "door"){
            if(imageData.data[i]===PALETTE_MOON[1][0] && imageData.data[i+1]===PALETTE_MOON[1][1] && imageData.data[i+2]===PALETTE_MOON[1][2]){
                  // change to your new rgb
                  imageData.data[i]=pallet[1][0];imageData.data[i+1]=pallet[1][1];imageData.data[i+2]=pallet[1][2];
            }
          };
      }
    // put the altered data back on the canvas  
    ctx1.putImageData(imageData,0,0);
    // put the re-colored image back on the image
    
    var img1 = new Image();
    img1.width = imageData.width;
    img1.height = imageData.height;
    img1.src = c.toDataURL();

    return img1;
}
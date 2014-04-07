function SpriteSheetArray(){

  //Convert the graphics sprite sheets into individual images and put them in an array
  //The Array consists of StartX,StartY,WidthX,HeightY,ScreenX,ScreenY
  
  var ImageArray = new Array();

	ImageArray[0] = new Array(15, 0, 98, 76, 15, 0);
	ImageArray[1] = new Array(0, 0, 16, 76, 0, 0);
	ImageArray[2] = new Array(15, 0, 98, 76, 15, 0);
	ImageArray[3] = new Array(112, 0, 16, 76, 112, 0);
	ImageArray[4] = new Array(128, 0, 15, 76, 0, 0);
	ImageArray[5] = new Array(143, 0, 17, 76, 15, 0);
	ImageArray[6] = new Array(160, 0, 64, 76, 32, 0);
	ImageArray[7] = new Array(224, 0, 17, 76, 96, 0);
	ImageArray[8] = new Array(241, 0, 15, 76, 113, 0);
	ImageArray[9] = new Array(0, 76, 32, 42, 0, 14);
	ImageArray[10] = new Array(32, 76, 8, 42, 32, 14);
	ImageArray[11] = new Array(40, 76, 48, 42, 40, 14);
	ImageArray[12] = new Array(88, 76, 8, 42, 88, 14);
	ImageArray[13] = new Array(96, 76, 32, 42, 96, 14);
	ImageArray[14] = new Array(128, 80, 40, 31, 0, 18);
	ImageArray[15] = new Array(168, 80, 6, 31, 40, 18);
	ImageArray[16] = new Array(174, 80, 36, 31, 46, 18);
	ImageArray[17] = new Array(210, 80, 6, 31, 82, 18);
	ImageArray[18] = new Array(215, 80, 41, 31, 87, 18);
	ImageArray[19] = new Array(0, 118, 13, 28, 0, 18);
	ImageArray[20] = new Array(12, 118, 34, 28, 12, 18);
	ImageArray[21] = new Array(46, 118, 4, 28, 46, 18);
	ImageArray[22] = new Array(50, 118, 4, 28, 78, 18);
	ImageArray[23] = new Array(54, 118, 34, 28, 82, 18);
	ImageArray[24] = new Array(87, 118, 13, 28, 115, 18);
	ImageArray[25] = new Array(100, 118, 13, 28, 0, 18);
	ImageArray[26] = new Array(113, 118, 10, 28, 13, 18);
	ImageArray[27] = new Array(123, 118, 10, 28, 105, 18);
	ImageArray[28] = new Array(133, 118, 13, 28, 115, 18);
	ImageArray[29] = new Array(146, 111, 16, 76, 0, 0);
	ImageArray[30] = new Array(162, 111, 96, 76, 16, 0);
	ImageArray[31] = new Array(258, 111, 16, 76, 112, 0);
  
  return ImageArray;
  
}



function getTimeStamp() {
   var now = new Date();
   return ((now.getMonth() + 1) + '/' + (now.getDate()) + '/' + now.getFullYear() + " " + now.getHours() + ':'
				 + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
				 .getSeconds()) : (now.getSeconds())));
}

function getImage(Hex,d,pos,p,pos18) {
	// Hex = Bloodwych Hex Code
	// d = direction of required wall (North,East,South,West)
	// pos = Position on the screen we are drawing
	// 
	// This function will return the correct graphic to be draw for the Hex Code passed
	// I may need to pass the Graphics Position to be drawn so I can work out which graphic
	// to be return for each wall side.
        
        if (getHexToBinaryPosition(Hex, 12, 4) !== '1'){
            if (getHexToBinaryPosition(Hex, 8, 4) === '8'){
                PrintLog("Should be drawing something...");
            }
        }
        
        
	switch (getHexToBinaryPosition(Hex, 12, 4)) {
		case '0': return null; break;
		case '1': return getStoneWall(Hex,d,pos,p,pos18); break;
		case '2': return getWoodenObject(Hex,d,pos,p); break;
		case '3': return getMiscObject(Hex); break;
		case '4':
			if (getHexToBinaryPosition(Hex, 7) == '0') {
				return gfx["stairs"]["up"];
			} else {
				return gfx["stairs"]["down"];
			}
			break;
		case '5':
			if(getHexToBinaryPosition(Hex, 4) == '1') {
				var colourDoor = COLOUR_DOOR_VOID;
			} else {
				var colourDoor = getHexToBinaryPosition(Hex, 1, 3);
			}
			if(getHexToBinaryPosition(Hex, 7) == '0') {
				return gfx["door"]["open"][colourDoor];
			} else if (getHexToBinaryPosition(Hex, 6) == '0') {
				return gfx["door"]["solid"][colourDoor];
			} else {
				return gfx["door"]["gate"][colourDoor];
			}
			break;
		case '6':
			//Roof Pit. Can be visible for any floor location
			if (getHexToBinaryPosition(Hex, 5) == '1') {
				ctx.drawImage(gfx["floor"]["pit-up"], gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] *scale)+ p.PortalX, (gfxPos[pos][5] * scale) + p.PortalY, gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
			}
			switch(getHexToBinaryPosition(Hex, 6, 2)) {
				case '1': return gfx["floor"]["pit-down"];
				case '2': return gfx["floor"]["switch"];
				default: return null;
			}
			break;
		case '7': return null;
		default: //PrintLog("Get Image Failed - " + Hex);
	}
}

function getMiscObject(hex){
	var m = getHexToBinaryPosition(hex, 0, 8)
	if(m == 1) {
		return gfx["misc"]["pillar"];
	}
	return gfx["misc"]["bed"];
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
	
function getStoneWall(HexCode,d,pos,P,pos18) {
	//if (getHexToBinaryPosition(HexCode, 8) == '0') { ???????????????
	//    return gfx["stone"]["wall"];
	//}
	ctx.drawImage(gfx["stone"]["wall"], gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] *scale)+ P.PortalX, (gfxPos[pos][5] * scale) + P.PortalY, gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
	if(d == getHexToBinaryPosition(HexCode, 10, 2)) {
		return getWallDeco();
	}
	return gfx["stone"]["wall"];
	
	function getWallDeco() {
		var xy = posToCoordinates(pos18, P.X, P.Y, P.Rotation);
		var RND4 = Math.floor(xy["x"] * 1.27 + xy["y"] * 2.68) % 4; //For random banner faces
		var RND6 = Math.floor(xy["x"] * 5.76 + xy["y"] * 4.82) % 6; //For random switches
		var RND8 = Math.floor(xy["x"] * 5.76 + xy["y"] * 4.42) % 8; //For random banner frames
		try{
			if (getHexToBinaryPosition(HexCode, 8) == '1') { //Wall has something on it
				if (getHexToBinaryPosition(HexCode, 6, 2) == '0') { //Shelf
					return gfx["stone"]["shelf"];
				} else if (getHexToBinaryPosition(HexCode, 6, 2) == '1') { //Sign
					if (getHexToBinaryPosition(HexCode, 0, 6) == '0') { //Random Color
						ctx.drawImage(gfx["deco"]["banner"][RND8], gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] *scale)+ P.PortalX, (gfxPos[pos][5] * scale) + P.PortalY, gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
						switch(RND4) {
							case 0: return gfx["deco"]["serpent-head"];
                            case 1: return gfx["deco"]["dragon-head"];
							case 2: return gfx["deco"]["moon-head"];
							case 3: return gfx["deco"]["chaos-head"];
							default: return null;
						}
					} else if (getHexToBinaryPosition(HexCode, 0, 6) == '1') { //Serpent Flag
						ctx.drawImage(gfx["deco"]["banner"][COLOUR_DECO_SERPENT], gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] *scale)+ P.PortalX, (gfxPos[pos][5] * scale) + P.PortalY, gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
						return gfx["deco"]["serpent-head"];                       
					} else if (getHexToBinaryPosition(HexCode, 0, 6) == '2') { //Dragon Flag
						 ctx.drawImage(gfx["deco"]["banner"][COLOUR_DECO_DRAGON], gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] *scale)+ P.PortalX, (gfxPos[pos][5] * scale) + P.PortalY, gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
						return gfx["deco"]["dragon-head"];  
					} else if (getHexToBinaryPosition(HexCode, 0, 6) == '3') { //Moon Flag
						ctx.drawImage(gfx["deco"]["banner"][COLOUR_DECO_MOON], gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] *scale)+ P.PortalX, (gfxPos[pos][5] * scale) + P.PortalY, gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
						return gfx["deco"]["moon-head"];                     
					} else if (getHexToBinaryPosition(HexCode, 0, 6) == '4') { //Choas Flag
						 ctx.drawImage(gfx["deco"]["banner"][COLOUR_DECO_CHAOS], gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] *scale)+ P.PortalX, (gfxPos[pos][5] * scale) + P.PortalY, gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
						return gfx["deco"]["chaos-head"];
					} else {
					   return gfx["deco"]["script"][RND8];
					}
				} else if (getHexToBinaryPosition(HexCode, 6, 2) == '2') { //Switch
					if(getHexToBinaryPosition(HexCode, 0, 4) == '0') {
						return gfx["deco"]["switch-off"][COLOUR_DECO_BLACK]; // Black switch
					} else if(getHexToBinaryPosition(HexCode, 5) == '1') {
						return gfx["deco"]["switch-off"][RND6]; // Off switch
					} else {
						return gfx["deco"]["switch"][RND6]; // On switch
					}
				} else if (getHexToBinaryPosition(HexCode, 6, 2) == '3') { //Crystal Gem
					return gfx["deco"]["gem"][RND8];
				} else {
					return gfx["stone"]["wall"];
				}
			}
		}catch(e){}  
		 
		return gfx["stone"]["wall"];
	}
}

function getWallDirection(d, s) {
	
	// d = player direction
	// s = screen gfx position
	
	//I should be able to use the below in an array to work out all directions
	//current plus direction = wall face i.e.
	//If a wall is currently North which is a 0 + player direction. Say Player is facing East = 1
	// 0 + 1 = 1 (North Wall becomes East)
	
	var Wall = [0, 1, 2, 3, 2, 1, 2, 3, 2, 2, 1, 2, 3, 2, 2, 1, 2, 3, 2, 1, 2, 1, 3, 2, 3, 2, 1, 3, 2, 3, 0, 1];        
	Wall[s] = (Wall[s] + d) % 4;

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
	hex = p.getBinaryView(15, 0, 16);
	debugText(p.champion[0].firstName + ' hp:' + p.champion[0].stat.hp + ' rec:' + p.champion[0].recruited + ' armor-spell-learned:' + p.champion[0].spellBook[SPELL_ARMOUR].learnt);
	//debugText(champion[2].firstName + ' hp:' + champion[2].hp + ' rec:' + champion[2].recruited + ' Spells:' + champion[2].spellBook);
	debugText(hex2bin(hex));
	//debugText(hex2bin(hex).substring(2, 8) + ' ' + hex2bin(hex).substring(0, 2) + ' ' + hex2bin(hex).substring(8, 16) + ' : ' + bin2hex(hex2bin(hex).substring(2, 8) + hex2bin(hex).substring(0, 2) + hex2bin(hex).substring(8, 16)));
	//debugText(hex2bin(setHexToBinaryPosition(bin2hex('0000'), 1, 2, '1')));
	//debugText(p.View[15]);
	//debugText(p.View[15].substring(0,2));
	//debugText(parseInt(getHexToBinaryPosition(p.View[15], 0, 5), 16).toString(10));
	//debugText(parseInt(p.View[15].substring(0,2), 16).toString(10));
	// p = Player
	
	// What we do now is take the 18 Blocks which make up the players view
	// We can then make a virtual cube of 4 sides which could possibly be
	// drawn for each block, if the block is a Wall or Wooden object which
	// has 4 sides we draw each of the sides, if it is not a Wooden object
	// or Wall we just draw a single image.
	
	myDIx(ctx, gfx["background"], background[(p.X + p.Y + p.Rotation) % 2], p, scale);

//        try {
	for (x = 0;x < 19;x++){
	  
		var BlockType = getHexToBinaryPosition(p.View[x], 12, 4);
	  
		if (BlockType === '2') {
			drawWoodenObject(p,x);
		} else {
			switch (x){
				case 0:{
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,28),28,p, x), gfxPos[28], p, scale);
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,27),27,p, x), gfxPos[27], p, scale);
				};break;
				case 1:{
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,26),26,p, x), gfxPos[26], p, scale);
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,25),25,p, x), gfxPos[25], p, scale);
				};break;
				case 2:{
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,27),27,p, x), gfxPos[27], p, scale);
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,23),23,p, x), gfxPos[23], p, scale);
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,22),22,p, x), gfxPos[22], p, scale);
				};break;
				case 3:{
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,26),26,p, x), gfxPos[26], p, scale);
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,21),21,p, x), gfxPos[21], p, scale);
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,20),20,p, x), gfxPos[20], p, scale);                
				};break;
				case 4:{
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,22),22,p, x), gfxPos[22], p, scale);
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,21),21,p, x), gfxPos[21], p, scale);
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,16),16,p, x), gfxPos[16], p, scale);                
				};break;
				case 5:{                   
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,24),24,p, x), gfxPos[24], p, scale);
				};break;
				case 6:{                  
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,19),19,p, x), gfxPos[19], p, scale);
				};break;    
				case 7:{
					if (BlockType === '1') {
						myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,17),17,p, x), gfxPos[17], p, scale);
					}
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,18),18,p, x), gfxPos[18], p, scale);                
				};break;
				case 8:{
					if (BlockType === '1') {
						myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,15),15,p, x), gfxPos[15], p, scale);
					}
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,14),14,p, x), gfxPos[14], p, scale);              
				};break;
				case 9:{
					if (BlockType === '1') {
						myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,15),15,p, x), gfxPos[15], p, scale);
					}
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,11),11,p, x), gfxPos[11], p, scale);                               
				};break;
				case 10:{
					if (BlockType === '1' || BlockType === '4') {
						myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,12),12,p, x), gfxPos[12], p, scale);
					}
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,13),13,p, x), gfxPos[13], p, scale);                
				};break;
				case 11:{
					if (BlockType === '1' || BlockType === '4') {
						myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,10),10,p, x), gfxPos[10], p, scale);
					}
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,9),9,p, x), gfxPos[9], p, scale);
				};break;
				case 12:{
					if (BlockType === '1') {
						myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,10),10,p, x), gfxPos[10], p, scale);                
					}
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,6),6,p, x), gfxPos[6], p, scale);     
				};break;
				case 13:{
					if (BlockType === '1' || BlockType === '4') {
						myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,7),7,p, x), gfxPos[7], p, scale);
					}
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,8),8,p, x), gfxPos[8], p, scale);               
				};break;
				case 14:{
					if (BlockType === '1' || BlockType === '4') {
						myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,5),5,p, x), gfxPos[5], p, scale);
					}
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,4),4,p, x), gfxPos[4], p, scale);               
				};break;
				case 15:{
					if (BlockType === '1') {
						myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,5),5,p, x), gfxPos[5], p, scale);
					}
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,2),2,p, x), gfxPos[2], p, scale);
				};break;
				case 16:{
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,3),3,p, x), gfxPos[3], p, scale);
				};break;
				case 17:{
					myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,1),1,p, x), gfxPos[1], p, scale);
				};break;
				case 18:{  
					if (BlockType === '5') {
						drawDoorFrame(p);
					} else {
						myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,31),31,p, x), gfxPos[31], p, scale);
						myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,29),29,p, x), gfxPos[29], p, scale);
						myDIx(ctx, getImage(p.View[x],getWallDirection(p.Rotation,30),30,p, x), gfxPos[30], p, scale);
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
	
	var b = hex2bin(p.View[x].substring(0,2));
	var s = [];
	s[0] = b.substring(6,8); //North Face
	s[1] = b.substring(4,6); //East Face
	s[2] = b.substring(2,4); //South Face
	s[3] = b.substring(0,2); //West Face
	
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

function recolorImage(img, colour, type){
	var c = document.createElement('canvas');
	var ctx1=c.getContext("2d");
	var w = img.width;
	var h = img.height;

	c.width = w;
	c.height = h;
	
	// draw the image on the temporary canvas
	ctx1.drawImage(img, 0, 0, w, h);

	// pull the entire image into an array of pixel data
	var imageData = ctx1.getImageData(0, 0, w, h);
	var pallet;

	// examine every pixel, 
	// change any old rgb to the new-rgb
	if (type === "deco") {
		var palletMoon =                            [COLOUR_GREY_1,     COLOUR_BLUE,        COLOUR_BLUE_DARK];
		switch (colour) {
			case COLOUR_DECO_SERPENT: pallet =      [COLOUR_YELLOW,     COLOUR_GREEN,       COLOUR_GREEN_DARK]; break;
			case COLOUR_DECO_MOON: pallet =         palletMoon;                                                 break;
			case COLOUR_DECO_DRAGON: pallet =       [COLOUR_ORANGE,     COLOUR_RED,         COLOUR_RED_DARK];   break;
			case COLOUR_DECO_CHAOS: pallet =        [COLOUR_WHITE,      COLOUR_YELLOW,      COLOUR_ORANGE];     break;
			case COLOUR_DECO_BRONZE: pallet =       [COLOUR_ORANGE,     COLOUR_BROWN,       COLOUR_RED_DARK];   break;
			case COLOUR_DECO_IRON: pallet =         [COLOUR_GREY_1,     COLOUR_GREY_2,      COLOUR_GREY_3];     break;
			case COLOUR_DECO_BROWN: pallet =        [COLOUR_YELLOW,     COLOUR_ORANGE,      COLOUR_BROWN];      break;
			case COLOUR_DECO_TAN: pallet =          [COLOUR_YELLOW,     COLOUR_ORANGE,      COLOUR_RED_DARK];   break;
			case COLOUR_DECO_BROWN: pallet =        [COLOUR_GREEN,      COLOUR_GREEN_DARK,  COLOUR_BLUE_DARK];  break;
			case COLOUR_DECO_BLACK: pallet =        [COLOUR_BLACK,      COLOUR_BLACK,       COLOUR_BLACK];      break;
			default: break;
		}
		for (var i = 0; i < imageData.data.length; i += 4) {
			if(imageData.data[i]===palletMoon[0][0] && imageData.data[i+1]===palletMoon[0][1] && imageData.data[i+2]===palletMoon[0][2]){
				// change to your new rgb
				imageData.data[i]=pallet[0][0];
				imageData.data[i+1]=pallet[0][1];
				imageData.data[i+2]=pallet[0][2];
			} else if(imageData.data[i]===palletMoon[1][0] && imageData.data[i+1]===palletMoon[1][1] && imageData.data[i+2]===palletMoon[1][2]){
				// change to your new rgb
				imageData.data[i]=pallet[1][0];
				imageData.data[i+1]=pallet[1][1];
				imageData.data[i+2]=pallet[1][2];
			} else if(imageData.data[i]===palletMoon[2][0] && imageData.data[i+1]===palletMoon[2][1] && imageData.data[i+2]===palletMoon[2][2]){
				// change to your new rgb
				imageData.data[i]=pallet[2][0];imageData.data[i+1]=pallet[2][1];imageData.data[i+2]=pallet[2][2];
			}
		}
	} else if (type === "door") {
		var palletMoon = COLOUR_BLUE;
		switch (colour) {
			case COLOUR_DOOR_NORMAL: pallet =       COLOUR_GREY_4;  break;
			case COLOUR_DOOR_MOON: pallet =         palletMoon;     break;
			case COLOUR_DOOR_DRAGON: pallet =       COLOUR_RED;     break;
			case COLOUR_DOOR_SERPENT: pallet =      COLOUR_GREEN;   break;
			case COLOUR_DOOR_CHAOS: pallet =        COLOUR_YELLOW;  break;
			case COLOUR_DOOR_BRONZE: pallet =       COLOUR_RED_DARK;break;
			case COLOUR_DOOR_IRON: pallet =         COLOUR_GREY_1;  break;
			case COLOUR_DOOR_CHROMATIC: pallet =    COLOUR_WHITE;   break;
			case COLOUR_DOOR_VOID: pallet =         COLOUR_BLACK;   break;
			default: break;
		}
		for (var i = 0; i < imageData.data.length; i += 4) {
			if(imageData.data[i]===palletMoon[0] && imageData.data[i+1]===palletMoon[1] && imageData.data[i+2]===palletMoon[2]){
				// change to your new rgb
				imageData.data[i]=pallet[0];imageData.data[i+1]=pallet[1];imageData.data[i+2]=pallet[2];
			}
		}
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


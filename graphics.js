var gfxPos = SpriteSheetArray();

function SpriteSheetArray() {

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
	return ((now.getMonth() + 1) + '/' + (now.getDate()) + '/' + now.getFullYear() + " " + now.getHours() + ':' + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
		.getSeconds()) : (now.getSeconds())));
}

function getImage(Hex, d, pos, p, pos18) {
	// Hex = Bloodwych Hex Code
	// d = direction of required wall (North,East,South,West)
	// pos = Position on the screen we are drawing
	// 
	// This function will return the correct graphic to be draw for the Hex Code passed
	// I may need to pass the Graphics Position to be drawn so I can work out which graphic
	// to be return for each wall side.

	//        if (getHexToBinaryPosition(Hex, 12, 4) !== '1'){
	//            if (getHexToBinaryPosition(Hex, 8, 4) === '8'){
	//                PrintLog("Should be drawing something...");
	//            }
	//        }


	switch (getHexToBinaryPosition(Hex, 12, 4)) {
		case '0':
			return null;
			break;
		case '1':
			return getStoneWall(Hex, d, pos, p, pos18);
			break;
		case '2':
			return getWoodenObject(Hex, d, pos, p);
			break;
		case '3':
			return getMiscObject(Hex);
			break;
		case '4':
			if (getHexToBinaryPosition(Hex, 7) === '0') {
				return gfx["dungeon"]["stairs"]["up"];
			} else {
				return gfx["dungeon"]["stairs"]["down"];
			}
			break;
		case '5':
			if (getHexToBinaryPosition(Hex, 4) === '1') {
				var colourDoor = COLOUR_DOOR_VOID;
			} else {
				var colourDoor = getHexToBinaryPosition(Hex, 1, 3);
			}
			if (getHexToBinaryPosition(Hex, 7) === '0') {
				return gfx["dungeon"]["door"]["open"][colourDoor];
			} else if (getHexToBinaryPosition(Hex, 6) === '0') {
				return gfx["dungeon"]["door"]["solid"][colourDoor];
			} else {
				return gfx["dungeon"]["door"]["gate"][colourDoor];
			}
			break;
		case '6':
			//Roof Pit. Can be visible for any floor location
			if (getHexToBinaryPosition(Hex, 5) === '1') {
				p.Portal.drawImage(gfx["dungeon"]["floor"]["pit-up"], gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] * scale), (gfxPos[pos][5] * scale), gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
			}
			switch (getHexToBinaryPosition(Hex, 6, 2)) {
				case '1':
					return gfx["dungeon"]["floor"]["pit-down"];
				case '2':
					return gfx["dungeon"]["floor"]["switch"];
				default:
					return null;
			}
			break;
		case '7':
			return null;
		default: //PrintLog("Get Image Failed - " + Hex);
	}
}

function getMiscObject(hex) {
	var m = getHexToBinaryPosition(hex, 6, 2)
	if (m === '1') {
		return gfx["dungeon"]["misc"]["pillar"];
	}
	return gfx["dungeon"]["misc"]["bed"];
}

function bin2type(b) {

	switch (b) {

		case "00":
			{
				return null;
				break;
			};
		case "01":
			{
				return gfx["dungeon"]["wood"]["wall"];
				break;
			};
		case "10":
			{
				return gfx["dungeon"]["wood"]["door-open"];
				break;
			};
		case "11":
			{
				return gfx["dungeon"]["wood"]["door"];
				break;
			};
		default:
			{
				return null;
			};
	}
}

function getStoneWall(HexCode, d, pos, p, pos18) {
	//if (getHexToBinaryPosition(HexCode, 8) === '0') { ???????????????
	//    return gfx["dungeon"]["stone"]["wall"];
	//}
	var wall = "wall";
	if ((p.x + p.y + p.d) % 2 === 1) {
		wall = "wall2";
	}

	p.Portal.drawImage(gfx["dungeon"]["stone"][wall], gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] * scale), (gfxPos[pos][5] * scale), gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
	if (d === parseInt(getHexToBinaryPosition(HexCode, 10, 2))) {
		return getWallDeco();
	}
	return gfx["dungeon"]["stone"][wall];

	function getWallDeco() {
		var xy = posToCoordinates(pos18, p.x, p.y, p.d);
		var RND4 = Math.floor(xy.x * 1.27 + xy.y * 2.68) % 4; //For random banner faces
		var RND6 = Math.floor(xy.x * 5.76 + xy.y * 4.82) % 6; //For random switches
		var RND8 = Math.floor(xy.x * 5.76 + xy.y * 4.42) % 8; //For random banner frames
		//try {
		if (getHexToBinaryPosition(HexCode, 8) === '1') { //Wall has something on it
			if (getHexToBinaryPosition(HexCode, 6, 2) === '0') { //Shelf
				return gfx["dungeon"]["stone"]["shelf"];
			} else if (getHexToBinaryPosition(HexCode, 6, 2) === '1') { //Sign
				var col = parseInt(getHexToBinaryPosition(HexCode, 0, 6)); //Sign colour
				if (col === 0) { //Random Color
					p.Portal.drawImage(gfx["dungeon"]["deco"]["banner"][RND8], gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] * scale), (gfxPos[pos][5] * scale), gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
					switch (RND4) {
						case 0:
							return gfx["dungeon"]["deco"]["serpent-head"];
						case 1:
							return gfx["dungeon"]["deco"]["dragon-head"];
						case 2:
							return gfx["dungeon"]["deco"]["moon-head"];
						case 3:
							return gfx["dungeon"]["deco"]["chaos-head"];
						default:
							return null;
					}
				} else if (col <= 4) { //Tower Flags
					p.Portal.drawImage(gfx["dungeon"]["deco"]["banner"][col], gfxPos[pos][0], gfxPos[pos][1], gfxPos[pos][2], gfxPos[pos][3], (gfxPos[pos][4] * scale), (gfxPos[pos][5] * scale), gfxPos[pos][2] * scale, gfxPos[pos][3] * scale);
					if (col === 1) { //Serpent Flag
						return gfx["dungeon"]["deco"]["serpent-head"];
					} else if (col === 2) { //Dragon Flag
						return gfx["dungeon"]["deco"]["dragon-head"];
					} else if (col === 3) { //Moon Flag
						return gfx["dungeon"]["deco"]["moon-head"];
					} else if (col === 4) { //Choas Flag
						return gfx["dungeon"]["deco"]["chaos-head"];
					}
				} else {
					return gfx["dungeon"]["deco"]["script"][RND8];
				}
			} else if (getHexToBinaryPosition(HexCode, 6, 2) === '2') { //Switch
				if (getHexToBinaryPosition(HexCode, 0, 4) === '0') {
					return gfx["dungeon"]["deco"]["switch"][COLOUR_SWITCH_BLACK]; // Black switch
				} else if (getHexToBinaryPosition(HexCode, 5) === '1') {
					return gfx["dungeon"]["deco"]["switch-off"][RND6]; // Off switch
				} else {
					return gfx["dungeon"]["deco"]["switch"][RND6]; // On switch
				}
			} else if (getHexToBinaryPosition(HexCode, 6, 2) === '3') { //Crystal Gem
				var col = parseInt(getHexToBinaryPosition(HexCode, 2, 3)); //Gem colour
				if (getHexToBinaryPosition(HexCode, 5) === '0') {
					return gfx["dungeon"]["deco"]["gem-off"][col];
				} else {
					return gfx["dungeon"]["deco"]["gem"][col];
				}
			} else {
				return gfx["dungeon"]["stone"][wall];
			}
		}
		//} catch (e) {}

		return gfx["dungeon"]["stone"][wall];
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

	if (debugHigh) {
		console.log(s + " = " + getDirection(Wall[s]));
	}

	return Wall[s];
};

function getDirection(n) {

	switch (n) {

		case 0:
			{
				return "North";
			};
		case 1:
			{
				return "East";
			};
		case 2:
			{
				return "South";
			};
		case 3:
			{
				return "West";
			};

	}
};

// p = Player
// What we do now is take the 18 Blocks which make up the players view
// We can then make a virtual cube of 4 sides which could possibly be
// drawn for each block, if the block is a Wall or Wooden object which
// has 4 sides we draw each of the sides, if it is not a Wooden object
// or Wall we just draw a single image.

function drawPlayersView(p) {
	debugTextPrint(p); //see bloodwych.js
	p.getViewPortal();

	if (p.dead) {
                p.uiCenterPanel.mode = UI_CENTER_PANEL_DEAD;
		coverViewPort(p);
		writeFontImage(TEXT_THOU, 64, 21, COLOUR[COLOUR_GREY_LIGHT], FONT_ALIGNMENT_CENTER, p.Portal);
		writeFontImage(TEXT_ART_DEAD, 64, 37, COLOUR[COLOUR_GREY_LIGHT], FONT_ALIGNMENT_CENTER, p.Portal);
	} else if (p.sleeping) {
		//showFairy(p.champion[0],p);
                champion[0].spellUp = 1;
		coverViewPort(p);
		writeFontImage(TEXT_THOU_ART, 64, 21, COLOUR[COLOUR_BROWN], FONT_ALIGNMENT_CENTER, p.Portal);
		writeFontImage(TEXT_ASLEEP, 64, 37, COLOUR[COLOUR_BROWN], FONT_ALIGNMENT_CENTER, p.Portal);
                if (p.spellCurrentChamp === null){
                    for (x = 0; x < p.champion.length; x++) {
			if (champion[p.champion[x]].spellUp > 0) {
                                p.uiCenterPanel.mode = UI_CENTER_PANEL_FAIRY;
                                p.spellCurrentChamp = p.champion[x];
                                break;
			}
                    }}
                else {
                    showFairy(champion[p.spellCurrentChamp], p);
                    }                              
	} else {
                p.uiCenterPanel.mode = UI_CENTER_PANEL_VIEWPORT;
		myDIx(p.Portal, gfx["dungeon"]["background"], background[(p.x + p.y + p.d) % 2]);

		for (x = 0; x < 19; x++) {
			var view = p.getView()
			var BlockType = getHexToBinaryPosition(view[x], 12, 4);
			if (BlockType === '2') {
				drawWoodenObject(p, x);
			} else {
				if (p.getObjectOnPos(x, 2) !== 'shelf') { //draw items not on shelf first
					drawItemsOnPos(p, x);
				}
				switch (x) {
					case 0:
						{
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 28), 28, p, x), gfxPos[28]);
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 27), 27, p, x), gfxPos[27]);
						};
						break;
					case 1:
						{
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 26), 26, p, x), gfxPos[26]);
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 25), 25, p, x), gfxPos[25]);
						};
						break;
					case 2:
						{
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 27), 27, p, x), gfxPos[27]);
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 23), 23, p, x), gfxPos[23]);
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 22), 22, p, x), gfxPos[22]);
						};
						break;
					case 3:
						{
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 26), 26, p, x), gfxPos[26]);
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 21), 21, p, x), gfxPos[21]);
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 20), 20, p, x), gfxPos[20]);
						};
						break;
					case 4:
						{
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 22), 22, p, x), gfxPos[22]);
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 21), 21, p, x), gfxPos[21]);
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 16), 16, p, x), gfxPos[16]);
						};
						break;
					case 5:
						{
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 24), 24, p, x), gfxPos[24]);
						};
						break;
					case 6:
						{
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 19), 19, p, x), gfxPos[19]);
						};
						break;
					case 7:
						{
							if (BlockType === '1') {
								myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 17), 17, p, x), gfxPos[17]);
							}
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 18), 18, p, x), gfxPos[18]);
						};
						break;
					case 8:
						{
							if (BlockType === '1') {
								myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 15), 15, p, x), gfxPos[15]);
							}
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 14), 14, p, x), gfxPos[14]);
						};
						break;
					case 9:
						{
							if (BlockType === '1') {
								myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 15), 15, p, x), gfxPos[15]);
							}
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 11), 11, p, x), gfxPos[11]);
						};
						break;
					case 10:
						{
							if (BlockType === '1' || BlockType === '4') {
								myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 12), 12, p, x), gfxPos[12]);
							}
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 13), 13, p, x), gfxPos[13]);
						};
						break;
					case 11:
						{
							if (BlockType === '1' || BlockType === '4') {
								myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 10), 10, p, x), gfxPos[10]);
							}
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 9), 9, p, x), gfxPos[9]);
						};
						break;
					case 12:
						{
							if (BlockType === '1') {
								myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 10), 10, p, x), gfxPos[10]);
							}
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 6), 6, p, x), gfxPos[6]);
						};
						break;
					case 13:
						{
							if (BlockType === '1' || BlockType === '4') {
								myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 7), 7, p, x), gfxPos[7]);
							}
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 8), 8, p, x), gfxPos[8]);
						};
						break;
					case 14:
						{
							if (BlockType === '1' || BlockType === '4') {
								myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 5), 5, p, x), gfxPos[5]);
							}
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 4), 4, p, x), gfxPos[4]);
						};
						break;
					case 15:
						{
							if (BlockType === '1') {
								myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 5), 5, p, x), gfxPos[5]);
							}
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 2), 2, p, x), gfxPos[2]);
						};
						break;
					case 16:
						{
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 3), 3, p, x), gfxPos[3]);
						};
						break;
					case 17:
						{
							myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 1), 1, p, x), gfxPos[1]);
						};
						break;
					case 18:
						{
							if (BlockType === '5') {
								drawDoorFrame(p);
							} else {
								myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 31), 31, p, x), gfxPos[31]);
								myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 29), 29, p, x), gfxPos[29]);
								myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 30), 30, p, x), gfxPos[30]);
							};
						};
						break;
				}
				if (p.getObjectOnPos(x, 2) === 'shelf') { //draw items on shelf last
					drawItemsOnPos(p, x);
				}
				drawMonsterOnPos(p, x);
			}
		}
	}
	p.Portal.save();
	ctx.drawImage(p.PlayerCanvas, p.PortalX, p.PortalY);
}

function drawMonsterOnPos(p, pos) {
	if (pos > -1 && pos <= 15) {
		var monPos = p.getMonstersInRange(pos);
		for (i in monPos) {
			p.drawMonster(monPos[i].monster, monPos[i].distance, monPos[i].gfxCoord);
		}
	}
}

function drawItemsOnPos(p, pos) {
	if ((pos > -1 && pos <= 15) || pos === 18) {
		var itPos = p.getItemsInRange(pos);
		for (i in itPos) {
			p.drawItem(itPos[i].item, itPos[i].distance, itPos[i].gfxCoord);
		}
	}
}

function drawDoorFrame(p) {
	var view = p.getView();
	var HexCode = view[18];

	var BB = parseInt(HexCode.substring(1, 2), 16);
	if (BB >= 0 & BB <= 3 || BB >= 8 & BB <= 11) { //"North/South"
		if (p.d === 0 || p.d === 2) {
			myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 29), 29, p), gfxPos[29]);
			myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 31), 31, p), gfxPos[31]);
		} else {
			myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 30), 30, p), gfxPos[30]);
		}
	} else if (BB >= 4 & BB <= 7 || BB >= 12 & BB <= 15) { //"East/West"
		if (p.d === 1 || p.d === 3) {
			myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 29), 29, p), gfxPos[29]);
			myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 31), 31, p), gfxPos[31]);
		} else {
			myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 30), 30, p), gfxPos[30]);
		}
	}
}

function drawWoodenObject(p, x) {
	// p = Player
	// x = Current Block being drawn

	//We create an array of all the sides for each 18 blocks
	//because wooden walls have 4 sides me need to loop though them all
	//and return the correct wall depending on the players rotation
	var BlockSides = [];
	BlockSides[0] = [-1, -1, 28, 27];
	BlockSides[1] = [-1, 26, 25, -1];
	BlockSides[2] = [-1, 27, 23, 22];
	BlockSides[3] = [-1, 21, 20, 26];
	BlockSides[4] = [-1, 22, 16, 21];
	BlockSides[5] = [28, -1, -1, 24];
	BlockSides[6] = [25, 19, -1, -1];
	BlockSides[7] = [23, 24, 18, 17];
	BlockSides[8] = [20, 15, 14, 19];
	BlockSides[9] = [16, 17, 11, 15];
	BlockSides[10] = [18, -1, 13, 12];
	BlockSides[11] = [14, 10, 9, -1];
	BlockSides[12] = [11, 12, 6, 10];
	BlockSides[13] = [13, -1, 8, 7];
	BlockSides[14] = [9, 5, 4, -1];
	BlockSides[15] = [6, 7, 2, 5];
	BlockSides[16] = [8, -1, -1, 3];
	BlockSides[17] = [4, 1, -1, -1];
	BlockSides[18] = [2, 3, -1, 1];

	inFront = (x === 4 || x === 9 || x === 12 || x === 15);

	var b = hex2bin(p.getView()[x].substring(0, 2));
	var s = [];
	s[0] = b.substring(6, 8); //North Face
	s[1] = b.substring(4, 6); //East Face
	s[2] = b.substring(2, 4); //South Face
	s[3] = b.substring(0, 2); //West Face


	if (BlockSides[x][0] > -1) {
		myDIx(p.Portal, bin2type(s[p.d]), gfxPos[BlockSides[x][0]]);
	}
	if (!inFront) {
		drawItemsOnPos(p, x);
		drawMonsterOnPos(p, x);
	}
	if (BlockSides[x][1] > -1) {
		myDIx(p.Portal, bin2type(s[(p.d + 1) % 4]), gfxPos[BlockSides[x][1]]);
	}
	if (BlockSides[x][3] > -1) {
		myDIx(p.Portal, bin2type(s[(p.d + 3) % 4]), gfxPos[BlockSides[x][3]]);
	}
	if (inFront) {
		drawItemsOnPos(p, x);
		drawMonsterOnPos(p, x);
	}
	if (BlockSides[x][2] > -1) {
		myDIx(p.Portal, bin2type(s[(p.d + 2) % 4]), gfxPos[BlockSides[x][2]]);
	}
}

function drawRect(x, y, w, h, c, p) {
	var cx = ctx;
	if (typeof p !== "undefined") {
		cx = p.Portal;
	}
	var off = scale * 0.5;
	cx.lineWidth = scale;
	cx.strokeStyle = 'rgba(' + c + ')';
	cx.strokeRect(x * scale + off, y * scale + off, w * scale, h * scale);
}

function recolourSprite(img, paletteFrom, paletteTo) {
	var c = document.createElement('canvas');
	var ctx1 = c.getContext("2d");
	var w = img.width;
	var h = img.height;

	c.width = w;
	c.height = h;

	// draw the image on the temporary canvas
	ctx1.drawImage(img, 0, 0, w, h);

	// pull the entire image into an array of pixel data
	var imageData = ctx1.getImageData(0, 0, w, h);


	for (var i = 0; i < imageData.data.length; i += 4) {

		for (j = 0; j < paletteTo.length; j++) {
			if (imageData.data[i] === paletteFrom[j][0] && imageData.data[i + 1] === paletteFrom[j][1] && imageData.data[i + 2] === paletteFrom[j][2] && imageData.data[i + 3] === paletteFrom[j][3]) {
				imageData.data[i] = paletteTo[j][0];
				imageData.data[i + 1] = paletteTo[j][1];
				imageData.data[i + 2] = paletteTo[j][2];
				imageData.data[i + 3] = paletteTo[j][3];
				j = j + 4;
			}
		}

	}

	// put the altered data back on the canvas  
	ctx1.putImageData(imageData, 0, 0);
	// put the re-colored image back on the image

	//var img1 = new Image();
	//img1.width = imageData.width;
	//img1.height = imageData.height;
	//img1.src = c.toDataURL();
	//c = null;
	return c;
	//img1 = null;
}

function recolourSpriteArray(img, paletteFrom, paletteTo) {

	var newArray = []

	for (x = 0; x < img.length; x++) {

		var myImg = img[x];

		var c = document.createElement('canvas');
		var ctx1 = c.getContext("2d");
		var w = myImg.width;
		var h = myImg.height;

		c.width = w;
		c.height = h;

		// draw the image on the temporary canvas
		ctx1.drawImage(myImg, 0, 0, w, h);

		// pull the entire image into an array of pixel data
		var imageData = ctx1.getImageData(0, 0, w, h);


		for (var i = 0; i < imageData.data.length; i += 4) {

			for (j = 0; j < paletteTo.length; j++) {
				if (imageData.data[i] === paletteFrom[j][0] && imageData.data[i + 1] === paletteFrom[j][1] && imageData.data[i + 2] === paletteFrom[j][2] && imageData.data[i + 3] === paletteFrom[j][3]) {
					imageData.data[i] = paletteTo[j][0];
					imageData.data[i + 1] = paletteTo[j][1];
					imageData.data[i + 2] = paletteTo[j][2];
					imageData.data[i + 3] = paletteTo[j][3];
					j = j + 4;
				}
			}

		}

		ctx1.putImageData(imageData, 0, 0);
		newArray.push(c);
	}
	return newArray;
}

function recolorImage(img, colour, folder, type, item) {
	var c = document.createElement('canvas');
	var ctx1 = c.getContext("2d");
	var w = img.width;
	var h = img.height;

	c.width = w;
	c.height = h;

	// draw the image on the temporary canvas
	ctx1.drawImage(img, 0, 0, w, h);

	// pull the entire image into an array of pixel data
	var imageData = ctx1.getImageData(0, 0, w, h);
	var palletDefault;
	var pallet;

	// examine every pixel, 
	// change any old rgb to the new-rgb
	if (folder === "dungeon") {
		if (type === "deco") {
			if (item === "switch" || item === "switch-off" || item === "gem" || item === "gem-off") {
				if (item === "switch" || item === "gem") { //Switches
					palletDefault = objectPalette["switch"]["default"];
				} else {
					palletDefault = objectPalette["switch"]["default-off"];
				}
				pallet = objectPalette["switch"][colour];
			} else { //Banners
				palletDefault = objectPalette["deco"]["default"];
				pallet = objectPalette["deco"][colour];
			}
		} else if (type === "door") { //Doors
			palletDefault = objectPalette["door"]["default"];
			pallet = objectPalette["door"][colour];
		}
	}
	for (var i = 0; i < imageData.data.length; i += 4) {
		if (typeof pallet[0][0] !== "undefined") {
			for (j = 0; j < pallet.length; j++) {
				if (palletDefault[j] !== null) {
					if (imageData.data[i] === palletDefault[j][0] && imageData.data[i + 1] === palletDefault[j][1] && imageData.data[i + 2] === palletDefault[j][2] && imageData.data[i + 3] === palletDefault[j][3]) {
						imageData.data[i] = pallet[j][0];
						imageData.data[i + 1] = pallet[j][1];
						imageData.data[i + 2] = pallet[j][2];
						imageData.data[i + 3] = pallet[j][3];
						j = j + 4;
					}
				}
			}
		} else if (imageData.data[i] === palletDefault[0] && imageData.data[i + 1] === palletDefault[1] && imageData.data[i + 2] === palletDefault[2]) {
			if (palletDefault !== null) {
				imageData.data[i] = pallet[0];
				imageData.data[i + 1] = pallet[1];
				imageData.data[i + 2] = pallet[2];
			}
		}
	}
	// put the altered data back on the canvas  
	ctx1.putImageData(imageData, 0, 0);
	// put the re-colored image back on the image

	//var img1 = new Image();
	//img1.width = imageData.width;
	//img1.height = imageData.height;
	//img1.src = c.toDataURL();

	return c;
}

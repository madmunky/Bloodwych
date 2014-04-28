/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var maleCharacterSpriteLocations = characterSpriteLocation();
var testMon1 = CHA_MURLOCK;


var charLoaded = false;
var characterImages = [];



function grabCharacter(cID, dir, dist) {
	try {

		if (typeof monsterPalette[cID] !== "undefined") {
			var LEG;
			var ARM;
			var TORSO;
			var HEAD;

			switch (dir) {

				case 0:
					{
						HEAD = recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][dist][0], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette);
						TORSO = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][dist][0], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette);
						ARM = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][dist][0], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette);
						LEG = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][dist][0], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette);
					}
					break;
				case 3:
					{
						HEAD = recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][dist][1], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette);
						TORSO = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][dist][1], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette);
						ARM = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][dist][1], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette);
						LEG = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][dist][1], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette);
					}
					break;
				case 1:
					{
						HEAD = recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][dist][2], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette);
						TORSO = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][dist][2], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette);
						ARM = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][dist][2], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette);
						LEG = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][dist][2], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette);
					}
					break;
				case 2:
					{
						HEAD = recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][dist][3], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette);
						TORSO = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][dist][3], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette);
						ARM = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][dist][0], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette);
						LEG = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][dist][3], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette);
					}
					break;

			}

			var height = HEAD.height + TORSO.height + LEG.height,
				width = ARM.width + TORSO.width + ARM.width;

			var can = document.createElement('canvas');
			can.width = width;
			can.height = height;
			var charContext = can.getContext("2d");
			var charImageObj = new Image();
			charImageObj.width = width;
			charImageObj.height = height;
			var SPRITELOCATIONS = maleCharacterSpriteLocations;

			switch (dir) {

				case 0:
					{
						charContext.drawImage(LEG, SPRITELOCATIONS[dist][0][0], SPRITELOCATIONS[dist][0][1], LEG.width, LEG.height);
						charContext.drawImage(TORSO, SPRITELOCATIONS[dist][1][0], SPRITELOCATIONS[dist][1][1], TORSO.width, TORSO.height);
						charContext.drawImage(HEAD, SPRITELOCATIONS[dist][2][0], SPRITELOCATIONS[dist][2][1], HEAD.width, HEAD.height);
						charContext.drawImage(flipImage(ARM), SPRITELOCATIONS[dist][3][0], SPRITELOCATIONS[dist][3][1], ARM.width, ARM.height);
						charContext.drawImage(ARM, SPRITELOCATIONS[dist][4][0], SPRITELOCATIONS[dist][4][1], ARM.width, ARM.height);
					}
					break;
				case 3:
					{
						charContext.drawImage(LEG, SPRITELOCATIONS[dist][5][0], SPRITELOCATIONS[dist][5][1], LEG.width, LEG.height);
						charContext.drawImage(TORSO, SPRITELOCATIONS[dist][6][0], SPRITELOCATIONS[dist][6][1], TORSO.width, TORSO.height);
						charContext.drawImage(flipImage(ARM), SPRITELOCATIONS[dist][8][0], SPRITELOCATIONS[dist][8][1], ARM.width, ARM.height);
						charContext.drawImage(HEAD, SPRITELOCATIONS[dist][7][0], SPRITELOCATIONS[dist][7][1], HEAD.width, HEAD.height);
					}
					break;
				case 1:
					{
						charContext.drawImage(LEG, SPRITELOCATIONS[dist][9][0], SPRITELOCATIONS[dist][9][1], LEG.width, LEG.height);
						charContext.drawImage(TORSO, SPRITELOCATIONS[dist][10][0], SPRITELOCATIONS[dist][10][1], TORSO.width, TORSO.height);
						charContext.drawImage(flipImage(ARM), SPRITELOCATIONS[dist][12][0], SPRITELOCATIONS[dist][12][1], ARM.width, ARM.height);
						charContext.drawImage(HEAD, SPRITELOCATIONS[dist][11][0], SPRITELOCATIONS[dist][11][1], HEAD.width, HEAD.height);
					}
					break;
				case 2:
					{
						charContext.drawImage(LEG, SPRITELOCATIONS[dist][13][0], SPRITELOCATIONS[dist][13][1], LEG.width, LEG.height);
						charContext.drawImage(ARM, SPRITELOCATIONS[dist][17][0], maleCharacterSpriteLocations[dist][17][1], ARM.width, ARM.height);
						charContext.drawImage(flipImage(ARM), SPRITELOCATIONS[dist][16][0], SPRITELOCATIONS[dist][16][1], ARM.width, ARM.height);
						charContext.drawImage(TORSO, SPRITELOCATIONS[dist][14][0], SPRITELOCATIONS[dist][14][1], TORSO.width, TORSO.height);
						charContext.drawImage(HEAD, SPRITELOCATIONS[dist][15][0], SPRITELOCATIONS[dist][15][1], HEAD.width, HEAD.height);
					}
					break;
			}

			charContext.save();
			charImageObj.src = can.toDataURL();
			delete LEG;
			delete ARM;
			delete TORSO;
			delete HEAD;
			return charImageObj;
		}
	} catch (e) {
		PrintLog("GrabCharacter ERROR: " + e.toString());
	}

}

function characterSpriteLocation() {


	var myArray = [];
	for (var x = 0; x < 4; x++) {

		if (x === 0) { //This is the DISTANCE
			myArray.push(new Array(
				//Front View
				new Array(5, 21), //LEGS
				new Array(5, 7), //BODY
				new Array(7, 0), //HEAD
				new Array(20, 9), //RIGHT ARM
				new Array(0, 9), //LEFT ARM
				//Left View
				new Array(11, 22), //LEGS
				new Array(9, 8), //BODY
				new Array(9, 0), //HEAD
				new Array(14, 10), //ARM
				//Right View
				new Array(7, 22),
				new Array(5, 8),
				new Array(5, 0),
				new Array(3, 10),
				//Rear View
				new Array(5, 22),
				new Array(5, 8),
				new Array(7, 0),
				new Array(20, 10),
				new Array(0, 10)));
		}
		if (x === 1) {
			myArray.push(new Array(
				//Front View
				new Array(3, 19),
				new Array(4, 7),
				new Array(6, 3),
				new Array(17, 10),
				new Array(0, 10),
				//Left View
				new Array(7, 20),
				new Array(7, 8),
				new Array(6, 3),
				new Array(9, 10),
				//Right View
				new Array(4, 20),
				new Array(4, 8),
				new Array(4, 3),
				new Array(3, 10),
				//Rear View
				new Array(3, 20),
				new Array(4, 8),
				new Array(6, 3),
				new Array(17, 11),
				new Array(0, 11)));
		}
		if (x === 2) {
			myArray.push(new Array(
				//Front View
				new Array(3, 16),
				new Array(4, 6),
				new Array(5, 1),
				new Array(13, 7),
				new Array(0, 7),
				//Left View
				new Array(7, 16),
				new Array(7, 6),
				new Array(7, 1),
				new Array(9, 8),
				//Right View
				new Array(7, 16),
				new Array(7, 6),
				new Array(7, 1),
				new Array(5, 8),
				//Rear View
				new Array(3, 16),
				new Array(4, 6),
				new Array(5, 1),
				new Array(13, 7),
				new Array(0, 7)));
		}
		if (x === 3) {
			myArray.push(new Array(
				//Front View
				new Array(3, 13),
				new Array(4, 4),
				new Array(5, 0),
				new Array(11, 5),
				new Array(0, 5),
				//Left View
				new Array(6, 13),
				new Array(6, 4),
				new Array(7, 0),
				new Array(7, 6),
				//Right View
				new Array(8, 13),
				new Array(7, 4),
				new Array(8, 0),
				new Array(6, 6),
				//Rear View
				new Array(3, 13),
				new Array(4, 4),
				new Array(4, 0),
				new Array(11, 5),
				new Array(0, 5)));
		}
	}



	return myArray;

}

function testing(p) {

	//    try {
	//        if (charLoaded) {
	//            /*drawCharacter(monsterMax - 1, testDirection, testDistance + 1, p); //rosanne
	//            drawCharacter(monsterMax - 1, testDirection, testDistance + 1, p); //eleanor
	//            drawCharacter(monsterMax - 1, testDirection, testDistance, p); //blodwyn
	//            drawCharacter(monsterMax - 1, testDirection, testDistance, p); //murlock*/
	//        }
	//    } catch (e) {}

}

function drawParty(p, character1, character2, character3, character4) {

	drawPerson(p, character1, CHAR_BACK_RIGHT, maleCharacterSpriteLocations, DIRECTION_NORTH, CHAR_DISTANCE_MID);
	drawPerson(p, character2, CHAR_BACK_LEFT, maleCharacterSpriteLocations, DIRECTION_NORTH, CHAR_DISTANCE_MID);
	drawPerson(p, character3, CHAR_FRONT_RIGHT, maleCharacterSpriteLocations, DIRECTION_NORTH, CHAR_DISTANCE_CLOSE);
	drawPerson(p, character4, CHAR_FRONT_LEFT, maleCharacterSpriteLocations, DIRECTION_NORTH, CHAR_DISTANCE_CLOSE);

}

function drawCharacter(mForm, dir, dist, player, offset) {
	if (dist > -1 && typeof monster[mForm].gfx[dist] !== "undefined" && typeof monster[mForm].gfx[dist][dir] !== "undefined") {
		var offx = 64 - Math.floor(monster[mForm].gfx[dist][dir].width / 2),
			offy = 41 - Math.floor(monster[mForm].gfx[dist][dir].height / 2);

		if (typeof offset !== "undefined") {
			offx += offset.x;
			offy += offset.y;
		}
		var blur = 0;
		if (dist <= CHAR_DISTANCE_FAR) {
			var br = Math.floor(Math.random() * 20);
			if (br === 0) {
				blur = -1;
			} else if(br === 1) {
				blur = 1;
			}
		}
		player.Portal.drawImage(monster[mForm].gfx[dist][dir], (offx + blur) * scale, offy * scale, monster[mForm].gfx[dist][dir].width * scale, monster[mForm].gfx[dist][dir].height * scale);
	}
}

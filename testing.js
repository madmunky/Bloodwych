/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var maleCharacterSpriteLocations = characterSpriteLocation();
var testMon1 = CHA_MURLOCK;

//var charLoaded = false;
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
		PrintLog("GrabCharacter ERROR Monster ID "+cID.toString()+ ", DIR: " +dir.toString()+" , DIST: "+dist+" : " + e.toString());
	}

}

function grabWholeCharacter(cID, dir, dist) {
	try {
            
                var BODY = null;
                var BODYIDTMP = 0;
                var DIRtmp = dist -4;
                var tmpPalette = monsterPalette[cID].legPalette;
                
		if (typeof monsterPalette[cID] !== "undefined") {
			switch (dir) {

				case 0:
					{
						BODY = recolourSprite(characterGfx[4][BODYIDTMP][dist-4][0], MON_PALETTE_DEFAULT, tmpPalette);
					}
					break;
				case 3:
					{
						BODY = recolourSprite(characterGfx[4][BODYIDTMP][dist-4][1], MON_PALETTE_DEFAULT, tmpPalette);
					}
					break;
				case 1:
					{
						BODY = recolourSprite(characterGfx[4][BODYIDTMP][dist-4][2], MON_PALETTE_DEFAULT, tmpPalette);
					}
					break;
				case 2:
					{
						BODY = recolourSprite(characterGfx[4][BODYIDTMP][dist-4][3], MON_PALETTE_DEFAULT, tmpPalette);
					}
					break;

			}

			var height = BODY.height,
				width = BODY.width;

			var can = document.createElement('canvas');
			can.width = width;
			can.height = height;
			var charContext = can.getContext("2d");
			var charImageObj = new Image();
			charImageObj.width = width;
			charImageObj.height = height;
                        
                        charContext.drawImage(BODY, 0, 0, BODY.width, BODY.height);

			charContext.save();
			charImageObj.src = can.toDataURL();
			delete BODY;
			return charImageObj;
		}
	} catch (e) {
		PrintLog("GrabWholeCharacter ERROR: " + e.toString());
	}

}

function characterSpriteLocation() {


	var myArray = [];
	for (var x = 0; x < 4; x++) {

		if (x === 0) { //This is the DISTANCE
			offx = 4;
			offy = 0;
			myArray.push(new Array(
				//Front View
				new Array(5 + offx, 21 + offy), //LEGS
				new Array(5 + offx, 7 + offy), //BODY
				new Array(7 + offx, 0 + offy), //HEAD
				new Array(16 + offx, 9 + offy), //RIGHT ARM
				new Array(0 + offx, 9 + offy), //LEFT ARM
				//Left View
				new Array(11 + offx, 22 + offy), //LEGS
				new Array(9 + offx, 8 + offy), //BODY
				new Array(9 + offx, 0 + offy), //HEAD
				new Array(14 + offx, 10 + offy), //ARM
				//Right View
				new Array(7 + offx, 22 + offy),
				new Array(5 + offx, 8 + offy),
				new Array(5 + offx, 0 + offy),
				new Array(3 + offx, 10 + offy),
				//Rear View
				new Array(5 + offx, 22 + offy),
				new Array(5 + offx, 8 + offy),
				new Array(7 + offx, 0 + offy),
				new Array(16 + offx, 10 + offy),
				new Array(0 + offx, 10 + offy)));
		}
		if (x === 1) {
			offx = 4;
			offy = 0;
			myArray.push(new Array(
				//Front View
				new Array(3 + offx, 19 + offy),
				new Array(4 + offx, 7 + offy),
				new Array(6 + offx, 3 + offy),
				new Array(12 + offx, 10 + offy),
				new Array(0 + offx, 10 + offy),
				//Left View
				new Array(7 + offx, 20 + offy),
				new Array(7 + offx, 8 + offy),
				new Array(6 + offx, 3 + offy),
				new Array(9 + offx, 10 + offy),
				//Right View
				new Array(4 + offx, 20 + offy),
				new Array(4 + offx, 8 + offy),
				new Array(4 + offx, 3 + offy),
				new Array(3 + offx, 10 + offy),
				//Rear View
				new Array(3 + offx, 20 + offy),
				new Array(4 + offx, 8 + offy),
				new Array(6 + offx, 3 + offy),
				new Array(12 + offx, 11 + offy),
				new Array(0 + offx, 11 + offy)));
		}
		if (x === 2) {
			offx = 4;
			offy = 0;
			myArray.push(new Array(
				//Front View
				new Array(3 + offx, 16 + offy),
				new Array(4 + offx, 6 + offy),
				new Array(5 + offx, 1 + offy),
				new Array(8 + offx, 7 + offy),
				new Array(0 + offx, 7 + offy),
				//Left View
				new Array(7 + offx, 16 + offy),
				new Array(7 + offx, 6 + offy),
				new Array(7 + offx, 1 + offy),
				new Array(9 + offx, 8 + offy),
				//Right View
				new Array(7 + offx, 16 + offy),
				new Array(7 + offx, 6 + offy),
				new Array(7 + offx, 1 + offy),
				new Array(5 + offx, 8 + offy),
				//Rear View
				new Array(3 + offx, 16 + offy),
				new Array(4 + offx, 6 + offy),
				new Array(5 + offx, 1 + offy),
				new Array(8 + offx, 7 + offy),
				new Array(0 + offx, 7 + offy)));
		}
		if (x === 3) {
			offx = 4;
			offy = 0;
			myArray.push(new Array(
				//Front View
				new Array(3 + offx, 13 + offy),
				new Array(4 + offx, 4 + offy),
				new Array(5 + offx, 0 + offy),
				new Array(6 + offx, 5 + offy),
				new Array(0 + offx, 5 + offy),
				//Left View
				new Array(6 + offx, 13 + offy),
				new Array(6 + offx, 4 + offy),
				new Array(7 + offx, 0 + offy),
				new Array(7 + offx, 6 + offy),
				//Right View
				new Array(8 + offx, 13 + offy),
				new Array(7 + offx, 4 + offy),
				new Array(8 + offx, 0 + offy),
				new Array(6 + offx, 6 + offy),
				//Rear View
				new Array(3 + offx, 13 + offy),
				new Array(4 + offx, 4 + offy),
				new Array(4 + offx, 0 + offy),
				new Array(6 + offx, 5 + offy),
				new Array(0 + offx, 5 + offy)));
		}
	}



	return myArray;

}

function testing(p) {

//ctx.drawImage(characterGfx[4][testMon1][testDistance][testDirection],0,0,characterGfx[4][0][testDistance][testDirection].width * scale,characterGfx[4][0][testDistance][testDirection].height * scale)

}

function drawParty(p, character1, character2, character3, character4) {

	drawPerson(p, character1, CHAR_BACK_RIGHT, maleCharacterSpriteLocations, DIRECTION_NORTH, CHAR_DISTANCE_CLOSE);
	drawPerson(p, character2, CHAR_BACK_LEFT, maleCharacterSpriteLocations, DIRECTION_NORTH, CHAR_DISTANCE_CLOSE);
	drawPerson(p, character3, CHAR_FRONT_RIGHT, maleCharacterSpriteLocations, DIRECTION_NORTH, CHAR_DISTANCE_VERY_CLOSE);
	drawPerson(p, character4, CHAR_FRONT_LEFT, maleCharacterSpriteLocations, DIRECTION_NORTH, CHAR_DISTANCE_VERY_CLOSE);

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
		if (dist <= CHAR_DISTANCE_MID) {
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

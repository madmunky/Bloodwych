/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getCharacterSprite(length, graphicsFolder, graphic, spritWidth, spriteHeight, colSize) {


	var graphicArray = [];

	for (x = 0; x < length; x++) {

		var MID = [],
			FAR = [],
			CLOSE = [],
			DISTANT = [],
			POSITION = 0;

		if (graphic === 'minis') {
			CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, false));
			POSITION = POSITION + spriteHeight;

			CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 8, spriteHeight, false));
			CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 8, spriteHeight, true));
			POSITION = POSITION + spriteHeight;

			CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, false));
			POSITION = POSITION + spriteHeight;

			MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 4, spriteHeight - 5, false));
			POSITION = POSITION + spriteHeight - 5;

			MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 10, spriteHeight - 5, false));
			MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 10, spriteHeight - 5, true));
			POSITION = POSITION + spriteHeight - 5;

			MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 4, spriteHeight - 4, false));
			POSITION = POSITION + spriteHeight - 4;

		} else {
			switch (graphic) {
				case 'heads':

					var largeHeads = 0;

					if (x === 3 || x === 17) {
						largeHeads = 0;
					}

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spritWidth, spriteHeight, false)); //11, 13
					POSITION = POSITION + spriteHeight;

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spritWidth, spriteHeight, false));
					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spritWidth, spriteHeight, true));
					POSITION = POSITION + spriteHeight;

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spritWidth, spriteHeight, false));
					POSITION = POSITION + spriteHeight;



					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spritWidth - 2, spriteHeight - 3, false)); //9, 10
					POSITION = POSITION + spriteHeight - 3;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spritWidth - 2, spriteHeight - 3, false));
					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spritWidth - 2, spriteHeight - 3, true));
					POSITION = POSITION + spriteHeight - 3;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spritWidth - 2, spriteHeight - 3, false));
					POSITION = POSITION + spriteHeight - 3;



					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spritWidth - 4, spriteHeight - 5, false)); //7, 8
					POSITION = POSITION + spriteHeight - 5;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spritWidth - 4, spriteHeight - 5, false));
					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spritWidth - 4, spriteHeight - 5, true));
					POSITION = POSITION + spriteHeight - 5;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spritWidth - 4, spriteHeight - 5, false));
					POSITION = POSITION + spriteHeight - 5;



					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spritWidth - 6, spriteHeight - 6, false)); //5, 7
					POSITION = POSITION + spriteHeight - 6;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spritWidth - 6, spriteHeight - 6, false));
					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spritWidth - 6, spriteHeight - 6, true));
					POSITION = POSITION + spriteHeight - 6;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], (x * colSize), POSITION + largeHeads, spritWidth - 6, spriteHeight - 6, false));

					break;
				case 'torsos': //15, 14

					if (x === 5) {

						CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 4, spriteHeight - 2, false)); //11, 12
						POSITION = POSITION + spriteHeight;

						CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 6, spriteHeight - 2, false));
						CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 6, spriteHeight - 2, true));
						POSITION = POSITION + spriteHeight;

						CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 4, spriteHeight - 2, false));
						POSITION = POSITION + spriteHeight;



						MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 6, spriteHeight - 5, false));
						POSITION = POSITION + spriteHeight - 2;

						MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 7, spriteHeight - 5, false));
						MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 7, spriteHeight - 5, true));
						POSITION = POSITION + spriteHeight - 2;

						MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 6, spriteHeight - 5, false));
						POSITION = POSITION + spriteHeight - 2;



						FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 8, spriteHeight - 7, false));
						POSITION = POSITION + spriteHeight - 4;

						FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 9, spriteHeight - 7, false));
						FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 9, spriteHeight - 7, true));
						POSITION = POSITION + spriteHeight - 4;

						FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 8, spriteHeight - 7, false));
						POSITION = POSITION + spriteHeight - 4;



						DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 8, spriteHeight - 7, false));
						POSITION = POSITION + spriteHeight - 5;

						DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 9, spriteHeight - 7, false));
						DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 9, spriteHeight - 7, true));
						POSITION = POSITION + spriteHeight - 5;

						DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 8, spriteHeight - 7, false));

					} else { //15, 14

						CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, false));
						POSITION = POSITION + spriteHeight;

						CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 2, spriteHeight, false));
						CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 2, spriteHeight, true));
						POSITION = POSITION + spriteHeight;

						CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, false));
						POSITION = POSITION + spriteHeight;



						MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 2, spriteHeight - 2, false));
						POSITION = POSITION + spriteHeight - 2;

						MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 4, spriteHeight - 2, false));
						MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 4, spriteHeight - 2, true));
						POSITION = POSITION + spriteHeight - 2;

						MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 2, spriteHeight - 2, false));
						POSITION = POSITION + spriteHeight - 2;



						FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 6, spriteHeight - 4, false));
						POSITION = POSITION + spriteHeight - 4;

						FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 7, spriteHeight - 4, false));
						FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 7, spriteHeight - 4, true));
						POSITION = POSITION + spriteHeight - 4;

						FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 6, spriteHeight - 4, false));
						POSITION = POSITION + spriteHeight - 4;



						DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 8, spriteHeight - 5, false));
						POSITION = POSITION + spriteHeight - 5;

						DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 7, spriteHeight - 5, false));
						DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 7, spriteHeight - 5, true));
						POSITION = POSITION + spriteHeight - 5;

						DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 8, spriteHeight - 5, false));

					}
					break;
				case 'arms':
					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 4, spriteHeight, false));
					POSITION = POSITION + spriteHeight;

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 1, spriteHeight, false));
					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 1, spriteHeight, true));
					POSITION = POSITION + spriteHeight;

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize + 1, POSITION, spritWidth - 1, spriteHeight - 4, false));
					POSITION = POSITION + spriteHeight + 2;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION - 1, spritWidth - 5, spriteHeight - 4, false));
					POSITION = POSITION + spriteHeight - 1;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 2, spriteHeight - 3, false));
					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 2, spriteHeight - 3, true));
					POSITION = POSITION + spriteHeight;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION - 1, spritWidth - 2, spriteHeight - 6, false));
					POSITION = POSITION + spriteHeight - 7;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 5, spriteHeight - 6, false));
					POSITION = POSITION + spriteHeight - 4;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 3, spriteHeight - 6, false));
					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 3, spriteHeight - 6, true));
					POSITION = POSITION + spriteHeight - 4;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 3, spriteHeight - 9, false));
					POSITION = POSITION + spriteHeight + 1;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 5, spriteHeight - 8, false));
					POSITION = POSITION + spriteHeight - 8;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 4, spriteHeight - 8, false));
					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 4, spriteHeight - 8, true));
					POSITION = POSITION + spriteHeight - 8;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], (x * colSize), POSITION, spritWidth - 4, spriteHeight, false));

					break;
				case 'legs': //17, 26
					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, false));
					POSITION = POSITION + spriteHeight;

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 7, spriteHeight, false));
					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 7, spriteHeight, true));
					POSITION = POSITION + spriteHeight;

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, false));
					POSITION = POSITION + spriteHeight;



					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 2, spriteHeight - 4, false));
					POSITION = POSITION + spriteHeight - 4;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 9, spriteHeight - 4, false));
					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 9, spriteHeight - 4, true));
					POSITION = POSITION + spriteHeight - 4;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 2, spriteHeight - 4, false));
					POSITION = POSITION + spriteHeight - 4;



					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 6, spriteHeight - 8, false));
					POSITION = POSITION + spriteHeight - 8;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 10, spriteHeight - 8, false));
					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 10, spriteHeight - 8, true));
					POSITION = POSITION + spriteHeight - 8;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 6, spriteHeight - 8, false));
					POSITION = POSITION + spriteHeight - 8;



					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 6, spriteHeight - 11, false));
					POSITION = POSITION + spriteHeight - 11;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 12, spriteHeight - 11, false));
					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 12, spriteHeight - 11, true));
					POSITION = POSITION + spriteHeight - 11;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], (x * colSize), POSITION, spritWidth - 6, spriteHeight - 11, false));

					break;
				default:
					break;
			}
		}

		graphicArray.push(new Array(CLOSE, MID, FAR, DISTANT));

	}
	//characterGfx.push(graphicArray);

	switch (graphic) {
		case 'minis':
			gameGfxLoaded.monsterMinis = true;
			characterGfx[4] = graphicArray;
			break;
		case 'heads':
			gameGfxLoaded.monsterHeads = true;
			characterGfx[0] = graphicArray;
			break;
		case 'torsos':
			gameGfxLoaded.monsterTorsos = true;
			characterGfx[1] = graphicArray;
			break;
		case 'arms':
			gameGfxLoaded.monsterArms = true;
			characterGfx[3] = graphicArray;
			break;
		case 'legs':
			gameGfxLoaded.monsterLegs = true;
			characterGfx[2] = graphicArray;
			break;
	}
}

function grabCharacter(cID, dir, dist) {
	//try {

	if (typeof monsterPalette[cID] !== "undefined") {
		var LEG;
		var ARM;
		var TORSO;
		var HEAD;

		switch (dir) {

			case 0:
				HEAD = recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][dist][0], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette);
				TORSO = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][dist][0], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette);
				ARM = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][dist][0], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette);
				LEG = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][dist][0], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette);
				break;
			case 3:
				HEAD = recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][dist][1], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette);
				TORSO = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][dist][1], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette);
				ARM = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][dist][1], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette);
				LEG = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][dist][1], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette);
				break;
			case 1:
				HEAD = recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][dist][2], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette);
				TORSO = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][dist][2], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette);
				ARM = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][dist][2], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette);
				LEG = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][dist][2], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette);
				break;
			case 2:
				HEAD = recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][dist][3], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette);
				TORSO = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][dist][3], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette);
				ARM = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][dist][0], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette);
				LEG = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][dist][3], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette);
				break;

		}

		var height = Math.round(HEAD.height * 0.58) + TORSO.height + LEG.height,
			width = ARM.width + TORSO.width + ARM.width;

		var can = document.createElement('canvas');
		can.width = width;
		can.height = height;
		var charContext = can.getContext("2d");
		var charImageObj = new Image();
		charImageObj.width = width;
		charImageObj.height = height;
		//var SPRITELOCATIONS = maleCharacterSpriteLocations;
		var legCoord = {
			x: Math.round((width - LEG.width) / 2),
			y: height - LEG.height
		};
		var torsoCoord = {
			x: Math.round((width - TORSO.width) / 2),
			y: height - LEG.height - TORSO.height
		};
		var headCoord = {
			x: Math.round((width - HEAD.width) / 2),
			y: height - LEG.height - TORSO.height - Math.round(HEAD.height * 0.58)
		};
		var armLeftCoord = {
			x: Math.round((width - TORSO.width) / 2) - ARM.width,
			y: height - LEG.height - TORSO.height + 2
		};
		var armRightCoord = {
			x: Math.round((width + TORSO.width) / 2),
			y: height - LEG.height - TORSO.height + 2
		};
		var armSideLeftCoord = {
			x: Math.round((width - TORSO.width) / 2),
			y: height - LEG.height - TORSO.height + 2
		};
		var armSideRightCoord = {
			x: Math.round((width + TORSO.width) / 2) - ARM.width,
			y: height - LEG.height - TORSO.height + 2
		};

		switch (dir) {

			case 0:
				charContext.drawImage(LEG, legCoord.x, legCoord.y, LEG.width, LEG.height);
				charContext.drawImage(TORSO, torsoCoord.x, torsoCoord.y, TORSO.width, TORSO.height);
				charContext.drawImage(HEAD, headCoord.x, headCoord.y, HEAD.width, HEAD.height);
				charContext.drawImage(flipImage(ARM), armRightCoord.x, armRightCoord.y, ARM.width, ARM.height);
				charContext.drawImage(ARM, armLeftCoord.x, armLeftCoord.y, ARM.width, ARM.height);
				break;
			case 3:
				charContext.drawImage(LEG, legCoord.x, legCoord.y, LEG.width, LEG.height);
				charContext.drawImage(TORSO, torsoCoord.x, torsoCoord.y, TORSO.width, TORSO.height);
				charContext.drawImage(flipImage(ARM), armSideRightCoord.x, armSideRightCoord.y, ARM.width, ARM.height);
				charContext.drawImage(HEAD, headCoord.x, headCoord.y, HEAD.width, HEAD.height);
				break;
			case 1:
				charContext.drawImage(LEG, legCoord.x, legCoord.y, LEG.width, LEG.height);
				charContext.drawImage(TORSO, torsoCoord.x, torsoCoord.y, TORSO.width, TORSO.height);
				charContext.drawImage(flipImage(ARM), armSideLeftCoord.x, armSideLeftCoord.y, ARM.width, ARM.height);
				charContext.drawImage(HEAD, headCoord.x, headCoord.y, HEAD.width, HEAD.height);
				break;
			case 2:
				charContext.drawImage(LEG, legCoord.x, legCoord.y, LEG.width, LEG.height);
				charContext.drawImage(ARM, armLeftCoord.x, armLeftCoord.y, ARM.width, ARM.height);
				charContext.drawImage(flipImage(ARM), armRightCoord.x, armRightCoord.y, ARM.width, ARM.height);
				charContext.drawImage(TORSO, torsoCoord.x, torsoCoord.y, TORSO.width, TORSO.height);
				charContext.drawImage(HEAD, headCoord.x, headCoord.y, HEAD.width, HEAD.height);
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
	//} catch (e) {
	//	PrintLog("GrabCharacter ERROR Monster ID "+cID.toString()+ ", DIR: " +dir.toString()+" , DIST: "+dist+" : " + e.toString());
	//}

}

function grabMiniCharacter(cID, dir, dist) {
	//	try {

	if (typeof monsterPalette[cID] !== "undefined") {
		var mini = null;
		var miniId = 0;
		var tmpPalette = monsterPalette[cID].miniPalette;

		switch (dir) {

			case 0:
				mini = recolourSprite(characterGfx[4][miniId][dist - 4][0], MON_PALETTE_DEFAULT, tmpPalette);
				break;
			case 3:
				mini = recolourSprite(characterGfx[4][miniId][dist - 4][1], MON_PALETTE_DEFAULT, tmpPalette);
				break;
			case 1:
				mini = recolourSprite(characterGfx[4][miniId][dist - 4][2], MON_PALETTE_DEFAULT, tmpPalette);
				break;
			case 2:
				mini = recolourSprite(characterGfx[4][miniId][dist - 4][3], MON_PALETTE_DEFAULT, tmpPalette);
				break;

		}

		var height = mini.height,
			width = mini.width;

		var can = document.createElement('canvas');
		can.width = width;
		can.height = height;
		var charContext = can.getContext("2d");
		var charImageObj = new Image();
		charImageObj.width = width;
		charImageObj.height = height;

		charContext.drawImage(mini, 0, 0, mini.width, mini.height);

		charContext.save();
		charImageObj.src = can.toDataURL();
		delete mini;
		return charImageObj;
	}
	//	} catch (e) {
	//		PrintLog("GrabMiniCharacter ERROR: " + e.toString());
	//	}

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
				new Array(5 + offx, 7 + offy), //TORSO
				new Array(7 + offx, 0 + offy), //HEAD
				new Array(16 + offx, 9 + offy), //RIGHT ARM
				new Array(0 + offx, 9 + offy), //LEFT ARM
				//Left View
				new Array(11 + offx, 22 + offy), //LEGS
				new Array(9 + offx, 8 + offy), //TORSO
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

function drawCharacter(mForm, dir, dist, player, offset) {
	if (dist > -1 && typeof monster[mForm].gfx[dist] !== "undefined" && typeof monster[mForm].gfx[dist][dir] !== "undefined") {
		var offx = 64 - Math.floor(monster[mForm].gfx[dist][dir].width / 2),
			offy = 76;

		if (typeof offset !== "undefined") {
			offx = offx + offset.x;
			offy = offy - offset.y - Math.floor(monster[mForm].gfx[dist][dir].height);
		}
		var blur = 0;
		if (dist <= CHAR_DISTANCE_MID) {
			var br = Math.floor(Math.random() * 20);
			if (br === 0) {
				blur = -1;
			} else if (br === 1) {
				blur = 1;
			}
		}
		player.Portal.drawImage(monster[mForm].gfx[dist][dir], (offx + blur) * scale, offy * scale, monster[mForm].gfx[dist][dir].width * scale, monster[mForm].gfx[dist][dir].height * scale);
	}
}

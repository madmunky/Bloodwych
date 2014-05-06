/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getCharacterSprite(length, graphicsFolder, graphic, spriteWidth, spriteHeight, colSize) {


	var graphicArray = [];

	for (x = 0; x < length; x++) {

		var MID = [],
			FAR = [],
			CLOSE = [],
			DISTANT = [],
			POSITION = 0;

		if (graphic === 'minis') {
			CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, false));
			POSITION = POSITION + spriteHeight;

			CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight, false));
			CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight, true));
			POSITION = POSITION + spriteHeight;

			CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, false));
			POSITION = POSITION + spriteHeight;

			MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 4, spriteHeight - 5, false));
			POSITION = POSITION + spriteHeight - 5;

			MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 10, spriteHeight - 5, false));
			MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 10, spriteHeight - 5, true));
			POSITION = POSITION + spriteHeight - 5;

			MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 4, spriteHeight - 4, false));
			POSITION = POSITION + spriteHeight - 4;

		} else {
			switch (graphic) {
				case 'heads':

					var largeHeads = 0;

					if (x === 3 || x === 17) {
						largeHeads = 0;
					}

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth, spriteHeight, false)); //11, 13
					POSITION = POSITION + spriteHeight;

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth, spriteHeight, false));
					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth, spriteHeight, true));
					POSITION = POSITION + spriteHeight;

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth, spriteHeight, false));
					POSITION = POSITION + spriteHeight;



					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 2, spriteHeight - 3, false)); //9, 10
					POSITION = POSITION + spriteHeight - 3;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 2, spriteHeight - 3, false));
					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 2, spriteHeight - 3, true));
					POSITION = POSITION + spriteHeight - 3;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 2, spriteHeight - 3, false));
					POSITION = POSITION + spriteHeight - 3;



					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 4, spriteHeight - 5, false)); //7, 8
					POSITION = POSITION + spriteHeight - 5;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 4, spriteHeight - 5, false));
					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 4, spriteHeight - 5, true));
					POSITION = POSITION + spriteHeight - 5;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 4, spriteHeight - 5, false));
					POSITION = POSITION + spriteHeight - 5;



					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 6, spriteHeight - 6, false)); //5, 7
					POSITION = POSITION + spriteHeight - 6;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 6, spriteHeight - 6, false));
					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 6, spriteHeight - 6, true));
					POSITION = POSITION + spriteHeight - 6;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], (x * colSize), POSITION + largeHeads, spriteWidth - 6, spriteHeight - 6, false));

					break;
				case 'torsos': //female 17, 14

					if (x === 5) {

						CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 4, spriteHeight - 2, false)); //11, 12
						POSITION = POSITION + spriteHeight;

						CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 4, spriteHeight - 2, false));
						CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 4, spriteHeight - 2, true));
						POSITION = POSITION + spriteHeight;

						CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 4, spriteHeight - 2, false));
						POSITION = POSITION + spriteHeight;



						MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 5, false));
						POSITION = POSITION + spriteHeight - 2;

						MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 4, spriteHeight - 5, false));
						MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 4, spriteHeight - 5, true));
						POSITION = POSITION + spriteHeight - 2;

						MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 5, false));
						POSITION = POSITION + spriteHeight - 2;



						FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight - 7, false));
						POSITION = POSITION + spriteHeight - 4;

						FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 7, false));
						FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 7, true));
						POSITION = POSITION + spriteHeight - 4;

						FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight - 7, false));
						POSITION = POSITION + spriteHeight - 4;



						DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight - 7, false));
						POSITION = POSITION + spriteHeight - 5;

						DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 7, false));
						DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 7, true));
						POSITION = POSITION + spriteHeight - 5;

						DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight - 7, false));

					} else { //male 17, 14

						CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, false));
						POSITION = POSITION + spriteHeight;

						CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize + 1, POSITION, spriteWidth - 2, spriteHeight, false));
						CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize + 1, POSITION, spriteWidth - 2, spriteHeight, true));
						POSITION = POSITION + spriteHeight;

						CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, false));
						POSITION = POSITION + spriteHeight;



						MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 2, false));
						POSITION = POSITION + spriteHeight - 2;

						MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize + 2, POSITION, spriteWidth - 5, spriteHeight - 2, false));
						MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize + 2, POSITION, spriteWidth - 5, spriteHeight - 2, true));
						POSITION = POSITION + spriteHeight - 2;

						MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 2, false));
						POSITION = POSITION + spriteHeight - 2;



						FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 4, false));
						POSITION = POSITION + spriteHeight - 4;

						FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 4, false));
						FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 4, true));
						POSITION = POSITION + spriteHeight - 4;

						FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 4, false));
						POSITION = POSITION + spriteHeight - 4;



						DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight - 5, false));
						POSITION = POSITION + spriteHeight - 5;

						DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 5, false));
						DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 5, true));
						POSITION = POSITION + spriteHeight - 5;

						DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight - 5, false));

					}
					break;
				case 'arms': //13, 18
					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, false));
					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, true));
					POSITION = POSITION + spriteHeight;

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, false));
					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, true));
					POSITION = POSITION + spriteHeight;

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, false));
					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, true));
					POSITION = POSITION + spriteHeight;



					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 4, false));
					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 4, true));
					POSITION = POSITION + spriteHeight - 4;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 4, false));
					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 4, true));
					POSITION = POSITION + spriteHeight - 4;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 4, false));
					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 4, true));
					POSITION = POSITION + spriteHeight - 4;



					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 3, spriteHeight - 6, false));
					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 3, spriteHeight - 6, true));
					POSITION = POSITION + spriteHeight - 6;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 3, spriteHeight - 6, false));
					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 3, spriteHeight - 6, true));
					POSITION = POSITION + spriteHeight - 6;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 3, spriteHeight - 6, false));
					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 3, spriteHeight - 6, true));
					POSITION = POSITION + spriteHeight - 6;



					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 3, spriteHeight - 8, false));
					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 3, spriteHeight - 8, true));
					POSITION = POSITION + spriteHeight - 8;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 3, spriteHeight - 8, false));
					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 3, spriteHeight - 8, true));
					POSITION = POSITION + spriteHeight - 8;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], (x * colSize), POSITION, spriteWidth - 3, spriteHeight - 8, false));
					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], (x * colSize), POSITION, spriteWidth - 3, spriteHeight - 8, true));

					break;
				case 'legs': //17, 26
					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, false));
					POSITION = POSITION + spriteHeight;

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight, false));
					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight, true));
					POSITION = POSITION + spriteHeight;

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, false));
					POSITION = POSITION + spriteHeight;



					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 4, false));
					POSITION = POSITION + spriteHeight - 4;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight - 4, false));
					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight - 4, true));
					POSITION = POSITION + spriteHeight - 4;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 4, false));
					POSITION = POSITION + spriteHeight - 4;



					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 8, false));
					POSITION = POSITION + spriteHeight - 8;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 10, spriteHeight - 8, false));
					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 10, spriteHeight - 8, true));
					POSITION = POSITION + spriteHeight - 8;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 8, false));
					POSITION = POSITION + spriteHeight - 8;



					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 11, false));
					POSITION = POSITION + spriteHeight - 11;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 12, spriteHeight - 11, false));
					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 12, spriteHeight - 11, true));
					POSITION = POSITION + spriteHeight - 11;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], (x * colSize), POSITION, spriteWidth - 6, spriteHeight - 11, false));

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
			characterGfx[IMAGE_CHA_MINI] = graphicArray;
			break;
		case 'heads':
			characterGfx[IMAGE_CHA_HEAD] = graphicArray;
			break;
		case 'torsos':
			characterGfx[IMAGE_CHA_TORSO] = graphicArray;
			break;
		case 'arms':
			characterGfx[IMAGE_CHA_ARM] = graphicArray;
			break;
		case 'legs':
			characterGfx[IMAGE_CHA_LEG] = graphicArray;
			break;
	}
}

function grabCharacter(m, part, dir, dist) {
	var form = m.form;
	if (dist >= 4 && part === IMAGE_CHA_MINI) {
		if (typeof monsterPalette[form] !== "undefined") {
			var miniId = monsterPalette[form].mini;
			var tmpPalette = monsterPalette[form].miniPalette;
			var d = [0, 2, 3, 1];
			var mini = recolourSprite(characterGfx[IMAGE_CHA_MINI][miniId][dist - 4][d[dir]], MON_PALETTE_DEFAULT, tmpPalette);

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
	} else if (dist < 4 && part !== IMAGE_CHA_MINI) {
		if (typeof monsterPalette[form] !== "undefined") {
			/*var LEG;
			var ARM;
			var TORSO;
			var HEAD;*/
			var paletteType;
			var palette;
			var d = [0, 2, 3, 1];
			dir4 = dir % 4;
			switch (part) {
				case IMAGE_CHA_LEG:
					paletteType = monsterPalette[form].leg;
					palette = monsterPalette[form].legPalette;
					dir6 = dir4;
					break;
				case IMAGE_CHA_TORSO:
					paletteType = monsterPalette[form].torso;
					palette = monsterPalette[form].torsoPalette;
					dir6 = dir4;
					break;
				case IMAGE_CHA_ARM:
					paletteType = monsterPalette[form].arm;
					palette = monsterPalette[form].armPalette;
					d = [0, 2, 1, 3, 4, 5];
					dir6 = dir;
					break;
				case IMAGE_CHA_HEAD:
					paletteType = monsterPalette[form].head;
					palette = monsterPalette[form].headPalette;
					dir6 = dir4;
					break;
			}
			var head = characterGfx[IMAGE_CHA_HEAD][monsterPalette[form].head][dist][d[dir4]];
			var torso = characterGfx[IMAGE_CHA_TORSO][monsterPalette[form].torso][dist][d[dir4]];
			var arm = characterGfx[IMAGE_CHA_ARM][monsterPalette[form].arm][dist][d[dir]];
			var leg = characterGfx[IMAGE_CHA_LEG][monsterPalette[form].leg][dist][d[dir4]];
			var partSprite = recolourSprite(characterGfx[part][paletteType][dist][d[dir6]], MON_PALETTE_DEFAULT, palette);

			/*switch (dir) {

				case 0:
					HEAD = recolourSprite(characterGfx[part][palette][dist][0], MON_PALETTE_DEFAULT, monsterPalette[form].headPalette);
					TORSO = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[form].torso][dist][0], MON_PALETTE_DEFAULT, monsterPalette[form].torsoPalette);
					ARM = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[form].arm][dist][0], MON_PALETTE_DEFAULT, monsterPalette[form].armPalette);
					LEG = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[form].leg][dist][0], MON_PALETTE_DEFAULT, monsterPalette[form].legPalette);
					break;
				case 3:
					HEAD = recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[form].head][dist][1], MON_PALETTE_DEFAULT, monsterPalette[form].headPalette);
					TORSO = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[form].torso][dist][1], MON_PALETTE_DEFAULT, monsterPalette[form].torsoPalette);
					ARM = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[form].arm][dist][1], MON_PALETTE_DEFAULT, monsterPalette[form].armPalette);
					LEG = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[form].leg][dist][1], MON_PALETTE_DEFAULT, monsterPalette[form].legPalette);
					break;
				case 1:
					HEAD = recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[form].head][dist][2], MON_PALETTE_DEFAULT, monsterPalette[form].headPalette);
					TORSO = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[form].torso][dist][2], MON_PALETTE_DEFAULT, monsterPalette[form].torsoPalette);
					ARM = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[form].arm][dist][2], MON_PALETTE_DEFAULT, monsterPalette[form].armPalette);
					LEG = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[form].leg][dist][2], MON_PALETTE_DEFAULT, monsterPalette[form].legPalette);
					break;
				case 2:
					HEAD = recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[form].head][dist][3], MON_PALETTE_DEFAULT, monsterPalette[form].headPalette);
					TORSO = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[form].torso][dist][3], MON_PALETTE_DEFAULT, monsterPalette[form].torsoPalette);
					ARM = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[form].arm][dist][0], MON_PALETTE_DEFAULT, monsterPalette[form].armPalette);
					LEG = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[form].leg][dist][3], MON_PALETTE_DEFAULT, monsterPalette[form].legPalette);
					break;

			}*/

			var height = 65;//Math.round(head.height * 0.58) + torso.height + leg.height,
				width = 65;//arm.width + torso.width + arm.width;

			var can = document.createElement('canvas');
			can.width = width;
			can.height = height;
			var charContext = can.getContext("2d");
			var charImageObj = new Image();
			charImageObj.width = width;
			charImageObj.height = height;

			switch (part) {
				case IMAGE_CHA_LEG:
					var coord = {
						x: Math.round((width - leg.width) * 0.5),
						y: height - leg.height
					};
					break;
				case IMAGE_CHA_TORSO:
					var coord = {
						x: Math.round((width - torso.width) * 0.5),
						y: height - leg.height - torso.height
					};
					break;
				case IMAGE_CHA_HEAD:
					var coord = {
						x: Math.round((width - head.width) * 0.5),
						y: height - leg.height - torso.height - Math.round(head.height * 0.58)
					};
					break;
				case IMAGE_CHA_ARM:
					if (dir === 0) {
						var coord = {
							x: Math.round((width - torso.width) * 0.5) - arm.width + 5,
							y: height - leg.height - torso.height + 2
						};
					} else if (dir === 2) {
						var coord = {
							x: Math.round((width + torso.width) * 0.5) - 5,
							y: height - leg.height - torso.height + 2
						}
					} else if (dir === 1 || dir === 4) {
						var coord = {
							x: Math.round((width - torso.width) * 0.5) - arm.width + 9,
							y: height - leg.height - torso.height + 2
						};
					} else if (dir === 3 || dir === 5) {
						var coord = {
							x: Math.round((width + torso.width) * 0.5) - 9,
							y: height - leg.height - torso.height + 2
						};
					}
					break;
			}

			/*switch (dir) {

				case 0:
					charContext.drawImage(partSprite, coord.x, coord.y, partSprite.width, partSprite.height);
					charContext.drawImage(torso, torsoCoord.x, torsoCoord.y, torso.width, torso.height);
					charContext.drawImage(head, headCoord.x, headCoord.y, head.width, head.height);
					charContext.drawImage(flipImage(arm), armRightCoord.x, armRightCoord.y, arm.width, arm.height);
					charContext.drawImage(arm, armLeftCoord.x, armLeftCoord.y, arm.width, arm.height);
					break;
				case 3:
					charContext.drawImage(leg, legCoord.x, legCoord.y, leg.width, leg.height);
					charContext.drawImage(torso, torsoCoord.x, torsoCoord.y, torso.width, torso.height);
					charContext.drawImage(flipImage(arm), armSideRightCoord.x, armSideRightCoord.y, arm.width, arm.height);
					charContext.drawImage(head, headCoord.x, headCoord.y, head.width, head.height);
					break;
				case 1:
					charContext.drawImage(leg, legCoord.x, legCoord.y, leg.width, leg.height);
					charContext.drawImage(torso, torsoCoord.x, torsoCoord.y, torso.width, torso.height);
					charContext.drawImage(flipImage(arm), armSideLeftCoord.x, armSideLeftCoord.y, arm.width, arm.height);
					charContext.drawImage(head, headCoord.x, headCoord.y, head.width, head.height);
					break;
				case 2:
					charContext.drawImage(leg, legCoord.x, legCoord.y, leg.width, leg.height);
					charContext.drawImage(arm, armLeftCoord.x, armLeftCoord.y, arm.width, arm.height);
					charContext.drawImage(flipImage(arm), armRightCoord.x, armRightCoord.y, arm.width, arm.height);
					charContext.drawImage(torso, torsoCoord.x, torsoCoord.y, torso.width, torso.height);
					charContext.drawImage(head, headCoord.x, headCoord.y, head.width, head.height);
					break;
			}*/
			charContext.drawImage(partSprite, coord.x, coord.y, partSprite.width, partSprite.height);

			charContext.save();
			charImageObj.src = can.toDataURL();
			delete partSprite;
			return charImageObj;
		}
	}
	//} catch (e) {
	//	PrintLog("GrabCharacter ERROR Monster ID "+form.toString()+ ", DIR: " +dir.toString()+" , DIST: "+dist+" : " + e.toString());
	//}

}
/*
function grabMiniCharacter(form, dir, dist) {
	//	try {

	if (typeof monsterPalette[form] !== "undefined") {
		var mini = null;
		var miniId = monsterPalette[form].mini;
		var tmpPalette = monsterPalette[form].miniPalette;

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
}*/

function drawCharacter(m, dir, dist, player, offset) {
	var blur = 0;
	if (dist <= CHAR_DISTANCE_MID) {
		var br = Math.floor(Math.random() * 20);
		if (br === 0) {
			blur = -1;
		} else if (br === 1) {
			blur = 1;
		}
	}
	if (dist > -1) {
		for(part = 0; part < 5; part++) {
			if(typeof m.gfx[part] !== "undefined" && typeof m.gfx[part][dist] !== "undefined" && typeof m.gfx[part][dist][dir] !== "undefined") {
				var offx = 64 - Math.floor(m.gfx[part][dist][dir].width / 2),
					offy = 76;

				if (typeof offset !== "undefined") {
					offx = offx + offset.x;
					offy = offy - offset.y - Math.floor(m.gfx[part][dist][dir].height);
				}
				if(dist < 4 || part === IMAGE_CHA_MINI) {
					if(part === IMAGE_CHA_ARM) {
						if(dir === 0 || dir === 2) {
							player.Portal.drawImage(m.gfx[part][dist][0], (offx + blur) * scale, offy * scale, m.gfx[part][dist][0].width * scale, m.gfx[part][dist][0].height * scale);
							player.Portal.drawImage(m.gfx[part][dist][2], (offx + blur) * scale, offy * scale, m.gfx[part][dist][2].width * scale, m.gfx[part][dist][2].height * scale);
						} else {
							player.Portal.drawImage(m.gfx[part][dist][dir], (offx + blur) * scale, offy * scale, m.gfx[part][dist][dir].width * scale, m.gfx[part][dist][dir].height * scale);
						}
					} else {
						player.Portal.drawImage(m.gfx[part][dist][dir], (offx + blur) * scale, offy * scale, m.gfx[part][dist][dir].width * scale, m.gfx[part][dist][dir].height * scale);
					}
				}
			}
		}
	}
}

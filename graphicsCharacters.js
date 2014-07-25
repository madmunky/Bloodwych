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
				case 'torsos':

					if (x === 5) { //female 17, 14

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



					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 5, false));
					POSITION = POSITION + spriteHeight - 5;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight - 5, false));
					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight - 5, true));
					POSITION = POSITION + spriteHeight - 5;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 5, false));
					POSITION = POSITION + spriteHeight - 5;



					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 9, false));
					POSITION = POSITION + spriteHeight - 9;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 10, spriteHeight - 9, false));
					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 10, spriteHeight - 9, true));
					POSITION = POSITION + spriteHeight - 9;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 9, false));
					POSITION = POSITION + spriteHeight - 9;



					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 12, false));
					POSITION = POSITION + spriteHeight - 12;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 12, spriteHeight - 12, false));
					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 12, spriteHeight - 12, true));
					POSITION = POSITION + spriteHeight - 12;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], (x * colSize), POSITION, spriteWidth - 6, spriteHeight - 12, false));

					break;
				default:
					break;
			}
		}
		graphicArray.push(new Array(CLOSE, MID, FAR, DISTANT));
	}
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

function grabCharacter(form, part, dir, dist) {
	if (dist >= 4 && part === IMAGE_CHA_MINI) {
		if (typeof monsterPalette[form] !== "undefined") {
			var miniId = monsterPalette[form].mini;
			var tmpPalette = monsterPalette[form].miniPalette;
			var d = [0, 2, 3, 1];
			var mini = recolourSprite(characterGfx[IMAGE_CHA_MINI][miniId][dist - 4][d[dir]], MON_PALETTE_DEFAULT, tmpPalette);
			return mini;
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
			dir2 = dir % 2;
			switch (part) {
				case IMAGE_CHA_LEG:
					paletteType = monsterPalette[form].leg;
					palette = monsterPalette[form].legPalette;
					dir6 = dir % 4;
					break;
				case IMAGE_CHA_TORSO:
					paletteType = monsterPalette[form].torso;
					palette = monsterPalette[form].torsoPalette;
					dir6 = dir % 4;
					break;
				case IMAGE_CHA_ARM:
					paletteType = monsterPalette[form].arm;
					palette = monsterPalette[form].armPalette;
					d = [0, 2, 1, 3, 4, 5, 4, 5];
					dir6 = dir;
					break;
				case IMAGE_CHA_HEAD:
					paletteType = monsterPalette[form].head;
					palette = monsterPalette[form].headPalette;
					dir6 = dir % 4;
					break;
			}
			var head = characterGfx[IMAGE_CHA_HEAD][monsterPalette[form].head][dist][d[dir2]];
			var torso = characterGfx[IMAGE_CHA_TORSO][monsterPalette[form].torso][dist][d[dir2]];
			var arm = characterGfx[IMAGE_CHA_ARM][monsterPalette[form].arm][dist][d[dir]];
			var leg = characterGfx[IMAGE_CHA_LEG][monsterPalette[form].leg][dist][d[dir2]];
			var partSprite = recolourSprite(characterGfx[part][paletteType][dist][d[dir6]], MON_PALETTE_DEFAULT, palette);

			var height = Math.floor(head.height * 0.65) + torso.height + leg.height,
				width = 65; //arm.width + torso.width + arm.width;

			var can = document.createElement('canvas');
			can.width = width;
			can.height = height;
			var charContext = can.getContext("2d");

			switch (part) {
				case IMAGE_CHA_LEG:
					var coord = {
						x: Math.floor((width - leg.width) * 0.5),
						y: height - leg.height
					};
					break;
				case IMAGE_CHA_TORSO:
					var coord = {
						x: Math.floor((width - torso.width) * 0.5),
						y: height - leg.height - torso.height
					};
					break;
				case IMAGE_CHA_HEAD:
					var coord = {
						x: Math.floor((width - head.width) * 0.5),
						y: height - leg.height - torso.height - Math.floor(head.height * 0.65)
					};
					break;
				case IMAGE_CHA_ARM:
					if (dir === 0) {
						var coord = {
							x: Math.floor((width - torso.width) * 0.5) - arm.width + 5,
							y: height - leg.height - torso.height + 1
						};
					} else if (dir === 2) {
						var coord = {
							x: Math.floor((width + torso.width) * 0.5) - 5,
							y: height - leg.height - torso.height + 1
						}
					} else if (dir === 1) {
						var coord = {
							x: Math.floor((width - torso.width) * 0.5) - arm.width + 9,
							y: height - leg.height - torso.height + 1
						};
					} else if (dir === 3) {
						var coord = {
							x: Math.floor((width + torso.width) * 0.5) - 9,
							y: height - leg.height - torso.height + 1
						};
					} else if (dir === 4) {
						var coord = {
							x: Math.floor((width - torso.width) * 0.5) - arm.width + 5,
							y: height - leg.height - torso.height * 1.5
						};
					} else if (dir === 5) {
						var coord = {
							x: Math.floor((width + torso.width) * 0.5) - 5,
							y: height - leg.height - torso.height * 1.5
						};
					} else if (dir === 6) {
						var coord = {
							x: Math.floor((width - torso.width) * 0.5) + 1,
							y: height - leg.height - torso.height * 1.5
						};
					} else if (dir === 7) {
						var coord = {
							x: Math.floor((width + torso.width) * 0.5) - arm.width - 1,
							y: height - leg.height - torso.height * 1.5
						};
					}
					break;
			}

			charContext.drawImage(partSprite, coord.x, coord.y, partSprite.width, partSprite.height);

			charContext.save();
			delete partSprite;
			return can;
		}
	}
}

function grabCharacterArmour(id, gen, part, dir, dist) {
	if(part !== IMAGE_CHA_HEAD) {
		if (dist >= 4 && part === IMAGE_CHA_MINI) {
			/*if (typeof monsterPalette[form] !== "undefined") {
				var miniId = monsterPalette[form].mini;
				var tmpPalette = monsterPalette[form].miniPalette;
				var d = [0, 2, 3, 1];
				var mini = recolourSprite(characterGfx[IMAGE_CHA_MINI][miniId][dist - 4][d[dir]], MON_PALETTE_DEFAULT, tmpPalette);
				return mini;
			}*/
		} else if (dist < 4 && part !== IMAGE_CHA_MINI) {
				/*var LEG;
				var ARM;
				var TORSO;
				var HEAD;*/
				var paletteType;
				var palette;
				var d = [0, 2, 3, 1];
				dir2 = dir % 2;
				switch (part) {
					case IMAGE_CHA_LEG:
						dir6 = dir % 4;
						break;
					case IMAGE_CHA_TORSO:
						dir6 = dir % 4;
						break;
					case IMAGE_CHA_ARM:
						d = [0, 2, 1, 3, 4, 5, 4, 5];
						dir6 = dir;
						break;
				}
				var amr = getItemArmourType(id);
				var type = [armourData[gen + amr * 3][0], armourData[gen + amr * 3][1], null, armourData[gen + amr * 3][2]];

				var leg = characterGfx[IMAGE_CHA_LEG][type[0]][dist][d[dir2]];
				var torso = characterGfx[IMAGE_CHA_TORSO][type[1]][dist][d[dir2]];
				var arm = characterGfx[IMAGE_CHA_ARM][type[3]][dist][d[dir]];
				var partSprite = recolourSprite(characterGfx[part][type[part]][dist][d[dir6]], MON_PALETTE_DEFAULT, CHA_ARMOUR[ITEM_LEATHER_ARMOUR]); // CHA_ARMOUR[ITEM_LEATHER_ARMOUR] needs to be changed to correct palette

				var height = torso.height + leg.height,
					width = 65; //arm.width + torso.width + arm.width;

				var can = document.createElement('canvas');
				can.width = width;
				can.height = height;
				var charContext = can.getContext("2d");

				switch (part) {
					case IMAGE_CHA_LEG:
						var coord = {
							x: Math.floor((width - leg.width) * 0.5),
							y: height - leg.height
						};
						break;
					case IMAGE_CHA_TORSO:
						var coord = {
							x: Math.floor((width - torso.width) * 0.5),
							y: height - leg.height - torso.height
						};
						break;
					case IMAGE_CHA_ARM:
						if (dir === 0) {
							var coord = {
								x: Math.floor((width - torso.width) * 0.5) - arm.width + 5,
								y: height - leg.height - torso.height + 1
							};
						} else if (dir === 2) {
							var coord = {
								x: Math.floor((width + torso.width) * 0.5) - 5,
								y: height - leg.height - torso.height + 1
							}
						} else if (dir === 1) {
							var coord = {
								x: Math.floor((width - torso.width) * 0.5) - arm.width + 9,
								y: height - leg.height - torso.height + 1
							};
						} else if (dir === 3) {
							var coord = {
								x: Math.floor((width + torso.width) * 0.5) - 9,
								y: height - leg.height - torso.height + 1
							};
						} else if (dir === 4) {
							var coord = {
								x: Math.floor((width - torso.width) * 0.5) - arm.width + 5,
								y: height - leg.height - torso.height * 1.5
							};
						} else if (dir === 5) {
							var coord = {
								x: Math.floor((width + torso.width) * 0.5) - 5,
								y: height - leg.height - torso.height * 1.5
							};
						} else if (dir === 6) {
							var coord = {
								x: Math.floor((width - torso.width) * 0.5) + 1,
								y: height - leg.height - torso.height * 1.5
							};
						} else if (dir === 7) {
							var coord = {
								x: Math.floor((width + torso.width) * 0.5) - arm.width - 1,
								y: height - leg.height - torso.height * 1.5
							};
						}
						break;
				}

				charContext.drawImage(partSprite, coord.x, coord.y, partSprite.width, partSprite.height);

				charContext.save();
				delete partSprite;
				return can;
		}
	}
}

function clipCharacter(img, percentClipped) {

	var can = document.createElement('canvas');
	can.width = img.width;
	can.height = img.height - percentClipped;
	var charContext = can.getContext("2d");

	charContext.drawImage(img, 0, 0);
	charContext.save();

	return can;

}

function drawCharacter(m, dir, dist, player, offset, returnImg, doBlur, doClip, pixToClip) {

	var can,
		charContext;

	if (returnImg) {
		var can = document.createElement('canvas');
		can.width = canvas.width;
		can.height = canvas.height;
		var charContext = can.getContext("2d");
		//        charContext.imageSmoothingEnabled = false;
		//        charContext.webkitImageSmoothingEnabled = false;
		//        charContext.mozImageSmoothingEnabled = false;
		//        charContext.oImageSmoothingEnabled = false;
	}

	if (typeof returnImg === "undefined") {
		returnImg = false;
	}

	if (typeof doClip === "undefined") {
		doClip = false;
	}

	if (dist > -1) {
		for (part = 0; part < 5; part++) {
			if (typeof m.ref.gfx[part] !== "undefined" && typeof m.ref.gfx[part][dist] !== "undefined" && typeof m.ref.gfx[part][dist][dir] !== "undefined") {
				if (typeof doBlur === 'undefined') {
					doBlur = true;
				}
				var dir1 = dir;
				var dir2 = -1;
				if (part === IMAGE_CHA_ARM) { //attack arms
					var mas = Math.floor((timerMaster - m.gestureTimer) / m.getSpeed(3));
					if (dir === 0) {
						dir1 = 0;
						dir2 = 2;
						if (doBlur) {
							if (m.gesture === CHA_GESTURE_ATTACKING) {
								if (mas === 0 || mas === 1 || mas === 3) {
									dir2 = 5;
								}
								if (mas === 1 || mas === 2 || mas === 3) {
									dir1 = 4;
								}
							} else if (m.gesture === CHA_GESTURE_SPELLCASTING) {
								if (mas === 0 || mas === 1 || mas === 2) {
									dir1 = 4;
									dir2 = 5;
								}
							}
						}
					} else if (dir === 2) {
						dir1 = 2;
						dir2 = 0;
						if (doBlur) {
							if (m.gesture === CHA_GESTURE_ATTACKING) {
								if (mas === 0 || mas === 1 || mas === 3) {
									dir2 = 4;
								}
								if (mas === 1 || mas === 2 || mas === 3) {
									dir1 = 5;
								}
							} else if (m.gesture === CHA_GESTURE_SPELLCASTING) {
								if (mas === 0 || mas === 1 || mas === 2) {
									dir1 = 5;
									dir2 = 4;
								}
							}
						}
					} else if (doBlur) {
						if (dir === 1) {
							if (m.gesture === CHA_GESTURE_ATTACKING) {
								if (mas === 1 || mas === 2 || mas === 3) {
									dir1 = 7;
								}
							} else if (m.gesture === CHA_GESTURE_SPELLCASTING) {
								if (mas === 0 || mas === 1 || mas === 2) {
									dir1 = 7;
								}
							}
						} else if (dir === 3) {
							if (m.gesture === CHA_GESTURE_ATTACKING) {
								if (mas === 0 || mas === 1 || mas === 3) {
									dir1 = 6;
								}
							} else if (m.gesture === CHA_GESTURE_SPELLCASTING) {
								if (mas === 0 || mas === 1 || mas === 2) {
									dir1 = 6;
								}
							}
						}
					}
				}
				var gfx1 = m.ref.gfx[part][dist][dir1];
				var gfx2 = m.ref.gfx[part][dist][dir2];
				if (m.form === 26 && m.glow === 0) {
					gfx1 = monsterRef[27][0].gfx[part][dist][dir1];
					gfx2 = monsterRef[27][0].gfx[part][dist][dir2];
				} else if (m.champId > -1) {
					var ch = m.getChampion();
					var amr = ch.pocket[POCKET_ARMOUR];
					var gen = ch.getGender();
					if(amr.id >= ITEM_LEATHER_ARMOUR && amr.id <= ITEM_CRYSTAL_PLATE && typeof armourRef[amr.id - ITEM_LEATHER_ARMOUR][gen] !== 'undefined') {

						if(part === IMAGE_CHA_TORSO) {
							var gfx1 = armourRef[amr.id - ITEM_LEATHER_ARMOUR][gen].gfx[IMAGE_CHA_TORSO][dist][dir1];
							var gfx2 = armourRef[amr.id - ITEM_LEATHER_ARMOUR][gen].gfx[IMAGE_CHA_TORSO][dist][dir2];
						} else if(part === IMAGE_CHA_ARM) {
							var gfx1 = armourRef[amr.id - ITEM_LEATHER_ARMOUR][gen].gfx[IMAGE_CHA_ARM][dist][dir1];
							var gfx2 = armourRef[amr.id - ITEM_LEATHER_ARMOUR][gen].gfx[IMAGE_CHA_ARM][dist][dir2];
						} else if(part === IMAGE_CHA_LEG) {
							var gfx1 = armourRef[amr.id - ITEM_LEATHER_ARMOUR][gen].gfx[IMAGE_CHA_LEG][dist][dir1];
							var gfx2 = armourRef[amr.id - ITEM_LEATHER_ARMOUR][gen].gfx[IMAGE_CHA_LEG][dist][dir2];
						}
					}
				}
				var offx = 64 - Math.floor(gfx1.width * 0.5) + offset.x;
				var offy = 76 - Math.floor(gfx1.height) - offset.y;

				if (dist >= 4 || part !== IMAGE_CHA_MINI) {
					var blur = 0;
					if (doBlur && dist <= DISTANCE_MID) {
						blur = m.blur;
					}
					if (!returnImg) {
						if ((doClip && part === IMAGE_CHA_LEG) || (doClip && part === IMAGE_CHA_MINI)) {
							var t = clipCharacter(gfx1, pixToClip);
							player.Portal.drawImage(t, (offx + blur) * scale, offy * scale, t.width * scale, t.height * scale);
						} else {
							player.Portal.drawImage(gfx1, (offx + blur) * scale, offy * scale, gfx1.width * scale, gfx1.height * scale);
						}
					} else {
						charContext.drawImage(gfx1, (offx + blur), offy, gfx1.width, gfx1.height);
					}
					if (dir2 > -1) {
						offx = 64 - Math.floor(gfx2.width * 0.5) + offset.x;
						offy = 76 - Math.floor(gfx2.height) - offset.y;
						if (!returnImg) {
							if (doClip && part === IMAGE_CHA_LEG) {
								var t = clipCharacter(gfx2, pixToClip);
								player.Portal.drawImage(t, (offx + blur) * scale, offy * scale, t.width * scale, t.height * scale);
							} else {
								player.Portal.drawImage(gfx2, (offx + blur) * scale, offy * scale, gfx2.width * scale, gfx2.height * scale);
							}
						} else {
							charContext.drawImage(gfx2, (offx + blur), offy, gfx2.width, gfx2.height);
						}
					}
				}
			}
		}
		if (returnImg) {
			charContext.save();
			return can;
		}
	}
}

function drawMonster(m, dir, dist, player, offset) {
	//m.attacking = true;
	if (dist > -1) {
		for (part1 = 0; part1 < 3; part1++) {
			try {
				var part = part1;
				var armoffx = 0;
				var armoffy = 0;
				if (dir === 2) { // reverse drawing for back view
					part = 2 - part1;
					if (m.ref.id >= MON_FORM_CRAB && m.ref.id < MON_FORM_BEHEMOTH && part === IMAGE_MON_ARM) {
						armoffx = Math.ceil((dist + 8.0) / 3.0);
						armoffy = Math.ceil(7.0 / (dist + 1.0));
					}
				}
				if (typeof m.ref.gfx[part] !== "undefined" && typeof m.ref.gfx[part][dist] !== "undefined" && typeof m.ref.gfx[part][dist][dir] !== "undefined") {
					var dir1 = dir;
					var dir2 = -1;

					if (part === IMAGE_MON_ARM) {
						var mas = Math.floor((timerMaster - m.gestureTimer) / m.getSpeed(3));
						if (dir === 0) {
							dir1 = 0;
							dir2 = 2;
							// dir1 = 4;
							// dir2 = 5;
							if (m.gesture === CHA_GESTURE_ATTACKING) {
								if (mas === 0 || mas === 1 || mas === 3) {
									dir2 = 5;
								}
								if (mas === 1 || mas === 2 || mas === 3) {
									dir1 = 4;
								}
							} else if (m.gesture === CHA_GESTURE_SPELLCASTING) {
								if (mas === 0 || mas === 1 || mas === 2) {
									dir1 = 4;
									dir2 = 5;
								}
							}
						} else if (dir === 2) {
							dir1 = 2;
							dir2 = 0;
							//dir1 = 4;
							//dir2 = 5;
							if (m.gesture === CHA_GESTURE_ATTACKING) {
								if (mas === 0 || mas === 1 || mas === 3) {
									dir2 = 4;
								}
								if (mas === 1 || mas === 2 || mas === 3) {
									dir1 = 5;
								}
							}
							if (m.gesture === CHA_GESTURE_SPELLCASTING) {
								if (mas === 0 || mas === 1 || mas === 2) {
									dir1 = 5;
									dir2 = 4;
								}
							}
						} else if (dir === 1) {
							if (m.gesture === CHA_GESTURE_ATTACKING) {
								if (mas === 1 || mas === 2 || mas === 3) {
									dir1 = 7;
								}
							}
							if (m.gesture === CHA_GESTURE_SPELLCASTING) {
								if (mas === 0 || mas === 1 || mas === 2) {
									dir1 = 7;
								}
							}
						} else if (dir === 3) {
							if (m.gesture === CHA_GESTURE_ATTACKING) {
								if (mas === 0 || mas === 1 || mas === 3) {
									dir1 = 6;
								}
							}
							if (m.gesture === CHA_GESTURE_SPELLCASTING) {
								if (mas === 0 || mas === 1 || mas === 2) {
									dir1 = 6;
								}
							}
						}
					}
					var gfx1 = m.ref.gfx[part][dist][dir1];
					var gfx2 = m.ref.gfx[part][dist][dir2];
					var offx = 64 - Math.floor(gfx1.width * 0.5) + offset.x;
					var offy = 76 - Math.floor(gfx1.height) - offset.y;

					if (dist >= 4 || part !== IMAGE_MON_MINI) {
						var blur = 0;
						if (dist <= DISTANCE_MID) {
							blur = m.blur;
						}
						player.Portal.drawImage(gfx1, (offx - armoffx + blur) * scale, (offy - armoffy) * scale, gfx1.width * scale, gfx1.height * scale);
						if (dir2 > -1) {
							offx = 64 - Math.floor(gfx2.width * 0.5) + offset.x;
							offy = 76 - Math.floor(gfx2.height) - offset.y;
							player.Portal.drawImage(gfx2, (offx + armoffx + blur) * scale, (offy - armoffy) * scale, gfx2.width * scale, gfx2.height * scale);
						}
					}
				}
			} catch (e) {
				PrintLog("JORG - DRAW MONSTER ISSUE! - PT" + part + ' DS' + dist + ' DR' + dir + ' - ' + e.toString());
			}
		}
	}
}

function grabMonster(form, level) {
	switch (form) {
		case MON_FORM_ILLUSION:
		case MON_FORM_SUMMON:
			{ //SUMMON
				var spriteSheetIMG = gfx['character']['summon'];
				var ImageArray = [],
					BODYPART = [],
					DISTANCE_1 = [],
					DISTANCE_2 = [],
					DISTANCE_3 = [],
					DISTANCE_4 = [],
					DISTANCE_5 = [],
					DISTANCE_6 = [];

				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 0, 0, 19, 48, false)); //Front body - distance 1
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 21, 0, 14, 48, true)); //Right body - distance 1
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 39, 0, 19, 48, false)); //Back body - distance 1
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 21, 0, 14, 48, false)); //Left body - distance 1

				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 0, 48, 15, 39, false)); //Front body - distance 2
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 16, 48, 11, 39, true)); //Right body - distance 2
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 30, 48, 15, 39, false)); //Back body - distance 2
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 16, 48, 11, 39, false)); //Left body - distance 2

				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 0, 88, 11, 32, false)); //Front body - distance 3
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 12, 88, 9, 32, true)); //Right body - distance 3
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 22, 88, 11, 32, false)); //Back body - distance 3
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 12, 88, 9, 32, false)); //Left body - distance 3

				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 0, 121, 9, 27, false)); //Front body - distance 4
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 10, 121, 7, 27, true)); //Right body - distance 4  
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 18, 121, 9, 27, false)); //Back body - distance 4
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 10, 121, 7, 27, false)); //Left body - distance 4

				BODYPART.push(DISTANCE_1, DISTANCE_2, DISTANCE_3, DISTANCE_4);
				ImageArray.push(BODYPART);

				var DISTANCE_1 = [],
					DISTANCE_2 = [],
					DISTANCE_3 = [],
					DISTANCE_4 = [],
					DISTANCE_5 = [],
					DISTANCE_6 = [],
					BODYPART = [];

				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 69, 0, 7, 21, false, 24, 20)); //Left arm - distance 1
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 79, 0, 11, 21, false, 7, 20)); //Side right arm - distance 1
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 69, 0, 7, 21, true, 24, 20)); //Right arm - distance 1
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 79, 0, 11, 21, true, 7, 20)); //Side left arm - distance 1
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 92, 0, 12, 17, false, 29, 35)); //Left attack arm - distance 1
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 92, 0, 12, 17, true, 29, 35)); //Right attack arm - distance 1
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 92, 0, 12, 17, false, 7, 35)); //Side right attack arm - distance 1
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 92, 0, 12, 17, true, 7, 35)); //Side left attack arm - distance 1

				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 71, 22, 5, 17, false, 18, 16)); //Left arm - distance 2
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 79, 25, 9, 17, false, 6, 16)); //Side right arm - distance 2
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 71, 22, 5, 17, true, 18, 16)); //Right arm - distance 2
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 79, 25, 9, 17, true, 6, 16)); //Side left arm - distance 2
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 96, 25, 8, 12, false, 21, 29)); //Left attack arm - distance 2
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 96, 25, 8, 12, true, 21, 29)); //Right attack arm - distance 2
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 96, 25, 8, 12, false, 6, 29)); //Side right attack arm - distance 2
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 96, 25, 8, 12, true, 6, 29)); //Side left attack arm - distance 2

				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 69, 49, 4, 13, false, 15, 14)); //Left arm - distance 3
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 80, 49, 7, 13, false, 6, 14)); //Side right arm - distance 3
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 69, 49, 4, 13, true, 15, 14)); //Right arm - distance 3
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 80, 49, 7, 13, true, 6, 14)); //Side left arm - distance 3
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 97, 49, 7, 11, false, 18, 23)); //Left attack arm - distance 3
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 97, 49, 7, 11, true, 18, 23)); //Right attack arm - distance 3
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 97, 49, 7, 11, false, 6, 23)); //Side right attack arm - distance 3
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 97, 49, 7, 11, true, 6, 23)); //Side left attack arm - distance 3

				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 70, 68, 3, 12, false, 12, 11)); //Left arm - distance 4
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 81, 68, 6, 12, false, 5, 11)); //Side right arm - distance 4
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 70, 68, 3, 12, true, 12, 11)); //Right arm - distance 4
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 81, 68, 6, 12, true, 5, 11)); //Side left arm - distance 4
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 98, 68, 6, 9, false, 15, 20)); //Left attack arm - distance 4
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 98, 68, 6, 9, true, 15, 20)); //Right attack arm - distance 4
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 98, 68, 6, 9, false, 5, 20)); //Side right attack arm - distance 4
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 98, 68, 6, 9, true, 5, 20)); //Side left attack arm - distance 4

				BODYPART.push(DISTANCE_1, DISTANCE_2, DISTANCE_3, DISTANCE_4);
				ImageArray.push(BODYPART);

				var DISTANCE_1 = [],
					DISTANCE_2 = [],
					DISTANCE_3 = [],
					DISTANCE_4 = [],
					DISTANCE_5 = [],
					DISTANCE_6 = [],
					BODYPART = [];

				DISTANCE_5.push(grabImageAt(spriteSheetIMG, 0, 149, 13, 22, false)); //Front mini - distance 5
				DISTANCE_5.push(grabImageAt(spriteSheetIMG, 16, 149, 8, 22, true)); //Right mini - distance 5
				DISTANCE_5.push(grabImageAt(spriteSheetIMG, 26, 149, 13, 22, false)); //Back mini - distance 5
				DISTANCE_5.push(grabImageAt(spriteSheetIMG, 16, 149, 8, 22, false)); //Left mini - distance 5

				DISTANCE_6.push(grabImageAt(spriteSheetIMG, 0, 172, 11, 17, false)); //Front mini - distance 6
				DISTANCE_6.push(grabImageAt(spriteSheetIMG, 14, 172, 6, 17, true)); //Right mini - distance 6
				DISTANCE_6.push(grabImageAt(spriteSheetIMG, 22, 172, 11, 17, false)); //Back mini - distance 6
				DISTANCE_6.push(grabImageAt(spriteSheetIMG, 14, 172, 6, 17, false)); //Left mini - distance 6

				BODYPART.push(DISTANCE_1, DISTANCE_2, DISTANCE_3, DISTANCE_4, DISTANCE_5, DISTANCE_6);
				ImageArray.push(BODYPART);

				break;

			}
		case MON_FORM_BEHOLDER:
			{ //FLOATER
				var spriteSheetIMG = gfx['character']['floater'];
				var ImageArray = [],
					BODYPART = [],
					DISTANCE_1 = [],
					DISTANCE_2 = [],
					DISTANCE_3 = [],
					DISTANCE_4 = [],
					DISTANCE_5 = [],
					DISTANCE_6 = [];


				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 0, 0, 24, 21, false, 0, 21));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 25, 0, 24, 21, true, 0, 21));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 50, 0, 24, 21, false, 0, 21));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 25, 0, 24, 21, false, 0, 21));

				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 0, 22, 20, 17, false, 0, 12));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 25, 22, 20, 17, true, 0, 12));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 50, 22, 20, 17, false, 0, 12));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 25, 22, 20, 17, false, 0, 12));

				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 0, 40, 15, 14, false, 0, 9));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 25, 40, 15, 14, true, 0, 9));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 50, 40, 15, 14, false, 0, 9));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 25, 40, 15, 14, false, 0, 9));

				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 0, 55, 13, 11, false, 0, 6));
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 25, 55, 13, 11, true, 0, 6));
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 50, 55, 13, 11, false, 0, 6));
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 25, 55, 13, 11, false, 0, 6));


				BODYPART.push(DISTANCE_1, DISTANCE_2, DISTANCE_3, DISTANCE_4);
				ImageArray.push(BODYPART);

				var BODYPART = [],
					DISTANCE_1 = [],
					DISTANCE_2 = [],
					DISTANCE_3 = [],
					DISTANCE_4 = [];

				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 0, 0, 1, 1, true, 0, 27));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 76, 3, 22, 7, true, 0, 42));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 76, 3, 22, 7, true, 0, 42));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 76, 3, 22, 7, true, 0, 42));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 76, 29, 24, 9, false, 0, 27));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 76, 3, 22, 7, true, 0, 40));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 105, 29, 11, 9, true, 0, 40));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 105, 29, 11, 9, false, 0, 40));

				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 78, 40, 20, 7, false));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 106, 40, 9, 7, true));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 106, 40, 9, 7, false));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 78, 40, 20, 7, false));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 78, 12, 18, 5, false, 0, 29));

				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 81, 48, 15, 7, false));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 107, 50, 7, 5, true));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 107, 50, 7, 5, false));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 81, 48, 15, 7, false));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 82, 18, 13, 4, false, 0, 23));

				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 82, 86, 13, 5, false));
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 107, 56, 6, 5, true));
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 107, 56, 6, 5, false));
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 82, 86, 13, 5, false));
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 82, 23, 11, 4, false, 0, 17));

				BODYPART.push(DISTANCE_1, DISTANCE_2, DISTANCE_3, DISTANCE_4);
				ImageArray.push(BODYPART);

				var BODYPART = [],
					DISTANCE_1 = [],
					DISTANCE_2 = [],
					DISTANCE_3 = [],
					DISTANCE_4 = [],
					DISTANCE_5 = [],
					DISTANCE_6 = [];


				DISTANCE_5.push(grabImageAt(spriteSheetIMG, 0, 67, 9, 12, false, 0, 9));
				DISTANCE_5.push(grabImageAt(spriteSheetIMG, 25, 67, 9, 12, true, 0, 9));
				DISTANCE_5.push(grabImageAt(spriteSheetIMG, 50, 67, 9, 12, false, 0, 9));
				DISTANCE_5.push(grabImageAt(spriteSheetIMG, 25, 67, 9, 12, false, 0, 9));

				DISTANCE_6.push(grabImageAt(spriteSheetIMG, 0, 80, 7, 9, false, 0, 7));
				DISTANCE_6.push(grabImageAt(spriteSheetIMG, 25, 80, 7, 9, true, 0, 7));
				DISTANCE_6.push(grabImageAt(spriteSheetIMG, 50, 80, 7, 9, false, 0, 7));
				DISTANCE_6.push(grabImageAt(spriteSheetIMG, 25, 80, 7, 9, false, 0, 7));

				BODYPART.push(DISTANCE_1, DISTANCE_2, DISTANCE_3, DISTANCE_4, DISTANCE_5, DISTANCE_6);
				ImageArray.push(BODYPART);

				break;

			}
		case MON_FORM_ENTITY:
			{ //NASTY FLOATER
				var spriteSheetIMG = gfx['character']['nastyfloater'];
				var ImageArray = [],
					BODYPART = [],
					DISTANCE_1 = [],
					DISTANCE_2 = [],
					DISTANCE_3 = [],
					DISTANCE_4 = [],
					DISTANCE_5 = [],
					DISTANCE_6 = [];

				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 0, 0, 48, 44, false, 0, 6));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 99, 0, 48, 44, true, 0, 6));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 50, 0, 48, 44, true, 0, 6));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 99, 0, 48, 44, false, 0, 6));

				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 8, 50, 32, 31, false, 0, 2));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 108, 50, 32, 30, true, 0, 2));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 58, 50, 32, 31, true, 0, 2));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 108, 50, 32, 30, false, 0, 2));

				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 8, 91, 32, 21, false, 0, 3));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 113, 91, 23, 20, true, 0, 3));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 58, 91, 32, 21, true, 0, 3));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 113, 91, 23, 20, false, 0, 3));

				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 10, 117, 28, 17, false, 0, 2));
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 117, 117, 16, 16, true, 0, 2));
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 60, 117, 28, 17, true, 0, 2));
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 117, 117, 16, 16, false, 0, 2));

				BODYPART.push(DISTANCE_1, DISTANCE_2, DISTANCE_3, DISTANCE_4);
				ImageArray.push(BODYPART);

				var BODYPART = [],
					DISTANCE_1 = [],
					DISTANCE_2 = [],
					DISTANCE_3 = [],
					DISTANCE_4 = [];

				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 159, 10, 16, 21, false, 56, 20)); //Front Left Arm
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 159, 10, 16, 21, false, 16, 18));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 159, 10, 16, 21, true, 55, 20)); //Front Flipped Arm
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 159, 10, 16, 21, true, 16, 18));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 184, 10, 16, 21, false, 55, 36));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 184, 10, 16, 21, true, 55, 36));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 184, 10, 16, 21, false, 55, 36));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 184, 10, 16, 21, true, 55, 36));

				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 159, 62, 10, 14, false, 39, 12));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 159, 62, 10, 14, false, 10, 10));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 159, 62, 10, 14, true, 38, 12));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 159, 62, 10, 14, true, 10, 10));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 184, 62, 10, 14, false));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 184, 62, 10, 14, true));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 184, 62, 10, 14, false));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 184, 62, 10, 14, true));

				BODYPART.push(DISTANCE_1, DISTANCE_2);
				ImageArray.push(BODYPART);
				var BODYPART = [],
					DISTANCE_1 = [],
					DISTANCE_2 = [],
					DISTANCE_3 = [],
					DISTANCE_4 = [];

				break;

			}
		case MON_FORM_CRAB:
			{ //CRAB
				var spriteSheetIMG = gfx['character']['crab'];
				var ImageArray = [],
					BODYPART = [],
					DISTANCE_1 = [],
					DISTANCE_2 = [],
					DISTANCE_3 = [],
					DISTANCE_4 = [];

				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 0, 0, 56, 30, false));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 57, 0, 56, 30, false));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 114, 0, 56, 30, false));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 57, 0, 56, 30, true));

				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 8, 31, 38, 19, false));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 65, 31, 41, 19, false));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 122, 31, 38, 19, false));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 65, 31, 41, 19, true));

				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 13, 51, 28, 14, false));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 70, 51, 30, 13, false));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 127, 51, 28, 13, false));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 70, 51, 30, 13, true));

				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 16, 66, 22, 11, false));
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 73, 66, 24, 10, false));
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 130, 66, 22, 10, false));
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 73, 66, 24, 10, true));

				BODYPART.push(DISTANCE_1, DISTANCE_2, DISTANCE_3, DISTANCE_4);
				ImageArray.push(BODYPART);

				var BODYPART = [],
					DISTANCE_1 = [],
					DISTANCE_2 = [],
					DISTANCE_3 = [],
					DISTANCE_4 = [];

				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 180, 1, 16, 21, false, 32, 0));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 252, 7, 15, 9, false, 20, 0));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 180, 1, 16, 21, true, 32, 0));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 252, 7, 15, 9, false, 20, 0));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 229, 0, 16, 21, false, 32, 14));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 229, 0, 16, 21, true, 32, 14));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 206, 2, 14, 19, false, 20, 0));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 206, 2, 14, 19, false, 20, 0));

				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 183, 31, 10, 14, false, 20, 0));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 205, 25, 16, 24, false));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 183, 31, 10, 14, true, 19, 0));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 205, 25, 16, 24, true));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 232, 30, 10, 14, false, 20, 8));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 232, 30, 10, 14, true, 20, 8));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 255, 34, 9, 8, false, 20, 15));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 255, 34, 9, 8, true, 20, 15));



				BODYPART.push(DISTANCE_1, DISTANCE_2);
				ImageArray.push(BODYPART);

				break;

			}
		case MON_FORM_DRAGON:
		case MON_FORM_DRAGON_SMALL:
			{ //DRAGON
				var spriteSheetIMG = gfx['character']['dragon'];
				var ImageArray = [],
					BODYPART = [],
					DISTANCE_1 = [],
					DISTANCE_2 = [],
					DISTANCE_3 = [],
					DISTANCE_4 = [],
					DISTANCE_5 = [];

				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 0, 2, 63, 50, false, 0, 5));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 128, 1, 74, 55, true, 0, 0));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 64, 1, 63, 55, false, 0, 0));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 128, 1, 74, 55, false, 0, 0));

				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 9, 58, 45, 37, false, 0, 2));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 138, 57, 54, 39, true, 0, 0));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 73, 58, 45, 39, true, 0, 0));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 138, 57, 54, 39, false, 0, 0));

				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 16, 100, 31, 28, false));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 144, 100, 40, 28, false));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 80, 100, 31, 28, true));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 144, 100, 40, 28, false));

				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 20, 134, 23, 21, false));
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 151, 134, 29, 21, false));
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 84, 134, 23, 20, false));
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 151, 134, 29, 21, false));

				DISTANCE_5.push(grabImageAt(spriteSheetIMG, 22, 160, 19, 16, false));
				DISTANCE_5.push(grabImageAt(spriteSheetIMG, 154, 159, 24, 16, false));
				DISTANCE_5.push(grabImageAt(spriteSheetIMG, 86, 159, 19, 17, false));
				DISTANCE_5.push(grabImageAt(spriteSheetIMG, 154, 159, 24, 16, false));

				BODYPART.push(DISTANCE_1, DISTANCE_2, DISTANCE_3, DISTANCE_4, DISTANCE_5);
				ImageArray.push(BODYPART);

				var BODYPART = [],
					DISTANCE_1 = [],
					DISTANCE_2 = [],
					DISTANCE_3 = [],
					DISTANCE_4 = [],
					DISTANCE_5 = [];

				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 206, 33, 14, 21, false, 38, 0));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 223, 34, 25, 20, true, 29, 0));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 206, 33, 14, 21, true, 40, 0));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 223, 34, 25, 20, false, 29, 0));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 251, 31, 15, 23, false, 38, 13));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 251, 31, 15, 23, true, 38, 13));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 269, 32, 23, 22, false, 23, 10));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 269, 32, 23, 22, true, 23, 10));

				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 208, 81, 10, 16, false, 23, 0));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 225, 83, 18, 14, true, 18, 0));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 208, 81, 10, 16, true, 23, 0));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 225, 83, 18, 14, false, 18, 0));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 253, 81, 10, 16, false, 21, 10));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 253, 81, 10, 16, true, 21, 10));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 276, 82, 16, 15, false, 16, 8));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 276, 82, 16, 15, true, 16, 8));

				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 208, 117, 8, 11, false, 20, 0));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 228, 117, 14, 11, true, 20, 0));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 208, 117, 8, 11, true, 20, 0));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 228, 117, 14, 11, false, 10, 0));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 254, 118, 8, 10, false, 20, 5));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 254, 118, 8, 10, true, 20, 5));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 280, 117, 12, 11, false, 10, 5));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 280, 117, 12, 11, true, 10, 5));

				BODYPART.push(DISTANCE_1, DISTANCE_2, DISTANCE_3);
				ImageArray.push(BODYPART);

				var BODYPART = [],
					DISTANCE_1 = [],
					DISTANCE_2 = [],
					DISTANCE_3 = [],
					DISTANCE_4 = [],
					DISTANCE_5 = [];

				DISTANCE_5.push(grabImageAt(spriteSheetIMG, 22, 160, 19, 16, false));
				DISTANCE_5.push(grabImageAt(spriteSheetIMG, 86, 159, 19, 17, true));
				DISTANCE_5.push(grabImageAt(spriteSheetIMG, 154, 159, 24, 16, false));
				DISTANCE_5.push(grabImageAt(spriteSheetIMG, 86, 159, 19, 17, false));

				BODYPART.push(DISTANCE_1, DISTANCE_2, DISTANCE_3, DISTANCE_4, DISTANCE_5);
				ImageArray.push(BODYPART);

				break;

			}
		case MON_FORM_BEHEMOTH:
			{ //BEHEMOTH
				var spriteSheetIMG = gfx['character']['behemoth'];
				var ImageArray = [],
					BODYPART = [],
					DISTANCE_1 = [],
					DISTANCE_2 = [],
					DISTANCE_3 = [],
					DISTANCE_4 = [],
					DISTANCE_5 = [],
					DISTANCE_6 = [];
				//BODY
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 72, 1, 29, 51, false));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 30, 1, 40, 51, true));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 0, 2, 29, 51, false));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 30, 1, 40, 51, false));

				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 77, 63, 19, 36, false));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 35, 63, 28, 36, true));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 5, 63, 19, 36, false));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 35, 63, 28, 36, false));

				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 5, 106, 23, 27, false));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 39, 105, 20, 27, true));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 76, 106, 23, 27, false));
				DISTANCE_3.push(grabImageAt(spriteSheetIMG, 39, 105, 20, 27, false));

				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 7, 136, 19, 21, false));
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 43, 136, 15, 21, true));
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 78, 136, 19, 21, false));
				DISTANCE_4.push(grabImageAt(spriteSheetIMG, 43, 136, 15, 21, false));

				BODYPART.push(DISTANCE_1, DISTANCE_2, DISTANCE_3, DISTANCE_4);
				ImageArray.push(BODYPART);

				var DISTANCE_1 = [],
					DISTANCE_2 = [],
					DISTANCE_3 = [],
					DISTANCE_4 = [],
					DISTANCE_5 = [],
					DISTANCE_6 = [],
					BODYPART = [];


				//ARMS
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 110, 2, 14, 26, false, 35, 15));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 110, 2, 14, 26, false, 4, 15));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 110, 2, 14, 26, true, 35, 15));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 110, 2, 14, 26, true, 4, 15));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 128, 2, 16, 21, false, 35, 31));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 128, 2, 16, 21, true, 35, 31));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 128, 2, 16, 21, false, 19, 32));
				DISTANCE_1.push(grabImageAt(spriteSheetIMG, 128, 2, 16, 21, true, 18, 32));

				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 112, 64, 10, 18, false, 23, 10));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 112, 64, 10, 18, false, 4, 10));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 112, 64, 10, 18, true, 24, 10));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 112, 64, 10, 18, true, 4, 10));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 131, 64, 11, 15, false, 24, 22));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 131, 64, 11, 15, true, 24, 22));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 131, 64, 11, 15, false, 10, 24));
				DISTANCE_2.push(grabImageAt(spriteSheetIMG, 131, 64, 11, 15, true, 10, 24));

				BODYPART.push(DISTANCE_1, DISTANCE_2);
				ImageArray.push(BODYPART);
				break;

			}
		default:
			return null;
	}
	for (var i = 0; i < ImageArray.length; i++) {
		for (var j = 0; j < ImageArray[i].length; j++) {
			for (var k = 0; k < ImageArray[i][j].length; k++) {
				if (form < MON_FORM_BEHEMOTH) {
					if (form === MON_FORM_ILLUSION) {
						var pal = 0;
						var lvl = 8;
					} else {
						var pal = form - MON_FORM_SUMMON;
						var lvl = level;
					}
					ImageArray[i][j][k] = recolourSprite(ImageArray[i][j][k], MON_PALETTE_DEFAULT, monsterBigPalette[pal][lvl]);
				}
			}
		}
	}

	return ImageArray;
}

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

		if (graphic === "people") {
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
					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, false));
					POSITION = POSITION + spriteHeight;

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, false));
					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, true));
					POSITION = POSITION + spriteHeight;

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, false));
					POSITION = POSITION + spriteHeight + 2;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 3, spriteHeight - 3, false));
					POSITION = POSITION + spriteHeight - 2;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 3, spriteHeight - 3, false));
					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 3, spriteHeight - 3, true));
					POSITION = POSITION + spriteHeight - 2;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 3, spriteHeight - 3, false));
					POSITION = POSITION + spriteHeight - 2;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 5, spriteHeight - 4, false));
					POSITION = POSITION + spriteHeight - 4;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 5, spriteHeight - 4, false));
					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 5, spriteHeight - 4, true));
					POSITION = POSITION + spriteHeight - 4;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 5, spriteHeight - 4, false));
					POSITION = POSITION + spriteHeight - 4;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 7, spriteHeight - 6, false));
					POSITION = POSITION + spriteHeight - 5;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 8, spriteHeight - 6, false));
					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 8, spriteHeight - 6, true));
					POSITION = POSITION + spriteHeight - 5;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], (x * colSize), POSITION, spritWidth - 5, spriteHeight - 6, false));

					break;
				case 'torsos':
					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, false));
					POSITION = POSITION + spriteHeight;

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 3, spriteHeight, false));
					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 3, spriteHeight, true));
					POSITION = POSITION + spriteHeight;

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, false));
					POSITION = POSITION + spriteHeight;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 2, spriteHeight - 2, false));
					POSITION = POSITION + spriteHeight - 2;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize + 1, POSITION, spritWidth - 7, spriteHeight - 2, false));
					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize + 1, POSITION, spritWidth - 7, spriteHeight - 2, true));
					POSITION = POSITION + spriteHeight - 2;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 2, spriteHeight - 2, false));
					POSITION = POSITION + spriteHeight - 2;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 6, spriteHeight - 4, false));
					POSITION = POSITION + spriteHeight - 4;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize + 1, POSITION, spritWidth - 8, spriteHeight - 4, false));
					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize + 1, POSITION, spritWidth - 8, spriteHeight - 4, true));
					POSITION = POSITION + spriteHeight - 4;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 6, spriteHeight - 4, false));
					POSITION = POSITION + spriteHeight - 4;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize + 1, POSITION, spritWidth - 8, spriteHeight - 5, false));
					POSITION = POSITION + spriteHeight - 5;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 9, spriteHeight - 5, false));
					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 9, spriteHeight - 5, true));
					POSITION = POSITION + spriteHeight - 5;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize + 1, POSITION, spritWidth - 8, spriteHeight - 5, false));

					break;
				case 'arms':
					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth , spriteHeight, false));
					POSITION = POSITION + spriteHeight;

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize - 1, POSITION, spritWidth, spriteHeight, false));
					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize - 1, POSITION, spritWidth, spriteHeight, true));
					POSITION = POSITION + spriteHeight;

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight - 4, false));
					POSITION = POSITION + spriteHeight + 2;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth , spriteHeight - 5, false));
					POSITION = POSITION + spriteHeight - 2;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth , spriteHeight - 3, false));
					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth , spriteHeight - 3, true));
					POSITION = POSITION + spriteHeight + 1;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth , spriteHeight - 8, false));
					POSITION = POSITION + spriteHeight - 7;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth , spriteHeight - 6, false));
					POSITION = POSITION + spriteHeight - 4;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize - 1, POSITION, spritWidth , spriteHeight - 6, false));
					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize - 1, POSITION, spritWidth , spriteHeight - 6, true));
					POSITION = POSITION + spriteHeight - 4;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth , spriteHeight - 9, false));
					POSITION = POSITION + spriteHeight + 1;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth , spriteHeight - 8, false));
					POSITION = POSITION + spriteHeight - 8;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth , spriteHeight - 8, false));
					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth , spriteHeight - 8, true));
					POSITION = POSITION + spriteHeight - 8;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], (x * colSize), POSITION, spritWidth , spriteHeight, false));

					break;
				case 'legs':
					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, false));
					POSITION = POSITION + spriteHeight;

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 7, spriteHeight, false));
					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 7, spriteHeight, true));
					POSITION = POSITION + spriteHeight;

					CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, false));
					POSITION = POSITION + spriteHeight;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight - 4, false));
					POSITION = POSITION + spriteHeight - 4;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 7, spriteHeight - 4, false));
					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 7, spriteHeight - 4, true));
					POSITION = POSITION + spriteHeight - 4;

					MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight - 4, false));
					POSITION = POSITION + spriteHeight - 4;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 4, spriteHeight - 8, false));
					POSITION = POSITION + spriteHeight - 8;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 8, spriteHeight - 8, false));
					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 8, spriteHeight - 8, true));
					POSITION = POSITION + spriteHeight - 8;

					FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 4, spriteHeight - 8, false));
					POSITION = POSITION + spriteHeight - 8;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize + 1, POSITION, spritWidth - 6, spriteHeight - 11, false));
					POSITION = POSITION + spriteHeight - 11;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 10, spriteHeight - 11, false));
					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth - 10, spriteHeight - 11, true));
					POSITION = POSITION + spriteHeight - 11;

					DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], (x * colSize) + 1, POSITION, spritWidth - 6, spriteHeight - 11, false));
					
					break;
				default:
					break;
			}
		}

		graphicArray.push(new Array(CLOSE, MID, FAR, DISTANT));

	}
	//characterGfx.push(graphicArray);

	switch(graphic) {
		case 'people': gameGfxLoaded.monsterPeople = true; characterGfx[4] = graphicArray; break;
		case 'heads': gameGfxLoaded.monsterHeads = true; characterGfx[0] = graphicArray; break;
		case 'torsos': gameGfxLoaded.monsterTorsos = true; characterGfx[1] = graphicArray; break;
		case 'arms': gameGfxLoaded.monsterArms = true; characterGfx[3] = graphicArray; break;
		case 'legs': gameGfxLoaded.monsterLegs = true; characterGfx[2] = graphicArray; break;
	}
}

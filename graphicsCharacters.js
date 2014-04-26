/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//First Three Rows Head 16x12
//Mid Rows 16x10
//Last Rows 16x8

//imageCharacterArray[BodyPart][Type][Distance][Direction]   
var characterGfx = [];


function getCharacterSprite(length, graphicsFolder, graphic, spritWidth, spriteHeight, colSize) {


		var graphicArray = [];

		for (x = 0; x < length; x++) {

			var MID = [],
				FAR = [],
				CLOSE = [],
				DISTANT = [],
				POSITION = 0;


			for (y = 0; y < NUMBER_OF_DISTANCES*4; y++) {
                               
                               switch (graphic) {
                                   
                                    case 'heads'  :{switch (y) {

                                        case 0:{CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, false));
                                                POSITION = POSITION + spriteHeight;};break
                                        case 1:{CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, false));
                                                CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, true));
                                                POSITION = POSITION + spriteHeight;};break
                                        case 2:{CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, false));
                                                POSITION = POSITION + spriteHeight +2;};break
                                        case 3:{MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -3, spriteHeight -3, false));
                                                POSITION = POSITION + spriteHeight -2;};break
                                        case 4:{MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -3, spriteHeight -3, false));
                                                MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -3, spriteHeight -3, true));
                                                POSITION = POSITION + spriteHeight -2;};break
                                        case 5:{MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -3, spriteHeight -3, false));
                                                POSITION = POSITION + spriteHeight -2;};break
                                        case 6:{FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -5, spriteHeight -4, false));
                                                POSITION = POSITION + spriteHeight -4;};break
                                        case 7:{FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -5, spriteHeight -4, false));
                                                FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -5, spriteHeight -4, true));
                                                POSITION = POSITION + spriteHeight -4;};break
                                        case 8:{FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -5, spriteHeight -4, false));
                                                POSITION = POSITION + spriteHeight -4;};break
                                        case 9:{DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth-7, spriteHeight-6, false));
                                                POSITION = POSITION + spriteHeight -5;};break
                                        case 10:{DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth-8, spriteHeight-6, false));
                                                 DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth-8, spriteHeight-6, true));
                                                 POSITION = POSITION + spriteHeight -5;};break
                                        case 11:{DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], (x * colSize), POSITION, spritWidth -5, spriteHeight -6, false));};break
                                    };}break;                                
                                    case 'torsos' :{switch (y) {

                                        case 0:{CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, false));
                                                POSITION = POSITION + spriteHeight;};break
                                        case 1:{CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth-3, spriteHeight, false));
                                                CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth-3, spriteHeight, true));
                                                POSITION = POSITION + spriteHeight;};break
                                        case 2:{CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, false));
                                                POSITION = POSITION + spriteHeight ;};break
                                            
                                        case 3:{MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -2, spriteHeight-2 , false));
                                                POSITION = POSITION + spriteHeight -2;};break
                                        case 4:{MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize+1, POSITION, spritWidth -7, spriteHeight -2, false));
                                                MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize+1, POSITION, spritWidth -7, spriteHeight -2, true));
                                                POSITION = POSITION + spriteHeight -2;};break
                                        case 5:{MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -2, spriteHeight -2, false));
                                                POSITION = POSITION + spriteHeight -2;};break
                                            
                                        case 6:{FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -6, spriteHeight -4, false));
                                                POSITION = POSITION + spriteHeight -4;};break
                                        case 7:{FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize+1, POSITION, spritWidth -8, spriteHeight -4, false));
                                                FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize+1, POSITION, spritWidth -8, spriteHeight -4, true));
                                                POSITION = POSITION + spriteHeight -4;};break
                                        case 8:{FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -6, spriteHeight -4, false));
                                                POSITION = POSITION + spriteHeight -4;};break
                                            
                                        case 9:{DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize+1, POSITION, spritWidth-8, spriteHeight-5, false));
                                                POSITION = POSITION + spriteHeight -5;};break
                                        case 10:{DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth-9, spriteHeight-5, false));
                                                 DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth-9, spriteHeight-5, true));
                                                 POSITION = POSITION + spriteHeight -5;};break
                                        case 11:{DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize+1, POSITION, spritWidth -8, spriteHeight -5, false));};break
                                    };}break;                                
                                    case 'arms'   :{switch (y) {
                                        case 0:{CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth-4, spriteHeight, false));
                                                POSITION = POSITION + spriteHeight;};break
                                        case 1:{CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize-1, POSITION, spritWidth, spriteHeight, false));
                                                CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize-1, POSITION, spritWidth, spriteHeight, true));
                                                POSITION = POSITION + spriteHeight;};break
                                        case 2:{CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight-4, false));                                                
                                                POSITION = POSITION + spriteHeight +2;};break
                                            
                                        case 3:{MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -5, spriteHeight -5, false));
                                                POSITION = POSITION + spriteHeight -2;};break
                                        case 4:{MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -2, spriteHeight -3, false));
                                                MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -2, spriteHeight -3, true));
                                                POSITION = POSITION + spriteHeight+1;};break
                                        case 5:{MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -3, spriteHeight -8, false));
                                                POSITION = POSITION + spriteHeight -7;};break
                                            
                                        case 6:{FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -5, spriteHeight -6, false));
                                                POSITION = POSITION + spriteHeight -4;};break
                                        case 7:{FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize-1, POSITION, spritWidth -2, spriteHeight -6, false));
                                                FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize-1, POSITION, spritWidth -2, spriteHeight -6, true));
                                                POSITION = POSITION + spriteHeight -4;};break
                                        case 8:{FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -3, spriteHeight -9, false));
                                                POSITION = POSITION + spriteHeight +1;};break
                                            
                                        case 9:{DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth-5, spriteHeight-8, false));
                                                POSITION = POSITION + spriteHeight -8;};break
                                        case 10:{DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth-3, spriteHeight-8, false));
                                                 DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth-3, spriteHeight-8, true));
                                                 POSITION = POSITION + spriteHeight-8 ;};break
                                        case 11:{DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], (x * colSize), POSITION, spritWidth-3 , spriteHeight, false));};break
                                    };}break;                                
                                    case 'legs'   :{switch (y) {
                                        case 0:{CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, false));
                                                POSITION = POSITION + spriteHeight;};break
                                        case 1:{CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth-7, spriteHeight, false));
                                                CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth-7, spriteHeight, true));
                                                POSITION = POSITION + spriteHeight;};break
                                        case 2:{CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight, false));
                                                POSITION = POSITION + spriteHeight ;};break
                                            
                                        case 3:{MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth , spriteHeight -4, false));
                                                POSITION = POSITION + spriteHeight -4;};break
                                        case 4:{MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -7, spriteHeight -4, false));
                                                MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -7, spriteHeight -4, true));
                                                POSITION = POSITION + spriteHeight -4;};break
                                        case 5:{MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth, spriteHeight -4, false));
                                                POSITION = POSITION + spriteHeight -4;};break
                                            
                                        case 6:{FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -4, spriteHeight -8, false));
                                                POSITION = POSITION + spriteHeight -8;};break
                                        case 7:{FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -8, spriteHeight -8, false));
                                                FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -8, spriteHeight -8, true));
                                                POSITION = POSITION + spriteHeight -8;};break
                                        case 8:{FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth -4, spriteHeight -8, false));
                                                POSITION = POSITION + spriteHeight -8;};break
                                            
                                        case 9:{DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize+1, POSITION, spritWidth-6, spriteHeight-11, false));
                                                POSITION = POSITION + spriteHeight -11;};break
                                        case 10:{DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth-10, spriteHeight-11, false));
                                                 DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spritWidth-10, spriteHeight-11, true));
                                                 POSITION = POSITION + spriteHeight -11;};break
                                        case 11:{DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], (x * colSize)+1, POSITION, spritWidth -6, spriteHeight -11, false));};break
                                    };}break;
                                   
                               }
			}
			
                    graphicArray.push(new Array(CLOSE, MID, FAR, DISTANT));
        
		}

	characterGfx.push(graphicArray);

}


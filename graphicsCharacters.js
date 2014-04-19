/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//First Three Rows Head 16x12
//Mid Rows 16x10
//Last Rows 16x8

var IMAGE_CHA_HEAD = 0,
        IMAGE_CHA_BODY = 1,
        IMAGE_CHA_ARM = 3,
        IMAGE_CHA_LEG = 2;

var IMAGE_CHA_DISTANCE_1 = 0,
        IMAGE_CHA_DISTANCE_2 = 1,
        IMAGE_CHA_DISTANCE_3 = 2,
        IMAGE_CHA_DISTANCE_4 = 3;

var NUMBER_OF_DISTANCES = 12,
            NUMBER_OF_HEADS = 19,
            NUMBER_OF_BODIES = 4,
            NUMBER_OF_LEGS = 4,
            NUMBER_OF_ARMS = 1;
    
//imageCharacterArray[BodyPart][Type][Distance][Direction]   
var characterGfx = [];



function getCharacterSprite(NUMBER_OF_ITEMS,graphicsFolder,graphic,spritWidth,spriteHeight,colSize) {
    
    var graphicArray = [];    

    for (x = 0;x <= NUMBER_OF_ITEMS;x++){
        var mid = [];
        var far = [];
        var close = [];
        var distant = [];
        var pos = 0;
            
            for (y = 0;y < NUMBER_OF_DISTANCES;y++){
                
                switch (y){
                    
                case 0:{close.push(grabImageAt(gfx[graphicsFolder][graphic][0],x*colSize, pos, spritWidth, spriteHeight, false));pos=pos+spriteHeight;};break
                    case 1:{close.push(grabImageAt(gfx[graphicsFolder][graphic][0],x*colSize, pos, spritWidth, spriteHeight, false));close.push(grabImageAt(gfx[graphicsFolder][graphic][0],x*colSize, pos, spritWidth, spriteHeight, true));pos=pos+spriteHeight;};break
                    case 2:{close.push(grabImageAt(gfx[graphicsFolder][graphic][0],x*colSize, pos, spritWidth, spriteHeight, false));pos=pos+spriteHeight;};break
                    
                case 3:{mid.push(grabImageAt(gfx[graphicsFolder][graphic][0],x*colSize, pos, spritWidth-2, spriteHeight-2,false));pos=pos+spriteHeight-2;};break    
                    case 4:{mid.push(grabImageAt(gfx[graphicsFolder][graphic][0],x*colSize, pos, spritWidth-2, spriteHeight-2,false));mid.push(grabImageAt(gfx[graphicsFolder][graphic][0],x*colSize, pos, spritWidth-2, spriteHeight-2,true));pos=pos+spriteHeight-2;};break
                    case 5:{mid.push(grabImageAt(gfx[graphicsFolder][graphic][0],x*colSize, pos, spritWidth-2, spriteHeight-2,false));pos=pos+spriteHeight-2;};break
                    
                case 6:{far.push(grabImageAt(gfx[graphicsFolder][graphic][0],x*colSize, pos, spritWidth-4, spriteHeight-4, false));pos=pos+spriteHeight-4;};break
                    case 7:{far.push(grabImageAt(gfx[graphicsFolder][graphic][0],x*colSize, pos, spritWidth-4, spriteHeight-4, false));far.push(grabImageAt(gfx[graphicsFolder][graphic][0],x*colSize, pos, spritWidth-4, spriteHeight-4, true));pos=pos+spriteHeight-4;};break
                    case 8:{far.push(grabImageAt(gfx[graphicsFolder][graphic][0],x*colSize, pos, spritWidth-4, spriteHeight-4, false));pos=pos+spriteHeight-9;};break
                    
                case 9:{distant.push(grabImageAt(gfx[graphicsFolder][graphic][0],x*colSize, pos, spritWidth-6, spriteHeight-6, false));pos=pos+spriteHeight-6;};break
                    case 10:{distant.push(grabImageAt(gfx[graphicsFolder][graphic][0],x*colSize, pos, spritWidth-6, spriteHeight-6, false));distant.push(grabImageAt(gfx[graphicsFolder][graphic][0],x*colSize, pos, 5, 6, true));pos=pos+spriteHeight-6;};break
                    case 11:{distant.push(grabImageAt(gfx[graphicsFolder][graphic][0],(x*colSize)+1, pos, spritWidth-6, spriteHeight-6, false));};break  
                }
                
            }
        graphicArray.push(new Array(close,mid,far,distant));
    }

    characterGfx.push(graphicArray);

}

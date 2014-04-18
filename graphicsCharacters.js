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
            NUMBER_OF_BODIES = 5,
            NUMBER_OF_LEGS = 4,
            NUMBER_OF_ARMS = 1;
    
//characterGfx[BodyPart][Type][Distance][Direction][Colour]
var characterGfx = [];





function getHeads(){
    
    var heads = [];    

    for (x = 0;x < NUMBER_OF_HEADS;x++){
        var mid = [];
        var far = [];
        var close = [];
        var distant = [];
        var pos = 0;
            
            for (y = 0;y < NUMBER_OF_DISTANCES;y++){
                
                switch (y){
                    
                case 0:{close.push(grabImageAt(gfx["character"]["heads"][0],x*16, pos, 12, 12, false));pos=pos+12;};break
                    case 1:{close.push(grabImageAt(gfx["character"]["heads"][0],x*16, pos, 12, 12, false));close.push(grabImageAt(gfx["character"]["heads"][0],x*16, pos, 12, 12, true));pos=pos+12;};break
                    case 2:{close.push(grabImageAt(gfx["character"]["heads"][0],x*16, pos, 12, 12, false));pos=pos+12;};break
                    
                case 3:{mid.push(grabImageAt(gfx["character"]["heads"][0],x*16, pos, 10, 10,false));pos=pos+10;};break    
                    case 4:{mid.push(grabImageAt(gfx["character"]["heads"][0],x*16, pos, 10, 10,false));mid.push(grabImageAt(gfx["character"]["heads"][0],x*16, pos, 10, 10,true));pos=pos+10;};break
                    case 5:{mid.push(grabImageAt(gfx["character"]["heads"][0],x*16, pos, 10, 10,false));pos=pos+10;};break
                    
                case 6:{far.push(grabImageAt(gfx["character"]["heads"][0],x*16, pos, 8, 8, false));pos=pos+8;};break
                    case 7:{far.push(grabImageAt(gfx["character"]["heads"][0],x*16, pos, 8, 8, false));far.push(grabImageAt(gfx["character"]["heads"][0],x*16, pos, 8, 8, true));pos=pos+8;};break
                    case 8:{far.push(grabImageAt(gfx["character"]["heads"][0],x*16, pos, 8, 8, false));pos=pos+9;};break
                    
                case 9:{distant.push(grabImageAt(gfx["character"]["heads"][0],x*16, pos, 7, 7, false));pos=pos+7;};break
                    case 10:{distant.push(grabImageAt(gfx["character"]["heads"][0],x*16, pos, 7, 7, false));distant.push(grabImageAt(gfx["character"]["heads"][0],x*16, pos, 5, 6, true));pos=pos+7;};break
                    case 11:{distant.push(grabImageAt(gfx["character"]["heads"][0],(x*16)+1, pos, 7, 7, false));};break  
                }
                
            }
        heads.push(new Array(close,mid,far,distant));
    }
    
    
    
    
}

function getCharacterSprite(num,graphic,spritWidth,spriteHeight,colSize) {
    
    var temp2 = [];    
    col = COLOUR_CHAR_GREEN;
    var temp = [];
    for (x = 0; x < num; x++){
        var mid = [];
        var far = [];
        var close = [];
        var distant = [];
        var colour = [];
        var pos = 0;

        close.push(grabImageAt(gfx["character"][graphic][col],x*colSize, pos, spritWidth, spriteHeight, false));pos=pos+spriteHeight;
        close.push(grabImageAt(gfx["character"][graphic][col],x*colSize, pos, spritWidth, spriteHeight, false));close.push(grabImageAt(gfx["character"][graphic][col],x*colSize, pos, spritWidth, spriteHeight, true));pos=pos+spriteHeight;
        close.push(grabImageAt(gfx["character"][graphic][col],x*colSize, pos, spritWidth, spriteHeight, false));pos=pos+spriteHeight;
            
        mid.push(grabImageAt(gfx["character"][graphic][col],x*colSize, pos, spritWidth-2, spriteHeight-2,false));pos=pos+spriteHeight-2;    
        mid.push(grabImageAt(gfx["character"][graphic][col],x*colSize, pos, spritWidth-2, spriteHeight-2,false));mid.push(grabImageAt(gfx["character"][graphic][col],x*colSize, pos, spritWidth-2, spriteHeight-2,true));pos=pos+spriteHeight-2;
        mid.push(grabImageAt(gfx["character"][graphic][col],x*colSize, pos, spritWidth-2, spriteHeight-2,false));pos=pos+spriteHeight-2;
            
        far.push(grabImageAt(gfx["character"][graphic][col],x*colSize, pos, spritWidth-4, spriteHeight-4, false));pos=pos+spriteHeight-4;
        far.push(grabImageAt(gfx["character"][graphic][col],x*colSize, pos, spritWidth-4, spriteHeight-4, false));far.push(grabImageAt(gfx["character"][graphic][col],x*colSize, pos, spritWidth-4, spriteHeight-4, true));pos=pos+spriteHeight-4;
        far.push(grabImageAt(gfx["character"][graphic][col],x*colSize, pos, spritWidth-4, spriteHeight-4, false));pos=pos+spriteHeight-9;
            
        distant.push(grabImageAt(gfx["character"][graphic][col],x*colSize, pos, spritWidth-6, spriteHeight-6, false));pos=pos+spriteHeight-6;
        distant.push(grabImageAt(gfx["character"][graphic][col],x*colSize, pos, spritWidth-6, spriteHeight-6, false));distant.push(grabImageAt(gfx["character"][graphic][col],x*colSize, pos, 5, 6, true));pos=pos+spriteHeight-6;
        distant.push(grabImageAt(gfx["character"][graphic][col],(x*colSize)+1, pos, spritWidth-6, spriteHeight-6, false));

        temp.push(new Array(close,mid,far,distant));
    }

    characterGfx.push(temp);

}

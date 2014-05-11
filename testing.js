/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var maleCharacterSpriteLocations = characterSpriteLocation();
var testMon1 = 0,
        testDistance = 0,
        testDirection = 0,
        testPalette = 0;

var gfxSummon;
var gfxBehemoth;
var gfxNastyFloater;
var gfxDragon;
var gfxCrab;

function testing(){
    
     if (gfxBehemoth === null || typeof(gfxBehemoth)==='undefined' && gfx['character']['behemoth'].width > 0 && gfx['character']['summon'].width > 0) { 
        gfxBehemoth = behemothArray(gfx['character']['behemoth']);     
        gfxSummon = summonArray(gfx['character']['summon']);     
        gfxNastyFloater = nastyFloaterArray(gfx['character']['nastyfloater']);  
        gfxDragon = dragonArray(gfx['character']['dragon']);
        gfxCrab = crabArray(gfx['character']['crab']);
     }    
    testSummon();
    
}

function testSummon(){
    
    var testP0 = new Array(COLOUR[0],COLOUR[0],COLOUR[7],COLOUR[8]),
        testP1 = new Array(COLOUR[0],COLOUR[8],COLOUR[4],COLOUR[14]),
        testP2 = new Array(COLOUR[0],COLOUR[5],COLOUR[6],COLOUR[14]),
        testP3 = new Array(COLOUR[0],COLOUR[9],COLOUR[12],COLOUR[11]),
        testP4 = new Array(COLOUR[0],COLOUR[10],COLOUR[11],COLOUR[13]),
        testP5 = new Array(COLOUR[0],COLOUR[11],COLOUR[13],COLOUR[14]),
        testP6 = new Array(COLOUR[0],COLOUR[12],COLOUR[11],COLOUR[14]),
        testP7 = new Array(COLOUR[0],COLOUR[2],COLOUR[3],COLOUR[14]),
        testP8 = new Array(COLOUR[0],COLOUR[8],COLOUR[4],COLOUR[13]),
        testP9 = new Array(COLOUR[0],COLOUR[5],COLOUR[6],COLOUR[13]),
        testP10 = new Array(COLOUR[0],COLOUR[7],COLOUR[8],COLOUR[4]),
        testP11 = new Array(COLOUR[0],COLOUR[7],COLOUR[8],COLOUR[13]);

        testP0 = testP7;
    
    try{
    if (gfxCrab !== null || typeof(gfxCrab)!=='undefined') {
        
        var testGfx = gfxNastyFloater;
        
        ctx.drawImage(recolourSprite(testGfx[testMon1][testDistance][testDirection], MON_PALETTE_DEFAULT, testP0),145*scale,25*scale,testGfx[testMon1][testDistance][testDirection].width*scale,testGfx[testMon1][testDistance][testDirection].height*scale);
        ctx.drawImage(recolourSprite(testGfx[1][0][4], MON_PALETTE_DEFAULT, testP0),133*scale,24*scale,testGfx[1][0][4].width*scale,testGfx[1][0][4].height*scale);
        ctx.drawImage(recolourSprite(testGfx[1][0][5], MON_PALETTE_DEFAULT, testP0),170*scale,24*scale,testGfx[1][0][5].width*scale,testGfx[1][0][5].height*scale);
        }
    }catch(e){}
//    
//    try{
//    if (gfxCrab !== null || typeof(gfxCrab)!=='undefined') {        
//        ctx.drawImage(recolourSprite(gfxSummon[testMon1], MON_PALETTE_DEFAULT, testP0),50*scale,0,gfxSummon[testMon1].width*scale,gfxSummon[testMon1].height*scale);
//        }
//    }catch(e){}
//    
//    try{
//    if (gfxCrab !== null || typeof(gfxCrab)!=='undefined') {
//        ctx.drawImage(recolourSprite(gfxNastyFloater[testMon1], MON_PALETTE_DEFAULT, monsterPalette[testPalette].torsoPalette),0,60*scale,gfxNastyFloater[testMon1].width*scale,gfxNastyFloater[testMon1].height*scale);
//        }
//    }catch(e){}
//    try{
//    if (gfxCrab !== null || typeof(gfxCrab)!=='undefined') {
//        ctx.drawImage(recolourSprite(gfxDragon[testMon1], MON_PALETTE_DEFAULT, monsterPalette[testPalette].torsoPalette),0,110*scale,gfxDragon[testMon1].width*scale,gfxDragon[testMon1].height*scale);
//        }
//    }catch(e){}
//    try{
//        if (gfxCrab !== null || typeof(gfxCrab)!=='undefined') {
//        ctx.drawImage(recolourSprite(gfxCrab[testMon1], MON_PALETTE_DEFAULT, monsterPalette[testPalette].torsoPalette),250*scale,0*scale,gfxCrab[testMon1].width*scale,gfxCrab[testMon1].height*scale);
//        }
//    }catch(e){}
    
}

function behemothArray(spriteSheetIMG){
    
    var ImageArray = [],
        BODYPART = [],    
        DISTANCE_1 = [],
        DISTANCE_2 = [],
        DISTANCE_3 = [],
        DISTANCE_4 = [],
        DISTANCE_5 = [],
        DISTANCE_6 = [];
        //BODY
	DISTANCE_1.push(grabImageAt(spriteSheetIMG,72, 1, 29, 51, false));
        DISTANCE_1.push(grabImageAt(spriteSheetIMG,30, 1, 40, 51, true));
        DISTANCE_1.push(grabImageAt(spriteSheetIMG,30, 1, 40, 51, false));        
        DISTANCE_1.push(grabImageAt(spriteSheetIMG,0, 2, 29, 51, false));
        
        DISTANCE_2.push(grabImageAt(spriteSheetIMG,77, 63, 19, 36, false));
        DISTANCE_2.push(grabImageAt(spriteSheetIMG,35, 63, 28, 36, true));
        DISTANCE_2.push(grabImageAt(spriteSheetIMG,35, 63, 28, 36, false));        
        DISTANCE_2.push(grabImageAt(spriteSheetIMG,5, 63, 19, 36, false));
        
        DISTANCE_3.push(grabImageAt(spriteSheetIMG,5, 106, 23, 27, false));
        DISTANCE_3.push(grabImageAt(spriteSheetIMG,39, 105, 20, 27, true));
        DISTANCE_3.push(grabImageAt(spriteSheetIMG,39, 105, 20, 27, false));
        DISTANCE_3.push(grabImageAt(spriteSheetIMG,76, 106, 23, 27, false));
        
        DISTANCE_4.push(grabImageAt(spriteSheetIMG,7, 136, 19, 21, false));
        DISTANCE_4.push(grabImageAt(spriteSheetIMG,43, 136, 15, 21, true));
        DISTANCE_4.push(grabImageAt(spriteSheetIMG,43, 136, 15, 21, false));
        DISTANCE_4.push(grabImageAt(spriteSheetIMG,78, 136, 19, 21, false));
        
        BODYPART.push(DISTANCE_1,DISTANCE_2,DISTANCE_3,DISTANCE_4);
        ImageArray.push(BODYPART);
        
        var DISTANCE_1 = [],
            DISTANCE_2 = [],
            DISTANCE_3 = [],
            DISTANCE_4 = [],
            DISTANCE_5 = [],
            DISTANCE_6 = [],
            BODYPART = [];
    
        
        //ARMS
        DISTANCE_1.push(grabImageAt(spriteSheetIMG,110, 2, 14, 26, false));
        DISTANCE_1.push(grabImageAt(spriteSheetIMG,110, 2, 14, 26, true));
        DISTANCE_1.push(grabImageAt(spriteSheetIMG,128, 2, 16, 21, false));
        DISTANCE_1.push(grabImageAt(spriteSheetIMG,128, 2, 16, 21, true));
        
        DISTANCE_2.push(grabImageAt(spriteSheetIMG,112, 64, 10, 18, false));
        DISTANCE_2.push(grabImageAt(spriteSheetIMG,112, 64, 10, 18, true));
        DISTANCE_2.push(grabImageAt(spriteSheetIMG,131, 64, 11, 15, false));
        DISTANCE_2.push(grabImageAt(spriteSheetIMG,131, 64, 11, 15, true));
        
        BODYPART.push(DISTANCE_1,DISTANCE_2);
        ImageArray.push(BODYPART);
        
    return ImageArray;
}

function summonArray(spriteSheetIMG){
    
    var ImageArray = [],
            BODYPART = [],    
            DISTANCE_1 = [],
            DISTANCE_2 = [],
            DISTANCE_3 = [],
            DISTANCE_4 = [],
            DISTANCE_5 = [],
            DISTANCE_6 = [];
    
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,0, 0, 19, 47,false));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,21, 0, 14, 47,true));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,21, 0, 14, 47,false));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,39, 0, 19, 47,false));
    
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,0, 48, 15, 39,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,16, 48, 11, 39,true));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,16, 48, 11, 39,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,30, 48, 15, 39,false));
    
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,0, 88, 11, 32,false));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,12, 88, 9, 32,true));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,12, 88, 9, 32,false));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,22, 88, 11, 32,false));
    
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,0, 121, 9, 27,false));
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,10, 121, 7, 27,true));
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,10, 121, 7, 27,false));
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,18, 121, 9, 27,false));
    
    DISTANCE_5.push(grabImageAt(spriteSheetIMG,0, 149, 13, 22,false));
    DISTANCE_5.push(grabImageAt(spriteSheetIMG,16, 149, 8, 22,true));
    DISTANCE_5.push(grabImageAt(spriteSheetIMG,16, 149, 8, 22,false));
    DISTANCE_5.push(grabImageAt(spriteSheetIMG,26, 149, 13, 22,false));
    
    DISTANCE_6.push(grabImageAt(spriteSheetIMG,0, 172, 11, 17,false));
    DISTANCE_6.push(grabImageAt(spriteSheetIMG,14, 172, 6, 17,true));
    DISTANCE_6.push(grabImageAt(spriteSheetIMG,14, 172, 6, 17,false));
    DISTANCE_6.push(grabImageAt(spriteSheetIMG,22, 172, 11, 17,false));

    BODYPART.push(DISTANCE_1,DISTANCE_2,DISTANCE_3,DISTANCE_4,DISTANCE_5,DISTANCE_6);
    ImageArray.push(BODYPART);
        
    var DISTANCE_1 = [],
        DISTANCE_2 = [],
        DISTANCE_3 = [],
        DISTANCE_4 = [],
        DISTANCE_5 = [],
        DISTANCE_6 = [],
        BODYPART = [];

    DISTANCE_1.push(grabImageAt(spriteSheetIMG,69, 0, 7, 21,false));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,79, 0, 11, 21,true));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,79, 0, 11, 21,false));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,79, 0, 11, 21,true));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,92, 0, 12, 17,false));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,92, 0, 12, 17,true));
    
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,71, 22, 5, 17,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,71, 22, 5, 17,true));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,79, 25, 9, 17,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,79, 25, 9, 17,true));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,96, 25, 8, 12,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,96, 25, 8, 12,true));
    
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,69, 49, 4, 13,false));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,69, 49, 4, 13,true));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,80, 49, 7, 13,false));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,80, 49, 7, 13,true));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,97, 49, 7, 11,false));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,97, 49, 7, 11,true));
    
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,70, 68, 3, 12,false));
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,70, 68, 3, 12,true));
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,81, 68, 6, 12,false));
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,81, 68, 6, 12,true));
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,98, 68, 6, 9,false));
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,98, 68, 6, 9,true));
    
    BODYPART.push(DISTANCE_1,DISTANCE_2,DISTANCE_3,DISTANCE_4);
    ImageArray.push(BODYPART);
    
    return ImageArray;
}

function nastyFloaterArray(spriteSheetIMG){
    
    var ImageArray = [],
            BODYPART = [],    
            DISTANCE_1 = [],
            DISTANCE_2 = [],
            DISTANCE_3 = [],
            DISTANCE_4 = [];
    
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,0,0,48,44,false));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,50,0,48,44,true));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,50,0,48,44,false));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,99,0,48,44,false));
    
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,8,50,32,31,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,58,50,32,31,true));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,58,50,32,31,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,108,50,32,30,false));
    
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,8,91,32,21,false));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,58,91,32,21,true));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,58,91,32,21,false));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,113,91,23,20,false));
    
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,10,117,28,17,false));
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,60,117,28,17,true));
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,60,117,28,17,false));
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,117,117,16,16,false));
    
    BODYPART.push(DISTANCE_1,DISTANCE_2,DISTANCE_3,DISTANCE_4);
    ImageArray.push(BODYPART);
    
    var BODYPART = [],    
            DISTANCE_1 = [],
            DISTANCE_2 = [],
            DISTANCE_3 = [],
            DISTANCE_4 = [];
    
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,159,10,16,21,false));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,159,10,16,21,true));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,184,10,16,21,false));  
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,184,10,16,21,true));
    
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,159,62,10,14,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,159,62,10,14,true));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,184,62,10,14,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,184,62,10,14,true));
    
    BODYPART.push(DISTANCE_1,DISTANCE_2);
    ImageArray.push(BODYPART);
    
    return ImageArray;
    
}

function dragonArray(spriteSheetIMG){
    
    var ImageArray = [],
            BODYPART = [],    
            DISTANCE_1 = [],
            DISTANCE_2 = [],
            DISTANCE_3 = [],
            DISTANCE_4 = [],
            DISTANCE_5 = [];
    
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,0,2,63,50,false));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,64,1,63,55,true));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,64,1,63,55,false));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,128,1,74,55,false));
    
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,9,58,45,37,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,73,58,45,39,true));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,73,58,45,39,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,138,57,54,39,false));
    
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,16,100,31,28,false));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,80,100,31,28,true));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,80,100,31,28,false));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,144,100,40,28,false));
    
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,20,134,23,21,false));
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,84,134,23,20,true));
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,84,134,23,20,false));
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,151,134,29,21,false));
    
    DISTANCE_5.push(grabImageAt(spriteSheetIMG,22,160,19,16,false));
    DISTANCE_5.push(grabImageAt(spriteSheetIMG,86,159,19,17,true));
    DISTANCE_5.push(grabImageAt(spriteSheetIMG,86,159,19,17,false));
    DISTANCE_5.push(grabImageAt(spriteSheetIMG,154,159,24,16,false));
    
    BODYPART.push(DISTANCE_1,DISTANCE_2,DISTANCE_3,DISTANCE_4,DISTANCE_5);
    ImageArray.push(BODYPART);
    
    var  BODYPART = [],    
            DISTANCE_1 = [],
            DISTANCE_2 = [],
            DISTANCE_3 = [],
            DISTANCE_4 = [],
            DISTANCE_5 = [];
    
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,206,33,14,21,false));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,206,33,14,21,true));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,223,34,25,20,false));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,223,34,25,20,true));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,251,31,15,23,false));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,251,31,15,23,true));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,269,32,23,22,false));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,269,32,23,22,true));
    
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,208,81,10,16,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,208,81,10,16,true));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,225,83,18,14,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,225,83,18,14,true));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,253,81,10,16,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,253,81,10,16,true));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,269,82,16,15,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,269,82,16,15,true));
    
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,208,117,8,11,false));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,208,117,8,11,true));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,228,117,14,11,false));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,228,117,14,11,true));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,254,118,8,10,false));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,254,118,8,10,true));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,269,117,12,11,false));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,269,117,12,11,true));
    
    BODYPART.push(DISTANCE_1,DISTANCE_2,DISTANCE_3);
    ImageArray.push(BODYPART);
    
    return ImageArray;
    
}

function crabArray(spriteSheetIMG){
    
     var ImageArray = [],
         BODYPART = [],    
         DISTANCE_1 = [],
         DISTANCE_2 = [],
         DISTANCE_3 = [],
         DISTANCE_4 = [];
    
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,0,0,56,29,false));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,57,0,56,29,false));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,57,0,56,29,true));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,114,0,56,29,false));
    
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,8,31,38,19,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,65,31,41,19,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,65,31,41,19,true));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,122,31,38,19,false));
    
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,13,51,28,14,false));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,70,51,30,13,false));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,70,51,30,13,true));
    DISTANCE_3.push(grabImageAt(spriteSheetIMG,127,51,28,13,false));
    
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,16,66,22,11,false));
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,73,66,24,10,false));
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,73,66,24,10,true));
    DISTANCE_4.push(grabImageAt(spriteSheetIMG,130,66,22,10,false));
    
    BODYPART.push(DISTANCE_1,DISTANCE_2,DISTANCE_3,DISTANCE_4);
    ImageArray.push(BODYPART);
    
    var BODYPART = [],    
         DISTANCE_1 = [],
         DISTANCE_2 = [],
         DISTANCE_3 = [],
         DISTANCE_4 = []
    
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,180,1,16,21,false));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,180,1,16,21,true));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,106,2,14,19,false));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,106,2,14,19,true));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,229,0,16,21,false));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,229,0,16,21,true));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,252,7,15,9,false));
    DISTANCE_1.push(grabImageAt(spriteSheetIMG,252,7,15,9,true));
    
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,183,31,10,14,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,183,31,10,14,true));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,205,25,16,24,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,205,25,16,24,true));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,232,30,10,14,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,232,30,10,14,true));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,255,34,9,8,false));
    DISTANCE_2.push(grabImageAt(spriteSheetIMG,255,34,9,8,true));
    
    BODYPART.push(DISTANCE_1,DISTANCE_2);
    ImageArray.push(BODYPART);
    
    return ImageArray;
}
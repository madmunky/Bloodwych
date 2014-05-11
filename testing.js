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
        gfxSummon = grabSpriteArray(gfx['character']['summon'],summonArray());     
        gfxNastyFloater = grabSpriteArray(gfx['character']['nastyfloater'],nastyFloaterArray());  
        gfxDragon = grabSpriteArray(gfx['character']['dragon'],dragonArray());
        gfxCrab = grabSpriteArray(gfx['character']['crab'],crabArray());
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

        testP0 = testP11;
    
    try{
    if (gfxCrab !== null || typeof(gfxCrab)!=='undefined') {
        ctx.drawImage(gfxBehemoth[testMon1][testDistance][testDirection],145*scale,25*scale,gfxBehemoth[testMon1][testDistance][testDirection].width*scale,gfxBehemoth[testMon1][testDistance][testDirection].height*scale);
        ctx.drawImage(gfxBehemoth[1][0][2],133*scale,24*scale,gfxBehemoth[1][0][2].width*scale,gfxBehemoth[1][0][2].height*scale);
        ctx.drawImage(gfxBehemoth[1][0][3],170*scale,24*scale,gfxBehemoth[1][0][3].width*scale,gfxBehemoth[1][0][3].height*scale);
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

function grabSpriteArray(spriteSheetIMG,spriteSheetArray){
    
    var ImageArray = [];
    
    for (x = 0; x < spriteSheetArray.length;x++){
        ImageArray.push(grabImageAt(spriteSheetIMG, spriteSheetArray[x][0], spriteSheetArray[x][1], spriteSheetArray[x][2], spriteSheetArray[x][3], false));        
    }
    
    return ImageArray;
    
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

function summonArray(){
    
    var ImageArray = new Array();  
    
    ImageArray[0] = new Array(0, 0, 19, 47);
    ImageArray[1] = new Array(21, 0, 14, 47);
    ImageArray[2] = new Array(39, 0, 19, 47);
    ImageArray[3] = new Array(0, 48, 15, 39);
    ImageArray[4] = new Array(16, 48, 11, 39);
    ImageArray[5] = new Array(30, 48, 15, 39);
    ImageArray[6] = new Array(0, 88, 11, 32);
    ImageArray[7] = new Array(12, 88, 9, 32);
    ImageArray[8] = new Array(22, 88, 11, 32);
    ImageArray[9] = new Array(0, 121, 9, 27);
    ImageArray[10] = new Array(10, 121, 7, 27);
    ImageArray[11] = new Array(18, 121, 9, 27);
    ImageArray[12] = new Array(0, 149, 13, 22);
    ImageArray[13] = new Array(16, 149, 8, 22);
    ImageArray[14] = new Array(26, 149, 13, 22);
    ImageArray[15] = new Array(0, 172, 11, 17);
    ImageArray[16] = new Array(14, 172, 6, 17);
    ImageArray[17] = new Array(22, 172, 11, 17);

    ImageArray[18] = new Array(69, 0, 7, 21);
    ImageArray[19] = new Array(79, 0, 11, 21);
    ImageArray[20] = new Array(92, 0, 12, 17);
    ImageArray[21] = new Array(71, 22, 5, 17);
    ImageArray[22] = new Array(79, 25, 9, 17);
    ImageArray[23] = new Array(96, 25, 8, 12);
    ImageArray[24] = new Array(69, 49, 4, 13);
    ImageArray[25] = new Array(80, 49, 7, 13);
    ImageArray[26] = new Array(97, 49, 7, 11);
    ImageArray[27] = new Array(70, 68, 3, 12);
    ImageArray[28] = new Array(81, 68, 6, 12);
    ImageArray[29] = new Array(98, 68, 6, 9);
    
    return ImageArray;
}

function nastyFloaterArray(){
    
    var ImageArray = new Array();
    
    ImageArray[0] = new Array(0,0,48,44);
    ImageArray[1] = new Array(50,0,48,44);
    ImageArray[2] = new Array(99,0,48,44);
    ImageArray[3] = new Array(8,50,32,31);
    ImageArray[4] = new Array(58,50,32,31);
    ImageArray[5] = new Array(108,50,32,30);
    ImageArray[6] = new Array(8,91,32,21);
    ImageArray[7] = new Array(58,91,32,21);
    ImageArray[8] = new Array(113,91,23,20);
    ImageArray[9] = new Array(10,117,28,17);
    ImageArray[10] = new Array(60,117,28,17);
    ImageArray[11] = new Array(117,117,16,16);
    ImageArray[12] = new Array(159,10,16,21);
    ImageArray[13] = new Array(184,10,16,21);
    ImageArray[14] = new Array(159,62,10,14);
    ImageArray[15] = new Array(184,62,10,14);
    
    return ImageArray;
    
}

function dragonArray(){
    
    var ImageArray = new Array();
    
    ImageArray[0] = new Array(0,2,63,50);
    ImageArray[1] = new Array(64,1,63,55);
    ImageArray[2] = new Array(128,1,74,55);
    ImageArray[3] = new Array(9,58,45,37);
    ImageArray[4] = new Array(73,58,45,39);
    ImageArray[5] = new Array(138,57,54,39);
    ImageArray[6] = new Array(16,100,31,28);
    ImageArray[7] = new Array(80,100,31,28);
    ImageArray[8] = new Array(144,100,40,28);
    ImageArray[9] = new Array(20,134,23,21);
    ImageArray[10] = new Array(84,134,23,20);
    ImageArray[11] = new Array(151,134,29,21);
    ImageArray[12] = new Array(22,160,19,16);
    ImageArray[13] = new Array(86,159,19,17);
    ImageArray[14] = new Array(154,159,24,16);
    ImageArray[15] = new Array(206,33,14,21);
    ImageArray[16] = new Array(223,34,25,20);
    ImageArray[17] = new Array(251,31,15,23);
    ImageArray[18] = new Array(269,32,23,22);
    ImageArray[19] = new Array(208,81,10,16);
    ImageArray[20] = new Array(225,83,18,14);
    ImageArray[21] = new Array(253,81,10,16);
    ImageArray[22] = new Array(269,82,16,15);
    ImageArray[23] = new Array(208,117,8,11);
    ImageArray[24] = new Array(228,117,14,11);
    ImageArray[25] = new Array(254,118,8,10);
    ImageArray[26] = new Array(269,117,12,11);
    
    return ImageArray;
    
}

function crabArray(){
    
    var ImageArray = [];
    
    ImageArray[0] = new Array(0,0,56,29);
    ImageArray[1] = new Array(57,0,56,29);
    ImageArray[2] = new Array(114,0,56,29);
    ImageArray[3] = new Array(8,31,38,19);
    ImageArray[4] = new Array(65,31,41,19);
    ImageArray[5] = new Array(122,31,38,19);
    ImageArray[6] = new Array(13,51,28,14);
    ImageArray[7] = new Array(70,51,30,13);
    ImageArray[8] = new Array(127,51,28,13);
    ImageArray[9] = new Array(16,66,22,11);
    ImageArray[10] = new Array(73,66,24,10);
    ImageArray[11] = new Array(130,66,22,10);
    ImageArray[12] = new Array(180,1,16,21);
    ImageArray[13] = new Array(106,2,14,19);
    ImageArray[14] = new Array(229,0,16,21);
    ImageArray[15] = new Array(252,7,15,9);
    ImageArray[16] = new Array(183,31,10,14);
    ImageArray[17] = new Array(205,25,16,24);
    ImageArray[18] = new Array(232,30,10,14);
    ImageArray[19] = new Array(255,34,9,8);
    
    return ImageArray;
}
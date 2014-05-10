/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var maleCharacterSpriteLocations = characterSpriteLocation();
var testMon1 = 0,
        testDistance = 0,
        testDirection = 0;
var Summon;
var behemoth;

function testing(){
    
     if (behemoth === null || typeof(behemoth)==='undefined' && gfx['character']['behemoth'].width > 0) { 
        behemoth = grabSpriteArray(gfx['character']['behemoth'],behemothArray());     
     }    
    testSummon();
    
}

function grabSummon(){
    if (gfx['character']['summon'].width > 0){
    var gfxSummon = [];
    var BodyPart = [];

    //RIP ALL THE BODY IMAGES    
    for(x = 0;x < 3; x++){
        var Distance_1 = [];
        var Distance_2 = [];
        var Distance_3 = [];
        var Distance_4 = [];
        var Distance_5 = [];
        var Distance_6 = [];
        
        Distance_1.push(grabImageAt(gfx['character']['summon'], x * 19, 0, 19, 47, false));
        Distance_2.push(grabImageAt(gfx['character']['summon'], x * 15, 48, 15, 39, false));        
        Distance_3.push(grabImageAt(gfx['character']['summon'], x * 11, 88, 11, 32, false));     
        Distance_4.push(grabImageAt(gfx['character']['summon'], x * 9, 121, 9, 27, false)); 
        Distance_5.push(grabImageAt(gfx['character']['summon'], x * 13, 149, 13, 22, false)); 
        Distance_6.push(grabImageAt(gfx['character']['summon'], x * 11, 172, 11, 17, false));
        BodyPart.push(new Array(Distance_1,Distance_2,Distance_3,Distance_4,Distance_5,Distance_6));      

    }
    
    gfxSummon.push(BodyPart);
    
    //RIP ALL THE ARMS
        for(x = 0;x < 3; x++){
        var Distance_1 = [];
        var Distance_2 = [];
        var Distance_3 = [];
        var Distance_4 = [];
        
        Distance_1.push(grabImageAt(gfx['character']['summon'], x * 19, 0, 19, 47, false));
        Distance_2.push(grabImageAt(gfx['character']['summon'], x * 15, 48, 15, 39, false));        
        Distance_3.push(grabImageAt(gfx['character']['summon'], x * 11, 88, 11, 32, false));     
        Distance_4.push(grabImageAt(gfx['character']['summon'], x * 9, 121, 9, 27, false)); 
        BodyPart.push(new Array(Distance_1,Distance_2,Distance_3,Distance_4));      

    }
    gfxSummon.push(BodyPart);
    
    return gfxSummon;
    }
    
}

function testSummon(){
    if (behemoth !== null || typeof(behemoth)!=='undefined') {
        ctx.drawImage(behemoth[testMon1],0,0);
    }
}

function grabSpriteArray(spriteSheetIMG,spriteSheetArray){
    
    var ImageArray = [];
    
    for (x = 0; x < spriteSheetArray.length;x++){
        ImageArray.push(grabImageAt(spriteSheetIMG, spriteSheetArray[x][0], spriteSheetArray[x][1], spriteSheetArray[x][2], spriteSheetArray[x][3], false));        
    }
    
    return ImageArray;
    
}

function behemothArray(){
    
    var ImageArray = new Array();

        //BODY
	ImageArray[0] = new Array(0, 2, 29, 51);
        ImageArray[1] = new Array(30, 1, 40, 51);
        ImageArray[2] = new Array(72, 1, 29, 51);
        ImageArray[3] = new Array(5, 63, 19, 36);
        ImageArray[4] = new Array(35, 63, 28, 36);
        ImageArray[5] = new Array(77, 63, 19, 36);
        ImageArray[6] = new Array(5, 106, 23, 27);
        ImageArray[7] = new Array(39, 105, 20, 27);
        ImageArray[8] = new Array(76, 106, 23, 27);
        ImageArray[9] = new Array(7, 136, 19, 21 );
        ImageArray[10] = new Array(43, 136, 15, 21);
        
        //ARMS
        ImageArray[11] = new Array(110, 2, 14, 26);
        ImageArray[12] = new Array(128, 2, 16, 21);
        ImageArray[13] = new Array(112, 64, 10, 18);
        ImageArray[14] = new Array(131, 64, 11, 15);
    
    return ImageArray;
}
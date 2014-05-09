/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var maleCharacterSpriteLocations = characterSpriteLocation();
var testMon1 = 5,
        testDistance = 0,
        testDirection = 0;
var Summon;

function testing(){
    
     if (Summon === null || typeof(Summon)==='undefined') { 
        Summon = grabSummon();     
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
    if (Summon !== null || typeof(Summon)!=='undefined') {
        ctx.drawImage(Summon[0][testDirection][testDistance][0],0,0);
    }
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var maleCharacterSpriteLocations = characterSpriteLocation();
var testMon1 = 1,
        testDistance = 0,
        testDirection = 0,
        testPalette = 0;

var gfxSummon;
var gfxBehemoth;
var gfxNastyFloater;
var gfxDragon;
var gfxCrab;


function testing(p){

//    var x = testMon1,
//            y = 0;
//
   // ctx.drawImage(colourSpellPage(true,p.champion[p.championLeader],gfxUI['SPELLBOOK+1']),(p.PortalX + 60),(p.PortalY + 201),itemJson[x].gfxD[y].width * scale,itemJson[x].gfxD[y].height * scale);
//
//writeSpellFont(spell[0][0].symbols,0,0,colourData['GREEN']);
}

function startExtendedLevel(){


    player[0].setPlayerPosition(4, 1, 22);
    towerThis = 0;
    player[0].redrawViewPort = true;

}

function startBOS(){

    player[0].setPlayerPosition(3, 6, 16);
    towerThis = 0;
    player[0].redrawViewPort = true;

}


function testSummon(){

    var tmpPalettes = [];

    var testP0 = new Array(colourData['0'],colourData['0'],colourData['7'],colourData['8']),
        testP1 = new Array(colourData['0'],colourData['8'],colourData['4'],colourData['14']),
        testP2 = new Array(colourData['0'],colourData['5'],colourData['6'],colourData['14']),
        testP3 = new Array(colourData['0'],colourData['9'],colourData['12'],colourData['11']),
        testP4 = new Array(colourData['0'],colourData['10'],colourData['11'],colourData['13']),
        testP5 = new Array(colourData['0'],colourData['11'],colourData['13'],colourData['14']),
        testP6 = new Array(colourData['0'],colourData['12'],colourData['11'],colourData['14']),
        testP7 = new Array(colourData['0'],colourData['2'],colourData['3'],colourData['14']),
        testP8 = new Array(colourData['0'],colourData['8'],colourData['4'],colourData['13']),
        testP9 = new Array(colourData['0'],colourData['5'],colourData['6'],colourData['13']),
        testP10 = new Array(colourData['0'],colourData['7'],colourData['8'],colourData['4']),
        testP11 = new Array(colourData['0'],colourData['7'],colourData['8'],colourData['13']);

        tmpPalettes.push(testP0,testP1,testP2,testP3,testP4,testP5,testP6,testP7,testP8,testP9,testP10,testP11)
        var myTmp = 6;}

//    try{
//    if (gfxCrab !== null || typeof(gfxCrab)!=='undefined') {
//
//        var testGfx = gfxSummon;
//
//        ctx.drawImage(recolourSprite(testGfx[testMon1][testDistance][testDirection], paletteData['DEFAULT_MON'], tmpPalettes[myTmp]),145*scale,25*scale,testGfx[testMon1][testDistance][testDirection].width*scale,testGfx[testMon1][testDistance][testDirection].height*scale);
//        ctx.drawImage(recolourSprite(testGfx[1][0][4], paletteData['DEFAULT_MON'], tmpPalettes[myTmp]),133*scale,24*scale,testGfx[1][0][4].width*scale,testGfx[1][0][4].height*scale);
//        ctx.drawImage(recolourSprite(testGfx[1][0][5], paletteData['DEFAULT_MON'], tmpPalettes[myTmp]),170*scale,24*scale,testGfx[1][0][5].width*scale,testGfx[1][0][5].height*scale);
//        }
//    }catch(e){}


//
//}


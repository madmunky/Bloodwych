/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var maleCharacterSpriteLocations = characterSpriteLocation();
var testMon1 = CHA_MURLOCK;


var charLoaded = false;
var characterImages = [];



function grabCharacter(cID, characterDirection, characterDistance) {
    try {
    
    if (typeof monsterPalette[cID] !== "undefined") {
        var LEG;
        var ARM;
        var TORSO;
        var HEAD;

        switch (characterDirection) {

            case 0:
                {
                    HEAD = recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][characterDistance][0], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette);
                    TORSO = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][characterDistance][0], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette);
                    ARM = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][characterDistance][0], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette);
                    LEG = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][characterDistance][0], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette);
                }
                break;
            case 3:
                {
                    HEAD = recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][characterDistance][1], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette);
                    TORSO = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][characterDistance][1], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette);
                    ARM = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][characterDistance][1], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette);
                    LEG = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][characterDistance][1], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette);
                }
                break;
            case 1:
                {
                    HEAD = recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][characterDistance][2], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette);
                    TORSO = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][characterDistance][2], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette);
                    ARM = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][characterDistance][2], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette);
                    LEG = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][characterDistance][2], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette);
                }
                break;
            case 2:
                {
                    HEAD = recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][characterDistance][3], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette);
                    TORSO = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][characterDistance][3], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette);
                    ARM = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][characterDistance][0], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette);
                    LEG = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][characterDistance][3], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette);
                }
                break;

        }

        var height = HEAD.height + TORSO.height + LEG.height,
            width = ARM.width + TORSO.width + ARM.width;

        var can = document.createElement('canvas');
        can.width = width;
        can.height = height;
        var charContext = can.getContext("2d");
        var charImageObj = new Image();
        charImageObj.width = width;
        charImageObj.height = height;
        var SPRITELOCATIONS = maleCharacterSpriteLocations;

        switch (characterDirection) {

            case 0:
                {
                    charContext.drawImage(LEG, SPRITELOCATIONS[characterDistance][0][0], SPRITELOCATIONS[characterDistance][0][1], LEG.width, LEG.height);
                    charContext.drawImage(TORSO, SPRITELOCATIONS[characterDistance][1][0], SPRITELOCATIONS[characterDistance][1][1], TORSO.width, TORSO.height);
                    charContext.drawImage(HEAD, SPRITELOCATIONS[characterDistance][2][0], SPRITELOCATIONS[characterDistance][2][1], HEAD.width, HEAD.height);
                    charContext.drawImage(flipImage(ARM), SPRITELOCATIONS[characterDistance][3][0], SPRITELOCATIONS[characterDistance][3][1], ARM.width, ARM.height);
                    charContext.drawImage(ARM, SPRITELOCATIONS[characterDistance][4][0], SPRITELOCATIONS[characterDistance][4][1], ARM.width, ARM.height);
                }
                break;
            case 3:
                {
                    charContext.drawImage(LEG, SPRITELOCATIONS[characterDistance][5][0], SPRITELOCATIONS[characterDistance][5][1], LEG.width, LEG.height);
                    charContext.drawImage(TORSO, SPRITELOCATIONS[characterDistance][6][0], SPRITELOCATIONS[characterDistance][6][1], TORSO.width, TORSO.height);
                    charContext.drawImage(flipImage(ARM), SPRITELOCATIONS[characterDistance][8][0], SPRITELOCATIONS[characterDistance][8][1], ARM.width, ARM.height);
                    charContext.drawImage(HEAD, SPRITELOCATIONS[characterDistance][7][0], SPRITELOCATIONS[characterDistance][7][1], HEAD.width, HEAD.height);
                }
                break;
            case 1:
                {
                    charContext.drawImage(LEG, SPRITELOCATIONS[characterDistance][9][0], SPRITELOCATIONS[characterDistance][9][1], LEG.width, LEG.height);
                    charContext.drawImage(TORSO, SPRITELOCATIONS[characterDistance][10][0], SPRITELOCATIONS[characterDistance][10][1], TORSO.width, TORSO.height);
                    charContext.drawImage(flipImage(ARM), SPRITELOCATIONS[characterDistance][12][0], SPRITELOCATIONS[characterDistance][12][1], ARM.width, ARM.height);
                    charContext.drawImage(HEAD, SPRITELOCATIONS[characterDistance][11][0], SPRITELOCATIONS[characterDistance][11][1], HEAD.width, HEAD.height);
                }
                break;
            case 2:
                {
                    charContext.drawImage(LEG, SPRITELOCATIONS[characterDistance][13][0], SPRITELOCATIONS[characterDistance][13][1], LEG.width, LEG.height);
                    charContext.drawImage(ARM, SPRITELOCATIONS[characterDistance][17][0], maleCharacterSpriteLocations[characterDistance][17][1], ARM.width, ARM.height);
                    charContext.drawImage(flipImage(ARM), SPRITELOCATIONS[characterDistance][16][0], SPRITELOCATIONS[characterDistance][16][1], ARM.width, ARM.height);
                    charContext.drawImage(TORSO, SPRITELOCATIONS[characterDistance][14][0], SPRITELOCATIONS[characterDistance][14][1], TORSO.width, TORSO.height);
                    charContext.drawImage(HEAD, SPRITELOCATIONS[characterDistance][15][0], SPRITELOCATIONS[characterDistance][15][1], HEAD.width, HEAD.height);
                }
                break;
        }

        charContext.save();
        charImageObj.src = can.toDataURL();
        delete LEG;
        delete ARM;
        delete TORSO;
        delete HEAD;
        return charImageObj;
    }
    } catch(e){ PrintLog("GrabCharacter ERROR: " + e.toString());}
       
}

function characterSpriteLocation() {


    var myArray = [];
    for (var x = 0; x < 4; x++) {

        if (x === 0) { //This is the DISTANCE
            myArray.push(new Array(
                //Front View
                new Array(5, 21), //LEGS
                new Array(5, 7), //BODY
                new Array(7, 0), //HEAD
                new Array(20, 9), //RIGHT ARM
                new Array(0, 9), //LEFT ARM
                //Left View
                new Array(11, 22), //LEGS
                new Array(9, 8), //BODY
                new Array(9, 0), //HEAD
                new Array(14, 10), //ARM
                //Right View
                new Array(7, 22),
                new Array(5, 8),
                new Array(5, 0),
                new Array(3, 10),
                //Rear View
                new Array(5, 22),
                new Array(5, 8),
                new Array(7, 0),
                new Array(20, 10),
                new Array(0, 10)));
        }
        if (x === 1) {
            myArray.push(new Array(
                //Front View
                new Array(3, 16),
                new Array(4,4),
                new Array(6, 0),
                new Array(17, 7),
                new Array(0, 7),
                //Left View
                new Array(7, 17),
                new Array(7, 5),
                new Array(6, 0),
                new Array(9, 7),
                //Right View
                new Array(4, 17),
                new Array(4, 5),
                new Array(4, 0),
                new Array(3, 7),
                //Rear View
                new Array(3, 17),
                new Array(4, 5),
                new Array(6, 0),
                new Array(17, 8),
                new Array(0, 8)));
        }
        if (x === 2) {
            myArray.push(new Array(
                //Front View
                new Array(3, 15),
                new Array(4, 5),
                new Array(5, 0),
                new Array(13, 6),
                new Array(0, 6),
                //Left View
                new Array(7, 15),
                new Array(7, 5),
                new Array(7, 0),
                new Array(9, 7),
                //Right View
                new Array(7, 15),
                new Array(7, 5),
                new Array(7, 0),
                new Array(5, 7),
                //Rear View
                new Array(3, 15),
                new Array(4, 5),
                new Array(5, 0),
                new Array(13, 6),
                new Array(0, 6)));
        }
        if (x === 3) {
            myArray.push(new Array(
                //Front View
                new Array(3, 13),
                new Array(4, 4),
                new Array(5, 0),
                new Array(11, 5),
                new Array(0, 5),
                //Left View
                new Array(6, 13),
                new Array(6, 4),
                new Array(7, 0),
                new Array(7, 6),
                //Right View
                new Array(8,13),
                new Array(7,4),
                new Array(8,0),
                new Array(6,6),
                //Rear View
                new Array(3,13),
                new Array(4,4),
                new Array(4,0),
                new Array(11,5),
                new Array(0,5)));
        }
    }

    

    return myArray;

}

function testing(p) {

//    try {
//        if (charLoaded) {
//            /*drawCharacter(monsterMax - 1, testDirection, testDistance + 1, p); //rosanne
//            drawCharacter(monsterMax - 1, testDirection, testDistance + 1, p); //eleanor
//            drawCharacter(monsterMax - 1, testDirection, testDistance, p); //blodwyn
//            drawCharacter(monsterMax - 1, testDirection, testDistance, p); //murlock*/
//        }
//    } catch (e) {}

}

function drawParty(p, character1, character2, character3, character4) {

    drawPerson(p, character1, CHAR_BACK_RIGHT, maleCharacterSpriteLocations, DIRECTION_NORTH, CHAR_DISTANCE_MID);
    drawPerson(p, character2, CHAR_BACK_LEFT, maleCharacterSpriteLocations, DIRECTION_NORTH, CHAR_DISTANCE_MID);
    drawPerson(p, character3, CHAR_FRONT_RIGHT, maleCharacterSpriteLocations, DIRECTION_NORTH, CHAR_DISTANCE_CLOSE);
    drawPerson(p, character4, CHAR_FRONT_LEFT, maleCharacterSpriteLocations, DIRECTION_NORTH, CHAR_DISTANCE_CLOSE);

}

function characterSpriteLocationOLD() {


    var myArray = [];
    for (var x = 0; x < 4; x++) {

        if (x === 0) {
            myArray.push(new Array(
                //Front View
                new Array(57 * scale, 39 * scale),
                new Array(57 * scale, 25 * scale),
                new Array(59 * scale, 18 * scale),
                new Array(72 * scale, 27 * scale),
                new Array(52 * scale, 27 * scale),
                //Left View
                new Array(60 * scale, 39 * scale),
                new Array(58 * scale, 25 * scale),
                new Array(58 * scale, 17 * scale),
                new Array(63 * scale, 27 * scale),
                //Right View
                new Array(60 * scale, 39 * scale),
                new Array(58 * scale, 25 * scale),
                new Array(58 * scale, 17 * scale),
                new Array(56 * scale, 27 * scale),
                //Rear View
                new Array(57 * scale, 39 * scale),
                new Array(57 * scale, 25 * scale),
                new Array(59 * scale, 17 * scale),
                new Array(72 * scale, 27 * scale),
                new Array(52 * scale, 27 * scale)));
        }
        if (x === 1) {
            myArray.push(new Array(
                //Front View
                new Array(57 * scale, 36 * scale),
                new Array(58 * scale, 24 * scale),
                new Array(60 * scale, 20 * scale),
                new Array(71 * scale, 27 * scale),
                new Array(54 * scale, 27 * scale),
                //Left View
                new Array(60 * scale, 36 * scale),
                new Array(60 * scale, 24 * scale),
                new Array(59 * scale, 19 * scale),
                new Array(62 * scale, 26 * scale),
                //Right View
                new Array(60 * scale, 36 * scale),
                new Array(60 * scale, 24 * scale),
                new Array(60 * scale, 19 * scale),
                new Array(59 * scale, 26 * scale),
                //Rear View
                new Array(56 * scale, 36 * scale),
                new Array(57 * scale, 24 * scale),
                new Array(59 * scale, 19 * scale),
                new Array(70 * scale, 27 * scale),
                new Array(53 * scale, 27 * scale)));
        }
        if (x === 2) {
            myArray.push(new Array(
                //Front View
                new Array(58 * scale, 36 * scale),
                new Array(59 * scale, 26 * scale),
                new Array(60 * scale, 21 * scale),
                new Array(68 * scale, 27 * scale),
                new Array(55 * scale, 27 * scale),
                //Left View
                new Array(61 * scale, 36 * scale),
                new Array(61 * scale, 26 * scale),
                new Array(61 * scale, 21 * scale),
                new Array(63 * scale, 28 * scale),
                //Right View
                new Array(61 * scale, 36 * scale),
                new Array(61 * scale, 26 * scale),
                new Array(61 * scale, 21 * scale),
                new Array(59 * scale, 28 * scale),
                //Rear View
                new Array(58 * scale, 36 * scale),
                new Array(59 * scale, 26 * scale),
                new Array(60 * scale, 21 * scale),
                new Array(68 * scale, 27 * scale),
                new Array(55 * scale, 27 * scale)));
        }
        if (x === 3) {
            myArray.push(new Array(
                //Front View
                new Array(60 * scale, 34 * scale),
                new Array(61 * scale, 25 * scale),
                new Array(62 * scale, 21 * scale),
                new Array(68 * scale, 26 * scale),
                new Array(57 * scale, 26 * scale),
                //Left View
                new Array(62 * scale, 34 * scale),
                new Array(62 * scale, 25 * scale),
                new Array(63 * scale, 21 * scale),
                new Array(63 * scale, 27 * scale),
                //Right View
                new Array(62 * scale, 34 * scale),
                new Array(61 * scale, 25 * scale),
                new Array(62 * scale, 21 * scale),
                new Array(60 * scale, 27 * scale),
                //Rear View
                new Array(60 * scale, 34 * scale),
                new Array(61 * scale, 25 * scale),
                new Array(61 * scale, 21 * scale),
                new Array(68 * scale, 26 * scale),
                new Array(57 * scale, 26 * scale)));
        }
    }

    return myArray;

}

function drawCharacter(mForm, characterDirection, characterDistance, player, offset) {
    if (characterDistance > -1 && typeof monster[mForm].gfx[characterDistance] !== "undefined" && typeof monster[mForm].gfx[characterDistance][characterDirection] !== "undefined") {
        var offx = 64 - Math.floor(monster[mForm].gfx[characterDistance][characterDirection].width / 2),
            offy = 41 - Math.floor(monster[mForm].gfx[characterDistance][characterDirection].height / 2);

        if (typeof offset !== "undefined") {
            offx += offset.x;
            offy += offset.y;
        }
        player.Portal.drawImage(monster[mForm].gfx[characterDistance][characterDirection], (player.PortalX + offx) * scale, (player.PortalY + offy) * scale, monster[mForm].gfx[characterDistance][characterDirection].width * scale, monster[mForm].gfx[characterDistance][characterDirection].height * scale);
    }
}

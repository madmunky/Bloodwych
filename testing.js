/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var maleCharacterSpriteLocations = characterSpriteLocation();
var testMon1 = CHA_MURLOCK;


var charLoaded = false;
var characterImages = [];


function createCharacterImages() {

    var myCharacter = [];

    for (m = 0; m < monsterPalette.length; m++) {
        var dirArray = [];
        for (dis = 0; dis < NUMBER_OF_DISTANCES; dis++) {
            for (dir = 0; dir < 4; dir++) {
                myCharacter.push(grabCharacter(m, dir, dis));
            }
            dirArray.push(myCharacter);
            myCharacter = [];
        }
        characterImages.push(dirArray);

    }
}

function grabCharacter(cID, characterDirection, characterDistance) {
    if (typeof monsterPalette[cID] !== "undefined") {
        var LEG;
        var ARM;
        var TORSO;
        var HEAD;

        switch (characterDirection) {

            case 0:
                {
                    HEAD = recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette);
                    TORSO = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette);
                    ARM = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][characterDistance][0], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette);
                    LEG = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette);
                }
                break;
            case 1:
                {
                    HEAD = recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][characterDistance][1], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette);
                    TORSO = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette);
                    ARM = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][characterDistance][1], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette);
                    LEG = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette);
                }
                break;
            case 2:
                {
                    HEAD = recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette);
                    TORSO = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette);
                    ARM = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][characterDistance][2], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette);
                    LEG = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette);
                }
                break;
            case 3:
                {
                    HEAD = recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette);
                    TORSO = recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette);
                    ARM = recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][characterDistance][0], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette);
                    LEG = recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette);
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
            case 1:
                {
                    charContext.drawImage(LEG, SPRITELOCATIONS[characterDistance][5][0], SPRITELOCATIONS[characterDistance][5][1], LEG.width, LEG.height);
                    charContext.drawImage(TORSO, SPRITELOCATIONS[characterDistance][6][0], SPRITELOCATIONS[characterDistance][6][1], TORSO.width, TORSO.height);
                    charContext.drawImage(flipImage(ARM), SPRITELOCATIONS[characterDistance][8][0], SPRITELOCATIONS[characterDistance][8][1], ARM.width, ARM.height);
                    charContext.drawImage(HEAD, SPRITELOCATIONS[characterDistance][7][0], SPRITELOCATIONS[characterDistance][7][1], HEAD.width, HEAD.height);
                }
                break;
            case 2:
                {
                    charContext.drawImage(LEG, SPRITELOCATIONS[characterDistance][9][0], SPRITELOCATIONS[characterDistance][9][1], LEG.width, LEG.height);
                    charContext.drawImage(TORSO, SPRITELOCATIONS[characterDistance][10][0], SPRITELOCATIONS[characterDistance][10][1], TORSO.width, TORSO.height);
                    charContext.drawImage(flipImage(ARM), SPRITELOCATIONS[characterDistance][12][0], SPRITELOCATIONS[characterDistance][12][1], ARM.width, ARM.height);
                    charContext.drawImage(HEAD, SPRITELOCATIONS[characterDistance][11][0], SPRITELOCATIONS[characterDistance][11][1], HEAD.width, HEAD.height);
                }
                break;
            case 3:
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
}

function characterSpriteLocation() {


    var myArray = [];
    for (var x = 0; x < 4; x++) {

        if (x === 0) {
            myArray.push(new Array(
                //Front View
                new Array(5, 39 - 18),
                new Array(5, 25 - 18),
                new Array(7, 18 - 18),
                new Array(20, 27 - 18),
                new Array(0, 27 - 18),
                //Left View
                new Array(60 - 58, 39 - 17),
                new Array(58 - 58, 25 - 17),
                new Array(58 - 58, 17 - 17),
                new Array(63 - 58, 27 - 17),
                //Right View
                new Array(60 - 56, 39 - 17),
                new Array(58 - 56, 25 - 17),
                new Array(58 - 56, 17 - 17),
                new Array(56 - 56, 27 - 17),
                //Rear View
                new Array(57 - 52, 39 - 17),
                new Array(57 - 52, 25 - 17),
                new Array(59 - 52, 17 - 17),
                new Array(72 - 52, 27 - 17),
                new Array(52 - 52, 27 - 17)));
        }
        if (x === 1) {
            myArray.push(new Array(
                //Front View
                new Array(57 - 54, 36 - 20),
                new Array(58 - 54, 24 - 20),
                new Array(60 - 54, 20 - 20),
                new Array(71 - 54, 27 - 20),
                new Array(54 - 54, 27 - 20),
                //Left View
                new Array(60 - 59, 36 - 19),
                new Array(60 - 59, 24 - 19),
                new Array(59 - 59, 19 - 19),
                new Array(62 - 59, 26 - 19),
                //Right View
                new Array(60 - 59, 36 - 19),
                new Array(60 - 59, 24 - 19),
                new Array(60 - 59, 19 - 19),
                new Array(59 - 59, 26 - 19),
                //Rear View
                new Array(56 - 53, 36 - 19),
                new Array(57 - 53, 24 - 19),
                new Array(59 - 53, 19 - 19),
                new Array(70 - 53, 27 - 19),
                new Array(53 - 53, 27 - 19)));
        }
        if (x === 2) {
            myArray.push(new Array(
                //Front View
                new Array(58 - 55, 36 - 21),
                new Array(59 - 55, 26 - 21),
                new Array(60 - 55, 21 - 21),
                new Array(68 - 55, 27 - 21),
                new Array(55 - 55, 27 - 21),
                //Left View
                new Array(61 - 61, 36 - 21),
                new Array(61 - 61, 26 - 21),
                new Array(61 - 61, 21 - 21),
                new Array(63 - 61, 28 - 21),
                //Right View
                new Array(61 - 59, 36 - 21),
                new Array(61 - 59, 26 - 21),
                new Array(61 - 59, 21 - 21),
                new Array(59 - 59, 28 - 21),
                //Rear View
                new Array(58 - 55, 36 - 21),
                new Array(59 - 55, 26 - 21),
                new Array(60 - 55, 21 - 21),
                new Array(68 - 55, 27 - 21),
                new Array(55 - 55, 27 - 21)));
        }
        if (x === 3) {
            myArray.push(new Array(
                //Front View
                new Array(60 - 57, 34 - 21),
                new Array(61 - 57, 25 - 21),
                new Array(62 - 57, 21 - 21),
                new Array(68 - 57, 26 - 21),
                new Array(57 - 57, 26 - 21),
                //Left View
                new Array(62 - 62, 34 - 21),
                new Array(62 - 62, 25 - 21),
                new Array(63 - 62, 21 - 21),
                new Array(63 - 62, 27 - 21),
                //Right View
                new Array(62 - 60, 34 - 21),
                new Array(61 - 60, 25 - 21),
                new Array(62 - 60, 21 - 21),
                new Array(60 - 60, 27 - 21),
                //Rear View
                new Array(60 - 57, 34 - 21),
                new Array(61 - 57, 25 - 21),
                new Array(61 - 57, 21 - 21),
                new Array(68 - 57, 26 - 21),
                new Array(57 - 57, 26 - 21)));
        }
    }

    return myArray;

}

function testing(p) {

    // drawPerson(p, testMon3, CHAR_BACK_LEFT, maleCharacterSpriteLocations,DIRECTION_EAST,CHAR_DISTANCE_FAR);
    // drawPerson(p, testMon3, CHAR_BACK_RIGHT, maleCharacterSpriteLocations,DIRECTION_SOUTH,CHAR_DISTANCE_FAR);
    
    
    
    try {
        if (charLoaded) {
            drawCharacter(76,testDirection,testDistance+1,p,CHAR_BACK_RIGHT); //rosanne
            drawCharacter(75,testDirection,testDistance+1,p,CHAR_BACK_LEFT); //eleanor
            drawCharacter(73,testDirection,testDistance,p,CHAR_FRONT_LEFT); //blodwyn
            drawCharacter(74,testDirection,testDistance,p,CHAR_FRONT_RIGHT); //murlock
        }
    } catch (e) {}

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

function drawCharacter(mForm, characterDirection, characterDistance, player, position) {

    var CHAR_OFFSETX = 0,
        CHAR_OFFSETY = 0;

    switch (position) {

        case CHAR_FRONT_LEFT:
            {
                CHAR_OFFSETX = 31 * scale;
                CHAR_OFFSETY = 18 * scale;
            };
            break
        case CHAR_FRONT_RIGHT:
            {
                CHAR_OFFSETX = 72 * scale;
                CHAR_OFFSETY = 18 * scale;
            };
            break
        case CHAR_FRONT_SOLO:
            {
                CHAR_OFFSETX = 51 * scale;
                CHAR_OFFSETY = 18 * scale;
            };
            break
        case CHAR_BACK_LEFT:
            {
                CHAR_OFFSETX = 37 * scale;
                CHAR_OFFSETY = 20 * scale;
            };
            break
        case CHAR_BACK_RIGHT:
            {
                CHAR_OFFSETX = 70 * scale;
                CHAR_OFFSETY = 20 * scale;
            };
            break
    }
    try {
        ctx.drawImage(monster[mForm].gfx[characterDistance][characterDirection], player.PortalX + CHAR_OFFSETX, player.PortalY + CHAR_OFFSETY, monster[mForm].gfx[characterDistance][characterDirection].width * scale, monster[mForm].gfx[characterDistance][characterDirection].height * scale);
       } catch (e) {
        PrintLog("Error drawCharacter:" + e.toString());
    };


}

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var maleCharacterSpriteLocations = characterSpriteLocation();
var testMon1 = CHA_MEGRIM;
var testMon2 = CHA_MURLOCK;
var testDirection = 3,
    testDistance = 0;


function testing() {

    drawPerson(testMon1, CHAR_SOLO, maleCharacterSpriteLocations);
    //drawPerson(testMon2,CHAR_FRONT_RIGHT,maleCharacterSpriteLocations);

}

function drawPerson(cID, POSITION, spriteLocations) {
    try{
    if (typeof monsterPalette[cID] !== "undefined" && characterGfx.length > 0) {
        switch (testDirection) {

            case 0:
                {
                    drawCharacter(recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][testDistance][testDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][testDistance][testDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][testDistance][0], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][testDistance][testDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette), 
                        POSITION, testDirection, spriteLocations);
                }
                break;
            case 1:
                {
                    drawCharacter(recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][testDistance][1], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][testDistance][testDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][testDistance][1], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][testDistance][testDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette), 
                        POSITION, testDirection, spriteLocations);
                }
                break;
            case 2:
                {
                    drawCharacter(recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][testDistance][testDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][testDistance][testDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][testDistance][2], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][testDistance][testDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette), 
                        POSITION, testDirection, spriteLocations);
                }
                break;
            case 3:
                {
                    drawCharacter(recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][testDistance][testDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][testDistance][testDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][testDistance][0], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][testDistance][testDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette), 
                        POSITION, testDirection, spriteLocations);
                }
                break;

        }
    }}catch(e){};

}

function characterSpriteLocation() {


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
                new Array(61 * scale, 36 * scale),
                new Array(61 * scale, 24 * scale),
                new Array(60 * scale, 19 * scale),
                new Array(63 * scale, 26 * scale),
                //Right View
                new Array(61 * scale, 36 * scale),
                new Array(61 * scale, 24 * scale),
                new Array(61 * scale, 19 * scale),
                new Array(60 * scale, 26 * scale),
                //Rear View
                new Array(57 * scale, 36 * scale),
                new Array(58 * scale, 24 * scale),
                new Array(60 * scale, 20 * scale),
                new Array(71 * scale, 27 * scale),
                new Array(54 * scale, 27 * scale)));
        }
        if (x === 2) {
            myArray.push(new Array(
                //Front View
                new Array(59 * scale, 36 * scale),
                new Array(60 * scale, 26 * scale),
                new Array(61 * scale, 22 * scale),
                new Array(69 * scale, 27 * scale),
                new Array(56 * scale, 27 * scale),
                //Left View
                new Array(62 * scale, 36 * scale),
                new Array(62 * scale, 26 * scale),
                new Array(62 * scale, 21 * scale),
                new Array(64 * scale, 28 * scale),
                //Right View
                new Array(62 * scale, 36 * scale),
                new Array(62 * scale, 26 * scale),
                new Array(62 * scale, 21 * scale),
                new Array(60 * scale, 28 * scale),
                //Rear View
                new Array(59 * scale, 36 * scale),
                new Array(60 * scale, 26 * scale),
                new Array(61 * scale, 21 * scale),
                new Array(69 * scale, 27 * scale),
                new Array(56 * scale, 27 * scale)));
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

function drawCharacter(HEAD, TORSO, ARM, LEG, POSITION, testDirection, SPRITELOCATIONS) {

    var CHAR_OFFSETX = 0,
        CHAR_OFFSETY = 0;

    switch (POSITION) {

        case CHAR_FRONT_LEFT:
            {
                CHAR_OFFSETX = -65;
            };
            break
        case CHAR_FRONT_RIGHT:
            {
                CHAR_OFFSETX = 65;
            };
            break
        case CHAR_SOLO:
            {
                CHAR_OFFSETX = 0;
            };
            break

    }
    try {


        switch (testDirection) {

            case 0:
                {
                   ctx.drawImage(LEG, SPRITELOCATIONS[testDistance][0][0] + CHAR_OFFSETX, SPRITELOCATIONS[testDistance][0][1] + CHAR_OFFSETY, LEG.width * scale, LEG.height * scale);
                   
                   ctx.drawImage(TORSO, SPRITELOCATIONS[testDistance][1][0] + CHAR_OFFSETX, SPRITELOCATIONS[testDistance][1][1] + CHAR_OFFSETY, TORSO.width * scale, TORSO.height * scale);
                   ctx.drawImage(HEAD, SPRITELOCATIONS[testDistance][2][0] + CHAR_OFFSETX, SPRITELOCATIONS[testDistance][2][1] + CHAR_OFFSETY, HEAD.width * scale, HEAD.height * scale);
                   ctx.drawImage(flipImage(ARM), SPRITELOCATIONS[testDistance][3][0] + CHAR_OFFSETX, SPRITELOCATIONS[testDistance][3][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                   
                   ctx.drawImage(ARM, SPRITELOCATIONS[testDistance][4][0] + CHAR_OFFSETX, SPRITELOCATIONS[testDistance][4][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                }
                break;
            case 1:
                {
                    ctx.drawImage(LEG, SPRITELOCATIONS[testDistance][5][0] + CHAR_OFFSETX, SPRITELOCATIONS[testDistance][5][1] + CHAR_OFFSETY, LEG.width * scale, LEG.height * scale);
                    ctx.drawImage(TORSO, SPRITELOCATIONS[testDistance][6][0] + CHAR_OFFSETX, SPRITELOCATIONS[testDistance][6][1] + CHAR_OFFSETY, TORSO.width * scale, TORSO.height * scale);
                    ctx.drawImage(flipImage(ARM), SPRITELOCATIONS[testDistance][8][0] + CHAR_OFFSETX, SPRITELOCATIONS[testDistance][8][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                    ctx.drawImage(HEAD, SPRITELOCATIONS[testDistance][7][0] + CHAR_OFFSETX, SPRITELOCATIONS[testDistance][7][1] + CHAR_OFFSETY, HEAD.width * scale, HEAD.height * scale);
                }
                break;
            case 2:
                {
                    ctx.drawImage(LEG, SPRITELOCATIONS[testDistance][9][0] + CHAR_OFFSETX, SPRITELOCATIONS[testDistance][9][1] + CHAR_OFFSETY, LEG.width * scale, LEG.height * scale);
                    ctx.drawImage(TORSO, SPRITELOCATIONS[testDistance][10][0] + CHAR_OFFSETX, SPRITELOCATIONS[testDistance][10][1] + CHAR_OFFSETY, TORSO.width * scale, TORSO.height * scale);                    
                    ctx.drawImage(flipImage(ARM), SPRITELOCATIONS[testDistance][12][0] + CHAR_OFFSETX, SPRITELOCATIONS[testDistance][12][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                    ctx.drawImage(HEAD, SPRITELOCATIONS[testDistance][11][0] + CHAR_OFFSETX, SPRITELOCATIONS[testDistance][11][1] + CHAR_OFFSETY, HEAD.width * scale, HEAD.height * scale);
                }
                break;
            case 3:
                {
                    ctx.drawImage(LEG, SPRITELOCATIONS[testDistance][13][0] + CHAR_OFFSETX, SPRITELOCATIONS[testDistance][13][1] + CHAR_OFFSETY, LEG.width * scale, LEG.height * scale);
                    
                    
                    ctx.drawImage(ARM, SPRITELOCATIONS[testDistance][17][0] + CHAR_OFFSETX, maleCharacterSpriteLocations[testDistance][17][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                    ctx.drawImage(flipImage(ARM), SPRITELOCATIONS[testDistance][16][0] + CHAR_OFFSETX, SPRITELOCATIONS[testDistance][16][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                    ctx.drawImage(TORSO, SPRITELOCATIONS[testDistance][14][0] + CHAR_OFFSETX, SPRITELOCATIONS[testDistance][14][1] + CHAR_OFFSETY, TORSO.width * scale, TORSO.height * scale);
                    ctx.drawImage(HEAD, SPRITELOCATIONS[testDistance][15][0] + CHAR_OFFSETX, SPRITELOCATIONS[testDistance][15][1] + CHAR_OFFSETY, HEAD.width * scale, HEAD.height * scale);
                }
                break;
        }

    } catch (e) {
        PrintLog("Error drawCharacter:" + e.toString());
    };


}

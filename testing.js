/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var maleCharacterSpriteLocations = characterSpriteLocation();
var testMon1 = CHA_MURLOCK;
var testMon2 = CHA_THAI_CHANG;
var testMon3 = CHA_ZASTAPH;
var testMon4 = CHA_ASTROTH;
//var characterDirection = 0,
//    characterDistance = 0;


function testing(p) {
    
    drawPerson(p, testMon3, CHAR_BACK_RIGHT, maleCharacterSpriteLocations,DIRECTION_NORTH,CHAR_DISTANCE_MID);
    drawPerson(p, testMon4, CHAR_BACK_LEFT,maleCharacterSpriteLocations,DIRECTION_NORTH,CHAR_DISTANCE_MID);
    drawPerson(p, testMon1, CHAR_FRONT_RIGHT, maleCharacterSpriteLocations,DIRECTION_NORTH,CHAR_DISTANCE_CLOSE);
    drawPerson(p, testMon2, CHAR_FRONT_LEFT,maleCharacterSpriteLocations,DIRECTION_NORTH,CHAR_DISTANCE_CLOSE);

}

function drawParty(p, character1,character2,character3,character4) {
    
    drawPerson(p, character1, CHAR_BACK_RIGHT, maleCharacterSpriteLocations,DIRECTION_NORTH,CHAR_DISTANCE_MID);
    drawPerson(p, character2, CHAR_BACK_LEFT,maleCharacterSpriteLocations,DIRECTION_NORTH,CHAR_DISTANCE_MID);
    drawPerson(p, character3, CHAR_FRONT_RIGHT, maleCharacterSpriteLocations,DIRECTION_NORTH,CHAR_DISTANCE_CLOSE);
    drawPerson(p, character4, CHAR_FRONT_LEFT,maleCharacterSpriteLocations,DIRECTION_NORTH,CHAR_DISTANCE_CLOSE);

}

function drawPerson(p, cID, POSITION, spriteLocations,characterDirection,characterDistance) {
    try{
    if (typeof monsterPalette[cID] !== "undefined" && characterGfx.length > 0) {
        switch (characterDirection) {

            case 0:
                {
                    drawCharacter(recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][characterDistance][0], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette), 
                        POSITION, characterDirection, spriteLocations, characterDistance, p);
                }
                break;
            case 1:
                {
                    drawCharacter(recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][characterDistance][1], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][characterDistance][1], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette), 
                        POSITION, characterDirection, spriteLocations, characterDistance, p);
                }
                break;
            case 2:
                {
                    drawCharacter(recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][characterDistance][2], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette), 
                        POSITION, characterDirection, spriteLocations, characterDistance ,p);
                }
                break;
            case 3:
                {
                    drawCharacter(recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].headPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].torsoPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][characterDistance][0], MON_PALETTE_DEFAULT, monsterPalette[cID].armPalette),
                        recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][characterDistance][characterDirection], MON_PALETTE_DEFAULT, monsterPalette[cID].legPalette), 
                        POSITION, characterDirection, spriteLocations, characterDistance ,p);
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

function drawCharacter(HEAD, TORSO, ARM, LEG, POSITION, characterDirection, SPRITELOCATIONS , characterDistance, p) {

    var CHAR_OFFSETX = 0,
        CHAR_OFFSETY = 0;

    switch (POSITION) {

        case CHAR_FRONT_LEFT:{CHAR_OFFSETX = -22*scale;};break
        case CHAR_FRONT_RIGHT:{CHAR_OFFSETX = 21*scale;};break
        case CHAR_SOLO:{CHAR_OFFSETX = 0;};break
        case CHAR_BACK_LEFT:{CHAR_OFFSETX = -16*scale;CHAR_OFFSETY =1*scale;};break
        case CHAR_BACK_RIGHT:{CHAR_OFFSETX = 16*scale;CHAR_OFFSETY =1*scale;};break
    }
    try {


        switch (characterDirection) {

            case 0:
                {
                   ctx.drawImage(LEG, p.PortalX +SPRITELOCATIONS[characterDistance][0][0] + CHAR_OFFSETX, p.PortalY +SPRITELOCATIONS[characterDistance][0][1] + CHAR_OFFSETY, LEG.width * scale, LEG.height * scale);
                   ctx.drawImage(TORSO, p.PortalX +SPRITELOCATIONS[characterDistance][1][0] + CHAR_OFFSETX, p.PortalY +SPRITELOCATIONS[characterDistance][1][1] + CHAR_OFFSETY, TORSO.width * scale, TORSO.height * scale);
                   ctx.drawImage(HEAD, p.PortalX +SPRITELOCATIONS[characterDistance][2][0] + CHAR_OFFSETX, p.PortalY +SPRITELOCATIONS[characterDistance][2][1] + CHAR_OFFSETY, HEAD.width * scale, HEAD.height * scale);
                   ctx.drawImage(flipImage(ARM), p.PortalX +SPRITELOCATIONS[characterDistance][3][0] + CHAR_OFFSETX, p.PortalY +SPRITELOCATIONS[characterDistance][3][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                   ctx.drawImage(ARM, p.PortalX +SPRITELOCATIONS[characterDistance][4][0] + CHAR_OFFSETX, p.PortalY +SPRITELOCATIONS[characterDistance][4][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                }
                break;
            case 1:
                {
                    ctx.drawImage(LEG, p.PortalX +SPRITELOCATIONS[characterDistance][5][0] + CHAR_OFFSETX, p.PortalY +SPRITELOCATIONS[characterDistance][5][1] + CHAR_OFFSETY, LEG.width * scale, LEG.height * scale);
                    ctx.drawImage(TORSO, p.PortalX +SPRITELOCATIONS[characterDistance][6][0] + CHAR_OFFSETX, p.PortalY +SPRITELOCATIONS[characterDistance][6][1] + CHAR_OFFSETY, TORSO.width * scale, TORSO.height * scale);
                    ctx.drawImage(flipImage(ARM), p.PortalX +SPRITELOCATIONS[characterDistance][8][0] + CHAR_OFFSETX, p.PortalY +SPRITELOCATIONS[characterDistance][8][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                    ctx.drawImage(HEAD, p.PortalX +SPRITELOCATIONS[characterDistance][7][0] + CHAR_OFFSETX, p.PortalY +SPRITELOCATIONS[characterDistance][7][1] + CHAR_OFFSETY, HEAD.width * scale, HEAD.height * scale);
                }
                break;
            case 2:
                {
                    ctx.drawImage(LEG, p.PortalX +SPRITELOCATIONS[characterDistance][9][0] + CHAR_OFFSETX, p.PortalY +SPRITELOCATIONS[characterDistance][9][1] + CHAR_OFFSETY, LEG.width * scale, LEG.height * scale);
                    ctx.drawImage(TORSO, p.PortalX +SPRITELOCATIONS[characterDistance][10][0] + CHAR_OFFSETX, p.PortalY +SPRITELOCATIONS[characterDistance][10][1] + CHAR_OFFSETY, TORSO.width * scale, TORSO.height * scale);                    
                    ctx.drawImage(flipImage(ARM), p.PortalX +SPRITELOCATIONS[characterDistance][12][0] + CHAR_OFFSETX, p.PortalY +SPRITELOCATIONS[characterDistance][12][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                    ctx.drawImage(HEAD, p.PortalX +SPRITELOCATIONS[characterDistance][11][0] + CHAR_OFFSETX, p.PortalY +SPRITELOCATIONS[characterDistance][11][1] + CHAR_OFFSETY, HEAD.width * scale, HEAD.height * scale);
                }
                break;
            case 3:
                {
                    ctx.drawImage(LEG, p.PortalX +SPRITELOCATIONS[characterDistance][13][0] + CHAR_OFFSETX, p.PortalY +SPRITELOCATIONS[characterDistance][13][1] + CHAR_OFFSETY, LEG.width * scale, LEG.height * scale);
                    ctx.drawImage(ARM, p.PortalX +SPRITELOCATIONS[characterDistance][17][0] + CHAR_OFFSETX, maleCharacterSpriteLocations[characterDistance][17][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                    ctx.drawImage(flipImage(ARM), p.PortalX +SPRITELOCATIONS[characterDistance][16][0] + CHAR_OFFSETX, p.PortalY +SPRITELOCATIONS[characterDistance][16][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                    ctx.drawImage(TORSO, p.PortalX +SPRITELOCATIONS[characterDistance][14][0] + CHAR_OFFSETX, p.PortalY +SPRITELOCATIONS[characterDistance][14][1] + CHAR_OFFSETY, TORSO.width * scale, TORSO.height * scale);
                    ctx.drawImage(HEAD, p.PortalX +SPRITELOCATIONS[characterDistance][15][0] + CHAR_OFFSETX, p.PortalY +SPRITELOCATIONS[characterDistance][15][1] + CHAR_OFFSETY, HEAD.width * scale, HEAD.height * scale);
                }
                break;
        }

    } catch (e) {
        PrintLog("Error drawCharacter:" + e.toString());
    };


}

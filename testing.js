/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var maleCharacterSpriteLocations = characterSpriteLocation();

function testing() {

    if (DIRECTION > 3) {
        DIRECTION = 0;
    };
    if (DIRECTION < 0) {
        DIRECTION = 3;
    }

    var mon1 = CHA_MURLOCK;
    var mon2 = CHA_BALDRICK;

 drawPerson(mon1,CHAR_FRONT_LEFT,maleCharacterSpriteLocations);
 drawPerson(mon2,CHAR_FRONT_RIGHT,maleCharacterSpriteLocations);
 
}

function drawPerson(cID,POSITION,spriteLocations){
    
    drawCharacter(recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][DISTANCE][DIRECTION],MON_PALETTE_DEFAULT,monsterPalette[cID].headPalette),
            recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][DISTANCE][DIRECTION],MON_PALETTE_DEFAULT,monsterPalette[cID].torsoPalette),
            recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][DISTANCE][DIRECTION],MON_PALETTE_DEFAULT,monsterPalette[cID].armPalette),
            recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][DISTANCE][DIRECTION],MON_PALETTE_DEFAULT,monsterPalette[cID].legPalette),POSITION, DIRECTION,spriteLocations);
      
}

function characterSpriteLocation() {


    var myArray = [];
    for (x = 0; x < 4; x++) {

        if (x === 0) {
            myArray.push(new Array(
                //Front View
                new Array(170, 116),
                new Array(169, 74),
                new Array(175, 53),
                new Array(202, 80),
                new Array(154, 80),
                //Left View
                new Array(182, 116),
                new Array(174, 74),
                new Array(174, 51),
                new Array(185, 82),
                //Right View
                new Array(154, 116),
                new Array(164, 74),
                new Array(174, 51),
                new Array(172, 82),
                //Rear View
                new Array(170, 116), //Leg
                new Array(170, 74), //Torso                            
                new Array(176, 51), //Head
                new Array(155, 82), //Left Arm
                new Array(201, 82))); //Right Arm
        }
        if (x === 1) {
            myArray.push(new Array(
                //Front View
                new Array(172, 110),
                new Array(175, 74),
                new Array(181, 53),
                new Array(205, 80),
                new Array(163, 80),
                //Left View
                new Array(182, 110),
                new Array(180, 74),
                new Array(183, 53),
                new Array(192, 75),
                //Right View
                new Array(156, 110),
                new Array(162, 74),
                new Array(170, 53),
                new Array(168, 75),
                //Rear View
                new Array(172, 110), //Leg
                new Array(175, 74), //Torso                            
                new Array(181, 53), //Head
                new Array(163, 80), //Left Arm
                new Array(205, 80))); //Right Arm
        }
        if (x === 2) {
            myArray.push(new Array(
                //Front View
                new Array(177, 110),
                new Array(180, 80),
                new Array(183, 61),
                new Array(204, 86),
                new Array(168, 88),
                //Left View
                new Array(184, 110),
                new Array(181, 80),
                new Array(185, 62),
                new Array(194, 87),
                //Right View
                new Array(162, 110),
                new Array(168, 80),
                new Array(172, 62),
                new Array(173, 87),
                //Rear View
                new Array(177, 110),
                new Array(180, 80),
                new Array(183, 61),
                new Array(168, 86),
                new Array(204, 86))); //Right Arm
        }
        if (x === 3) {
            myArray.push(new Array(
                //Front View
                new Array(176, 104),
                new Array(179, 86),
                new Array(185, 68),
                new Array(203, 75),
                new Array(173, 78),
                //Left View
                new Array(194, 110),
                new Array(192, 74),
                new Array(195, 53),
                new Array(204, 75),
                //Right View
                new Array(168, 110),
                new Array(174, 74),
                new Array(182, 53),
                new Array(180, 75),
                //Rear View
                new Array(176, 104),
                new Array(181, 86),
                new Array(182, 74),
                new Array(172, 72),
                new Array(199, 72))); //Right Arm
        }
    }

    return myArray;

}

function drawCharacter(HEAD, TORSO, ARM, LEG, POSITION, DIRECTION,SPRITELOCATIONS) {

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
        
        
        switch (DIRECTION) {

            case 0:
                {
                    ctx.drawImage(LEG, SPRITELOCATIONS[DISTANCE][0][0] + CHAR_OFFSETX, SPRITELOCATIONS[DISTANCE][0][1] + CHAR_OFFSETY, LEG.width * scale, LEG.height * scale);
                    ctx.drawImage(TORSO, SPRITELOCATIONS[DISTANCE][1][0] + CHAR_OFFSETX, SPRITELOCATIONS[DISTANCE][1][1] + CHAR_OFFSETY, TORSO.width * scale, TORSO.height * scale);
                    ctx.drawImage(HEAD, SPRITELOCATIONS[DISTANCE][2][0] + CHAR_OFFSETX, SPRITELOCATIONS[DISTANCE][2][1] + CHAR_OFFSETY, HEAD.width * scale, HEAD.height * scale);
                    ctx.drawImage(flipImage(ARM), SPRITELOCATIONS[DISTANCE][3][0] + CHAR_OFFSETX, SPRITELOCATIONS[DISTANCE][3][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                    ctx.drawImage(ARM, SPRITELOCATIONS[DISTANCE][4][0] + CHAR_OFFSETX, SPRITELOCATIONS[DISTANCE][4][1] + CHAR_OFFSETY - DISTANCE, ARM.width * scale, ARM.height * scale);
                }
                break;
            case 1:
                {
                    ctx.drawImage(LEG, SPRITELOCATIONS[DISTANCE][5][0] + CHAR_OFFSETX, SPRITELOCATIONS[DISTANCE][5][1] + CHAR_OFFSETY, LEG.width * scale, LEG.height * scale);
                    ctx.drawImage(TORSO, SPRITELOCATIONS[DISTANCE][6][0] + CHAR_OFFSETX, SPRITELOCATIONS[DISTANCE][6][1] + CHAR_OFFSETY, TORSO.width * scale, TORSO.height * scale);
                    ctx.drawImage(HEAD, SPRITELOCATIONS[DISTANCE][7][0] + CHAR_OFFSETX, SPRITELOCATIONS[DISTANCE][7][1] + CHAR_OFFSETY, HEAD.width * scale, HEAD.height * scale);
                    ctx.drawImage(flipImage(ARM), SPRITELOCATIONS[DISTANCE][8][0] + CHAR_OFFSETX, SPRITELOCATIONS[DISTANCE][8][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                }
                break;
            case 2:
                {
                    ctx.drawImage(LEG, SPRITELOCATIONS[DISTANCE][9][0] + CHAR_OFFSETX, SPRITELOCATIONS[DISTANCE][9][1] + CHAR_OFFSETY, LEG.width * scale, LEG.height * scale);
                    ctx.drawImage(TORSO, SPRITELOCATIONS[DISTANCE][10][0] + CHAR_OFFSETX, SPRITELOCATIONS[DISTANCE][10][1] + CHAR_OFFSETY, TORSO.width * scale, TORSO.height * scale);
                    ctx.drawImage(HEAD, SPRITELOCATIONS[DISTANCE][11][0] + CHAR_OFFSETX, SPRITELOCATIONS[DISTANCE][11][1] + CHAR_OFFSETY, HEAD.width * scale, HEAD.height * scale);
                    ctx.drawImage(flipImage(ARM), SPRITELOCATIONS[DISTANCE][12][0] + CHAR_OFFSETX, SPRITELOCATIONS[DISTANCE][12][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                }
                break;
            case 3:
                {
                    ctx.drawImage(LEG, SPRITELOCATIONS[DISTANCE][13][0] + CHAR_OFFSETX, SPRITELOCATIONS[DISTANCE][13][1] + CHAR_OFFSETY, LEG.width * scale, LEG.height * scale);
                    ctx.drawImage(TORSO, SPRITELOCATIONS[DISTANCE][14][0] + CHAR_OFFSETX, SPRITELOCATIONS[DISTANCE][14][1] + CHAR_OFFSETY, TORSO.width * scale, TORSO.height * scale);
                    ctx.drawImage(HEAD, SPRITELOCATIONS[DISTANCE][15][0] + CHAR_OFFSETX, SPRITELOCATIONS[DISTANCE][15][1] + CHAR_OFFSETY, HEAD.width * scale, HEAD.height * scale);
                    ctx.drawImage(flipImage(ARM), SPRITELOCATIONS[DISTANCE][17][0] + CHAR_OFFSETX, SPRITELOCATIONS[DISTANCE][17][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                    ctx.drawImage(ARM, SPRITELOCATIONS[DISTANCE][16][0] + CHAR_OFFSETX, maleCharacterSpriteLocations[DISTANCE][16][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                }
                break;
        }
        
    } catch (e) {
        PrintLog("Error drawCharacter:" + e.toString());
    };


}

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var maleCharacterSpriteLocations = characterSpriteLocation();
var Mon1 = CHA_THAI_CHANG;
var Mon2 = CHA_MURLOCK;
var Direction = 0,
    Distance = 0;


function testing() {

 drawPerson(Mon1,CHAR_SOLO,maleCharacterSpriteLocations);
 //drawPerson(Mon2,CHAR_FRONT_RIGHT,maleCharacterSpriteLocations);
 
}

function drawPerson(cID,POSITION,spriteLocations){
    
    switch (Direction) {
        
        case 0:{drawCharacter(recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][Distance][Direction],MON_PALETTE_DEFAULT,monsterPalette[cID].headPalette),
                              recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][Distance][Direction],MON_PALETTE_DEFAULT,monsterPalette[cID].torsoPalette),
                              recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][Distance][0],MON_PALETTE_DEFAULT,monsterPalette[cID].armPalette),
                              recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][Distance][Direction],MON_PALETTE_DEFAULT,monsterPalette[cID].legPalette),POSITION, Direction,spriteLocations);}break;
        case 1:{drawCharacter(recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][Distance][1],MON_PALETTE_DEFAULT,monsterPalette[cID].headPalette),
                              recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][Distance][Direction],MON_PALETTE_DEFAULT,monsterPalette[cID].torsoPalette),
                              recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][Distance][1],MON_PALETTE_DEFAULT,monsterPalette[cID].armPalette),
                              recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][Distance][Direction],MON_PALETTE_DEFAULT,monsterPalette[cID].legPalette),POSITION, Direction,spriteLocations);}break;
        case 2:{drawCharacter(recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][Distance][Direction],MON_PALETTE_DEFAULT,monsterPalette[cID].headPalette),
                              recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][Distance][Direction],MON_PALETTE_DEFAULT,monsterPalette[cID].torsoPalette),
                              recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][Distance][2],MON_PALETTE_DEFAULT,monsterPalette[cID].armPalette),
                              recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][Distance][Direction],MON_PALETTE_DEFAULT,monsterPalette[cID].legPalette),POSITION, Direction,spriteLocations);}break;
        case 3:{drawCharacter(recolourSprite(characterGfx[IMAGE_CHA_HEAD][monsterPalette[cID].head][Distance][Direction],MON_PALETTE_DEFAULT,monsterPalette[cID].headPalette),
                              recolourSprite(characterGfx[IMAGE_CHA_TORSO][monsterPalette[cID].torso][Distance][Direction],MON_PALETTE_DEFAULT,monsterPalette[cID].torsoPalette),
                              recolourSprite(characterGfx[IMAGE_CHA_ARM][monsterPalette[cID].arm][Distance][0],MON_PALETTE_DEFAULT,monsterPalette[cID].armPalette),
                              recolourSprite(characterGfx[IMAGE_CHA_LEG][monsterPalette[cID].leg][Distance][Direction],MON_PALETTE_DEFAULT,monsterPalette[cID].legPalette),POSITION, Direction,spriteLocations);}break;
            
    }
    

}

function characterSpriteLocation() {


    var myArray = [];
    for (x = 0; x < 4; x++) {

        if (x === 0) {
            myArray.push(new Array(
                //Front View
                new Array(57*scale, 39*scale),
                new Array(57*scale, 25*scale),
                new Array(59*scale, 19*scale),
                new Array(68*scale, 27*scale),
                new Array(52*scale, 27*scale),
                //Left View
                new Array(60*scale, 39*scale),
                new Array(58*scale, 25*scale),
                new Array(57*scale, 19*scale),
                new Array(61*scale, 27*scale),
                //Right View
                new Array(55*scale, 39*scale),
                new Array(58*scale, 25*scale),
                new Array(62*scale, 19*scale),
                new Array(61*scale, 27*scale),
                //Rear View
                new Array(57*scale, 39*scale),
                new Array(57*scale, 25*scale),
                new Array(59*scale, 19*scale),
                new Array(68*scale, 27*scale),
                new Array(52*scale, 27*scale)))
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

function drawCharacter(HEAD, TORSO, ARM, LEG, POSITION, Direction,SPRITELOCATIONS) {

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
        
        
        switch (Direction) {

            case 0:
                {
                    ctx.drawImage(LEG, SPRITELOCATIONS[Distance][0][0] + CHAR_OFFSETX, SPRITELOCATIONS[Distance][0][1] + CHAR_OFFSETY, LEG.width * scale, LEG.height * scale);
                    ctx.drawImage(TORSO, SPRITELOCATIONS[Distance][1][0] + CHAR_OFFSETX, SPRITELOCATIONS[Distance][1][1] + CHAR_OFFSETY, TORSO.width * scale, TORSO.height * scale);
                    ctx.drawImage(HEAD, SPRITELOCATIONS[Distance][2][0] + CHAR_OFFSETX, SPRITELOCATIONS[Distance][2][1] + CHAR_OFFSETY, HEAD.width * scale, HEAD.height * scale);
                    ctx.drawImage(flipImage(ARM), SPRITELOCATIONS[Distance][3][0] + CHAR_OFFSETX, SPRITELOCATIONS[Distance][3][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                    ctx.drawImage(ARM, SPRITELOCATIONS[Distance][4][0] + CHAR_OFFSETX, SPRITELOCATIONS[Distance][4][1] + CHAR_OFFSETY - Distance, ARM.width * scale, ARM.height * scale);
                }
                break;
            case 1:
                {
                    ctx.drawImage(LEG, SPRITELOCATIONS[Distance][5][0] + CHAR_OFFSETX, SPRITELOCATIONS[Distance][5][1] + CHAR_OFFSETY, LEG.width * scale, LEG.height * scale);
                    ctx.drawImage(TORSO, SPRITELOCATIONS[Distance][6][0] + CHAR_OFFSETX, SPRITELOCATIONS[Distance][6][1] + CHAR_OFFSETY, TORSO.width * scale, TORSO.height * scale);
                    ctx.drawImage(HEAD, SPRITELOCATIONS[Distance][7][0] + CHAR_OFFSETX, SPRITELOCATIONS[Distance][7][1] + CHAR_OFFSETY, HEAD.width * scale, HEAD.height * scale);
                    ctx.drawImage(flipImage(ARM), SPRITELOCATIONS[Distance][8][0] + CHAR_OFFSETX, SPRITELOCATIONS[Distance][8][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                }
                break;
            case 2:
                {
                    ctx.drawImage(LEG, SPRITELOCATIONS[Distance][9][0] + CHAR_OFFSETX, SPRITELOCATIONS[Distance][9][1] + CHAR_OFFSETY, LEG.width * scale, LEG.height * scale);
                    ctx.drawImage(TORSO, SPRITELOCATIONS[Distance][10][0] + CHAR_OFFSETX, SPRITELOCATIONS[Distance][10][1] + CHAR_OFFSETY, TORSO.width * scale, TORSO.height * scale);
                    ctx.drawImage(HEAD, SPRITELOCATIONS[Distance][11][0] + CHAR_OFFSETX, SPRITELOCATIONS[Distance][11][1] + CHAR_OFFSETY, HEAD.width * scale, HEAD.height * scale);
                    ctx.drawImage(flipImage(ARM), SPRITELOCATIONS[Distance][12][0] + CHAR_OFFSETX, SPRITELOCATIONS[Distance][12][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                }
                break;
            case 3:
                {
                    ctx.drawImage(LEG, SPRITELOCATIONS[Distance][13][0] + CHAR_OFFSETX, SPRITELOCATIONS[Distance][13][1] + CHAR_OFFSETY, LEG.width * scale, LEG.height * scale);
                    ctx.drawImage(TORSO, SPRITELOCATIONS[Distance][14][0] + CHAR_OFFSETX, SPRITELOCATIONS[Distance][14][1] + CHAR_OFFSETY, TORSO.width * scale, TORSO.height * scale);
                    ctx.drawImage(HEAD, SPRITELOCATIONS[Distance][15][0] + CHAR_OFFSETX, SPRITELOCATIONS[Distance][15][1] + CHAR_OFFSETY, HEAD.width * scale, HEAD.height * scale);
                    ctx.drawImage(ARM, SPRITELOCATIONS[Distance][17][0] + CHAR_OFFSETX, maleCharacterSpriteLocations[Distance][17][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                    ctx.drawImage(flipImage(ARM), SPRITELOCATIONS[Distance][16][0] + CHAR_OFFSETX, SPRITELOCATIONS[Distance][16][1] + CHAR_OFFSETY, ARM.width * scale, ARM.height * scale);
                }
                break;
        }
        
    } catch (e) {
        PrintLog("Error drawCharacter:" + e.toString());
    };


}

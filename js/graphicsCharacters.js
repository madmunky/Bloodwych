/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getCharacterSprite(length, graphicsFolder, graphic, spriteWidth, spriteHeight, colSize) {


    var graphicArray = [];

    for(var x = 0; x < length; x++) {

        var MID = [],
            FAR = [],
            CLOSE = [],
            DISTANT = [],
            POSITION = 0;

        if (graphic === 'minis') {
            CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, false));
            POSITION = POSITION + spriteHeight;

            CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight, false));
            CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight, true));
            POSITION = POSITION + spriteHeight;

            CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, false));
            POSITION = POSITION + spriteHeight;

            MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 4, spriteHeight - 5, false));
            POSITION = POSITION + spriteHeight - 5;

            MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 10, spriteHeight - 5, false));
            MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 10, spriteHeight - 5, true));
            POSITION = POSITION + spriteHeight - 5;

            MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 4, spriteHeight - 4, false));
            POSITION = POSITION + spriteHeight - 4;

        } else {
            switch (graphic) {
                case 'heads':

                    var largeHeads = 0;

                    if (x === 3 || x === 17) {
                        largeHeads = 0;
                    }

                    CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth, spriteHeight, false)); //11, 13
                    POSITION = POSITION + spriteHeight;

                    CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth, spriteHeight, false));
                    CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth, spriteHeight, true));
                    POSITION = POSITION + spriteHeight;

                    CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth, spriteHeight, false));
                    POSITION = POSITION + spriteHeight;



                    MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 2, spriteHeight - 3, false)); //9, 10
                    POSITION = POSITION + spriteHeight - 3;

                    MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 2, spriteHeight - 3, false));
                    MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 2, spriteHeight - 3, true));
                    POSITION = POSITION + spriteHeight - 3;

                    MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 2, spriteHeight - 3, false));
                    POSITION = POSITION + spriteHeight - 3;



                    FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 4, spriteHeight - 5, false)); //7, 8
                    POSITION = POSITION + spriteHeight - 5;

                    FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 4, spriteHeight - 5, false));
                    FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 4, spriteHeight - 5, true));
                    POSITION = POSITION + spriteHeight - 5;

                    FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 4, spriteHeight - 5, false));
                    POSITION = POSITION + spriteHeight - 5;



                    DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 6, spriteHeight - 6, false)); //5, 7
                    POSITION = POSITION + spriteHeight - 6;

                    DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 6, spriteHeight - 6, false));
                    DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION + largeHeads, spriteWidth - 6, spriteHeight - 6, true));
                    POSITION = POSITION + spriteHeight - 6;

                    DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], (x * colSize), POSITION + largeHeads, spriteWidth - 6, spriteHeight - 6, false));

                    break;
                case 'torsos':

                    if (x === 5) { //female 17, 14

                        CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 4, spriteHeight - 2, false)); //11, 12
                        POSITION = POSITION + spriteHeight;

                        CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 4, spriteHeight - 2, false));
                        CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 4, spriteHeight - 2, true));
                        POSITION = POSITION + spriteHeight;

                        CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 4, spriteHeight - 2, false));
                        POSITION = POSITION + spriteHeight;



                        MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 5, false));
                        POSITION = POSITION + spriteHeight - 2;

                        MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 4, spriteHeight - 5, false));
                        MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 4, spriteHeight - 5, true));
                        POSITION = POSITION + spriteHeight - 2;

                        MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 5, false));
                        POSITION = POSITION + spriteHeight - 2;



                        FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight - 7, false));
                        POSITION = POSITION + spriteHeight - 4;

                        FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 7, false));
                        FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 7, true));
                        POSITION = POSITION + spriteHeight - 4;

                        FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight - 7, false));
                        POSITION = POSITION + spriteHeight - 4;



                        DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight - 7, false));
                        POSITION = POSITION + spriteHeight - 5;

                        DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 7, false));
                        DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 7, true));
                        POSITION = POSITION + spriteHeight - 5;

                        DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight - 7, false));

                    } else { //male 17, 14

                        CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, false));
                        POSITION = POSITION + spriteHeight;

                        CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize + 1, POSITION, spriteWidth - 2, spriteHeight, false));
                        CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize + 1, POSITION, spriteWidth - 2, spriteHeight, true));
                        POSITION = POSITION + spriteHeight;

                        CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, false));
                        POSITION = POSITION + spriteHeight;



                        MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 2, false));
                        POSITION = POSITION + spriteHeight - 2;

                        MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize + 2, POSITION, spriteWidth - 5, spriteHeight - 2, false));
                        MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize + 2, POSITION, spriteWidth - 5, spriteHeight - 2, true));
                        POSITION = POSITION + spriteHeight - 2;

                        MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 2, false));
                        POSITION = POSITION + spriteHeight - 2;



                        FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 4, false));
                        POSITION = POSITION + spriteHeight - 4;

                        FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 4, false));
                        FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 4, true));
                        POSITION = POSITION + spriteHeight - 4;

                        FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 4, false));
                        POSITION = POSITION + spriteHeight - 4;



                        DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight - 5, false));
                        POSITION = POSITION + spriteHeight - 5;

                        DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 5, false));
                        DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 5, true));
                        POSITION = POSITION + spriteHeight - 5;

                        DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight - 5, false));

                    }
                    break;
                case 'arms': //13, 18
                    CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, false));
                    CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, true));
                    POSITION = POSITION + spriteHeight;

                    CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, false));
                    CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, true));
                    POSITION = POSITION + spriteHeight;

                    CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, false));
                    CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, true));
                    POSITION = POSITION + spriteHeight;



                    MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 4, false));
                    MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 4, true));
                    POSITION = POSITION + spriteHeight - 4;

                    MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 4, false));
                    MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 4, true));
                    POSITION = POSITION + spriteHeight - 4;

                    MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 4, false));
                    MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 4, true));
                    POSITION = POSITION + spriteHeight - 4;



                    FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 3, spriteHeight - 6, false));
                    FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 3, spriteHeight - 6, true));
                    POSITION = POSITION + spriteHeight - 6;

                    FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 3, spriteHeight - 6, false));
                    FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 3, spriteHeight - 6, true));
                    POSITION = POSITION + spriteHeight - 6;

                    FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 3, spriteHeight - 6, false));
                    FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 3, spriteHeight - 6, true));
                    POSITION = POSITION + spriteHeight - 6;



                    DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 3, spriteHeight - 8, false));
                    DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 3, spriteHeight - 8, true));
                    POSITION = POSITION + spriteHeight - 8;

                    DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 3, spriteHeight - 8, false));
                    DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 3, spriteHeight - 8, true));
                    POSITION = POSITION + spriteHeight - 8;

                    DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], (x * colSize), POSITION, spriteWidth - 3, spriteHeight - 8, false));
                    DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], (x * colSize), POSITION, spriteWidth - 3, spriteHeight - 8, true));

                    break;
                case 'legs': //17, 26
                    CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, false));
                    POSITION = POSITION + spriteHeight;

                    CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight, false));
                    CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight, true));
                    POSITION = POSITION + spriteHeight;

                    CLOSE.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth, spriteHeight, false));
                    POSITION = POSITION + spriteHeight;



                    MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 5, false));
                    POSITION = POSITION + spriteHeight - 5;

                    MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight - 5, false));
                    MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 8, spriteHeight - 5, true));
                    POSITION = POSITION + spriteHeight - 5;

                    MID.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 2, spriteHeight - 5, false));
                    POSITION = POSITION + spriteHeight - 5;



                    FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 9, false));
                    POSITION = POSITION + spriteHeight - 9;

                    FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 10, spriteHeight - 9, false));
                    FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 10, spriteHeight - 9, true));
                    POSITION = POSITION + spriteHeight - 9;

                    FAR.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 9, false));
                    POSITION = POSITION + spriteHeight - 9;



                    DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 6, spriteHeight - 12, false));
                    POSITION = POSITION + spriteHeight - 12;

                    DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 12, spriteHeight - 12, false));
                    DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], x * colSize, POSITION, spriteWidth - 12, spriteHeight - 12, true));
                    POSITION = POSITION + spriteHeight - 12;

                    DISTANT.push(grabImageAt(gfx[graphicsFolder][graphic], (x * colSize), POSITION, spriteWidth - 6, spriteHeight - 12, false));

                    break;
                default:
                    break;
            }
        }
        graphicArray.push(new Array(CLOSE, MID, FAR, DISTANT));
    }
    switch (graphic) {
        case 'minis':
            characterGfx[IMAGE_CHA_MINI] = graphicArray;
            break;
        case 'heads':
            characterGfx[IMAGE_CHA_HEAD] = graphicArray;
            break;
        case 'torsos':
            characterGfx[IMAGE_CHA_TORSO] = graphicArray;
            break;
        case 'arms':
            characterGfx[IMAGE_CHA_ARM] = graphicArray;
            break;
        case 'legs':
            characterGfx[IMAGE_CHA_LEG] = graphicArray;
            break;
    }
}

function grabCharacter(form, part, dir, dist) {
    if (dist >= 4 && part === IMAGE_CHA_MINI) {
        if (typeof monsterPalette[form] !== "undefined") {
            var miniId = monsterPalette[form].mini;
            var tmpPalette = monsterPalette[form].miniPalette;
            var d = [0, 2, 3, 1];
            var mini = recolourSprite(characterGfx[IMAGE_CHA_MINI][miniId][dist - 4][d[dir]], paletteData['DEFAULT_MON'], tmpPalette);
            return mini;
        }
    } else if (dist < 4 && part !== IMAGE_CHA_MINI) {
        if (typeof monsterPalette[form] !== "undefined") {
            /*var LEG;
            var ARM;
            var TORSO;
            var HEAD;*/
            var paletteType;
            var palette;
            var d = [0, 2, 3, 1];
            dir2 = dir % 2;
            switch (part) {
                case IMAGE_CHA_LEG:
                    paletteType = monsterPalette[form].leg;
                    palette = monsterPalette[form].legPalette;
                    dir6 = dir % 4;
                    break;
                case IMAGE_CHA_TORSO:
                    paletteType = monsterPalette[form].torso;
                    palette = monsterPalette[form].torsoPalette;
                    dir6 = dir % 4;
                    break;
                case IMAGE_CHA_ARM:
                    paletteType = monsterPalette[form].arm;
                    palette = monsterPalette[form].armPalette;
                    d = [0, 2, 1, 3, 4, 5, 4, 5];
                    dir6 = dir;
                    break;
                case IMAGE_CHA_HEAD:
                    paletteType = monsterPalette[form].head;
                    palette = monsterPalette[form].headPalette;
                    dir6 = dir % 4;
                    break;
            }
            var head = characterGfx[IMAGE_CHA_HEAD][monsterPalette[form].head][dist][d[dir2]];
            var torso = characterGfx[IMAGE_CHA_TORSO][monsterPalette[form].torso][dist][d[dir2]];
            var arm = characterGfx[IMAGE_CHA_ARM][monsterPalette[form].arm][dist][d[dir]];
            var leg = characterGfx[IMAGE_CHA_LEG][monsterPalette[form].leg][dist][d[dir2]];
            var partSprite = recolourSprite(characterGfx[part][paletteType][dist][d[dir6]], paletteData['DEFAULT_MON'], palette);

            var height = Math.floor(head.height * 0.65) + torso.height + leg.height,
                width = 65; //arm.width + torso.width + arm.width;

            var can = document.createElement('canvas');
            can.width = width;
            can.height = height;
            var charContext = can.getContext("2d");

            switch (part) {
                case IMAGE_CHA_LEG:
                    var coord = {
                        x: Math.floor((width - leg.width) * 0.5),
                        y: height - leg.height
                    };
                    break;
                case IMAGE_CHA_TORSO:
                    var coord = {
                        x: Math.floor((width - torso.width) * 0.5),
                        y: height - leg.height - torso.height
                    };
                    break;
                case IMAGE_CHA_HEAD:
                    var coord = {
                        x: Math.floor((width - head.width) * 0.5),
                        y: height - leg.height - torso.height - Math.floor(head.height * 0.65)
                    };
                    break;
                case IMAGE_CHA_ARM:
                    if (dir === 0) {
                        var coord = {
                            x: Math.floor((width - torso.width) * 0.5) - arm.width + 5,
                            y: height - leg.height - torso.height + 1
                        };
                    } else if (dir === 2) {
                        var coord = {
                            x: Math.floor((width + torso.width) * 0.5) - 5,
                            y: height - leg.height - torso.height + 1
                        }
                    } else if (dir === 1) {
                        var coord = {
                            x: Math.floor((width - torso.width) * 0.5) - arm.width + 9,
                            y: height - leg.height - torso.height + 1
                        };
                    } else if (dir === 3) {
                        var coord = {
                            x: Math.floor((width + torso.width) * 0.5) - 9,
                            y: height - leg.height - torso.height + 1
                        };
                    } else if (dir === 4) {
                        var coord = {
                            x: Math.floor((width - torso.width) * 0.5) - arm.width + 5,
                            y: height - leg.height - torso.height * 1.5
                        };
                    } else if (dir === 5) {
                        var coord = {
                            x: Math.floor((width + torso.width) * 0.5) - 5,
                            y: height - leg.height - torso.height * 1.5
                        };
                    } else if (dir === 6) {
                        var coord = {
                            x: Math.floor((width - torso.width) * 0.5) + 1,
                            y: height - leg.height - torso.height * 1.5
                        };
                    } else if (dir === 7) {
                        var coord = {
                            x: Math.floor((width + torso.width) * 0.5) - arm.width - 1,
                            y: height - leg.height - torso.height * 1.5
                        };
                    }
                    break;
            }

            charContext.drawImage(partSprite, coord.x, coord.y, partSprite.width, partSprite.height);

            charContext.save();
            delete partSprite;
            return can;
        }
    }
}

function grabCharacterArmour(id, gen, part, dir, dist) {
    if (part !== IMAGE_CHA_HEAD) {
        if (dist >= 4 && part === IMAGE_CHA_MINI) {
            var amr = getItemArmourType(id);
            var type = armourData[gen + amr * 3][3];
            var d = [0, 2, 3, 1];
            var mini = characterGfx[IMAGE_CHA_MINI][type][dist - 4][d[dir]];
            return mini;
            /*if (typeof monsterPalette[form] !== "undefined") {
                var miniId = monsterPalette[form].mini;
                var tmpPalette = monsterPalette[form].miniPalette;
                var d = [0, 2, 3, 1];
                var mini = recolourSprite(characterGfx[IMAGE_CHA_MINI][miniId][dist - 4][d[dir]], paletteData['DEFAULT_MON'], tmpPalette);
                return mini;
            }*/
        } else if (dist < 4 && part !== IMAGE_CHA_MINI) {
            /*var LEG;
                var ARM;
                var TORSO;
                var HEAD;*/
            var paletteType;
            var palette;
            var d = [0, 2, 3, 1];
            dir2 = dir % 2;
            switch (part) {
                case IMAGE_CHA_LEG:
                    dir6 = dir % 4;
                    break;
                case IMAGE_CHA_TORSO:
                    dir6 = dir % 4;
                    break;
                case IMAGE_CHA_ARM:
                    d = [0, 2, 1, 3, 4, 5, 4, 5];
                    dir6 = dir;
                    break;
            }
            var amr = getItemArmourType(id);
            var type = [armourData[gen + amr * 3][0], armourData[gen + amr * 3][1], null, armourData[gen + amr * 3][2]];
            var leg = characterGfx[IMAGE_CHA_LEG][type[0]][dist][d[dir2]];
            var torso = characterGfx[IMAGE_CHA_TORSO][type[1]][dist][d[dir2]];
            var arm = characterGfx[IMAGE_CHA_ARM][type[3]][dist][d[dir]];
            partSprite = characterGfx[part][type[part]][dist][d[dir6]];

            var height = torso.height + leg.height,
                width = 65; //arm.width + torso.width + arm.width;

            var can = document.createElement('canvas');
            can.width = width;
            can.height = height;
            var charContext = can.getContext("2d");

            switch (part) {
                case IMAGE_CHA_LEG:
                    var coord = {
                        x: Math.floor((width - leg.width) * 0.5),
                        y: height - leg.height
                    };
                    break;
                case IMAGE_CHA_TORSO:
                    var coord = {
                        x: Math.floor((width - torso.width) * 0.5),
                        y: height - leg.height - torso.height
                    };
                    break;
                case IMAGE_CHA_ARM:
                    if (dir === 0) {
                        var coord = {
                            x: Math.floor((width - torso.width) * 0.5) - arm.width + 5,
                            y: height - leg.height - torso.height + 1
                        };
                    } else if (dir === 2) {
                        var coord = {
                            x: Math.floor((width + torso.width) * 0.5) - 5,
                            y: height - leg.height - torso.height + 1
                        }
                    } else if (dir === 1) {
                        var coord = {
                            x: Math.floor((width - torso.width) * 0.5) - arm.width + 9,
                            y: height - leg.height - torso.height + 1
                        };
                    } else if (dir === 3) {
                        var coord = {
                            x: Math.floor((width + torso.width) * 0.5) - 9,
                            y: height - leg.height - torso.height + 1
                        };
                    } else if (dir === 4) {
                        var coord = {
                            x: Math.floor((width - torso.width) * 0.5) - arm.width + 5,
                            y: height - leg.height - torso.height * 1.5
                        };
                    } else if (dir === 5) {
                        var coord = {
                            x: Math.floor((width + torso.width) * 0.5) - 5,
                            y: height - leg.height - torso.height * 1.5
                        };
                    } else if (dir === 6) {
                        var coord = {
                            x: Math.floor((width - torso.width) * 0.5) + 1,
                            y: height - leg.height - torso.height * 1.5
                        };
                    } else if (dir === 7) {
                        var coord = {
                            x: Math.floor((width + torso.width) * 0.5) - arm.width - 1,
                            y: height - leg.height - torso.height * 1.5
                        };
                    }
                    break;
            }

            charContext.drawImage(partSprite, coord.x, coord.y, partSprite.width, partSprite.height);

            charContext.save();
            delete partSprite;
            return can;
        }
    }
}

function clipCharacter(img, percentClipped) {

    var can = document.createElement('canvas');
    can.width = img.width;
    can.height = img.height - percentClipped;
    var charContext = can.getContext("2d");

    charContext.drawImage(img, 0, 0);
    charContext.save();

    return can;

}

function drawCharacter(m, dir, dist, player, offset, returnImg, doBlur, doClip, pixToClip) {

    var can,
        charContext;

    if (returnImg) {
        var can = document.createElement('canvas');
        can.width = canvas.width;
        can.height = canvas.height;
        charContext = can.getContext("2d");
    }

    if (typeof returnImg === "undefined") {
        returnImg = false;
    }

    if (typeof doClip === "undefined") {
        doClip = false;
    }

    if (dist > -1) {
        for(var part = 0; part < 5; part++) {
            if (typeof m.ref.gfx[part] !== "undefined" && typeof m.ref.gfx[part][dist] !== "undefined" && typeof m.ref.gfx[part][dist][dir] !== "undefined") {
                if (typeof doBlur === 'undefined') {
                    doBlur = true;
                }
                var dir1 = dir;
                var dir2 = -1;
                if (part === IMAGE_CHA_ARM) { //attack arms
                    var mas = Math.floor((timerMaster - m.gestureTimer) / m.getSpeed(3));
                    if (dir === 0) {
                        dir1 = 0;
                        dir2 = 2;
                        if (doBlur) {
                            if (m.gesture === CHA_GESTURE_ATTACKING) {
                                if (mas === 0 || mas === 1 || mas === 3) {
                                    dir2 = 5;
                                }
                                if (mas === 1 || mas === 2 || mas === 3) {
                                    dir1 = 4;
                                }
                            } else if (m.gesture === CHA_GESTURE_SPELLCASTING) {
                                if (mas === 0 || mas === 1 || mas === 2) {
                                    dir1 = 4;
                                    dir2 = 5;
                                }
                            } else if (m.gesture === CHA_GESTURE_GREETING) {
                                if (mas === 0 || mas === 1 || mas === 2) {
                                    dir2 = 5;
                                }
                            }
                        }
                    } else if (dir === 2) {
                        dir1 = 2;
                        dir2 = 0;
                        if (doBlur) {
                            if (m.gesture === CHA_GESTURE_ATTACKING) {
                                if (mas === 0 || mas === 1 || mas === 3) {
                                    dir2 = 4;
                                }
                                if (mas === 1 || mas === 2 || mas === 3) {
                                    dir1 = 5;
                                }
                            } else if (m.gesture === CHA_GESTURE_SPELLCASTING) {
                                if (mas === 0 || mas === 1 || mas === 2) {
                                    dir1 = 5;
                                    dir2 = 4;
                                }
                            } else if (m.gesture === CHA_GESTURE_GREETING) {
                                if (mas === 0 || mas === 1 || mas === 2) {
                                    dir1 = 5;
                                }
                            }
                        }
                    } else if (doBlur) {
                        if (dir === 1) {
                            if (m.gesture === CHA_GESTURE_ATTACKING) {
                                if (mas === 1 || mas === 2 || mas === 3) {
                                    dir1 = 7;
                                }
                            } else if (m.gesture === CHA_GESTURE_SPELLCASTING) {
                                if (mas === 0 || mas === 1 || mas === 2) {
                                    dir1 = 7;
                                }
                            } else if (m.gesture === CHA_GESTURE_GREETING) {
                                if (mas === 0 || mas === 1 || mas === 2) {
                                    dir1 = 7;
                                }
                            }
                        } else if (dir === 3) {
                            if (m.gesture === CHA_GESTURE_ATTACKING) {
                                if (mas === 0 || mas === 1 || mas === 3) {
                                    dir1 = 6;
                                }
                            } else if (m.gesture === CHA_GESTURE_SPELLCASTING) {
                                if (mas === 0 || mas === 1 || mas === 2) {
                                    dir1 = 6;
                                }
                            }
                        }
                    }
                }
                var gfx1 = m.ref.gfx[part][dist][dir1];
                var gfx2 = m.ref.gfx[part][dist][dir2];

                if (m.form === 26 && m.glow === 0) {
                    gfx1 = monsterRef[27][0].gfx[part][dist][dir1];
                    gfx2 = monsterRef[27][0].gfx[part][dist][dir2];
                } else if (m.champId > -1) {
                    var ch = m.getChampion();
                    var amr = ch.pocket[POCKET_ARMOUR];
                    var gen = ch.getGender();
                    var id = amr.id - 'ITEM_LEATHER_ARMOUR';
                    var palette = new Array();
                    if (part !== IMAGE_CHA_HEAD && amr.id >= 'ITEM_LEATHER_ARMOUR' && amr.id <= 'ITEM_CRYSTAL_PLATE' && typeof armourRef[id][gen] !== 'undefined') {
                        switch (part) {
                            case IMAGE_CHA_LEG:
                                palette = CLASS_ARMOUR[ch.colour].slice(0);
                                //palette = monsterPalette[m.form].legPalette.slice(0);
                                break;
                            case IMAGE_CHA_TORSO:
                                palette.push(monsterPalette[m.form].torsoPalette[3], monsterPalette[m.form].torsoPalette[0], monsterPalette[m.form].torsoPalette[0], monsterPalette[m.form].torsoPalette[3]);
                                break;
                            case IMAGE_CHA_ARM:
                                palette = monsterPalette[m.form].armPalette.slice(0);
                                break;
                            case IMAGE_CHA_HEAD:
                                palette = monsterPalette[m.form].headPalette.slice(0);
                                break;
                            case IMAGE_CHA_MINI:
                                palette = monsterPalette[m.form].miniPalette.slice(0);
                                break;
                        }
                        var prt = part;
                        if (prt >= IMAGE_CHA_ARM) { //exlude head part
                            prt--;
                        }
                        if (typeof CHA_ARMOUR[id] === 'undefined' || typeof CHA_ARMOUR[id][gen] === 'undefined' || typeof CHA_ARMOUR[id][gen][prt] === 'undefined') {
                            var car = CHA_ARMOUR[0][0][0];
                        } else {
                            var car = CHA_ARMOUR[id][gen][prt];
                        }
                        if (part === IMAGE_CHA_TORSO) {
                            gfx1 = armourRef[id][gen].gfx[IMAGE_CHA_TORSO][dist][dir1];
                            if (dir2 > -1) gfx2 = armourRef[id][gen].gfx[IMAGE_CHA_TORSO][dist][dir2];
                        } else if (part === IMAGE_CHA_ARM) {
                            gfx1 = armourRef[id][gen].gfx[IMAGE_CHA_ARM][dist][dir1];
                            if (dir2 > -1) gfx2 = armourRef[id][gen].gfx[IMAGE_CHA_ARM][dist][dir2];
                        } else if (part === IMAGE_CHA_LEG) {
                            gfx1 = armourRef[id][gen].gfx[IMAGE_CHA_LEG][dist][dir1];
                            if (dir2 > -1) gfx2 = armourRef[id][gen].gfx[IMAGE_CHA_LEG][dist][dir2];
                        } else if (part === IMAGE_CHA_LEG) {
                            gfx1 = armourRef[id][gen].gfx[IMAGE_CHA_LEG][dist][dir1];
                            if (dir2 > -1) gfx2 = armourRef[id][gen].gfx[IMAGE_CHA_LEG][dist][dir2];
                        } else if (part === IMAGE_CHA_MINI) {
                            gfx1 = armourRef[id][gen].gfx[IMAGE_CHA_MINI][dist][dir1];
                            if (dir2 > -1) gfx2 = armourRef[id][gen].gfx[IMAGE_CHA_MINI][dist][dir2];
                        }
                        for(var pl = 0; pl < 4; pl++) {
                            if (car[pl] !== null) {
                                palette[pl] = car[pl];
                            }
                        }
                        gfx1 = recolourSprite(gfx1, paletteData['DEFAULT_MON'], palette);
                        if (dir2 > -1) gfx2 = recolourSprite(gfx2, paletteData['DEFAULT_MON'], palette);
                    }
                }
                var offx = 64 - Math.floor(gfx1.width * 0.5) + offset.x;
                var offy = 76 - Math.floor(gfx1.height) - offset.y;

                if (dist >= 4 || part !== IMAGE_CHA_MINI) {
                    var blur = 0;
                    if (doBlur && dist <= DISTANCE_MID) {
                        blur = m.blur;
                    }
                    if (!returnImg) {
                        if ((doClip && part === IMAGE_CHA_LEG) || (doClip && part === IMAGE_CHA_MINI)) {
                            var t = clipCharacter(gfx1, pixToClip);
                            myDIx(player.Portal, t, {sx:(offx + blur), sy: offy, w: t.width, h: t.height, x:0, y:0});
                        } else {
                            myDIx(player.Portal, gfx1, {sx:(offx + blur), sy: offy, w: gfx1.width, h: gfx1.height, x:0, y:0});
                        }
                    } else {
                        charContext.drawImage(gfx1, (offx + blur), offy, gfx1.width, gfx1.height);
                    }
                    if (dir2 > -1) {
                        offx = 64 - Math.floor(gfx2.width * 0.5) + offset.x;
                        offy = 76 - Math.floor(gfx2.height) - offset.y;
                        if (!returnImg) {
                            if (doClip && part === IMAGE_CHA_LEG) {
                                var t = clipCharacter(gfx2, pixToClip);
                                myDIx(player.Portal, t, {sx:(offx + blur), sy: offy, w: t.width, h: t.height, x:0, y:0});
                            } else {
                                myDIx(player.Portal, gfx2, {sx:(offx + blur), sy: offy, w: gfx2.width, h: gfx2.height, x:0, y:0});
                            }
                        } else {
                            charContext.drawImage(gfx2, (offx + blur), offy, gfx2.width, gfx2.height);
                        }
                    }
                }
            }
        }
        if (returnImg) {
            charContext.save();
            return can;
        }
    }
}

function drawMonster(m, dir, dist, player, offset, returnImg) {
    //m.doGesture(CHA_GESTURE_SPELLCASTING);
    var charContext
    if (typeof returnImg === "undefined") {
        returnImg = false;
    }

        if (returnImg) {
        var can = document.createElement('canvas');
        can.width = player.Portal.canvas.width;
        can.height = player.Portal.canvas.height;
        charContext = can.getContext("2d");
        charContext.imageSmoothingEnabled = false;
        charContext.webkitImageSmoothingEnabled = false;
        charContext.mozImageSmoothingEnabled = false;
        charContext.oImageSmoothingEnabled = false;
        charContext.msImageSmoothingEnabled = false;
    }

    if (dist > -1) {
        for(var part1 = 0; part1 < 3; part1++) {
            try {
                var part = part1;
                var armoffx = 0;
                var armoffy = 0;
                if (dir === 2) { // reverse drawing for back view
                    part = 2 - part1;
                    if (m.ref.id >= MON_FORM_CRAB && m.ref.id < MON_FORM_BEHEMOTH && part === IMAGE_MON_ARM) {
                        armoffx = Math.ceil((dist + 8.0) / 3.0);
                        armoffy = Math.ceil(7.0 / (dist + 1.0));
                    }
                }
                //if (typeof m.ref.gfx[part] !== "undefined" && typeof m.ref.gfx[part][dist] !== "undefined" && typeof m.ref.gfx[part][dist][dir] !== "undefined") {
                    var dir1 = dir;
                    var dir2 = -1;

                    if (part === IMAGE_MON_ARM) {
                        var mas = Math.floor((timerMaster - m.gestureTimer) / m.getSpeed(3));
                        if (dir === 0) {
                            dir1 = 0;
                            dir2 = 2;
                            // dir1 = 4;
                            // dir2 = 5;
                            if (m.gesture === CHA_GESTURE_ATTACKING) {
                                if (mas === 0 || mas === 1 || mas === 3) {
                                    dir2 = 5;
                                }
                                if (mas === 1 || mas === 2 || mas === 3) {
                                    dir1 = 4;
                                }
                            } else if (m.gesture === CHA_GESTURE_SPELLCASTING) {
                                if (mas === 0 || mas === 1 || mas === 2) {
                                    dir1 = 4;
                                    dir2 = 5;
                                }
                            }
                        } else if (dir === 2) {
                            dir1 = 2;
                            dir2 = 0;
                            //dir1 = 4;
                            //dir2 = 5;
                            if (m.gesture === CHA_GESTURE_ATTACKING) {
                                if (mas === 0 || mas === 1 || mas === 3) {
                                    dir2 = 4;
                                }
                                if (mas === 1 || mas === 2 || mas === 3) {
                                    dir1 = 5;
                                }
                            }
                            if (m.gesture === CHA_GESTURE_SPELLCASTING) {
                                if (mas === 0 || mas === 1 || mas === 2) {
                                    dir1 = 5;
                                    dir2 = 4;
                                }
                            }
                        } else if (dir === 1) {
                            if (m.gesture === CHA_GESTURE_ATTACKING) {
                                if (mas === 1 || mas === 2 || mas === 3) {
                                    dir1 = 7;
                                }
                            }
                            if (m.gesture === CHA_GESTURE_SPELLCASTING) {
                                if (mas === 0 || mas === 1 || mas === 2) {
                                    dir1 = 7;
                                }
                            }
                        } else if (dir === 3) {
                            if (m.gesture === CHA_GESTURE_ATTACKING) {
                                if (mas === 0 || mas === 1 || mas === 3) {
                                    dir1 = 6;
                                }
                            }
                            if (m.gesture === CHA_GESTURE_SPELLCASTING) {
                                if (mas === 0 || mas === 1 || mas === 2) {
                                    dir1 = 6;
                                }
                            }
                        }
                    }


                    var gfx1 = getSprite(part,dist,dir1,null,m, player);
                    var gfx2;
                    if (typeof gfx1 !== 'undefined'){

                        if (dir2 > -1){
                            var gfx2 = getSprite(part,dist,dir2,null,m, player);
                        }

                        var offx = 64 - Math.floor(gfx1.width * 0.5) + offset.x;
                        var offy = 76 - Math.floor(gfx1.height) - offset.y;

                        if (dist >= 4 || part !== IMAGE_MON_MINI) {
                            var blur = 0;
                            if (dist <= DISTANCE_MID) {
                                blur = m.blur;
                            }
                                                    if (returnImg){
                                                        charContext.drawImage(gfx1, (offx - armoffx + blur) * scale, (offy - armoffy) * scale, gfx1.width * scale, gfx1.height * scale);
                                                    }else{
                                                        myDIx(player.Portal,gfx1,{sx:(offx - armoffx + blur), sy: (offy - armoffy), w: gfx1.width, h: gfx1.height, x:0, y: 0})
                                                    }
                            if (dir2 > -1) {
                                offx = 64 - Math.floor(gfx2.width * 0.5) + offset.x;
                                offy = 76 - Math.floor(gfx2.height) - offset.y;
                                                            if (returnImg){
                                                                charContext.drawImage(gfx2, (offx + armoffx + blur) * scale, (offy - armoffy) * scale, gfx2.width * scale, gfx2.height * scale);
                                                            }else{
                                                                myDIx(player.Portal,gfx2,{sx:(offx - armoffx + blur), sy: (offy - armoffy), w: gfx2.width, h: gfx2.height, x:0, y: 0})
                                                            }
                            }
                        }
                    }
                //}
            } catch (e) {
                PrintLog("JORG - DRAW MONSTER ISSUE! - PT" + part + ' DS' + dist + ' DR' + dir + ' - ' + e.toString());
            }
        }
    }

        if (returnImg) {
            charContext.save();
            return can;
        }
}

function grabMonster(form, level) {

    var spriteSheetIMG;
    var spriteLocations;
    var ImageArray = [];

    switch (form) {
        case MON_FORM_ILLUSION:
        case MON_FORM_SUMMON:
            { //SUMMON
                spriteSheetIMG = gfx['character']['summon'];
                spriteLocations = getSpriteLocations("Summon");
                break;
            }
        case MON_FORM_BEHOLDER:
            { //FLOATER
                spriteSheetIMG = gfx['character']['floater'];
                spriteLocations = getSpriteLocations("Floater");
                break;
            }
        case MON_FORM_ENTITY:
            { //NASTY FLOATER
                spriteSheetIMG = gfx['character']['nastyfloater'];
                spriteLocations = getSpriteLocations("NastyFloater");
                break;
            }
        case MON_FORM_CRAB:
            { //CRAB
                spriteSheetIMG = gfx['character']['crab'];
                spriteLocations = getSpriteLocations("Crab");
                break;
            }
        case MON_FORM_DRAGON:
        case MON_FORM_DRAGON_SMALL:
            { //DRAGON
                spriteSheetIMG = gfx['character']['dragon'];
                spriteLocations = getSpriteLocations("Dragon");
                break;
            }
        case MON_FORM_BEHEMOTH:
            { //BEHEMOTH
                spriteSheetIMG = gfx['character']['behemoth'];
                spriteLocations = getSpriteLocations("Behemoth");
                break;
            }
        default:
            return null;
    }

    for(var i in spriteLocations){
        ImageArray.push({name:spriteLocations[i].name,img:grabImageAt(spriteSheetIMG, spriteLocations[i].x, spriteLocations[i].y, spriteLocations[i].w, spriteLocations[i].h, spriteLocations[i].mirror, spriteLocations[i].ox, spriteLocations[i].oy)})
    }

    for (var i = 0; i < ImageArray.length; i++) {
      if (form < MON_FORM_BEHEMOTH) {
            if (form === MON_FORM_ILLUSION) {
                var pal = 0;
                var lvl = 8;
            } else {
                var pal = form - MON_FORM_SUMMON;
                var lvl = level;
            }
            ImageArray[i].img = recolourSprite(ImageArray[i].img, paletteData['DEFAULT_MON'], monsterBigPalette[pal][lvl]);
        }
    }

    return ImageArray;
}

function getSprite(part,dist,dir,action, monster, player){

    Sprite = monster.ref.gfx;
    //console.log("Part:" + part + " Dist: " + dist+ " Dir:" + dir + " Action: " + action);
    var partName = ['Body','Arm','Mini'];
    var distName = ['Distance 1','Distance 2','Distance 3','Distance 4','Distance 5','Distance 6'];
    var dirName = ['Front','Right','Back','Left'];
    var strGestures = ['CHA_GESTURE_NONE','CHA_GESTURE_ATTACKING','CHA_GESTURE_SPELLCASTING','CHA_GESTURE_GREETING'];
    var strMonsterForm = ['MON_FORM_ILLUSION','MON_FORM_SUMMON','MON_FORM_BEHOLDER','MON_FORM_ENTITY','MON_FORM_CRAB','MON_FORM_DRAGON','MON_FORM_DRAGON_SMALL','MON_FORM_BEHEMOTH'];

    if (part == 1){
        dirName = ['Front Left Arm','Side Right Arm','Front Right Arm','Side Left Arm',"Left Attack Arm","Right Attack Arm","Side Left Attack Arm","Side Right Attack Arm"];
    }


    for(var i in Sprite){
        if (Sprite[i].name.indexOf(partName[part]) >-1){
            if (Sprite[i].name.indexOf(distName[dist]) >-1){
                if (Sprite[i].name.indexOf(dirName[dir]) >-1){
                     return Sprite[i].img;
                }
            }
        }
    }

   // PrintLog(strMonsterForm[monster.form - 100] + " - Part: " + partName[part] + " " + distName[dist] + " " + dirName[dir] + " " + strGestures[monster.gesture]);
}

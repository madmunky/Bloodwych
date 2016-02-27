//var gfxPos = SpriteSheetArray();

if (debug) {
        console.log("Loading Graphics.js");
    }

function getTimeStamp() {
    var now = new Date();
    return ((now.getMonth() + 1) + '/' + (now.getDate()) + '/' + now.getFullYear() + " " + now.getHours() + ':' + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
        .getSeconds()) : (now.getSeconds())));
}

function getImage(Hex, d, pos, p, pos18) {
    // Hex = Bloodwych Hex Code
    // d = direction of required wall (North,East,South,West)
    // pos = Position on the screen we are drawing
    //
    // This function will return the correct graphic to be draw for the Hex Code passed
    // I may need to pass the Graphics Position to be drawn so I can work out which graphic
    // to be return for each wall side.

    //        if (getHexToBinaryPosition(Hex, 13, 3) !== '1'){
    //            if (getHexToBinaryPosition(Hex, 8, 4) === '8'){
    //                PrintLog("Should be drawing something...");
    //            }
    //        }


    switch (getHexToBinaryPosition(Hex, 13, 3)) {
        case '0':
            return null;
            break;
        case '1':
            return getStoneWall(Hex, d, pos, p, pos18);
            break;
        case '2':
            return getWoodenObject(Hex, d, pos, p);
            break;
        case '3':
            return getMiscObject(Hex);
            break;
        case '4':
            if (getHexToBinaryPosition(Hex, 7) === '0') {
                return gfx["dungeon"]["stairs"]["up"];
            } else {
                return gfx["dungeon"]["stairs"]["down"];
            }
            break;
        case '5':
            if (getHexToBinaryPosition(Hex, 4) === '1') {
                var colourDoor = COLOUR_DOOR_VOID;
            } else {
                var colourDoor = getHexToBinaryPosition(Hex, 1, 3);
            }
            if (getHexToBinaryPosition(Hex, 7) === '0') {
                return gfx["dungeon"]["door"]["open"][colourDoor];
            } else if (getHexToBinaryPosition(Hex, 6) === '0') {
                return gfx["dungeon"]["door"]["solid"][colourDoor];
            } else {
                return gfx["dungeon"]["door"]["gate"][colourDoor];
            }
            break;
        case '6':
            //Roof Pit. Can be visible for any floor location
            if (getHexToBinaryPosition(Hex, 5) === '1') {
                myDIx(p.Portal,gfx["dungeon"]["floor"]["pit-up"],gfxPos[pos]);
            }
            switch (getHexToBinaryPosition(Hex, 6, 2)) {
                case '1':
                    return gfx["dungeon"]["floor"]["pit-down"];
                case '2':
                    return gfx["dungeon"]["floor"]["path"][COLOUR_FLOOR_SWITCH];
                default:
                    return null;
            }
            break;
        case '7':
            if(getHexToBinaryPosition(Hex, 6, 2) === '1') { //Firepath
                return gfx["dungeon"]["floor"]["path"][Math.floor(Math.random() * 2) + COLOUR_FLOOR_FIRE];
            } else if (getHexToBinaryPosition(Hex, 6, 2) === '2') { //Mindrock
                return getStoneWall(Hex, d, pos, p, pos18);
            } else if (getHexToBinaryPosition(Hex, 6, 2) === '3') { //Formwall
                return getStoneWall(Hex, d, pos, p, pos18);
            }
            break;
        default: break;//PrintLog("Get Image Failed - " + Hex);
    }
}

function getMiscObject(hex) {
    var m = getHexToBinaryPosition(hex, 6, 2)
    if (m === '1') {
        return gfx["dungeon"]["misc"]["pillar"];
    }
    return gfx["dungeon"]["misc"]["bed"];
}

function bin2type(b) {

    switch (b) {

        case "00":
            {
                return null;
                break;
            };
        case "01":
            {
                return gfx["dungeon"]["wood"]["wall"];
                break;
            };
        case "10":
            {
                return gfx["dungeon"]["wood"]["door-open"];
                break;
            };
        case "11":
            {
                return gfx["dungeon"]["wood"]["door"];
                break;
            };
        default:
            {
                return null;
            };
    }
}

function getStoneWall(HexCode, d, pos, p, pos18) {
    //if (getHexToBinaryPosition(HexCode, 8) === '0') { ???????????????
    //    return gfx["dungeon"]["stone"]["wall"];
    //}
    var wall = "wall";
    if ((p.x + p.y + p.d) % 2 === 1) {
        wall = "wall2";
    }
    myDIx(p.Portal,gfx["dungeon"]["stone"][wall],gfxPos[pos]);
    if (d === parseInt(getHexToBinaryPosition(HexCode, 10, 2)) && getHexToBinaryPosition(HexCode, 13, 3) !== '7') {
        return getWallDeco();
    }
    return gfx["dungeon"]["stone"][wall];

    function getWallDeco() {
        var xy = posToCoordinates(pos18, p.x, p.y, p.d);
        var RND4 = Math.floor(xy.x * 1.3 + xy.y * 3.7 + d * 1.3) % 4; //For random banner faces
        var RND6 = Math.floor(xy.x * 1.1 + xy.y * 2.3 + d * 5.7) % 6; //For random switch colour
        var RND8 = Math.floor(xy.x * 1.7 + xy.y * 5.5 + d * 6.3) % 8; //For random banner colour
        var il = ((p.getChampion(p.championLeader).prof === PROFESSION_CUTPURSE && cutpurseTrueview) || p.getActiveSpellById(SPELL_TRUEVIEW).timer > 0);
        //try {
        if (getHexToBinaryPosition(HexCode, 8) === '1') { //Wall has something on it
            if (getHexToBinaryPosition(HexCode, 6, 2) === '0' && (getHexToBinaryPosition(HexCode, 12) === '0' || il)) { //Shelf
                return gfx["dungeon"]["stone"]["shelf"];
            } else if (getHexToBinaryPosition(HexCode, 6, 2) === '1') { //Sign
                var col = parseInt(getHexToBinaryPosition(HexCode, 0, 6)); //Sign colour
                if (col === 0) { //Random Color
                    myDIx(p.Portal,gfx["dungeon"]["deco"]["banner"][RND8],gfxPos[pos]);
                    switch (RND4) {
                        case 0:
                            return gfx["dungeon"]["deco"]["serpent-head"];
                        case 1:
                            return gfx["dungeon"]["deco"]["dragon-head"];
                        case 2:
                            return gfx["dungeon"]["deco"]["moon-head"];
                        case 3:
                            return gfx["dungeon"]["deco"]["chaos-head"];
                        default:
                            return null;
                    }
                } else if (col <= 4) { //Tower Flags
                    myDIx(p.Portal,gfx["dungeon"]["deco"]["banner"][col],gfxPos[pos]);
                    if (col === 1) { //Serpent Flag
                        return gfx["dungeon"]["deco"]["serpent-head"];
                    } else if (col === 2) { //Dragon Flag
                        return gfx["dungeon"]["deco"]["dragon-head"];
                    } else if (col === 3) { //Moon Flag
                        return gfx["dungeon"]["deco"]["moon-head"];
                    } else if (col === 4) { //Choas Flag
                        return gfx["dungeon"]["deco"]["chaos-head"];
                    }
                } else {
                    return gfx["dungeon"]["deco"]["script"][RND8];
                }
            } else if (getHexToBinaryPosition(HexCode, 6, 2) === '2') { //Switch
                if (getHexToBinaryPosition(HexCode, 0, 5) === '0') {
                    return gfx["dungeon"]["deco"]["switch"][COLOUR_SWITCH_BLACK]; // Black switch
                } else if (getHexToBinaryPosition(HexCode, 5) === '1') {
                    return gfx["dungeon"]["deco"]["switch-off"][RND6]; // Off switch
                } else {
                    return gfx["dungeon"]["deco"]["switch"][RND6]; // On switch
                }
            } else if (getHexToBinaryPosition(HexCode, 6, 2) === '3') { //Crystal Gem
                var col = parseInt(getHexToBinaryPosition(HexCode, 2, 3)); //Gem colour
                if (getHexToBinaryPosition(HexCode, 5) === '1') {
                    return gfx["dungeon"]["deco"]["gem-off"][col];
                } else {
                    return gfx["dungeon"]["deco"]["gem"][col];
                }
            } else {
                return gfx["dungeon"]["stone"][wall];
            }
        }
        //} catch (e) {}

        return gfx["dungeon"]["stone"][wall];
    }
}

function getWallDirection(d, s) {

    // d = player direction
    // s = screen gfx position

    //I should be able to use the below in an array to work out all directions
    //current plus direction = wall face i.e.
    //If a wall is currently North which is a 0 + player direction. Say Player is facing East = 1
    // 0 + 1 = 1 (North Wall becomes East)

    var Wall = [0, 1, 2, 3, 2, 1, 2, 3, 2, 2, 1, 2, 3, 2, 2, 1, 2, 3, 2, 1, 2, 1, 3, 2, 3, 2, 1, 3, 2, 3, 0, 1];
    Wall[s] = (Wall[s] + d) % 4;

    return Wall[s];
};

function getDirection(n) {

    switch (n) {

        case 0:
            {
                return "North";
            };
        case 1:
            {
                return "East";
            };
        case 2:
            {
                return "South";
            };
        case 3:
            {
                return "West";
            };

    }
};

// p = Player
// What we do now is take the 18 Blocks which make up the players view
// We can then make a virtual cube of 4 sides which could possibly be
// drawn for each block, if the block is a Wall or Wooden object which
// has 4 sides we draw each of the sides, if it is not a Wooden object
// or Wall we just draw a single image.

function drawPlayersView(p) {
    debugTextPrint(p); //see bloodwych.js
    //p.getViewPortal();
    if (p.dead || p.sleeping || p.uiCenterPanel.mode === UI_CENTER_PANEL_GAMESTATE_MENU || p.uiCenterPanel.mode === UI_CENTER_PANEL_GAMESTATE_SAVE || p.uiCenterPanel.mode === UI_CENTER_PANEL_GAMESTATE_LOAD) {
        p.Portal.save();
        ctx.drawImage(p.PlayerCanvas, p.PortalX, p.PortalY);
        return;
    }
    if (p.uiCenterPanel.mode === UI_CENTER_PANEL_ENDGAME){
              ctx.drawImage(p.PlayerCanvas, p.PortalX, p.PortalY);
    } else if(!paused && !p.sleeping) {
        if (p.redrawViewPort){
            p.redrawViewPort = false;
            if (debug && frontBuffer){
                ctx.clearRect(285, 100, 400, 235);
            }
            p.uiCenterPanel.mode = UI_CENTER_PANEL_VIEWPORT;
            myDIx(p.Portal, gfx["dungeon"]["background"], background[(p.x + p.y + p.d) % 2]);
            var il = ((p.getChampion(p.championLeader).prof === PROFESSION_CUTPURSE && cutpurseTrueview) || p.getActiveSpellById(SPELL_TRUEVIEW).timer > 0);
            if (debug){
                //console.log("We are redawing to the Players Canvas");
            }
            for(var x = 0; x < 19; x++) {
                var view = p.getView();
                var BlockType = getHexToBinaryPosition(view[x], 13, 3);
                var spellWall = BlockType === '7' && (getHexToBinaryPosition(view[x], 6, 2) === '2' || getHexToBinaryPosition(view[x], 6, 2) === '3');
                var concealed = (getHexToBinaryPosition(view[x], 12) === '1' && !il);
                if (BlockType === '2') {
                    drawWoodenObject(p, x);
                } else {
                    var obj = p.getObjectOnPos(x, 2);
                    if (obj !== OBJECT_SHELF && obj !== OBJECT_PIT && obj !== OBJECT_PATH && !concealed) { //draw items not on shelf, pit, path first
                        drawItemsOnPos(p, x);
                    }
                    if(BlockType === '1' || spellWall) { //draw monsters before drawing walls
                        drawMonsterOnPos(p, x);
                        drawProjectileOnPos(p, x);
                    }
                    if(!(spellWall && getHexToBinaryPosition(view[x], 6, 2) === '2' && il)) {
                        switch (x) {
                            case 0:
                                {
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 28), 28, p, x), gfxPos[28]);
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 27), 27, p, x), gfxPos[27]);
                                };
                                break;
                            case 1:
                                {
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 26), 26, p, x), gfxPos[26]);
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 25), 25, p, x), gfxPos[25]);
                                };
                                break;
                            case 2:
                                {
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 27), 27, p, x), gfxPos[27]);
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 23), 23, p, x), gfxPos[23]);
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 22), 22, p, x), gfxPos[22]);
                                };
                                break;
                            case 3:
                                {
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 26), 26, p, x), gfxPos[26]);
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 21), 21, p, x), gfxPos[21]);
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 20), 20, p, x), gfxPos[20]);
                                };
                                break;
                            case 4:
                                {
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 22), 22, p, x), gfxPos[22]);
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 21), 21, p, x), gfxPos[21]);
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 16), 16, p, x), gfxPos[16]);
                                };
                                break;
                            case 5:
                                {
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 24), 24, p, x), gfxPos[24]);
                                };
                                break;
                            case 6:
                                {
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 19), 19, p, x), gfxPos[19]);
                                };
                                break;
                            case 7:
                                {
                                    if (BlockType === '1' || spellWall) {
                                        myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 17), 17, p, x), gfxPos[17]);
                                    }
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 18), 18, p, x), gfxPos[18]);
                                };
                                break;
                            case 8:
                                {
                                    if (BlockType === '1' || spellWall) {
                                        myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 15), 15, p, x), gfxPos[15]);
                                    }
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 14), 14, p, x), gfxPos[14]);
                                };
                                break;
                            case 9:
                                {
                                    if (BlockType === '1' || spellWall) {
                                        myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 15), 15, p, x), gfxPos[15]);
                                    }
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 11), 11, p, x), gfxPos[11]);
                                };
                                break;
                            case 10:
                                {
                                    if (BlockType === '1' || BlockType === '4' || spellWall) {
                                        myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 12), 12, p, x), gfxPos[12]);
                                    }
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 13), 13, p, x), gfxPos[13]);
                                };
                                break;
                            case 11:
                                {
                                    if (BlockType === '1' || BlockType === '4' || spellWall) {
                                        myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 10), 10, p, x), gfxPos[10]);
                                    }
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 9), 9, p, x), gfxPos[9]);
                                };
                                break;
                            case 12:
                                {
                                    if (BlockType === '1' || spellWall) {
                                        myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 10), 10, p, x), gfxPos[10]);
                                    }
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 6), 6, p, x), gfxPos[6]);
                                };
                                break;
                            case 13:
                                {
                                    if (BlockType === '1' || BlockType === '4' || spellWall) {
                                        myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 7), 7, p, x), gfxPos[7]);
                                    }
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 8), 8, p, x), gfxPos[8]);
                                };
                                break;
                            case 14:
                                {
                                    if (BlockType === '1' || BlockType === '4' || spellWall) {
                                        myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 5), 5, p, x), gfxPos[5]);
                                    }
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 4), 4, p, x), gfxPos[4]);
                                };
                                break;
                            case 15:
                                {
                                    if (BlockType === '1' || spellWall) {
                                        myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 5), 5, p, x), gfxPos[5]);
                                    }
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 2), 2, p, x), gfxPos[2]);
                                };
                                break;
                            case 16:
                                {
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 3), 3, p, x), gfxPos[3]);
                                };
                                break;
                            case 17:
                                {
                                    myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 1), 1, p, x), gfxPos[1]);
                                };
                                break;
                            case 18:
                                {
                                    if (BlockType === '5') {
                                        drawDoorFrame(p, x);
                                    } else if (BlockType === '1' || spellWall) {
                                        myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 1), 1, p, x), gfxPos[1]);
                                        myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 3), 3, p, x), gfxPos[3]);
                                        myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 2), 2, p, x), gfxPos[2]);
                                    } else {
                                        myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 31), 31, p, x), gfxPos[31]);
                                        myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 29), 29, p, x), gfxPos[29]);
                                        myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 30), 30, p, x), gfxPos[30]);
                                    };
                                };
                                break;
                        }
                    }
                    if ((obj === OBJECT_SHELF || obj === OBJECT_PIT || obj === OBJECT_PATH) && !concealed) { //draw items on shelf, pit, path last
                        drawItemsOnPos(p, x);
                    }
                    if(BlockType !== '1' && !spellWall) { //draw monsters after drawing anything else than walls
                        drawMonsterOnPos(p, x);
                        drawProjectileOnPos(p, x);
                    }
                }
        }
        p.Portal.save();
        if (!frontBuffer){
            ctx.drawImage(p.PlayerCanvas, p.PortalX, p.PortalY);
        }

    }}
}

function drawMonsterOnPos(p, pos) {
    if (pos > -1 && pos <= 15) {
        var monPos = p.getMonstersInRange(pos);
        for (var ii in monPos) {
            if (typeof monPos[ii].monster !== 'undefined'){

                    if (typeof monsterRef[monPos[ii].monster.form] === "undefined"){
                        initMonsterGfxNew(monPos[ii].monster);
                    }else if (monPos[ii].monster.ref === null || (typeof monPos[ii].monster.ref === 'undefined')){
                        initMonsterGfxNew(monPos[ii].monster);
                    }
                var van = false;
                var ch1 = p.getChampion(p.championLeader);

                    if(monPos[ii].monster.champId > -1) {
                        var ch2 = champion[monPos[ii].monster.champId];
                        if(ch2.recruitment.playerId > -1) {
                            var p2 = player[ch2.recruitment.playerId];
                            if(p2.getActiveSpellById(SPELL_VANISH).timer > 0) {
                                van = true;
                            }
                        }
                    }
                    if(!van || (van && ch1.prof === PROFESSION_CUTPURSE && cutpurseTrueview) || p.getActiveSpellById(SPELL_TRUEVIEW).timer > 0) {
                                    p.drawMonster(monPos[ii].monster, monPos[ii].distance, monPos[ii].gfxCoord);
                    }
            }
        }
    }
}

function drawItemsOnPos(p, pos) {
    if ((pos > -1 && pos <= 15) || pos === 18) {
        var itPos = p.getItemsInRange(pos);
        for (var i in itPos) {
            p.drawItem(itPos[i].item, itPos[i].distance, itPos[i].gfxCoord);
        }
    }
}

function drawProjectileOnPos(p, pos) {
    if ((pos > -1 && pos <= 15) || pos === 18) {
        var prPos = p.getProjectilesInRange(pos);
        for (var i in prPos) {
            if(prPos[i].position !== 18) {
                if(prPos[i].projectile.type !== 'NONE') {
                    p.drawProjectile(prPos[i].projectile, prPos[i].distance, prPos[i].gfxCoord);
                }
            } else if(typeof prPos[i].projectile.palette !== "undefined") {
                if(typeof prPos[i].projectile.palette[4] !== 'undefined' && prPos[i].projectile.palette[4] !== null && prPos[i].projectile.dead <= 0) {
                    p.Portal.fillStyle = 'rgb(' + prPos[i].projectile.palette[4][0] + ', ' + prPos[i].projectile.palette[4][1] + ', ' + prPos[i].projectile.palette[4][2] + ')';
                    p.Portal.fillRect(0, 0, 128 * scale, 76 * scale);
                } else if(typeof prPos[i].projectile.palette[5] !== 'undefined' && prPos[i].projectile.palette[5] !== null && prPos[i].projectile.dead > 0) {
                    p.Portal.fillStyle = 'rgb(' + prPos[i].projectile.palette[5][0] + ', ' + prPos[i].projectile.palette[5][1] + ', ' + prPos[i].projectile.palette[5][2] + ')';
                    p.Portal.fillRect(0, 0, 128 * scale, 76 * scale);
                }
            }
        }
    }
}

function drawDoorFrame(p, x) {
    var view = p.getView();
    var HexCode = view[18];

    var BB = parseInt(HexCode.substring(1, 2), 16);
    if (BB >= 0 & BB <= 3 || BB >= 8 & BB <= 11) { //"North/South"
        if (p.d === 0 || p.d === 2) {
            myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 29), 29, p), gfxPos[29]);
            myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 31), 31, p), gfxPos[31]);
        } else {
            myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 30), 30, p), gfxPos[30]);
        }
    } else if (BB >= 4 & BB <= 7 || BB >= 12 & BB <= 15) { //"East/West"
        if (p.d === 1 || p.d === 3) {
            myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 29), 29, p), gfxPos[29]);
            myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 31), 31, p), gfxPos[31]);
        } else {
            myDIx(p.Portal, getImage(view[x], getWallDirection(p.d, 30), 30, p), gfxPos[30]);
        }
    }
}

function drawWoodenObject(p, x) {
    // p = Player
    // x = Current Block being drawn

    //We create an array of all the sides for each 18 blocks
    //because wooden walls have 4 sides me need to loop though them all
    //and return the correct wall depending on the players rotation
    var BlockSides = [];
    BlockSides[0] = [-1, -1, 28, 27];
    BlockSides[1] = [-1, 26, 25, -1];
    BlockSides[2] = [-1, 27, 23, 22];
    BlockSides[3] = [-1, 21, 20, 26];
    BlockSides[4] = [-1, 22, 16, 21];
    BlockSides[5] = [28, -1, -1, 24];
    BlockSides[6] = [25, 19, -1, -1];
    BlockSides[7] = [23, 24, 18, 17];
    BlockSides[8] = [20, 15, 14, 19];
    BlockSides[9] = [16, 17, 11, 15];
    BlockSides[10] = [18, -1, 13, 12];
    BlockSides[11] = [14, 10, 9, -1];
    BlockSides[12] = [11, 12, 6, 10];
    BlockSides[13] = [13, -1, 8, 7];
    BlockSides[14] = [9, 5, 4, -1];
    BlockSides[15] = [6, 7, 2, 5];
    BlockSides[16] = [8, -1, -1, 3];
    BlockSides[17] = [4, 1, -1, -1];
    BlockSides[18] = [2, 3, -1, 1];

    inFront = (x === 4 || x === 9 || x === 12 || x === 15 || x === 18);

    var b = hex2bin(p.getView()[x].substring(0, 2));
    var s = [];
    s[0] = b.substring(6, 8); //North Face
    s[1] = b.substring(4, 6); //East Face
    s[2] = b.substring(2, 4); //South Face
    s[3] = b.substring(0, 2); //West Face


    if (BlockSides[x][0] > -1) {
        myDIx(p.Portal, bin2type(s[p.d]), gfxPos[BlockSides[x][0]]);
    }
    if (!inFront) {
        drawItemsOnPos(p, x);
        drawMonsterOnPos(p, x);
        drawProjectileOnPos(p, x);
    }
    if (BlockSides[x][1] > -1) {
        myDIx(p.Portal, bin2type(s[(p.d + 1) % 4]), gfxPos[BlockSides[x][1]]);
    }
    if (BlockSides[x][3] > -1) {
        myDIx(p.Portal, bin2type(s[(p.d + 3) % 4]), gfxPos[BlockSides[x][3]]);
    }
    if (inFront) {
        drawItemsOnPos(p, x);
        drawMonsterOnPos(p, x);
        drawProjectileOnPos(p, x);
    }
    if (BlockSides[x][2] > -1) {
        myDIx(p.Portal, bin2type(s[(p.d + 2) % 4]), gfxPos[BlockSides[x][2]]);
    }
}

function drawRect(x, y, w, h, c, p) {
    var cx = ctx;
    if (typeof p !== "undefined") {
        cx = p.Portal;
    }
    var off = scale * 0.5;
    cx.lineWidth = scale;
    cx.strokeStyle = 'rgba(' + c + ')';
    cx.strokeRect(x * scale + off, y * scale + off, w * scale, h * scale);
}

function drawFillRect(x, y, w, h, c, p) {
    var cx = ctx;
    if (typeof p !== "undefined") {
        cx = p.Portal;
    }
    cx.fillStyle = 'rgba(' + c + ')';
    cx.fillRect(x * scale, y * scale, w * scale, h * scale);
}

function recolourSprite(img, paletteFrom, paletteTo) {
    var c = document.createElement('canvas');
    var ctx1 = c.getContext("2d");
    var w = img.width;
    var h = img.height;

    c.width = w;
    c.height = h;

    // draw the image on the temporary canvas
    ctx1.drawImage(img, 0, 0, w, h);

    // pull the entire image into an array of pixel data
    var imageData = ctx1.getImageData(0, 0, w, h);


    for (var i = 0; i < imageData.data.length; i += 4) {

        for(var j = 0; j < paletteFrom.length; j++) {
            if (paletteTo[j] !== null && imageData.data[i] === paletteFrom[j][0] && imageData.data[i + 1] === paletteFrom[j][1] && imageData.data[i + 2] === paletteFrom[j][2] && imageData.data[i + 3] === paletteFrom[j][3]) {
                imageData.data[i] = paletteTo[j][0];
                imageData.data[i + 1] = paletteTo[j][1];
                imageData.data[i + 2] = paletteTo[j][2];
                imageData.data[i + 3] = paletteTo[j][3];
                j = j + 4;
            }
        }

    }

    // put the altered data back on the canvas
    ctx1.putImageData(imageData, 0, 0);
    // put the re-colored image back on the image

    //var img1 = new Image();
    //img1.width = imageData.width;
    //img1.height = imageData.height;
    //img1.src = c.toDataURL();
    //c = null;
    return c;
    //img1 = null;
}

function recolourSpriteArray(img, paletteFrom, paletteTo) {

    var newArray = [];

    for(var x = 0; x < img.length; x++) {

        var myImg = img[x];

        var c = document.createElement('canvas');
        var ctx1 = c.getContext("2d");
        var w = myImg.width;
        var h = myImg.height;

        c.width = w;
        c.height = h;

        // draw the image on the temporary canvas
        ctx1.drawImage(myImg, 0, 0, w, h);

        // pull the entire image into an array of pixel data
        var imageData = ctx1.getImageData(0, 0, w, h);


        for (var i = 0; i < imageData.data.length; i += 4) {

            for(var j = 0; j < paletteFrom.length; j++) {
                if (imageData.data[i] === paletteFrom[j][0] && imageData.data[i + 1] === paletteFrom[j][1] && imageData.data[i + 2] === paletteFrom[j][2] && imageData.data[i + 3] === paletteFrom[j][3]) {
                    imageData.data[i] = paletteTo[j][0];
                    imageData.data[i + 1] = paletteTo[j][1];
                    imageData.data[i + 2] = paletteTo[j][2];
                    imageData.data[i + 3] = paletteTo[j][3];
                    j = j + 4;
                }
            }

        }

        ctx1.putImageData(imageData, 0, 0);
        newArray.push(c);
    }
    return newArray;
}

function recolorImage(img, colour, folder, type, item) {
    var c = document.createElement('canvas');
    var ctx1 = c.getContext("2d");
    var w = img.width;
    var h = img.height;

    c.width = w;
    c.height = h;

    // draw the image on the temporary canvas
    ctx1.drawImage(img, 0, 0, w, h);

    // pull the entire image into an array of pixel data
    var imageData = ctx1.getImageData(0, 0, w, h);
    var palletDefault;
    var pallet;

    // examine every pixel,
    // change any old rgb to the new-rgb
    if (folder === "dungeon") {
        if (type === "deco") {
            if (item === "switch" || item === "switch-off") { //Switches
                if (item === "switch") {
                    palletDefault = paletteData["switch"]["default"];
                } else {
                    palletDefault = paletteData["switch"]["default-off"];
                }
                pallet = paletteData["switch"]["colours"][colour];
            } else if(item === "gem" || item === "gem-off") { //Gems
                if(item === "gem") {
                    palletDefault = paletteData["gem"]["default"];
                } else {
                    palletDefault = paletteData["gem"]["default-off"];
                }
                pallet = paletteData["gem"]["colours"][colour];
            } else { //Banners
                palletDefault = paletteData["deco"]["default"];
                pallet = paletteData["deco"]["colours"][colour];
            }
        } else if (type === "door") { //Doors
            palletDefault = paletteData["door"]["default"];
            pallet = paletteData["door"]["colours"][colour];
        } else if (type === "floor" && item === "path") { //Floor switches
            palletDefault = paletteData["floor"]["default"];
            pallet = paletteData["floor"]["colours"][colour];
        }
    }
    for (var i = 0; i < imageData.data.length; i += 4) {
        if (typeof pallet[0][0] !== "undefined") {
            for(var j = 0; j < pallet.length; j++) {
                if (palletDefault[j] !== null) {
                    if (imageData.data[i] === palletDefault[j][0] && imageData.data[i + 1] === palletDefault[j][1] && imageData.data[i + 2] === palletDefault[j][2] && imageData.data[i + 3] === palletDefault[j][3]) {
                        imageData.data[i] = pallet[j][0];
                        imageData.data[i + 1] = pallet[j][1];
                        imageData.data[i + 2] = pallet[j][2];
                        imageData.data[i + 3] = pallet[j][3];
                        j = j + 4;
                    }
                }
            }
        } else if (imageData.data[i] === palletDefault[0] && imageData.data[i + 1] === palletDefault[1] && imageData.data[i + 2] === palletDefault[2]) {
            if (palletDefault !== null) {
                imageData.data[i] = pallet[0];
                imageData.data[i + 1] = pallet[1];
                imageData.data[i + 2] = pallet[2];
            }
        }
    }
    // put the altered data back on the canvas
    ctx1.putImageData(imageData, 0, 0);
    // put the re-colored image back on the image

    //var img1 = new Image();
    //img1.width = imageData.width;
    //img1.height = imageData.height;
    //img1.src = c.toDataURL();

    return c;
}


function coverViewPort(p) {

    p.Portal.fillStyle = 'rgb(0, 0, 0)';
    p.Portal.fillRect(0.5, 0.5, 128 * scale, 76 * scale);
    drawRect(1, 0, 125, 74, colourData['GREY_DARK'], p);
    drawRect(0, 0, 127, 75, colourData['GREY_LIGHT'], p);
    drawRect(2, 1, 123, 72, colourData['GREY_LIGHT'], p);
    p.Portal.save()
}

function getSpriteLocations(strSpriteName){

    for(var i in spriteData.Sprites){
        if (spriteData.Sprites[i].spriteSheet == strSpriteName){
            return spriteData.Sprites[i].locations;
        }
    }

    return null;

}

function switchAction(r, p) {
    //Changes map data based on the switch being pressed
    //t = tower as each tower has different defaults for the switches
    //r = the reference to the switch action
    //p = The Player (as need to react on the same floor)
    var sw = tower[towerThis].switches[r];

    tar = tower[towerThis].floor[p.floor].Map[sw[3]][sw[2]];
    switch (sw[0]) {
        case SWITCH_WALL_REMOVE:
            tower[towerThis].floor[p.floor].Map[sw[3]][sw[2]] = setHexToBinaryPosition(tar, 0, 16, '0');
            break;
        case SWITCH_WALL_TOGGLE_STONE_WALL:
            tower[towerThis].floor[p.floor].Map[sw[3]][sw[2]] = toggleObject(tar, '1');
            break;
        case SWITCH_WALL_OPEN_VOID_DOOR:
            tower[towerThis].floor[p.floor].Map[sw[3]][sw[2]] = setHexToBinaryPosition(tar, 7, 1, '0');
            break;
        case SWITCH_WALL_ROTATE_STONE_WALL:
            tower[towerThis].floor[p.floor].Map[sw[3]][sw[2]] = setHexToBinaryPosition(tar, 10, 2, '' + ((parseInt(getHexToBinaryPosition(tar, 10, 2)) + 1) % 4));
            break;
        case SWITCH_WALL_TOGGLE_PILLAR:
            tower[towerThis].floor[p.floor].Map[sw[3]][sw[2]] = toggleObject(tar, '3', '1');
            break;
        case SWITCH_WALL_PLACE_PILLAR:
            tower[towerThis].floor[p.floor].Map[sw[3]][sw[2]] = setHexToBinaryPosition(tar, 13, 3, '3');
            break;
        case SWITCH_WALL_ROTATE_WOOD_WALLS:
            var wood = hex2bin(getHexToBinaryPosition(tar, 2, 2), 2) + hex2bin(getHexToBinaryPosition(tar, 4, 2), 2) + hex2bin(getHexToBinaryPosition(tar, 6, 2), 2) + hex2bin(getHexToBinaryPosition(tar, 0, 2), 2);
            tower[towerThis].floor[p.floor].Map[sw[3]][sw[2]] = setHexToBinaryPosition(tar, 0, 8, bin2hex(wood));
            break;
        default:
            window.alert("Unhandled Switch Action: " + sw.toString());
    }
}

function toggleObject(hex, o, s, once) {
    var ret = hex;
    if(typeof once === "undefined") {
        var once = false;
    }
    if (getHexToBinaryPosition(ret, 13, 3) === '0' || once) {
        ret = setHexToBinaryPosition(ret, 13, 3, o);
    } else {
        ret = setHexToBinaryPosition(ret, 13, 3, '0');
    }
    if(typeof s !== "undefined" && s !== null) {
        if (getHexToBinaryPosition(ret, 6, 2) === '0' || once) {
            ret = setHexToBinaryPosition(ret, 6, 2, s);
        } else {
            ret = setHexToBinaryPosition(ret, 6, 2, '0');
        }
    }

    return ret;
}

function floorActionType(trig, p) {
    if(p.doPit()) {
        return;
    } else if(p.doFizzle()) {
        return;
    }

    if (trig[1] > 0){
        tar = tower[towerThis].floor[trig[1]].Map[trig[3]][trig[2]];
    }else{
        tar = tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]];
    }

    switch (trig[0]) {
        case SWITCH_FLOOR_NONE:
            break;
        case SWITCH_FLOOR_SPIN_180:
            p.rotateTo((p.d + 2) % 4);
            break;
        case SWITCH_FLOOR_SPIN_RANDOM:
            p.rotateTo(Math.floor(Math.random() * 4));
            break;
        case SWITCH_FLOOR_OPEN_VOID_LOCK_DOOR:
            tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = setHexToBinaryPosition(tar, 7, 1, '0');
            break;
        case SWITCH_FLOOR_VIVIFY_MACHINE_EXTERNAL:
            if(getMonsterAt(p.floor, p.x + 1, p.y) === null) {
                tower[towerThis].floor[p.floor].Map[p.y][p.x + 1] = setHexToBinaryPosition(tower[towerThis].floor[p.floor].Map[p.y][p.x + 1], 7, 1, '1');
            }
            castSpell(SPELL_VIVIFY, { floor: p.floor, x: p.x + 3, y: p.y, d: 3 });
            castSpell(SPELL_VIVIFY, { floor: p.floor, x: p.x + 2, y: p.y - 1, d: 2 });
            castSpell(SPELL_VIVIFY, { floor: p.floor, x: p.x + 2, y: p.y + 1, d: 0 });
            break;
        case SWITCH_FLOOR_VIVIFY_MACHINE_INTERNAL:
            if(getMonsterAt(p.floor, p.x - 1, p.y) === null) {
                tower[towerThis].floor[p.floor].Map[p.y][p.x - 1] = setHexToBinaryPosition(tower[towerThis].floor[p.floor].Map[p.y][p.x - 1], 7, 1, '1');
            }
            castSpell(SPELL_VIVIFY, { floor: p.floor, x: p.x + 1, y: p.y, d: 3 });
            castSpell(SPELL_VIVIFY, { floor: p.floor, x: p.x, y: p.y - 1, d: 2 });
            castSpell(SPELL_VIVIFY, { floor: p.floor, x: p.x, y: p.y + 1, d: 0 });
            /*for(var ch = 0; ch < p.champion.length; ch++) {
                var champ = p.getChampion(ch);
                if(champ !== null && champ.getMonster().dead && champ.recruitment.attached) {
                    champ.stat.hp = 0;
                    champ.getMonster().dead = false;
                    redrawUI(p.id);
                }
            }
            newProjectile('PROJECTILE_ARROW', paletteData['CHAOS'], -1, 0, p.floor, p.x, p.y, 1, null);*/
            break;
        case SWITCH_FLOOR_WOOD_DOOR_CLOSER_1:
            tower[towerThis].floor[p.floor].Map[p.y][p.x + 1] = setHexToBinaryPosition(tower[towerThis].floor[p.floor].Map[p.y][p.x + 1], 5, 1, '1');
            tower[towerThis].floor[p.floor].Map[p.y][p.x + 2] = setHexToBinaryPosition(tower[towerThis].floor[p.floor].Map[p.y][p.x + 2], 1, 1, '0');
            break;
        case SWITCH_FLOOR_WOOD_DOOR_CLOSER_2:
            tower[towerThis].floor[p.floor].Map[p.y][p.x - 1] = setHexToBinaryPosition(tower[towerThis].floor[p.floor].Map[p.y][p.x - 1], 1, 1, '1');
            tower[towerThis].floor[p.floor].Map[p.y][p.x - 2] = setHexToBinaryPosition(tower[towerThis].floor[p.floor].Map[p.y][p.x - 2], 5, 1, '0');
            break;
        case SWITCH_FLOOR_TRADER_DOOR:
            tower[towerThis].floor[p.floor].Map[p.y][p.x - 1] = setHexToBinaryPosition(tower[towerThis].floor[p.floor].Map[p.y][p.x - 1], 7, 1, '1');
            break;
        case SWITCH_FLOOR_TOWER_ENTRANCE_SIDE_PAD:
            checkSwitchTower(p.id, false, Math.floor(trig[1] * 0.5), trig);
            break;
        case SWITCH_FLOOR_TOWER_ENTRANCE:
            checkSwitchTower(p.id, true, Math.floor(trig[1] * 0.25), trig);
            break;
        case SWITCH_FLOOR_REMOVE:
            tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = '0000';
            break;
        case SWITCH_FLOOR_CLOSE_VOID_LOCK_DOOR:
            tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = setHexToBinaryPosition(tar, 7, 1, '1');
            break;
        case SWITCH_FLOOR_TOGGLE_PILLAR:
            tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = toggleObject(tar, '3', '1');
            break;
        case SWITCH_FLOOR_CREATE_SPINNER:
            tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = setHexToBinaryPosition(tar, 13, 3, '6');
            break;
        case SWITCH_FLOOR_OPEN_CREATE_WALL_WITH_SWITCHES:
            tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = toggleObject(tar, '1', null, true);
            break;
        case SWITCH_FLOOR_CREATE_PAD:
            var xy = getOffsetByRotation(trig[1]);
            if(typeof tower[towerThis].floor[p.floor].Map[p.y + xy.y] !== 'undefined' && typeof tower[towerThis].floor[p.floor].Map[p.y + xy.y][p.x + xy.x] !== 'undefined') {
                var tar2 = tower[towerThis].floor[p.floor].Map[p.y + xy.y][p.x + xy.x];
                var ob = parseInt(getHexToBinaryPosition(tar2, 13, 3));
                if(ob >= 4) {
                    tower[towerThis].floor[p.floor].Map[p.y + xy.y][p.x + xy.x] = toggleObject(tar2, '' + ((ob + 2) % 8), null, true);
                } else {
                    tower[towerThis].floor[p.floor].Map[p.y + xy.y][p.x + xy.x] = toggleObject(tar2, '' + ((ob + 6) % 8), null, true);
                }
            } else {
                tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = toggleObject(tar, '0', null, true);
            }
            break;
        case SWITCH_FLOOR_MOVE_PILLAR_AT_PLAYER:
            tower[towerThis].floor[p.floor].Map[p.y - 1][p.x - 1] = '0000';
            tower[towerThis].floor[p.floor].Map[p.y - 1][p.x] = toggleObject(tar, '3', '1', true);
            break;
        case SWITCH_FLOOR_CREATE_PILLAR:
            tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = toggleObject(tar, '3', '1', true);
            break;
        case SWITCH_FLOOR_KEEP_ENTRANCE_SIDEPAD:
            checkSwitchTower(p.id, false, 0, trig);
            break;
        case SWITCH_FLOOR_KEEP_ENTRANCE_CENTRAL_PAD:
            checkSwitchTower(p.id, true, 0, trig);
            break;
        case SWITCH_FLOOR_FLASH_TELEPORT:
            p.setPlayerPosition(trig[1], trig[2], trig[3]);
            newProjectile('NONE', paletteData['TELEPORT_FLASH'], 'SOUND_FLASH', -1, 0, p.floor, p.x, p.y, p.d, null);
            break;
        case SWITCH_FLOOR_ROTATE_STONE_WALL:
            tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = setHexToBinaryPosition(tar, 10, 2, '' + ((parseInt(getHexToBinaryPosition(tar, 10, 2)) + 1) % 4));
            break;
        case SWITCH_FLOOR_TOGGLE_WALL:
            tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = toggleObject(tar, '1');
            break;
        case SWITCH_FLOOR_SPINNER:
            p.rotateTo((p.d + 1) % 4);
            break;
        case SWITCH_FLOOR_CLICK_TELEPORT:
            p.setPlayerPosition(trig[1], trig[2], trig[3]);
            break;
        case SWITCH_FLOOR_TOGGLE_GREEN_PAD:
            if(getHexToBinaryPosition(tar, 13, 3) === '0') {
                tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = setHexToBinaryPosition(tar, 13, 3, '6');
            } else {
                tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = setHexToBinaryPosition(tar, 13, 3, '0');
            }
            break;
        case SWITCH_FLOOR_ROTATE_WOOD_WALL_COUNTER_CLOCKWISE:
            var wood = hex2bin(getHexToBinaryPosition(tar, 6, 2), 2) + hex2bin(getHexToBinaryPosition(tar, 0, 2), 2) + hex2bin(getHexToBinaryPosition(tar, 2, 2), 2) + hex2bin(getHexToBinaryPosition(tar, 4, 2), 2);
            tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = setHexToBinaryPosition(tar, 0, 8, bin2hex(wood));
            break;
        case SWITCH_FLOOR_TOGGLE_HOLE:
            if(getHexToBinaryPosition(tar, 6, 2) === '1') {
                tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = setHexToBinaryPosition(tar, 6, 2, '2');
            } else {
                tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = setHexToBinaryPosition(tar, 6, 2, '1');
            }
            break;
        case SWITCH_FLOOR_GAME_COMPLETION_PAD:
                p.uiCenterPanel.mode = UI_CENTER_PANEL_ENDGAME;
                showEndGame(p);
            break;
        case SWITCH_FLOOR_REMOVE_PILLAR_OTHER_EVENT:
            if(typeof player[1] === 'undefined') {
                tower[towerThis].floor[p.floor].Map[trig[3]][trig[2]] = toggleObject(tar, '0', null, true);
            }
            break;
        case SWITCH_FLOOR_TELEPORT_MONSTER:
            mon = getMonstersInTower(towerThis, true);
            for(var m in mon) {
                if(trig[2] === mon[m].x - 128 && trig[3] === mon[m].y) {
                    mon[m].x -= 128;
                    break;
                }
            }
            break;
        default:
            window.alert("Unhandled Floor Action: " + trig.toString());
    }

}

function gemAction(p) {
    var itH = p.pocket;
    var gem = parseInt(p.getBinaryView(15, 2, 3));
    var pock = itH.id - 'ITEM_SERPENT_CRYSTAL';
    if(p.getBinaryView(15, 5, 1) === '0') {
        if(itH.id === 0) {
            p.pocket.setPocketItem(gem + 'ITEM_SERPENT_CRYSTAL');
            p.setBinaryView(15, 5, 1);
        }
    } else {
        if(itH.type === 'ITEM_TYPE_CRYSTAL' || itH.type === 'ITEM_TYPE_GEM') {
            if(pock === gem) {
                if(gem === 5 || gem === 7) { //gems
                    var i = towerThis * 2; // + from/to
                    if(gem === 7) { //tan
                        i += 12;
                    }
                    var x = [gemSwitchesData[i][0], gemSwitchesData[i + 1][0]];
                    var y = [gemSwitchesData[i][1], gemSwitchesData[i + 1][1]];
                    if(p.x === x[0] && p.y === y[0]) {
                        p.setPlayerPosition(p.floor, x[1], y[1]);
                    } else {
                        p.setPlayerPosition(p.floor, x[0], y[0]);
                    }
                } else if(gem < 4) { //crystals
                    var i = 0;
                    var twr = -1;
                    var l = 0;
                    var trg = new Array();

                    while(i < crystalSwitchesData.length) {
                        twr = crystalSwitchesData[i++];
                        for(var c = 0; c < 4; c++) {
                            l = crystalSwitchesData[i++];
                            trg[c] = new Array();
                            for(var s = 0; s < l; s++) {
                                trg[c][s] = new Array();
                                trg[c][s][0] = crystalSwitchesData[i++];
                                trg[c][s][1] = crystalSwitchesData[i++];
                                trg[c][s][2] = crystalSwitchesData[i++];
                                trg[c][s][3] = crystalSwitchesData[i++];
                            }
                        }
                        if(twr === towerThis) {
                            for(var s = 0; s < trg[gem].length; s++) {
                                floorActionType(trg[gem][s], p);
                            }
                            break;
                        }
                    }
                }
                var pal = paletteData['TELEPORT_FLASH'];
                switch(gem + 'ITEM_SERPENT_CRYSTAL') {
                    case 'ITEM_SERPENT_CRYSTAL': pal = paletteData['SERPENT']; break;
                    case 'ITEM_MOON_CRYSTAL': pal = paletteData['MOON']; break;
                    case 'ITEM_DRAGON_CRYSTAL': pal = paletteData['DRAGON']; break;
                    case 'ITEM_CHAOS_CRYSTAL': pal = paletteData['CHAOS']; break;
                }
                newProjectile('NONE', pal, 'SOUND_FLASH', -1, 0, p.floor, p.x, p.y, 0, null);
                p.pocket.setPocketItem();
                p.setBinaryView(15, 5, 1);
            }
        }
    }
}

function initTowerSwitches() {
    for(var p in player) { //player
        for(var i = 0; i < 2; i++) { //0: to tower, 1: to keep
            player[p].towerSwitches[i] = new Array();
            for(var t = 0; t < 5; t++) { //tower
                if(typeof player[1] !== 'undefined') {
                    player[p].towerSwitches[i][t + 1] = {
                        floor: towerSwitchesData[i][t],
                        x: towerSwitchesData[i][t * 4 + p * 2 + 5],
                        y: towerSwitchesData[i][t * 4 + p * 2 + 6]
                    };
                } else {
                    player[0].towerSwitches[i][t + 1] = {
                        floor: towerSwitchesData[i][t],
                        x: Math.floor((towerSwitchesData[i][t * 4 + 0 * 2 + 5] + towerSwitchesData[i][t * 4 + 1 * 2 + 5]) / 2),
                        y: Math.floor((towerSwitchesData[i][t * 4 + 0 * 2 + 6] + towerSwitchesData[i][t * 4 + 1 * 2 + 6]) / 2)
                    };
                }
            }
        }
    }
}

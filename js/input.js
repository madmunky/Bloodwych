function doKeyDown(e) {
    if (gameStarted) {
        if (!paused) {
            if (typeof player[1] !== 'undefined' && !player[1].frozen) {
                switch (e.keyCode) {
                    case KEY_END:
                        player[1].action();
                        break; //End Key
                    case KEYPAD_8:
                        if (!player[1].frozen) player[1].move(DIRECTION_NORTH);
                        break; //8
                    case KEYPAD_5:
                        if (!player[1].frozen) player[1].move(DIRECTION_SOUTH);
                        break; //5
                    case KEYPAD_4:
                        if (!player[1].frozen) player[1].move(DIRECTION_WEST);
                        break; //4
                    case KEYPAD_6:
                        if (!player[1].frozen) player[1].move(DIRECTION_EAST);
                        break; //6
                    case KEYPAD_7:
                        if (!player[1].frozen) player[1].rotate(-1);
                        if (!player[1].frozen) player[1].rotate(-1);
                        break; //7
                    case KEYPAD_9:
                        if (!player[1].frozen) player[1].rotate(1);
                        break; //9
                    default:
                        break;
                }
            }
            switch (e.keyCode) {
                case KEY_SPACEBAR:
                    player[0].action();
                    break; // SpaceBar
                case KEY_W:
                    player[0].move(DIRECTION_NORTH);
                    break; // W KEY
                case KEY_S:
                    if (!player[0].frozen) player[0].move(DIRECTION_SOUTH);
                    break; // S KEY
                case KEY_A:
                    if (!player[0].frozen) player[0].move(DIRECTION_WEST);
                    break; // A KEY
                case KEY_D:
                    if (!player[0].frozen) player[0].move(DIRECTION_EAST);
                    break; // D KEY
                case KEY_Q:
                    if (!player[0].frozen) player[0].rotate(-1);
                    break; // Q KEY
                case KEY_E:
                    if (!player[0].frozen) player[0].rotate(1);
                    break; // E KEY
                case KEY_5:
                    pauseGame(true);
                    player[0].uiCenterPanel.mode = UI_CENTER_PANEL_GAMESTATE_SAVE;
                    showGameStateMenu(player[0]);
                    break;
                case KEY_6:
                    pauseGame(true);
                    player[0].uiCenterPanel.mode = UI_CENTER_PANEL_GAMESTATE_LOAD;
                    showGameStateMenu(player[0]);
                    break;
                case KEY_9:
                    if(soundEnabled) {
                        pauseSound(SOUND_PCMUSIC);
                        soundEnabled = false;
                    } else {
                        soundEnabled = true;
                        resumeSound(SOUND_PCMUSIC);
                    }
                    break;
                case KEY_0:
                    pauseGame(true);
                    break;
                default:
                    break;
            }
            if (debug) {
                switch (e.keyCode) {

                    case KEY_1: // Number 1
                        startExtendedLevel();
                        break;
                    case KEY_L: // THE L KEY
                        switchTower((towerThis + 1) % TOWER_NAME.length);
                        for (p in player) { player[p].redrawViewPort = true;}
                        break;
                    case KEY_T:
                        //player[0].changeUpFloor();
                        var ch = player[0].getActivePocketChampion();
                        ch.pocket[POCKET_SLOT_0].setPocketItem((ch.pocket[POCKET_SLOT_0].id + 1) % 110, 1);
                        redrawUI(0);
                        PrintLog(itemRef[champion[player[0].championLeader].pocket[POCKET_SLOT_0].id].name + " ID: " + champion[player[0].championLeader].pocket[POCKET_SLOT_0].id.toString())
                        break; // T KEY
                    case KEY_G:
                        //player[0].changeDownFloor();
                        var ch = player[0].getActivePocketChampion();
                        ch.pocket[POCKET_SLOT_0].setPocketItem((ch.pocket[POCKET_SLOT_0].id + 109) % 110, 1);
                        redrawUI(0);
                        PrintLog(itemRef[champion[player[0].championLeader].pocket[POCKET_SLOT_0].id].name + " ID: " + champion[player[0].championLeader].pocket[POCKET_SLOT_0].id.toString())
                        break; // G KEY
                    case KEY_Y:
                        if (player[0].floor < tower[towerThis].floor.length) {
                            var floor = player[0].floor + 1;
                            var fOff = getTowerFloorOffset(player[0].floor, floor);
                            var x = player[0].x + fOff.x;
                            var y = player[0].y + fOff.y;
                            player[0].setPlayerPosition(floor, x, y, player[0].d);
                        }
                        for (p in player) { player[p].redrawViewPort = true;}
                        break;
                    case KEY_H:
                        if (player[0].floor > 0) {
                            var floor = player[0].floor - 1;
                            var fOff = getTowerFloorOffset(player[0].floor, floor);
                            var x = player[0].x + fOff.x;
                            var y = player[0].y + fOff.y;
                            player[0].setPlayerPosition(floor, x, y, player[0].d);
                        }
                        for (p in player) { player[p].redrawViewPort = true;}
                        break;
                    case KEY_PLUS:
                        player[0].uiCenterPanel.mode = UI_CENTER_PANEL_ENDGAME;
                        showEndGame(player[0]);
                        break;
                    case KEY_MINUS:
                        game.fps = game.fps -1;
                        break;
                    case KEY_1:
                        player[0].alterObject(-1);
                        break;
                    case KEY_2:
                        player[0].alterObject(0, 1);
                        break;
                    case KEY_3:
                        player[0].alterObject(1);
                        break;
                        case KEY_4:
                        player[0].alterObject(0, 0, -1);
                        break;
                    case KEY_R:
                        player[0].alterObject(0, 0, 1);
                        break;
                    case KEY_7:
                        testDistance = (testDistance + 1) % 3;
                        PrintLog("Distance: " + testDistance);
                        break;
                    case KEY_8:
                        testDistance = (testDistance + 3) % 3;
                        PrintLog("Distance: " + testDistance);
                        break;
                    /*case KEY_0:
                        testMon1 = (testMon1 + 1);
                        break;
                    case KEY_9:
                        testMon1 = (testMon1 - 1);
                        break;*/
                    default:
                        break;
                }
            }
        } else {
            switch (e.keyCode) {
                case KEY_0:
                case KEY_ESC:
                    pauseGame(false);
                    break;
            }
        }
    } else { //Start menu screen
        switch (e.keyCode) {
            case KEY_1:
                $('canvas').attr('data-game-status', 'menu-champions');
                players = 1;
                drawQuickStartUI(1);
                break
            case KEY_2:
                $('canvas').attr('data-game-status', 'menu-champions');
                players = 2;
                drawQuickStartUI(2);
                break
            case KEY_3:
                startGame(true, true);
                break
            case KEY_4:
                startGame(false, true);
                break;
            case KEY_5:
                if (getGameName(99) !== '') {
                    resumeLoadGame = true;
                    startGame(true, true);
                }
                break;
            case KEY_6:
                startGame(false, true, null, null, true);
                break;
        }
    }

}

function checkClickEvents() {
    $(document).on('tap', 'html', function(e) {
        var t = $(this).find('canvas');
        var x = (e.pageX - (canvas.offsetLeft * scaleReal)) / (scale * scaleReal);
        var y = (e.pageY - (canvas.offsetTop * scaleReal)) / (scale * scaleReal);
        if (t.attr('data-game-status') === 'started') {
            //if (paused) {
            //	pauseGame(false);
            //}
            var p = 0;
            for (pid in player) {
                pid = parseInt(pid);
                p += processCanvasInput(pid, x, y) + 1;
            }
            if (p > 0) {
                redrawUI(p - 1);
            }
        } else if (t.attr('data-game-status') === 'menu') {
            processCanvasInputMenu(x, y);
        } else if (t.attr('data-game-status') === 'menu-champions') {
            uiChampSelectArea(x, y, currentPlayer);

            if (championSelect[currentPlayer].mode === UI_CHARACTER_SELECT_POCKET) {
                for (s = UI_CLICK_POCKET_SLOT_1; s <= UI_CLICK_POCKET_SLOT_12; s++) {
                    if (uiClickInArea(x, y, s, player[currentPlayer])) {
                        var it = champion[championSelect[currentPlayer].champID].pocket[(s - UI_CLICK_POCKET_SLOT_1)];
                        if (currentPlayer === 0) {
                            drawFillRect(168, player[currentPlayer].ScreenY + 79, 155, 8, colourData['BLUE_DARK']);
                        } else {
                            drawFillRect(168, player[currentPlayer].ScreenY + 79, 155, 8, colourData['RED_DARK']);
                        }
                        writeFontImage(itemRef[it.id].name, 170, (player[currentPlayer].ScreenY + 80), colourData['YELLOW']);
                    }
                }
            } else if (championSelect[currentPlayer].mode === UI_CHARACTER_SELECT_SPELLBOOK) {
                spellBookAreas(x, y, player[currentPlayer]);
            }

        }
    });
}

function processCanvasInput(pid, x, y) {
    var p = player[parseInt(pid)];
    if (!paused) {
        if (!p.sleeping) {

        } else {
            if (uiClickInArea(x, y, UI_CLICK_PLAYERS_AREA, p) && (p.fairyDetails.champ === null || !uiClickInArea(x, y, UI_CLICK_VIEWPORT, p))) {
                p.wakeUp();
                return pid;
            } else if (p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY) {
                if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_SERPENT_SPELL, p)) {
                    gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_SERPENT);
                    return 0;
                } else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_CHAOS_SPELL, p)) {
                    gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_CHAOS);
                    return 0;
                } else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_DRAGON_SPELL, p)) {
                    gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_DRAGON);
                    return 0;
                } else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_MOON_SPELL, p)) {
                    gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_MOON);
                    return 0;
                } else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_BACK, p)) {
                    p.nextChampionUp++;
                    p.sleep();
                    return 0;
                }
            } else if (p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY_SERPENT) {
                if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_TEXTAREA_0, p)) {
                    //show buy spell screen
                    p.fairyDetails.spell = p.fairyDetails.champ.getUnlearntSpellsByColour(0)[0];
                    gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_SPELLDETAILS);
                    return 0;
                } else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_TEXTAREA_1, p)) {
                    //show buy spell screen
                    p.fairyDetails.spell = p.fairyDetails.champ.getUnlearntSpellsByColour(0)[1];
                    gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_SPELLDETAILS);
                    return 0;
                } else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_BACK, p)) {
                    gotoFairyMode(p, UI_CENTER_PANEL_FAIRY);
                    return 0;
                }
            } else if (p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY_CHAOS) {
                if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_TEXTAREA_0, p)) {
                    //show buy spell screen
                    p.fairyDetails.spell = p.fairyDetails.champ.getUnlearntSpellsByColour(1)[0];
                    gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_SPELLDETAILS);
                    return 0;
                } else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_TEXTAREA_1, p)) {
                    //show buy spell screen
                    p.fairyDetails.spell = p.fairyDetails.champ.getUnlearntSpellsByColour(1)[1];
                    gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_SPELLDETAILS);
                    return 0;
                } else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_BACK, p)) {
                    gotoFairyMode(p, UI_CENTER_PANEL_FAIRY);
                    return 0;
                }
            } else if (p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY_DRAGON) {
                if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_TEXTAREA_0, p)) {
                    //show buy spell screen
                    p.fairyDetails.spell = p.fairyDetails.champ.getUnlearntSpellsByColour(2)[0];
                    gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_SPELLDETAILS);
                    return 0;
                } else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_TEXTAREA_1, p)) {
                    //show buy spell screen
                    p.fairyDetails.spell = p.fairyDetails.champ.getUnlearntSpellsByColour(2)[1];
                    gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_SPELLDETAILS);
                    return 0;
                } else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_BACK, p)) {
                    gotoFairyMode(p, UI_CENTER_PANEL_FAIRY);
                    return 0;
                }
            } else if (p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY_MOON) {
                if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_TEXTAREA_0, p)) {
                    //show buy spell screen
                    p.fairyDetails.spell = p.fairyDetails.champ.getUnlearntSpellsByColour(3)[0];
                    gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_SPELLDETAILS);
                    return 0;
                } else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_TEXTAREA_1, p)) {
                    //show buy spell screen
                    p.fairyDetails.spell = p.fairyDetails.champ.getUnlearntSpellsByColour(3)[1];
                    gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_SPELLDETAILS);
                    return 0;
                } else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_BACK, p)) {
                    gotoFairyMode(p, UI_CENTER_PANEL_FAIRY);
                    return 0;
                }
            } else if (p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY_SPELLDETAILS) {

                if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_SERPENT_SPELL, p)) {
                    p.fairyDetails.champ.buySpell(p.fairyDetails.spell);
                    return 0;
                } else if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_BACK, p)) {
                    gotoFairyMode(p, UI_CENTER_PANEL_FAIRY);
                    return 0;
                }
            }
        }

        if (p.uiRightPanel.mode === UI_RIGHT_PANEL_MAIN) {

            if (uiClickInArea(x, y, UI_CLICK_OPEN_POCKETS, p)) {
                p.uiRightPanel.mode = UI_RIGHT_PANEL_POCKETS;
                p.uiRightPanel.activePocket = 0;
                p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
                return pid;
            } else if (uiClickInArea(x, y, UI_CLICK_INTERACT, p)) {
                var ch = p.getChampion(p.championLeader);
                if (ch.activeSpell.id > -1) {
                    ch.expireSpell();
                } else if (ch.selectedSpell === null) {
                    p.action();
                } else {
                    p.castSpell(ch.selectedSpell, ch);
                }
                p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
                return pid;
            } else if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_ICON, p)) {
                p.uiRightPanel.mode = UI_RIGHT_PANEL_SPELLBOOK;
                p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
                return pid;
            } else if (uiClickInArea(x, y, UI_CLICK_CHARACTER_STATS, p)) {
                p.uiRightPanel.mode = UI_RIGHT_PANEL_STATS;
                p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
                return pid;
            } else if (uiClickInArea(x, y, UI_CLICK_ROTATE_LEFT, p)) {
                if (!p.frozen) p.rotate(-1);
            } else if (uiClickInArea(x, y, UI_CLICK_ROTATE_RIGHT, p)) {
                if (!p.frozen) p.rotate(1);
            } else if (uiClickInArea(x, y, UI_CLICK_MOVE_FORWARD, p)) {
                if (!p.frozen) p.move(DIRECTION_NORTH);
            } else if (uiClickInArea(x, y, UI_CLICK_MOVE_BACKWARDS, p)) {
                if (!p.frozen) p.move(DIRECTION_SOUTH);
            } else if (uiClickInArea(x, y, UI_CLICK_MOVE_LEFT, p)) {
                if (!p.frozen) p.move(DIRECTION_WEST);
            } else if (uiClickInArea(x, y, UI_CLICK_MOVE_RIGHT, p)) {
                if (!p.frozen) p.move(DIRECTION_EAST);
            } else if (uiClickInArea(x, y, UI_CLICK_ATTACK, p)) {
                p.attacking = true;
            } else if (uiClickInArea(x, y, UI_CLICK_DEFEND, p)) {
                p.attack(null, false);
            } else if (uiClickInArea(x, y, UI_CLICK_CHAMP_FRONT_LEFT, p)) {
                p.exchangeChampionPosition(p.championHighlite, 0);
                p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
                return pid;
            } else if (uiClickInArea(x, y, UI_CLICK_CHAMP_FRONT_RIGHT, p)) {
                p.exchangeChampionPosition(p.championHighlite, 1);
                p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
                return pid;
            } else if (uiClickInArea(x, y, UI_CLICK_CHAMP_BACK_LEFT, p)) {
                p.exchangeChampionPosition(p.championHighlite, 3);
                p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
                return pid;
            } else if (uiClickInArea(x, y, UI_CLICK_CHAMP_BACK_RIGHT, p)) {
                p.exchangeChampionPosition(p.championHighlite, 2);
                p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
                return pid;
            }

        } else if (p.uiRightPanel.mode === UI_RIGHT_PANEL_POCKETS) {
            if (!p.dead) {
                for (s = UI_CLICK_POCKET_SLOT_1; s <= UI_CLICK_POCKET_SLOT_12; s++) {
                    if (uiClickInArea(x, y, s, p)) {
                        p.exchangeItemWithHand(s - UI_CLICK_POCKET_SLOT_1);
                        p.redrawLeftRightUiFlag = UI_REDRAW_POCKETS;
                        return pid;
                    }
                }
                if (uiClickInArea(x, y, UI_CLICK_POCKET_HAND, p)) {
                    p.useItemActivePocket();
                    p.redrawLeftRightUiFlag = UI_REDRAW_POCKETS;
                    return pid;
                }
            }
            for (cid = UI_CLICK_POCKET_CHARACTER_0; cid <= UI_CLICK_POCKET_CHARACTER_3; cid++) {
                if (uiClickInArea(x, y, cid, p)) {
                    var ap = cid - UI_CLICK_POCKET_CHARACTER_0;
                    var c = p.getOrderedChampionIds();
                    var ch = p.getChampion(c[ap]);
                    if (ch !== null && ch.recruitment.attached) {
                        p.uiRightPanel.activePocket = ap;
                        p.redrawLeftRightUiFlag = UI_REDRAW_POCKETS;
                        return pid;
                    }
                    break;
                }
            }
            if (uiClickInArea(x, y, UI_CLICK_POCKET_BACK, p)) {
                p.uiRightPanel.mode = UI_RIGHT_PANEL_MAIN;
                p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
                return pid;
            }

        } else if (p.uiRightPanel.mode === UI_RIGHT_PANEL_STATS) {
            if (uiClickInArea(x, y, UI_CLICK_CLOSE_SCRIPT, p)) {
                p.uiRightPanel.mode = UI_RIGHT_PANEL_MAIN;
                p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
                return pid;
            }
        } else if (p.uiRightPanel.mode === UI_RIGHT_PANEL_SCROLL) {
            if (uiClickInArea(x, y, UI_CLICK_CLOSE_SCRIPT, p)) {
                p.uiRightPanel.mode = UI_RIGHT_PANEL_MAIN;
                p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
                return pid;
            }
        } else if (p.uiRightPanel.mode === UI_RIGHT_PANEL_SPELLBOOK) {
            if (!p.dead) {
                if (spellBookAreas(x, y, p) > -1) {
                    return p.id;
                }
            }
        }
        if (p.uiLeftPanel.mode === UI_LEFT_PANEL_MODE_STATS) {

            if (uiClickInArea(x, y, UI_CLICK_CHAMP1, p)) {
                toggleChampUI(0, p);
                redrawUI(p.id, UI_REDRAW_LEFT);
                //return pid;
            } else if (uiClickInArea(x, y, UI_CLICK_CHAMP2, p)) {
                toggleChampUI(1, p);
                p.redrawLeftRightUiFlag = UI_REDRAW_LEFT;
                return pid;
            } else if (uiClickInArea(x, y, UI_CLICK_CHAMP3, p)) {
                toggleChampUI(2, p);
                p.redrawLeftRightUiFlag = UI_REDRAW_LEFT;
                return pid;
            } else if (uiClickInArea(x, y, UI_CLICK_CHAMP4, p)) {
                toggleChampUI(3, p);
                p.redrawLeftRightUiFlag = UI_REDRAW_LEFT;
                return pid;
            } else if (uiClickInArea(x, y, UI_CLICK_STATS_BOX, p)) {
                p.uiLeftPanel.mode = UI_LEFT_PANEL_MODE_COMMAND;
                p.redrawLeftRightUiFlag = UI_REDRAW_LEFT;
                return pid;
            }
        } else if (p.uiLeftPanel.mode === UI_LEFT_PANEL_MODE_COMMAND) {
            if (uiClickInArea(x, y, UI_CLICK_SLEEP, p)) {
                p.nextChampionUp = 0;
                p.sleep();
                p.redrawLeftRightUiFlag = UI_REDRAW_COMMAND;
                return pid;
            }
        }
    }

    //game options (works when paused)
    if (!p.sleeping) {
        if (p.uiCenterPanel.mode === UI_CENTER_PANEL_GAMESTATE_MENU || p.uiCenterPanel.mode === UI_CENTER_PANEL_GAMESTATE_SAVE || p.uiCenterPanel.mode === UI_CENTER_PANEL_GAMESTATE_LOAD) {
            //uiGameStateMenu(x, y, p);
        } else if (!paused && !p.dead && uiClickInArea(x, y, UI_CLICK_VIEWPORT, p)) {
            return checkClickInViewPortal(p, x, y);
        }
        if (p.uiLeftPanel.mode === UI_LEFT_PANEL_MODE_COMMAND) {
            if (uiClickInArea(x, y, UI_CLICK_BACK, p)) {
                checkBackButton(p);
                pauseGame(false);
                return pid;
            } else if (uiClickInArea(x, y, UI_CLICK_PAUSE, p)) {
                p.redrawLeftRightUiFlag = UI_REDRAW_COMMAND;
                if (paused) {
                    pauseGame(false);
                } else {
                    pauseGame(true);
                }
                return pid;
            } else if (uiClickInArea(x, y, UI_CLICK_SAVE, p)) {
                if (p.uiCenterPanel.mode === UI_CENTER_PANEL_GAMESTATE_MENU) {
                    pauseGame(false);
                    p.uiCenterPanel.mode = UI_CENTER_PANEL_VIEWPORT;
                } else if (p.uiCenterPanel.mode === UI_CENTER_PANEL_GAMESTATE_SAVE || p.uiCenterPanel.mode === UI_CENTER_PANEL_GAMESTATE_LOAD) {
                    pauseGame(false);
                    p.uiCenterPanel.mode = UI_CENTER_PANEL_VIEWPORT;
                    p.message();
                } else {
                    pauseGame(true);
                    p.uiCenterPanel.mode = UI_CENTER_PANEL_GAMESTATE_MENU;
                    showGameStateMenu(p);
                }
                p.redrawLeftRightUiFlag = UI_REDRAW_COMMAND;
                return pid;
            }
            if (p.communication.mode === COMMUNICATION_PAGE_COMMUNICATE_0 || p.communication.mode === COMMUNICATION_PAGE_COMMUNICATE_1) {
                if (uiClickInArea(x, y, UI_CLICK_TOGGLEUP, p)) {
                    var t = p.communication.mode + 1;
                    if (t > 2) {
                        t = 1;
                    }
                    p.communication.mode = t;
                    return pid;
                }
                if (uiClickInArea(x, y, UI_CLICK_TOGGLEDOWN, p)) {
                    var t = p.communication.mode - 1;
                    if (t < 1) {
                        t = 2;
                    }
                    p.communication.mode = t;
                    return pid;
                }
            }
            if (!paused) {
                checkCommunicationArea(p, x, y, false);
            }
        }
    }

    /*if (p.sleeping) {
            p.wakeUp();
            return pid;
        }*/

    return -1;
}

function processCanvasInputMenu(x, y) {

    //var t = $(this).find('canvas');
    if (startMenu){
        if (uiClickInArea(x, y, UI_CLICK_START_ONE_PLAYER)) { //BLOODWYCH
            gameType = GAME_BLOODWYCH;
            loadGFXData();
            startMenu = false;
        } else if (uiClickInArea(x, y, UI_CLICK_START_TWO_PLAYER)) { //EXTENDED LEVELS
            gameType = GAME_EXTENDED_LEVELS;
            loadGFXData();
            startMenu = false;
        } else if (uiClickInArea(x, y, UI_CLICK_START_QUICK_ONE_PLAYER)) { //BOOK OF SKULLS
            gameType = GAME_BOOK_OF_SKULLS;
            loadGFXData();
            startMenu = false;
        } else if (uiClickInArea(x, y, UI_CLICK_START_QUICK_TWO_PLAYER)) { //CUSTOM DATA
            gameType = CUSTOM;
            loadGFXData();
            startMenu = false;
        } else if (uiClickInArea(x, y, UI_CLICK_START_RESUME_GAME)) { //MAP VIEWER

        }
    }else{

        if (uiClickInArea(x, y, UI_CLICK_START_ONE_PLAYER)) {
            $('canvas').attr('data-game-status', 'menu-champions');
            players = 1;
            drawQuickStartUI(0);
        } else if (uiClickInArea(x, y, UI_CLICK_START_TWO_PLAYER)) {
            $('canvas').attr('data-game-status', 'menu-champions');
            players = 2;
            drawQuickStartUI(0);
        } else if (uiClickInArea(x, y, UI_CLICK_START_QUICK_ONE_PLAYER)) {
            startGame(true, true);
        } else if (uiClickInArea(x, y, UI_CLICK_START_QUICK_TWO_PLAYER)) {
            startGame(false, true);
        } else if (uiClickInArea(x, y, UI_CLICK_START_RESUME_GAME) && getGameName(99) !== '') {
            resumeLoadGame = true;
            startGame(true, true);
        }
    }
}

function viewportTouch(x, y, xy) {
    for (p in player) {
        xy = {
            x: Math.floor((x - player[p].PortalX) / scale / 42.67),
            y: Math.floor((y - player[p].PortalY) / scale / 38)
        };
    }
}

function mouseXY(e) {
    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
        var currentColour = cursorType;
        if (typeof player[0] !== 'undefined') {
            if (typeof player[1] !== 'undefined') {
                if ($('canvas').attr('data-game-status') === 'menu-champions') {
                if (currentPlayer === 0) {
                    cursorType = cursorBlue;
                    if (currentColour !== cursorType) {
                        if (cursorType === cursorRed) {
                            canvas.style.cursor = "url('./images/misc/cursor1.png'),auto";
                        } else {
                            canvas.style.cursor = "url('./images/misc/cursor0.png'),auto";
                        }
                    }
                } else {
                    cursorType = cursorRed;
                    if (currentColour !== cursorType) {
                        if (cursorType === cursorRed) {
                            canvas.style.cursor = "url('./images/misc/cursor1.png'),auto";
                        } else {
                            canvas.style.cursor = "url('./images/misc/cursor0.png'),auto";
                        }
                    }
                }
            } else {
                if (mouseY > canvas.height / 2) {
                    cursorType = cursorRed;
                } else {
                    cursorType = cursorBlue;
                }
                if (currentColour !== cursorType) {
                    if (cursorType === cursorRed) {
                        canvas.style.cursor = "url('./images/misc/cursor1.png'),auto";
                    } else {
                        canvas.style.cursor = "url('./images/misc/cursor0.png'),auto";
                    }
                }
            }
            }else{

            }

        }
        if (typeof player !== 'undefined') {
            for (p in player) {
                if (!paused) {
                    checkCommunicationArea(player[p], mouseX / (scale * scaleReal), mouseY / (scale * scaleReal), true);
                }
            }
        }
    }

}

function leftOrRight(p, x, row) {
    if (TEXT_COMMUNICATION_COMMANDS[p.communication.mode][row].width <= x) {
        return false;
    }
    return true;
}

function checkBackButton(p) {
    switch (p.communication.mode) {
        case COMMUNICATION_PAGE_MAIN:
            p.uiLeftPanel.mode = UI_LEFT_PANEL_MODE_STATS;
            p.redrawLeftRightUiFlag = UI_REDRAW_LEFT;
            break;
        case COMMUNICATION_PAGE_COMMUNICATE_0:
        case COMMUNICATION_PAGE_COMMUNICATE_1:
            p.doneCommunication();
            break;
        case COMMUNICATION_PAGE_IDENTIFY:
            p.communication.mode = COMMUNICATION_PAGE_COMMUNICATE_0;
            break;
        case COMMUNICATION_PAGE_INQUIRY:
            p.communication.mode = COMMUNICATION_PAGE_COMMUNICATE_0;
            break;
        case COMMUNICATION_PAGE_TRADING:
            p.communication.mode = COMMUNICATION_PAGE_COMMUNICATE_1;
            break;
        case COMMUNICATION_PAGE_SMALLTALK:
            p.communication.mode = COMMUNICATION_PAGE_COMMUNICATE_1;
            break;
        case COMMUNICATION_PAGE_NAMES:
            p.communication.mode = COMMUNICATION_PAGE_MAIN;
            break;
    }
}

function checkCommunicationArea(p, x, y, hover) {
    if (p.uiLeftPanel.mode === UI_LEFT_PANEL_MODE_COMMAND) {
        if (uiClickInArea(x, y, UI_CLICK_COMMUNICATION_AREA, p)) {
            for (i = 0; i < TEXT_COMMUNICATION_COMMANDS[p.communication.mode].length; i++) {
                var com = TEXT_COMMUNICATION_COMMANDS[p.communication.mode][i];
                if (com.left) {
                    x1 = p.ScreenX;
                } else {
                    x1 = p.ScreenX + 93 - com.width;
                }
                y1 = p.ScreenY + com.row * 8 + 47;
                if (x >= x1 && y >= y1 && x < x1 + com.width && y < y1 + 8) {
                    if (hover) {
                        drawCommunicationBox(p, i);
                        return;
                    } else {
                        p.doCommunication(i);
                        return;
                    }
                }
            }
        } else {
            drawCommunicationBox(p, null);
        }
    }
}

function checkClickInViewPortal(p, x, y) {
    switch (p.uiCenterPanel.mode) {
        case UI_CENTER_PANEL_VIEWPORT:
            if (uiClickInArea(x, y, UI_CLICK_PORTAL_ITEM_LEFT_CLOSE, p)) {
                if (p.actionItem(0)) {
                    return p.id;
                }
            } else if (uiClickInArea(x, y, UI_CLICK_PORTAL_ITEM_RIGHT_CLOSE, p)) {
                if (p.actionItem(1)) {
                    return p.id;
                }
            }
            var o15 = p.getObjectOnPos(15, 2);
            var o18 = p.getObjectOnPos(18, 0);
            if (o15 === OBJECT_SHELF) {
                if (uiClickInArea(x, y, UI_CLICK_PORTAL_SHELF_TOP, p)) {
                    if (p.actionItem(3)) {
                        return p.id;
                    }
                } else if (uiClickInArea(x, y, UI_CLICK_PORTAL_SHELF_BOTTOM, p)) {
                    if (p.actionItem(2)) {
                        return p.id;
                    }
                }
            } else if (o15 === OBJECT_SWITCH || o15 === OBJECT_GEM) {
                if (uiClickInArea(x, y, UI_CLICK_PORTAL_SWITCH, p)) {
                    p.action();
                    return p.id;
                }
            } else if (o15 === OBJECT_WOOD || o18 === OBJECT_WOOD) {
                return p.id;
            } else if (o15 === OBJECT_WOOD_DOOR || o18 === OBJECT_WOOD_DOOR || o15 === OBJECT_WOOD_DOOR_OPEN || o18 === OBJECT_WOOD_DOOR_OPEN) {
                if (uiClickInArea(x, y, UI_CLICK_PORTAL_WOODEN_DOOR, p)) {
                    p.action();
                    return p.id;
                }
            } else if (o15 === OBJECT_WALL) {
                return p.id;
            } else if (uiClickInArea(x, y, UI_CLICK_PORTAL_ITEM_LEFT_BACK, p)) {
                if (p.actionItem(3)) {
                    return p.id;
                }
            } else if (uiClickInArea(x, y, UI_CLICK_PORTAL_ITEM_RIGHT_BACK, p)) {
                if (p.actionItem(2)) {
                    return p.id;
                }
            }

            if (o15 === OBJECT_DOOR || o15 === OBJECT_DOOR_OPEN) {
                if (uiClickInArea(x, y, UI_CLICK_PORTAL_DOOR, p)) {
                    p.action();
                    return p.id;
                }
            }
            if (o15 === OBJECT_SCROLL) {
                if (uiClickInArea(x, y, UI_CLICK_PORTAL_SWITCH, p)) {
                    if (p.uiRightPanel.mode === UI_RIGHT_PANEL_SCROLL) {
                        p.uiRightPanel.mode = UI_RIGHT_PANEL_MAIN;
                    } else {
                        p.uiRightPanel.mode = UI_RIGHT_PANEL_SCROLL;
                    }
                    return p.id;
                }
            }
            break;
        case UI_CENTER_PANEL_SLEEPING:
            break;
        case UI_CENTER_PANEL_DEAD:
            break;
        default:
            break;
    }
    return -1;
}

function spellBookAreas(x, y, p, ch) {

    pid = p.id;

    var ch = champion[p.champion[p.championLeader]];

    if (uiClickInArea(x, y, UI_CLICK_CLOSE_SPELLBOOK, p)) {
        p.uiRightPanel.mode = UI_RIGHT_PANEL_MAIN;
        p.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
        return pid;
    }
    if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_TURNPAGE_BACK, p)) {
        changeSpellBookPage(p, false);
        return pid;
    }
    if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_TURNPAGE_FORWARD, p)) {
        changeSpellBookPage(p, true);
        return pid;
    }
    if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_0, p)) {
        ch.selectSpell(0);
        if (championSelect[currentPlayer].champID === -1) {
            p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
        } else {
            drawSpellBook(p);
        }
        return pid;
    }
    if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_1, p)) {
        ch.selectSpell(1);
        if (championSelect[currentPlayer].champID === -1) {
            p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
        } else {
            drawSpellBook(p);
        }
        return pid;
    }
    if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_2, p)) {
        ch.selectSpell(2);
        if (championSelect[currentPlayer].champID === -1) {
            p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
        } else {
            drawSpellBook(p);
        }
        return pid;
    }
    if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_3, p)) {
        ch.selectSpell(3);
        if (championSelect[currentPlayer].champID === -1) {
            p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
        } else {
            drawSpellBook(p);
        }
        return pid;
    }
    if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_4, p)) {
        ch.selectSpell(4);
        if (championSelect[currentPlayer].champID === -1) {
            p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
        } else {
            drawSpellBook(p);
        }
        return pid;
    }
    if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_5, p)) {
        ch.selectSpell(5);
        if (championSelect[currentPlayer].champID === -1) {
            p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
        } else {
            drawSpellBook(p);
        }
        return pid;
    }
    if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_6, p)) {
        ch.selectSpell(6);
        if (championSelect[currentPlayer].champID === -1) {
            p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
        } else {
            drawSpellBook(p);
        }
        return pid;
    }
    if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_7, p)) {
        ch.selectSpell(7);
        if (championSelect[currentPlayer].champID === -1) {
            p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
        } else {
            drawSpellBook(p);
        }
        return pid;
    }
    if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_FIRE_1, p) || uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_FIRE_2, p)) {
        if (ch.selectedSpell !== null) {
            p.castSpell(ch.selectedSpell, ch);
            return pid;
        }
    }
    if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_COST_UP, p)) {
        ch.setSpellCost(true);
        p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
        return pid;
    }
    if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_SPELL_COST_DOWN, p)) {
        ch.setSpellCost(false);
        p.redrawLeftRightUiFlag = UI_REDRAW_SPELLBOOK;
        return pid;
    }
    return -1;
}

function uiClickAreas() {

    //X , Y , WIDTH , HEIGHT

    var UCA = [];

    UCA.push({
        x: 0,
        y: 0,
        width: 50,
        height: 44
    }); //CHAMP 1
    UCA.push({
        x: 51,
        y: 0,
        width: 43,
        height: 44
    }); //STATS GRAPH
    UCA.push({
        x: 0,
        y: 45,
        width: 30,
        height: 41
    }); //CHAMP 2
    UCA.push({
        x: 32,
        y: 45,
        width: 30,
        height: 41
    }); //CHAMP 3
    UCA.push({
        x: 64,
        y: 45,
        width: 30,
        height: 41
    }); //CHAMP 4

    UCA.push({
        x: 96,
        y: 9,
        width: 128,
        height: 76
    }); //3D VIEWPORT

    UCA.push({
        x: 226,
        y: 1,
        width: 94,
        height: 19
    }); //NAME TAG AREA
    UCA.push({
        x: 226,
        y: 22,
        width: 37,
        height: 22
    }); //SPELLBOOK
    UCA.push({
        x: 265,
        y: 22,
        width: 22,
        height: 22
    }); //CHARACTER STATS
    UCA.push({
        x: 289,
        y: 22,
        width: 16,
        height: 16
    }); //INTERACT
    UCA.push({
        x: 305,
        y: 22,
        width: 16,
        height: 16
    }); //OPEN POCKETS
    UCA.push({
        x: 226,
        y: 47,
        width: 13,
        height: 13
    }); //ROTATE LEFT
    UCA.push({
        x: 239,
        y: 47,
        width: 16,
        height: 13
    }); //MOVE FORWARD
    UCA.push({
        x: 255,
        y: 47,
        width: 13,
        height: 13
    }); //ROTATE RIGHT
    UCA.push({
        x: 226,
        y: 60,
        width: 13,
        height: 14
    }); //MOVE LEFT
    UCA.push({
        x: 239,
        y: 60,
        width: 16,
        height: 14
    }); //MOVE BACKWARDS
    UCA.push({
        x: 255,
        y: 60,
        width: 13,
        height: 14
    }); //MOVE RIGHT
    UCA.push({
        x: 269,
        y: 45,
        width: 17,
        height: 16
    }); //ATTACK
    UCA.push({
        x: 269,
        y: 61,
        width: 17,
        height: 15
    }); //DEFEND

    UCA.push({
        x: 225,
        y: 22,
        width: 16,
        height: 16
    }); //POCKET SLOT 1
    UCA.push({
        x: 241,
        y: 22,
        width: 16,
        height: 16
    }); //POCKET SLOT 2
    UCA.push({
        x: 257,
        y: 22,
        width: 16,
        height: 16
    }); //POCKET SLOT 3
    UCA.push({
        x: 273,
        y: 22,
        width: 16,
        height: 16
    }); //POCKET SLOT 4
    UCA.push({
        x: 289,
        y: 22,
        width: 16,
        height: 16
    }); //POCKET SLOT 5
    UCA.push({
        x: 305,
        y: 22,
        width: 16,
        height: 16
    }); //POCKET SLOT 6
    UCA.push({
        x: 225,
        y: 38,
        width: 16,
        height: 16
    }); //POCKET SLOT 7
    UCA.push({
        x: 241,
        y: 38,
        width: 16,
        height: 16
    }); //POCKET SLOT 8
    UCA.push({
        x: 257,
        y: 38,
        width: 16,
        height: 16
    }); //POCKET SLOT 9
    UCA.push({
        x: 273,
        y: 38,
        width: 16,
        height: 16
    }); //POCKET SLOT 10
    UCA.push({
        x: 289,
        y: 38,
        width: 16,
        height: 16
    }); //POCKET SLOT 11
    UCA.push({
        x: 305,
        y: 38,
        width: 16,
        height: 16
    }); //POCKET SLOT 12
    UCA.push({
        x: 225,
        y: 63,
        width: 16,
        height: 15
    }); //POCKET CHARACTER 0
    UCA.push({
        x: 241,
        y: 63,
        width: 16,
        height: 15
    }); //POCKET CHARACTER 1
    UCA.push({
        x: 257,
        y: 63,
        width: 16,
        height: 15
    }); //POCKET CHARACTER 2
    UCA.push({
        x: 273,
        y: 63,
        width: 16,
        height: 15
    }); //POCKET CHARACTER 3
    UCA.push({
        x: 289,
        y: 63,
        width: 16,
        height: 15
    }); //POCKET HAND
    UCA.push({
        x: 305,
        y: 63,
        width: 16,
        height: 15
    }); //POCKET BACK

    UCA.push({
        x: 56,
        y: 0,
        width: 16,
        height: 16
    }); //PAUSE BUTTON
    UCA.push({
        x: 73,
        y: 0,
        width: 16,
        height: 16
    }); //SAVE BUTTON
    UCA.push({
        x: 56,
        y: 16,
        width: 16,
        height: 16
    }); //SLEEP BUTTON
    UCA.push({
        x: 73,
        y: 16,
        width: 16,
        height: 16
    }); //LEFT BACK BUTTON
    UCA.push({
        x: 57,
        y: 32,
        width: 14,
        height: 12
    }); //SCROLLUP BUTTON
    UCA.push({
        x: 71,
        y: 32,
        width: 14,
        height: 12
    }); //SCROLLDOWN BUTTON
    UCA.push({
        x: 289,
        y: 46,
        width: 16,
        height: 14
    }); //Character Front Left Icon
    UCA.push({
        x: 305,
        y: 46,
        width: 16,
        height: 14
    }); //Character Front Right Icon
    UCA.push({
        x: 289,
        y: 61,
        width: 16,
        height: 14
    }); //Character Back Left Icon
    UCA.push({
        x: 305,
        y: 61,
        width: 16,
        height: 14
    }); //Character Back Right Icon
    UCA.push({
        x: 225,
        y: 0,
        width: 95,
        height: 86
    }); //Character Stats Exit
    UCA.push({
        x: 255,
        y: -1,
        width: 35,
        height: 8
    }); //Spell Book Exit
    UCA.push({
        x: 0,
        y: 0,
        width: 320,
        height: 86
    }); //Player Area
    UCA.push({
        x: 135,
        y: 25,
        width: 50,
        height: 15
    }); //Portal - Shelf Top
    UCA.push({
        x: 135,
        y: 40,
        width: 50,
        height: 15
    }); //Portal - Shelf Bottom
    UCA.push({
        x: 135,
        y: 25,
        width: 50,
        height: 29
    }); //Portal - Switch
    UCA.push({
        x: 118,
        y: 12,
        width: 83,
        height: 53
    }); //Portal - Door
    UCA.push({
        x: 110,
        y: 70,
        width: 45,
        height: 8
    }); //Portal - Item Close Left
    UCA.push({
        x: 165,
        y: 70,
        width: 45,
        height: 8
    }); //Portal - Item Close Right
    UCA.push({
        x: 120,
        y: 61,
        width: 35,
        height: 9
    }); //Portal - Item Back Left
    UCA.push({
        x: 165,
        y: 61,
        width: 35,
        height: 9
    }); //Portal - Item Back Right
    UCA.push({
        x: 111,
        y: 8,
        width: 98,
        height: 63
    }); //Portal - Wooden Door
    UCA.push({
        x: 113,
        y: 52,
        width: 15,
        height: 15
    }); //Fairy - Serpent Spell
    UCA.push({
        x: 129,
        y: 52,
        width: 15,
        height: 15
    }); //Fairy - Chaos Spell
    UCA.push({
        x: 145,
        y: 52,
        width: 15,
        height: 15
    }); //Fairy - Dragon Spell
    UCA.push({
        x: 161,
        y: 52,
        width: 15,
        height: 15
    }); //Fairy - Moon Spell
    UCA.push({
        x: 192,
        y: 52,
        width: 15,
        height: 15
    }); //Fairy - Back Button
    UCA.push({
        x: 136,
        y: 12,
        width: 85,
        height: 10
    }); //Fairy - Text Area 1
    UCA.push({
        x: 136,
        y: 22,
        width: 85,
        height: 10
    }); //Fairy - Text Area 2
    UCA.push({
        x: 226,
        y: -1,
        width: 30,
        height: 8
    }); //Spell Book - Turn Page Back
    UCA.push({
        x: 290,
        y: -1,
        width: 30,
        height: 8
    }); //Spell Book - Turn Page Forward
    UCA.push({
        x: 232,
        y: 14,
        width: 34,
        height: 8
    }); //Spell Book - Spell 1
    UCA.push({
        x: 232,
        y: 22,
        width: 34,
        height: 8
    }); //Spell Book - Spell 2
    UCA.push({
        x: 232,
        y: 30,
        width: 34,
        height: 8
    }); //Spell Book - Spell 3
    UCA.push({
        x: 232,
        y: 38,
        width: 34,
        height: 8
    }); //Spell Book - Spell 4
    UCA.push({
        x: 280,
        y: 14,
        width: 34,
        height: 8
    }); //Spell Book - Spell 5
    UCA.push({
        x: 280,
        y: 22,
        width: 34,
        height: 8
    }); //Spell Book - Spell 6
    UCA.push({
        x: 280,
        y: 30,
        width: 34,
        height: 8
    }); //Spell Book - Spell 7
    UCA.push({
        x: 280,
        y: 38,
        width: 34,
        height: 8
    }); //Spell Book - Spell 8
    UCA.push({
        x: 225,
        y: 62,
        width: 16,
        height: 16
    }); //Spell Book - Spell Fire 1
    UCA.push({
        x: 305,
        y: 62,
        width: 16,
        height: 16
    }); //Spell Book - Spell Fire 2
    UCA.push({
        x: 273,
        y: 70,
        width: 8,
        height: 8
    }); //Spell Book - Spell Cost Up
    UCA.push({
        x: 297,
        y: 70,
        width: 8,
        height: 8
    }); //Spell Book - Spell Cost Down
    UCA.push({
        x: 0,
        y: 46,
        width: 320,
        height: 16
    }); //Start Screen - 1. Start One Player Game
    UCA.push({
        x: 0,
        y: 62,
        width: 320,
        height: 16
    }); //Start Screen - 2. Start Two Player Game
    UCA.push({
        x: 0,
        y: 86,
        width: 320,
        height: 16
    }); //Start Screen - 3. Quickstart One Player Game
    UCA.push({
        x: 0,
        y: 102,
        width: 320,
        height: 16
    }); //Start Screen - 4. Quickstart Two Player Game
    UCA.push({
        x: 0,
        y: 47,
        width: 95,
        height: 31
    }); //Communication Area
    UCA.push({
        x: 1,
        y: 47,
        width: 93,
        height: 7
    }); //Communication First Row
    UCA.push({
        x: 1,
        y: 55,
        width: 93,
        height: 7
    }); //Communication Second Row
    UCA.push({
        x: 1,
        y: 63,
        width: 93,
        height: 7
    }); //Communication Third Row
    UCA.push({
        x: 1,
        y: 71,
        width: 93,
        height: 7
    }); //Communication Forth Row
    UCA.push({
        x: 172,
        y: 106,
        width: 20,
        height: 16
    }); //Champion Select 1 Player Pocket
    UCA.push({
        x: 196,
        y: 106,
        width: 20,
        height: 16
    }); //Champion Select 1 START
    UCA.push({
        x: 0,
        y: 126,
        width: 320,
        height: 16
    }); //Start Screen - 5. Resume last game
    return UCA;

}

function uiClickInArea(x, y, ui, p, clickArea) {

    if (typeof clickArea === "undefined") {
        clickArea = uiClickArea;
    }

    var px = 0;
    var py = 0;
    if (typeof p !== "undefined") {
        px = p.ScreenX;
        py = p.ScreenY;
    }
    if (x >= (px + clickArea[ui].x) * 1 && x < (px + clickArea[ui].x + clickArea[ui].width) * 1 && y >= (py + clickArea[ui].y) * 1 && y < (py + clickArea[ui].y + clickArea[ui].height) * 1) {
        if (debug) {
            if (ui !== UI_CLICK_VIEWPORT && ui !== UI_CLICK_PLAYERS_AREA && ui !== UI_CLICK_COMMUNICATION_AREA) {
                ctx.fillStyle = 'rgba(255, 255, 196, 0.75)';
                ctx.fillRect((px + clickArea[ui].x) * scale, (py + clickArea[ui].y) * scale, clickArea[ui].width * scale, clickArea[ui].height * scale);
            }
        }
        return true;
    }
    return false;
}

function createSelectGrid(myObject, myX, myY, myWidth, myHeight, cid) {
    myObject.push({
        x: myX,
        y: myY,
        width: myWidth,
        height: myHeight,
        champID: cid
    });
}

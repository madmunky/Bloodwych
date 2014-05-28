function doKeyDown(e) {

    switch (e.keyCode) {

        case KEYPAD_8:
            player[1].move(DIRECTION_NORTH);
            break; //8
        case KEYPAD_5:
            player[1].move(DIRECTION_SOUTH);
            break; //5
        case KEYPAD_4:
            player[1].move(DIRECTION_WEST);
            break; //4
        case KEYPAD_6:
            player[1].move(DIRECTION_EAST);
            break; //6
        case KEYPAD_7:
            player[1].rotateTo(player[1].d - 1);
            break; //7
        case KEYPAD_9:
            player[1].rotateTo(player[1].d + 1);
            break; //9
        case KEY_END:
            player[1].action();
            break; //End Key
        case KEYPAD_PLUS:
            player[1].toggleFrontObject();
            break; //+ Key
        case KEY_L: // THE L KEY
            switchTower((towerThis + 1) % TOWER_NAME.length);
            break;
        case KEY_T:
            //player[0].changeUpFloor();
            var ch = player[0].getActivePocketChampion();
            ch.pocket[POCKET_SLOT_0].setPocketItem((ch.pocket[POCKET_SLOT_0].id + 1) % 110, 1);
            redrawUI(0);
            PrintLog(itemRef[champion[player[0].championLeader].pocket[POCKET_SLOT_0].id].name + " ID: " + champion[player[0].championLeader].pocket[POCKET_SLOT_0].id.toString())
            break; // T KEY     
        case KEY_SPACEBAR:
            player[0].action();
            break; // SpaceBar        
        case KEY_G:
            //player[0].changeDownFloor();
            var ch = player[0].getActivePocketChampion();
            ch.pocket[POCKET_SLOT_0].setPocketItem((ch.pocket[POCKET_SLOT_0].id + 109) % 110, 1);
            redrawUI(0);
            PrintLog(itemRef[champion[player[0].championLeader].pocket[POCKET_SLOT_0].id].name + " ID: " + champion[player[0].championLeader].pocket[POCKET_SLOT_0].id.toString())
            break; // G KEY  
        case KEY_W:
            player[0].move(DIRECTION_NORTH);
            break; // W KEY
        case KEY_S:
            player[0].move(DIRECTION_SOUTH);
            break; // S KEY
        case KEY_A:
            player[0].move(DIRECTION_WEST);
            break; // A KEY
        case KEY_D:
            player[0].move(DIRECTION_EAST);
            break; // D KEY
        case KEY_Q:
            player[0].rotateTo(player[0].d - 1);
            break; // Q KEY
        case KEY_E:
            player[0].rotateTo(player[0].d + 1);
            break; // E KEY
        case KEY_R:
            player[0].toggleFrontObject();
            break; //R Key
        case KEY_F:
            player[0].testMode();
            break; // F cheat
        case KEY_PLUS:
            testPalette = testPalette + 1;
            break;
        case KEY_MINUS:
            testPalette = testPalette - 1;
            break;
        case KEY_6:
            testDirection = (testDirection + 3) % 4;
            break;
        case KEY_5:
            testDirection = (testDirection + 1) % 4;
            break;
        case KEY_7:
            testDistance = (testDistance + 1) % 3;
            PrintLog("Distance: " + testDistance);
            break;
        case KEY_8:
            testDistance = (testDistance + 3) % 3;
            PrintLog("Distance: " + testDistance);
            break;
        case KEY_0:
            testMon1 = (testMon1 + 1);
            break;
        case KEY_9:
            testMon1 = (testMon1 - 1);
            break;
        default:
            break;
    }
}

function checkClickEvents() {
    $('body').on('click', 'canvas#game-port', function(e) {
        if (typeof player !== "undefined") {
            var x = e.pageX - canvas.offsetLeft;
            var y = e.pageY - canvas.offsetTop;
            var xy;
            processCanvasInput(x, y, xy);
        }
    });
}

function touchDown() {
    touchXY();
}

function touchXY(e) {
    if (!e)
        var e = event;
    e.preventDefault();

    if (typeof player !== "undefined") {
        var x = e.targetTouches[0].pageX - canvas.offsetLeft;
        var y = e.targetTouches[0].pageY - canvas.offsetTop;
        var xy;
        viewportTouch(x, y, xy);
        processCanvasInput(x, y);

    }
}

function processCanvasInput(x, y) {

    for (p = 0; p < 2; p++) {
        var successfulClick = false;
        
        if (player[p].sleeping === true && uiClickInArea(x, y, UI_CLICK_PLAYERS_AREA, player[p])){
                player[p].sleeping = false;
        }
        
        if (uiClickInArea(x, y, UI_CLICK_VIEWPORT, player[p])) {
            player[p].action();
            successfulClick = true;
        }

        if (player[p].uiRightPanel.view === UI_RIGHT_PANEL_MAIN) {

            if (uiClickInArea(x, y, UI_CLICK_OPEN_POCKETS, player[p])) {
                player[p].uiRightPanel.view = UI_RIGHT_PANEL_POCKETS;
                player[p].uiRightPanel.activePocket = 0;
                successfulClick = true;
            }
            if (uiClickInArea(x, y, UI_CLICK_INTERACT, player[p])) {
                player[p].action();
                successfulClick = true;
            }
            
            if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_ICON, player[p])) {
                player[p].uiRightPanel.view = UI_RIGHT_PANEL_SPELLBOOK;
                successfulClick = true;
            }
            
            if (uiClickInArea(x, y, UI_CLICK_CHARACTER_STATS, player[p])) {
                player[p].uiRightPanel.view = UI_RIGHT_PANEL_STATS;
                successfulClick = true;
            }

            if (uiClickInArea(x, y, UI_CLICK_ROTATE_LEFT, player[p])) {
                player[p].rotateTo(player[p].d - 1);
                successfulClick = true;
            }
            if (uiClickInArea(x, y, UI_CLICK_ROTATE_RIGHT, player[p])) {
                player[p].rotateTo(player[p].d + 1);
                successfulClick = true;
            }
            if (uiClickInArea(x, y, UI_CLICK_MOVE_FORWARD, player[p])) {
                player[p].move(DIRECTION_NORTH);
                successfulClick = true;
            }
            if (uiClickInArea(x, y, UI_CLICK_MOVE_BACKWARDS, player[p])) {
                player[p].move(DIRECTION_SOUTH);
                successfulClick = true;
            }
            if (uiClickInArea(x, y, UI_CLICK_MOVE_LEFT, player[p])) {
                player[p].move(DIRECTION_WEST);
                successfulClick = true;
            }
            if (uiClickInArea(x, y, UI_CLICK_MOVE_RIGHT, player[p])) {
                player[p].move(DIRECTION_EAST);
                successfulClick = true;
            }
            if (uiClickInArea(x, y, UI_CLICK_ATTACK, player[p])) {
                player[p].attacking = true;
                successfulClick = true;
            }
            if (uiClickInArea(x, y, UI_CLICK_DEFEND, player[p])) {
				//player[p].attacking = false;
			    player[p].attack(false);
                successfulClick = true;
            }
            if (uiClickInArea(x, y, UI_CLICK_CHAMP_FRONT_LEFT, player[p])) {
                player[p].exchangeChampionPosition(0);
                successfulClick = true;
            } else if (uiClickInArea(x, y, UI_CLICK_CHAMP_FRONT_RIGHT, player[p])) {
            	player[p].exchangeChampionPosition(1);
                successfulClick = true;
            } else if (uiClickInArea(x, y, UI_CLICK_CHAMP_BACK_LEFT, player[p])) {
            	player[p].exchangeChampionPosition(3);
                successfulClick = true;
            } else if (uiClickInArea(x, y, UI_CLICK_CHAMP_BACK_RIGHT, player[p])) {
            	player[p].exchangeChampionPosition(2);
                successfulClick = true;
            }

        } else if (player[p].uiRightPanel.view === UI_RIGHT_PANEL_POCKETS) {
        	for(s = UI_CLICK_POCKET_SLOT_1; s <= UI_CLICK_POCKET_SLOT_12; s++) {
	        	if(uiClickInArea(x, y, s, player[p])) {
	        		player[p].exchangeItemWithHand(s - UI_CLICK_POCKET_SLOT_1);
	        		successfulClick = true;
	        		break;
	        	}
	        }
			for(cid = UI_CLICK_POCKET_CHARACTER_0; cid <= UI_CLICK_POCKET_CHARACTER_3; cid++) {
	        	if (uiClickInArea(x, y, cid, player[p])) {
					player[p].uiRightPanel.activePocket = cid - UI_CLICK_POCKET_CHARACTER_0;
					successfulClick = true;
					break;
	        	}
	        }
            if (uiClickInArea(x, y, UI_CLICK_POCKET_HAND, player[p])) {
                player[p].useItemInHand();
                successfulClick = true;
            }
            if (uiClickInArea(x, y, UI_CLICK_POCKET_BACK, player[p])) {
                player[p].uiRightPanel.view = UI_RIGHT_PANEL_MAIN;
                successfulClick = true;
            }

        } else if (player[p].uiRightPanel.view === UI_RIGHT_PANEL_STATS ) {
            if (uiClickInArea(x, y, UI_CLICK_CLOSE_SCRIPT, player[p])) {
                player[p].uiRightPanel.view = UI_RIGHT_PANEL_MAIN;
                successfulClick = true;                
            }                
        }
        else if (player[p].uiRightPanel.view === UI_RIGHT_PANEL_SPELLBOOK) {
            if (uiClickInArea(x, y, UI_CLICK_CLOSE_SPELLBOOK, player[p])) {
               player[p].uiRightPanel.view = UI_RIGHT_PANEL_MAIN;
               successfulClick = true;
            }
        }
        if (player[p].uiLeftPanel.mode === LEFT_PANEL_MODE_STATS) {

            if (uiClickInArea(x, y, UI_CLICK_CHAMP1, player[p])) {
                toggleChampUI(0, player[p]);
                successfulClick = true;
            }
            if (uiClickInArea(x, y, UI_CLICK_CHAMP2, player[p])) {
                toggleChampUI(1, player[p]);
                successfulClick = true;
            }
            if (uiClickInArea(x, y, UI_CLICK_CHAMP3, player[p])) {
                toggleChampUI(2, player[p]);
                successfulClick = true;
            }
            if (uiClickInArea(x, y, UI_CLICK_CHAMP4, player[p])) {
                toggleChampUI(3, player[p]);
                successfulClick = true;
            }
            if (uiClickInArea(x, y, UI_CLICK_STATS_BOX, player[p])) {
                player[p].uiLeftPanel.mode = LEFT_PANEL_MODE_COMMAND;
                successfulClick = true;
            }

        } else if (player[p].uiLeftPanel.mode === LEFT_PANEL_MODE_COMMAND) {

            if (uiClickInArea(x, y, UI_CLICK_BACK, player[p])) {
                player[p].uiLeftPanel.mode = LEFT_PANEL_MODE_STATS;
                successfulClick = true;
            }
            if (uiClickInArea(x, y, UI_CLICK_PAUSE, player[p])) {
                alert('PAUSED');
                successfulClick = true;
            }
            if (uiClickInArea(x, y, UI_CLICK_SAVE, player[p])) {
                alert('SAVE GAME');
                successfulClick = true;
            }
            if (uiClickInArea(x, y, UI_CLICK_SLEEP, player[p])) {
                player[p].sleeping = true;
                player[p].uiLeftPanel.mode = LEFT_PANEL_MODE_STATS;
                player[p].uiRightPanel.view = UI_RIGHT_PANEL_MAIN;
                successfulClick = true;
            }
//            if (uiClickInArea(x, y, UI_CLICK_TOGGLEUP, player[p])) {
//                alert('TOGGLE UP');
//                successfulClick = true;
//            }
//            if (uiClickInArea(x, y, UI_CLICK_TOGGLEDOWN, player[p])) {
//                alert('TOGGLE DOWN');
//                successfulClick = true;
//            }
        }
        if(successfulClick) {
            redrawUI(p);       
        }
    }
}

function viewportTouch(x, y, xy) {

    for (p = 0; p < 2; p++) {

        xy = {
            x: Math.floor((x - player[p].PortalX) / scale / 42.67),
            y: Math.floor((y - player[p].PortalY) / scale / 38)
        };


        if (xy.x >= 0 && xy.x <= 2 && xy.y >= 0 && xy.y <= 2) {
            if (xy.x === 0 && xy.y === 0) { //rotate left
                player[p].rotateTo(player[p].d - 1);
            } else if (xy.x === 2 && xy.y === 0) { //rotate right
                player[p].rotateTo(player[p].d + 1);
            } else if (xy.x === 1 && xy.y === 0) { //move forward
                player[p].move(DIRECTION_NORTH);
            } else if (xy.x === 0 && xy.y === 1) { //move left
                player[p].move(DIRECTION_WEST);
            } else if (xy.x === 2 && xy.y === 1) { //move right
                player[p].move(DIRECTION_EAST);
            } else if (xy.x === 1 && xy.y === 1) { //move backward
                player[p].move(DIRECTION_SOUTH);
            } else if (xy.y === 2) { //action
                player[p].action();
            }
        }
    }
}

function mouseXY(e) {
    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;

        if (mouseY > canvas.height / 2) {
            if (canvas.style.cursor === "url('./images/misc/cursor1.png'),auto") {} else {
                canvas.style.cursor = "url('./images/misc/cursor1.png'),auto";
            }
        } else {
            if (canvas.style.cursor === "url('./images/misc/cursor0.png'),auto") {} else {
                canvas.style.cursor = "url('./images/misc/cursor0.png'),auto";
            }
        }

    }

}

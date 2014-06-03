function doKeyDown(e) {
	if (player.length > 1) {
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
				player[1].rotate(-1);
				break; //7
			case KEYPAD_9:
				player[1].rotate(1);
				break; //9
			case KEY_END:
				player[1].action();
				break; //End Key
			case KEYPAD_PLUS:
				player[1].toggleFrontObject();
				break; //+ Key
			default:
				break;
		}
	}
	switch (e.keyCode) {
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
			player[0].rotate(-1);
			break; // Q KEY
		case KEY_E:
			player[0].rotate(1);
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

	for (pid = 0; pid < player.length; pid++) {
		var p = player[pid];
		var successfulClick = false;

		if (!p.sleeping && !p.dead && uiClickInArea(x, y, UI_CLICK_VIEWPORT, p)) {
			successfulClick = checkViewPortal(p, x, y);
		}

		if (p.sleeping && p.fairyDetails.champ === null && uiClickInArea(x, y, UI_CLICK_PLAYERS_AREA, p)) {
			p.wakeUp();
		}
                
                if (p.sleeping && p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY){
                    if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_SERPENT_SPELL, p)) {
                    	gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_SERPENT);
                    }
                    if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_CHAOS_SPELL, p)) {
                        gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_CHAOS);
                    }
                    if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_DRAGON_SPELL, p)) {
                    	gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_DRAGON);
                    }
                    if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_MOON_SPELL, p)) {
                    	gotoFairyMode(p, UI_CENTER_PANEL_FAIRY_MOON);
                    }
                    if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_BACK, p)) {
                    	p.message("", COLOUR[COLOUR_BLACK], false, 0);
                    	p.fairyDetails.next++;
                        p.fairyDetails.champ = null;
                        p.uiCenterPanel.mode = UI_CENTER_PANEL_SLEEPING;
                        p.sleep();
                    }
			successfulClick = checkViewPortal(p, x, y);
		}
                if (p.sleeping && p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY_SERPENT){
                    if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_TEXTAREA_0, p)) {
                        //show buy spell screen                       
                    } 
                    if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_TEXTAREA_1, p)) {
                        //show buy spell screen                       
                    } 
                    if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_BACK, p)) {
                    	gotoFairyMode(p, UI_CENTER_PANEL_FAIRY);
                    }
                }
                if (p.sleeping && p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY_CHAOS){
                    if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_SERPENT_SPELL, p)) {
                        //show buy spell screen                       
                    } 
                    if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_BACK, p)) {
                    	gotoFairyMode(p, UI_CENTER_PANEL_FAIRY);
                    }
                }
                if (p.sleeping && p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY_DRAGON){
                    if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_SERPENT_SPELL, p)) {
                        //show buy spell screen                       
                    } 
                    if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_BACK, p)) {
                    	gotoFairyMode(p, UI_CENTER_PANEL_FAIRY);
                    }
                }
                if (p.sleeping && p.uiCenterPanel.mode === UI_CENTER_PANEL_FAIRY_MOON){
                    if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_SERPENT_SPELL, p)) {
                        //show buy spell screen                       
                    } 
                    if (uiClickInArea(x, y, UI_CLICK_PORTAL_FAIRY_BACK, p)) {
                    	gotoFairyMode(p, UI_CENTER_PANEL_FAIRY);
                    }
                }

		//if (uiClickInArea(x, y, UI_CLICK_PORTAL_DOOR, p)) {
		//	p.action();
		//	successfulClick = true;
		//}

		if (p.uiRightPanel.mode === UI_RIGHT_PANEL_MAIN) {

			if (uiClickInArea(x, y, UI_CLICK_OPEN_POCKETS, p)) {
				p.uiRightPanel.mode = UI_RIGHT_PANEL_POCKETS;
				p.uiRightPanel.activePocket = 0;
				successfulClick = true;
			} else if (uiClickInArea(x, y, UI_CLICK_INTERACT, p)) {
				p.action();
				successfulClick = true;
			} else if (uiClickInArea(x, y, UI_CLICK_SPELLBOOK_ICON, p)) {
				p.uiRightPanel.mode = UI_RIGHT_PANEL_SPELLBOOK;
				successfulClick = true;
			} else if (uiClickInArea(x, y, UI_CLICK_CHARACTER_STATS, p)) {
				p.uiRightPanel.mode = UI_RIGHT_PANEL_STATS;
				successfulClick = true;
			} else if (uiClickInArea(x, y, UI_CLICK_ROTATE_LEFT, p)) {
				p.rotate(-1);
			} else if (uiClickInArea(x, y, UI_CLICK_ROTATE_RIGHT, p)) {
				p.rotate(1);
			} else if (uiClickInArea(x, y, UI_CLICK_MOVE_FORWARD, p)) {
				p.move(DIRECTION_NORTH);
			} else if (uiClickInArea(x, y, UI_CLICK_MOVE_BACKWARDS, p)) {
				p.move(DIRECTION_SOUTH);
			} else if (uiClickInArea(x, y, UI_CLICK_MOVE_LEFT, p)) {
				p.move(DIRECTION_WEST);
			} else if (uiClickInArea(x, y, UI_CLICK_MOVE_RIGHT, p)) {
				p.move(DIRECTION_EAST);
			} else if (uiClickInArea(x, y, UI_CLICK_ATTACK, p)) {
				p.attacking = true;
			} else if (uiClickInArea(x, y, UI_CLICK_DEFEND, p)) {
				//p.attacking = false;
				p.attack(false);
			} else if (uiClickInArea(x, y, UI_CLICK_CHAMP_FRONT_LEFT, p)) {
				p.exchangeChampionPosition(p.championHighlite, 0);
				successfulClick = true;
			} else if (uiClickInArea(x, y, UI_CLICK_CHAMP_FRONT_RIGHT, p)) {
				p.exchangeChampionPosition(p.championHighlite, 1);
				successfulClick = true;
			} else if (uiClickInArea(x, y, UI_CLICK_CHAMP_BACK_LEFT, p)) {
				p.exchangeChampionPosition(p.championHighlite, 3);
				successfulClick = true;
			} else if (uiClickInArea(x, y, UI_CLICK_CHAMP_BACK_RIGHT, p)) {
				p.exchangeChampionPosition(p.championHighlite, 2);
				successfulClick = true;
			}

		} else if (p.uiRightPanel.mode === UI_RIGHT_PANEL_POCKETS) {
			for (s = UI_CLICK_POCKET_SLOT_1; s <= UI_CLICK_POCKET_SLOT_12; s++) {
				if (uiClickInArea(x, y, s, p)) {
					p.exchangeItemWithHand(s - UI_CLICK_POCKET_SLOT_1);
					successfulClick = true;
					break;
				}
			}
			for (cid = UI_CLICK_POCKET_CHARACTER_0; cid <= UI_CLICK_POCKET_CHARACTER_3; cid++) {
				if (uiClickInArea(x, y, cid, p)) {
					var ap = cid - UI_CLICK_POCKET_CHARACTER_0;
					var c = p.getOrderedChampionIds();
					var ch = p.getChampion(c[ap]);
					if (ch !== null && ch.recruitment.attached) {
						p.uiRightPanel.activePocket = ap;
						successfulClick = true;
					}
					break;
				}
			}
			if (uiClickInArea(x, y, UI_CLICK_POCKET_HAND, p)) {
				p.useItemInHand();
				successfulClick = true;
			} else if (uiClickInArea(x, y, UI_CLICK_POCKET_BACK, p)) {
				p.uiRightPanel.mode = UI_RIGHT_PANEL_MAIN;
				successfulClick = true;
			}

		} else if (p.uiRightPanel.mode === UI_RIGHT_PANEL_STATS) {
			if (uiClickInArea(x, y, UI_CLICK_CLOSE_SCRIPT, p)) {
				p.uiRightPanel.mode = UI_RIGHT_PANEL_MAIN;
				successfulClick = true;
			}
		} else if (p.uiRightPanel.mode === UI_RIGHT_PANEL_SPELLBOOK) {
			if (uiClickInArea(x, y, UI_CLICK_CLOSE_SPELLBOOK, p)) {
				p.uiRightPanel.mode = UI_RIGHT_PANEL_MAIN;
				successfulClick = true;
			}
		}
		if (p.uiLeftPanel.mode === UI_LEFT_PANEL_MODE_STATS) {

			if (uiClickInArea(x, y, UI_CLICK_CHAMP1, p)) {
				toggleChampUI(0, p);
				successfulClick = true;
			} else if (uiClickInArea(x, y, UI_CLICK_CHAMP2, p)) {
				toggleChampUI(1, p);
				successfulClick = true;
			} else if (uiClickInArea(x, y, UI_CLICK_CHAMP3, p)) {
				toggleChampUI(2, p);
				successfulClick = true;
			} else if (uiClickInArea(x, y, UI_CLICK_CHAMP4, p)) {
				toggleChampUI(3, p);
				successfulClick = true;
			} else if (uiClickInArea(x, y, UI_CLICK_STATS_BOX, p)) {
				p.uiLeftPanel.mode = UI_LEFT_PANEL_MODE_COMMAND;
				successfulClick = true;
			}

		} else if (p.uiLeftPanel.mode === UI_LEFT_PANEL_MODE_COMMAND) {

			if (uiClickInArea(x, y, UI_CLICK_BACK, p)) {
				p.uiLeftPanel.mode = UI_LEFT_PANEL_MODE_STATS;
				successfulClick = true;
			} else if (uiClickInArea(x, y, UI_CLICK_PAUSE, p)) {
				alert('PAUSED');
				successfulClick = true;
			} else if (uiClickInArea(x, y, UI_CLICK_SAVE, p)) {
				alert('SAVE GAME');
				successfulClick = true;
			} else if (uiClickInArea(x, y, UI_CLICK_SLEEP, p)) {
				p.fairyDetails.next = 0;
				p.sleep();
				successfulClick = true;
			}
			//            if (uiClickInArea(x, y, UI_CLICK_TOGGLEUP, p)) {
			//                alert('TOGGLE UP');
			//                successfulClick = true;
			//            }
			//            if (uiClickInArea(x, y, UI_CLICK_TOGGLEDOWN, p)) {
			//                alert('TOGGLE DOWN');
			//                successfulClick = true;
			//            }
		}
		if (successfulClick) {
			redrawUI(p.id);
		}
	}
}

function viewportTouch(x, y, xy) {

	for (p = 0; p < player.length; p++) {

		xy = {
			x: Math.floor((x - player[p].PortalX) / scale / 42.67),
			y: Math.floor((y - player[p].PortalY) / scale / 38)
		};


		//        if (xy.x >= 0 && xy.x <= 2 && xy.y >= 0 && xy.y <= 2) {
		//            if (xy.x === 0 && xy.y === 0) { //rotate left
		//                player[p].rotate(-1);
		//            } else if (xy.x === 2 && xy.y === 0) { //rotate right
		//                player[p].rotate(1);
		//            } else if (xy.x === 1 && xy.y === 0) { //move forward
		//                player[p].move(DIRECTION_NORTH);
		//            } else if (xy.x === 0 && xy.y === 1) { //move left
		//                player[p].move(DIRECTION_WEST);
		//            } else if (xy.x === 2 && xy.y === 1) { //move right
		//                player[p].move(DIRECTION_EAST);
		//            } else if (xy.x === 1 && xy.y === 1) { //move backward
		//                player[p].move(DIRECTION_SOUTH);
		//            } else if (xy.y === 2) { //action
		//                //player[p].action();
		//            }
		//        }
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

function checkViewPortal(p, x, y) {
	switch (p.uiCenterPanel.mode) {
		case UI_CENTER_PANEL_VIEWPORT:
			if (uiClickInArea(x, y, UI_CLICK_PORTAL_ITEM_LEFT_CLOSE, p)) {
				if (p.actionItem(0)) {
					return true;
				}
			} else if (uiClickInArea(x, y, UI_CLICK_PORTAL_ITEM_RIGHT_CLOSE, p)) {
				if (p.actionItem(1)) {
					return true;
				}
			}
			var o15 = p.getObjectOnPos(15, 2);
			var o18 = p.getObjectOnPos(18, 0);
			if (o15 === 'shelf') {
				if (uiClickInArea(x, y, UI_CLICK_PORTAL_SHELF_TOP, p)) {
					if (p.actionItem(3)) {
						return true;
					}
				} else if (uiClickInArea(x, y, UI_CLICK_PORTAL_SHELF_BOTTOM, p)) {
					if (p.actionItem(2)) {
						return true;
					}
				}
			} else if (o15 === 'switch') {
				if (uiClickInArea(x, y, UI_CLICK_PORTAL_SWITCH, p)) {
					p.action();
					return true;
				}
			} else if (o15 === 'wood' || o18 === 'wood') {
				return true;
			} else if (o15 === 'wood-door' || o18 === 'wood-door') {
				if (uiClickInArea(x, y, UI_CLICK_PORTAL_WOODEN_DOOR, p)) {
					p.action();
					return true;
				}
			} else if (o15 === 'wall') {
				return true;
			}

			if (uiClickInArea(x, y, UI_CLICK_PORTAL_ITEM_LEFT_BACK, p)) {
				if (p.actionItem(3)) {
					return true;
				}
			} else if (uiClickInArea(x, y, UI_CLICK_PORTAL_ITEM_RIGHT_BACK, p)) {
				if (p.actionItem(2)) {
					return true;
				}
			}

			if (o15 === 'door') {
				if (uiClickInArea(x, y, UI_CLICK_PORTAL_DOOR, p)) {
					p.action();
					return true;
				}
			}
			break;
		case UI_CENTER_PANEL_SLEEPING:
			break;
		case UI_CENTER_PANEL_DEAD:
			break;
		case UI_CENTER_PANEL_FAIRY:
			break;
		case UI_CENTER_PANEL_FAIRY_DRAGON:
			break;
		case UI_CENTER_PANEL_FAIRY_SERPENT:
			break;
		case UI_CENTER_PANEL_FAIRY_MOON:
			break;
		case UI_CENTER_PANEL_FAIRY_CHAOS:
			break;
		default:
			break;
	}
	return false;
}

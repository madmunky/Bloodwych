function Player(id, PortX, PortY, ScreenX, ScreenY) {
    this.id = id;
    this.champion = new Array();
    this.championLeader = 0;
    this.x = 0; //posX;
    this.y = 0; //posY;
    this.floor = 0; //floor;
    this.d = 0; //d;
    this.PortalX = PortX;
    this.PortalY = PortY;
    this.PlayerCanvas= document.createElement('canvas');
    this.Portal = null;
    this.ScreenX = ScreenX;
    this.ScreenY = ScreenY;
    this.pocket = newPocketItem();
    this.dead = false;
    this.lastX = 0;
    this.lastY = 0;
    this.lastFloor = 0;
    this.lastTower = towerThis;
    this.moving = 0; //0 = Forward,1 = Right, 2 = Backwards, 3 = Left
    this.attacking = false;
    this.towerSwitches = new Array();
    this.messageTimeout = 0;
    this.uiRightPanel = {
        activePocket: 0,
        view: UI_RIGHT_PANEL_MAIN
    };
    this.uiLeftPanel = {
        champs: new Array(false, false, false, false),
        mode: LEFT_PANEL_MODE_STATS
    };
    this.communication = [];

    this.PlayerCanvas.width = 128 * scale;
    this.PlayerCanvas.height = 76 * scale;
    this.PlayerCanvas.getContext("2d").imageSmoothingEnabled = false;
    this.PlayerCanvas.getContext("2d").webkitImageSmoothingEnabled = false;
    this.PlayerCanvas.getContext("2d").mozImageSmoothingEnabled = false;
    this.PlayerCanvas.getContext("2d").oImageSmoothingEnabled = false;
    this.PlayerCanvas.getContext("2d").font = "bold 20px Calibri";
}

Player.prototype.getViewPortal = function() {
    this.Portal = this.PlayerCanvas.getContext("2d");
}

Player.prototype.canMoveToPos = function(pos) {
    //Check other player
    var view = this.getView();
    var hex = view[pos];
    if (getHexToBinaryPosition(hex, 8) == '1') {
        return false;
    }
    var xy = getOffsetByRotation((this.d + this.moving) % 4);
    if(getMonsterAt(this.floor, this.x + xy.x, this.y + xy.y) !== null) {
        return false;
    }

    var objThis = getHexToBinaryPosition(view[18], 12, 4);
    var objNext = getHexToBinaryPosition(hex, 12, 4);

    //Check wooden walls and doors
    if (objThis == '2' || objNext == '2') {
        if (!this.canMoveToPosByWood(pos)) {
            return false;
        }
    }

    //Check other objects
    switch (objNext) {
        case '1':
            return false; //Wall
        case '3':
            return false; //Misc
        case '5': //Doors
            if (getHexToBinaryPosition(hex, 7, 1) == '1') {
                return false;
            }
    }
    return true;
}

Player.prototype.canMoveToPosByWood = function(pos) {
    var view = this.getView();
    var hex = this.getView()[pos];
    //Check the space the player is standing on
    if (getHexToBinaryPosition(view[18], 12, 4) == '2' && getHexToBinaryPosition(view[18], ((7 - ((this.d + this.moving) % 4)) % 4) * 2 + 1, 1) == '1') {
        return false;
    }
    //Check the space the player is moving to
    if (getHexToBinaryPosition(hex, 12, 4) == '2' && getHexToBinaryPosition(hex, ((5 - ((this.d + this.moving) % 4)) % 4) * 2 + 1, 1) == '1') {
        return false;
    }
    return true;
}

Player.prototype.changeUpFloor = function() {

    //In bloodwych when the player moves floors they also moved 2 places forward
    //This function changes the players floor and moves the player forward 2x spaces

    this.floor++;
    if (this.floor > tower[towerThis].length) {
        this.floor = 0;
    } else {
        this.move(DIRECTION_NORTH);
        this.move(DIRECTION_NORTH);
    }

};

Player.prototype.changeDownFloor = function() {

    //In bloodwych when the player moves floors they also moved 2 places forward
    //This function changes the players floor and moves the player forward 2x spaces

    this.floor--;
    if (this.floor < tower[towerThis].length) {
        this.floor = tower[towerThis].length;
    } else {
        this.move(DIRECTION_NORTH);
        this.move(DIRECTION_NORTH);
    }
};

//Take the map code which is in front of the player and see if the player can interact with it.
Player.prototype.action = function() {
	if(!this.dead) {
	    //Wooden doors (in front of player)
		this.checkWoodenDoor(15);
	    //Wooden doors (on player)
		this.checkWoodenDoor(18);
	    //Wall switches
	    if (this.getBinaryView(15, 0, 4) !== '0' && this.getBinaryView(15, 8) === '1' && this.getBinaryView(15, 6, 2) === '2') {
	        this.setBinaryView(15, 5, 1);
	        switchAction(parseInt(getHexToBinaryPosition(this.getView()[15], 0, 5), 16).toString(10), this);
	    }
	    //Check if something is in the way
	    if (this.getMonstersInRange(15).length > 0) {
	        return false;
	    }
	    //Doors
	    if (this.getBinaryView(15, 12, 4) === '5' && this.getBinaryView(15, 4) === '0') {
	        this.setBinaryView(15, 7, 1);
	        //this.setBinaryView(15, 1, '000'); //Will set the door to 'normal'
	    }
	    return true;
	}
	return false;
}

Player.prototype.toggleFrontObject = function() {
    if (debug) {
        this.setBinaryView(15, 12, 1);
    }
}
Player.prototype.checkWoodenDoor = function(pos18) {
	if(pos18 === 18) {
		d = 2;
	} else { //pos18 === 15
		d = 0;
	}
	if (this.getBinaryView(pos18, 12, 4) === '2' && this.getBinaryView(pos18, ((5 + d - this.d) % 4) * 2) === '1') {
		if(this.pocket.id === ITEM_KEY) {
			this.consumeItemInHand();
			this.setBinaryView(pos18, 11, 1);
		}
		if(this.getBinaryView(pos18, 11, 1) === '0') {
	        this.setBinaryView(pos18, ((5 + d - this.d) % 4) * 2 + 1, 1);
	    }
	    if(this.getBinaryView(pos18, 11, 1) === '1') {
	    	this.message(TEXT_DOOR_LOCKED, COLOUR[COLOUR_GREEN]);
	    }
	}
}

//Sets a binary index on a hexadecimal string to a certain binary flag
//'to' will be a binary string, e.g. '1010'
Player.prototype.setBinaryView = function(pos18, index, length, to) {
    var xy = posToCoordinates(pos18, this.x, this.y, this.d);
    tower[towerThis].floor[this.floor].Map[xy.y][xy.x] = setHexToBinaryPosition(tower[towerThis].floor[this.floor].Map[xy.y][xy.x], index, length, to);
    //this.updateView();
}

Player.prototype.getBinaryView = function(pos18, index, length) {
    var xy = posToCoordinates(pos18, this.x, this.y, this.d);
    try {
        return getHexToBinaryPosition(tower[towerThis].floor[this.floor].Map[xy.y][xy.x], index, length);
    } catch (e) {
        return '0001';
    }
}

Player.prototype.setMovementData = function() {
    tower[this.lastTower].floor[this.lastFloor].Map[this.lastY][this.lastX] = setHexToBinaryPosition(tower[this.lastTower].floor[this.lastFloor].Map[this.lastY][this.lastX], 8, 1, '0');
    if(!this.dead) {
	    this.setBinaryView(18, 8, 1, '1');
	    //player[1].setBinaryView(18, 8, 1, '1');
	    this.lastX = this.x;
	    this.lastY = this.y;
	    this.lastFloor = this.floor;
	    this.lastTower = towerThis;
	}
}

Player.prototype.rotateTo = function(d) {
	if(!this.dead) {
	    this.d = (d + 4) % 4;
    	this.doEvent(false);
    }
}

Player.prototype.move = function(d) {
	if(!this.dead) {
	    this.moving = d;
	    this.lastX = this.x;
	    this.lastY = this.y;
	    this.attack(false);
	    var viewIndex = [15, 16, 19, 17];
	    if (this.canMoveToPos(viewIndex[d])) {
	        xy = getOffsetByRotation((this.d + d) % 4);
	        this.x = this.x + xy.x;
	        this.y = this.y + xy.y;
	        this.setMovementData();
	        this.doEvent(true);
	    } else if (d === 2) { //check current square when moving backward
	        this.doEvent(false);
	    }
	}
}

Player.prototype.tryAttack = function() {
	if(!this.dead) {
	    xy = getOffsetByRotation(this.d);
	    var hexNext = this.getBinaryView(15, 0, 16);
	    if (getHexToBinaryPosition(hexNext, 8) === '1') {
	        if (this.floor === player[1 - this.id].floor && this.x + xy.x === player[1 - this.id].x && this.y + xy.y === player[1 - this.id].y) {
	            //attack player
	            this.attack(true, player[1 - this.id]);
	            return true;
	        }
	    }
	    var mon = getMonsterAt(this.floor, this.x + xy.x, this.y + xy.y);
	    if (mon !== null) {
	        this.attack(true, mon);
	        return true;
	    }
	    this.attack(false);
	}
}

Player.prototype.attack = function(attack, target) {
    if (attack) {
        var combat = calculateAttack(this, target);
        for (com = 0; com < combat.length; com++) {
            (function(combat, com) {
                var att = combat[com].attacker;
                att.recruitment.attackTimer = setTimeout(function() {
                    att.recruitment.attackTimer = 0;
                    var def = combat[com].defender;
                    var pwr = combat[com].power;
                    var aExh = combat[com].attExhaustion;
                    var dExh = combat[com].defExhaustion;
                    att.monster.attacking = true;
                    att.doDamageTo(def, pwr, aExh, dExh);
                    if (def instanceof Champion) {
                        PrintLog('CHAMPION ' + getChampionName(att.id) + ' HITS CHAMPION ' + getChampionName(def.id) + ' FOR ' + pwr + '!');
                    } else if (def instanceof Monster) {
                        PrintLog('CHAMPION ' + getChampionName(att.id) + ' HITS MONSTER #' + def.id + ' FOR ' + pwr + '!');
                    }
                }, att.recruitment.position * 400);
            })(combat, com)
        }
    } else {
        for (c = 0; c < this.champion.length; c++) {
            var ch = this.getChampion(c);
            if(ch !== null) {
                var m = ch.monster;
                if(ch.recruitment.attackTimer !== 0) {
                    clearTimeout(ch.recruitment.attackTimer);
                    ch.recruitment.attackTimer = 0;
                }
                m.attacking = false;
            }
        }
        this.attacking = false;
    }
}

Player.prototype.getView = function() {
    //This function takes the map file and stores the 20 positions required 
    //to either draw the players view or objects which the player are likely to interact with
    //like standing on a presure pad or stairs or if there is a door infront of the player etc..
    view = [];
    for (pos = 0; pos < 20; pos++) {
        try {
            var xy = posToCoordinates(pos, this.x, this.y, this.d);
            var newView = tower[towerThis].floor[this.floor].Map[xy.y][xy.x];
            if (typeof newView === "undefined") {
                newView = '0001';
            }
        } catch (e) {
            newView = '0001';
        }
        view.push(newView);
    }
    return view;
}

//mr = true : player moves
//mr = false: player rotates
Player.prototype.doEvent = function(mr) {
    //this.setMovementData();
    var view = this.getView();
    switch (parseInt(view[18].substring(3, 4), 16)) {

        case 4:
            this.doStairs();
            break;
        case 6:
            if (mr) floorActionType(tower[towerThis].triggers[parseInt(getHexToBinaryPosition(view[18], 0, 5), 16).toString(10)], this);
            break;
        default:
            break;
    }
    this.updateChampions();
    this.resetChampUI();
};

Player.prototype.doPit = function() {
    floor = this.floor - 1;
    fOff = getTowerFloorOffset(this.floor, floor);
    x = this.x + fOff.x;
    y = this.y + fOff.y;
    this.setPlayerPosition(floor, x, y);
}

Player.prototype.doStairs = function() {
    var ud = parseInt(this.getBinaryView(18, 7), 10);
    var d = (parseInt(this.getBinaryView(18, 5, 2), 10) + 2) % 4;
    var floor = this.floor + 1 - (ud % 2) * 2;
    var fOff = getTowerFloorOffset(this.floor, floor);
    var off = getOffsetByRotation(d);
    var x = this.x + fOff.x + off.x * 2;
    var y = this.y + fOff.y + off.y * 2;
    this.setPlayerPosition(floor, x, y, d);
}

Player.prototype.setPlayerPosition = function(floor, x, y, d) {
    this.floor = floor;
    if (typeof x !== "undefined") this.x = x;
    if (typeof y !== "undefined") this.y = y;
    if (typeof d !== "undefined") this.d = d;
    this.setMovementData();
    //this.updateView();
}

Player.prototype.updateChampions = function() {
    for (c = 0; c < this.champion.length; c++) {
    	if(this.getChampion(c) !== null) {
	        var m = this.getChampion(c).monster;
	        m.tower = towerThis;
	        m.floor = this.floor;
	        m.x = this.x;
	        m.y = this.y;
	        m.d = this.d;
	        if (this.champion.length === 1) {
	            m.square = -1
	        } else {
	            m.square = (this.d + c) % 4;
	        }
	    }
    }
}

//check if all champions are dead
//also assign a new champion as leader. used when the leader dies
Player.prototype.checkDead = function() {
	var leader = this.getChampion(this.championLeader).monster;
	var deadNum = 0;
	if(leader.dead) {
		for (c = 0; c < this.champion.length; c++) {
			if(this.getChampion(c) !== null) {
				var m = this.getChampion(c).monster;
				if(m !== null && !m.dead) {
					this.championLeader = c;
				} else {
					deadNum++;
				}
			}
		}
		if(deadNum == 4) {
			this.dead = true;
	    	this.attack(false);
			this.setMovementData();
		}
	}
}

Player.prototype.recruitChampion = function(id) {
	var len = this.champion.length;
    if (len < 4) {
		if(typeof id === "undefined") {
			this.champion[len] = -1;
		} else {
	        this.champion[len] = id;
	        champion[id].recruitment = {
	        	recruited: true,
	        	playerId: this.id,
	        	position: len
	        };
	        return true;
	    }
	}
    return false;
}

//loc = location number (0-3)
Player.prototype.getChampion = function(loc) {
    if (loc > -1 && typeof this.champion[loc] !== "undefined") {
        return champion[this.champion[loc]];
    }
    return null;
}

//gets champions. champion 0 is the leader
Player.prototype.getOrderedChampionIds = function(loc) {
	var ch = new Array();
	ch.push(this.championLeader);
	for (c = 0; c < this.champion.length; c++) {
		if(c !== this.championLeader) {
	        ch.push(c);
	    }
    }
    return ch;
}

Player.prototype.restoreChampionStats = function() {
    var alertPlayer = false;
    for (c = 0; c < this.champion.length; c++) {
        var champ = this.getChampion(c);
        if(champ !== null) {
	        if (!champ.monster.dead) {
                if(champ.food > 0) {
                    champ.food--;
                } else {
                    champ.stat.vit -= Math.floor(Math.random() * 10) + 5;
                    if(champ.stat.vit < 0) {
                        champ.stat.vit = 0;
                    }
                }
	            if (champ.stat.vitMax * 0.15 > champ.stat.vit) {
	                dmg = Math.floor(champ.stat.vitMax * 0.15) - champ.stat.vit;
	                champ.getDamage(dmg, true);
	                if (dmg > 0) {
	                    alertPlayer = true;
	                }
	            }
                champ.stat.hp = champ.stat.hp + Math.floor((Math.random() * (champ.stat.str / 16)) + champ.stat.str / 16);
                if (champ.stat.hp > champ.stat.hpMax) {
                    champ.stat.hp = champ.stat.hpMax;
                }
                champ.stat.vit = champ.stat.vit + Math.floor((Math.random() * (champ.stat.agi / 12)) + champ.stat.agi / 12);
                if (champ.stat.vit > champ.stat.vitMax) {
                    champ.stat.vit = champ.stat.vitMax;
                }
	            champ.stat.sp = champ.stat.sp + Math.floor((Math.random() * (champ.stat.int / 12)) + champ.stat.int / 12);
	            if (champ.stat.sp > champ.stat.spMax) {
	                champ.stat.sp = champ.stat.spMax;
	            }
	        }
	    }
    }
    if (alertPlayer) {
        this.alertDamagedPlayer();
    }
    redrawUI(this.id);
}

Player.prototype.alertDamagedPlayer = function() {
    this.uiLeftPanel.mode = LEFT_PANEL_MODE_STATS;
    for (ch = 0; ch < this.champion.length; ch++) {
        if (this.getChampion(ch) !== null && this.getChampion(ch).monster.dead && ch > 0){
            toggleChampUI(ch, this, false);
        } else {
            toggleChampUI(ch, this, true);
        }
        
    }
}

Player.prototype.resetChampUI = function() {
    for (ch = 0; ch < this.champion.length; ch++) {
    	if (this.uiLeftPanel.champs[ch] === true) {
        	toggleChampUI(ch, this, false);
        	redrawUI(this.id);
        }
    }
}

//Returns a list of monsters and their distance pos relative to the player
//pos2 : when defined it only lists the monsters on this square
Player.prototype.getMonstersInRange = function(pos2) {
    var p = this;
    var monstersInRange = [];
    var pos = -1;
    mon = getMonstersInTower(towerThis);
    for (m in mon) {
        if (p.floor === mon[m].floor && !mon[m].dead) {
            pos = coordinatesToPos(mon[m].x, mon[m].y, p.x, p.y, p.d);
            var sq = CHAR_FRONT_SOLO;
            var sq2 = 0;
            if (mon[m].square > CHAR_FRONT_SOLO) {
                sq = (6 + mon[m].square - p.d) % 4;
                sq2 = (sq === CHAR_FRONT_LEFT || sq === CHAR_FRONT_RIGHT) ? 0 : 1; //extra check for really close-by monsters
            }
            if (mon[m].floor == p.floor && pos > -1 && (typeof pos2 === "undefined" || pos2 === pos)) {
                if (sq2 == 1) {
                    monstersInRange.unshift({
                        monster: mon[m],
                        position: pos,
                        distance: getMonsterDistanceByPos(pos, sq2),
                        gfxCoord: getMonsterGfxOffset(pos, sq),
                        square: sq2
                    });
                } else {
                    monstersInRange.push({
                        monster: mon[m],
                        position: pos,
                        distance: getMonsterDistanceByPos(pos, sq2),
                        gfxCoord: getMonsterGfxOffset(pos, sq),
                        square: sq2
                    });
                }
            }
        }
    }
    return monstersInRange;
}


Player.prototype.drawMonster = function(m, distance, offset) {
    var form = m.form;
    //var loc = characterSpriteLocation();
    var p = this;

    if (form >= 101) {
        if (form <= 102) {
          var dis = [ 0, 1, 2, 3, 4, 5 ];
        } else if (form === 106) {
            var dis = [ 1, 1, 2, 2, 3, 4 ];
        } else {
            var dis = [ 0, 0, 1, 1, 2, 3 ];
        }
        drawMonster(m, (6 + p.d - m.d) % 4, dis[distance], this, offset);
    } else {
        if (typeof monsterPalette[form] !== "undefined") {
            drawCharacter(m, (6 + p.d - m.d) % 4, distance, this, offset);
        }
    }
}

Player.prototype.getActivePocketChampion = function() {
    var ch = this.getOrderedChampionIds();
    if(this.getChampion(ch[this.uiRightPanel.activePocket]) !== null) {
        return this.getChampion(ch[this.uiRightPanel.activePocket]);
    }
    return null;
}

Player.prototype.consumeItemInHand = function() {
	if(this.pocket.quantity <= 1) {
		this.pocket.setPocketItem();
	} else {
		this.pocket.quantity--;
	}
}

Player.prototype.useItemInHand = function() {
    var ch = this.getActivePocketChampion();
    if(ch !== null && !ch.dead) {
        var itemH = this.pocket;
        if(itemH.id !== 0) {
            switch(itemH.type) {
                case ITEM_TYPE_STACKABLE:
                var i = this.findItem(itemH.id);
                if(i > -1) {
                    itemH.quantity++;
                    ch.pocket[i].quantity--;
                    if(ch.pocket[i].quantity === 0) {
                        ch.pocket[i].setPocketItem();
                    }
                }
                break;
                case ITEM_TYPE_FOOD:
                if(itemH.id <= 19) {
                    if(itemH.id % 3 === 2) {
                        itemH.setPocketItem();
                    } else {
                        itemH.setPocketItem(itemH.id - 1);
                    }
                } else {
                    itemH.setPocketItem();
                }
                var fd = itemH.getFoodValue();
                ch.food += fd;
                if(ch.food > 255) {
                    ch.food = 255;
                }
                break;
                default:
                break;
            }
        }
    }
}

Player.prototype.exchangeItemWithHand = function(s) {
    var ch = this.getActivePocketChampion();
	if(ch !== null) {
		var item = ch.pocket[s];
		var itemH = this.pocket;
        if(itemH.id === 0 || ((s !== 2 || itemH.type === ITEM_TYPE_ARMOUR) && (s !== 3 || itemH.type === ITEM_TYPE_SHIELD))) {
    		if(item.type === ITEM_TYPE_STACKABLE && (itemH.id === 0 || item.id === itemH.id)) {
    			if(itemH.id === 0) {
    				itemH.setPocketItem(item.id, 1);
    				item.quantity--;
    				if(item.quantity === 0) {
    					item.setPocketItem();
    				}
    			} else if(item.id === itemH.id) {
    				var qty = itemH.quantity;
    				itemH.setPocketItem();
    				item.setPocketItem(item.id, item.quantity + qty);
    			}
            } else if(itemH.type === ITEM_TYPE_STACKABLE) {
                var i = this.findItem(itemH.id);
                var qty = 0;
                if(i > -1) {
                    qty = ch.pocket[i].quantity;
                    ch.pocket[i].setPocketItem();
                }
                var temp = newPocketItem(item.id, item.quantity);
                item.setPocketItem(itemH.id, itemH.quantity + qty);
                itemH.setPocketItem(temp.id, temp.quantity);
    		} else {
    			var temp = newPocketItem(item.id, item.quantity);
    			item.setPocketItem(itemH.id, itemH.quantity);
    			itemH.setPocketItem(temp.id, temp.quantity);
    		}
        }
	}
}

Player.prototype.findItem = function(i) {
    var ch = this.getActivePocketChampion();
    if(ch !== null) {
        for(ip = 0; ip < ch.pocket.length; ip++) {
            if(ch.pocket[ip].id === i) {
                return ip;
            }
        }
    }
    return -1;
}

Player.prototype.message = function(txt, col) {
	fadeFont(this, txt, 50, 3000, 0, this.ScreenY, col);
}

Player.prototype.testMode = function(id) {
    if (debug) {
        //var xy = posToCoordinates(15, this.x, this.y, this.d);
        //var hex = tower[towerThis].floor[this.floor].Map[xy.y][xy.x];
        //tower[towerThis].floor[this.floor].Map[xy.y][xy.x] = setHexToBinaryPosition(hex, 8, 8, '0'); //REMOVE OBJECT
        //tower[towerThis].floor[this.floor].Map[xy.y][xy.x] = toggleObject(hex, '3'); //TOGGLE PILLAR
        //tower[towerThis].floor[this.floor].Map[xy.y][xy.x] = setHexToBinaryPosition(hex, 10, 2, '' + ((parseInt(getHexToBinaryPosition(hex, 10, 2)) + 1) % 4)); //ROTATE WALL
        //tower[towerThis].floor[this.floor].Map[xy.y][xy.x] = bin2hex(hex2bin(hex).substring(2, 8) +  hex2bin(hex).substring(0, 2) + hex2bin(hex).substring(8, 16)); //ROTATE WOODEN WALL
        try {
            var view = this.getView();
            for (i = 0; i < 17; i++) {
                var t = view[i].substring(2, 4);
                if (view[i].substring(2, 4) === "80") {
                    window.alert("Distance: " + getMonsterDistanceByPos(i) + " Code: " + view[i]);
                }
            }
        } catch (e) {
            PrintLog(e.toString());
        };
    }
}

function initPlayersQuickStart() {
    for (i = 0; i < 4; i++) {
        player[0].recruitChampion(i);
        player[1].recruitChampion(i + 4);
    }
    player[0].championLeader = 1;
}

function initPlayersStart(c1, c2) {
    player[0].recruitChampion(c1);
    player[1].recruitChampion(c2);
    for (i = 1; i < 4; i++) {
        player[0].recruitChampion();
        player[1].recruitChampion();
    }
 }
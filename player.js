function Player(id, ScreenX, ScreenY) {
	this.id = id;
	this.champion = new Array();
	this.championLeader = 0;
	this.championHighlite = -1;
	this.x = 0; //posX;
	this.y = 0; //posY;
	this.floor = 0; //floor;
	this.d = 0; //d;
	this.PortalX = (ScreenX + 96) * scale;
	this.PortalY = (ScreenY + 2) * scale;
	this.ScreenX = ScreenX;
	this.ScreenY = ScreenY;
	this.pocket = newPocketItem();
	this.dead = false;
	this.sleeping = false;
	this.lastX = 0;
	this.lastY = 0;
	this.lastFloor = 0;
	this.lastTower = towerThis;
	this.moving = 0; //0 = Forward,1 = Right, 2 = Backwards, 3 = Left
	this.attacking = false;
	this.towerSwitches = new Array();
	this.messageTimeout = 0;
	//this.timerAttack = timerMaster;
	this.timerChampionStats = timerMaster;
	this.timerActiveSpell = timerMaster;
	this.timerSpellBookTurn = 0;
	this.redrawLeftRightUiFlag = -1;
	this.showSpellText = false;
	this.fairyDetails = {
		champ: null,
		spell: null
	};
	this.nextChampionUp = 0;
	this.uiRightPanel = {
		activePocket: 0,
		mode: UI_RIGHT_PANEL_MAIN
	};
	this.uiLeftPanel = {
		champs: new Array({
			opened: false,
			damage: 0,
			damageTimer: 0
		}, {
			opened: false,
			damage: 0,
			damageTimer: 0
		}, {
			opened: false,
			damage: 0,
			damageTimer: 0
		}, {
			opened: false,
			damage: 0,
			damageTimer: 0
		}),
		mode: UI_LEFT_PANEL_MODE_STATS
	};
	this.uiCenterPanel = {
		mode: UI_CENTER_PANEL_VIEWPORT
	};

	this.communication = {
		monster: null,
		mode: COMMUNICATION_PAGE_MAIN,
		text: null,
		highlighted: null,
		answer: null,
		answerTimer: 0,
		charisma: 0
	};
	this.frozen = false;

	this.PlayerCanvas = document.createElement('canvas');
	this.PlayerCanvas.width = 128 * scale;
	this.PlayerCanvas.height = 76 * scale;
	this.PlayerCanvas.getContext("2d").imageSmoothingEnabled = false;
	this.PlayerCanvas.getContext("2d").webkitImageSmoothingEnabled = false;
	this.PlayerCanvas.getContext("2d").mozImageSmoothingEnabled = false;
	this.PlayerCanvas.getContext("2d").oImageSmoothingEnabled = false;
	this.PlayerCanvas.getContext("2d").msImageSmoothingEnabled = false;
	this.PlayerCanvas.getContext("2d").font = "bold 20px Calibri";

	this.Portal = this.PlayerCanvas.getContext("2d");
}

Types.Player = Player;

Player.prototype.toJSON = function() {
	return {
		__type: 'Player',
		id: this.id,
		champion: this.champion,
		championLeader: this.championLeader,
		championHighlite: this.championHighlite,
		x: this.x,
		y: this.y,
		floor: this.floor,
		d: this.d,
		PortalX: this.PortalX,
		PortalY: this.PortalY,
		ScreenX: this.ScreenX,
		ScreenY: this.ScreenY,
		pocket: this.pocket,
		dead: this.dead,
		sleeping: this.sleeping,
		lastX: this.lastX,
		lastY: this.lastY,
		lastFloor: this.lastFloor,
		lastTower: this.lastTower,
		moving: this.moving,
		attacking: this.attacking,
		towerSwitches: this.towerSwitches,
		messageTimeout: this.messageTimeout,
		//timerAttack: this.timerAttack,
		timerChampionStats: this.timerChampionStats,
		timerActiveSpell: this.timerActiveSpell,
		timerSpellBookTurn: this.timerSpellBookTurn,
		redrawLeftRightUiFlag: this.redrawLeftRightUiFlag,
		showSpellText: this.showSpellText,
		fairyDetails: this.fairyDetails,
		nextChampionUp: this.nextChampionUp,
		uiRightPanel: this.uiRightPanel,
		uiLeftPanel: this.uiLeftPanel,
		uiCenterPanel: this.uiCenterPanel,
		communication: this.communication,
		frozen: this.frozen
	}
}

Player.revive = function(data) {
	var p = new Player(data.id, data.ScreenX, data.ScreenY);
	p.champion = data.champion;
	p.championLeader = data.championLeader;
	p.championHighlite = data.championHighlite;
	p.x = data.x;
	p.y = data.y;
	p.floor = data.floor;
	p.d = data.d;
	p.PortalX = data.PortalX;
	p.PortalY = data.PortalY;
	p.pocket = newPocketItem(data.pocket.id, data.pocket.quantity);
	p.dead = data.dead;
	p.sleeping = data.sleeping;
	p.lastX = data.lastX;
	p.lastY = data.lastY;
	p.lastFloor = data.lastFloor;
	p.lastTower = data.lastTower;
	p.moving = data.moving;
	p.attacking = data.attacking;
	p.towerSwitches = data.towerSwitches;
	p.messageTimeout = data.messageTimeout;
	//p.timerAttack = data.timerAttack;
	p.timerChampionStats = data.timerChampionStats;
	p.timerActiveSpell = data.timerActiveSpell;
	p.timerSpellBookTurn = data.timerSpellBookTurn;
	p.redrawLeftRightUiFlag = data.redrawLeftRightUiFlag;
	p.showSpellText = data.showSpellText;
	p.fairyDetails = data.fairyDetails;
	p.nextChampionUp = data.nextChampionUp;
	p.uiRightPanel = data.uiRightPanel;
	p.uiLeftPanel = data.uiLeftPanel;
	p.uiCenterPanel = data.uiCenterPanel;
	p.communication = data.communication;
	p.frozen = data.frozen;
	return p;
};

Player.prototype.getViewPortal = function() {
	this.Portal = this.PlayerCanvas.getContext("2d");
};

Player.prototype.canMove = function(d) {
	var mv = canMove(this.floor, this.x, this.y, this.d, d);
	return mv === OBJECT_NONE || mv === OBJECT_STAIRS;
};

Player.prototype.canMoveByWood = function(d) {
	return canMoveByWood(this.floor, this.x, this.y, this.d, d);
};

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
	if (!this.dead && !this.sleeping) {
		//Wooden doors (in front of player)
		if (!this.checkWoodenDoor(18)) {
			this.checkWoodenDoor(15);
		}
		if (this.canMoveByWood(0)) {
			//Wooden doors (on player)
			var o15 = this.getObjectOnPos(15, 2);
			//Wall switches
			//if (this.getBinaryView(15, 0, 5) !== '0' && this.getBinaryView(15, 8) === '1' && this.getBinaryView(15, 6, 2) === '2') {
			if (o15 === OBJECT_SWITCH) {
				this.setBinaryView(15, 5, 1);
				switchAction(parseInt(getHexToBinaryPosition(this.getView()[15], 0, 5), 16).toString(10), this);
				playSound(SOUND_SWITCH);
			} else if (o15 === OBJECT_GEM) {
				gemAction(this);
			}
			//Check if something is in the way
			if (this.getMonstersInRange(15).length > 0) {
				return false;
			}
			//Doors
			if (this.getBinaryView(15, 13, 3) === '5' && this.getBinaryView(15, 4) === '0') {
				var keylock = parseInt(this.getBinaryView(15, 1, 3));
				if (keylock > 0) {
					if (this.pocket.id === keylock + 79) { //Use key
						this.consumeItemInHand();
						this.setBinaryView(15, 11, 1);
						this.setBinaryView(15, 1, 3, '0');
					}
				} else if (this.pocket.id === ITEM_KEY) { //Use common key
					this.consumeItemInHand();
					this.setBinaryView(15, 11, 1);
				}
				if (this.getBinaryView(15, 1, 3) === '0' && this.getBinaryView(15, 11, 1) === '0') { //If unlocked, open/close door
					this.setBinaryView(15, 7, 1);
					playSound(SOUND_DOOR);
					//this.setBinaryView(15, 1, 3, '000'); //Will set the door to 'normal'
				} else { //If locked, give lock message
					this.message(TEXT_DOOR_LOCKED, COLOUR[COLOUR_GREEN]);
				}
			}
			return true;
		}
	}
	return false;
};

Player.prototype.alterObject = function(a, b, c) {
	if (debug) {
		var a1 = (parseInt(this.getBinaryView(15, 13, 3)) + a + 8) % 8;
		this.setBinaryView(15, 13, 3, '' + a1);
		if (typeof b !== 'undefined') {
			var b1 = (parseInt(this.getBinaryView(15, 6, 2)) + b + 4) % 4;
			this.setBinaryView(15, 6, 2, '' + b1);
		}
		if (typeof c !== 'undefined') {
			var c1 = (parseInt(this.getBinaryView(15, 10, 2)) + c + 4) % 4;
			this.setBinaryView(15, 0, 8, '' + c1);
		}
	}
};
Player.prototype.checkWoodenDoor = function(pos18) {
	if (pos18 === 18) {
		d = 2;
	} else { //pos18 === 15
		d = 0;
	}
	if (this.getBinaryView(pos18, 13, 3) === '2' && this.getBinaryView(pos18, ((5 + d - this.d) % 4) * 2) === '1') {
		if (this.pocket.id === ITEM_KEY) { //Use common key
			this.consumeItemInHand();
			this.setBinaryView(pos18, 11, 1);
		}
		if (this.getBinaryView(pos18, 11, 1) === '0') { //If unlocked, open/close door
			this.setBinaryView(pos18, ((5 + d - this.d) % 4) * 2 + 1, 1);
			playSound(SOUND_DOOR);
		} else if (this.getBinaryView(pos18, 11, 1) === '1') { //If locked, give lock message
			this.message(TEXT_DOOR_LOCKED, COLOUR[COLOUR_GREEN]);
		}
		return true;
	}
	return false;
};

//Sets a binary index on a hexadecimal string to a certain binary flag
//'to' will be a binary string, e.g. '1010'
Player.prototype.setBinaryView = function(pos18, index, length, to) {
	var xy = posToCoordinates(pos18, this.x, this.y, this.d);
	if (typeof tower[towerThis].floor[this.floor].Map[xy.y] !== 'undefined' && typeof tower[towerThis].floor[this.floor].Map[xy.y][xy.x] !== 'undefined') {
		tower[towerThis].floor[this.floor].Map[xy.y][xy.x] = setHexToBinaryPosition(tower[towerThis].floor[this.floor].Map[xy.y][xy.x], index, length, to);
	}
	//this.updateView();
};

Player.prototype.getBinaryView = function(pos18, index, length) {
	var xy = posToCoordinates(pos18, this.x, this.y, this.d);
	try {
		return getHexToBinaryPosition(tower[towerThis].floor[this.floor].Map[xy.y][xy.x], index, length);
	} catch (e) {
		return '0001';
	}
};

Player.prototype.setMovementData = function() {
	//tower[this.lastTower].floor[this.lastFloor].Map[this.lastY][this.lastX] = setHexToBinaryPosition(tower[this.lastTower].floor[this.lastFloor].Map[this.lastY][this.lastX], 8, 1, '0');
	if (!this.dead && !this.sleeping) {
		//this.setBinaryView(18, 8, 1, '1');
		this.lastX = this.x;
		this.lastY = this.y;
		this.lastFloor = this.floor;
		this.lastTower = towerThis;
	}
};

Player.prototype.rotate = function(r) {
	if (!this.dead && !this.sleeping) {
		if (r === -1) {
			highliteMovementArrow(this, 0);
		} else {
			highliteMovementArrow(this, 2);
		}
		this.d = (4 + this.d + r) % 4;
		/*if (this.uiRightPanel.mode === UI_RIGHT_PANEL_MAIN){
						  if (champion[this.championLeader].activeSpell.id === SPELL_COMPASS){
							 drawActiveSpell(champion[this.championLeader].activeSpell.id,this); 
						  }
					  } */
		this.doEvent(false);
		redrawUI(this.id, UI_REDRAW_ACTIVESPELL);
	}
};

Player.prototype.rotateTo = function(d) {
	this.d = (d + 4) % 4;
	redrawUI(this.id, UI_REDRAW_ACTIVESPELL);
};

Player.prototype.move = function(d) {
	if (!this.dead && !this.sleeping) {
		m = [1, 5, 4, 3];
		highliteMovementArrow(this, m[d]);
		this.moving = d;
		this.lastX = this.x;
		this.lastY = this.y;
		this.attack(null, false);
		if (this.canMove(d)) {
			xy = getOffsetByRotation((this.d + d) % 4);
			this.x = this.x + xy.x;
			this.y = this.y + xy.y;
			this.setMovementData();
			this.doEvent(true);
		} else if (d === 2) { //check current square when moving backward
			this.doEvent(false);
		}
	}
};

Player.prototype.tryAttack = function(ch) {
	if (!this.dead && !this.sleeping && this.canMoveByWood(0)) {
		xy = getOffsetByRotation(this.d);
		var hexNext = this.getBinaryView(15, 0, 16);
		if (getHexToBinaryPosition(hexNext, 8) === '1') {
			if(getPlayerAt(this.floor, this.x + xy.x, this.y + xy.y) !== null) {
			//if (typeof player[1] !== 'undefined' && this.floor === player[1 - this.id].floor && this.x + xy.x === player[1 - this.id].x && this.y + xy.y === player[1 - this.id].y) {
				//attack player
				this.attack(ch, true, player[1 - this.id]);
				return true;
			}
		}
		var mon = getMonsterAt(this.floor, this.x + xy.x, this.y + xy.y);
		if (mon !== null) {
			this.attack(ch, true, mon);
			return true;
		}
		//for (var c = 0; c < this.champion.length; c++) {
		//var ch = this.getChampion(c);
		if (ch.selectedSpell !== null || ch.getBowPower() > 0) {
			this.attack(ch, true);
			return true;
		}
		//}
	}
	this.attack(null, false);
	return false;
};

Player.prototype.attack = function(ch, attack, target) {
	if (attack) {
		this.doneCommunication();
		var self = this;
		var combat = calculateAttack(ch, target);
		for (var com = 0; com < combat.length; com++) {
			//(function(combat, com) {
			var att = combat[com].attacker;
			//att.recruitment.attackTimer = setTimeout(function() {
			//att.recruitment.attackTimer = 0;
			att.getMonster().attacking = true;
			if (att.selectedSpell !== null) {
				self.castSpell(att.selectedSpell, att, true);
				redrawUI(self.id);
			} else if (att.getBowPower() > 0) {
				self.shootArrow(att);
				if (typeof target === 'undefined') {
					self.attack(null, false);
				}
				redrawUI(self.id);
			} else {
				var def = combat[com].defender;
				if (!def.dead) {
					var pwr = combat[com].power;
					var aExh = combat[com].attExhaustion;
					var dExh = combat[com].defExhaustion;
					att.doDamageTo(def, pwr, aExh, dExh);
					if (def instanceof Champion) {
						PrintLog('CHAMPION ' + TEXT_CHAMPION_NAME[att.id] + ' HITS CHAMPION ' + TEXT_CHAMPION_NAME[def.id] + ' FOR ' + pwr + '!');
					} else if (def instanceof Monster) {
						PrintLog('CHAMPION ' + TEXT_CHAMPION_NAME[att.id] + ' HITS MONSTER #' + def.id + ' FOR ' + pwr + '!');
						self.gainChampionXp(pwr, att);
						if (def.dead) {
							self.gainChampionXp(128);
						}
					}
				}
			}
			//}, att.recruitment.position * self.getAttackSpeed(400));
			att.getMonster().doGesture(CHA_GESTURE_ATTACKING);
			playSound(SOUND_ATTACK);
			//})(combat, com);
		}
	} else {
		for (c = 0; c < this.champion.length; c++) {
			var ch = this.getChampion(c);
			if (ch !== null) {
				var m = ch.getMonster();
				//if (ch.recruitment.attackTimer !== 0) {
				//clearTimeout(ch.recruitment.attackTimer);
				//ch.recruitment.attackTimer = 0;
				//}
				m.attacking = false;
			}
		}
		this.attacking = false;
	}
};

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
};

//mr = true : player moves
//mr = false: player rotates
Player.prototype.doEvent = function(mr) {
	if (this.uiRightPanel.mode === UI_RIGHT_PANEL_SCROLL) {
		this.uiRightPanel.mode = UI_RIGHT_PANEL_MAIN;
		redrawUI(this.id, UI_REDRAW_RIGHT);
	}
	this.doneCommunication();
	//this.resetChampUI();
	this.updateChampions();
	var view = this.getView();
	switch (getHexToBinaryPosition(view[18], 13, 3)) {

		case '4':
			this.doStairs();
			break;
		case '6':
			if (mr) {
				floorActionType(tower[towerThis].triggers[parseInt(getHexToBinaryPosition(view[18], 0, 5), 16).toString(10)], this);
			}
			break;
		case '7':
			if (mr) {
				if (getHexToBinaryPosition(view[18], 6, 2) === '1') { //firepath
					var ds = getDungeonSpell(this.floor, this.x, this.y);
					if (ds !== null) {
						var prc = hex2dec(getHexToBinaryPosition(view[18], 0, 6)) / 64.0;
						ds.projectile.attack(this, prc);
					}
				}
			}
			break;
		default:
			break;
	}
};

Player.prototype.doPit = function() {
	var self = this;
	if (this.getBinaryView(18, 6, 2) === '1') {
		if (this.getActiveSpellById(SPELL_LEVITATE).timer > 0) {
			return true;
		}
		floor = this.floor - 1;
		fOff = getTowerFloorOffset(this.floor, floor);
		x = this.x + fOff.x;
		y = this.y + fOff.y;
		this.setPlayerPosition(floor, x, y);
		setTimeout(function() {
			self.doEvent(true);
		}, 200);
		newProjectile(DUNGEON_NONE, PALETTE_PIT_FLASH, null, -1, 0, floor, x, y, 0, null);
		return true;
	}
	return false;
};

Player.prototype.doFizzle = function() {
	if (this.getBinaryView(18, 13, 3) === '6' && this.getBinaryView(18, 6, 2) === '0') {
		for (c = 0; c < this.champion.length; c++) {
			var ch = this.getChampion(c);
			if (ch.activeSpell.id > -1) {
				ch.expireSpell();
				redrawUI(this.id, UI_REDRAW_ACTIVESPELL);
			}
		}
		return true;
	}
	return false;
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
};

Player.prototype.setPlayerPosition = function(floor, x, y, d) {
	if (typeof floor !== "undefined" && floor >= 0 && floor < tower[towerThis].floor.length) {
		this.lastFloor = this.floor;
		this.floor = floor;
	}
	if (typeof x !== "undefined") {
		if (x >= tower[towerThis].floor[this.floor].Height) {
			x = tower[towerThis].floor[this.floor].Height - 1;
		} else if (x < 0) {
			x = 0;
		}
		this.lastX = this.x;
		this.x = x;
	}
	if (typeof y !== "undefined") {
		if (y >= tower[towerThis].floor[this.floor].Width) {
			y = tower[towerThis].floor[this.floor].Width - 1;
		} else if (y < 0) {
			y = 0;
		}
		this.lastY = this.y;
		this.y = y;
	}
	if (typeof d !== "undefined") {
		this.d = d % 4;
	}
	this.setMovementData();
	this.updateChampions();
	//this.doEvent(true);
};

Player.prototype.getAliveChampionCount = function() {
	var cnt = 0;
	for (c = 0; c < this.champion.length; c++) {
		var ch = this.getChampion(c);
		if (ch !== null) {
			var dd = ch.getMonster().dead;
			if (!dd) {
				cnt++;
			}
		}
	}
	return cnt;
}

Player.prototype.updateChampions = function() {
	var cnt = this.getAliveChampionCount();
	for (c = 0; c < this.champion.length; c++) {
		var ch = this.getChampion(c);
		if (ch !== null && ch.recruitment.attached) {
			var m = ch.getMonster();
			m.tower = towerThis;
			m.floor = this.floor;
			m.x = this.x;
			m.y = this.y;
			m.d = this.d;
			if (!m.dead && cnt === 1 && c === 0) {
				m.square = -1;
			} else {
				m.square = (this.d + c) % 4;
			}
		}
	}
}

Player.prototype.exchangeChampionPosition = function(ct, c) {
	var ch = this.getChampion(c);
	if (ct === c) {
		this.championLeader = c;
		this.championHighlite = -1;
	} else if (ct === -1) {
		if (ch !== null && !ch.getMonster().dead) {
			this.championHighlite = c;
		}
	} else {
		if (this.attacking) {
			var cht = this.getChampion(ct);
			if (cht !== null) {
				clearTimeout(ch.recruitment.attackTimer);
				clearTimeout(cht.recruitment.attackTimer);
				ch.getMonster().attacking = false;
				cht.getMonster().attacking = false;
			}
		}
		if (this.championLeader === c) {
			this.championLeader = ct;
		} else if (this.championLeader === ct) {
			this.championLeader = c;
		}
		var temp = this.champion[c];
		this.champion[c] = this.champion[ct];
		this.champion[ct] = temp;
		this.championHighlite = -1;
		this.updateChampions();
	}
}

Player.prototype.getChampionsForUp = function() {
	var chs = new Array();
	var c1 = this.getOrderedChampionIds();
	for (c = 0; c < this.champion.length; c++) {
		var ch = this.getChampion(c1[c]);
		if (ch !== null && !ch.getMonster().dead && ch.recruitment.attached && ch.recruitment.playerId > -1) {
			if (ch.levelUp > 0) {
				chs.push({
					champ: ch,
					up: 'level'
				});
			}
			if (ch.spellUp > 0) {
				chs.push({
					champ: ch,
					up: 'spell'
				});
			}
		}
	}
	return chs;
}

Player.prototype.checkChampionUp = function() {
	if (this.nextChampionUp > -1 && this.fairyDetails.champ === null) {
		var nc = 0;
		cs = this.getChampionsForUp();
		for (c in cs) {
			if (this.nextChampionUp <= nc) {
				var ch = cs[c].champ;
				var up = cs[c].up;
				if (up === 'spell') {
					if (ch.spellUp > 0) {
						this.fairyDetails.champ = ch;
						gotoFairyMode(this, UI_CENTER_PANEL_FAIRY);
						return true;
					}
				} else if (up === 'level') {
					if (ch.levelUp > 0 && ch.level < 13) {
						ch.gainLevel();
						return true;
					}
				}
			}
			nc++;
		}
	}
	return false;
}

Player.prototype.sleep = function() {
	if (!this.dead) {
		this.sleeping = true;
		this.message();
		this.fairyDetails.champ = null;
		this.uiCenterPanel.mode = UI_CENTER_PANEL_SLEEPING;
		this.uiLeftPanel.mode = UI_LEFT_PANEL_MODE_STATS;
		this.uiRightPanel.mode = UI_RIGHT_PANEL_MAIN;
		this.doneCommunication();
		this.attack(null, false);
		coverViewPort(this);
		writeFontImage(TEXT_THOU_ART, 64, 21, COLOUR[COLOUR_BROWN], FONT_ALIGNMENT_CENTER, this.Portal);
		writeFontImage(TEXT_ASLEEP, 64, 37, COLOUR[COLOUR_BROWN], FONT_ALIGNMENT_CENTER, this.Portal);
		redrawUI(this.id);
	}
}

Player.prototype.wakeUp = function() {
	this.sleeping = false;
	this.message();
	this.fairyDetails.champ = null;
	redrawUI(this.id);
}

//check if all champions are dead
//also assign a new champion as leader. used when the leader dies
Player.prototype.checkDead = function() {
	var leader = this.getChampion(this.championLeader).getMonster();
	var deadNum = 0;
	if (leader.dead) {
		for (c = 0; c < this.champion.length; c++) {
			var ch = this.getChampion(c);
			if (ch !== null) {
				var m = ch.getMonster();
				if (m !== null && !m.dead && ch.recruitment.attached) {
					this.championLeader = c;
				} else {
					deadNum++;
				}
			} else {
				deadNum++;
			}
		}
		if (deadNum == 4) {
			this.dead = true;
			this.doneCommunication();
			this.attack(null, false);
			for (c = 0; c < this.champion.length; c++) {
				var ch = this.getChampion(c);
				if (ch !== null && ch.recruitment.attached) {
					ch.recruitment.attached = false;
					dropItem(ch.id + ITEM_BLODWYN_RIP, 1, this.floor, this.x, this.y, 0);
				}
			}
			this.setMovementData();

			this.uiCenterPanel.mode = UI_CENTER_PANEL_DEAD;
			coverViewPort(this);
			writeFontImage(TEXT_THOU, 64, 21, COLOUR[COLOUR_GREY_LIGHT], FONT_ALIGNMENT_CENTER, this.Portal);
			writeFontImage(TEXT_ART_DEAD, 64, 37, COLOUR[COLOUR_GREY_LIGHT], FONT_ALIGNMENT_CENTER, this.Portal);
		}
	}
}

Player.prototype.recruitChampion = function(id) {
	var pos = 0;
	for (var c = 0; c < 4; c++) {
		var ch = this.getChampion(c);
		if (ch !== null && pos === ch.recruitment.position) {
			pos++;
		}
		if (typeof id === "undefined") {
			if (typeof this.champion[c] === 'undefined') {
				this.champion[c] = -1;
				return true;
			}
		} else if (typeof this.champion[c] === 'undefined' || this.champion[c] === -1) {
			this.champion[c] = id;
			champion[id].recruitment = {
				playerId: this.id,
				attached: true,
				position: pos,
				attackTimer: 20 - pos * 5,
				called: false
			};
			return true;
		}
	}
	return false;
}

Player.prototype.waitChampion = function(c) {
	if (typeof this.champion[c] !== 'undefined' && this.champion[c] !== -1) {
		var xy = getOffsetByRotation(this.d);
		var x1 = this.x + xy.x;
		var y1 = this.y + xy.y;
		if (canMove(this.floor, this.x, this.y, this.d) === OBJECT_NONE && getMonsterAt(this.floor, x1, y1) === null) {
			var ch = this.getChampion(c);
			var s = [3, 0, 1, 2];
			ch.getMonster().x = x1;
			ch.getMonster().y = y1;
			ch.getMonster().square = this.d; //(s[this.d] + ch.getMonster().square) % 4;
			ch.recruitment.attached = false;
			//ch.recruitment.attackTimer = 0;
			return true;
		}
	}
	return false;
}

Player.prototype.dismissChampion = function(c) {
	if (typeof this.champion[c] !== 'undefined' && this.champion[c] !== -1) {
		var xy = getOffsetByRotation(this.d);
		var x1 = this.x + xy.x;
		var y1 = this.y + xy.y;
		if (canMove(this.floor, this.x, this.y, this.d) === OBJECT_NONE && getMonsterAt(this.floor, x1, y1) === null) {
			var ch = this.getChampion(c);
			var s = [3, 0, 1, 2];
			ch.getMonster().x = x1;
			ch.getMonster().y = y1;
			ch.getMonster().square = (this.d + 3) % 4; //(s[this.d] + ch.getMonster().square) % 4;
			ch.recruitment = {
				playerId: -1,
				attached: false,
				position: 0,
				attackTimer: 0
			};
			this.champion[c] = -1;
			return true;
		}
	}
	return false;
}

Player.prototype.getChampionLength = function() {
	var l = 0;
	for (c = 0; c < 4; c++) {
		if (typeof this.champion[c] !== 'undefined' && this.champion[c] !== -1) {
			l++;
		}
	}
	return l;
}

//loc = location number (0-3)
Player.prototype.getChampion = function(loc) {
	if (loc > -1 && typeof this.champion[loc] !== "undefined" && this.champion[loc] !== null && this.champion[loc] > -1) {
		return champion[this.champion[loc]];
	}
	return null;
}


Player.prototype.getChampionPosition = function(id) {
	for (c = 0; c < this.champion.length; c++) {
		var ch = this.getChampion(c);
		if (ch.id === id) {
			return c;
		}
	}
	return -1;
}

//gets champions. champion 0 is the leader
//all === true means also getting the 'unattached' champions
Player.prototype.getOrderedChampionIds = function(all) {
	if (typeof all === 'undefined') {
		var all = false;
	}
	var c1 = new Array();
	c1.push(this.championLeader);
	for (c = 0; c < this.champion.length; c++) {
		if (c !== this.championLeader) {
			var ch = this.getChampion(c);
			if (ch !== null && (all || ch.recruitment.attached)) {
				c1.push(c);
			}
		}
	}
	return c1;
}

Player.prototype.getOrderedChampions = function(all) {
	var ch1 = new Array();
	var c1 = this.getOrderedChampionIds();
	for (c = 0; c < this.champion.length; c++) {
		var cid = c1[c];
		var ch = this.getChampion(cid);
		if (ch !== null && (all || ch.recruitment.attached)) {
			ch1.push(ch);
		}
	}
	return ch1;
}

Player.prototype.gainChampionXp = function(xp, ch) {
	if (typeof ch !== "undefined") {
		gainChampionXp1();
	} else {
		for (c = 0; c < this.champion.length; c++) {
			var ch = this.getChampion(c);
			gainChampionXp1();
		}
	}

	function gainChampionXp1() {
		if (ch !== null) {
			ch.xp += xp;
			if (ch.xp > 255) {
				ch.xp = ch.xp % 256;
				ch.xp2++;
				if (ch.xp2 === getXpForSpell(ch.level, ch.prof)) {
					ch.spellUp++;
				}
				if (ch.xp2 === getXpForLevel(ch.level)) {
					ch.xp2 = 0;
					ch.levelUp++;
				}
			}
		}
	}
}

Player.prototype.alertDamagedPlayer = function() {
	this.uiLeftPanel.mode = UI_LEFT_PANEL_MODE_STATS;
	for (ch = 0; ch < this.champion.length; ch++) {
		if (this.getChampion(ch) !== null && this.getChampion(ch).getMonster().dead && ch > 0) {
			toggleChampUI(ch, this, false);
		} else {
			toggleChampUI(ch, this, true);
		}
	}
	if (this.sleeping) {
		this.wakeUp();
	}
}

Player.prototype.resetChampUI = function() {
	for (ch = 0; ch < this.champion.length; ch++) {
		if (this.uiLeftPanel.champs[ch].opened === true) {
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
	mon = getMonstersInTower(towerThis, true);
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
	var form = m.ref.id;
	//var loc = characterSpriteLocation();
	var p = this;

	if (form >= MON_FORM_ILLUSION) {
		if (form <= MON_FORM_BEHOLDER) {
			var dis = [0, 1, 2, 3, 4, 5];
		} else if (form === MON_FORM_DRAGON_SMALL) {
			var dis = [1, 1, 2, 2, 3, 4];
		} else {
			var dis = [0, 0, 1, 1, 2, 3];
		}
		drawMonster(m, (6 + p.d - m.d) % 4, dis[distance], this, offset);
	} else {
		if (typeof monsterPalette[form] !== "undefined") {
			var ofy = 0;
			if(distance === DISTANCE_CLOSE) {
				ofy = 8;
				cut = 3;
			} else if(distance === DISTANCE_FAR) {
				ofy = 6;
				cut = 4;
			} else if(distance === DISTANCE_DISTANT && (m.getSquareByDir() === CHAR_BACK_RIGHT || m.getSquareByDir() === CHAR_BACK_LEFT)) {
				ofy = 4;
				cut = 3;
			}
			if (getObject(m.floor, m.x, m.y) === OBJECT_STAIRS && ofy > 0) {
				var t = offset;
				if (m.getBinaryView(18, 7) === '0') {
					t.y = (t.y + ofy);
					drawCharacter(m, (6 + p.d - m.d) % 4, distance, this, t);
				} else {
					t.y = (t.y - ofy);
					drawCharacter(m, (6 + p.d - m.d) % 4, distance, this, t, false, true, true, cut);
				}
			} else {
				drawCharacter(m, (6 + p.d - m.d) % 4, distance, this, offset);
			}
		}
	}
}

Player.prototype.drawItem = function(it, distance, offset) {
	try {
		var iGfx = itemRef[it.id].gfxD[distance];
		if (typeof iGfx !== "undefined") {
			if (getObject(this.floor, it.location.x, it.location.y, this.d, 2) === OBJECT_SHELF) {
				var offx = 64 - Math.floor(iGfx.width * 0.5) + offset.x;
				var offy = 60 - Math.floor(iGfx.height) - offset.y;
			} else {
				var offx = 64 - Math.floor(iGfx.width * 0.5) + offset.x;
				var offy = 77 - Math.floor(iGfx.height) - offset.y;
			}
			this.Portal.drawImage(iGfx, offx * scale, offy * scale, iGfx.width * scale, iGfx.height * scale);
		}
	} catch (e) {
		"DRAW ITEM ERROR: " + e.toString()
	};
}

Player.prototype.drawProjectile = function(pr, distance, offset) {
	if (pr.type === DUNGEON_PROJECTILE_ARROW || pr.dead <= 0) {
		if (pr.type !== DUNGEON_NONE) {
			var pGfx = itemsGfxD[pr.type][distance];
		}
	} else {
		var pGfx = itemsGfxD[DUNGEON_PROJECTILE_EXPLODE][distance];
	}
	if (typeof pGfx !== "undefined") {
		var offx = 64 - Math.floor(pGfx.width * 0.5) + offset.x;
		var offy = 77 - Math.floor(pGfx.height * 0.5) - offset.y;
		this.Portal.drawImage(recolourSprite(pGfx, DUN_ITEM_PALETTE_DEFAULT, pr.palette), offx * scale, offy * scale, pGfx.width * scale, pGfx.height * scale);
	}
}

Player.prototype.getActivePocketChampion = function() {
	var ch = this.getOrderedChampionIds();
	if (this.getChampion(ch[this.uiRightPanel.activePocket]) !== null) {
		return this.getChampion(ch[this.uiRightPanel.activePocket]);
	}
	return null;
}

Player.prototype.consumeItemInHand = function() {
	this.pocket.setPocketItem(this.pocket.id, this.pocket.quantity - 1);
}

Player.prototype.useItemActivePocket = function() {
	var ch = this.getActivePocketChampion();
	if (ch !== null && !ch.dead) {
		var itH = this.pocket;
		if (itH.id !== 0) {
			switch (itH.type) {
				case ITEM_TYPE_STACKABLE:
					var i = this.findPocketItem(itH.id);
					if (i > -1) {
						if (itH.quantity < 99) {
							itH.quantity++;
							ch.pocket[i].quantity--;
							if (ch.pocket[i].quantity === 0) {
								ch.pocket[i].setPocketItem();
							}
						}
					}
					break;
				case ITEM_TYPE_FOOD:
					var fd = itH.getFoodValue();
					ch.addFood(fd);
					if (itH.id <= ITEM_WATER && itH.id % 3 !== 2) {
						itH.setPocketItem(itH.id - 1);
					} else {
						itH.setPocketItem();
					}
					break;
				case ITEM_TYPE_POTION:
					switch (itH.id) {
						case ITEM_SERPENT_SLIME:
							ch.stat.hp = ch.stat.hpMax;
							break;
						case ITEM_BRIMSTONE_BROTH:
							ch.addHP(Math.floor(ch.stat.hpMax / 2));
							ch.addVit(Math.floor(ch.stat.vitMax / 2));
							ch.addSP(Math.floor(ch.stat.spMax / 2));
							break;
						case ITEM_DRAGON_ALE:
							ch.stat.vit = ch.stat.vitMax;
							break;
						case ITEM_MOON_ELIXIR:
							ch.stat.sp = ch.stat.spMax;
							break;
					}
					itH.setPocketItem();
				default:
					break;
			}
		}
	}
}

Player.prototype.exchangeItemWithHand = function(s, q) {
	var ch = this.getActivePocketChampion();
	if (typeof q === 'undefined') {
		q = 1;
	}
	if (ch !== null) {
		var it = ch.pocket[s];
		var itH = this.pocket;
		var allowedShield = itH.type === ITEM_TYPE_SHIELD && (ch.prof % 2 === PROFESSION_WARRIOR || itH.id <= ITEM_RUNE_SHIELD);
		if (itH.id === 0 || ((s !== POCKET_ARMOUR || itH.type === ITEM_TYPE_ARMOUR) && (s !== POCKET_SHIELD || allowedShield))) {
			if (it.type === ITEM_TYPE_STACKABLE && (itH.id === 0 || it.id === itH.id)) {
				if (itH.id === 0) {
					for (q1 = 0; q1 < q; q1++) {
						itH.setPocketItem(it.id, itH.quantity + 1);
						it.quantity--;
						if (it.quantity === 0) {
							it.setPocketItem();
							break;
						}
					}
				} else if (it.id === itH.id) {
					var qt = it.quantity + itH.quantity;
					var qtH = 0;
					if (it.quantity === 99) {
						qt = qt - 99;
						qtH = 99;
					} else if (qt >= 99) {
						qtH = qt - 99;
						qt = 99;
					}
					itH.setPocketItem(it.id, qtH);
					it.setPocketItem(it.id, qt);
				}
			} else if (itH.type === ITEM_TYPE_STACKABLE && this.findPocketItem(itH.id) > -1) {
				var i = this.findPocketItem(itH.id);
				var qty = itH.quantity + ch.pocket[i].quantity;

				var temp = newPocketItem(it.id, it.quantity);
				it.setPocketItem(itH.id, itH.quantity);
				itH.setPocketItem(temp.id, temp.quantity);

				this.exchangeItemWithHand(i, 99);
				this.exchangeItemWithHand(s, 99);
				if (qty <= 99) {
					this.exchangeItemWithHand(i, 99);
				} else {
					this.exchangeItemWithHand(s, 99);
				}
			} else {
				if ((s === POCKET_LEFT_HAND || s === POCKET_RIGHT_HAND) && it.id === 0) {
					if (itH.type === ITEM_TYPE_GLOVES) {
						this.exchangeItemWithHand(POCKET_GLOVES);
					} else if (itH.id === 0) {
						var it = ch.pocket[POCKET_GLOVES];
					}
				}
				var temp = newPocketItem(it.id, it.quantity);
				it.setPocketItem(itH.id, itH.quantity);
				itH.setPocketItem(temp.id, temp.quantity);
			}
			this.showSpellText = false;
		}
	}
}

Player.prototype.findPocketItem = function(i) {
	var ch = this.getActivePocketChampion();
	if (ch !== null) {
		for (ip = 0; ip < ch.pocket.length; ip++) {
			if (ch.pocket[ip].id === i) {
				return ip;
			}
		}
	}
	return -1;
}

Player.prototype.actionItem = function(s) {
	var itH = this.pocket;
	xy = getOffsetByRotation(this.d);
	xyi = new Array();
	switch (s) {
		case 0:
			xyi = {
				x: this.x,
				y: this.y
			};
			break;
		case 1:
			xyi = {
				x: this.x,
				y: this.y
			};
			break;
		case 2:
			xyi = {
				x: this.x + xy.x,
				y: this.y + xy.y
			};
			break;
		case 3:
			xyi = {
				x: this.x + xy.x,
				y: this.y + xy.y
			};
			break;
		default:
			break;
	}

	setDungeonHex(this.floor, xyi.x, xyi.y, 12, 1, '0');
	if (itH.id === 0) { //take item
		for (i = item[towerThis].length - 1; i >= 0; i--) {
			if (item[towerThis][i].location.tower === towerThis && item[towerThis][i].location.floor === this.floor && item[towerThis][i].location.x === xyi.x && item[towerThis][i].location.y === xyi.y && item[towerThis][i].location.square === (this.d + s) % 4) {
				var it = item[towerThis].splice(i, 1);
				break;
			}
		}
		if (typeof it !== "undefined") {
			for (c = 0; c < this.champion.length; c++) {
				var ch = this.getChampion(c);
				if (ch !== null && ch.id === it[0].id - ITEM_BLODWYN_RIP && !ch.recruitment.attached) {
					ch.recruitment.attached = true;
					return true;
				}
			}

			itH.setPocketItem(it[0].id, it[0].quantity);
			this.showSpellText = false;
			return true;
		}
	} else { //drop item
		dropItem(itH.id, itH.quantity, this.floor, xyi.x, xyi.y, (this.d + s) % 4);
		itH.setPocketItem();
		redrawUI(this.id, UI_REDRAW_RIGHT);
		return true;
	}
	return false;
}

Player.prototype.getItemsInRange = function(pos2) {
	var itemsInRange = [];
	var pos = -1;
	for (i = item[towerThis].length - 1; i >= 0; i--) {
		var it = item[towerThis][i];
		if (this.floor === it.location.floor) {
			pos = coordinatesToPos(it.location.x, it.location.y, this.x, this.y, this.d);
			sq = (6 + it.location.square - this.d) % 4;
			sq2 = (sq === CHAR_FRONT_LEFT || sq === CHAR_FRONT_RIGHT) ? 0 : 1;
			if (pos > -1 && (typeof pos2 === "undefined" || pos2 === pos)) {
				//check shelf
				var sh = false;
				if (getObject(it.location.floor, it.location.x, it.location.y, this.d, 2) === OBJECT_SHELF) {
					sh = true;
				}
				itemsInRange.unshift({
					item: it,
					position: pos,
					distance: getItemDistanceByPos(pos, sq2, sh),
					gfxCoord: getItemGfxOffset(pos, sq, sh),
					square: sq2
				});
			}
		}
	}
	return itemsInRange;
}

Player.prototype.castSpell = function(sb, ch, s) {
	if (!this.dead) {
		if (typeof s === "undefined") {
			var s = false;
		}
		this.doneCommunication();
		if (ch.stat.sp - sb.cost >= 0) {
			ch.addSP(-sb.cost);
			ch.addVit(-sb.cost);
			if (this.doFizzle()) {
				writeSpellInfoFont(this, TEXT_SPELL_FIZZLES, COLOUR[COLOUR_BLUE_DARK]);
			} else if (Math.random() < ch.getSpellCastChance()) {
				castSpell(sb.id, ch.getMonster(), ch.getSpellPower() * 10 + ch.level * 4);
				sb.castSuccessful++;
				if (!s) {
					this.showSpellText = false;
					writeSpellInfoFont(this);
				} else {
					ch.writeAttackPoints('spell');
				}
				this.uiRightPanel.mode = UI_RIGHT_PANEL_MAIN;
				this.redrawLeftRightUiFlag = UI_REDRAW_RIGHT;
			} else if (!s) {
				writeSpellInfoFont(this, TEXT_SPELL_FAILED, COLOUR[COLOUR_GREY_LIGHT]);
			} else {
				ch.writeAttackPoints('spell');
			}
			ch.spellFatigue = ch.spellFatigue - 0.75;
			ch.selectedSpell = null;
			ch.getMonster().doGesture(CHA_GESTURE_SPELLCASTING);
		} else if (!s) {
			writeSpellInfoFont(this, TEXT_COST_TOO_HIGH, COLOUR[COLOUR_RED]);
		}
	}
}

Player.prototype.shootArrow = function(ch) {
	this.doneCommunication();
	var pow = ch.getBowPower();
	if (pow > 0) {
		if (ch.pocket[POCKET_LEFT_HAND].id === ITEM_ARROWS || ch.pocket[POCKET_LEFT_HAND].id === ITEM_ELF_ARROWS) {
			var arr = ch.pocket[POCKET_LEFT_HAND];
		} else if (ch.pocket[POCKET_RIGHT_HAND].id === ITEM_ARROWS || ch.pocket[POCKET_RIGHT_HAND].id === ITEM_ELF_ARROWS) {
			var arr = ch.pocket[POCKET_RIGHT_HAND];
		}
		var col = PALETTE_BRONZE_ARROW;
		if (arr.id === ITEM_ELF_ARROWS) {
			col = PALETTE_GREEN_ARROW;
		}
		arr.setPocketItem(arr.id, arr.quantity - 1);
		newProjectile(DUNGEON_PROJECTILE_ARROW, col, SOUND_ATTACK, arr.id + 100, pow * (1.0 + ch.stat.str / 4.0 + ch.stat.agi / 2.0), this.floor, this.x, this.y, this.d, ch.getMonster());
		ch.writeAttackPoints('shoot');
	}
}

//gets active spell from any champion, when spell id matches
Player.prototype.getActiveSpellById = function(id) {
	var ret = {
		id: -1,
		power: 0,
		timer: 0
	};
	for (c = 0; c < this.champion.length; c++) {
		var ch = this.getChampion(c);
		if (ch !== null && id === ch.activeSpell.id && ret.timer < ch.activeSpell.timer) {
			ret = ch.activeSpell;
		}
	}
	return ret;
}

Player.prototype.getProjectilesInRange = function(pos2) {
	var projectilesInRange = [];
	var pos = -1;
	for (i = 0; i < projectile[towerThis].length; i++) {
		var pr = projectile[towerThis][i];
		if (this.floor === pr.floor && pr.dead <= 1) {
			pos = coordinatesToPos(pr.x, pr.y, this.x, this.y, this.d);
			if (pos > -1 && (typeof pos2 === "undefined" || pos2 === pos)) {
				projectilesInRange.push({
					projectile: pr,
					position: pos,
					distance: getProjectileDistanceByPos(pos),
					gfxCoord: getProjectileGfxOffset(pos)
				});
			}
		}
	}
	return projectilesInRange;
}

Player.prototype.getObjectOnPos = function(pos, d) {
	if (typeof d === "undefined") {
		d = 2;
	}
	var xy = posToCoordinates(pos, this.x, this.y, this.d);
	return getObject(this.floor, xy.x, xy.y, this.d, d);
}

Player.prototype.message = function(txt, col, wait, delay) {
	if (typeof txt === "undefined") {
		txt = '';
	}
	if (typeof col === "undefined") {
		col = COLOUR[COLOUR_GREEN];
	}
	if (typeof delay === "undefined") {
		delay = 3000;
	}
	var self = this;
	if (typeof wait === "undefined") {
		wait = false;
	}
	if (txt === '') {
		ctx.clearRect(0, (this.ScreenY - 9) * scale, 320 * scale, 8 * scale);
		if (this.messageTimeout !== 0) {
			clearTimeout(this.messageTimeout);
			this.messageTimeout = 0;
		}
	} else if (this.messageTimeout === 0 || !wait) {
		fadeFont(this, txt, 30, delay, 0, this.ScreenY, col);
	} else {
		setTimeout(function() {
			self.message(txt, col, wait);
		}, 500);
	}
}

Player.prototype.checkForMonsterInFront = function() {
	xy = getOffsetByRotation(this.d);
	mon = getMonsterAt(this.floor, this.x + xy.x, this.y + xy.y);
	return mon;
}

Player.prototype.startDrawHitDamage = function(cid, dmg) {
	if (dmg > 0) {
		var c1 = this.getOrderedChampionIds();
		for (c = 0; c < this.champion.length; c++) {
			var c2 = c1[c];
			var ch = this.getChampion(c2);
			if (ch !== null && ch.id === cid && this.uiLeftPanel.champs[c].opened) {
				this.uiLeftPanel.champs[c].damageTimer = timerMaster;
				this.uiLeftPanel.champs[c].damage = dmg;
			}
		}
	}
}

Player.prototype.testMode = function(id) {
	if (debug) {
		var xy = posToCoordinates(15, this.x, this.y, this.d);
		var hex = tower[towerThis].floor[this.floor].Map[xy.y][xy.x];
		//tower[towerThis].floor[this.floor].Map[xy.y][xy.x] = setHexToBinaryPosition(hex, 8, 8, '0'); //REMOVE OBJECT
		//tower[towerThis].floor[this.floor].Map[xy.y][xy.x] = toggleObject(hex, '3'); //TOGGLE PILLAR
		//tower[towerThis].floor[this.floor].Map[xy.y][xy.x] = setHexToBinaryPosition(hex, 10, 2, '' + ((parseInt(getHexToBinaryPosition(hex, 10, 2)) + 1) % 4)); //ROTATE WALL
		//tower[towerThis].floor[this.floor].Map[xy.y][xy.x] = bin2hex(hex2bin(hex).substring(2, 8) +  hex2bin(hex).substring(0, 2) + hex2bin(hex).substring(8, 16)); //ROTATE WOODEN WALL
		/*try {
			var view = this.getView();
			for (i = 0; i < 17; i++) {
				var t = view[i].substring(2, 4);
				if (view[i].substring(2, 4) === "80") {
					window.alert("Distance: " + getMonsterDistanceByPos(i) + " Code: " + view[i]);
				}
			}
		} catch (e) {
			PrintLog(e.toString());
		};*/
		//this.castSpell(SPELL_MINDROCK, this.getChampion(0));
	}
}

Player.prototype.doCommunication = function(text) {
	if (!this.dead) {
		switch (this.communication.mode) {
			case COMMUNICATION_PAGE_MAIN:
				switch (text) {
					case COMMUNICATION_COMMUNICATE:
						var m = this.checkForMonsterInFront();
						if (m !== null) {
							var mon = champion[this.championLeader].getMonster();
							m.communicating = true;
							if (m.champId === -1 || m.isRecruitedBy() === null) {
								m.rotateTo((this.d + 2) % 4);
							}
							this.communication.monster = m;
							this.communication.mode = COMMUNICATION_PAGE_COMMUNICATE_0;
							this.communication.charisma = champion[this.championLeader].stat.cha;
							this.determineCommunicationQuestionAnswer(7);
							mon.doGesture(CHA_GESTURE_GREETING);
						} else {
							this.determineCommunicationQuestionAnswer(6);
						}
						break;
					case COMMUNICATION_CALL:
						for (var c = 0; c < 4; c++) {
							var ch = this.getChampion(c);
							if (ch !== null && !ch.recruitment.attached && !ch.dead) {
								ch.recruitment.called = true;
							}
						}
						this.communication.text = text;
						this.determineCommunicationQuestionAnswer(this.communication.mode, this.communication.text);
						break;
					default:
						this.communication.text = text;
						this.determineCommunicationQuestionAnswer(this.communication.mode, this.communication.text);
						this.communication.mode = COMMUNICATION_PAGE_NAMES;
						break;
				}
				break;
			case COMMUNICATION_PAGE_NAMES:
				switch (this.communication.text) {
					case COMMUNICATION_WAIT:
						if (text < this.getChampionLength() - 1) {
							var c1 = this.getOrderedChampionIds();
							var c2 = c1[text + 1];
							this.waitChampion(c2);
							this.communication.mode = COMMUNICATION_PAGE_MAIN;
							this.communication.text = null;
							redrawUI(this.id);
						}
						break;
					case COMMUNICATION_DISMISS:
						if (text < this.getChampionLength() - 1) {
							var c1 = this.getOrderedChampionIds();
							var c2 = c1[text + 1];
							this.dismissChampion(c2);
							this.communication.mode = COMMUNICATION_PAGE_MAIN;
							this.communication.text = null;
							redrawUI(this.id);
						}
						break;
				}
				break;
			default:
				this.determineCommunicationQuestionAnswer(this.communication.mode, text);
				if (typeof TEXT_COMMUNICATION_COMMANDS[this.communication.mode] !== 'undefined' && typeof TEXT_COMMUNICATION_COMMANDS[this.communication.mode][text] !== 'undefined' && TEXT_COMMUNICATION_COMMANDS[this.communication.mode][text].to !== null) {
					this.communication.mode = TEXT_COMMUNICATION_COMMANDS[this.communication.mode][text].to;
				}
				break;
		}
		this.communication.text = text;
		drawCommunicationBox(this, text, true);
	}

};

Player.prototype.doCommunicationAnswer = function() {
	var ans = this.communication.answer;
	this.message(ans, COLOUR[COLOUR_RED]);
	var mon = this.communication.monster;
	if (this.communication.mode === COMMUNICATION_PAGE_COMMUNICATE_0) {
		if (this.communication.text === COMMUNICATION_RECRUIT && ans === 'YES') {
			this.recruitChampion(mon.champId);
			this.doneCommunication();
			this.updateChampions();
			redrawUI(this.id);
		}
	}
	this.communication.answerTimer = 0;
	this.communication.answer = null;
}

Player.prototype.determineCommunicationQuestionAnswer = function(mode, text) {
	var c = this.getCommunication(mode, text);
	if (typeof c !== 'undefined') {
		var myColour = COLOUR[COLOUR_GREEN];
		if (this.id === 1) {
			myColour = COLOUR[COLOUR_PINK];
		}
		var q = Math.floor(Math.random() * c.question.length);
		this.message(c.question[q], myColour);
		var mon = this.communication.monster;
		if (mon !== null) {
			if (mon.champId === -1 || mon.isRecruitedBy() === null) {
				if (c.answer.length > 0) {
					var a = this.filterCommunicationAnswer(c.answer, mode, text);
					var ans = a[Math.floor(Math.random() * a.length)];
					this.communication.answer = c.answer[ans];
					this.communication.answerTimer = timerMaster;
				}
			} else if (typeof player[1] !== 'undefined' && mon.isRecruitedBy() === player[1 - this.id]) { //other player
				p1 = player[1 - this.id];
				p1.message(c.question[q], COLOUR[COLOUR_RED]);
			}
			this.communication.charisma += 5;
		}
	}
}

Player.prototype.filterCommunicationAnswer = function(answer, mode, text) {
	var ans = new Array();
	for (a = 0; a < answer.length; a++) {
		ans.push(a);
	}
	var mon = this.communication.monster;
	if (mode === COMMUNICATION_PAGE_COMMUNICATE_0) {
		if (text === COMMUNICATION_RECRUIT) {
			if (mon.champId > -1) { //champions
				if (this.getChampionLength() >= 4) {
					ans = [1, 4];
				} else {
					ans = [1, 2, 3];
				}
			} else { //monsters
				ans = [0, 1];
			}
		}
	} else if (mode === COMMUNICATION_PAGE_IDENTIFY) {
		if (text === COMMUNICATION_WHO_GOES || text === COMMUNICATION_NAME_SELF) {
			if (mon.champId > -1) { //champions
				ans = [0];
			} else if (mon.form === 64) { //zendik
				ans = [3];
			} else { //monsters
				ans = [1, 2];
			}
		} else if (text === COMMUNICATION_THY_TRADE) {
			if (mon.champId > -1) { //champions
				ans = [1];
			} else {
				ans = [0];
			}
		} else if (text === COMMUNICATION_REVEAL_SELF) {
			if (mon.champId > -1) { //champions
				ans = [0];
			} else {
				ans = [1, 2, 3, 4];
			}
		}
	}
	return ans;
}

Player.prototype.doneCommunication = function() {
	if (this.communication.mode > COMMUNICATION_PAGE_MAIN) {
		if (this.communication.monster !== null) {
			this.communication.monster.communicating = false;
			this.communication.monster = null;
			this.communication.answer = null;
			this.communication.answerTimer = 0;
		}
		this.communication.mode = COMMUNICATION_PAGE_MAIN;
		this.uiLeftPanel.mode = UI_LEFT_PANEL_MODE_COMMAND;
		redrawUI(this.id, UI_REDRAW_LEFT);
	}
}

Player.prototype.getCommunication = function(mode, text) {
	for (var q = 0; q < TEXT_COMMUNICATION.length; q++) {
		if ((typeof TEXT_COMMUNICATION[q][1] !== 'undefined' && TEXT_COMMUNICATION[q][1] !== null) || typeof text !== 'number') {
			if ((typeof text === 'number' && TEXT_COMMUNICATION[q][1] === mode && TEXT_COMMUNICATION[q][2] === text) || (typeof text !== 'number' && q === mode)) {
				var qa = {
					question: [],
					answer: []
				};
				var qs = 0;
				var ql = 1;
				if (typeof TEXT_COMMUNICATION[q][3] !== 'undefined' && TEXT_COMMUNICATION[q][3] !== null) {
					qs = TEXT_COMMUNICATION[q][3];
				}
				if (typeof TEXT_COMMUNICATION[q][4] !== 'undefined' && TEXT_COMMUNICATION[q][4] !== null) {
					ql = TEXT_COMMUNICATION[q][4];
				}
				for (var q1 = 0; q1 < ql; q1++) {
					var que = '';
					if (typeof TEXT_COMMUNICATION[q + q1 + qs][0] === 'string') {
						que = TEXT_COMMUNICATION[q + q1 + qs][0];
					} else {
						for (var w = 0; w < TEXT_COMMUNICATION[q + q1 + qs][0].length; w++) {
							var w1 = Math.floor(Math.random() * TEXT_COMMUNICATION[q + q1 + qs][0][w].length);
							que += TEXT_COMMUNICATION[q + q1 + qs][0][w][w1];
						}
					}
					var suf = '';
					if (typeof text === 'string') {
						suf = text;
					}
					if (typeof TEXT_COMMUNICATION[q][7] !== 'undefined') {
						switch (TEXT_COMMUNICATION[q][7]) {
							case 'name':
								suf = this.getChampion(this.championLeader).getName();
								break;
							case 'prof':
								suf = this.getChampion(this.championLeader).getTrade();
								break;
							case 'item':
								if (this.pocket.id > 0) {
									suf = itemRef[this.pocket.id].name;
								}
								break;
						}
					}
					qa.question[q1] = que + suf;
				}
				var as = 0;
				var al = 0;
				if (typeof TEXT_COMMUNICATION[q][5] !== 'undefined' && TEXT_COMMUNICATION[q][5] !== null) {
					as = TEXT_COMMUNICATION[q][5];
				}
				if (typeof TEXT_COMMUNICATION[q][6] !== 'undefined' && TEXT_COMMUNICATION[q][6] !== null) {
					al = TEXT_COMMUNICATION[q][6];
				}
				for (var a1 = 0; a1 < al; a1++) {
					var ans = '';
					if (typeof TEXT_COMMUNICATION[q + a1 + as][0] === 'string') {
						ans = TEXT_COMMUNICATION[q + a1 + as][0];
					} else {
						for (var w = 0; w < TEXT_COMMUNICATION[q + a1 + as][0].length; w++) {
							var w1 = Math.floor(Math.random() * TEXT_COMMUNICATION[q + a1 + as][0][w].length);
							ans += TEXT_COMMUNICATION[q + a1 + as][0][w][w1];
						}
					}
					var suf = '';
					if (typeof TEXT_COMMUNICATION[q + a1 + as][7] !== 'undefined') {
						switch (TEXT_COMMUNICATION[q + a1 + as][7]) {
							case 'name':
								if (this.communication.monster.champId > -1) {
									suf = champion[this.communication.monster.champId].getName();
								}
								break;
							case 'prof':
								if (this.communication.monster.champId > -1) {
									suf = champion[this.communication.monster.champId].getTrade();
								}
								break;
							case 'item':
								//item trading from monsters
						}
					}
					qa.answer[a1] = ans + suf;
				}
				return qa;
			}
		}
	}
}

function getPlayerAt(f, x, y) {
	for (var p in player) {
		var pl = player[parseInt(p)];
		if(!pl.dead && f === pl.floor && x === pl.x && y === pl.y) {
			return pl;
		}
	}
	return null;
}

function initPlayersStart(ch1, ch2) {
	if (typeof ch1 === "number") {
		c1 = [ch1, ch2];
		for (p in player) {
			player[p].recruitChampion(c1[p]);
			for (i = 1; i < 4; i++) {
				player[p].recruitChampion();
			}
			var ch = player[p].getChampion(0);
			var m = ch.getMonster();
			var f = m.floor;
			var x = m.x;
			var y = m.y;
			var d = m.d;
			player[p].setPlayerPosition(f, x, y, d);
		}
	} else {
		for (p in player) {
			for (i = 0; i < 4; i++) {
				c1 = [ch1[i], ch2[i]];
				player[p].recruitChampion(c1[p]);
			}
		}
		player[0].setPlayerPosition(3, 12, 23, 0); //(3, 12, 23, 0);
		if (typeof player[1] !== 'undefined') {
			player[1].setPlayerPosition(3, 14, 23, 0); //(3, 14, 23, 0);
		}
	}
}

function initPlayers(singlePlayer, quickStart, p1_cid, p2_cid) {
	if (singlePlayer && !quickStart) {
		player[0] = new Player(0, 0, 30);
		initPlayersStart(p1_cid, null);
	} else if (!quickStart) {
		player[0] = new Player(0, 0, 10);
		player[1] = new Player(1, 0, 114);
		initPlayersStart(p1_cid, p2_cid);
	}

	if (quickStart && !singlePlayer) {
		player[0] = new Player(0, 0, 10);
		player[1] = new Player(1, 0, 114);
		initPlayersStart([0, 14, 5, 3], [4, 6, 13, 15]);
	} else if (quickStart && singlePlayer) {
		player[0] = new Player(0, 0, 30);
		initPlayersStart([0, 14, 5, 3], 4);
	}
}

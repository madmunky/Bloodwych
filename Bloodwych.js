//Init the game



$(function() {
	initGame();

	if (debug) {
		debugWindow = window.open("", "Bloodwych Debug", "status=no, width=400, height=200");
		if (typeof debugWindow !== "undefined" && debugWindow !== null) {
			debugWindow.document.body.innerHTML = '';
			debugWindow.document.body.style.background = '#000000';
			debugWindow.document.write('<head><link href="css/style.css" type="text/css" rel="stylesheet"></head><section class="debug player0"><p></p></section><section class="debug player1"><p></p></section>');
		}
	}
	canvas.style.cursor = "url('images/misc/cursor0.png'),auto";

    document.addEventListener("deviceready", onDeviceReady, false);
    // PhoneGap is loaded and it is now safe to make calls PhoneGap methods
    //
    function onDeviceReady() {
        // Register the event listener
        document.addEventListener("menubutton", onMenu, false);
    }

    // Handle the menu button
    //
    function onMenu() {
    	if(typeof player[0] !== "undefined") {
	    	if(mobileMenuOpen) {
		    	alert("closed the menu");
		    	mobileMenuOpen = false;
			    player[0].uiLeftPanel.mode = UI_LEFT_PANEL_MODE_STATS;
		    } else {
		    	alert("opened the menu");
		    	mobileMenuOpen = true;
		    	player[0].uiLeftPanel.mode = UI_LEFT_PANEL_MODE_COMMAND;
		    }
		    redrawUI(0, UI_REDRAW_LEFT);
		}
    }
});

function updatePlayerViewScreen() {
	if (debug) {
		if (typeof debugWindow !== "undefined" && debugWindow !== null) {
			$('section.debug p', debugWindow.document).html('');
		}
	}

	configCanvas();
	debugText(player[0], "FPS: " + fps.getFPS());

	for (p in player) {
		debugText(player[p], "T:" + TOWER_NAME[towerThis] + "  F:" + player[p].floor + "  X:" + player[p].x + "  Y:" + player[p].y + "  D:" + player[p].d);
		drawPlayersView(player[p]);
		drawUI(player[p]);
		testing(player[p]);
	}
	redrawPlayerUiFlag = 0;
}

function setViewportScale(sp) {
	var zoom = 1;
	scaleReal = 3;
	if(isMobile) {
		zoom = 2;
		if (typeof sp !== "undefined" && sp) {
			scaleReal = $(window).width() / (320 / zoom);
		} else {
			scaleReal = $(window).height() / (200 / zoom);
		}
	}
	scale = Math.floor(scaleReal);
	scaleReal = scaleReal / scale / zoom;
	//canvas.width = 320 * scale;
	//canvas.height = 200 * scale;
	$('html').css('zoom', scaleReal);
	$('html').css('-moz-transform', 'scale(' + scaleReal + ')');
	if (typeof player !== "undefined") {
		for (p in player) {
			player[p].PortalX = (player[p].ScreenX + 96) * scale;
			player[p].PortalY = (player[p].ScreenY + 2) * scale;
			player[p].PlayerCanvas.width = 128 * scale;
			player[p].PlayerCanvas.height = 76 * scale;
			player[p].PlayerCanvas.getContext("2d").imageSmoothingEnabled = false;
			player[p].PlayerCanvas.getContext("2d").webkitImageSmoothingEnabled = false;
			player[p].PlayerCanvas.getContext("2d").mozImageSmoothingEnabled = false;
			player[p].PlayerCanvas.getContext("2d").oImageSmoothingEnabled = false;
			player[p].PlayerCanvas.getContext("2d").msImageSmoothingEnabled = false;
			player[p].PlayerCanvas.getContext("2d").font = "bold 20px Calibri";
		}
		//redrawUI(2);
	}
}

function myDIx(canvas, img, PosAry) {
	if (typeof canvas.drawImage !== "undefined" && typeof img !== "undefined" && img !== null) {
		canvas.drawImage(img, PosAry[0], PosAry[1], PosAry[2], PosAry[3], (PosAry[4] * scale), (PosAry[5] * scale), PosAry[2] * scale, PosAry[3] * scale);
	}
}

function configCanvas() {
	ctx.imageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.oImageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
	ctx.font = "bold 20px Calibri";
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function pauseGame(){
    
    paused = !paused;    
    
}

//Renders the sub-coloured objects. E.g. for locked doors and banners

function gfxColourSubs(folder, type, item, sub) {
	if (item != "") {
		for (i = 1; i <= sub; i++) {
			gfx[folder][type][item][i] = recolorImage(gfx[folder][type][item][0], i, folder, type, item);
		}
		gfx[folder][type][item][0] = recolorImage(gfx[folder][type][item][0], 0, folder, type, item);
	} else {
		for (i = 1; i <= sub; i++) {
			gfx[folder][type][i] = recolorImage(gfx[folder][type][0], i, folder, type, item);
		}
		gfx[folder][type][0] = recolorImage(gfx[folder][type][0], 0, folder, type, item);
	}
}

//Loads image into the gfx array
//type: type of object, e.g. wall, door, wood
//item: the object itself, e.g. bed, switch, shelf
//sub: define this to the number of color variations you wish to add for this type of object. Currently maximum of 8

function gfxLoadImage(folder, type, item, sub) {
	if (typeof type === 'string') {
		gfxLoaded.count++;
		var id = '';
		if (typeof gfx[folder] === 'undefined') {
			gfx[folder] = {};
		}
		if (typeof gfx[folder][type] === 'undefined') {
			gfx[folder][type] = {};
		}
		if (typeof sub === 'number' && sub != null && (typeof gfx[folder][type][item] === 'undefined')) {
			gfx[folder][type][item] = {};
		}
		if (typeof item !== 'undefined' && item != '') {
			id = type + '-' + item;
		} else {
			id = type;
		}

		$('body').append('<img id="' + id + '" src="images/' + folder + '/' + id + '.png" class="gfx" />');
		if (typeof sub === 'number' && sub != null) {
			if (item != '') {
				gfx[folder][type][item][0] = document.getElementById(id);
				$(gfx[folder][type][item][0]).load(function() {
					gfxColourSubs(folder, type, item, sub);
					checkAllGfxLoaded();
				});
			} else {
				gfx[folder][type][0] = document.getElementById(id);
				$(gfx[folder][type][0]).load(function() {
					gfxColourSubs(folder, type, '', sub);
					checkAllGfxLoaded();
				});
			}
		} else if (typeof item === 'string' && item != '') {
			gfx[folder][type][item] = document.getElementById(id);
			$(gfx[folder][type][item]).load(function() {
				checkAllGfxLoaded();
			});
		} else {
			gfx[folder][type] = document.getElementById(id);
			$(gfx[folder][type]).load(function() {
				checkAllGfxLoaded();
			});
		}
	}
}

function checkAllGfxLoaded() {
	gfxLoaded.max++;
	if (gfxLoaded.count === gfxLoaded.max) {
		gfxLoaded.done = true;
	}
}

//Print debug info for player

function debugTextPrint(p) {
	if (debug) {
		hex = p.getBinaryView(15, 0, 16);
		debugText(p, hex2bin(hex) + ' | ' + hex);
		var xy = getOffsetByRotation(p.d);
		var ob = getObject(p.floor, p.x + xy.x, p.y + xy.y, p.d, 2);
		if(ob === OBJECT_NONE) {
			ob = canMove(p.floor, p.x, p.y, p.d);
		}
		debugText(p, getObjectNameById(ob));
		var mon = getMonsterAt(p.floor, p.x + xy.x, p.y + xy.y);
		if(mon !== null) {
			debugText(p, 'M' + mon.id + ' - lvl: ' + mon.level + ' - typ: ' + mon.type + ' - frm: ' + mon.form + ' - hp: ' + mon.hp);
		}

		for (var c = 0; c < p.champion.length; c++) {
			var ch = p.getChampion(c);
			if (ch !== null) {
				debugText(p, 'C' + c + ' - xp: ' + ch.xp + ' - xp2: ' + ch.xp2 + ' / ' + getXpForSpell(ch.level, ch.prof) + ' / ' + getXpForLevel(ch.level) + ' - level up: ' + ch.levelUp + ' - spell up: ' + ch.spellUp);
			}
		}
        if (typeof debugWindow !== "undefined" && debugWindow !== null) {
        	if($('body .debug-input', debugWindow.document).length === 0) {
        		$('body', debugWindow.document).append('<div class="debug-input">');
        		$('body .debug-input', debugWindow.document).append('<div><strong>Coordinates</strong></div>');
        		$('body .debug-input', debugWindow.document).append('<label for="coord-t">T: </label><input type="text" id="coord-t" value="' + towerThis + '">');
        		$('body .debug-input', debugWindow.document).append('<label for="coord-f">F: </label><input type="text" id="coord-f" value="' + player[0].floor + '">');
        		$('body .debug-input', debugWindow.document).append('<label for="coord-x">X: </label><input type="text" id="coord-x" value="' + player[0].x + '">');
        		$('body .debug-input', debugWindow.document).append('<label for="coord-y">Y: </label><input type="text" id="coord-y" value="' + player[0].y + '">');
        		$('body .debug-input', debugWindow.document).append('<input type="button" id="coord-submit" value="update">');
        		$('body .debug-input', debugWindow.document).on('click', '#coord-submit', function() {
        			var tower = parseInt($('body .debug-input #coord-t', debugWindow.document).val());
        			var floor = parseInt($('body .debug-input #coord-f', debugWindow.document).val());
        			var x = parseInt($('body .debug-input #coord-x', debugWindow.document).val());
        			var y = parseInt($('body .debug-input #coord-y', debugWindow.document).val());
        			if(towerThis !== tower) {
        				switchTower(tower);
        			}
        			player[0].setPlayerPosition(floor, x, y);
        		});
        	}
			var tower = parseInt($('body .debug-input #coord-t', debugWindow.document).val());
			var floor = parseInt($('body .debug-input #coord-f', debugWindow.document).val());
			var x = parseInt($('body .debug-input #coord-x', debugWindow.document).val());
			var y = parseInt($('body .debug-input #coord-y', debugWindow.document).val());
			if(!$('body .debug-input #coord-t', debugWindow.document).is(':focus') && !$('body .debug-input #coord-f', debugWindow.document).is(':focus') && !$('body .debug-input #coord-x', debugWindow.document).is(':focus') && !$('body .debug-input #coord-y', debugWindow.document).is(':focus') && !$('body .debug-input #coord-submit', debugWindow.document).is(':focus')) {
				if(tower !== towerThis) {
					$('body .debug-input #coord-t', debugWindow.document).val(towerThis);
				}
				if(floor !== player[0].floor) {
					$('body .debug-input #coord-f', debugWindow.document).val(player[0].floor);
				}
				if(x !== player[0].x) {
					$('body .debug-input #coord-x', debugWindow.document).val(player[0].x);
				}
				if(y !== player[0].y) {
					$('body .debug-input #coord-y', debugWindow.document).val(player[0].y);
				}
			}
        }
	}
}

function debugGetInputCoords() {
	if (typeof debugWindow !== "undefined" && debugWindow !== null) {
		if($('body .debug-input', debugWindow.document).length > 0) {
		}
	}
}

function debugText(p, txt) {
	if (typeof debugWindow !== "undefined" && debugWindow !== null) {
		$('section.debug.player' + p.id + ' p', debugWindow.document).append('P' + (p.id + 1) + ': ' + txt + '<br/>');
	}
}

function godMode() {
	for (c in champion) {
		var ch = champion[c];
		ch.level = 99;
		ch.stat.str = 99;
		ch.stat.agi = 99;
		ch.stat.int = 99;
		ch.stat.cha = 99;
		ch.stat.hp = 255;
		ch.stat.hpMax = 255;
		ch.stat.vit = 255;
		ch.stat.vitMax = 255;
		ch.stat.sp = 99;
		ch.stat.spMax = 99;
		/*ch.level = 18;
		ch.stat.str = 65;
		ch.stat.agi = 56;
		ch.stat.int = 52;
		ch.stat.cha = 49;
		ch.stat.hp = 120;
		ch.stat.hpMax = 120;
		ch.stat.vit = 153;
		ch.stat.vitMax = 153;
		ch.stat.sp = 76;
		ch.stat.spMax = 76;*/
		for (pg = 0; pg < COLOUR_MAX; pg++) {
			for (rw = 0; rw < SPELL_MAX; rw++) {
				ch.spellBook[pg][rw].learnt = true;
			}
		}
	}

}

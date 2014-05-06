//Init the game
var debugWindow;


$(function() {
	initGame();
        if (debug){
            debugWindow = window.open("","Bloodwych Debug","status=no, width=400, height=200");
            debugWindow.document.body.style.background = '#000000';
            debugWindow.document.write('<head><link href="css/style.css" type="text/css" rel="stylesheet"></head><section class="debug player0"><p></p></section><section class="debug player1"><p></p></section>');
        }
});

function updatePlayerViewScreen() {

	$('section.debug p',debugWindow.document).html('');
	clearCanvas();
	configCanvas();
	//ctx.font = "normal 11px verdana, sans-serif";
	//ctx.fillStyle = "#FFF";
	for(p = 0; p < 2; p++) {
		drawPlayersView(player[p]);
                debugText(player[p], "Player " + (p + 1));
                debugText(player[p], "T:" + TOWER_NAME[towerThis] + "  F:" + player[p].floor + "  X:" + player[p].x + "  Y:" + player[p].y + "  D:" + player[p].d);
		//ctx.fillText("Player " + (p + 1), p * 410, 250);
		//ctx.fillText("T:" + TOWER_NAME[towerThis] + "  F:" + player[p].floor + "  X:" + player[p].x + "  Y:" + player[p].y + "  D:" + player[p].d, p * 410, 270);
	}
        debugText(p,"FPS: " + fps.getFPS());
	//ctx.fillText("FPS: " + fps.getFPS(), 0, 310);
	/*player[1].updateView(tower[towerThis].floor[player[1].floor].Map);
	drawPlayersView(player[1]);
	ctx.fillText("Player 2", 410, 250);
	ctx.fillText("X:" + player[1].x.toString() + "  Y:" + player[1].y.toString(), 410, 270);
	ctx.fillText("Current Map: " + TOWER_NAME[towerThis], 410, 290);
	ctx.fillText("Floor: " + player[1].floor.toString(), 410, 310);*/

	//writeFontImage("Testing: ,!) 123", 0, 320, COLOUR[COLOUR_GREEN]);
        
}

function myDIx(canvas, img, PosAry, P, scale) {

	if (typeof img === "undefined" || img === null) {} else {
		canvas.drawImage(img, PosAry[0], PosAry[1], PosAry[2], PosAry[3], (PosAry[4] * scale), (PosAry[5] * scale), PosAry[2] * scale, PosAry[3] * scale);
	}
}

function configCanvas() {
	ctx.imageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.oImageSmoothingEnabled = false;
	ctx.font = "bold 20px Calibri";
}

function clearCanvas() {
	canvas.width = canvas.width;
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
	if(gfxLoaded.count === gfxLoaded.max) {
		gfxLoaded.done = true;
	}
}

//Print debug info for player
function debugTextPrint(p) {
	if (debug) {
		hex = p.getBinaryView(15, 0, 16);
		//debugText(p, 'Master timer:' + timerMaster)
		//debugText(p, 'Champ: ' + p.getChampion(0));
		//debugText(champion[2].firstName + ' hp:' + champion[2].hp + ' rec:' + champion[2].recruited + ' Spells:' + champion[2].spellBook);
		//debugText(hex2bin(hex));
		//debugText(hex2bin(hex).substring(2, 8) + ' ' + hex2bin(hex).substring(0, 2) + ' ' + hex2bin(hex).substring(8, 16) + ' : ' + bin2hex(hex2bin(hex).substring(2, 8) + hex2bin(hex).substring(0, 2) + hex2bin(hex).substring(8, 16)));
		debugText(p, hex2bin(getHexToBinaryPosition(p.getView()[15], 0, 16)));
		debugText(p, hex2dec(getHexToBinaryPosition(p.getView()[15], 0, 4)) + ' ' + hex2dec(getHexToBinaryPosition(p.getView()[15], 4, 4)) + ' ' + hex2dec(getHexToBinaryPosition(p.getView()[15], 8, 4)) + ' ' + hex2dec(getHexToBinaryPosition(p.getView()[15], 12, 4)));
		//debugText(p.getView()[15]);
		//debugText(p.getView()[15].substring(0,2));
		//debugText(parseInt(getHexToBinaryPosition(p.getView()[15], 0, 5), 16).toString(10));
		//debugText(parseInt(p.getView()[15].substring(0,2), 16).toString(10));
		var mon = p.getMonstersInRange();
		for (i in mon) {
			debugText(p, 'Monster:' + mon[i].monster + ' - MonsterPos:' + mon[i].position + ' - MonsterOffset:' + getMonsterGfxOffset(15, 0).x + ', ' + getMonsterGfxOffset(12, 0).x + ', ' + getMonsterGfxOffset(9, 0).x);
		}
	}
}

function debugText(p, txt) {
	$('section.debug.player' + p.id + ' p',debugWindow.document).append('P' + (p.id + 1) + ': ' + txt + '<br/>');
}

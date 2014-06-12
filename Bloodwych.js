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
        
        canvas.style.cursor = "url('./images/misc/cursor0.png'),auto";
});

function updatePlayerViewScreen() {
	if (debug) {
		if (typeof debugWindow !== "undefined" && debugWindow !== null) {
			$('section.debug p', debugWindow.document).html('');
		}
	}

	//clearCanvas();
	configCanvas();
	debugText(player[0], "FPS: " + fps.getFPS());

	for (p = 0; p < player.length; p++) {
		debugText(player[p], "Player " + (p + 1));
		debugText(player[p], "T:" + TOWER_NAME[towerThis] + "  F:" + player[p].floor + "  X:" + player[p].x + "  Y:" + player[p].y + "  D:" + player[p].d);
		drawPlayersView(player[p]);
		drawUI(player[p]);
		testing(player[p]);
	}
	redrawPlayerUiFlag = 0;
}

function setViewportScale() {
	scale = 2;//$( window ).height() / 200;
	canvas.width = 320 * scale;
	canvas.height = 200 * scale;
	/*if(typeof player !== "undefined") {
		for(p = 0; p < player.length; p++) {
			player[p].PortalX = (player[p].ScreenX + 96) * scale;
			player[p].PortalY = (player[p].ScreenY + 2) * scale;
			player[p].PlayerCanvas.width = 128 * scale;
			player[p].PlayerCanvas.height = 76 * scale;
			player[p].PlayerCanvas.getContext("2d").imageSmoothingEnabled = false;
			player[p].PlayerCanvas.getContext("2d").webkitImageSmoothingEnabled = false;
			player[p].PlayerCanvas.getContext("2d").mozImageSmoothingEnabled = false;
			player[p].PlayerCanvas.getContext("2d").oImageSmoothingEnabled = false;
			player[p].PlayerCanvas.getContext("2d").font = "bold 20px Calibri";
		}
	}
	redrawUI(2);*/
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
	//canvas.width = canvas.width;
}

//function drawDashboard() {
//	myDIx(ctx, gfx["misc"]["dashboard0"], [0, 0, 320, 86, 0, 10]);
//	myDIx(ctx, gfx["misc"]["separator"], [0, 0, 320, 7, 0, 96]);
//	myDIx(ctx, gfx["misc"]["dashboard1"], [0, 0, 320, 86, 0, 114]);
//	writeFontImage(champion[player[0].champion[0]].firstName, 226, 17, COLOUR[COLOUR_YELLOW]);
//	writeFontImage(champion[player[1].champion[0]].firstName, 226, 121, COLOUR[COLOUR_YELLOW]);
//}

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
		//debugText(p, 'Master timer:' + timerMaster)
		//debugText(p, 'Champ: ' + p.getChampion(0));
		//debugText(champion[2].firstName + ' hp:' + champion[2].hp + ' rec:' + champion[2].recruitment.recruited + ' Spells:' + champion[2].spellBook);
		//debugText(hex2bin(hex));
		//debugText(hex2bin(hex).substring(2, 8) + ' ' + hex2bin(hex).substring(0, 2) + ' ' + hex2bin(hex).substring(8, 16) + ' : ' + bin2hex(hex2bin(hex).substring(2, 8) + hex2bin(hex).substring(0, 2) + hex2bin(hex).substring(8, 16)));
		debugText(p, hex2bin(getHexToBinaryPosition(p.getView()[15], 0, 16)));
		debugText(p, canMove(p.floor, p.x, p.y, p.d, 0));
		for (c = 0; c < p.champion.length; c++) {
			var ch = p.getChampion(c);
			if (ch !== null) {
				debugText(p, 'XP' + c + ': ' + ch.xp + ' - XP2' + c + ': ' + ch.xp2 + ' / ' + getXpForSpell(ch.level, ch.prof) + ' / ' + getXpForLevel(ch.level) + ' - Level up' + c + ': ' + ch.levelUp);
			}
		}
		//debugText(p, hex2dec(getHexToBinaryPosition(p.getView()[15], 0, 4)) + ' ' + hex2dec(getHexToBinaryPosition(p.getView()[15], 4, 4)) + ' ' + hex2dec(getHexToBinaryPosition(p.getView()[15], 8, 4)) + ' ' + hex2dec(getHexToBinaryPosition(p.getView()[15], 12, 4)));
		//debugText(p.getView()[15]);
		//debugText(p.getView()[15].substring(0,2));
		//debugText(parseInt(getHexToBinaryPosition(p.getView()[15], 0, 5), 16).toString(10));
		//debugText(parseInt(p.getView()[15].substring(0,2), 16).toString(10));
		/*var mon = p.getMonstersInRange();
        for (i in mon) {
            debugText(p, 'Monster:' + mon[i].monster + ' - MonsterPos:' + mon[i].position + ' - MonsterOffset:' + getMonsterGfxOffset(15, 0).x + ', ' + getMonsterGfxOffset(12, 0).x + ', ' + getMonsterGfxOffset(9, 0).x);
        }*/
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
		ch.stat.ac = 99;
		ch.stat.str = 99;
		ch.stat.agi = 99;
		ch.stat.int = 99;
		ch.stat.cha = 99;
		ch.stat.hp = 255;
		ch.stat.hpMax = 255;
		ch.stat.sp = 255;
		ch.stat.spMax = 255;
		ch.stat.vit = 255;
		ch.stat.vitMax = 255;
		for (pg = 0; pg < COLOUR_MAX; pg++) {
			for (rw = 0; rw < SPELL_MAX; rw++) {
				ch.spellBook[pg][rw].learnt = true;
			}
		}
	}

}

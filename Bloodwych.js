//Load images into the Arrays
var imagesLoaded = false;

$(function() {
	//Background
	gfxLoadImage("dungeon", "background");

	//Stone wall and shelf
	gfxLoadImage("dungeon", "stone", "wall");
	gfxLoadImage("dungeon", "stone", "shelf");

	//Wall decorations, banners, wall buttons and gem slots
	gfxLoadImage("dungeon", "deco", "serpent-head");
	gfxLoadImage("dungeon", "deco", "moon-head");
	gfxLoadImage("dungeon", "deco", "dragon-head");
	gfxLoadImage("dungeon", "deco", "chaos-head");
	gfxLoadImage("dungeon", "deco", "switch", 8);
	gfxLoadImage("dungeon", "deco", "switch-off", 8);
	gfxLoadImage("dungeon", "deco", "gem", 7);
	gfxLoadImage("dungeon", "deco", "gem-off", 7);
	gfxLoadImage("dungeon", "deco", "script", 7);
	gfxLoadImage("dungeon", "deco", "banner", 7);

	//Wooden walls and doors
	gfxLoadImage("dungeon", "wood", "wall");
	gfxLoadImage("dungeon", "wood", "door");
	gfxLoadImage("dungeon", "wood", "door-open");

	//Miscellaneous
	gfxLoadImage("dungeon", "misc", "pillar");
	gfxLoadImage("dungeon", "misc", "bed");

	//Solid doors
	gfxLoadImage("dungeon", "door", "solid", 8);
	gfxLoadImage("dungeon", "door", "gate", 8);
	gfxLoadImage("dungeon", "door", "open", 8);

	//Stairs
	gfxLoadImage("dungeon", "stairs", "down");
	gfxLoadImage("dungeon", "stairs", "up");

	//Floors
	gfxLoadImage("dungeon", "floor", "pit-down");
	gfxLoadImage("dungeon", "floor", "pit-up");
	gfxLoadImage("dungeon", "floor", "switch");

	//Characters
	gfxLoadImage("character", "heads", "");
	gfxLoadImage("character", "arms", "");
	gfxLoadImage("character", "torsos", "");
	gfxLoadImage("character", "legs", "");
	gfxLoadImage("character", "minis", "");

	//Misc
	gfxLoadImage("misc", "font", "");
});

getFileData('maps/heads.monsters', readSimpleData, null, "monsterHeads", 1);
getFileData('maps/bodies.monsters', readSimpleData, null, "monsterBodies", 1);
getFileData('maps/palette.monsters', readSimpleData, null, "monsterPalette", 20);

//var imageChecker = setInterval(function() {
//}, 100);


function updatePlayerViewScreen() {

	$('section.debug p').html('');
	clearCanvas();
	configCanvas();
	player[0].updateView(tw.floor[player[0].floor].Map);
	drawPlayersView(player[0]);
	ctx.font = "normal 11px verdana, sans-serif";
	ctx.fillStyle = "#FFF";
	ctx.fillText("Player 1", 0, 250);
	ctx.fillText("X:" + player[0].x.toString() + "\n Y:" + player[0].y.toString(), 0, 270);
	ctx.fillText("Current Map: " + Maps[CurrentMap], 0, 290);
	ctx.fillText("Floor: " + player[0].floor.toString(), 0, 310);
	ctx.fillText("FPS: " + fps.getFPS(), 0, 350);
	player[1].updateView(tw.floor[player[1].floor].Map);
	drawPlayersView(player[1]);
	ctx.fillText("Player 2", 410, 250);
	ctx.fillText("X:" + player[1].x.toString() + "\n Y:" + player[1].y.toString(), 410, 270);
	ctx.fillText("Current Map: " + Maps[CurrentMap], 410, 290);
	ctx.fillText("Floor: " + player[1].floor.toString(), 410, 310);
	//drawParty(player[1],0,1,8,11);
	//drawParty(player[0],4,5,6,7);
	testing(player[0]);
	writeFontImage("Bloodwych HTML Created By MadMunky And Wishbone ", 0, 320, COLOUR[COLOUR_GREEN_DARK]);

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
				});
			} else {
				gfx[folder][type][0] = document.getElementById(id);
				$(gfx[folder][type][0]).load(function() {
					gfxColourSubs(folder, type, '', sub);
				});
			}
		} else if (typeof item === 'string' && item != '') {
			gfx[folder][type][item] = document.getElementById(id);
		} else {
			gfx[folder][type] = document.getElementById(id);
		}
	}
}

//Print debug info for player

function debugTextPrint(p) {
	if (debug) {
		hex = p.getBinaryView(15, 0, 16);
		var mon = p.getMonstersInRange();
		for (i in mon) {
			debugText(p, 'Monster:' + mon[i].monster + ' - MonsterPos:' + mon[i].position + ' - MonsterOffset:' + getMonsterGfxOffset(15, 0).x + ', ' + getMonsterGfxOffset(12, 0).x + ', ' + getMonsterGfxOffset(9, 0).x);
		}
		//debugText(p, 'Master timer:' + timerMaster)
		//debugText(p, 'Champ: ' + p.getChampion(0));
		//debugText(champion[2].firstName + ' hp:' + champion[2].hp + ' rec:' + champion[2].recruited + ' Spells:' + champion[2].spellBook);
		//debugText(hex2bin(hex));
		//debugText(hex2bin(hex).substring(2, 8) + ' ' + hex2bin(hex).substring(0, 2) + ' ' + hex2bin(hex).substring(8, 16) + ' : ' + bin2hex(hex2bin(hex).substring(2, 8) + hex2bin(hex).substring(0, 2) + hex2bin(hex).substring(8, 16)));
		//debugText(p, hex2bin(getHexToBinaryPosition(p.View[15], 0, 16)));
		//debugText(p.View[15]);
		//debugText(p.View[15].substring(0,2));
		//debugText(parseInt(getHexToBinaryPosition(p.View[15], 0, 5), 16).toString(10));
		//debugText(parseInt(p.View[15].substring(0,2), 16).toString(10));
	}
}

function debugText(p, txt) {
	$('section.debug.player' + p.id + ' p').append('P' + (p.id + 1) + ': ' + txt + '<br/>');
}

//Setup some global Varibles for needed
var scale = 3;
var debug = true;
var debugHigh = false;
var game;
var DIRECTION = 0,
        DISTANCE = 0,
        TYPE = 0,
        COLOR = 0;

//Flags for determining whether some asycnhronous file calls were succesfully loaded (see fileloader.js "getFileData")
var gameGfxLoaded = { monsterHeads: false, monsterLegs: false, monsterArms: false, monsterBodies: false };
var towerDataLoaded = { floor: false, switches: false, triggers: false, monsters: false, champions: false };

//Constants
var CLASS_SERP = 0,
	CLASS_DRAG = 1,
	CLASS_MOON = 2,
	CLASS_CHAOS = 3;

var COLOUR_WHITE =          [224, 224, 224],
	COLOUR_GREY_1 =         [160, 160, 160],
	COLOUR_GREY_2 =         [128, 128, 128],
	COLOUR_GREY_3 =         [96, 96, 96],
	COLOUR_GREY_4 =         [64, 64, 64],
	COLOUR_GREEN =          [0, 192, 0],
	COLOUR_GREEN_DARK =     [0, 128, 0],
	COLOUR_BLUE =           [64, 128, 224],
	COLOUR_BLUE_DARK =      [32, 32, 224],
	COLOUR_YELLOW =         [224, 192, 0],
	COLOUR_ORANGE =         [224, 128, 96],
	COLOUR_BROWN =          [160, 64, 32],
	COLOUR_RED =            [224, 0, 0],
	COLOUR_RED_DARK =       [128, 32, 0],
	COLOUR_BLACK =          [0, 0, 0];

var COLOUR_DOOR_NORMAL = 0,
	COLOUR_DOOR_BRONZE = 1,
	COLOUR_DOOR_IRON = 2,
	COLOUR_DOOR_SERPENT = 3,
	COLOUR_DOOR_CHAOS = 4,
	COLOUR_DOOR_DRAGON = 5,
	COLOUR_DOOR_MOON = 6,
	COLOUR_DOOR_CHROMATIC = 7,
	COLOUR_DOOR_VOID = 8;

var COLOUR_DECO_SERPENT = 0,
	COLOUR_DECO_CHAOS = 1,
	COLOUR_DECO_DRAGON = 2,
	COLOUR_DECO_MOON = 3,
	COLOUR_DECO_BRONZE = 4,
	COLOUR_DECO_IRON = 5,
	COLOUR_DECO_BROWN = 6,
	COLOUR_DECO_TAN = 7,
	COLOUR_DECO_BLACK = 8;

var COLOUR_CHAR_GREEN = 0,
	COLOUR_CHAR_YELLOW = 1,
	COLOUR_CHAR_RED = 2,
	COLOUR_CHAR_BLUE = 3,
	COLOUR_CHAR_BRONZE = 4,
	COLOUR_CHAR_IRON = 5,
	COLOUR_CHAR_GREY = 6,
	COLOUR_CHAR_WHITE = 7,
	COLOUR_CHAR_BLACK = 8;

var DIRECTION_NORTH = 0,
	DIRECTION_EAST = 1,
	DIRECTION_SOUTH = 2,
	DIRECTION_WEST = 3;
	
var CHAR_DISTANCE_CLOSE = 0,
	CHAR_DISTANCE_MID = 1,
	CHAR_DISTANCE_FAR = 2,
	CHAR_DISTANCE_DISTANT = 3;

var Maps = ["MOD0","MOON","CHAOS","DRAGON","ZENDIK","SERP","BWEXTTW1","BWEXTTW2","BWEXTTW3","BWEXTTW4","horace_mod0","horace_moon","horace_drag","horace_serp","horace_zendik","horace_chaos"];

//Background gfx
var CurrentMap = 0;
var background = new Array();
background[0] = new Array(0, 0, 128, 76, 0, 0);
background[1] = new Array(128, 0, 128, 76, 0, 0);

//Declare Arrays for the Graphics
var gfx = [];
var gfxPos = SpriteSheetArray();
var b = 0;
var player = new Array();
var tw = new Tower("MOD0");

//Touch Screen Stuff
var canvas_x;
var canvas_y;

//Load images into the Arrays
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
	gfxLoadImage("dungeon", "deco", "gem", 8);
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
	gfxLoadImage("character", "heads", "", 8);	
	gfxLoadImage("character", "maleArms", "", 8);
	gfxLoadImage("character", "maleBodies", "", 8);
	gfxLoadImage("character", "maleLegs", "", 8);
});

document.addEventListener('touchstart', doTouchStart, false);



function updatePlayerViewScreen(){  
   //try {                  
		$('section.debug p').html('');
		clearCanvas();
		configCanvas();
		player[0].updateView(tw.floor[player[0].floor].Map);
		drawPlayersView(player[0]);
		ctx.font = "normal 11px verdana, sans-serif";
		ctx.fillStyle = "#FFF";
		ctx.fillText("Player 1",0,250);
		ctx.fillText("X:" + player[0].x.toString() + "\n Y:"  + player[0].y.toString(),0,270);
		ctx.fillText("Current Map: " +Maps[CurrentMap],0,290);
		ctx.fillText("Floor: " + player[0].floor.toString(),0,310);
		ctx.fillText("FPS: " + fps.getFPS(),0,350);            
		player[1].updateView(tw.floor[player[1].floor].Map);
		drawPlayersView(player[1]);
		ctx.fillText("Player 2",410,250);
		ctx.fillText("X:" + player[1].x.toString() + "\n Y:"  + player[1].y.toString(),410,270);
		ctx.fillText("Current Map: " +Maps[CurrentMap],410,290);
		ctx.fillText("Floor: " + player[1].floor.toString(),410,310);
		testing();            
	//}catch(e){
	//	PrintLog("Error: " + e.toString());
	//}
}

function myDIx(canvas, img, PosAry, P, scale) {
	
	if (typeof img === "undefined" || img === null) {}
	else {
		canvas.drawImage(img, PosAry[0], PosAry[1], PosAry[2], PosAry[3], (PosAry[4] *scale)+ P.PortalX, (PosAry[5] * scale) + P.PortalY, PosAry[2] * scale, PosAry[3] * scale);
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
	if(item != "") {
		for (i = 1; i <= sub; i++) {
			gfx[folder][type][item][i] = recolorImage(gfx[folder][type][item][0], i, folder, type);
		}
		gfx[folder][type][item][0] = recolorImage(gfx[folder][type][item][0], 0, folder, type);
	} else {
		for (i = 1; i <= sub; i++) {
			gfx[folder][type][i] = recolorImage(gfx[folder][type][0], i, folder, type);
		}
		gfx[folder][type][0] = recolorImage(gfx[folder][type][0], 0, folder, type);
	}
}

//Loads image into the gfx array
//type: type of object, e.g. wall, door, wood
//item: the object itself, e.g. bed, switch, shelf
//sub: define this to the number of color variations you wish to add for this type of object. Currently maximum of 8
function gfxLoadImage(folder, type, item, sub) {
	if(typeof type === 'string') {
		var id = '';
		if(typeof gfx[folder] === 'undefined') {
			gfx[folder] = {};
		}
		if(typeof gfx[folder][type] === 'undefined') {
			gfx[folder][type] = {};
		}
		if(typeof sub === 'number' && sub != null && (typeof gfx[folder][type][item] === 'undefined')) {
			gfx[folder][type][item] = {};
		}
		if(typeof item !== 'undefined' && item != '') {
			id = type + '-' + item;
		} else {
			id = type;
		}

		$('body').append('<img id="' + id + '" src="images/'+folder+'/' + id + '.png" class="gfx" />');
		if(typeof sub === 'number' && sub != null) {
			if(item != '') {
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
		} else if(typeof item === 'string' && item != '') {
			gfx[folder][type][item] = document.getElementById(id);
		} else {
			gfx[folder][type] = document.getElementById(id);
		}
	}
}

//Print debug info for player
function debugTextPrint(p) {
	if(debug) {
		hex = p.getBinaryView(15, 0, 16);
		var mon = p.getMonstersInRange();
		for (i in mon) {
			debugText(p, 'Monster:' + mon[i].monster + ' - MonsterPos:' + mon[i].position);
		}
		//debugText(p, 'Champ: ' + p.getChampion(0));
		//debugText(champion[2].firstName + ' hp:' + champion[2].hp + ' rec:' + champion[2].recruited + ' Spells:' + champion[2].spellBook);
		//debugText(hex2bin(hex));
		//debugText(hex2bin(hex).substring(2, 8) + ' ' + hex2bin(hex).substring(0, 2) + ' ' + hex2bin(hex).substring(8, 16) + ' : ' + bin2hex(hex2bin(hex).substring(2, 8) + hex2bin(hex).substring(0, 2) + hex2bin(hex).substring(8, 16)));
		//debugText(hex2bin(setHexToBinaryPosition(bin2hex('0000'), 1, 2, '1')));
		//debugText(p.View[15]);
		//debugText(p.View[15].substring(0,2));
		//debugText(parseInt(getHexToBinaryPosition(p.View[15], 0, 5), 16).toString(10));
		//debugText(parseInt(p.View[15].substring(0,2), 16).toString(10));
	}
}

function debugText(p, txt) {
	$('section.debug.player' + p.id + ' p').append('P' + (p.id + 1) + ': ' + txt + '<br/>');
}
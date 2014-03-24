
//Setup some global Varibles for needed

GetDataView("maps/MOD0.MAP",mapdate);

var scale = 3;
var debug = true;
var debugHigh = false;

var COLOUR_NORMAL = 0,
    COLOUR_BRONZE = 1,
    COLOUR_IRON = 2,
    COLOUR_SERPENT = 3,
    COLOUR_CHAOS = 4,
    COLOUR_DRAGON = 5,
    COLOUR_MOON = 6,
    COLOUR_CHROMATIC = 7,
    COLOUR_LOCKED = 8;

var DOOR_SOLID = 0,
    DOOR_GATE = 1,
    DOOR_OPEN = 2;

var WALL_MISC_PILLAR = 0,
    WALL_MISC_BED = 1;

var STAIRS_DOWN = 0,
    STAIRS_UP = 1;

var WOOD_WALL = 0,
    WOOD_DOOR = 1,
    WOOD_DOOR_OPEN = 2;

var FLOOR_PIT_DOWN = 0,
    FLOOR_PIT_UP = 1,
    FLOOR_PAD = 2;

var Maps = ["MOD0","MOON","CHAOS","DRAGON","ZENDIK","SERP","BWEXTTW1","BWEXTTW2","BWEXTTW3","BWEXTTW4","horace_mod0","horace_moon","horace_drag","horace_serp","horace_zendik","horace_chaos"];

var CurrentMap = 0;
var img = document.getElementById("bg");
var background = new Array();
background[0] = new Array(0, 0, 128, 76, 0, 0);
background[1] = new Array(128, 0, 128, 76, 0, 0);

//Declare Arrays for the Graphics
var gfx = {};
gfx["Stone"] = {};
gfx["Wood"] = {};
gfx["Banner"] = {};
gfx["Stairs"] = {};
gfx["Misc"] = {};

/*
gfx["Stairs"][];
gfx["Misc"][];
gfx["Door"] = new Array(3);
gfx["Misc"][];
gfx["Unknown"][];
gfx["Floor"][];*/

//var gfxStone;
//var gfxWooden = [];
//var gfxStairs = [];
//var gfxMisc = [];
var gfxDoor = new Array(3);
var gfxUnknown = [];
var gfxFloor = [];

//Load images into the Arrays
gfx["Stone"]["Wall"] = document.getElementById("stoneWalls");
gfx["Stone"]["Shelf"] = document.getElementById("Shelf");
gfx["Banner"]["SerpentHead"] = document.getElementById("SerpBanner");
gfx["Banner"]["DragonHead"] = document.getElementById("DragonBanner");
gfx["Banner"]["MoonHead"] = document.getElementById("MoonBanner");
gfx["Banner"]["ChaosHead"] = document.getElementById("ChaosBanner");
gfx["Banner"]["Script"] = document.getElementById("ScriptBanner");
gfxWallSwitch = document.getElementById("WallSwitch");
gfxGemSlot = document.getElementById("GemSlot");
/*var gfxDragon;
var gfxChaos;
var gfxSerp;
var gfxBrown;*/

gfx["Banner"]["Script"].onload = function () {    
    gfx["Banner"]["Dragon"] = recolorImage(gfx["Banner"]["Script"],COLOUR_DRAGON,"Banner");
    gfx["Banner"]["Chaos"] = recolorImage(gfx["Banner"]["Script"],COLOUR_CHAOS,"Banner");
    gfx["Banner"]["Serpent"] = recolorImage(gfx["Banner"]["Script"],COLOUR_SERPENT,"Banner");
    gfx["Banner"]["Bronze"] = recolorImage(gfx["Banner"]["Script"],COLOUR_BRONZE,"Banner");
    gfx["Banner"]["Iron"] = recolorImage(gfx["Banner"]["Script"],COLOUR_IRON,"Banner");
};

gfx["Wood"]["Wall"] = document.getElementById("WoodenWalls1");
gfx["Wood"]["Door"] = document.getElementById("WoodenWalls2");
gfx["Wood"]["DoorOpen"] = document.getElementById("WoodenWalls3");

gfx["Misc"]["Pillar"] = document.getElementById("Pillar");
gfx["Misc"]["Bed"] = document.getElementById("Bed");

//Solid doors
gfxDoor[DOOR_SOLID] = new Array(8);
gfxDoor[DOOR_GATE] = new Array(8);
gfxDoor[DOOR_OPEN] = new Array(8);
gfxDoor[DOOR_SOLID][COLOUR_NORMAL] = document.getElementById("ChromaticDoor");
gfxDoor[DOOR_GATE][COLOUR_NORMAL] = document.getElementById("GateDoor");
gfxDoor[DOOR_OPEN][COLOUR_NORMAL] = document.getElementById("OpenDoor");
gfxDoor[DOOR_SOLID][COLOUR_NORMAL].onload = function () {   
    colourDoors(DOOR_SOLID);
}
gfxDoor[DOOR_GATE][COLOUR_NORMAL].onload = function () {   
    colourDoors(DOOR_GATE);
}
gfxDoor[DOOR_OPEN][COLOUR_NORMAL].onload = function () {   
    colourDoors(DOOR_OPEN);
}

gfx["Stairs"]["Down"] = document.getElementById("StairsDown");
gfx["Stairs"]["Up"] = document.getElementById("StairsUp");

gfxFloor[0] = document.getElementById("PitDown");
gfxFloor[1] = document.getElementById("PitUp");
gfxFloor[2] = document.getElementById("FloorPad");

var gfxPos = SpriteSheetArray();
var b = 0;
var p1;
var p2;
var tw = new Tower();



document.addEventListener('touchstart', doTouchStart, false);

//Touch Screen Stuff
var canvas_x;
var canvas_y;

function updatePlayerViewScreen(){  
    
    if (typeof tw !== "undefined") {
            $('aside.debug p').html('');
            clearCanvas();
            configCanvas();
            p1.pView(tw.Levels[p1.level].Map);
            drawPlayersView(p1);
            ctx.font = "normal 11px verdana, sans-serif";
            ctx.fillStyle = "#FFF";
            ctx.fillText("Player 1",0,250);
            ctx.fillText("X:" + p1.X.toString() + "\n Y:"  + p1.Y.toString(),0,270);
            ctx.fillText("Current Map: " +Maps[CurrentMap],0,290);
            ctx.fillText("Level: " + p1.level.toString(),0,310);
            //ctx.fillText(canvas_x + " - " + canvas_y,0,330);
            ctx.fillText("FPS: " + fps.getFPS(),0,350);
            //if (debug){PrintLog("Screen Updated");}
            p2.pView(tw.Levels[p2.level].Map);
            drawPlayersView(p2);
            ctx.fillText("Player 2",410,250);
            ctx.fillText("X:" + p2.X.toString() + "\n Y:"  + p2.Y.toString(),410,270);
            ctx.fillText("Current Map: " +Maps[CurrentMap],410,290);
            ctx.fillText("Level: " + p2.level.toString(),410,310);
    }
}

function myDIx(canvas, img, PosAry, P, scale) {
    
    if (img === null) {}
    else {
        canvas.drawImage(img, PosAry[0], PosAry[1], PosAry[2], PosAry[3], (PosAry[4] *scale)+ P.PortalX, (PosAry[5] * scale) + P.PortalY, PosAry[2] * scale, PosAry[3] * scale);
    }    
}

function configCanvas() {
	ctx.imageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
        ctx.font = "bold 20px Calibri";
}



function clearCanvas() {
    canvas.width = canvas.width;
}

function colourDoors(i) {
    for (j = 1; j < 9; j++) {
        gfxDoor[i][j] = recolorImage(gfxDoor[i][COLOUR_NORMAL],j,"Door");
    }
    gfxDoor[i][COLOUR_NORMAL] = recolorImage(gfxDoor[i][COLOUR_NORMAL],COLOUR_NORMAL,"Door");
}

function debugText(txt) {
    $(function() {
        $('aside.debug p').append(txt + '<br/>');
    });
}
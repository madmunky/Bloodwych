//Setup some global Varibles for needed
var scale = 3;
var debug = true;
var debugHigh = false;

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

var DIRECTION_NORTH = 0,
    DIRECTION_EAST = 1,
    DIRECTION_SOUTH = 2,
    DIRECTION_WEST = 3;
    
var CHAR_CLOSE = 0,
        CHAR_MID = 1,
        CHAR_FAR = 2,
        CHAR_DISTANT = 3;

var Maps = ["MOD0","MOON","CHAOS","DRAGON","ZENDIK","SERP","BWEXTTW1","BWEXTTW2","BWEXTTW3","BWEXTTW4","horace_mod0","horace_moon","horace_drag","horace_serp","horace_zendik","horace_chaos"];

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
var test = 0;


//Load images into the Arrays
$(function() {
    //Background
    gfxLoadImage("images", "background");

    //Stone wall and shelf
    gfxLoadImage("images", "stone", "wall");
    gfxLoadImage("images", "stone", "shelf");

    //Wall decorations, banners, wall buttons and gem slots
    gfxLoadImage("images", "deco", "serpent-head");
    gfxLoadImage("images", "deco", "moon-head");
    gfxLoadImage("images", "deco", "dragon-head");
    gfxLoadImage("images", "deco", "chaos-head");
    gfxLoadImage("images", "deco", "switch", 8);
    gfxLoadImage("images", "deco", "switch-off", 8);
    gfxLoadImage("images", "deco", "gem", 8);
    gfxLoadImage("images", "deco", "script", 7);
    gfxLoadImage("images", "deco", "banner", 7);

    //Wooden walls and doors
    gfxLoadImage("images", "wood", "wall");
    gfxLoadImage("images", "wood", "door");
    gfxLoadImage("images", "wood", "door-open");

    //Miscellaneous
    gfxLoadImage("images", "misc", "pillar");
    gfxLoadImage("images", "misc", "bed");

    //Solid doors
    gfxLoadImage("images", "door", "solid", 8);
    gfxLoadImage("images", "door", "gate", 8);
    gfxLoadImage("images", "door", "open", 8);

    //Stairs
    gfxLoadImage("images", "stairs", "down");
    gfxLoadImage("images", "stairs", "up");

    //Floors
    gfxLoadImage("images", "floor", "pit-down");
    gfxLoadImage("images", "floor", "pit-up");
    gfxLoadImage("images", "floor", "switch");
    
    //Characters
    gfxLoadImage("images/characters", "heads");
    gfxLoadImage("images/characters", "maleArms");
    gfxLoadImage("images/characters", "maleBodies");
    gfxLoadImage("images/characters", "maleLegs");
});

//tw = loadTower("MOD0");

document.addEventListener('touchstart', doTouchStart, false);

getHeadArray();

function updatePlayerViewScreen(){  
    try{                  
            $('section.debug p').html('');
            clearCanvas();
            configCanvas();
            player[0].updateView(tw.Level[player[0].level].Map);
            drawPlayersView(player[0]);
            ctx.font = "normal 11px verdana, sans-serif";
            ctx.fillStyle = "#FFF";
            ctx.fillText("Player 1",0,250);
            ctx.fillText("X:" + player[0].X.toString() + "\n Y:"  + player[0].Y.toString(),0,270);
            ctx.fillText("Current Map: " +Maps[CurrentMap],0,290);
            ctx.fillText("Level: " + player[0].level.toString(),0,310);
            ctx.fillText("FPS: " + fps.getFPS(),0,350);            
            player[1].updateView(tw.Level[player[1].level].Map);
            drawPlayersView(player[1]);
            ctx.fillText("Player 2",410,250);
            ctx.fillText("X:" + player[1].X.toString() + "\n Y:"  + player[1].Y.toString(),410,270);
            ctx.fillText("Current Map: " +Maps[CurrentMap],410,290);
            ctx.fillText("Level: " + player[1].level.toString(),410,310);
            myDIx(ctx,gfx["heads"],imageCharacterArray[0][0][test][0],player[0],scale);
        }catch(e){PrintLog("Error: " + e.toString());}
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
        ctx.font = "bold 20px Calibri";
}

function clearCanvas() {
    canvas.width = canvas.width;
}

//Renders the sub-coloured objects. E.g. for locked doors and banners
function gfxColourSubs(type, item, sub) {
    for (i = 1; i <= sub; i++) {
        gfx[type][item][i] = recolorImage(gfx[type][item][0], i, type);
    }
    gfx[type][item][0] = recolorImage(gfx[type][item][0], 0, type);
}

//Loads image into the gfx array
//type: type of object, e.g. wall, door, wood
//item: the object itself, e.g. bed, switch, shelf
//sub: define this to the number of color variations you wish to add for this type of object. Currently maximum of 8
function gfxLoadImage(folder, type, item, sub) {
    if(typeof type === 'string') {
        var id = '';
        if(typeof gfx[type] === 'undefined') {
            gfx[type] = {};
        }
        if(typeof sub === 'number' && sub != null && (typeof gfx[type][item] === 'undefined')) {
            gfx[type][item] = {};
        }
        if(typeof item !== 'undefined' && item != '') {
            id = type + '-' + item;
        } else {
            id = type;
        }

        $('body').append('<img id="' + id + '" src="'+folder+'/' + id + '.png" class="gfx" />');
        if(typeof sub === 'number' && sub != null) {
            gfx[type][item][0] = document.getElementById(id);
            $(gfx[type][item][0]).load(function() {
                gfxColourSubs(type, item, sub);
            });
        } else if(typeof item === 'string' && item != '') {
            gfx[type][item] = document.getElementById(id);
        } else {
            gfx[type] = document.getElementById(id);
        }
    }
}

function debugText(txt) {
    if(debug) {
        $('section.debug p').append(txt + '<br/>');
    }
}
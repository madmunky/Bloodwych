//Setup some global Varibles for needed
var scale = 3;
var debug = true;
var debugHigh = false;

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
    COLOUR_DOOR_LOCKED = 8;

var COLOUR_DECO_SERPENT = 0,
    COLOUR_DECO_CHAOS = 1,
    COLOUR_DECO_DRAGON = 2,
    COLOUR_DECO_MOON = 3,
    COLOUR_DECO_BRONZE = 4,
    COLOUR_DECO_IRON = 5,
    COLOUR_DECO_BLACK = 6,
    COLOUR_DECO_SERPENT_OFF = 7,
    COLOUR_DECO_CHAOS_OFF = 8,
    COLOUR_DECO_DRAGON_OFF = 9,
    COLOUR_DECO_MOON_OFF = 10,
    COLOUR_DECO_BRONZE_OFF = 11,
    COLOUR_DECO_IRON_OFF = 12,
    COLOUR_DECO_BLACK_OFF = 13;

var Maps = ["MOD0","MOON","CHAOS","DRAGON","ZENDIK","SERP","BWEXTTW1","BWEXTTW2","BWEXTTW3","BWEXTTW4","horace_mod0","horace_moon","horace_drag","horace_serp","horace_zendik","horace_chaos"];

var CurrentMap = 0;
var background = new Array();
background[0] = new Array(0, 0, 128, 76, 0, 0);
background[1] = new Array(128, 0, 128, 76, 0, 0);

//Declare Arrays for the Graphics
var gfx = {};
var gfxPos = SpriteSheetArray();
var b = 0;
var p1;
var p2;
var tw = new Tower();

//Touch Screen Stuff
var canvas_x;
var canvas_y;

GetDataView("maps/MOD0.MAP",mapdate);

//Load images into the Arrays
$(function() {
    //Background
    gfxLoadImage("background");

    //Stone wall and shelf
    gfxLoadImage("stone", "wall");
    gfxLoadImage("stone", "shelf");

    //Wall decorations, banners, wall buttons and gem slots
    gfxLoadImage("deco", "serpent-head");
    gfxLoadImage("deco", "moon-head");
    gfxLoadImage("deco", "dragon-head");
    gfxLoadImage("deco", "chaos-head");
    gfxLoadImage("deco", "switch", 13);
    gfxLoadImage("deco", "gem", 13);
    gfxLoadImage("deco", "script", 5);
    gfxLoadImage("deco", "banner", 5);

    //Wooden walls and doors
    gfxLoadImage("wood", "wall");
    gfxLoadImage("wood", "door");
    gfxLoadImage("wood", "door-open");

    //Miscellaneous
    gfxLoadImage("misc", "pillar");
    gfxLoadImage("misc", "bed");

    //Solid doors
    gfxLoadImage("door", "solid", 8);
    gfxLoadImage("door", "gate", 8);
    gfxLoadImage("door", "open", 8);

    //Stairs
    gfxLoadImage("stairs", "down");
    gfxLoadImage("stairs", "up");

    //Floors
    gfxLoadImage("floor", "pit-down");
    gfxLoadImage("floor", "pit-up");
    gfxLoadImage("floor", "switch");
});

document.addEventListener('touchstart', doTouchStart, false);

function updatePlayerViewScreen(){  
    
    if (typeof tw !== "undefined") {
            $('section.debug p').html('');
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
function gfxLoadImage(type, item, sub) {
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

        $('body').append('<img id="' + id + '" src="images/' + id + '.png" class="gfx" />');
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
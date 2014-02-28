
//Setup some global Varibles for needed
var canvas = document.getElementById("gamePort");

var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;

var scale = 5;

var img = document.getElementById("bg");
var background = new Array();
background[0] = new Array(0, 0, 128, 76, 0, 0);
background[1] = new Array(128, 0, 128, 76, 0, 0);

//Declare Arrays for the Graphics
var gfxStone;
var gfxWooden = [];
var gfxStairs = [];
var gfxMisc = [];
var gfxDoor = [];
var gfxUnknown = [];
var gfxFloor = [];

//Load images into the Arrays
gfxStone = document.getElementById("stoneWalls");

gfxWooden[0] = document.getElementById("WoodenWalls1");
gfxWooden[1] = document.getElementById("WoodenWalls2");
gfxWooden[2] = document.getElementById("WoodenWalls3");

gfxMisc[0] = document.getElementById("Pillar");
gfxMisc[1] = document.getElementById("Bed");

gfxDoor[0] = document.getElementById("ChromaticDoor");
gfxDoor[1] = document.getElementById("GateDoor");
gfxDoor[2] = document.getElementById("OpenDoor");

gfxStairs[0] = document.getElementById("StairsDown");
gfxStairs[1] = document.getElementById("StairsUp");

gfxFloor[0] = document.getElementById("PitDown");
gfxFloor[1] = document.getElementById("PitUp");
gfxFloor[2] = document.getElementById("FloorPad");

//var x = 100;
//var y = 100;
var gfxPos = SpriteSheetArray();
var b = 0;
var p1 = new player(12, 22, 3,0);
var tw = new Tower();
            
function myDIx(canvas, img, PosAry, P, scale) {
	configCanvas()
    if (img == null) {
        
    }
    else {
        canvas.drawImage(img, PosAry[0], PosAry[1], PosAry[2], PosAry[3], (PosAry[4] * (scale+1))+ P.PortalX, (PosAry[5] * (scale+1)) + P.PortalY, PosAry[2] * scale, PosAry[3] * scale)
    }
    
}

function configCanvas() {	
	ctx.imageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
}


function doKeyDown(e) {


    switch (e.keyCode)
    {
        
            //====================
            //	THE W KEY
            //====================

        case 87:
            clearCanvas();
			
            myDIx(ctx, img, background[b], p1, scale);
            p1.moveForward();
            p1.pView(tw.Levels[p1.level].Map);
            p1.drawView();
            break;

            //====================
            //	THE S KEY
            //====================
            
        case 83:
            clearCanvas();
            myDIx(ctx, img, background[b], p1, scale);
            p1.moveBackwards();
            p1.pView(tw.Levels[p1.level].Map);
            p1.drawView();
            break;

            //====================
            //	THE A KEY
            //====================
        case 65:
            clearCanvas();
            myDIx(ctx, img, background[b], p1, scale);
            p1.moveLeft();
            p1.pView(tw.Levels[p1.level].Map);
            p1.drawView();
            break;

            //====================
            //	THE D KEY
            //====================
        case 68:
            clearCanvas();
            myDIx(ctx, img, background[b], p1, scale);
            p1.moveRight();
            p1.pView(tw.Levels[p1.level].Map);
            p1.drawView();
            break;
        
            //====================
            //	THE Q KEY
            //====================
        case 69:
            clearCanvas();
            //x = x + 1;
            myDIx(ctx, img, background[b], p1, scale);
            p1.RotatePlayer(0);
            p1.pView(tw.Levels[p1.level].Map);
            p1.drawView();
            break;
            
            //====================
            //	THE E KEY
            //====================
        case 81:
            clearCanvas();
            myDIx(ctx, img, background[b], p1, scale);
            p1.RotatePlayer(1);
            p1.pView(tw.Levels[p1.level].Map);
            p1.drawView();
            break;
    }


    if (b == 0) {
        b = 1;
    }
    else {
        b = 0;
    }

    ctx.font = "15px Calibri";
    ctx.fillText("X:" + p1.X.toString() + "\n Y:"  + p1.Y.toString(),10,50);

}

function clearCanvas() {
    canvas.width = canvas.width;
}
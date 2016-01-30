var context;
var intBlockSize = 20;
var x;
var y;
var mapCan=document.createElement('canvas');
var redrawCan=document.createElement('canvas');
var TO_RADIANS = Math.PI/180;

var canvas, stage, container, queue;

var mouseTarget;	// the display object currently under the mouse, or being dragged
var dragStarted;	// indicates whether we are currently in a drag operation
var offset;
var update = true;
var hit;

function init() {
    canvas = document.getElementById("mapCanvas");
    stage = new createjs.Stage(canvas);

    // enable touch interactions if supported on the current device:
    createjs.Touch.enable(stage);

    // enabled mouse over / out events
    stage.enableMouseOver(10);
    stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas

    // create hit area
    hit = new createjs.Shape();
    hit.graphics.beginFill("#000").rect(0, 0, intBlockSize, intBlockSize);


    loadImages();
}

function loadImages(){
    queue = new createjs.LoadQueue();
    queue.on("complete", handleComplete, this);

    queue.loadManifest([
        {id: "Floor", src:"/images/map/Floor.png"},
        {id: "StoneWall", src:"/images/map/StoneWall.png"},
        {id: "Bed", src:"/images/map/Bed.png"},
        {id: "ChromaticDoor", src:"/images/map/ChromaticDoor.png"},
        {id: "FloorPad", src:"/images/map/FloorPad.png"},
        {id: "FloorPit", src:"/images/map/FloorPit.png"},
        {id: "IronDoor", src:"/images/map/IronDoor.png"},
        {id: "IronDoorOpen", src:"/images/map/IronDoorOpen.png"},
        {id: "MagicItem", src:"/images/map/MagicItem.png"},
        {id: "Pillar", src:"/images/map/Pillar.png"},
        {id: "PlayerPosTrans", src:"/images/map/PlayerPosTrans.png"},
        {id: "Shelf", src:"/images/map/Shelf.png"},
        {id: "Stairs", src:"/images/map/Stairs.png"},
        {id: "Monster", src:"/images/map/Monster.png"},
        {id: "Champion", src:"/images/map/Champion.png"},
        {id: "WoodenWall", src:"/images/map/WoodenWall.png"},
        {id: "WoodenDoor", src:"/images/map/WoodenDoor.png"},
        {id: "WoodenDoorOpen", src:"/images/map/WoodenDoorOpen.png"},
        {id: "WoodenDoorLocked", src:"/images/map/WoodenDoorLocked.png"},
        {id: "RandomBanner", src:"/images/map/RandomBanner.png"},
        {id: "ScrollBanner", src:"/images/map/ScrollBanner.png"},
        {id: "SerpentBanner", src:"/images/map/SerpentBanner.png"},
        {id: "ChaosBanner", src:"/images/map/ChaosBanner.png"},
        {id: "MoonBanner", src:"/images/map/MoonBanner.png"},
        {id: "DragonBanner", src:"/images/map/DragonBanner.png"},
    ]);
}

function handleComplete() {
    container = new createjs.Container();
    stage.addChild(container);
    drawMap();
    createjs.Ticker.interval = 1000;
    createjs.Ticker.addEventListener("tick", tick);
}

function stop() {
    createjs.Ticker.removeEventListener("tick", tick);
}

function cleanup(){

    stage.clear();
    container.removeAllChildren();
    drawMap();
}

function tick(event) {
    // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
    if (update) {
        cleanup();
        stage.update(event);
    }
}

function createImageBlock(imgImage,intPosX,intPosY,intRotation){

    bitmap = new createjs.Bitmap(imgImage);
    container.addChild(bitmap);
    bitmap.x = intPosY+intBlockSize/2; //canvas.width * Math.random() | 0;
    bitmap.y = intPosX+intBlockSize/2;//canvas.height * Math.random() | 0;
    bitmap.rotation = intRotation;//360 * Math.random() | 0;
    bitmap.regX = bitmap.image.width / 2 | 0;
    bitmap.regY = bitmap.image.height / 2 | 0;
    bitmap.scaleX = bitmap.scaleY = bitmap.scale = 1;
    bitmap.name =  intPosX + "_" + intPosY;
    bitmap.cursor = "pointer";
    bitmap.hitArea = hit;

    // using "on" binds the listener to the scope of the currentTarget by default
    // in this case that means it executes in the scope of the button.
    bitmap.on("mousedown", function (evt) {
        this.parent.addChild(this);
        this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};

        var loc = evt.target.name.indexOf('_');
        var xx = parseInt(evt.target.name.substr(0,loc))/intBlockSize;
        var yy = parseInt(evt.target.name.substr(loc+1,evt.target.name.length - loc))/intBlockSize;

        var hex = window.opener.tower[window.opener.towerThis].floor[window.opener.player[0].floor].Map[xx][yy];
        $('#BlockData').text("X:" + xx + " Y:" + yy + " Block: " + hex +" Binary: " + window.opener.hex2bin(hex));

        getBlockData(hex);

        //document.getElementById('previewCanvas').getContext('2d').clearRect(0, 0, document.getElementById('previewCanvas').width, document.getElementById('previewCanvas').height);
        //document.getElementById('previewCanvas').getContext('2d').drawImage(copyCanvasRegionToBuffer(window.opener.getImage(hex, 2, 6,window.opener.player[0], 12)),0,0)


    });

    // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
    bitmap.on("pressmove", function (evt) {
        this.x = evt.stageX + this.offset.x;
        this.y = evt.stageY + this.offset.y;
        // indicate that the stage should be updated on the next tick:
        update = true;
    });

    bitmap.on("rollover", function (evt) {
        this.scaleX = this.scaleY = this.scale * 1.2;
        update = true;
    });

    bitmap.on("rollout", function (evt) {
        this.scaleX = this.scaleY = this.scale;
        update = true;
    });

}

function drawMap() {

    //Grab the canvas so we can draw to it
    canvas.width = intBlockSize*window.opener.tower[window.opener.towerThis].floor[window.opener.player[0].floor].Height;
    canvas.height = intBlockSize*window.opener.tower[window.opener.towerThis].floor[window.opener.player[0].floor].Width;


    for (y = 0;y < window.opener.tower[window.opener.towerThis].floor[window.opener.player[0].floor].Height;y++){
        for (x = 0;x < window.opener.tower[window.opener.towerThis].floor[window.opener.player[0].floor].Width;x++){
            mapGetTileImage(window.opener.tower[window.opener.towerThis].floor[window.opener.player[0].floor].Map[x][y]);
            //drawTileBoarder(x,y);
        }
    }

    drawMonsterPositions();
    //drawPlayersPosition(context,intBlockSize);


};

function drawLine(intStartX,intStartY,intEndX,intEndY,strColour,intLineWidth){

    context.beginPath();
    context.strokeStyle=strColour;
    context.lineWidth=intLineWidth;
    context.moveTo(intStartX,intStartY);
    context.lineTo(intStartX+intEndX,intStartY+intEndY);
    context.stroke();

}

function drawMonsterPositions(){

    var mlist = parent.opener.getMonstersInTower(parent.opener.towerThis, true);
    for (m in mlist){
        if (mlist[m].floor == parent.opener.player[0].floor){// && ((mlist[m].x != player[0].x && mlist[m].y != player[0].y))){
            if (mlist[m].champId > -1){
                createImageBlock(queue.getResult("Champion"),mlist[m].y*intBlockSize,mlist[m].x*intBlockSize,0);
            }else{
                createImageBlock(queue.getResult("Monster"),mlist[m].y*intBlockSize,mlist[m].x*intBlockSize,0);
            }
        }
    }

}

function drawTileBoarder(intX,intY){

    context.beginPath();
    context.lineWidth="1";
    context.strokeStyle="black";
    context.rect(intX*intBlockSize,intY*intBlockSize,intBlockSize,intBlockSize);
    context.stroke();

}

function mapGetTileImage(strBWMapHexValue){

    switch (strBWMapHexValue.substr(3,1)){

        case "0":return getFloorTile(strBWMapHexValue);break; //Floor Tile
        case "1":return getWallTile(strBWMapHexValue);break; //Wall Tile
        case "2":return getWoodenTile(strBWMapHexValue);break; //Wooden Tile
        case "3":return getMiscTile(strBWMapHexValue);break; //Pillar or Bed Tile
        case "4":return getStairsTile(strBWMapHexValue);break; //Stairs Tile
        case "5":return getDoorTile(strBWMapHexValue);break; //Door Tile
        case "6":return getPressurePadTile(strBWMapHexValue);break; //Switch or Pad Tile
        case "7":return getMagicTile(strBWMapHexValue);break; //Magic Tile

    }

}

function getFloorTile(strHexCode){
    //createImageBlock(queue.getResult("Floor"),x*intBlockSize,y*intBlockSize,0);
}

function getWallTile(strHexCode){

    //Get the bit to check if the wall has something on it like a scroll or banner
    var tmp = parseInt(window.opener.hex2bin(strHexCode.substr(2,2)).substr(0,1));
    createImageBlock(queue.getResult("StoneWall"),x*intBlockSize,y*intBlockSize,0);

    if (tmp === 0){
        //If the wall has nothing on it draw the plain wall and return
        return;
    }

    var WallType = "StoneWall";

    if (window.opener.getHexToBinaryPosition(strHexCode, 6, 2) === '0' && (window.opener.getHexToBinaryPosition(strHexCode, 12) === '0')) { //Shelf

        WallType = "Shelf";

    }else if (window.opener.getHexToBinaryPosition(strHexCode, 6, 2) === '1') { //Sign
        WallType = "ScrollBanner";
        var col = parseInt(window.opener.getHexToBinaryPosition(strHexCode, 0, 6)); //Sign colour

        switch (col){

            case 0:{WallType = "RandomBanner";};break; //Random Color
            case 1:{WallType = "SerpentBanner";};break; //Serpent Flag
            case 2:{WallType = "DragonBanner";};break; //Dragon Flag
            case 3:{WallType = "MoonBanner";};break; //Moon Flag
            case 4:{WallType = "ChaosBanner";};break; //Chaos Flag

        }

    } else if (window.opener.getHexToBinaryPosition(strHexCode, 6, 2) === '2') { //Switch

        if (window.opener.getHexToBinaryPosition(strHexCode, 0, 5) === '0') { // Black switch
        } else if (window.opener.getHexToBinaryPosition(strHexCode, 5) === '1') { // Off switch
        } else { // On switch
        }

    } else if (window.opener.getHexToBinaryPosition(strHexCode, 6, 2) === '3') { //Crystal Gem
        var col = parseInt(window.opener.getHexToBinaryPosition(strHexCode, 2, 3)); //Gem colour
        if (window.opener.getHexToBinaryPosition(strHexCode, 5) === '1') {
        } else {//Gem Slot
        }
    }

    if (WallType !== "StoneWall"){

        switch (parseInt(window.opener.hex2bin(strHexCode.substr(2,1)).substr(1,3),2)){

            case 0:{createImageBlock(queue.getResult(WallType),x*intBlockSize,y*intBlockSize,0);};break;
            case 1:{createImageBlock(queue.getResult(WallType),x*intBlockSize,y*intBlockSize,90);};break;
            case 2:{createImageBlock(queue.getResult(WallType),x*intBlockSize,y*intBlockSize,180);};break;
            case 3:{createImageBlock(queue.getResult(WallType),x*intBlockSize,y*intBlockSize,270);};break;

        }

    }

}

function getWoodenTile(strHexCode){

    var bin = window.opener.hex2bin(strHexCode.substr(0,2));

    switch (bin.substr(6,2)){

        case "01":drawWoodenWall(0);break;
        case "10":drawOpenWoodenDoor(0);break;
        case "11":drawClosedWoodenDoor(0);break;

    }

    switch (bin.substr(4,2)){

        case "01":drawWoodenWall(1);break;
        case "10":drawOpenWoodenDoor(1);break;
        case "11":drawClosedWoodenDoor(1);break;

    }

    switch (bin.substr(2,2)){

        case "01":drawWoodenWall(2);break;
        case "10":drawOpenWoodenDoor(2);break;
        case "11":drawClosedWoodenDoor(2);break;

    }

    switch (bin.substr(0,2)){

        case "01":drawWoodenWall(3);break;
        case "10":drawOpenWoodenDoor(3);break;
        case "11":drawClosedWoodenDoor(3);break;

    }


}

function getMiscTile(strHexCode){

    if (strHexCode.substr(1,1) == "1"){
        createImageBlock(queue.getResult("Pillar"),x*intBlockSize,y*intBlockSize,0);
    }else{
        createImageBlock(queue.getResult("Bed"),x*intBlockSize,y*intBlockSize,0);
    }

}

function getStairsTile(strHexCode){

    var img = document.getElementById("Stairs");

    switch (strHexCode.substr(1,1)){

        case "0":;
        case "1":createImageBlock(queue.getResult("Stairs"),x*intBlockSize,y*intBlockSize,180);break;  //South
        case "2":;
        case "3":createImageBlock(queue.getResult("Stairs"),x*intBlockSize,y*intBlockSize,270);break;//West
        case "4":;
        case "5":createImageBlock(queue.getResult("Stairs"),x*intBlockSize,y*intBlockSize,0);break;//North
        case "6":;
        case "7":createImageBlock(queue.getResult("Stairs"),x*intBlockSize,y*intBlockSize,90);break; //East

    }


}

function getDoorTile(strHexCode){

    var BB = parseInt(strHexCode.substr(1,1));
    var DoorOpen = window.opener.hex2bin(strHexCode).substr(7,1);
    var img = queue.getResult("IronDoor");

    if (DoorOpen == "1"){
        if (window.opener.hex2bin(strHexCode).substr(6,1) == "1"){
            img = queue.getResult("IronDoor");
        }else{
            img = queue.getResult("ChromaticDoor");
        }

    }else{
        img = queue.getResult("IronDoorOpen");
    }

    if((BB>=0 && BB<=3) || (BB>=8 && BB<=11)){
        createImageBlock(img,x*intBlockSize,y*intBlockSize,0)
    }else if((BB>=4 && BB<=7) || (BB>=12 && BB<=15)){
        createImageBlock(img,x*intBlockSize,y*intBlockSize,90)
    }

}

function getPressurePadTile(strHexCode){
    createImageBlock(queue.getResult("FloorPad"),x*intBlockSize,y*intBlockSize,0)
}

function drawPlayersPosition(ctx,intBlockSize){
    createImageBlock(queue.getResult("PlayerPosTrans"),x*intBlockSize,y*intBlockSize,0)
}

function getMagicTile(ctx,intBlockSize){
    createImageBlock(queue.getResult("MagicItem"),x*intBlockSize,y*intBlockSize,0)
}

function drawOpenWoodenDoor(intDir){

    switch (intDir){
        case 0:{createImageBlock(queue.getResult("WoodenDoorOpen"),x*intBlockSize,y*intBlockSize,0);};break;
        case 1:{createImageBlock(queue.getResult("WoodenDoorOpen"),x*intBlockSize,y*intBlockSize,90);};break;
        case 2:{createImageBlock(queue.getResult("WoodenDoorOpen"),x*intBlockSize,y*intBlockSize,180);};break;
        case 3:{createImageBlock(queue.getResult("WoodenDoorOpen"),x*intBlockSize,y*intBlockSize,270);};break;
    }
}

function drawClosedWoodenDoor(intDir){

    var hex = window.opener.tower[window.opener.towerThis].floor[window.opener.player[0].floor].Map[x][y];
    var locked = parseInt(window.opener.hex2bin(hex.substr(2,1)).substr(3,1));
    var strDoorType = "WoodenDoor";

    if (locked === 1){
        strDoorType = "WoodenDoorLocked";
    }


    switch (intDir){
        case 0:{createImageBlock(queue.getResult(strDoorType),x*intBlockSize,y*intBlockSize,0);};break;
        case 1:{createImageBlock(queue.getResult(strDoorType),x*intBlockSize,y*intBlockSize,90);};break;
        case 2:{createImageBlock(queue.getResult(strDoorType),x*intBlockSize,y*intBlockSize,180);};break;
        case 3:{createImageBlock(queue.getResult(strDoorType),x*intBlockSize,y*intBlockSize,270);};break;
    }
}

function drawWoodenWall(intDir){

    switch (intDir){
        case 0:{createImageBlock(queue.getResult("WoodenWall"),x*intBlockSize,y*intBlockSize,0);};break;
        case 1:{createImageBlock(queue.getResult("WoodenWall"),x*intBlockSize,y*intBlockSize,90);};break;
        case 2:{createImageBlock(queue.getResult("WoodenWall"),x*intBlockSize,y*intBlockSize,180);};break;
        case 3:{createImageBlock(queue.getResult("WoodenWall"),x*intBlockSize,y*intBlockSize,270);};break;
    }
}

function drawRotatedImage(image, angle) {

    var can=redrawCan;
    can.width = image.width;
    can.height = image.height;
    var cancontext=can.getContext("2d");
    cancontext.clearRect(0, 0, canvas.width, canvas.height);

    // save the current co-ordinate system
    // before we screw with it
    cancontext.save();

    // move to the middle of where we want to draw our image
    cancontext.translate(0+(image.width/2), 0+(image.height/2));

    // rotate around that point, converting our
    // angle from degrees to radians
    cancontext.rotate(angle * TO_RADIANS);

    // draw it up and to the left by half the width
    // and height of the image
    cancontext.drawImage(image, -(image.width/2), -(image.height/2));

    // and restore the co-ords to how they were when we began
    cancontext.restore();

    return can;
}

function copyCanvasRegionToBuffer(img, PosAry){
    if (typeof bufferCanvas === "undefined"){
        bufferCanvas = document.createElement('canvas');
    }else{
        bufferCanvas.getContext('2d').clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
    }

    if (typeof PostAry === "undefined" ){
        PosAry = [15, 0, 98, 76, 15, 0];
    }
    var scale = 1;

    bufferCanvas.width  = (PosAry[2] + PosAry[0]) * scale;
    bufferCanvas.height = (PosAry[3] + PosAry[1]) * scale;


    bufferCanvas.getContext('2d').drawImage(img, PosAry[0], PosAry[1], PosAry[2], PosAry[3], (PosAry[4] * scale), (PosAry[5] * scale), PosAry[2] * scale, PosAry[3] * scale);
    return bufferCanvas;
}

function getScrollText(strHex){

        var f = window.opener.player[0].floor,
            off = [0, 21, 33, 41, 49, 59],
            A = parseInt(strHex.substring(0, 1), 16),
            B = parseInt(strHex.substring(1, 2), 16),
            scrollRef = Math.floor((((A * 16) + B) / 4) - 4) - 1 + off[window.opener.towerThis];

    var rtnData = "RefID: " + scrollRef + " - " + window.opener.scrollData[scrollRef];

    if (typeof rtnData === 'undefined'){
        return "";
    }else{
        return rtnData;
    }

}

function getBlockData(strHex){

    try {
            $('#BlockData').append('</br><p>Scroll Data: '+getScrollText(strHex)+'</p>');
        }catch (e){}

        try{
            var triggerActionID = window.opener.tower[window.opener.towerThis].triggers[parseInt(window.opener.getHexToBinaryPosition(strHex, 0, 5),16).toString(10)][0]/2;
            $('#BlockData').append('<p>Switch Event: '+window.opener.switchName[triggerActionID]+'</p>');
        }catch(e){}

}

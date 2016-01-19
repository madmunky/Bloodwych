var context;
var intBlockSize = 20;
var x;
var y;
var mapCan=document.createElement('canvas');
var redrawCan=document.createElement('canvas');
var TO_RADIANS = Math.PI/180;

function drawMap() {

    //Grab the canvas so we can draw to it
    var c=mapCan;

    c.width = intBlockSize*tower[towerThis].floor[player[0].floor].Width;
    c.height = intBlockSize*tower[towerThis].floor[player[0].floor].Height;
    context=c.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (y = 0;y < tower[towerThis].floor[player[0].floor].Height;y++){
        for (x = 0;x < tower[towerThis].floor[player[0].floor].Width;x++){
                //console.log("X: " + x + " Y: " + y);
            mapGetTileImage(tower[towerThis].floor[player[0].floor].Map[x][y]);
            //drawTileBoarder(y,x);
        }
    }

    drawMonsterPositions();
    //drawPlayersPosition(context,intBlockSize);

    debugWindow.updateCanvas(c);

};

function drawLine(intStartX,intStartY,intEndX,intEndY,strColour,intLineWidth){

    context.beginPath();
    context.strokeStyle=strColour;
    context.lineWidth=intLineWidth;
    context.moveTo(intStartX,intStartY);
    context.lineTo(intStartX+intEndX,intStartY+intEndY);
    context.stroke();

}

function drawMonsterPositions(img){

    var mlist = getMonstersInTower(towerThis, true);
    for (m in mlist){
        //console.log(m);
        if (mlist[m].floor == player[0].floor){// && ((mlist[m].x != player[0].x && mlist[m].y != player[0].y))){
            if (mlist[m].champId > -1){
                context.drawImage(document.getElementById("Champion"),mlist[m].x*intBlockSize,mlist[m].y*intBlockSize);
            }else{
                context.drawImage(document.getElementById("Monster"),mlist[m].x*intBlockSize,mlist[m].y*intBlockSize);
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
    //context.drawImage(document.getElementById("Floor"),y*intBlockSize,x*intBlockSize);
}

function getWallTile(strHexCode){
    context.drawImage(document.getElementById("StoneWall"),y*intBlockSize,x*intBlockSize);
}

function getWoodenTile(strHexCode){

    //context.drawImage(document.getElementById("Floor"),y*intBlockSize,x*intBlockSize);
    var bin = hex2bin(strHexCode.substr(0,2));

    switch (bin.substr(6,2)){

        case "01":drawNorthWoodenWall();break;
        case "11":drawNorthOpenWoodenDoor();break;
        case "10":drawNorthClosedWoodenDoor();break;

    }

    switch (bin.substr(4,2)){

        case "01":drawEastWoodenWall();break;

    }

    switch (bin.substr(2,2)){

        case "01":drawSouthWoodenWall();break;

    }

    switch (bin.substr(0,2)){

        case "01":drawWestWoodenWall();break;
        case "10":drawWestOpenWoodenWall();break;

    }


}

function getMiscTile(strHexCode){

    if (strHexCode.substr(1,1) == "1"){
        context.drawImage(document.getElementById("Pillar"),y*intBlockSize,x*intBlockSize);
    }else{
        context.drawImage(document.getElementById("Bed"),y*intBlockSize,x*intBlockSize);
    }

}

function getStairsTile(strHexCode){

    var img = document.getElementById("Stairs");

    switch (strHexCode.substr(1,1)){

        case "0":;
        case "1":context.drawImage(drawRotatedImage(img,180),y*intBlockSize,x*intBlockSize);break;  //South
        case "2":;
        case "3":context.drawImage(drawRotatedImage(img,270),y*intBlockSize,x*intBlockSize);break;//West
        case "4":;
        case "5":context.drawImage(drawRotatedImage(img,0),y*intBlockSize,x*intBlockSize);break;//North
        case "6":;
        case "7":context.drawImage(drawRotatedImage(img,90),y*intBlockSize,x*intBlockSize);break; //East

    }


}

function getDoorTile(strHexCode){

    var BB = parseInt(strHexCode.substr(1,1));
    var DoorOpen = hex2bin(strHexCode).substr(7,1);
    var img = document.getElementById("IronDoor");

    if (DoorOpen == "1"){
        if (hex2bin(strHexCode).substr(6,1) == "1"){
            img = document.getElementById("IronDoor");
        }else{
            img = document.getElementById("ChromaticDoor");
        }

    }else{
        img = document.getElementById("IronDoorOpen");
    }

    if((BB>=0 && BB<=3) || (BB>=8 && BB<=11)){
        context.drawImage(img,y*intBlockSize,x*intBlockSize);
    }else if((BB>=4 && BB<=7) || (BB>=12 && BB<=15)){
        context.drawImage(drawRotatedImage(img,90),y*intBlockSize,x*intBlockSize);
    }

}

function getPressurePadTile(strHexCode){
    context.drawImage(document.getElementById("FloorPad"),y*intBlockSize,x*intBlockSize);
}

function drawPlayersPosition(ctx,intBlockSize){
    ctx.drawImage(document.getElementById("PlayerPosTrans"),player[0].x*intBlockSize,player[0].y*intBlockSize);
}

function getMagicTile(ctx,intBlockSize){
    context.drawImage(document.getElementById("MagicItem"),y*intBlockSize,x*intBlockSize);
}

function drawNorthOpenWoodenDoor(){
    drawLine(y*intBlockSize,x*intBlockSize,8,0,'#704100',2);
    drawLine(y*intBlockSize+12,x*intBlockSize,8,0,'#704100',2);
    //drawLine(y*intBlockSize+8,x*intBlockSize-2,4,0,'#000000',2);
}

function drawNorthClosedWoodenDoor(){
    drawLine(y*intBlockSize,x*intBlockSize,20,0,'#704100',2);
    drawLine(y*intBlockSize+8,x*intBlockSize,4,0,'#000000',2);
}

function drawNorthWoodenWall(){
    drawLine(y*intBlockSize,x*intBlockSize,20,0,'#704100',2);
}

function drawWestWoodenWall(){
    drawLine(y*intBlockSize+2,x*intBlockSize,0,20,'#704100',2);
}

function drawWestOpenWoodenWall(){
    drawLine(y*intBlockSize+2,x*intBlockSize,0,20,'#704100',2);
    drawLine(y*intBlockSize+2,x*intBlockSize+8,0,4,'#704100',2);
}

function drawWestClosedWoodenWall(){
    drawLine(y*intBlockSize+2,x*intBlockSize,0,20,'#704100',2);
}

function drawEastWoodenWall(){
    drawLine(y*intBlockSize+19,x*intBlockSize,0,20,'#704100',2);
}



function drawSouthWoodenWall(){
    drawLine(y*intBlockSize,x*intBlockSize+18,20,0,'#704100',2);
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

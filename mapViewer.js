var context;
var intBlockSize = 20;
var x;
var y;

function drawMap() {

	//Grab the canvas so we can draw to it
    var c=document.createElement('canvas');
	
	c.width = intBlockSize*tower[towerThis].floor[player[0].floor].Width;
    c.height = intBlockSize*tower[towerThis].floor[player[0].floor].Height;
    context=c.getContext("2d");
	
	for (y = 0;y < tower[towerThis].floor[player[0].floor].Height;y++){
		for (x = 0;x < tower[towerThis].floor[player[0].floor].Width;x++){
				//console.log("X: " + x + " Y: " + y);
				mapGetTileImage(tower[towerThis].floor[player[0].floor].Map[x][y]);
		}
	}
	
	drawPlayersPosition(context,intBlockSize);	
	debugWindow.updateCanvas(c);
	
};

function mapGetTileImage(strBWMapHexValue){

	switch (strBWMapHexValue.substr(3,1)){
	
		case "0":return getFloorTile(strBWMapHexValue);break; //Floor Tile
		case "1":return getWallTile(strBWMapHexValue);break; //Wall Tile
		case "2":return getWoodenTile(strBWMapHexValue);break; //Wooden Tile
		case "3":return getMiscTile(strBWMapHexValue);break; //Pillar or Bed Tile
		case "4":return getStairsTile(strBWMapHexValue);break; //Stairs Tile
		case "5":return getDoorTile(strBWMapHexValue);break; //Door Tile
		case "6":return getPressurePadTile(strBWMapHexValue);break; //Switch or Pad Tile
		
	}

}

function getFloorTile(strHexCode){
	context.drawImage(document.getElementById("Floor"),y*intBlockSize,x*intBlockSize);
}

function getWallTile(strHexCode){
	context.drawImage(document.getElementById("StoneWall"),y*intBlockSize,x*intBlockSize);	
}

function getWoodenTile(strHexCode){
	context.drawImage(document.getElementById("WoodenWall"),y*intBlockSize,x*intBlockSize);
}

function getMiscTile(strHexCode){

	if (strHexCode.substr(1,1) == "1"){
		context.drawImage(document.getElementById("Pillar"),y*intBlockSize,x*intBlockSize);
	}else{
		context.drawImage(document.getElementById("Bed"),y*intBlockSize,x*intBlockSize);
	}
	
}

function getStairsTile(strHexCode){

	switch (strHexCode.substr(1,1)){
	
		case "0":context.drawImage(document.getElementById("Stairs"),y*intBlockSize,x*intBlockSize);break;
		case "1":context.drawImage(document.getElementById("Stairs"),y*intBlockSize,x*intBlockSize);break;
		case "2":context.drawImage(document.getElementById("Stairs"),y*intBlockSize,x*intBlockSize);break;
		case "3":context.drawImage(document.getElementById("Stairs"),y*intBlockSize,x*intBlockSize);break;
	
	}

	
}

function getDoorTile(strHexCode){
	context.drawImage(document.getElementById("ChromaticDoor"),y*intBlockSize,x*intBlockSize);
}

function getPressurePadTile(strHexCode){
	context.drawImage(document.getElementById("FloorPad"),y*intBlockSize,x*intBlockSize); 
}

function drawPlayersPosition(ctx,intBlockSize){
	
	ctx.drawImage(document.getElementById("PlayerPosTrans"),player[0].x*intBlockSize,player[0].y*intBlockSize);
	
}

var TO_RADIANS = Math.PI/180; 

function drawRotatedImage(image, x, y, angle) { 
 
	// save the current co-ordinate system 
	// before we screw with it
	context.save(); 
 
	// move to the middle of where we want to draw our image
	context.translate(x, y);
 
	// rotate around that point, converting our 
	// angle from degrees to radians 
	context.rotate(angle * TO_RADIANS);
 
	// draw it up and to the left by half the width
	// and height of the image 
	context.drawImage(image, -(image.width/2), -(image.height/2));
 
	// and restore the co-ords to how they were when we began
	context.restore(); 
}
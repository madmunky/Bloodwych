/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var maleCharacterSpriteLocations = characterSpriteLocation();
var testMon1 = CHA_ROSANNE,
        testDistance = 0,
        testDirection = 3;

var font = null;
//var charLoaded = false;


function testing(p) {

//var testImg = IMAGE_CHA_TORSO;

    //ctx.drawImage(characterGfx[testImg][testMon1][testDistance][testDirection],0,0,characterGfx[testImg][testMon1][testDistance][testDirection].width * scale,characterGfx[testImg][testMon1][testDistance][testDirection].height * scale)

}

function grabFont() {
    //Grab the font characters from an image and store it in an array.
    fontImage = gfx['misc']['font'];
    
    var myFont = [];
    
    for (x = 0;x < 26;x++){
     
        myFont.push(grabImageAt(fontImage,x * 16,0,12,12,false,1));
        
    } 
    
    font = myFont;
    
}

function writeFontImage(fontString,locationX,locationY,paletteTo){
    
    var chars = fontString.split('');
    
        var can = document.createElement('canvas');
	can.width = chars.length * 13;
	can.height = 12;
	var fontContent = can.getContext("2d");
        
        for (x = 0; x < chars.length; x++){
            
           if (fontCharacterToIndex(chars[x]) >= 0){
               fontContent.drawImage(font[fontCharacterToIndex(chars[x])], (x*13), 0); 
           }
        }
        
        var paletteFrom = COLOUR[COLOUR_WHITE];	
        fontContent.save();
	// pull the entire image into an array of pixel data
	var imageData = fontContent.getImageData(0, 0, can.width, can.height);

	for (var i = 0; i < imageData.data.length; i += 4) {

		for (j = 0; j < paletteTo.length; j++) {
			if (imageData.data[i] === paletteFrom[j][0] && imageData.data[i + 1] === paletteFrom[j][1] && imageData.data[i + 2] === paletteFrom[j][2] && imageData.data[i + 3] === paletteFrom[j][3]) {
				imageData.data[i] = paletteTo[j][0];
				imageData.data[i + 1] = paletteTo[j][1];
				imageData.data[i + 2] = paletteTo[j][2];
                                imageData.data[i + 3] = paletteTo[j][3];
				j = j + 4;
			}
		}

	}

	// put the altered data back on the canvas  
	fontContent.putImageData(imageData, 0, 0);
	// put the re-colored image back on the image
        
	fontContent.save();
	ctx.drawImage(can,locationX,locationY);
	can = null;   
    
}

function fontCharacterToIndex(c){
    
    var tmp = c.charCodeAt(0) -65;
    return c.charCodeAt(0) - 65;
    
}




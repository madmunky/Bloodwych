/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var maleCharacterSpriteLocations = characterSpriteLocation();
var testMon1 = 5,
        testDistance = 0,
        testDirection = 3;

function grabFont() {
    //Grab the font characters from an image and store it in an array.
    fontImage = gfx['misc']['font'];
    
    var myFont = [];
    
    for (x = 0;x < 95;x++){
     
        myFont.push(grabImageAt(fontImage,x * 8,0,8,8,false,1));
        
    } 
    
    font = myFont;
    
}

function writeFontImage(fontString,locationX,locationY,paletteTo){
    
    fontString = fontString.toUpperCase();
    
    var chars = fontString.split('');
    
        var can = document.createElement('canvas');
	can.width = chars.length * 8;
	can.height = 8;
	var fontContent = can.getContext("2d");
        
        for (x = 0; x < chars.length; x++){
            
           if (fontCharacterToIndex(chars[x]) >= 0){
               fontContent.drawImage(font[fontCharacterToIndex(chars[x])], (x*8), 0); 
           }
        }
        
        fontContent.save();
	// pull the entire image into an array of pixel data
	var imageData = fontContent.getImageData(0, 0, can.width, can.height);

        for (var i=0;i<imageData.data.length;i+=4)
              {
                  // is this pixel the old rgb?
                  if(imageData.data[i]===0 &&
                     imageData.data[i+1]===240 &&
                     imageData.data[i+2]===0
                  ){
                      // change to your new rgb
                      imageData.data[i]=paletteTo[0];
                      imageData.data[i+1]=paletteTo[1];
                      imageData.data[i+2]=paletteTo[2];
                  }
              }

	// put the altered data back on the canvas  
	fontContent.putImageData(imageData, 0, 0);
	// put the re-colored image back on the image
        
	fontContent.save();
	ctx.drawImage(can,locationX,locationY,can.width * scale,can.height * scale);
	can = null;   
    
}

function fontCharacterToIndex(c){
    
    var letterCode = c.charCodeAt(0);
    
    switch (letterCode) {
        
        case 41:return 45; // )
        case 33:return 37; // !
        case 64:return 30; // @
        case 44:return 48; // ,
        case 58:return 36; // :
        
    }
    
    if (letterCode >= 48 && letterCode <= 57){return letterCode -22;}
        
    if (letterCode >= 65 && letterCode <=90){return letterCode - 65;}
        
    else {return -1}
    
    
}


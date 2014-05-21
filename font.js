function grabFont() {
	//Grab the font characters from an image and store it in an array.
        
        if (gfx['misc']['font'].width > 0){
        
	fontImage = gfx['misc']['font'];

	var myFont = [];

	for (x = 0; x < 89; x++) {

		myFont.push(grabImageAt(fontImage, x * 8, 0, 8, 8, false, 1));

	}

	font = myFont;
    }else{
        alert('Font not loaded');
    }

}

function writeFontImage(fontString, locationX, locationY, paletteTo, alignment) {
try{
    if (typeof(font[0]) !== 'undefined'){
    if (typeof alignment === "undefined") {
    	alignment = FONT_ALIGNMENT_LEFT;
    }

	fontString = ("" + fontString).toUpperCase();

	var chars = fontString.split('');

	var can = document.createElement('canvas');
	can.width = chars.length * 8;
	can.height = 8;
	var fontContent = can.getContext("2d");

	for (x = 0; x < chars.length; x++) {
		if (fontCharacterToIndex(chars[x]) >= 0) {
			fontContent.drawImage(font[fontCharacterToIndex(chars[x])], (x * 8), 0);
		}
	}

	fontContent.save();
	// pull the entire image into an array of pixel data
	var imageData = fontContent.getImageData(0, 0, can.width, can.height);

	for (var i = 0; i < imageData.data.length; i += 4) {
		// is this pixel the old rgb?
		if (imageData.data[i] === 0 &&
			imageData.data[i + 1] === 240 &&
			imageData.data[i + 2] === 0
		) {
			// change to your new rgb
			imageData.data[i] = paletteTo[0];
			imageData.data[i + 1] = paletteTo[1];
			imageData.data[i + 2] = paletteTo[2];
		}
	}

	// put the altered data back on the canvas  
	fontContent.putImageData(imageData, 0, 0);
	// put the re-colored image back on the image

	fontContent.save();
	if(alignment === FONT_ALIGNMENT_RIGHT) {
		xo = - can.width;
	} else if(alignment === FONT_ALIGNMENT_CENTER) {
		xo = - Math.floor(can.width / 2);
	} else { //FONT_ALIGNMENT_LEFT
		xo = 0;
	}
	ctx.drawImage(can, (xo + locationX) * scale, locationY * scale, can.width * scale, can.height * scale);
	can = null;
    }
    }catch(e){"Write font error: " +e.toString()};
}

function getFontSymbol(charClass,charColour){
    
        var can = document.createElement('canvas');
	can.width = chars.length * 8;
	can.height = 8;
	var fontContent = can.getContext("2d");
        var fontPos = 90;
        var paletteTo;
        
        switch (charClass){            
        case PROFESSION_WARRIOR:{fontContent.drawImage(font[fontPos],0,0);};
        case PROFESSION_WIZARD:{fontContent.drawImage(font[fontPos+1],0,0);};
        case PROFESSION_ADVENTURER:{fontContent.drawImage(font[fontPos+2],0,0);};
        case PROFESSION_CUTPURSE:{fontContent.drawImage(font[fontPos+3],0,0);};            
        }
        
        switch (charColour){            
        case 0:{paletteTo=getClassColour(CLASS_COLOUR_SERP,true);};
        case 1:{paletteTo=getClassColour(CLASS_COLOUR_DRAG,true);};
        case 2:{paletteTo=getClassColour(CLASS_COLOUR_MOON,true);};
        case 3:{paletteTo=getClassColour(CLASS_COLOUR_CHAOS,true);};            
        }
                
        var imageData = fontContent.getImageData(0, 0, can.width, can.height);

	for (var i = 0; i < imageData.data.length; i += 4) {
		// is this pixel the old rgb?
		if (imageData.data[i] === 0 &&
			imageData.data[i + 1] === 240 &&
			imageData.data[i + 2] === 0
		) {
			// change to your new rgb
			imageData.data[i] = paletteTo[0];
			imageData.data[i + 1] = paletteTo[1];
			imageData.data[i + 2] = paletteTo[2];
		}
	}
    
    	fontContent.putImageData(imageData, 0, 0);
	fontContent.save();
        return can;
}

function writeAttackFont(fontString, champ) {

    if (typeof(font[0]) !== 'undefined'){
    if (typeof alignment === "undefined") {
    	alignment = FONT_ALIGNMENT_LEFT;
    }

	fontString = fontString.toUpperCase();

	var chars = fontString.split('');

	var can = document.createElement('canvas');
	can.width = chars.length * 8;
	can.height = 8;
	var fontContent = can.getContext("2d");
        
        fontContent.drawImage(getFontSymbol(champ.prof,champ.colour),0,0);
        
	for (x = 0; x < chars.length; x++) {
		if (fontCharacterToIndex(chars[x]) >= 0) {
			fontContent.drawImage(font[fontCharacterToIndex(chars[x])],8+ (x * 8), 0);
		}
	}

	fontContent.save();
	// pull the entire image into an array of pixel data
	var imageData = fontContent.getImageData(0, 0, can.width, can.height);

	for (var i = 0; i < imageData.data.length; i += 4) {
		// is this pixel the old rgb?
		if (imageData.data[i] === 0 &&
			imageData.data[i + 1] === 240 &&
			imageData.data[i + 2] === 0
		) {
			// change to your new rgb
			imageData.data[i] = paletteTo[0];
			imageData.data[i + 1] = paletteTo[1];
			imageData.data[i + 2] = paletteTo[2];
		}
	}

	// put the altered data back on the canvas  
	fontContent.putImageData(imageData, 0, 0);
	// put the re-colored image back on the image

	fontContent.save();
	if(alignment === FONT_ALIGNMENT_RIGHT) {
		xo = - can.width;
	} else if(alignment === FONT_ALIGNMENT_CENTER) {
		xo = - Math.floor(can.width / 2);
	} else { //FONT_ALIGNMENT_LEFT
		xo = 0;
	}
	ctx.drawImage(can, (xo + locationX) * scale, locationY * scale, can.width * scale, can.height * scale);
	can = null;
    }

}

function fontCharacterToIndex(c) {

	var letterCode = c.charCodeAt(0);

	switch (letterCode) {

		case 41:
			return 45; // )
		case 33:
			return 37; // !
		case 64:
			return 30; // @
		case 44:
			return 48; // ,
		case 34:
			return 38; // "
		case 58:
			return 36; // :
		case 35:
			return 39; // #
		case 58:
			return 40; // $
		case 37:
			return 41; // %
		case 94:
			return 55; // ^
		case 38:
			return 42; // &
		case 42:
			return 46; // *
		case 40:
			return 44; // (
		case 39:
			return 42; // '
		case 45:
			return 49; // -
		case 46:
			return 50; // .
		case 47:
			return 51; // /
		case 61:
			return 38; // =
		case 91:
			return 52; // [    
		case 92:
			return 53; // \    
		case 93:
			return 54; // ]    
		case 96:
			return 57; // `    
		case 95:
			return 56; // _    
		case 43:
			return 47; // +    
		case 124:
			return 36; // |    
		case 123:
			return 36; // {    
		case 125:
			return 36; // }    
		case 59:
			return 36; // ;    
		case 60:
			return 36; // <    
		case 62:
			return 36; // >    
		case 63:
			return 36; // ?    
		case 126:
			return 87; // ~


	}

	if (letterCode >= 48 && letterCode <= 57) {
		return letterCode - 22;
	}

	if (letterCode >= 65 && letterCode <= 90) {
		return letterCode - 65;
	} else {
		return -1
	}


}

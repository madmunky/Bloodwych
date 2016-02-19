function grabFont() {
	//Grab the font characters from an image and store it in an array.
	var fontImage = gfx['misc']['font'];
	var myFont = [];

	for(var x = 0; x < 95; x++) {
		myFont.push(grabImageAt(fontImage, x * 8, 0, 8, 7, false, 1));
	}
	return myFont;

}

function fadeFont(p, fontString, speed, delay, locationX, locationY, paletteTo, alignment, myContent) {
	if (typeof myContent === 'undefined') {
		myContent = ctx;
	}
	(function(fontString, locationX, locationY, paletteTo, alignment) {
		var alpha = 0.0;
		clearInterval(p.messageTimeout);
		clearTimeout(p.messageTimeout);
		p.messageTimeout = setInterval(function() {
			myContent.clearRect(locationX * scale, (locationY - 9) * scale, 320 * scale, 8 * scale);
			myContent.save();
			myContent.globalAlpha = alpha;
			writeFontImage(fontString, locationX + 1, locationY - 9, paletteTo, alignment);
			myContent.restore();
			alpha = alpha + 0.1;
			if (alpha > 1) {
				(function(fontString, locationX, locationY, paletteTo, alignment) {
					clearInterval(p.messageTimeout);
					p.messageTimeout = 0;
					if (delay > 0) {
						var alpha = 1.0;
						p.messageTimeout = setTimeout(function() {
							(function(fontString, locationX, locationY, paletteTo, alignment, alpha) {
								p.messageTimeout = setInterval(function() {
									myContent.clearRect(locationX * scale, (locationY - 9) * scale, 320 * scale, 8 * scale);
									myContent.save();
									myContent.globalAlpha = alpha;
									writeFontImage(fontString, locationX + 1, locationY - 9, paletteTo, alignment);
									myContent.restore();
									alpha = alpha - 0.1;
									if (alpha < 0) {
										myContent.clearRect(locationX * scale, (locationY - 9) * scale, 320 * scale, 8 * scale);
										clearInterval(p.messageTimeout);
										p.messageTimeout = 0;
									}
								}, speed);
							})(fontString, locationX, locationY, paletteTo, alignment, alpha);
						}, delay);
					}
				})(fontString, locationX, locationY, paletteTo, alignment);
			}
		}, speed);
	})(fontString, locationX, locationY, paletteTo, alignment);
}

function writeFontImage(fontString, locationX, locationY, paletteTo, alignment, myContent) {
	try {
		if (typeof(font[0]) !== 'undefined') {
			if (typeof alignment === "undefined") {
				alignment = FONT_ALIGNMENT_LEFT;
			}
			if (typeof myContent === 'undefined') {
				myContent = ctx;
			}

			fontString = ("" + fontString).toUpperCase();

			var chars = fontString.split('');

			var can = document.createElement('canvas');
			can.width = chars.length * 8;
			can.height = 7;
			var fontContent = can.getContext("2d");

			for (var x = 0; x < chars.length; x++) {
				var chr = fontCharacterToIndex(chars[x]);
				if (chr >= 0) {
					fontContent.drawImage(font[chr], (x * 8), 0);
				}
			}

			fontContent.save();
			// pull the entire image into an array of pixel data
			var imageData = fontContent.getImageData(0, 0, can.width, can.height);

			for (var i = 0; i < imageData.data.length; i += 4) {
				// is this pixel the old rgb?
				if (imageData.data[i] === paletteData['DEFAULT_ITEM'][0][0] &&
					imageData.data[i + 1] === paletteData['DEFAULT_ITEM'][0][1] &&
					imageData.data[i + 2] === paletteData['DEFAULT_ITEM'][0][2]
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
			if (alignment === FONT_ALIGNMENT_RIGHT) {
				xo = -can.width;
			} else if (alignment === FONT_ALIGNMENT_CENTER) {
				xo = -(can.width / 2);
			} else { //FONT_ALIGNMENT_LEFT
				xo = 0;
			}
			myContent.drawImage(can, (xo + locationX) * scale, locationY * scale, can.width * scale, can.height * scale);
			can = null;
		}
	} catch (e) {
		"Write font error: " + e.toString()
	};
}

function writeSpellInfoFont(p, t, c) {
	if (typeof t === "undefined") {
		var t = "";
	}
	if (typeof c === "undefined") {
		var c = colourData['GREEN'];
	}
	var ch = champion[p.champion[p.championLeader]];
	ctx.clearRect((p.ScreenX + 96) * scale, (p.ScreenY + 78) * scale, 128 * scale, 8 * scale);
	writeFontImage(t, p.ScreenX + 96 + 2, (p.ScreenY + 79), c);
	p.showSpellText = true;
}

function fontCharacterToIndex(c) {

	var letterCode = c.charCodeAt(0);

	switch (letterCode) {
		case 3:
			return 89; // (hearts)
		case 4:
			return 90; // (diamonds)
		case 5:
			return 91; // (clubs)
		case 6:
			return 92; // (spades)
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
			return 43; // '
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
			return 93; // ?    
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

function writeSpellFont(fontString, locationX, locationY, paletteTo, alignment, myContent) {
	try {
		if (typeof(font[0]) !== 'undefined') {
			if (typeof alignment === "undefined") {
				alignment = FONT_ALIGNMENT_LEFT;
			}
			if (typeof myContent === 'undefined') {
				myContent = ctx;
			}

			fontString = ("" + fontString).toUpperCase();

			var chars = fontString.split('');

			var can = document.createElement('canvas');
			can.width = chars.length * 8;
			can.height = 8;
			var fontContent = can.getContext("2d");

			for (var x = 0; x < chars.length; x++) {
				var letterCode = chars[x].charCodeAt(0);
				if (letterCode >= 65 && letterCode <= 90) {
					letterCode = letterCode - 7;
				}

				if (letterCode >= 0) {
					fontContent.drawImage(font[letterCode], (x * 8), 0);
				}
			}

			fontContent.save();
			// pull the entire image into an array of pixel data
			var imageData = fontContent.getImageData(0, 0, can.width, can.height);

			for (var i = 0; i < imageData.data.length; i += 4) {
				// is this pixel the old rgb?
				if (imageData.data[i] === paletteData['DEFAULT_ITEM'][0][0] &&
					imageData.data[i + 1] === paletteData['DEFAULT_ITEM'][0][1] &&
					imageData.data[i + 2] === paletteData['DEFAULT_ITEM'][0][2]
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
			if (alignment === FONT_ALIGNMENT_RIGHT) {
				xo = -can.width;
			} else if (alignment === FONT_ALIGNMENT_CENTER) {
				xo = -Math.floor(can.width / 2);
			} else { //FONT_ALIGNMENT_LEFT
				xo = 0;
			}
			myContent.drawImage(can, (xo + locationX) * scale, locationY * scale, can.width * scale, can.height * scale);
			can = null;
		}
	} catch (e) {
		"Write font error: " + e.toString();
	};
}

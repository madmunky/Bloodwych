/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

String.prototype.replaceAt=function(index, character) {
	return this.substr(0, index) + character + this.substr(index+character.length);
};

//Sets a hex value at a certain index
function setHexToBinaryPosition(s, index, length, to) {
	var bin = hex2bin(s);
	if(typeof to === "undefined" || to === '') {
		from = bin.substr(index, 1);
		to = '' + (1 - from);
	}
	to = hex2bin(to, length);
	bin = bin.substr(0, index) + to + bin.substr(index + to.length);
	var ret = bin2hex(bin);
	return ret;
}

//Gets a hex value at a certain index, and a certain length
function getHexToBinaryPosition(s, index, length) {
	if(typeof length === 'undefined') {
		length = 1;
	}
	var bin = hex2bin(s);
	var bin = bin.substr(index, length);
	var ret = bin2hex(bin);
	return ret;
}

function hex2bin(num, l) {
	if(typeof l === "undefined") l = 4;
	var ret = parseInt(num, 16).toString(2);
	var zeros = Array(Math.floor(num.length * l - ret.length) + 1).join('0');
	return zeros + ret;
}

function bin2hex(num, l) {
	if(typeof l === "undefined") l = 4;
	var ret = parseInt(num, 2).toString(16).toUpperCase();
	var zeros = Array(Math.floor(num.length / l - ret.length) + 1).join('0');
	return zeros + ret;
}

function hex2dec(num) {
	var ret = parseInt(num, 16).toString(10).toUpperCase();
	return ret;
}

function convertBase(num) {
	this.from = function (baseFrom) {
		this.to = function (baseTo) {
			return parseInt(num, baseFrom).toString(baseTo);
		};
		return this;
	};
	return this;
}

function seededRandom(seed) {
	max = 1.0;
	min = 0.0;

	seed = (seed * 9301 + 49297) % 233280;
	var rnd = seed / 233280.0;

	return min + rnd * (max - min);
}

/*
1  3  4  2  0

6  8  9  7  5

  11 12 10

  14 15 13

  17>18<16

     19
*/
//Given a specific position (0 - 19) relative to an x, y and d(irection), return the x and y coordinates
function posToCoordinates(pos, x, y, d) {
	newCoord = {};
	switch(d) {
		case 0: xo = 0; yo = -1; break;
		case 1: xo = 1; yo = 0; break;
		case 2: xo = 0; yo = 1; break;
		case 3: xo = -1; yo = 0; break;
	}
	switch(pos) {
		case 0: newCoord["y"] = y + (4 * yo) + (2 * xo); newCoord["x"] = x + (4 * xo) - (2 * yo); break; //-4 +2
		case 1: newCoord["y"] = y + (4 * yo) - (2 * xo); newCoord["x"] = x + (4 * xo) + (2 * yo); break; //-4 -2
		case 2: newCoord["y"] = y + (4 * yo) + (1 * xo); newCoord["x"] = x + (4 * xo) - (1 * yo); break; //-4 +1
		case 3: newCoord["y"] = y + (4 * yo) - (1 * xo); newCoord["x"] = x + (4 * xo) + (1 * yo); break; //-4 -1
		case 4: newCoord["y"] = y + (4 * yo) - (0 * xo); newCoord["x"] = x + (4 * xo) + (0 * yo); break; //-4 0
		case 5: newCoord["y"] = y + (3 * yo) + (2 * xo); newCoord["x"] = x + (3 * xo) - (2 * yo); break; //-3 +2 
		case 6: newCoord["y"] = y + (3 * yo) - (2 * xo); newCoord["x"] = x + (3 * xo) + (2 * yo); break; //-3 -2
		case 7: newCoord["y"] = y + (3 * yo) + (1 * xo); newCoord["x"] = x + (3 * xo) - (1 * yo); break; //-3 +1
		case 8: newCoord["y"] = y + (3 * yo) - (1 * xo); newCoord["x"] = x + (3 * xo) + (1 * yo); break; //-3 -1
		case 9: newCoord["y"] = y + (3 * yo) - (0 * xo); newCoord["x"] = x + (3 * xo) - (0 * yo); break; //-3 0
		case 10: newCoord["y"] = y + (2 * yo) + (1 * xo); newCoord["x"] = x + (2 * xo) - (1 * yo); break; //-2 +1                
		case 11: newCoord["y"] = y + (2 * yo) - (1 * xo); newCoord["x"] = x + (2 * xo) + (1 * yo); break; //-2 -1
		case 12: newCoord["y"] = y + (2 * yo) - (0 * xo); newCoord["x"] = x + (2 * xo) + (0 * yo); break; //-2 0
		case 13: newCoord["y"] = y + (1 * yo) + (1 * xo); newCoord["x"] = x + (1 * xo) - (1 * yo); break; //-1 +1
		case 14: newCoord["y"] = y + (1 * yo) - (1 * xo); newCoord["x"] = x + (1 * xo) + (1 * yo); break; //-1 -1
		case 15: newCoord["y"] = y + (1 * yo) - (0 * xo); newCoord["x"] = x + (1 * xo) + (0 * yo); break; //-1 0
		case 16: newCoord["y"] = y + (0 * yo) + (1 * xo); newCoord["x"] = x + (0 * xo) - (1 * yo); break; //0 +1
		case 17: newCoord["y"] = y + (0 * yo) - (1 * xo); newCoord["x"] = x + (0 * xo) + (1 * yo); break; //0 -1
		case 18: newCoord["y"] = y; newCoord["x"] = x; break; //0 0
		case 19: newCoord["y"] = y - (1 * yo) - (0 * xo); newCoord["x"] = x - (1 * xo) + (0 * yo); break; //-1 0
		default: break;
	}
	return newCoord;
}

//Given a specific x and y, relative to another x, y and d(irection), return the position
//Returns -1 when not in range of 0-19
function coordinatesToPos(xt, yt, x, y, d) {
	var pos = -1;
	switch(d) {
		case 0: xo = 0; yo = -1; break;
		case 1: xo = 1; yo = 0; break;
		case 2: xo = 0; yo = 1; break;
		case 3: xo = -1; yo = 0; break;
	}
	if(yt == y + (4 * yo) + (2 * xo) && xt == x + (4 * xo) - (2 * yo)) return 0; //-4 +2
	if(yt == y + (4 * yo) - (2 * xo) && xt == x + (4 * xo) + (2 * yo)) return 1; //-4 -2
	if(yt == y + (4 * yo) + (1 * xo) && xt == x + (4 * xo) - (1 * yo)) return 2; //-4 +1
	if(yt == y + (4 * yo) - (1 * xo) && xt == x + (4 * xo) + (1 * yo)) return 3; //-4 -1
	if(yt == y + (4 * yo) - (0 * xo) && xt == x + (4 * xo) + (0 * yo)) return 4; //-4 0
	if(yt == y + (3 * yo) + (2 * xo) && xt == x + (3 * xo) - (2 * yo)) return 5; //-3 +2 
	if(yt == y + (3 * yo) - (2 * xo) && xt == x + (3 * xo) + (2 * yo)) return 6; //-3 -2
	if(yt == y + (3 * yo) + (1 * xo) && xt == x + (3 * xo) - (1 * yo)) return 7; //-3 +1
	if(yt == y + (3 * yo) - (1 * xo) && xt == x + (3 * xo) + (1 * yo)) return 8; //-3 -1
	if(yt == y + (3 * yo) - (0 * xo) && xt == x + (3 * xo) - (0 * yo)) return 9; //-3 0
	if(yt == y + (2 * yo) + (1 * xo) && xt == x + (2 * xo) - (1 * yo)) return 10; //-2 +1                
	if(yt == y + (2 * yo) - (1 * xo) && xt == x + (2 * xo) + (1 * yo)) return 11; //-2 -1
	if(yt == y + (2 * yo) - (0 * xo) && xt == x + (2 * xo) + (0 * yo)) return 12; //-2 0
	if(yt == y + (1 * yo) + (1 * xo) && xt == x + (1 * xo) - (1 * yo)) return 13; //-1 +1
	if(yt == y + (1 * yo) - (1 * xo) && xt == x + (1 * xo) + (1 * yo)) return 14; //-1 -1
	if(yt == y + (1 * yo) - (0 * xo) && xt == x + (1 * xo) + (0 * yo)) return 15; //-1 0
	if(yt == y + (0 * yo) + (1 * xo) && xt == x + (0 * xo) - (1 * yo)) return 16; //0 +1
	if(yt == y + (0 * yo) - (1 * xo) && xt == x + (0 * xo) + (1 * yo)) return 17; //0 -1
	if(yt == y && xt == x) return 18; //0 0
	if(yt == y - (1 * yo) - (0 * xo) && xt == x - (1 * xo) + (0 * yo)) return 19; //-1 0
	return -1;
}

function getOffsetByRotation(r) {
	xo = 0, yo = 0;
	switch (r){
	  case 0: xo = 0; yo = -1; break;
	  case 1: xo = 1; yo = 0; break;
	  case 2: xo = 0; yo = 1; break;
	  case 3: xo = -1; yo = 0; break;
	  default: break;
	}
	return {'x': xo, 'y': yo};
}

function decimalToHex(d) {
	var hex = Number(d).toString(16);
	hex = "".substr(0, 2 - hex.length) + hex;
	hex = hex.toUpperCase();
	if (hex.length === 1) {
		hex = "0" + hex;
	}
	return hex;
}

function PrintLog(myString) {
    if (debug) {console.log(getTimeStamp() +" Debug: " +myString);}
}

function grabImageAt(image,startX,startY,width,height,flip,scale) {
    
    if (typeof scale === "undefined"){scale = 1;};
    
try{
          var can = document.createElement('canvas');
          can.width = width;
          can.height = height;
          var flipcontext = can.getContext("2d");
          var flipimageObj = new Image();
          flipimageObj.width = width;
          flipimageObj.height = height;          
          if (flip){
              flipcontext.translate(width, 0);
              flipcontext.scale(-scale, scale);
          }
          else{flipcontext.scale(scale, scale);}
          
          flipcontext.drawImage(image, startX, startY, width, height, 0, 0, width, height);
          flipcontext.save();           
          flipimageObj.src = can.toDataURL();
          can = null;
        return flipimageObj;
        flipimageObj = null;
    }
    catch(e) {PrintLog("grabImageAt Error: " + e.toString());}
};

function flipImage(image) {    

          var can = document.createElement('canvas');
          can.width = image.width;
          can.height = image.height;
          var flipcontext = can.getContext("2d");
          var flipimageObj = new Image();
          flipimageObj.width = image.width;
          flipimageObj.height = image.height;
          
            flipcontext.translate(image.width, 0);   
            flipcontext.scale(-1, 1);
        
          flipcontext.drawImage(image, 0, 0, image.width, image.height);
          flipcontext.save();           
          flipimageObj.src = can.toDataURL();
        
        can = null;
        return flipimageObj;
        
};

String.prototype.contains = function(it) { return this.indexOf(it) !== -1; };

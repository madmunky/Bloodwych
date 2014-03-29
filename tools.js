/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
};

//Sets a hex value at a certain index
function setHexToBinaryPosition(s, index, to) {
    var bin = hex2bin(s);
    if(typeof to === "undefined" || to == "") {
        from = bin.substr(index, 1);
        to = "" + (1 - from);
    }
    bin = bin.substr(0, index) + to + bin.substr(index + to.length);
    var ret = bin2hex(bin);
    return ret;
}

//Gets a hex value at a certain index, and a certain length
function getHexToBinaryPosition(s, index, length) {
    if(typeof length == 'undefined') {
        length = 1;
    }
    var bin = hex2bin(s);
    var bin = bin.substr(index, length);
    var ret = bin2hex(bin);
    return ret;
}

function hex2bin(num) {
    var ret = parseInt(num, 16).toString(2);
    var zeros = Array(Math.floor(num.length * 4 - ret.length) + 1).join('0');
    return zeros + ret;
}

function bin2hex(num) {
    var ret = parseInt(num, 2).toString(16).toUpperCase();
    var zeros = Array(Math.floor(num.length / 4 - ret.length) + 1).join('0');
    return zeros + ret;
}

function convertBase(num) {
    this.from = function (baseFrom) {
        this.to = function (baseTo) {
            return parseInt(num, baseFrom).toString(baseTo);
        }
        return this;
    }
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
    switch (d){
        case 0: xo = 0; yo = -1; break;
        case 1: xo = 1; yo = 0; break;
        case 2: xo = 0; yo = 1; break;
        case 3: xo = -1; yo = 0; break;
    }
    switch (pos) {
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
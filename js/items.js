function Item(id, quantity, location) {
    this.id = parseItem(id);
    this.quantity = quantity;
    this.location = location;
    this.type = getItemType(id);

}

Types.Item = Item;

Item.prototype.toJSON = function() {
    return {
        __type: 'Item',
        id: this.id,
        quantity: this.quantity,
        location: this.location
    }
}

Item.revive = function(data) {
    return new Item(data.id, data.quantity, data.location);
}

Item.prototype.getPower = function(ac) {
    var pw = getObjectByKeys(itemJson[this.id], 'damage');
    if(typeof ac !== "undefined") {
        pw = getObjectByKeys(itemJson[this.id], ac, 'damage');
    }
    if(typeof pw !== "undefined") { //JSON
        return pw;
    }
    return 0;
}

Item.prototype.getPowerFactor = function(ac) {
    var pw = getObjectByKeys(itemJson[this.id], 'damageFactor');
    if(typeof ac !== "undefined") {
        pw = getObjectByKeys(itemJson[this.id], ac, 'damageFactor');
    }
    if(typeof pw !== "undefined") { //JSON
        return pw;
    }
    return 1.0;
}

Item.prototype.getArmourClass = function() {
    var ac = getObjectByKeys(itemJson[this.id], 'onEquip', 'AC');
    if(typeof ac !== "undefined") { //JSON
        return ac;
    }
    return 0;
}

Item.prototype.setPocketItem = function(id, q, pas) {
    id = parseItem(id);
    if (typeof id === "undefined" || id === 0 || (typeof q !== "undefined" && q <= 0)) {
        id = 0;
        q = 0;
    } else if (typeof q === "undefined") {
        q = 1;
    }
    if(id !== null) {
        this.id = id;
    }
    if(typeof pas !== "undefined" && pas) {
        this.quantity = q;
    } else {
        this.setQuantity(q);
    }
    this.location.tower = -1;
    this.location.floor = 0;
    this.location.x = 0;
    this.location.y = 0;
    this.location.square = 0;
    this.type = getItemType(this.id);
}

Item.prototype.setQuantity = function(qty) {
    if(typeof qty === "undefined") {
        qty = 1;
    } else if(qty < 0) {
        qty = 0;
    } else if(qty > 99) {
        qty = 99;
    }
    if(this.quantity !== qty) {
        var qt = getObjectByKeys(itemJson[this.id], 'onQuantity');
        for(var q in qt) {
            var val = getObjectByKeys(qt[q], 'value');
            var id2 = getObjectByKeys(qt[q], 'changeToItem');
            var app = getObjectByKeys(qt[q], 'appearanceOnly');
            if(typeof id2 !== "undefined" && qty === val + 1 && !app) {
                this.setPocketItem(id2.getVar(), qty, true);
                return true;
            }
        }
    }
    if(qty === 0) {
        this.setPocketItem('ITEM_EMPTY', 0, true);
        return false;
    }
    this.quantity = qty;
    return true;
}

Item.prototype.getGfx = function(dun) {
    var it = itemJson[this.id];
    var qt = getObjectByKeys(it, 'onQuantity');
    for(var q in qt) {
        var val = getObjectByKeys(qt[q], 'value');
        var id2 = getObjectByKeys(qt[q], 'changeToItem');
        var app = getObjectByKeys(qt[q], 'appearanceOnly');
        if(typeof id2 !== "undefined" && this.quantity === val + 1 && app) {
            it = getObjectRootByKey(itemJson, 'id', id2);
            if(it.length > 0) {
                it = it[0];
            }
            //it = itemJson[id2.getVar()];
        }
    }
    if(typeof dun !== "undefined" && dun) {
        return it.gfxD;
    }
    return it.gfx;
}

/*Item.prototype.toString = function() {
    var loc = "";
    var ref = "";
    if (typeof this.location.tower !== "undefined" && this.location.tower !== -1) {
        loc = ", location:[";
        loc = loc + "tower:" + this.location.tower;
        loc = loc + ", floor:" + this.location.floor;
        loc = loc + ", x:" + this.location.x;
        loc = loc + ", y:" + this.location.y;
        loc = loc + ", square:" + this.location.square;
        loc = loc + "]";
    }
    if (typeof this.itemRef !== "undefined") {
        ref = ", itemRef:[name:" + this.itemRef.name + "]";
    }
    return '[id:' + this.id + ', quantity:' + this.quantity + loc + ref + ']';
}*/

//Dungeon items
function initItems(t) {
    try {
        item[t.id] = new Array();
        var len = t.itemData[0] * 256 + t.itemData[1];
        var i = 0;
        var is = 2;
        var dr = [0, 1, 3, 2];
        while (is + i < len) {
            var i1 = i + is;
            var dd = t.itemData[i1]; //direction + part index (AB)
            var dx = t.itemData[i1 + 1]; //rest of index (CD)
            var d = Math.floor(dd / 16); //parseInt(hex2dec(getHexToBinaryPosition(dec2hex(dd), 0, 4)));
            var dir = Math.floor(d / 4);
            var x = ((dd % 16) * 256 + dx) / 2;
            var xy = indexToCoordinates(x, t.id);
            var n = t.itemData[i1 + 2] + 1;
            for(var di = 0; di < n; di++) {
                var max = item[t.id].length;
                var id = t.itemData[di * 2 + i1 + 3];
                var qt = t.itemData[di * 2 + i1 + 4];
                item[t.id][max] = new Item(id, qt, {
                    tower: t.id,
                    floor: xy.floor,
                    x: xy.x,
                    y: xy.y,
                    square: dr[dir]
                });
                var ima = getObjectByKeys(itemJson[id], 'quantity');
                if(typeof ima !== "undefined") { //JSON
                    item[t.id][max].quantity = ima + 1;
                }
                //PrintLog(item[t.id][max], false);
                //PrintLog('Loaded item: ' + item[t.id][max]);
            }
            i = i + 3 + n * 2;
        }

        //TESTING
        if(debug) {
            if(t.id === TOWER_MOD0) {
                item[t.id][item[t.id].length] = new Item('ITEM_DEATHBRINGER', 1, {
                    tower: t.id,
                    floor: 3,
                    x: 12,
                    y: 23,
                    square: 0
                });
                item[t.id][item[t.id].length] = new Item('ITEM_CHAOS_RING', 2, {
                    tower: t.id,
                    floor: 3,
                    x: 12,
                    y: 23,
                    square: 1
                });
                item[t.id][item[t.id].length] = new Item('ITEM_LONG_BOW', 1, {
                    tower: t.id,
                    floor: 3,
                    x: 12,
                    y: 23,
                    square: 2
                });
                item[t.id][item[t.id].length] = new Item('ITEM_ELF_ARROWS', 99, {
                    tower: t.id,
                    floor: 3,
                    x: 12,
                    y: 23,
                    square: 3
                });
            }
        }
        //END OF TESTING
    } catch (e) {
        "Item init error: " + e.toString();
    };
}

function getItemType(id) {
    if(typeof itemJson[id] !== "undefined" && typeof itemJson[id].type !== "undefined") {
        return itemJson[id].type;
    }
    if (id === 'ITEM_EMPTY') {
        return 'ITEM_TYPE_EMPTY';
    } else if (id <= 'ITEM_ELF_ARROWS') {
        return 'ITEM_TYPE_STACKABLE';
    } else if (id <= 'ITEM_NEGG_RED') {
        return 'ITEM_TYPE_FOOD';
    } else if (id <= 'ITEM_MOON_ELIXIR') {
        return 'ITEM_TYPE_POTION';
    } else if (id <= 'ITEM_CRYSTAL_PLATE') {
        return 'ITEM_TYPE_ARMOUR';
    } else if (id <= 'ITEM_WAR_SHIELD') {
        return 'ITEM_TYPE_SHIELD';
    } else if (id <= 'ITEM_CRYSTAL_GLOVES') {
        return 'ITEM_TYPE_GLOVES';
    } else if (id <= 'ITEM_POWER_STAFF') {
        return 'ITEM_TYPE_WEAPON';
    } else if (id <= 'ITEM_THAI_CHANG_RIP') {
        return 'ITEM_TYPE_RIP';
    } else if (id <= 'ITEM_CHROMATIC_KEY') {
        return 'ITEM_TYPE_KEY';
    } else if (id <= 'ITEM_HEAL_WAND') {
        return 'ITEM_TYPE_WAND';
    } else if (id <= 'ITEM_CROSS_BOW') {
        return 'ITEM_TYPE_BOW';
    } else if (id <= 'ITEM_PERMIT') {
        return 'ITEM_TYPE_SCROLL';
    } else if (id <= 'ITEM_MOON_CRYSTAL') {
        return 'ITEM_TYPE_CRYSTAL';
    } else if (id <= 'ITEM_TAN_GEM') {
        return 'ITEM_TYPE_GEM';
    } else if (id <= 'ITEM_MOON_RING') {
        return 'ITEM_TYPE_RING';
    } else if (id <= 'ITEM_BOOK_OF_SKULLS') {
        return 'ITEM_TYPE_BOOK';
    }
    return '';
}

function newPocketItem(id, q) {
    if (typeof id === "undefined" || id === 0 || id === '') {
        id = 0;
        q = 0;
    } else if (typeof q === "undefined") {
        q = 1;
    }
    return new Item(id, q, {
        tower: -1,
        floor: 0,
        x: 0,
        y: 0,
        square: 0
    });
}

function createPocketSlots(max) {
    if(typeof max === "undefined") {
        var max = POCKET_MAX;
    }
    var pocket = new Array();
    for(var j = 0; j < max; j++) {
        pocket[j] = newPocketItem();
    }
    return pocket;
}

//new dungeon item

function dropItem(id, q, f, x, y, s) {
    id = parseItem(id);
    if(id > 0) {
        if(getItemType(id) === 'ITEM_TYPE_STACKABLE') {
            for(var i = item[towerThis].length - 1; i >= 0; i--) {
                var it = item[towerThis][i];
                if (it.id === id) {
                    if(it.location.floor === f && it.location.x === x && it.location.y === y && it.location.square === s) {
                        q += it.quantity;
                        item[towerThis].splice(i, 1);
                        break;
                    }
                }
            }
        }
        var it = new Item(id, q, {
            tower: towerThis,
            floor: f,
            x: x,
            y: y,
            square: s
        });
        item[towerThis].push(it);
    }
}

//item references
function initItemRefs() {
    var gfx;
    var gfxD;
    for(var id = 0; id < itemJson.length; id++) {
        var i = getObjectByKeys(itemJson[id], 'icon', 'id');
        if(typeof i !== "undefined") {
            gfx = gfxUI[i];
            var iFrom = getObjectByKeys(itemJson[id], 'icon', 'recolour', 'from');
            var iTo = getObjectByKeys(itemJson[id], 'icon', 'recolour', 'to');
            if(typeof iFrom !== "undefined" && typeof iTo !== "undefined") {
                for(var f in iFrom) {
                    gfx = recolourUiGfx(gfx, iFrom[f], iTo[f]);
                }
            }
        }
        var d = getObjectByKeys(itemJson[id], 'dungeon', 'id');
        if(typeof d !== "undefined") {
            gfxD = itemGfxD[d];
            var dFrom = getObjectByKeys(itemJson[id], 'dungeon', 'recolour', 'from');
            var dTo = getObjectByKeys(itemJson[id], 'dungeon', 'recolour', 'to');
            if(typeof dFrom !== "undefined" && typeof dTo !== "undefined") {
                gfxD = recolourSpriteArray(gfxD, dFrom, dTo);
            }
        }
        itemJson[id].gfx = gfx;
        itemJson[id].gfxD = gfxD;
    }
}

//id starts at 0 (= 'ITEM_LEATHER_ARMOUR')
//returns 0 for leather, 1 for chain and 2 for plate
function getItemArmourType(id) {
    var at = getObjectByKeys(itemJson[this.id], 'onEquip', 'type');
    if(typeof at !== "undefined") { //JSON
        return at;
    }
    var typ = [0, 1, 2, 1, 2, 1, 2, 1, 2];
    return typ[id];
}

function initItemGfxD() {
    var spriteSheetIMG = gfx['dungeon']['items2'];
    var i = [];
    var j = {};
    var k = 0;
    for(var y = 0; y < 3; y++) {
        for(var x = 0; x < 9; x++) {
            i = [];
            var k1 = DUNGEON_GFX_ID[k];
            var b = y * 42;
            i.push(grabImageAt(spriteSheetIMG, x * 33, b + (y + 0), 33, 10, false));
            i.push(grabImageAt(spriteSheetIMG, x * 33, b + (y + 10), 33, 12, false));
            i.push(grabImageAt(spriteSheetIMG, x * 33, b + (y + 22), 33, 8, false));
            i.push(grabImageAt(spriteSheetIMG, x * 33, b + (y + 30), 33, 7, false));
            i.push(grabImageAt(spriteSheetIMG, x * 33, b + (y + 37), 33, 6, false));
            j[k1] = i;
            k++;
        }
    }

    i = [];
    var k1 = DUNGEON_GFX_ID[k];
    i.push(grabImageAt(spriteSheetIMG, 305, 0, 29, 26, false));
    i.push(grabImageAt(spriteSheetIMG, 312, 27, 16, 16, false));
    i.push(grabImageAt(spriteSheetIMG, 315, 43, 12, 11, false));
    i.push(grabImageAt(spriteSheetIMG, 317, 54, 8, 8, false));
    j[k1] = i;
    k++;

    i = [];
    var k1 = DUNGEON_GFX_ID[k];
    i.push(grabImageAt(spriteSheetIMG, 353, 0, 39, 33, false));
    i.push(grabImageAt(spriteSheetIMG, 363, 33, 22, 19, false));
    i.push(grabImageAt(spriteSheetIMG, 366, 52, 16, 12, false));
    i.push(grabImageAt(spriteSheetIMG, 369, 65, 11, 9, false));
    j[k1] = i;
    k++;

    i = [];
    var k1 = DUNGEON_GFX_ID[k];
    i.push(grabImageAt(spriteSheetIMG, 311, 63, 31, 27, false));
    i.push(grabImageAt(spriteSheetIMG, 319, 91, 15, 15, false));
    i.push(grabImageAt(spriteSheetIMG, 321, 107, 11, 11, false));
    i.push(grabImageAt(spriteSheetIMG, 323, 119, 7, 7, false));
    j[k1] = i;
    k++;

    i = [];
    var k1 = DUNGEON_GFX_ID[k];
    i.push(grabImageAt(spriteSheetIMG, 412, 1, 24, 21, false));
    i.push(grabImageAt(spriteSheetIMG, 412, 23, 20, 17, false));
    i.push(grabImageAt(spriteSheetIMG, 412, 42, 15, 13, false));
    i.push(grabImageAt(spriteSheetIMG, 412, 56, 13, 11, false));
    j[k1] = i;

    return j;
}

//used for indexed items

function indexToCoordinates(ix, t) {
    var xy = new Array();
    //tower[towerThis].floor[this.floor].Map[xy.y][xy.x]
    var tw = tower[t];
    var isnext = 0;
    var is = 0;
    for(var fl = 0; fl < tw.floor.length; fl++) {
        isnext = tw.floor[fl].Width * tw.floor[fl].Height;
        if (ix < is + isnext) {
            for(var y = 0; y < tw.floor[fl].Width; y++) {
                isnext = tw.floor[fl].Height;
                if (ix < is + isnext) {
                    return {
                        floor: fl,
                        x: ix - is,
                        y: y
                    };
                }
                is += isnext;
            }
        }
        is += isnext;
    }
}

function getItemDistanceByPos(pos, sq, sh) {
    if (pos <= 4) {
        //return DISTANCE_DISTANT;
    } else if (pos <= 9) {
        return DISTANCE_DISTANT;
    } else if (pos <= 12) {
        if (sq === 1) {
            return DISTANCE_FAR;
        } else {
            return DISTANCE_FAR;
        }
    } else if (pos <= 15) {
        if (sq === 1 && !sh) {
            return DISTANCE_MID;
        } else {
            return DISTANCE_CLOSE;
        }
    } else if (pos === 18) {
        if (sq === 1) {
            return DISTANCE_VERY_CLOSE;
        } else {
            return -1;
        }
    } else {
        return -1;
    }
}

function getItemGfxOffset(pos, sub, sh) {
    var xy = posToCoordinates(pos, 0, 0, 0);
    if (sh) {
        if (sub === CHAR_FRONT_LEFT || sub === CHAR_BACK_RIGHT) {
            suby = 0.05; //bottom shelf
        } else {
            suby = 1; //top shelf
        }
        var offx = xy.x * 4;
        var offy = -xy.y * 4;
        var x = Math.round(offx * (200.0 / (offy + 6)));
        var y = Math.round(33 - 250.0 / (offy + 5 + suby * 10));
    } else {
        if (sub === CHAR_FRONT_LEFT) {
            subx = 1;
            suby = -1;
        } else if (sub === CHAR_FRONT_RIGHT) {
            subx = -1;
            suby = -1;
        } else if (sub === CHAR_BACK_LEFT) {
            subx = 1;
            suby = 1;
        } else {
            subx = -1;
            suby = 1;
        }
        var offx = xy.x * 4 + subx;
        var offy = -xy.y * 4 + suby;
        var x = Math.round(offx * (190.0 / (offy + 6)));
        var y = 0;
        if (pos !== 18) {
            y = Math.round(50 - 390.0 / (offy + 6));
        }
    }

    return {
        x: x,
        y: y
    }
}

function getItemIndexById(it, id) {
    for(var i in it) {
        if(it[i].id === id) {
            return it[i];
        }
    }
    return null;
}

function findItemJsonIndexById(id) {
    for(var i in itemJson) {
        if(itemJson[i].id === id) {
            return { index: parseInt(i), json: itemJson[i] };
        }
    }
    return null;
}

function parseItem(i) {
    id = 0;
    if(typeof i === 'string') {
        var it = findItemJsonIndexById(i);
        if(it !== null) {
            id = it.index;
        }
    } else if(typeof i === 'number') {
        id = i;
    } else if(i === null) {
        id = null;
    }
    return id;
}
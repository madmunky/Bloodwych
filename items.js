function Item(id, quantity, location) {
    this.id = id;
    this.quantity = quantity;
    this.location = location;
    this.type = this.getType();
    this.gfx = [];
    this.gfxD = [];
}

Item.prototype.getType = function() {
    var id = this.id;
    if (id === 0) {
        return ITEM_TYPE_EMPTY;
    } else if (id <= 4) {
        return ITEM_TYPE_STACKABLE;
    } else if (id <= 22) {
        return ITEM_TYPE_FOOD;
    } else if (id <= 26) {
        return ITEM_TYPE_POTION;
    } else if (id <= 35) {
        return ITEM_TYPE_ARMOUR;
    } else if (id <= 42) {
        return ITEM_TYPE_SHIELD;
    } else if (id <= 47) {
        return ITEM_TYPE_GLOVES;
    } else if (id <= 63) {
        return ITEM_TYPE_WEAPON;
    } else if (id <= 79) {
        return ITEM_TYPE_RIP;
    } else if (id <= 86) {
        return ITEM_TYPE_KEY;
    } else if (id <= 91) {
        return ITEM_TYPE_WAND;
    } else if (id <= 94) {
        return ITEM_TYPE_BOW;
    } else if (id <= 95) {
        return ITEM_TYPE_SCROLL;
    } else if (id <= 99) {
        return ITEM_TYPE_CRYSTAL;
    } else if (id <= 103) {
        return ITEM_TYPE_GEM;
    } else if (id <= 108) {
        return ITEM_TYPE_RING;
    } else if (id <= 109) {
        return ITEM_TYPE_BOOK;
    }
    return -1;
}

Item.prototype.getWeaponPower = function() {
    if (this.type === ITEM_TYPE_ARMOUR || this.type === ITEM_TYPE_SHIELD || this.type === ITEM_TYPE_GLOVES) {
        switch (this.id) {
            case 48:
                return 2;
            case 49:
                return 3;
            case 50:
                return 4;
            case 51:
                return 5;
            case 52:
                return 7;
            case 53:
                return 9;
            case 54:
                return 13;
            case 55:
                return 17;

            case 56:
                return 6;
            case 57:
                return 8;
            case 58:
                return 11;
            case 59:
                return 14;
            case 60:
                return 19;

            case 61:
                return 4;
            case 62:
                return 7;
            case 63:
                return 10;
        }
    }
    return 0;
}

Item.prototype.getArmourClass = function() {
	return 0;
}

Item.prototype.toString = function() {
	var loc = "";
    if (typeof this.location.tower !== "undefined" && this.location.tower !== -1) {
        loc = ", location:[";
        loc = loc + "tower:" + this.location.tower;
        loc = loc + ", floor:" + this.location.floor;
        loc = loc + ", x:" + this.location.x;
        loc = loc + ", y:" + this.location.y;
        loc = loc + ", square:" + this.location.square;
        loc = loc + "]";
    }
    return '[id:' + this.id + ', quantity:' + this.quantity + loc + ']';
}

//Dungeon items

function initItems() {
    for (i = 0; i < itemData.length; i++) {
        var id = 0;
        var quantity = 1;
        var location = {
            tower: tower,
            floor: floor,
            x: x,
            y: y,
            square: square
        };
        item[i] = new Item(id, quantity, location);
        PrintLog('Loaded item: ' + item[i]);
    }
}

function initPocketItem(id, q) {
	if(typeof q === "undefined") {
		q = 1;
	} else if(typeof id === "undefined" || id === 0) {
		id = 0;
		q = 0;
	}
    return new Item(id, q, {
        tower: -1,
        floor: 0,
        x: 0,
        y: 0,
        square: 0
    });
}

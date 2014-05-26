function Item(id, quantity, location) {
    this.id = id;
    this.quantity = quantity;
    this.location = location;
    this.type = this.getType();
    this.itemRef = itemRef[id];
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

Item.prototype.getFoodValue = function() {
    if (this.type === ITEM_TYPE_FOOD) {
        if(this.id <= 13) {
            return 16;
        } else if(this.id <= 19) {
            return 10;
        } else if(this.id <= 20) {
            return 33;
        } else if(this.id <= 21) {
            return 66;
        } else if(this.id <= 22) {
            return 66;
        }
    }
    return 0;
}

Item.prototype.getArmourClass = function() {
    return 0;
}


Item.prototype.setPocketItem = function(id, q) {
    if (typeof id === "undefined" || id === 0) {
        id = 0;
        q = 0;
    } else if (typeof q === "undefined") {
        q = 1;
    }
    this.id = id;
    this.quantity = q;
    this.location.tower = -1;
    this.location.floor = 0;
    this.location.x = 0;
    this.location.y = 0;
    this.location.square = 0;
    this.type = this.getType();
    this.itemRef = itemRef[id];
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

function newPocketItem(id, q) {
    if (typeof id === "undefined" || id === 0) {
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

//This is the big item list
//itemGfx was the former gfxUI, but only for pocket items
function initItemRefs() {
	createItemRef(0, "Empty Item", gfxUI[UI_GFX_POCKET_EMPTY], null);
        createItemRef(1, "Coinage", gfxUI[UI_GFX_POCKET_COIN], itemGfxD[x]);
        createItemRef(2, "Common Keys", gfxUI[UI_GFX_POCKET_COMMON_KEY], itemGfxD[x]);
        createItemRef(3, "Arrows", gfxUI[UI_GFX_POCKET_ARROW], itemGfxD[x]);
        createItemRef(4, "Elf Arrows", gfxUI[UI_GFX_POCKET_ELF_ARROW], itemGfxD[x]);
        createItemRef(5, "Apple", gfxUI[UI_GFX_POCKET_APPLE_1], itemGfxD[x]);
        createItemRef(6, "Apple", gfxUI[UI_GFX_POCKET_APPLE_2], itemGfxD[x]);
        createItemRef(7, "Apple", gfxUI[UI_GFX_POCKET_APPLE_3], itemGfxD[x]);
        createItemRef(8, "Biscuit", gfxUI[UI_GFX_POCKET_BISCUIT_1], itemGfxD[x]);
        createItemRef(9, "Biscuit", gfxUI[UI_GFX_POCKET_BISCUIT_2], itemGfxD[x]);
        createItemRef(10, "Biscuit", gfxUI[UI_GFX_POCKET_BISCUIT_3], itemGfxD[x]);
        createItemRef(11, "Chicken", gfxUI[UI_GFX_POCKET_CHICKEN_1], itemGfxD[x]);
        createItemRef(12, "Chicken", gfxUI[UI_GFX_POCKET_CHICKEN_2], itemGfxD[x]);
        createItemRef(13, "Chicken", gfxUI[UI_GFX_POCKET_CHICKEN_3], itemGfxD[x]);
        createItemRef(14, "Mead", recolourUiGfx(gfxUI[UI_GFX_POCKET_WATER_1],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_PINK]), itemGfxD[x]);
        createItemRef(15, "Mead", recolourUiGfx(gfxUI[UI_GFX_POCKET_WATER_2],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_PINK]), itemGfxD[x]);
        createItemRef(16, "Mead", recolourUiGfx(gfxUI[UI_GFX_POCKET_WATER_3],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_PINK]), itemGfxD[x]);
        createItemRef(17, "Water", recolourUiGfx(gfxUI[UI_GFX_POCKET_WATER_1],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE_DARK]), itemGfxD[x]);
        createItemRef(18, "Water", recolourUiGfx(gfxUI[UI_GFX_POCKET_WATER_2],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE_DARK]), itemGfxD[x]);
        createItemRef(19, "Water", recolourUiGfx(gfxUI[UI_GFX_POCKET_WATER_3],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE_DARK]), itemGfxD[x]);
        createItemRef(20, "N'egg", recolourUiGfx(gfxUI[UI_GFX_POCKET_NEGG],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), itemGfxD[x]);
        createItemRef(21, "N'egg", recolourUiGfx(gfxUI[UI_GFX_POCKET_NEGG],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE_DARK]), itemGfxD[x]);
        createItemRef(22, "N'egg", recolourUiGfx(gfxUI[UI_GFX_POCKET_NEGG],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_RED]), itemGfxD[x]);
        createItemRef(23, "Serpent Slime", recolourUiGfx(gfxUI[UI_GFX_POCKET_POTION],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), itemGfxD[x]);
        createItemRef(24, "Brimstone Broth", recolourUiGfx(gfxUI[UI_GFX_POCKET_POTION],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_YELLOW]), itemGfxD[x]);
        createItemRef(25, "Dragon Ale", recolourUiGfx(gfxUI[UI_GFX_POCKET_POTION],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_RED]), itemGfxD[x]);
        createItemRef(26, "Moon Elixir", recolourUiGfx(gfxUI[UI_GFX_POCKET_POTION],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE_DARK]), itemGfxD[x]);
        createItemRef(27, "Leather Armour", gfxUI[UI_GFX_POCKET_AMOUR_LEATHER], itemGfxD[x]);
        createItemRef(28, "Chain Mail", recolourUiGfx(gfxUI[UI_GFX_POCKET_AMOUR_CHAIN],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_LIGHT]), itemGfxD[x]);
        createItemRef(29, "Plate Mail", recolourUiGfx(gfxUI[UI_GFX_POCKET_AMOUR_PLATE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_LIGHT]), itemGfxD[x]);
        createItemRef(30, "Mithril Chain", recolourUiGfx(gfxUI[UI_GFX_POCKET_AMOUR_CHAIN],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), itemGfxD[x]);
        createItemRef(31, "Mithril Plate", recolourUiGfx(gfxUI[UI_GFX_POCKET_AMOUR_PLATE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), itemGfxD[x]);
        createItemRef(32, "Adamant Chain", recolourUiGfx(gfxUI[UI_GFX_POCKET_AMOUR_CHAIN],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), itemGfxD[x]);
        createItemRef(33, "Adamant Plate", recolourUiGfx(gfxUI[UI_GFX_POCKET_AMOUR_PLATE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), itemGfxD[x]);
        createItemRef(34, "Crystal Chain", recolourUiGfx(gfxUI[UI_GFX_POCKET_AMOUR_CHAIN],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_PINK]), itemGfxD[x]);
        createItemRef(35, "Crystal Plate", recolourUiGfx(gfxUI[UI_GFX_POCKET_AMOUR_PLATE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_PINK]), itemGfxD[x]);
        createItemRef(36, "Leather Shield", gfxUI[UI_GFX_POCKET_SHIELD_1], itemGfxD[x]);
        createItemRef(37, "Buckler", gfxUI[UI_GFX_POCKET_SHIELD_2], itemGfxD[x]);
        createItemRef(38, "Rune Shield", gfxUI[UI_GFX_POCKET_SHIELD_3], itemGfxD[x]);
        createItemRef(39, "Large Shield", gfxUI[UI_GFX_POCKET_SHIELD_4], itemGfxD[x]);
        createItemRef(40, "Moon Shield", gfxUI[UI_GFX_POCKET_SHIELD_5], itemGfxD[x]);
        createItemRef(41, "Dragon Scale", gfxUI[UI_GFX_POCKET_SHIELD_6], itemGfxD[x]);
        createItemRef(42, "War Shield", gfxUI[UI_GFX_POCKET_SHIELD_7], itemGfxD[x]);
        createItemRef(43, "Chaos Gloves", recolourUiGfx(gfxUI[UI_GFX_POCKET_GLOVE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_YELLOW]), itemGfxD[x]);
        createItemRef(44, "Battle Gloves", recolourUiGfx(gfxUI[UI_GFX_POCKET_GLOVE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_LIGHT]), itemGfxD[x]);
        createItemRef(45, "Mithril Gloves", recolourUiGfx(gfxUI[UI_GFX_POCKET_GLOVE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), itemGfxD[x]);
        createItemRef(46, "Adamant Gloves", recolourUiGfx(gfxUI[UI_GFX_POCKET_GLOVE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), itemGfxD[x]);
        createItemRef(47, "Crystal Gloves", recolourUiGfx(gfxUI[UI_GFX_POCKET_GLOVE],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_PINK]), itemGfxD[x]);
        createItemRef(48, "Dagger", gfxUI[UI_GFX_POCKET_DAGGER], itemGfxD[x]);
        createItemRef(49, "Stealth Blade", gfxUI[UI_GFX_POCKET_SHORT_SWORD], itemGfxD[x]);
        createItemRef(50, "Short Sword", gfxUI[UI_GFX_POCKET_SWORD_1], itemGfxD[x]);
        createItemRef(51, "Long Sword", recolourUiGfx(gfxUI[UI_GFX_POCKET_SWORD_2],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_YELLOW]), itemGfxD[x]);
        createItemRef(52, "Mithril Sword", recolourUiGfx(gfxUI[UI_GFX_POCKET_SWORD_2],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), itemGfxD[x]);
        createItemRef(53, "Fleshbane", gfxUI[UI_GFX_POCKET_SWORD_3], itemGfxD[x]);
        createItemRef(54, "Demon Blade", gfxUI[UI_GFX_POCKET_SWORD_4], itemGfxD[x]);
        createItemRef(55, "Ace of Swords", gfxUI[UI_GFX_POCKET_SWORD_5], itemGfxD[x]);
        createItemRef(56, "Battle Axe", recolourUiGfx(gfxUI[UI_GFX_POCKET_AXE_1],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_LIGHT]), itemGfxD[x]);
        createItemRef(57, "Mithril Axe", recolourUiGfx(gfxUI[UI_GFX_POCKET_AXE_1],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), itemGfxD[x]);
        createItemRef(58, "Troll's Axe", gfxUI[UI_GFX_POCKET_AXE_2], itemGfxD[x]);
        createItemRef(59, "Brainbiter", gfxUI[UI_GFX_POCKET_AXE_3], itemGfxD[x]);
        createItemRef(60, "Deathbringer", gfxUI[UI_GFX_POCKET_AXE_4], itemGfxD[x]);
        createItemRef(61, "Staff", recolourUiGfx(gfxUI[UI_GFX_POCKET_STAFF],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_DARKEST]), itemGfxD[x]);
        createItemRef(62, "Battle Staff", recolourUiGfx(gfxUI[UI_GFX_POCKET_STAFF],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_DARK]), itemGfxD[x]);
        createItemRef(63, "Power Staff", recolourUiGfx(gfxUI[UI_GFX_POCKET_STAFF],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_PINK]), itemGfxD[x]);
        createItemRef(64, "Blodwyn (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), itemGfxD[x]);
        createItemRef(65, "Murlock (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_YELLOW]), itemGfxD[x]);
        createItemRef(66, "Eleanor (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), itemGfxD[x]);
        createItemRef(67, "Roseanne (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_RED]), itemGfxD[x]);
        createItemRef(68, "Astroth (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_YELLOW]), itemGfxD[x]);
        createItemRef(69, "Zothen (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_RED]), itemGfxD[x]);
        createItemRef(70, "Baldrick (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), itemGfxD[x]);
        createItemRef(71, "Elfric (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), itemGfxD[x]);
        createItemRef(72, "Sir Edward (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_RED]), itemGfxD[x]);
        createItemRef(73, "Megrim (RIP)",   recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), itemGfxD[x]);
        createItemRef(74, "Sethra (RIP)",   recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), itemGfxD[x]);
        createItemRef(75, "Mr. Flay (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_YELLOW]), itemGfxD[x]);
        createItemRef(76, "Ulrich (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), itemGfxD[x]);
        createItemRef(77, "Zastaph (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), itemGfxD[x]);
        createItemRef(78, "Hengist (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_YELLOW]), itemGfxD[x]);
        createItemRef(79, "Thai-Chang (RIP)", recolourUiGfx(gfxUI[UI_GFX_POCKET_BONES],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_RED]), itemGfxD[x]);
        createItemRef(80, "Bronze Key", recolourUiGfx(gfxUI[UI_GFX_POCKET_KEY],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BROWN]), itemGfxD[x]);
        createItemRef(81, "Iron Key", recolourUiGfx(gfxUI[UI_GFX_POCKET_KEY],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_DARK]), itemGfxD[x]);
        createItemRef(82, "Serpent Key", recolourUiGfx(gfxUI[UI_GFX_POCKET_KEY],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), itemGfxD[x]);
        createItemRef(83, "Chaos Key", recolourUiGfx(gfxUI[UI_GFX_POCKET_KEY],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_YELLOW]), itemGfxD[x]);
        createItemRef(84, "Dragon Key", recolourUiGfx(gfxUI[UI_GFX_POCKET_KEY],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_RED]), itemGfxD[x]);
        createItemRef(85, "Moon Key", recolourUiGfx(gfxUI[UI_GFX_POCKET_KEY],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), itemGfxD[x]);
        createItemRef(86, "Chromatic Key", recolourUiGfx(gfxUI[UI_GFX_POCKET_KEY],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_LIGHT]), itemGfxD[x]);
        createItemRef(87, "Serpent Wand", recolourUiGfx(gfxUI[UI_GFX_POCKET_WAND],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), itemGfxD[x]);
        createItemRef(88, "Chaos Wand",   recolourUiGfx(gfxUI[UI_GFX_POCKET_WAND],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_YELLOW]), itemGfxD[x]);
        createItemRef(89, "Dragon Wand", recolourUiGfx(gfxUI[UI_GFX_POCKET_WAND],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_RED]), itemGfxD[x]);
        createItemRef(90, "Moon Wand", recolourUiGfx(gfxUI[UI_GFX_POCKET_WAND],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), itemGfxD[x]);
        createItemRef(91, "Heal Wand", recolourUiGfx(gfxUI[UI_GFX_POCKET_WAND],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_PINK]), itemGfxD[x]);
        createItemRef(92, "Long Bow", gfxUI[UI_GFX_POCKET_BOW], itemGfxD[x]);
        createItemRef(93, "Frost Bow", recolourUiGfx(gfxUI[UI_GFX_POCKET_BOW],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_WHITE]), itemGfxD[x]);
        createItemRef(94, "Cross Bow", gfxUI[UI_GFX_POCKET_CROSS_BOW], itemGfxD[x]);
        createItemRef(95, "permit", gfxUI[UI_GFX_POCKET_PERMIT], itemGfxD[x]);
        createItemRef(96, "Serpent Crystal", gfxUI[UI_GFX_POCKET_GEM_SERPENT], itemGfxD[x]);
        createItemRef(97, "Chaos Crystal", gfxUI[UI_GFX_POCKET_GEM_CHAOS], itemGfxD[x]);
        createItemRef(98, "Dragon Crystal", gfxUI[UI_GFX_POCKET_GEM_DRAGON], itemGfxD[x]);
        createItemRef(99, "Moon Crystal", gfxUI[UI_GFX_POCKET_GEM_MOON], itemGfxD[x]);
        createItemRef(100, "Grey Gem", gfxUI[UI_GFX_POCKET_GEM_GREY], itemGfxD[x]);
        createItemRef(101, "Bluish Gem", gfxUI[UI_GFX_POCKET_GEM_GREENISH], itemGfxD[x]);
        createItemRef(102, "Brown Gem", gfxUI[UI_GFX_POCKET_GEM_BROWN], itemGfxD[x]);
        createItemRef(103, "Tan Gem", gfxUI[UI_GFX_POCKET_GEM_TAN], itemGfxD[x]);
        createItemRef(104, "Grey Ring", recolourUiGfx(gfxUI[UI_GFX_POCKET_RING],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREY_DARK]), itemGfxD[x]);
        createItemRef(105, "Serpent Ring", recolourUiGfx(gfxUI[UI_GFX_POCKET_RING],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_GREEN]), itemGfxD[x]);
        createItemRef(106, "Chaos Ring", recolourUiGfx(gfxUI[UI_GFX_POCKET_RING],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_YELLOW]), itemGfxD[x]);
        createItemRef(107, "Dragon Ring", recolourUiGfx(gfxUI[UI_GFX_POCKET_RING],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_RED]), itemGfxD[x]);
        createItemRef(108, "Moon Ring", recolourUiGfx(gfxUI[UI_GFX_POCKET_RING],COLOUR[COLOUR_GREEN],COLOUR[COLOUR_BLUE]), itemGfxD[x]);
        createItemRef(109, "Book of Skulls", gfxUI[UI_GFX_ICON_BOOKOFSKULLS], itemGfxD[x]);

}

//Read out the items here
function createItemRef(id, name, gfx, gfxD) {
    itemRef[id] = {
        name: name,
        gfx: gfx,
        gfxD: gfxD
    };
}

//Read the dungeon item gfx here
//Reads in the image
function initItemGfxD() {
	for(i = 0; i < 0; i++) {
		itemGfxD[i] = new Array();
		for(d = DISTANCE_VERY_CLOSE; d <= DISTANCE_DISTANT; d++) {
			itemGfxD[i][d] = null;
		}
	}
}
function Item(id, quantity, location) {
    this.id = id;
    this.quantity = quantity;
    this.location = location;
    this.gfx = [];
    this.gfxD = [];
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
    	PrintLog('Loaded item in dungeon: ' + q + 'x ' + id);
    }
}

function initPocketItem(id, q, ch, slot) {
    item[item.length] = new Item(id, q, {
    	champion: champion,
        slot: slot
    });
    PrintLog('Loaded item in pocket: ' + q + 'x ' + id);
}
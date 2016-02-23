function loadBinaryFiles(item){

    loadingScreen(item);
    if (typeof item.towerData !== 'undefined'){

        var type = item.id.split("_")[1];
        getFileData(item.callback,item.id,getTowerByName(item.towerData),type,parseInt(item.length));

    }else{
        getFileData(item.callback,item.id,null,item.id,parseInt(item.length));
    }
}

function getFileData(callback, id, t, type, length) {

    if (debug){
        PrintLog("Processing: " + type);
    }

    switch (type) {
        case "monsterPalette":
            monsterPaletteData = window[callback](preload.getResult(id), length);
            break;
        case "monsterPaletteMeta":
            monsterPaletteMetaData = window[callback](preload.getResult(id), length);
            break;
        case "monsterHeads":
            monsterHeadsData = window[callback](preload.getResult(id), length);
            break;
        case "monsterBodies":
            monsterBodiesData = window[callback](preload.getResult(id), length);
            break;
        case "map":
            t.floor = window[callback](preload.getResult(id), length);
            break;
        case "switches":
            t.switches = window[callback](preload.getResult(id), length);
            break;
        case "triggers":
            t.triggers = window[callback](preload.getResult(id), length);
            break;
        case "monsters":
            t.monsterData = window[callback](preload.getResult(id), length);
            break;
        case "championData":
            championData = window[callback](preload.getResult(id), length);
            break;
        case "championPocketData":
            championPocketData = window[callback](preload.getResult(id), length);
            break;
        case "towerSwitchesData":
            towerSwitchesData = window[callback](preload.getResult(id), length);
            break;
        case "objects":
            t.itemData = window[callback](preload.getResult(id), length);
            break;
        case "scrollData":
            scrollData = window[callback](preload.getResult(id));
            break;
        case "gemSwitchesData":
            gemSwitchesData = window[callback](preload.getResult(id), length);
            break;
        case "crystalSwitchesData":
            crystalSwitchesData = window[callback](preload.getResult(id), length);
            break;
        case "armourData":
            armourData = window[callback](preload.getResult(id), length);
            break;
        case "monsterItemData":
            monsterItemData = window[callback](preload.getResult(id), length);
            break;
        default:
            break;
    }

}



function readMapData(evt) {

    //Function to read the orginal Bloodwych PC map data and put it into an array of
    //hex codes so we can convert back to objects ingame.

    var uInt8Array = new Uint8Array(evt);

    //The first part of the map files contains to the data about how many floors are stored
    //in the tower file and the Width,Height,OffsetX,OffsetY so the floors can line up correctly
    //for falling though pits or walking down stairs.
    var floors = [];

    for(var x = 0; x < 8; x++) {
        myFloor = new Map(uInt8Array[x + 8], uInt8Array[x], uInt8Array[x + 32], uInt8Array[x + 40]);
        if(myFloor.Width === 0 || myFloor.Height === 0) break;
        floors.push(myFloor);
    }

    var x = 56;

    for (var i = 0; i < floors.length; i++) {
        t1 = floors[i].Width;
        t2 = floors[i].Height;
        var mdata = [];

        for(var myY = 0; myY < t1; myY++) {
            var r = [];
            for(var myX = 0; myX < t2; myX++) {
                r.push(decimalToHex(uInt8Array[x]) + decimalToHex(uInt8Array[x + 1]));
                x = x + 2;
            }
            mdata.push(r);
        }
        floors[i].Map = mdata;
    }

    return floors;

}

function readSimpleData(evt, length) {
    var uInt8Array = new Uint8Array(evt);
    var Data = [];

    if (length === 0) {
        return uInt8Array;
    } else {
        for(var x = 0; x < uInt8Array.length / length; x++) {
            //Switches.push([uInt8Array[x],uInt8Array[x+1],uInt8Array[x+3],uInt8Array[x+2]]);
            var tmp = [];
            for(var y = 0; y < length; y++) {
                tmp.push(uInt8Array[x * length + y]);
            }
            Data.push(tmp);
            //x = x + length - 1;
        }
    }
    return Data;
}

function readSimpleDataHex(evt, length) {
    var uInt8Array = new Uint8Array(evt);
    var Data = [];

    for(var x = 0; x < uInt8Array.length / length; x++) {
        //Switches.push([uInt8Array[x],uInt8Array[x+1],uInt8Array[x+3],uInt8Array[x+2]]);
        var tmp = '';
        for(var y = 0; y < length; y++) {
            tmp = tmp + decimalToHex(uInt8Array[x * length + y]);
        }
        Data.push(tmp);
    }
    return Data;
}

function readScrollData(evt) {
    var uInt8Array = new Uint8Array(evt);
    var Data = [];
    var Scroll = [];
    var Line = [];

    for(var x = 0; x < uInt8Array.length; x++) {

        if (uInt8Array[x] === 255) {
            Scroll.push(Line.join(""));
            Data.push(Scroll);
            Scroll = [];
            Line = [];
            x++;
        }
        if (uInt8Array[x] === 252) {
            if (Line.length > 0) {
                Scroll.push(Line.join(""));
            }
            Line = [];
            x = x + 3;
        }

        Line.push(String.fromCharCode(uInt8Array[x]));
    }
    return Data;
}

function readMonsterItems(evt){
    return new Uint8Array(evt);
}
